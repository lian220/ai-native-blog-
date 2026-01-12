import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { AuthorProfile } from 'src/components/AuthorProfile'
import { LikeButton } from 'src/components/LikeButton'
import { ViewCounter } from 'src/components/ViewCounter'
import { ShareButtons } from 'src/components/ShareButtons'
import { formatDate, getBlogPosts, calculateReadingTime } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  let { slug } = await params
  let post = getBlogPosts().find((post) => post.slug === slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }: { params: Promise<{ slug: string }> }) {
  let { slug } = await params
  let post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  const readingTime = calculateReadingTime(post.content)

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
          <p>{formatDate(post.metadata.publishedAt)}</p>
          <span>•</span>
          <p>{readingTime}분 읽기</p>
          <span>•</span>
          <ViewCounter slug={slug} trackView={true} />
        </div>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <LikeButton slug={slug} />
        </div>
        <ShareButtons
          url={`${baseUrl}/blog/${slug}`}
          title={post.metadata.title}
        />
      </div>
      <AuthorProfile
        author={{
          name: 'Author Name',
          bio: '개발과 기술에 관심이 많은 블로거입니다.',
          avatarUrl: '/avatar.png',
        }}
      />
    </section>
  )
}
