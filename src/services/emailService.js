const nodemailer = require('nodemailer')
const templates  = require('../templates/emailTemplates')

// SMTP transporter using env credentials
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

/**
 * Send lead notification to admin + confirmation to lead (if email provided).
 * @param {string} slug   - e.g. 'gaurs-bento' or 'au-cosmos'
 * @param {object} data   - { name, email, phone, comment, source, interested_in }
 */
async function sendLeadEmails(slug, data) {
  const tpl = templates[slug]
  if (!tpl) return  // no template for this slug — skip silently

  const adminEmail = process.env.ADMIN_EMAIL

  // 1. Admin notification — always send
  await transporter.sendMail({
    from:    `"Truelite Estates Leads" <${process.env.SMTP_USER}>`,
    to:      adminEmail,
    subject: tpl.adminSubject(data),
    html:    tpl.adminHtml(data),
  })

  // 2. Lead confirmation — only if they provided an email
  if (data.email) {
    await transporter.sendMail({
      from:    `"Truelite Estates" <${process.env.SMTP_USER}>`,
      to:      data.email,
      subject: tpl.leadSubject(data),
      html:    tpl.leadHtml(data),
    })
  }
}

module.exports = { sendLeadEmails }
