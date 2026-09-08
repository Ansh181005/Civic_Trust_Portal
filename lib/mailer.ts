import nodemailer from "nodemailer"

export type NotificationEmailInput = {
  to: string
  subject: string
  title: string
  message: string
}

export type WelcomeEmailInput = {
  to: string
  name: string
}

export type PasswordResetEmailInput = {
  to: string
  resetLink: string
  name: string
}

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })
}

// Welcome email after sign-up
export async function sendWelcomeEmail({ to, name }: WelcomeEmailInput) {
  const transporter = createTransporter()
  const from = process.env.SMTP_FROM
  if (!transporter || !from) {
    throw new Error("SMTP not configured")
  }

  await transporter.sendMail({
    from: `"Civic Trust" <${from}>`,
    to,
    subject: "Welcome to Civic Trust Portal!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
        <div style="background-color: white; border-radius: 8px; padding: 40px; text-align: center;">
          <h1 style="margin: 0 0 16px; color: #1e3a5f; font-size: 28px;">Welcome to Civic Trust</h1>
          <p style="margin: 0 0 24px; color: #334155; font-size: 16px; line-height: 1.6;">
            Hi ${name},<br/>
            Thank you for joining our community. You now have access to government schemes, scholarships, job opportunities, and more.
          </p>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard" style="display: inline-block; background-color: #0f766e; color: white; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: bold; margin: 16px 0;">
            Go to Dashboard
          </a>
          <p style="margin: 32px 0 0; font-size: 12px; color: #64748b;">
            Civic Trust - Empowering Citizens Through Transparency & Access
          </p>
        </div>
      </div>
    `,
  })
}

// Password reset email
export async function sendPasswordResetEmail({ to, name, resetLink }: PasswordResetEmailInput) {
  const transporter = createTransporter()
  const from = process.env.SMTP_FROM
  if (!transporter || !from) {
    throw new Error("SMTP not configured")
  }

  await transporter.sendMail({
    from: `"Civic Trust" <${from}>`,
    to,
    subject: "Reset Your Password - Civic Trust",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
        <div style="background-color: white; border-radius: 8px; padding: 40px;">
          <h2 style="margin: 0 0 16px; color: #1e3a5f;">Password Reset Request</h2>
          <p style="margin: 0 0 16px; color: #334155; line-height: 1.6;">
            Hi ${name},
          </p>
          <p style="margin: 0 0 24px; color: #334155; line-height: 1.6;">
            You requested to reset your password. Click the button below to create a new password.
          </p>
          <a href="${resetLink}" style="display: inline-block; background-color: #dc2626; color: white; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: bold; margin: 16px 0;">
            Reset Password
          </a>
          <p style="margin: 24px 0 0; color: #64748b; font-size: 12px;">
            This link expires in 1 hour. If you didn't request this, please ignore this email.
          </p>
        </div>
      </div>
    `,
  })
}

// Notification email
export async function sendNotificationEmail(input: NotificationEmailInput) {
  const transporter = createTransporter()
  const from = process.env.SMTP_FROM
  if (!transporter || !from) {
    throw new Error("SMTP not configured")
  }

  await transporter.sendMail({
    from: `"Civic Trust" <${from}>`,
    to: input.to,
    subject: input.subject,
    priority: "high",
    headers: {
      "X-Priority": "1",
      "X-MSMail-Priority": "High",
      Importance: "High",
    },
    text: `${input.title}\n\n${input.message}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px;">
        <h2 style="margin: 0 0 12px; color: #1e3a5f;">${input.title}</h2>
        <p style="margin: 0 0 16px; color: #334155; line-height: 1.5;">${input.message}</p>
        <p style="font-size: 12px; color: #64748b;">
          This alert is from Civic Trust realtime notifications.
        </p>
      </div>
    `,
  })
}
