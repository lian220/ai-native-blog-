import { NextRequest, NextResponse } from 'next/server';
import {
  getSubscriberByToken,
  updateSubscriberStatus,
} from 'app/lib/subscription';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { success: false, error: '인증 토큰이 필요합니다.' },
        { status: 400 }
      );
    }

    // 토큰으로 구독자 조회
    const subscriber = await getSubscriberByToken(token, 'verification');

    if (!subscriber) {
      return NextResponse.json(
        { success: false, error: '유효하지 않은 인증 링크입니다.' },
        { status: 400 }
      );
    }

    if (subscriber.status === 'active') {
      return NextResponse.json({
        success: true,
        message: '이미 인증이 완료된 이메일입니다.',
      });
    }

    // 상태 업데이트
    await updateSubscriberStatus(subscriber.email, 'active', {
      verifiedAt: new Date().toISOString(),
      verificationToken: null,
    });

    return NextResponse.json({
      success: true,
      message: '구독이 완료되었습니다! 새 글이 올라오면 알려드릴게요.',
    });
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
