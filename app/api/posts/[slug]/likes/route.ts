import { NextRequest, NextResponse } from 'next/server'

const likesStore = new Map<string, number>()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const likes = likesStore.get(slug) || 0

  return NextResponse.json({ likes })
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const body = await request.json()
  const { action } = body as { action: 'like' | 'unlike' }

  const currentLikes = likesStore.get(slug) || 0

  if (action === 'like') {
    likesStore.set(slug, currentLikes + 1)
  } else if (action === 'unlike') {
    likesStore.set(slug, Math.max(0, currentLikes - 1))
  }

  const newLikes = likesStore.get(slug) || 0

  return NextResponse.json({ likes: newLikes })
}
