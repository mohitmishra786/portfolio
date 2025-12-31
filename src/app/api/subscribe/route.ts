import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import CryptoJS from "crypto-js";

export async function POST(req: Request) {
    try {
        const { email, honeypot } = await req.json();

        // Basic honeypot check
        if (honeypot) {
            return NextResponse.json({ message: "Spam detected" }, { status: 400 });
        }

        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: "smtppro.zoho.in",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "admin@mohitmishra7.com",
                pass: process.env.ZOHO_PASSWORD,
            },
        });

        // Generate secure unsubscribe token
        const secret = process.env.UNSUBSCRIBE_SECRET || "fallback_secret_change_me";
        const token = CryptoJS.HmacSHA256(email, secret).toString();
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const unsubscribeLink = `${baseUrl}/api/unsubscribe?email=${encodeURIComponent(email)}&token=${token}`;

        // Send confirmation to user
        const mailOptions = {
            from: '"Mohit Mishra" <subscribe@mohitmishra7.com>',
            to: email,
            bcc: "admin@mohitmishra7.com",
            subject: "Welcome to Mohit Mishra's Tech Updates! 🚀",
            headers: {
                "List-Unsubscribe": `<${unsubscribeLink}>`,
            },
            html: `
                <div style="font-family: 'JetBrains Mono', monospace; background-color: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 8px; border: 1px solid #333;">
                    <h1 style="color: #10b981;">Thanks for subscribing!</h1>
                    <p style="font-size: 16px; line-height: 1.6;">
                        You're now on the list to receive updates on:
                    </p>
                    <ul style="color: #a3a3a3; line-height: 1.8;">
                        <li>Systems Programming & OS Development</li>
                        <li>Low-Level Engineering (C/C++, Assembly)</li>
                        <li>Kernel Internals & Memory Management</li>
                        <li>Performance Optimizations</li>
                    </ul>
                    <div style="margin-top: 40px; border-top: 1px solid #333; padding-top: 20px;">
                        <p style="font-size: 14px; color: #737373; margin-bottom: 20px;">
                            Stay low-level! 💻
                        </p>
                        <div style="font-size: 12px; color: #555; margin-bottom: 20px;">
                            Mohit Mishra | Systems & OS Specialist<br>
                            Remote Office, Bengaluru, Karnataka, India
                        </div>
                        <a href="${unsubscribeLink}" 
                           style="display: inline-block; padding: 10px 20px; background-color: #333; color: #a3a3a3; text-decoration: none; border-radius: 6px; font-size: 12px; border: 1px solid #444;">
                            Unsubscribe
                        </a>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Subscribed successfully" }, { status: 200 });
    } catch (error) {
        console.error("Subscription Error:", error);
        return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }
}
