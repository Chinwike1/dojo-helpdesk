import React from 'react'
import { notFound } from 'next/navigation'

// type definitions
type TicketParams = {
  id: string
}

type Params = {
  params: { id: string }
}

/* Next.js APIs */
export const dynamicParams = true

export async function generateMetadata({ params }: Params) {
  const id = params.id
  const res = await fetch(`http://localhost:4000/tickets/${id}`)
  const ticket = await res.json()

  return {
    title: `Dojo Helpdesk | ${ticket.title}`,
  }
}

// fetch all tickets so next can statically generate the pages at build time
export async function generateStaticParams() {
  const res = await fetch('http://localhost:4000/tickets')

  const tickets = await res.json()

  return tickets.map((ticket: any) => ({
    id: ticket.id,
  }))
}

async function getTicket(id: string) {
  const res = await fetch('http://localhost:4000/tickets/' + id, {
    next: {
      revalidate: 60,
    },
  })

  if (!res.ok) {
    notFound()
  }

  return res.json()
}

export default async function TicketDetails({
  params,
}: {
  params: TicketParams
}) {
  const ticket = await getTicket(params.id)

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
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
