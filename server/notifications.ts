import sgMail from "@sendgrid/mail";
import twilio from "twilio";

const sendgridApiKey = process.env.SENDGRID_API_KEY;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
}

const twilioClient = twilioAccountSid && twilioAuthToken 
  ? twilio(twilioAccountSid, twilioAuthToken) 
  : null;

export async function sendEmail(to: string, subject: string, text: string, html?: string) {
  if (!sendgridApiKey) {
    console.log("📧 Email (SendGrid not configured):", { to, subject, text });
    return;
  }

  try {
    await sgMail.send({
      to,
      from: "logistics@logisticspro.com", // You should verify this domain in SendGrid
      subject,
      text,
      html: html || text,
    });
    console.log("📧 Email sent to:", to);
  } catch (error) {
    console.error("Email error:", error);
  }
}

export async function sendSMS(to: string, body: string) {
  if (!twilioClient || !twilioPhoneNumber) {
    console.log("📱 SMS (Twilio not configured):", { to, body });
    return;
  }

  try {
    await twilioClient.messages.create({
      body,
      from: twilioPhoneNumber,
      to,
    });
    console.log("📱 SMS sent to:", to);
  } catch (error) {
    console.error("SMS error:", error);
  }
}

export async function notifyOrderStatusChange(
  userEmail: string,
  userPhone: string | null,
  orderNumber: string,
  oldStatus: string,
  newStatus: string
) {
  const emailSubject = `Order ${orderNumber} Status Update`;
  const message = `Your order ${orderNumber} status has been updated from "${oldStatus}" to "${newStatus}".`;

  await sendEmail(userEmail, emailSubject, message);

  if (userPhone && (newStatus === "in-transit" || newStatus === "delivered")) {
    await sendSMS(userPhone, message);
  }
}
