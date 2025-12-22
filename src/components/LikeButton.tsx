'use client'

import { useState, useEffect, useCallback } from 'react'

interface LikeButtonProps {
  slug: string
}

const STORAGE_KEY_PREFIX = 'blog_like_' as const

function getStorageKey(slug: string): string {
  return `${STORAGE_KEY_PREFIX}${slug}`
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={2}
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  )
}

export function LikeButton({ slug }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const fetchLikes = useCallback(async () => {
    try {
      const response = await fetch(`/api/posts/${slug}/likes`)
      const data = await response.json()
      setLikesCount(data.likes)
    } catch (error) {
      console.error('Failed to fetch likes:', error)
    }
  }, [slug])

  useEffect(() => {
    const liked = localStorage.getItem(getStorageKey(slug)) === 'true'
    setIsLiked(liked)
    fetchLikes().finally(() => setIsLoading(false))
  }, [slug, fetchLikes])

  async function handleClick() {
    const newIsLiked = !isLiked
    setIsLiked(newIsLiked)
    localStorage.setItem(getStorageKey(slug), String(newIsLiked))

    try {
      const response = await fetch(`/api/posts/${slug}/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: newIsLiked ? 'like' : 'unlike' }),
      })
      const data = await response.json()
      setLikesCount(data.likes)
    } catch (error) {
      console.error('Failed to update likes:', error)
      setIsLiked(!newIsLiked)
      localStorage.setItem(getStorageKey(slug), String(!newIsLiked))
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-neutral-400">
        <HeartIcon filled={false} />
        <span className="text-sm">-</span>
      </div>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 transition-colors ${
        isLiked
          ? 'text-red-500 hover:text-red-600'
          : 'text-neutral-500 hover:text-red-500 dark:text-neutral-400 dark:hover:text-red-500'
      }`}
      aria-label={isLiked ? '좋아요 취소' : '좋아요'}
    >
      <HeartIcon filled={isLiked} />
      <span className="text-sm">{likesCount}</span>
    </button>
  )
}
