import { ArrowUpRight } from "lucide-react";
import { getContributions } from "@/lib/api/contributions";
import { siteConfig } from "@/lib/constants/config";
import { ContributedRepos, ContributionActivity } from "@/components/sections/ContributionActivity";

// Rebuild at most once an hour; GitHub search results are cached for the same period.
export const revalidate = 3600;

export default async function OpenSourceActivityPage() {
    const data = await getContributions();

    const stats = data
        ? [
              { label: "Merged PRs", value: data.items.merged.length },
              { label: "Open PRs", value: data.items.openPr.length },
              {
                  label: "Issues opened",
                  value: data.items.openIssue.length + data.items.closedIssue.length,
              },
              { label: "Repositories", value: data.repos.length },
          ]
        : [];

    return (
        <div className="mx-auto max-w-6xl px-4 pt-24 pb-20">
            <div className="max-w-3xl">
                <h1 className="text-4xl font-medium tracking-tight md:text-5xl">
                    Open source activity
                </h1>
                <p className="mt-4 max-w-full text-lg text-muted-foreground sm:max-w-[58ch]">
                    Pull requests and issues I have opened in other people&apos;s public projects.
                </p>
            </div>

            {data ? (
                <>
                    <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="bg-card p-5">
                                <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                                <dd className="mt-1 text-3xl font-medium tabular-nums">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                    {data.partial && (
                        <p className="mt-3 text-sm text-muted-foreground">
                            GitHub search returns at most 1,000 results per query, so some counts
                            are lower than the real totals.
                        </p>
                    )}

                    <ContributionActivity items={data.items} />
                    <ContributedRepos repos={data.repos} />
                </>
            ) : (
                <p className="mt-10 text-sm text-muted-foreground">
                    GitHub activity is unavailable right now.{" "}
                    <a
                        href={`https://github.com/search?type=pullrequests&q=${encodeURIComponent(`is:pr author:${siteConfig.githubUsername} -user:${siteConfig.githubUsername}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                        See my pull requests on GitHub
                        <ArrowUpRight className="size-4" />
                    </a>
                </p>
            )}
        </div>
    );
}
