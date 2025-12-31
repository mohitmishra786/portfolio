"use client";

import { useEffect } from "react";

export function DataPrefetcher() {
    useEffect(() => {
        // Silently fetch data to prime the cache
        // We don't care about the response here, the server-side cache utility 
        // will handle storing the result for subsequent calls.
        const prefetch = async () => {
            try {
                // Prefetch GitHub data
                fetch("/api/github").catch(() => { });

                // Prefetch Blog data
                fetch("/api/blog").catch(() => { });
            } catch (error) {
                // Silently ignore prefetch errors
            }
        };

        // Delay prefetch slightly to prioritize critical path rendering
        const timer = setTimeout(prefetch, 1000);
        return () => clearTimeout(timer);
    }, []);

    return null;
}
