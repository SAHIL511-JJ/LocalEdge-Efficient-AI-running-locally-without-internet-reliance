import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

export default async function ChatPage({ params }: any) {
  const { id } = await params;

  return (
    <div className="flex flex-col h-full">
      <ChatWindow conversationId={id} />
      <ChatInput conversationId={id} />
    </div>
  );
}
