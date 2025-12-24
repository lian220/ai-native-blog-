import { NextRequest, NextResponse } from 'next/server';
import { getActiveSubscribers } from 'app/lib/subscription';
import { sendNewPostNotification } from 'app/lib/email';

// API 키 인증 (필수)
const API_SECRET = process.env.NOTIFY_API_SECRET;

export async function POST(request: NextRequest) {
  try {
    // API 키 검증 - 설정되지 않으면 요청 거부
    if (!API_SECRET) {
      console.error('NOTIFY_API_SECRET is not configured');
      return NextResponse.json(
        { success: false, error: '서버 설정 오류입니다.' },
        { status: 500 }
      );
    }

    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${API_SECRET}`) {
      return NextResponse.json(
        { success: false, error: '인증되지 않은 요청입니다.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, slug, excerpt } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { success: false, error: '글 제목과 슬러그가 필요합니다.' },
        { status: 400 }
      );
    }

    // 활성 구독자 조회
    const subscribers = await getActiveSubscribers();

    if (subscribers.length === 0) {
      return NextResponse.json({
        success: true,
        message: '발송할 구독자가 없습니다.',
        sentCount: 0,
        failedCount: 0,
      });
    }

    // 이메일별 unsubscribe 토큰 맵 생성
    const unsubscribeTokens = new Map<string, string>();
    const emails: string[] = [];

    for (const subscriber of subscribers) {
      emails.push(subscriber.email);
      unsubscribeTokens.set(subscriber.email, subscriber.unsubscribeToken);
    }

    // 알림 발송
    const result = await sendNewPostNotification(
      emails,
      { title, slug, excerpt: excerpt || '' },
      unsubscribeTokens
    );

    return NextResponse.json({
      success: result.success,
      message: `${result.sentCount}명에게 알림을 발송했습니다.`,
      sentCount: result.sentCount,
      failedCount: result.failedCount,
    });
  } catch (error) {
    console.error('Notify error:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
