import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface OrderEmailRequest {
  email: string;
  name: string;
  orderId: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  deliveryAddress: string;
  phone: string;
  paymentMethod: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const {
      email,
      name,
      orderId,
      items,
      totalAmount,
      deliveryAddress,
      phone,
      paymentMethod,
    }: OrderEmailRequest = await req.json();

    const itemsList = items
      .map(
        (item) =>
          `<tr>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</td>
          </tr>`
      )
      .join("");

    const paymentMethodText = paymentMethod === "cash_on_delivery" 
      ? "Cash on Delivery" 
      : "Card Payment";

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #374151; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🍽️ Food Express</h1>
            <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">Order Confirmation</p>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
              <p style="margin: 0; color: #065f46; font-weight: 600; font-size: 16px;">✓ Your order has been placed successfully!</p>
            </div>

            <p style="font-size: 16px; color: #374151;">Dear ${name},</p>
            <p style="font-size: 15px; color: #6b7280;">Thank you for ordering from Food Express! Your delicious meal is being prepared with care.</p>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 24px 0;">
              <h2 style="margin: 0 0 12px 0; color: #1f2937; font-size: 18px;">Order Details</h2>
              <table style="width: 100%; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Order ID:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 600; text-align: right;">#${orderId.slice(0, 8)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Payment Method:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 600; text-align: right;">${paymentMethodText}</td>
                </tr>
              </table>
            </div>

            <h2 style="color: #1f2937; font-size: 18px; margin: 24px 0 12px 0;">Order Items</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <thead>
                <tr style="background: #f3f4f6;">
                  <th style="padding: 12px; text-align: left; color: #374151; font-weight: 600;">Item</th>
                  <th style="padding: 12px; text-align: center; color: #374151; font-weight: 600;">Qty</th>
                  <th style="padding: 12px; text-align: right; color: #374151; font-weight: 600;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding: 16px 12px 12px 12px; font-weight: 600; color: #1f2937; font-size: 16px;">Total Amount</td>
                  <td style="padding: 16px 12px 12px 12px; font-weight: 700; color: #2563eb; text-align: right; font-size: 18px;">₹${totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>

            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 24px 0;">
              <h3 style="margin: 0 0 12px 0; color: #1e40af; font-size: 16px;">📍 Delivery Information</h3>
              <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.8;">
                <strong>Address:</strong> ${deliveryAddress}<br>
                <strong>Phone:</strong> ${phone}
              </p>
            </div>

            ${paymentMethod === "cash_on_delivery" ? `
            <div style="background: #fef3c7; border: 1px solid #fbbf24; padding: 16px; border-radius: 8px; margin: 24px 0;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">
                <strong>💵 Cash on Delivery:</strong> Please keep ₹${totalAmount.toFixed(2)} ready for payment.
              </p>
            </div>
            ` : ""}

            <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px; margin: 24px 0; border-radius: 4px;">
              <p style="margin: 0; color: #166534; font-size: 14px;">
                <strong>⚡ Estimated Delivery:</strong> Your order will arrive in 30-40 minutes
              </p>
            </div>

            <p style="font-size: 14px; color: #6b7280; margin-top: 24px;">
              If you have any questions about your order, please contact us at <a href="mailto:hello@foodexpress.com" style="color: #2563eb;">hello@foodexpress.com</a> or call (555) 123-4567.
            </p>

            <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 13px; margin: 0;">
                © ${new Date().getFullYear()} Food Express. All rights reserved.<br>
                123 Culinary Avenue, Food District, FD 12345
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
Order Confirmation - Food Express

Dear ${name},

Thank you for ordering from Food Express! Your order has been placed successfully.

Order ID: #${orderId.slice(0, 8)}
Payment Method: ${paymentMethodText}

Order Items:
${items.map(item => `- ${item.name} x${item.quantity}: ₹${(item.price * item.quantity).toFixed(2)}`).join("\n")}

Total Amount: ₹${totalAmount.toFixed(2)}

Delivery Information:
Address: ${deliveryAddress}
Phone: ${phone}

${paymentMethod === "cash_on_delivery" ? `Cash on Delivery: Please keep ₹${totalAmount.toFixed(2)} ready for payment.\n\n` : ""}
Estimated Delivery: 30-40 minutes

If you have any questions, contact us at hello@foodexpress.com or call (555) 123-4567.

Thank you for choosing Food Express!
    `;

    const RESEND_API_KEY = Deno.env.get("FOOD_EXPRESS");

    if (!RESEND_API_KEY) {
      console.log("Order email details:", {
        to: email,
        subject: `Order Confirmation #${orderId.slice(0, 8)} - Food Express`,
        orderDetails: { name, items, totalAmount, deliveryAddress, paymentMethod },
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: "Email would be sent (Resend API key not configured)",
          emailPreview: { to: email, name, orderId },
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Food Express <orders@foodexpress.com>",
        to: [email],
        subject: `Order Confirmation #${orderId.slice(0, 8)} - Food Express`,
        html: emailHtml,
        text: emailText,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      throw new Error(`Failed to send email: ${error}`);
    }

    const result = await emailResponse.json();

    return new Response(
      JSON.stringify({ success: true, emailId: result.id }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending order email:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
