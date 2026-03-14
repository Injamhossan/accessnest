import axios from "axios";
import crypto from "crypto";

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
const FB_TEST_EVENT_CODE = process.env.FB_TEST_EVENT_CODE;

interface CapiEventParams {
  eventName: string;
  eventSourceUrl: string;
  userData: {
    em?: string;
    ph?: string;
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string;
    fbp?: string;
  };
  customData?: any;
  eventId?: string;
}

export const trackCapiEvent = async ({
  eventName,
  eventSourceUrl,
  userData,
  customData,
  eventId,
}: CapiEventParams) => {
  if (!FB_PIXEL_ID || !FB_ACCESS_TOKEN) {
    console.warn("Facebook Pixel ID or Access Token missing. CAPI event not tracked.");
    return;
  }

  // Hash user data (Facebook requires SHA256 for email/phone)
  const hash = (data?: string) => {
    if (!data) return undefined;
    return crypto.createHash("sha256").update(data.toLowerCase().trim()).digest("hex");
  };

  const payload = {
    data: [
      {
        event_name: eventName,
        event_id: eventId,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url: eventSourceUrl,
        user_data: {
          em: userData.em ? [hash(userData.em)] : undefined,
          ph: userData.ph ? [hash(userData.ph)] : undefined,
          client_ip_address: userData.client_ip_address,
          client_user_agent: userData.client_user_agent,
          fbc: userData.fbc,
          fbp: userData.fbp,
        },
        custom_data: customData,
      },
    ],
    ...(FB_TEST_EVENT_CODE ? { test_event_code: FB_TEST_EVENT_CODE } : {}),
  };

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${FB_PIXEL_ID}/events`,
      payload,
      {
        params: { access_token: FB_ACCESS_TOKEN },
      }
    );
    console.log(`CAPI Event [${eventName}] sent successfully:`, response.data);
    return response.data;
  } catch (error: any) {
    console.error(`CAPI Event [${eventName}] error:`, error.response?.data || error.message);
  }
};
