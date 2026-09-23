import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { RecentlyShipped } from "@/components/sections/recently-shipped";
import { Terminal } from "@/components/sections/Terminal";
import { Newsletter } from "@/components/sections/Newsletter";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Work />
      <About />
      <RecentlyShipped />
      <Terminal />
      <Newsletter />
      <Contact />
    </div>
  );
}
