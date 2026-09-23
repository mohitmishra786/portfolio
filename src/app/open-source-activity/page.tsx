import { Projects } from "@/components/sections/Projects";
import { LatestContributions } from "@/components/sections/LatestContributions";

export default function OpenSourceActivityPage() {
    return (
        <div className="mx-auto max-w-6xl px-4 pt-24 pb-20">
            <div className="max-w-3xl">
                <h1 className="text-4xl font-medium tracking-tight md:text-5xl">
                    Open source activity
                </h1>
                <p className="mt-4 max-w-full text-lg text-muted-foreground sm:max-w-[58ch]">
                    Recent public pushes, plus the repositories people star and fork.
                </p>
            </div>

            <LatestContributions />
            <Projects hideHeader />
        </div>
    );
}
