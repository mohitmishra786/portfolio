"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SimpleRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace("https://single-page-portfolio-rose.vercel.app");
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-muted-foreground">Redirecting...</p>
        </div>
    );
}
