import Image from 'next/image'
import Link from 'next/link'
import Logo from './images/dojo-logo.png'

export default function Navbar() {
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
      <Link href='/tickets/create'>Create Ticket</Link>
    </nav>
  )
}
