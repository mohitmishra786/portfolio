import { socialLinks } from "@/lib/constants/navigation";
import { Github, Linkedin, Twitter, Mail, MessageSquare } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-bold text-gradient">Mohit Mishra</h3>
                        <p className="text-muted-foreground max-w-xs">
                            Systems programming and OS development specialist building the foundations of computing.
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <Github className="w-6 h-6" />
                            <span className="sr-only">GitHub</span>
                        </a>
                        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <Linkedin className="w-6 h-6" />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <Twitter className="w-6 h-6" />
                            <span className="sr-only">Twitter</span>
                        </a>
                        <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <MessageSquare className="w-6 h-6" />
                            <span className="sr-only">Discord</span>
                        </a>
                        <a href={`mailto:${socialLinks.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                            <Mail className="w-6 h-6" />
                            <span className="sr-only">Email</span>
                        </a>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Mohit Mishra. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="/sitemap.xml" className="hover:text-primary transition-colors">Sitemap</a>
                        <a href="/rss.xml" className="hover:text-primary transition-colors">RSS Feed</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
