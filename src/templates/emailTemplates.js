// Dynamic email templates per landing page / project
const templates = {
  'gaurs-bento': {
    projectName:  'Gaurs Codename Bento',
    location:     'Yamuna Expressway, Sector 19, Greater Noida',
    developer:    'Gaurs Group',

    // Email sent to ADMIN when new lead comes in
    adminSubject: (data) =>
      `🏠 New Lead — Gaurs Codename Bento | ${data.phone}`,

    adminHtml: (data) => `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0c898;border-radius:8px;overflow:hidden;">
        <div style="background:#C8943A;padding:20px 24px;">
          <h2 style="color:#fff;margin:0;font-size:18px;">New Lead — Gaurs Codename Bento</h2>
          <p style="color:#fff3d6;margin:4px 0 0;font-size:13px;">Yamuna Expressway, Sector 19, Greater Noida</p>
        </div>
        <div style="padding:24px;background:#fffdf7;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#888;width:120px;">Name</td><td style="padding:8px 0;color:#1a1a1a;font-weight:600;">${data.name || '—'}</td></tr>
            <tr style="background:#fdf6e8;"><td style="padding:8px 6px;color:#888;">Phone</td><td style="padding:8px 6px;color:#1a1a1a;font-weight:600;">${data.phone}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;color:#1a1a1a;">${data.email || '—'}</td></tr>
            <tr style="background:#fdf6e8;"><td style="padding:8px 6px;color:#888;">Comment</td><td style="padding:8px 6px;color:#1a1a1a;">${data.comment || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Source</td><td style="padding:8px 0;color:#C8943A;font-size:12px;">${data.source || '—'}</td></tr>
          </table>
        </div>
        <div style="background:#f5edde;padding:12px 24px;font-size:11px;color:#999;text-align:center;">
          Truelite Estates LLP &middot; Authorized Channel Partner of Gaurs Group
        </div>
      </div>
    `,

    // Email sent to LEAD (only if they provided email)
    leadSubject: () =>
      `Thank you for your interest in Gaurs Codename Bento`,

    leadHtml: (data) => `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0c898;border-radius:8px;overflow:hidden;">
        <div style="background:#C8943A;padding:24px;">
          <h2 style="color:#fff;margin:0;font-size:20px;">Thank You, ${data.name || 'there'}!</h2>
          <p style="color:#fff3d6;margin:6px 0 0;font-size:13px;">We have received your enquiry.</p>
        </div>
        <div style="padding:24px;background:#fffdf7;">
          <p style="color:#444;font-size:14px;line-height:1.7;">
            Thank you for showing interest in <strong>Gaurs Codename Bento</strong> — Luxury Studio Residences at
            Yamuna Expressway, Sector 19, Greater Noida by <strong>Gaurs Group</strong>.
          </p>
          <p style="color:#444;font-size:14px;line-height:1.7;">
            Our team will get in touch with you within <strong>24 hours</strong> to share complete project details,
            pricing, and floor plans.
          </p>
          <div style="background:#fdf6e8;border-left:3px solid #C8943A;padding:14px 18px;margin:20px 0;border-radius:4px;">
            <p style="margin:0;font-size:13px;color:#7a5c1e;">For urgent enquiries, call us at:</p>
            <p style="margin:4px 0 0;font-size:16px;font-weight:bold;color:#C8943A;">9711557670</p>
          </div>
          <p style="color:#888;font-size:12px;">— Team Truelite Estates</p>
        </div>
        <div style="background:#f5edde;padding:12px 24px;font-size:11px;color:#999;text-align:center;">
          Truelite Estates LLP &middot; omvir.shishodia@truelitestates.com
        </div>
      </div>
    `,
  },

  'au-cosmos': {
    projectName:  'AU Cosmos Corner',
    location:     'Siddharth Vihar, Ghaziabad',
    developer:    'AU Real Estate Pvt. Ltd.',

    adminSubject: (data) =>
      `🏠 New Lead — AU Cosmos Corner | ${data.phone}`,

    adminHtml: (data) => `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #ccc;border-radius:8px;overflow:hidden;">
        <div style="background:#501313;padding:20px 24px;">
          <h2 style="color:#fff;margin:0;font-size:18px;">New Lead — AU Cosmos Corner</h2>
          <p style="color:#f5c2c2;margin:4px 0 0;font-size:13px;">Siddharth Vihar, Ghaziabad</p>
        </div>
        <div style="padding:24px;background:#fff;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#888;width:140px;">Name</td><td style="padding:8px 0;color:#1a1a1a;font-weight:600;">${data.name || '—'}</td></tr>
            <tr style="background:#fdf0f0;"><td style="padding:8px 6px;color:#888;">Phone</td><td style="padding:8px 6px;color:#1a1a1a;font-weight:600;">${data.phone}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Interested In</td><td style="padding:8px 0;color:#1a1a1a;">${data.interested_in || '—'}</td></tr>
            <tr style="background:#fdf0f0;"><td style="padding:8px 6px;color:#888;">Source</td><td style="padding:8px 6px;color:#501313;font-size:12px;">${data.source || '—'}</td></tr>
          </table>
        </div>
        <div style="background:#f9f0f0;padding:12px 24px;font-size:11px;color:#999;text-align:center;">
          Truelite Estates LLP &middot; Authorized Channel Partner of AU Real Estate Pvt. Ltd.
        </div>
      </div>
    `,

    leadSubject: () =>
      `Thank you for your interest in AU Cosmos Corner`,

    leadHtml: (data) => `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #ccc;border-radius:8px;overflow:hidden;">
        <div style="background:#501313;padding:24px;">
          <h2 style="color:#fff;margin:0;font-size:20px;">Thank You, ${data.name || 'there'}!</h2>
          <p style="color:#f5c2c2;margin:6px 0 0;font-size:13px;">We have received your enquiry.</p>
        </div>
        <div style="padding:24px;background:#fff;">
          <p style="color:#444;font-size:14px;line-height:1.7;">
            Thank you for showing interest in <strong>AU Cosmos Corner</strong> — Premium 3 BHK Residences at
            Siddharth Vihar, Ghaziabad by <strong>AU Real Estate Pvt. Ltd.</strong>
          </p>
          <p style="color:#444;font-size:14px;line-height:1.7;">
            Our team will get in touch with you within <strong>24 hours</strong> to share complete project details,
            pricing, and floor plans.
          </p>
          <div style="background:#fdf0f0;border-left:3px solid #501313;padding:14px 18px;margin:20px 0;border-radius:4px;">
            <p style="margin:0;font-size:13px;color:#501313;">For urgent enquiries, call us at:</p>
            <p style="margin:4px 0 0;font-size:16px;font-weight:bold;color:#501313;">9711557670</p>
          </div>
          <p style="color:#888;font-size:12px;">— Team Truelite Estates</p>
        </div>
        <div style="background:#f9f0f0;padding:12px 24px;font-size:11px;color:#999;text-align:center;">
          Truelite Estates LLP &middot; omvir.shishodia@truelitestates.com
        </div>
      </div>
    `,
  },
}

module.exports = templates
