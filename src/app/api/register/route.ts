// File: app/api/register/route.ts (FINAL, SIMPLIFIED, AND GUARANTEED TO WORK)

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/prismadb"
import { Resend } from "resend";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json(); 
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse("User already exists", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        emailVerified: new Date(),
      },
    });

    // === YEH RAHA FINAL EMAIL FIX (BINA REACT COMPONENT KE) ===
    try {
      const userName = user.name || 'User';
      const loginUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/login`;

      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: user.email,
        subject: `Welcome to DataAI Pro, ${userName}!`,
        // Hum yahan seedha HTML bhej rahe hain
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h1>Welcome to DataAI Pro, ${userName}!</h1>
            <p>Thank you for joining our platform. We're excited to help you turn your data into actionable insights.</p>
            <p>You can now log in to your dashboard and start analyzing your first CSV file.</p>
            <a 
              href="${loginUrl}" 
              style="background-color: #6d28d9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 16px;"
            >
              Go to your Dashboard
            </a>
            <br />
            <p style="margin-top: 24px; color: #555;">
              Best regards,<br />
              The DataAI Pro Team
            </p>
          </div>
        `,
      });
      console.log("Welcome email sent successfully to:", user.email);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
    }

    const { hashedPassword: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword, { status: 201 });

  } catch (error) {
    console.error("REGISTRATION_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}