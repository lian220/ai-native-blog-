interface Author {
  name: string
  bio: string
  avatarUrl: string
}

interface AuthorProfileProps {
  author: Author
}

interface AuthorAvatarProps {
  name: string
  avatarUrl: string
}

interface AuthorDetailsProps {
  name: string
  bio: string
}

const AVATAR_SIZE_CLASSES = 'w-16 h-16' as const
const BORDER_STYLES = 'border-t border-neutral-200 dark:border-neutral-800' as const
const SECTION_SPACING = 'mt-16 pt-8' as const
const NAME_SUFFIX = 'Sir' as const

function createAvatarAltText(authorName: string): string {
  return `${authorName} avatar`
}

function formatAuthorName(name: string): string {
  return `${name} ${NAME_SUFFIX}`
}

function AuthorAvatar({ name, avatarUrl }: AuthorAvatarProps) {
  const altText = createAvatarAltText(name)

  return (
    <img
      src={avatarUrl}
      alt={altText}
      className={`${AVATAR_SIZE_CLASSES} rounded-full object-cover`}
    />
  )
}

function AuthorDetails({ name, bio }: AuthorDetailsProps) {
  const displayName = formatAuthorName(name)

  return (
    <div>
      <h3 className="font-bold text-lg">{displayName}</h3>
      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
        {bio}
      </p>
    </div>
  )
}

export function AuthorProfile({ author }: AuthorProfileProps) {
  const { name, bio, avatarUrl } = author

  return (
    <div className={`${SECTION_SPACING} ${BORDER_STYLES}`}>
      <div className="flex items-center gap-4">
        <AuthorAvatar name={name} avatarUrl={avatarUrl} />
        <AuthorDetails name={name} bio={bio} />
      </div>
    </div>
  )
}
