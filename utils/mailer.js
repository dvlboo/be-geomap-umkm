const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service : 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

exports.sendEmailResetPassword = async (email, link, user) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset Password',
    html: `
      <p>Hi ${user.username},</p>
      <p>You requested to reset your password. Click the link below to reset it:</p>
      <a href="${link}">Change Password</a>
      <p>If you did not request this, please ignore this email.</p>
      <p>Thanks,</p>
      <p>Geomap UMKM</p>
    `
  }

  await transporter.sendMail(mailOptions)
}
