import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav>
        <Link href='/'>
          <h1>Dojo Helpdesk</h1>
        </Link>
        <Link href='/signup'>Sign up</Link>
        <Link href='/login'>Login</Link>
      </nav>
      {children}
    </>
  )
}
