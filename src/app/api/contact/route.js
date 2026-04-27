import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';
import Visitor from '@/models/Visitor';
import { getRequestMeta } from '@/lib/requestMeta';

export async function POST(req) {
    try {
        const { fullName, whatsapp, email, budget, details, visitorId, sourcePage } = await req.json();
        const { ipAddress, userAgent, referrer } = getRequestMeta(req);

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
                    <p><strong>IP Address:</strong> ${ipAddress}</p>
                    <p><strong>Source Page:</strong> ${sourcePage || referrer || 'N/A'}</p>
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
                <div style="font-family: sans-serif; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 30px; border-radius: 12px; background-color: #ffffff;">
                    <h2 style="color: #0070f3; margin-top: 0;">Hello ${fullName},</h2>
                    <p>Amader kase email korar jonno dhonnobad. Amra apnar message-ti peyechi.</p>
                    <p>Amader team khub shiggroi apnar details review korbe ebong apnar sathe contact korbe meeting e bose project niye kotha bolar jonno.</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;" />
                    
                    <div style="text-align: center; padding-top: 10px;">
                        <p style="font-size: 14px; color: #666; margin-bottom: 15px;">Follow us for updates & insights:</p>
                        <div style="margin-bottom: 20px;">
                            <a href="https://www.facebook.com/scaleupweb1" style="display: inline-block; margin: 0 12px; text-decoration: none; color: #1877F2; font-weight: bold; font-size: 14px;">Facebook</a>
                            <a href="https://www.linkedin.com/company/scale-up-web/" style="display: inline-block; margin: 0 12px; text-decoration: none; color: #0A66C2; font-weight: bold; font-size: 14px;">LinkedIn</a>
                            <a href="https://wa.me/your-number-here" style="display: inline-block; margin: 0 12px; text-decoration: none; color: #25D366; font-weight: bold; font-size: 14px;">WhatsApp</a>
                        </div>
                        <p style="font-size: 12px; color: #999;">&copy; ${new Date().getFullYear()} ScaleUp Web. All rights reserved.</p>
                    </div>
                </div>
            `,
        };

        // Save to Database
        try {
            await dbConnect();
            await Lead.create({
                fullName,
                whatsapp,
                email,
                budget,
                details,
                visitorId,
                ipAddress,
                userAgent,
                sourcePage: sourcePage || referrer,
                referrer
            });

            if (visitorId) {
                await Visitor.findOneAndUpdate(
                    { visitorId },
                    {
                        $set: {
                            ipAddress,
                            userAgent,
                            "lead.fullName": fullName,
                            "lead.email": email,
                            "lead.phone": whatsapp || "",
                            "lead.submittedAt": new Date(),
                        },
                    },
                    { upsert: false }
                );
            }
        } catch (dbError) {
            console.error('Database saving error:', dbError);
            // We continue even if DB fails, as email is the primary notification
        }

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
