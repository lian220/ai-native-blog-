'use client'

import { useEffect, useState } from 'react'

interface ViewCounterProps {
  slug: string
  trackView?: boolean
}

export function ViewCounter({ slug, trackView = false }: ViewCounterProps) {
  const [views, setViews] = useState<number>(0)

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}/views`)
        const data = await response.json()
        setViews(data.views)
      } catch (error) {
        console.error('Failed to fetch views:', error)
      }
    }

    const incrementView = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}/views`, {
          method: 'POST',
        })
        const data = await response.json()
        setViews(data.views)
      } catch (error) {
        console.error('Failed to increment view:', error)
      }
    }

    if (trackView) {
      incrementView()
    } else {
      fetchViews()
    }
  }, [slug, trackView])

  return (
    <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
      <span className="text-sm">{views.toLocaleString()}회</span>
    </div>
  )
}
