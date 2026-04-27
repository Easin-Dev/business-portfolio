import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Subscriber from '@/models/Subscriber';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    await dbConnect();

    // Check if already exists
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json({ message: 'You are already subscribed!' }, { status: 200 });
      } else {
        existing.status = 'active';
        await existing.save();
      }
    } else {
      await Subscriber.create({ email });
    }

    // Optional: Send Welcome Email
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"ScaleUp Web" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to ScaleUp Web Newsletter! 🚀',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
            <h2 style="color: #6d28d9;">Welcome to the ScaleUp Family!</h2>
            <p>Hi there,</p>
            <p>Thank you for subscribing to our newsletter. You'll now be the first to know about our latest articles, expert insights, and exclusive updates on web development and digital marketing.</p>
            <p>We're excited to have you with us!</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 12px; color: #999;">If you didn't subscribe to this list, you can ignore this email.</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Welcome email error:', emailError);
      // Continue even if email fails
    }

    return NextResponse.json({ message: 'Successfully subscribed!' }, { status: 201 });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Failed to subscribe. Please try again later.' }, { status: 500 });
  }
}
