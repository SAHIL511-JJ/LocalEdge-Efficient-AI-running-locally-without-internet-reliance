// app/chat/[id]/page.tsx

import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

type ChatPageParams = Promise<{ id: string }>;

export default async function ChatPage({ params }: { params: ChatPageParams }) {
  const { id } = await params;

  return (
    <div className="flex flex-col h-full">
      <ChatWindow conversationId={id} />
      <ChatInput conversationId={id} />
    </div>
  );
}
