import Sidebar from "./components/Sidebar";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col gap-6 bg-gradient-to-br from-primary-50 via-white to-white/70 px-4 py-4 text-slate-900 lg:flex-row lg:gap-8 lg:px-8 lg:py-6">
      <div className="lg:h-full lg:w-[320px] lg:flex-none">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-glass backdrop-blur-2xl">
        {children}
      </div>
    </div>
  );
}
