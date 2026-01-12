import { BlogPosts } from 'app/components/posts'
import { NewsletterForm } from 'app/components/newsletter-form'
import {
  AnimeBackground,
  TypingText,
  NeonText,
  BouncingEmoji,
  GradientCard,
  Particles
} from 'app/components/anime-elements'

export default function Page() {
  return (
    <section className="relative">
      <AnimeBackground />
      <Particles />

      <div className="animate-fade-in-up">
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter flex items-center gap-2">
          <BouncingEmoji emoji="✨" delay={0} />
          <NeonText color="purple">My Portfolio</NeonText>
          <BouncingEmoji emoji="🚀" delay={0.2} />
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
          <BouncingEmoji emoji="📝" delay={0.1} />
          <span>Latest Posts</span>
        </h2>
        <BlogPosts />
      </div>

      <div className="animate-fade-in-up animation-delay-500">
        <GradientCard>
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
            <BouncingEmoji emoji="💌" delay={0.3} />
            <NeonText color="blue">Subscribe to Newsletter</NeonText>
          </h3>
          <NewsletterForm />
        </GradientCard>
      </div>
    </section>
  )
}
