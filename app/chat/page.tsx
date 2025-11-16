import Sidebar from "./components/Sidebar";

export default function ChatHome() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex items-center justify-center flex-1 glass-card text-center">
        <div>
          <h1 className="text-2xl font-semibold">Start a New Chat</h1>
          <p className="text-gray-600 mt-2">
            Select a conversation or create a new one.
          </p>
        </div>
      </div>
    </div>
  );
}
