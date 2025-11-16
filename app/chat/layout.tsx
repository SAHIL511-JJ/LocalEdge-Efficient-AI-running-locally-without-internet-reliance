import Sidebar from "./components/Sidebar"; // adjust path if needed

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-[260px] border-r border-white/10 bg-white/5 backdrop-blur-xl">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
