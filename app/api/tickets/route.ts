import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'

// stop default caching feature -- much like revalidate: 0
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const ticket = await request.json()
  const cookieStore = cookies()

  // get supabase instance
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  // get user curennt session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // insert data to supbase db
  const { data, error } = await supabase
    .from('tickets')
    .insert({
      ...ticket,
      user_email: session?.user.email,
    })
    .select() // returns the newly inserted ticket
    .single() // returns the data as a json object instead of an array (which '.select()' does)

  return NextResponse.json({ data, error })
}

// With JSON server db
// export async function GET() {
//   const tickets = await fetch('http://localhost:4000/tickets').then((res) =>
//     res.json()
//   )

//   return NextResponse.json(tickets, {
//     status: 200,
//   })
// }

// export async function POST(request: Request) {
//   // get ticket data sent in POST request
//   const ticket = await request.json()

//   const res = await fetch('http://localhost:4000/tickets', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(ticket),
//   })

//   const newTicket = await res.json()

//   return NextResponse.json(newTicket, {
//     status: 201,
//   })
// }

// With Supabase db
