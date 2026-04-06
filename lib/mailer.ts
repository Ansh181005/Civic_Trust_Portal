import nodemailer from "nodemailer"

export type NotificationEmailInput = {
  to: string
  subject: string
  title: string
  message: string
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
