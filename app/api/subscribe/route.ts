import { NextRequest, NextResponse } from 'next/server';
import {
  generateToken,
  isValidEmail,
  getSubscriber,
  saveSubscriber,
  checkRateLimit,
  type Subscriber,
} from 'app/lib/subscription';
import { sendVerificationEmail } from 'app/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const allowed = await checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        { success: false, error: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email } = body;

    // 이메일 유효성 검증
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: '유효한 이메일 주소를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 기존 구독자 확인
    const existingSubscriber = await getSubscriber(email);

    if (existingSubscriber) {
      if (existingSubscriber.status === 'active') {
        return NextResponse.json(
          { success: false, error: '이미 구독 중인 이메일입니다.' },
          { status: 400 }
        );
      }

      if (existingSubscriber.status === 'pending') {
        // 인증 이메일 재발송
        const result = await sendVerificationEmail(
          email,
          existingSubscriber.verificationToken!
        );

        if (!result.success) {
          return NextResponse.json(
            { success: false, error: '이메일 발송에 실패했습니다.' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          message: '인증 이메일을 재발송했습니다. 이메일을 확인해주세요.',
        });
      }

      // unsubscribed 상태면 재구독 처리
    }

    // 새 구독자 생성
    const verificationToken = generateToken();
    const unsubscribeToken = generateToken();

    const subscriber: Subscriber = {
      id: generateToken(),
      email,
      status: 'pending',
      verificationToken,
      unsubscribeToken,
      subscribedAt: new Date().toISOString(),
      verifiedAt: null,
      unsubscribedAt: null,
    };

    await saveSubscriber(subscriber);

    // 인증 이메일 발송
    const result = await sendVerificationEmail(email, verificationToken);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: '이메일 발송에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '인증 이메일을 발송했습니다. 이메일을 확인해주세요.',
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
