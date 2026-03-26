import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-pink via-lavender to-sky-soft">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-8">Página no encontrada 🌸</p>
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all inline-block"
        >
          Volver al jardín
        </Link>
      </div>
    </div>
  );
}
