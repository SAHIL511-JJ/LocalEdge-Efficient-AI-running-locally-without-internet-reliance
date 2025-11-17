// app/chat/[id]/page.tsx

import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

interface ChatPageProps {
  params: {
    id: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  const { id } = params;

  return (
    <div className="flex flex-col h-full">
      <ChatWindow conversationId={id} />
      <ChatInput conversationId={id} />
    </div>
  );
}
