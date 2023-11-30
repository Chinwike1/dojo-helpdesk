import { Suspense } from 'react'
import { Metadata } from 'next'
import TicketList from './TicketList'
import Loading from '../loading'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dojo Helpdesk | Tickets',
}

export default function Tickets() {
  return (
    <main className='mt-8'>
      <nav>
        <div>
          <h2>Tickets</h2>
          <p>
            <small>Currently open tickets.</small>
          </p>
        </div>
        <Link href='/tickets/create' className='btn-primary p-2 ml-auto'>
          New Ticket
        </Link>
      </nav>
      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  )
}
