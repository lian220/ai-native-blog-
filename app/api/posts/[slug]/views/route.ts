import { NextRequest, NextResponse } from 'next/server'

const viewsStore = new Map<string, number>()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const views = viewsStore.get(slug) || 0

  return NextResponse.json({ views })
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const currentViews = viewsStore.get(slug) || 0

  viewsStore.set(slug, currentViews + 1)
  const newViews = viewsStore.get(slug) || 0

  return NextResponse.json({ views: newViews })
}
