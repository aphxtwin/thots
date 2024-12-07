import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="flex flex-col space-y-4 p-4">
      <Link href="/" className="text-xl font-bold hover:text-zinc-400">
        Home
      </Link>
      <Link href="/profile" className="text-xl hover:text-zinc-400">
        Profile
      </Link>
      <Link href="/bookmarks" className="text-xl hover:text-zinc-400">
        Bookmarks
      </Link>
    </nav>
  )
} 