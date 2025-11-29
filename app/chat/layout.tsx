import Sidebar from "./components/Sidebar";
import { ThemeProvider } from "../contexts/ThemeContext";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div
        className="flex h-screen flex-col gap-6 px-4 py-4 lg:flex-row lg:gap-8 lg:px-8 lg:py-6 transition-colors duration-300"
        style={{ background: "linear-gradient(180deg, var(--bg-primary), var(--bg-secondary))" }}
      >
        <div className="lg:h-full lg:w-[320px] lg:flex-none">
          <Sidebar />
        </div>

        <div
          className="flex flex-1 flex-col overflow-hidden rounded-3xl shadow-glass backdrop-blur-2xl transition-all duration-300"
          style={{
            backgroundColor: "var(--chat-bg)",
            borderWidth: "1px",
            borderColor: "var(--chat-border)"
          }}
        >
          {children}
        </div>

        <ThemeSwitcher />
      </div>
    </ThemeProvider>
  );
}
