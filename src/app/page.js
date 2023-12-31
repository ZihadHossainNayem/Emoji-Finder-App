import { EmojiShowcase } from "./components/EmojiShowcase";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <EmojiShowcase />
    </main>
  );
}
