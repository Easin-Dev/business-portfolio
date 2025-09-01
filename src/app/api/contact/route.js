// app/api/contact/route.js

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

        const mailOptions = {
            from: `"${fullName}" <${email}>`,
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

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });

    } catch (error) {
        console.error('Email sending error:', error);
        return NextResponse.json({ message: 'Failed to send email. Please try again later.' }, { status: 500 });
    }
}