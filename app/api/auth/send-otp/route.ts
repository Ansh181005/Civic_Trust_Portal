import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import * as nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env

    if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: 'Setup error: Missing Supabase Admin credentials.' },
        { status: 500 }
      )
    }

    const supabaseAdmin = createClient(
      NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY
    )

    // Generate the OTP (bypasses sending Supabase's built in email since we use Admin API)
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email,
    })

    if (linkError) {
      console.error('Supabase generateLink Error:', linkError)
      return NextResponse.json({ error: linkError.message }, { status: 400 })
    }

    // Supabase returns the raw OTP via properties.email_otp
    const otpCode = linkData?.properties?.email_otp
    if (!otpCode) {
      return NextResponse.json({ error: 'Failed to generate OTP code.' }, { status: 500 })
    }

    // Now send the email manually with NodeMailer!
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env
    
    // Fallback if SMTP is not fully configured, send an error to front end early
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
      return NextResponse.json(
        { error: 'Setup error: Missing SMTP email credentials in .env.local' },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })

    const mailOptions = {
      from: `"Civic Trust" <${SMTP_FROM}>`,
      to: email,
      subject: 'Your Civic Trust Login Code',
      text: `Your login code is ${otpCode}. It expires in 5 minutes.`,
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; text-align: center;">
          <h2 style="color: #1E3A5F;">Civic Trust Portal</h2>
          <p>You requested to sign in. Here is your verification code:</p>
          <div style="background-color: #f3f4f6; padding: 20px; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; border-radius: 8px;">
            ${otpCode}
          </div>
          <p style="color: #6b7280; font-size: 14px;">This code will expire in 5 minutes.</p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Email API Error:', error)
    return NextResponse.json(
      { error: error?.message || 'An unexpected error occurred while sending email.' },
      { status: 500 }
    )
  }
}
