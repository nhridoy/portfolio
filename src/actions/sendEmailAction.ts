"use server";

import {
  sendEmailSchema,
  type sendEmailSchemaType,
} from "@/schema/sendEmailSchema";

const sendEmailAction = async (
  data: sendEmailSchemaType,
): Promise<{ status: "success" | "failed" }> => {
  const parsedData = sendEmailSchema.safeParse(data);
  if (!parsedData.success) {
    return { status: "failed" };
  }

  const formData = new FormData();
  formData.append("name", parsedData.data.name);
  formData.append("email", parsedData.data.email);
  formData.append("services", JSON.stringify(parsedData.data.services));
  formData.append("budget", parsedData.data.budget || "");
  formData.append("message", parsedData.data.message);

  try {
    const response = await fetch(process.env.MAIL_SENDER_WEBHOOK_URL || "", {
      method: "POST",
      headers: {
        "x-api-key": process.env.MAILSEND_API_KEY || "",
      },
      body: formData,
    });
    return response.status === 200
      ? { status: "success" }
      : { status: "failed" };
  } catch (error) {
    console.error("Email sending error:", error);
    return { status: "failed" };
  }
};

export default sendEmailAction;
