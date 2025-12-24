import { Resend } from 'resend';

// 빌드 시에는 API 키가 없을 수 있으므로 lazy initialization
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY 환경 변수가 설정되지 않았습니다.');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'My Blog';

// XSS 방지를 위한 HTML 이스케이프 함수
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// 인증 이메일 발송
export async function sendVerificationEmail(
  email: string,
  verificationToken: string
): Promise<{ success: boolean; error?: string }> {
  const verifyUrl = `${SITE_URL}/verify?token=${verificationToken}`;

  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `[${SITE_NAME}] 구독 인증을 완료해주세요`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #111; font-size: 24px; margin-bottom: 20px;">${SITE_NAME}</h1>

          <p style="margin-bottom: 20px;">안녕하세요! 블로그 구독을 신청해 주셔서 감사합니다.</p>

          <p style="margin-bottom: 20px;">아래 버튼을 클릭하여 구독을 완료해주세요:</p>

          <a href="${verifyUrl}"
             style="display: inline-block; background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
            구독 인증하기
          </a>

          <p style="margin-top: 20px; color: #666; font-size: 14px;">
            버튼이 작동하지 않으면 아래 링크를 복사하여 브라우저에 붙여넣어 주세요:<br>
            <a href="${verifyUrl}" style="color: #666;">${verifyUrl}</a>
          </p>

          <p style="margin-top: 30px; color: #999; font-size: 12px;">
            이 링크는 24시간 동안 유효합니다.
          </p>
        </body>
        </html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

// 새 글 알림 이메일 발송
export async function sendNewPostNotification(
  emails: string[],
  post: {
    title: string;
    slug: string;
    excerpt: string;
  },
  unsubscribeTokens: Map<string, string>
): Promise<{ success: boolean; sentCount: number; failedCount: number }> {
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  let sentCount = 0;
  let failedCount = 0;

  for (const email of emails) {
    const unsubscribeToken = unsubscribeTokens.get(email);
    const unsubscribeUrl = `${SITE_URL}/unsubscribe?token=${unsubscribeToken}`;

    try {
      const resend = getResendClient();
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `[${SITE_NAME}] 새 글: ${escapeHtml(post.title)}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #111; font-size: 24px; margin-bottom: 20px;">${SITE_NAME}</h1>

            <h2 style="color: #111; font-size: 20px; margin-bottom: 10px;">${escapeHtml(post.title)}</h2>

            <p style="margin-bottom: 20px; color: #555;">${escapeHtml(post.excerpt)}</p>

            <a href="${postUrl}"
               style="display: inline-block; background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
              글 읽기
            </a>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">

            <p style="color: #999; font-size: 12px;">
              더 이상 알림을 받고 싶지 않으시면
              <a href="${unsubscribeUrl}" style="color: #999;">구독 취소</a>를 클릭해주세요.
            </p>
          </body>
          </html>
        `,
      });
      sentCount++;
    } catch (error) {
      console.error(`Failed to send email to ${email}:`, error);
      failedCount++;
    }
  }

  return { success: failedCount === 0, sentCount, failedCount };
}
