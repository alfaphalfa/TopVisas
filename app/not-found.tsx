import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="text-xl mt-4">Page not found</p>
        <Link href="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg">
          Go Home
        </Link>
      </div>
    </div>
  )
}