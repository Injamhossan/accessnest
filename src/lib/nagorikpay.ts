import axios from "axios";

const API_KEY = process.env.NAGORIKPAY_API_KEY;
const CREATE_URL = process.env.NAGORIKPAY_CREATE_URL;
const VERIFY_URL = process.env.NAGORIKPAY_VERIFY_URL;

export interface NagorikpayCreatePayload {
  cus_name: string;
  cus_email: string;
  amount: string;
  success_url: string;
  cancel_url: string;
  webhook_url?: string;
  meta_data?: any;
}

export interface NagorikpayCreateResponse {
  status: boolean;
  message: string;
  payment_url?: string;
}

export interface NagorikpayVerifyResponse {
  status: string; // COMPLETED or PENDING or ERROR
  cus_name?: string;
  cus_email?: string;
  amount?: string;
  transaction_id: string;
  metadata?: any;
  meta_data?: any;
  payment_method?: string;
  message?: string;
}

export const nagorikpay = {
  createPayment: async (payload: NagorikpayCreatePayload): Promise<NagorikpayCreateResponse> => {
    try {
      const response = await axios.post(CREATE_URL!, payload, {
        headers: {
          "API-KEY": API_KEY,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Nagorikpay Create Payment Error:", error.response?.data || error.message);
      return {
        status: false,
        message: error.response?.data?.message || "Failed to create payment link",
      };
    }
  },

  verifyPayment: async (transaction_id: string): Promise<NagorikpayVerifyResponse> => {
    try {
      const response = await axios.post(
        VERIFY_URL!,
        { transaction_id },
        {
          headers: {
            "API-KEY": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Nagorikpay Verify Payment Error:", error.response?.data || error.message);
      return {
        status: "ERROR",
        transaction_id,
        message: error.response?.data?.message || "Failed to verify payment",
      };
    }
  },
};
