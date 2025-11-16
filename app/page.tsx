import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="glass-card max-w-lg w-full text-center">
        <h1 className="text-3xl font-semibold mb-4 text-primary-500">
          Premium AI Chat App
        </h1>
        <p className="text-gray-700 mb-6">
          A modern, glass-themed AI chat interface powered by DeepSeek.
        </p>

        <Link
          href="/chat"
          className="px-6 py-3 bg-primary-500 text-white rounded-xl shadow-lg"
        >
          Open Chat
        </Link>
      </div>
    </div>
  );
}
