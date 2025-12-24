'use client';

import { useState, FormEvent } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setStatus('error');
      setMessage('이메일을 입력해주세요.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || '구독 신청에 실패했습니다.');
      }
    } catch {
      setStatus('error');
      setMessage('네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <div className="my-8 p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">뉴스레터 구독</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        새 글이 올라오면 이메일로 알려드립니다.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={status === 'loading'}
          className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-black dark:text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          {status === 'loading' ? '처리 중...' : '구독하기'}
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 text-sm ${
            status === 'success'
              ? 'text-green-600 dark:text-green-400'
              : status === 'error'
              ? 'text-red-600 dark:text-red-400'
              : ''
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
