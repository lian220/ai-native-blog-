'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SearchBar } from 'src/components/SearchBar'

interface BlogPost {
  slug: string
  title: string
  publishedAt: string
  formattedDate: string
  summary: string
  content: string
}

export function BlogPosts({ posts }: { posts: BlogPost[] }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase()
    return (
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
    )
  })

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1
    }
    return 1
  })

  return (
    <div>
      <SearchBar onSearch={setSearchQuery} />
      {sortedPosts.length === 0 ? (
        <p className="text-neutral-600 dark:text-neutral-400">
          검색 결과가 없습니다.
        </p>
      ) : (
        sortedPosts.map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                {post.formattedDate}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.title}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  )
}
