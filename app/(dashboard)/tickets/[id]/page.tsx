import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import DeleteButton from './DeleteButton'

// type definitions
type TicketParams = {
  id: string
}

type Params = {
  params: { id: string }
}
interface Ticket {
  id: string
  title: string
  user_email: string
  body: string
  priority: string
}

/* Next.js APIs */
export const dynamicParams = true

export async function generateMetadata({ params }: Params) {
  const supabase = createServerComponentClient({ cookies })

  const { data: ticket } = await supabase
    .from('tickets')
    .select()
    .eq('id', params.id)
    .single()

  return {
    title: `Dojo Helpdesk | ${ticket?.title || 'Ticket not found'}`,
  }
}

// fetch all tickets so next can statically generate the pages at build time
// export async function generateStaticParams() {
//   const res = await fetch('http://localhost:4000/tickets')

//   const tickets = await res.json()

//   return tickets.map((ticket: any) => ({
//     id: ticket.id,
//   }))
// }

async function getTicket(id: string) {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase
    .from('tickets')
    .select()
    .eq('id', id)
    .single()

  if (!data || error) {
    notFound()
  }

  return data
}

export default async function TicketDetails({
  params,
}: {
  params: TicketParams
}) {
  const ticket: Ticket = await getTicket(params.id)

  const supabase = createServerComponentClient({ cookies })

  const { data } = await supabase.auth.getSession()

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
        <div className='ml-auto'>
          {data.session?.user.email === ticket.user_email && (
            <DeleteButton id={ticket.id} />
          )}
        </div>
      </nav>
      <div className='card'>
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  )
}
