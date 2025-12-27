import axios from "axios";
import { useState } from "react";
import emailjs from "@emailjs/browser";


export const getFbUserPages =  () => {};

export const getPagePosts =  () => {};
export const UploadFbPost = async () => {};

const useEmailAPI = () => {
  const [status, setStatus] = useState("");

  const sendEmail = async (formData) => {
    setStatus("Sending...");
    console.log("Incoming formData:", formData);

    // Normalize fields
    const name = formData.name || formData.Name || formData.clientName || "N/A";
    const phone = formData.phone || formData.Phone || "N/A";
    const organization = formData.organization || formData.Organization || "N/A";
    const email = formData.email || formData.Email || "N/A";
    const country = formData.country || formData.Country || "N/A";
    const address = formData.address || formData.Address || "N/A";
    const message = formData.message || formData.Message || "N/A";
    const selectedStandards = formData.selectedStandards || "N/A"
    const selectedServices = formData.selectedServices || "N/A"

    const custom = `Services: ${formData.customServices || "N/A"} - Standards: ${formData.customStandards || " N/A"}`;

    const payload = { name, phone, organization, email, country, address, message, selectedStandards, selectedServices, custom, today: new Date().toDateString() };
    console.log("Final Payload to EmailJS:", payload);

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        payload,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      );

      if (result.status === 200) {
        setStatus("✅ Email sent successfully!");
        setTimeout(() => setStatus(""), 5000);
        return { success: true, result };
      } else {
        setStatus("❌ Failed to send email.");
        setTimeout(() => setStatus(""), 5000);
        return { success: false, result };
      }
    } catch (error) {
      console.error("EmailJS send error:", error);
      setStatus("❌ Failed to send email.");
      setTimeout(() => setStatus(""), 5000);
      return { success: false, error };
    }
  };

  return { status, sendEmail };
};

export default useEmailAPI;







