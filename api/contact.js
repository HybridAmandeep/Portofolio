/**
 * Vercel Serverless Function: /api/contact
 * Handles contact form submissions for Amandeep Kumar's portfolio.
 * 
 * Supports:
 * - Input validation & bot honeypot protection
 * - Resend API email dispatch (to amandeep3583kr@gmail.com)
 * - Discord / Telegram webhook notifications (optional)
 * - Clean JSON response
 */

module.exports = async function handler(req, res) {
  // Set CORS and response headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Please send a POST request.'
    });
  }

  try {
    const { name, email, message, 'bot-field': botField } = req.body || {};

    // 1. Honeypot check: if bot-field is filled, silently succeed without sending
    if (botField) {
      console.warn('Bot submission blocked via honeypot field.');
      return res.status(200).json({ success: true, message: 'Message received.' });
    }

    // 2. Validate required inputs
    const trimmedName = (name || '').trim();
    const trimmedEmail = (email || '').trim();
    const trimmedMessage = (message || '').trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: name, email, and message.'
      });
    }

    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    const timestamp = new Date().toISOString();
    const recipient = process.env.CONTACT_EMAIL || 'amandeep3583kr@gmail.com';

    // 3. Dispatch via Resend API if API Key is configured in Vercel Environment Variables
    if (process.env.RESEND_API_KEY) {
      const emailPayload = {
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [recipient],
        reply_to: trimmedEmail,
        subject: `New Portfolio Inquiry from ${trimmedName}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4e4e7; border-radius: 12px; background: #ffffff;">
            <h2 style="color: #18181b; margin-top: 0; font-size: 20px; border-bottom: 2px solid #7cff4f; padding-bottom: 12px;">
              New Inquiry — Portfolio Website
            </h2>
            <p style="margin: 16px 0 8px 0; color: #52525b; font-size: 14px;"><strong>From:</strong> ${trimmedName} (&lt;${trimmedEmail}&gt;)</p>
            <p style="margin: 0 0 16px 0; color: #52525b; font-size: 14px;"><strong>Received:</strong> ${timestamp}</p>
            <div style="background: #f4f4f5; padding: 16px; border-radius: 8px; color: #18181b; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
${trimmedMessage}
            </div>
            <p style="margin-top: 24px; font-size: 12px; color: #a1a1aa; border-top: 1px solid #f4f4f5; padding-top: 12px;">
              Sent from Amandeep Kumar Portfolio.
            </p>
          </div>
        `
      };

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailPayload)
      });

      if (!resendRes.ok) {
        const errorText = await resendRes.text();
        console.error('Resend API Error:', errorText);
      }
    }

    // 4. Dispatch via Discord Webhook if configured
    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [
            {
              title: `💼 New Inquiry: ${trimmedName}`,
              color: 0x7cff4f,
              fields: [
                { name: 'Email', value: trimmedEmail, inline: true },
                { name: 'Message', value: trimmedMessage.slice(0, 1000) }
              ],
              footer: { text: `amandeepkumar.dev • ${timestamp}` }
            }
          ]
        })
      }).catch(err => console.error('Discord Webhook Error:', err));
    }

    // Log to Vercel console for debugging
    console.log(`[Form Submission] Name: ${trimmedName}, Email: ${trimmedEmail}, Length: ${trimmedMessage.length}`);

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. I will get back to you soon.'
    });

  } catch (error) {
    console.error('Error handling contact form:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while sending your message. Please try again or email amandeep3583kr@gmail.com directly.'
    });
  }
};
