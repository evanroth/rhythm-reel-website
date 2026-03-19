import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { password } = await request.json()
  const correctPassword = process.env.COMING_SOON_PASSWORD ?? 'friend'

  if (password !== correctPassword) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set('rr-access', '1', {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: 'lax',
  })
  return response
}
