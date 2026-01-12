import { BlogPosts } from 'app/components/posts'
import { getBlogPosts, formatDate } from 'app/blog/utils'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  const allPosts = getBlogPosts()

  const posts = allPosts.map((post) => ({
    slug: post.slug,
    title: post.metadata.title,
    publishedAt: post.metadata.publishedAt,
    formattedDate: formatDate(post.metadata.publishedAt, false),
    summary: post.metadata.summary,
    content: post.content,
  }))

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
      <BlogPosts posts={posts} />
    </section>
  )
}
