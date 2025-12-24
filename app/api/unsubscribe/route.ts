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
        { success: false, error: '구독 취소 토큰이 필요합니다.' },
        { status: 400 }
      );
    }

    // 토큰으로 구독자 조회
    const subscriber = await getSubscriberByToken(token, 'unsubscribe');

    if (!subscriber) {
      return NextResponse.json(
        { success: false, error: '유효하지 않은 구독 취소 링크입니다.' },
        { status: 400 }
      );
    }

    if (subscriber.status === 'unsubscribed') {
      return NextResponse.json({
        success: true,
        message: '이미 구독이 취소되었습니다.',
      });
    }

    // 상태 업데이트
    await updateSubscriberStatus(subscriber.email, 'unsubscribed', {
      unsubscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: '구독이 취소되었습니다. 언제든 다시 구독하실 수 있습니다.',
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
