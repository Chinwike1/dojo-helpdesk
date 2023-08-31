import { NextRequest, NextResponse } from 'next/server'

// stop default caching feature -- much like revalidate: 0
export const dynamic = 'force-dynamic'

export async function GET() {
  const tickets = await fetch('http://localhost:4000/tickets').then((res) =>
    res.json()
  )

  return NextResponse.json(tickets, {
    status: 200,
  })
}

export async function POST(request: Request) {
  // get ticket data sent in POST request
  const ticket = await request.json()

  const res = await fetch('http://localhost:4000/tickets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticket),
  })

  const newTicket = await res.json()

  return NextResponse.json(newTicket, {
    status: 201,
  })
}
