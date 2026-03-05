import axios from "axios";
import { ApiError } from "../app/utils/ApiError";
import envConfig from "../envs";

const emailSender = async (email: string, html: string, subject: string) => {
  const { brevo_api_key, brevo_email, brevo_sender_name } = envConfig.emailSender;

  if (!brevo_api_key) {
    throw new ApiError(500, "Missing BREVO_API_KEY");
  }

  if (!brevo_email) {
    throw new ApiError(500, "Missing BREVO_EMAIL");
  }

  const payload = {
    sender: {
      name: brevo_sender_name || "Swift Learn",
      email: brevo_email,
    },
    to: [{ email }],
    subject,
    htmlContent: html,
  };

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      payload,
      {
        headers: {
          accept: "application/json",
          "api-key": brevo_api_key,
          "content-type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Brevo API Error:", {
        status: error.response?.status,
        data: error.response?.data,
      });
      throw new Error(
        (error.response?.data as { message?: string } | undefined)?.message ||
        "Failed to send email with Brevo"
      );
    }

    throw new ApiError(500, "Failed to send email with Brevo");
  }
};

export default emailSender;
