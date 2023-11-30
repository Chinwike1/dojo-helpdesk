import Image from 'next/image'
import Link from 'next/link'
import Logo from './images/dojo-logo.png'
import LogoutButton from './LogoutBtn'

type Props = {
  user: any
}

export default function Navbar({ user }: Props) {
  return (
    <nav>
      <Link href='/' className='flex items-center gap-4'>
        <Image
          src={Logo}
          alt='Dojo Helpdesk logo'
          width={70}
          height={70}
          quality={100}
          placeholder='blur'
        />
        <h1>Dojo Helpdesk</h1>
      </Link>
      <Link href='/'>Dashboard</Link>
      <Link href='/tickets'>Tickets</Link>
      <div className='ml-auto'>
        {!user ? (
          <Link
            className=' bg-primary py-2 px-4 text-white rounded-lg hover:bg-purple-700 hover:text-white transition-colors'
            href='/login'
          >
            Login
          </Link>
        ) : (
          <div className='flex items-center'>
            <span className='mr-2'>Hello, {user?.email}</span>
            <LogoutButton />
          </div>
        )}
      </div>
    </nav>
  )
}
