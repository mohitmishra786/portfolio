import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Terminal } from "@/components/sections/Terminal";
import { Newsletter } from "@/components/sections/Newsletter";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <About />
      <Terminal />
      <Newsletter />
      <Contact />
    </div>
  );
}
