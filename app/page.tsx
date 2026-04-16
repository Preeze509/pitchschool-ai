import ChatBox from "@/components/ChatBox";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center">
        PitchSchool AI 🎤
      </h1>

      <ChatBox />
    </main>
  );
}