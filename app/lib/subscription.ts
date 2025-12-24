import { kv } from '@vercel/kv';
import { z } from 'zod/v4';

// 구독자 스키마
export const subscriberSchema = z.object({
  id: z.string(),
  email: z.email(),
  status: z.enum(['pending', 'active', 'unsubscribed']),
  verificationToken: z.string().nullable(),
  unsubscribeToken: z.string(),
  subscribedAt: z.string(),
  verifiedAt: z.string().nullable(),
  unsubscribedAt: z.string().nullable(),
});

export type Subscriber = z.infer<typeof subscriberSchema>;

// 토큰 생성
export function generateToken(): string {
  return crypto.randomUUID();
}

// 이메일 유효성 검증
export function isValidEmail(email: string): boolean {
  const result = z.email().safeParse(email);
  return result.success;
}

// 구독자 저장
export async function saveSubscriber(subscriber: Subscriber): Promise<void> {
  await kv.set(`subscriber:${subscriber.email}`, subscriber);
  await kv.sadd('subscribers:all', subscriber.email);
}

// 구독자 조회
export async function getSubscriber(email: string): Promise<Subscriber | null> {
  return await kv.get<Subscriber>(`subscriber:${email}`);
}

// 이메일로 구독자 조회 (토큰 기반)
export async function getSubscriberByToken(
  token: string,
  tokenType: 'verification' | 'unsubscribe'
): Promise<Subscriber | null> {
  const emails = await kv.smembers('subscribers:all');

  for (const email of emails) {
    const subscriber = await getSubscriber(email as string);
    if (!subscriber) continue;

    if (tokenType === 'verification' && subscriber.verificationToken === token) {
      return subscriber;
    }
    if (tokenType === 'unsubscribe' && subscriber.unsubscribeToken === token) {
      return subscriber;
    }
  }

  return null;
}

// 구독자 상태 업데이트
export async function updateSubscriberStatus(
  email: string,
  status: Subscriber['status'],
  additionalFields?: Partial<Subscriber>
): Promise<void> {
  const subscriber = await getSubscriber(email);
  if (!subscriber) return;

  const updated: Subscriber = {
    ...subscriber,
    status,
    ...additionalFields,
  };

  await kv.set(`subscriber:${email}`, updated);
}

// 활성 구독자 목록 조회
export async function getActiveSubscribers(): Promise<Subscriber[]> {
  const emails = await kv.smembers('subscribers:all');
  const subscribers: Subscriber[] = [];

  for (const email of emails) {
    const subscriber = await getSubscriber(email as string);
    if (subscriber?.status === 'active') {
      subscribers.push(subscriber);
    }
  }

  return subscribers;
}

// Rate limiting (간단한 IP 기반)
export async function checkRateLimit(ip: string): Promise<boolean> {
  const key = `ratelimit:${ip}`;
  const count = await kv.incr(key);

  if (count === 1) {
    // 5분 TTL 설정
    await kv.expire(key, 300);
  }

  // 5분에 3회 제한
  return count <= 3;
}
