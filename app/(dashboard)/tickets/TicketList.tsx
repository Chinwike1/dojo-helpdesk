import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { cookies } from 'next/headers'

async function getTickets() {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase.from('tickets').select()

  if (error) {
    console.log('Could not retreive tickets')
    return 'We had trouble fetching the tickets :('
  }

  return data
}

export default async function TicketList() {
  const data = await getTickets()

  return (
    <>
      {typeof data === 'string' ? (
        <p className='text-primary text-center'>{data}</p>
      ) : (
        data.map((ticket: any) => (
          <div key={ticket.id} className='card my-5'>
            <Link href={`/tickets/${ticket.id}`}>
              <h3>{ticket.title}</h3>
              <p>{ticket.body.slice(0, 200)}...</p>
              <div className={`pill ${ticket.priority}`}>
                {ticket.priority} priority
              </div>
            </Link>
          </div>
        ))
      )}
      {data.length === 0 && (
        <p className='text-center'>There are no open tickets, yay!</p>
      )}
    </>
  )
}
