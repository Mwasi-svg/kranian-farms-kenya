
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuotationEmailRequest {
  quotationData: {
    name: string;
    email: string;
    phone_number: number;
    location: string;
    message?: string;
    howDidYouHear?: string;
    cartItems: Array<{
      name: string;
      quantity: number;
      stemLength?: number;
      headSize?: string;
      category: string;
    }>;
    totalQuantity: number;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { quotationData }: QuotationEmailRequest = await req.json();

    console.log("Processing quotation email for:", quotationData.email);

    // Format cart items for email
    const cartItemsHtml = quotationData.cartItems.map(item => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.stemLength ? item.stemLength + ' cm' : 'N/A'}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.headSize || 'N/A'}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.category}</td>
      </tr>
    `).join('');

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #11b811;">New Quotation Request - Kranian Farms</h2>
        
        <h3>Customer Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${quotationData.name}</li>
          <li><strong>Email:</strong> ${quotationData.email}</li>
          <li><strong>Phone:</strong> ${quotationData.phone_number}</li>
          <li><strong>Location:</strong> ${quotationData.location}</li>
          <li><strong>How they heard about us:</strong> ${quotationData.howDidYouHear || 'Not specified'}</li>
        </ul>

        <h3>Requested Items:</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Product</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Quantity</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Stem Length</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Head Size</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Category</th>
            </tr>
          </thead>
          <tbody>
            ${cartItemsHtml}
          </tbody>
        </table>

        <p><strong>Total Quantity:</strong> ${quotationData.totalQuantity}</p>

        ${quotationData.message ? `
          <h3>Additional Information:</h3>
          <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${quotationData.message}</p>
        ` : ''}

        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #666;">
          This email was sent from the Kranian Farms website quotation system.
        </p>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "Kranian Farms <onboarding@resend.dev>",
      to: ["info@kranianfarms.com"],
      replyTo: quotationData.email,
      subject: `New Quotation Request from ${quotationData.name}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-quotation-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
