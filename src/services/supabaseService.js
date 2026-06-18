const { createClient } = require('@supabase/supabase-js')
const ws = require('ws')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  { realtime: { transport: ws } }
)

/**
 * Save enquiry to a specific Supabase table.
 * @param {string} tableName  - Supabase table name (e.g. 'Gaurs-Enquries')
 * @param {object} data       - { full_name, email, phone, comment, source }
 */
async function saveEnquiry(tableName, data) {
  // Remove null/undefined fields — handles tables with different column sets
  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([, v]) => v !== null && v !== undefined)
  )
  const { error } = await supabase.from(tableName).insert([cleanData])
  if (error) throw new Error(error.message)
}

module.exports = { saveEnquiry }
