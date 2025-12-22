interface Author {
  name: string
  bio: string
  avatarUrl: string
}

interface AuthorProfileProps {
  author: Author
}

export function AuthorProfile({ author }: AuthorProfileProps) {
  return (
    <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center gap-4">
        <img
          src={author.avatarUrl}
          alt={`${author.name} avatar`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-bold text-lg">{author.name} Sir</h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            {author.bio}
          </p>
        </div>
      </div>
    </div>
  )
}
