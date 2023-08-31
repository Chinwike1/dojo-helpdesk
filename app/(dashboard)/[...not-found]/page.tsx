// The [...not-found] folder serves as a catch-all page for any route not included in the project

import { notFound } from 'next/navigation'

export default function NotFound() {
  notFound()
}
