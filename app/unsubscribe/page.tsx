'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Status = 'loading' | 'success' | 'error';

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('잘못된 구독 취소 링크입니다.');
      return;
    }

    const unsubscribe = async () => {
      try {
        const response = await fetch(`/api/unsubscribe?token=${token}`);
        const data = await response.json();

        if (response.ok && data.success) {
          setStatus('success');
          setMessage(data.message);
        } else {
          setStatus('error');
          setMessage(data.error || '구독 취소에 실패했습니다.');
        }
      } catch {
        setStatus('error');
        setMessage('네트워크 오류가 발생했습니다.');
      }
    };

    unsubscribe();
  }, [token]);

  return (
    <section className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mx-auto mb-4" />
            <p className="text-neutral-600 dark:text-neutral-400">처리 중...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-5xl mb-4">👋</div>
            <h1 className="text-2xl font-semibold mb-2">구독 취소 완료</h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">{message}</p>
            <Link
              href="/"
              className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md font-medium hover:opacity-80 transition-opacity"
            >
              블로그로 돌아가기
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-5xl mb-4">❌</div>
            <h1 className="text-2xl font-semibold mb-2">오류 발생</h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">{message}</p>
            <Link
              href="/"
              className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md font-medium hover:opacity-80 transition-opacity"
            >
              블로그로 돌아가기
            </Link>
          </>
        )}
      </div>
    </section>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <section className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white" />
        </section>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  );
}
