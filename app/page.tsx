import { BlogPosts } from 'app/components/posts'
import { NewsletterForm } from 'app/components/newsletter-form'
import { getBlogPosts, formatDate } from 'app/blog/utils'
import {
  AnimeBackground,
  TypingText,
  NeonText,
  BouncingEmoji,
  GradientCard,
  Particles
} from 'app/components/anime-elements'

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
    <section className="relative">
      <AnimeBackground />
      <Particles />

      <div className="animate-fade-in-up">
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter flex items-center gap-2">
          <span aria-label="sparkles"><BouncingEmoji emoji="✨" delay={0} /></span>
          <NeonText color="purple">My Portfolio</NeonText>
          <span aria-label="rocket"><BouncingEmoji emoji="🚀" delay={0.2} /></span>
        </h1>
      </div>

      <div className="animate-fade-in-up animation-delay-200">
        <GradientCard className="mb-6">
          <p className="text-neutral-800 dark:text-neutral-200">
            {`I'm a Vim enthusiast and tab advocate, finding unmatched efficiency in
            Vim's keystroke commands and tabs' flexibility for personal viewing
            preferences. This extends to my support for static typing, where its
            early error detection ensures cleaner code, and my preference for dark
            mode, which eases long coding sessions by reducing eye strain.`}
          </p>
        </GradientCard>
      </div>

      <div className="my-8 animate-fade-in-up animation-delay-300">
        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
          <span aria-label="memo"><BouncingEmoji emoji="📝" delay={0.1} /></span>
          <span>Latest Posts</span>
        </h2>
        <BlogPosts posts={posts} />
      </div>

      <div className="animate-fade-in-up animation-delay-500">
        <GradientCard>
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
            <span aria-label="love letter"><BouncingEmoji emoji="💌" delay={0.3} /></span>
            <NeonText color="blue">Subscribe to Newsletter</NeonText>
          </h3>
          <NewsletterForm />
        </GradientCard>
      </div>
    </section>
  )
}
