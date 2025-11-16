export default function ChatMessage({
  message,
  role,
}: {
  message: string;
  role: "user" | "assistant";
}) {
  return (
    <div
      className={`p-3 rounded-xl max-w-xl ${
        role === "assistant"
          ? "glass-card"
          : "bg-primary-500 text-white ml-auto"
      }`}
    >
      {message}
    </div>
  );
}
