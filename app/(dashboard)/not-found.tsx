import Link from 'next/link'

export default function NotFound() {
  return (
    <main className='text-center'>
      <h2 className='text-3xl'>We hit a Brick Wall😓</h2>
      <p className='my-3'>We could not find the ticket you were looking for</p>
      <p>
        Go back to the <Link href='/'>dashboard</Link>
      </p>
    </main>
  )
}

// not-found.js files can be scoped to a specific route to override the generic 404 page at the root
