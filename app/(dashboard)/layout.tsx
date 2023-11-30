import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// components
import Navbar from '../components/Navbar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })
  // get current user session
  const { data } = await supabase.auth.getSession()

  if (!data.session) {
    redirect('/login')
  }

  return (
    <>
      <Navbar user={data.session?.user} />
      {children}
    </>
  )
}
