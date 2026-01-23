import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { fullName, whatsapp, email, budget, details } = await req.json();

        // Server-side validation
        if (!fullName || !email || !budget || !details) {
            return NextResponse.json({ message: 'Please fill out all required fields.' }, { status: 400 });
        }

        // Configure your email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // 1. Email to Admin (Apnar kase jeta ashbe)
        const adminMailOptions = {
            from: `"${fullName}" <${process.env.EMAIL_USER}>`, // Gmail er khetre 'from' field e nijer email thaka valo na hole spam e jete pare
            replyTo: email,
            to: process.env.EMAIL_TO,
            subject: `New Project Inquiry from ${fullName}`,
            html: `
                <div style="font-family: sans-serif; line-height: 1.6;">
                    <h2 style="color: #333;">New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${fullName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>WhatsApp:</strong> ${whatsapp || 'N/A'}</p>
                    <p><strong>Project Budget:</strong> ${budget}</p>
                    <p><strong>Project Details:</strong></p>
                    <p style="white-space: pre-wrap; background-color: #f7f7f7; padding: 15px; border-radius: 8px;">${details}</p>
                </div>
            `,
        };

        // 2. Auto-reply Email to User (User-er kase jeta jabe)
        const userMailOptions = {
            from: `"Scaleup Web" <${process.env.EMAIL_USER}>`,
            to: email, // User er input deya email
            subject: `Thank you for contacting us, ${fullName}!`,
            html: `
                <div style="font-family: sans-serif; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
                    <h2 style="color: #0070f3;">Hello ${fullName},</h2>
                    <p>Amader kase email korar jonno dhonnobad. Amra apnar message-ti peyechi.</p>
                    <p>Amader team khub shiggroi apnar details review korbe ebong apnar sathe contact korbe meeting e bose project niye kotha bolar jonno.</p>
                    <hr style="border: none; border-top: 1px solid #eee;" />
                    <p style="font-size: 12px; color: #888;">This is an automated response. Please do not reply directly to this email.</p>
                </div>
            `,
        };

        // Dono email-i eksathe pathano (Promise.all use kora best practice)
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(userMailOptions)
        ]);

        return NextResponse.json({ message: 'Emails sent successfully!' }, { status: 200 });

    } catch (error) {
        console.error('Email sending error:', error);
        return NextResponse.json({ message: 'Failed to send email. Please try again later.' }, { status: 500 });
    }
}