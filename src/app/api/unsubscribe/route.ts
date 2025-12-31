import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import CryptoJS from "crypto-js";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        const token = searchParams.get("token");

        if (!email || !token) {
            return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
        }

        // Validate token
        const secret = process.env.UNSUBSCRIBE_SECRET || "fallback_secret_change_me";
        const expectedToken = CryptoJS.HmacSHA256(email, secret).toString();

        if (token !== expectedToken) {
            return NextResponse.json({ error: "Invalid token" }, { status: 403 });
        }

        const transporter = nodemailer.createTransport({
            host: "smtppro.zoho.in",
            port: 587,
            secure: false,
            auth: {
                user: "admin@mohitmishra7.com",
                pass: process.env.ZOHO_PASSWORD,
            },
        });

        // Notify Admin
        await transporter.sendMail({
            from: '"System" <subscribe@mohitmishra7.com>',
            to: "admin@mohitmishra7.com",
            subject: "Unsubscribe Request",
            text: `User ${email} has requested to unsubscribe via one-click link.`,
        });

        // Confirm to User
        await transporter.sendMail({
            from: '"Mohit Mishra" <subscribe@mohitmishra7.com>',
            to: email,
            subject: "You've been unsubscribed",
            html: `
                <div style="font-family: 'JetBrains Mono', monospace; background-color: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 8px;">
                    <h1 style="color: #f87171;">Unsubscribed</h1>
                    <p>You've been successfully removed from the updates list. We're sorry to see you go!</p>
                    <p style="margin-top: 20px; font-size: 14px; color: #737373;">
                        If this was a mistake, you can always subscribe again on the website.
                    </p>
                </div>
            `,
        });

        // Redirect to success page
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        return NextResponse.redirect(`${baseUrl}/unsubscribe-success`);
    } catch (error) {
        console.error("Unsubscribe Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
