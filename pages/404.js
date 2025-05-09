import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center font-sans">
      <h1 className="text-6xl text-red-500 font-bold">404</h1>
      <p className="text-xl my-4">Oops! Page Not Found</p>
      <p className="text-lg">The page you are looking for might have been removed or never existed.</p>
      <Link 
        href="/"
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
