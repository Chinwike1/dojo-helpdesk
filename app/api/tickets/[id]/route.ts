import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// type definitions
type Params = {
  params: { id: string }
}

// Delete a ticket
export async function DELETE(_: any, { params }: Params) {
  const id = params.id

  const supabase = createRouteHandlerClient({ cookies })

  const { error } = await supabase.from('tickets').delete().eq('id', id)

  return NextResponse.json({ error })
}
