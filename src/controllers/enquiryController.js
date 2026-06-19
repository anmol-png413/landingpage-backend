const { saveEnquiry }    = require('../services/supabaseService')
const { sendLeadEmails } = require('../services/emailService')

// Map: landing page slug → { table, columns[] }
// columns: list of fields this table accepts (avoids column-not-found errors)
const TABLE_MAP = {
  'gaurs-bento': {
    table:   'Gaurs-Enquries',
    columns: ['full_name', 'email', 'phone', 'comment', 'source'],
  },
  'au-cosmos': {
    table:   'Au-Enquiries',
    columns: ['full_name', 'phone', 'interested_in', 'source'],
  },
  // New landing page:
  // 'vandemataram': { table: 'Vande-Enquiries', columns: ['full_name','email','phone','comment','source'] },
}

async function submitEnquiry(req, res) {
  try {
    const { slug } = req.params
    const { name, email, phone, comment, source } = req.body

    // Validate slug
    const config = TABLE_MAP[slug]
    if (!config) {
      return res.status(404).json({ success: false, error: `No table mapped for slug: ${slug}` })
    }

    // Validate required field
    if (!phone) {
      return res.status(400).json({ success: false, error: 'Phone number is required' })
    }

    const { interested_in } = req.body

    // Build full data object then keep only columns this table supports
    const allData = {
      full_name:     name           || null,
      email:         email          || null,
      phone,
      comment:       comment        || null,
      interested_in: interested_in  || null,
      source:        source          || slug,
    }

    const filteredData = Object.fromEntries(
      Object.entries(allData).filter(([key]) => config.columns.includes(key))
    )

    await saveEnquiry(config.table, filteredData)

    // Fire emails async — don't block response if email fails
    sendLeadEmails(slug, { name, email, phone, comment, interested_in: req.body.interested_in, source }).catch(
      (err) => console.error('Email send error:', err.message)
    )

    return res.status(200).json({ success: true, message: 'Enquiry saved successfully' })
  } catch (err) {
    console.error('submitEnquiry error:', err.message)
    return res.status(500).json({ success: false, error: 'Internal server error' })
  }
}

module.exports = { submitEnquiry }
