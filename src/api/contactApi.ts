import apiClient from "./axiosConfig";

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export const submitContactForm = async (
  formData: ContactFormData
): Promise<ContactResponse> => {
  try {
    const response = await apiClient.post("/auth/contact", formData);
    console.log("Raw API Response:", response.data); // Debug log

    // Handle different possible response structures
    const responseData = response.data;

    // If the response has a success property (boolean or string)
    if (responseData.hasOwnProperty("success")) {
      return {
        success: Boolean(responseData.success),
        message: responseData.message || "Message envoyé avec succès",
      };
    }

    // If the response has a status property
    if (responseData.hasOwnProperty("status")) {
      return {
        success:
          responseData.status === "success" || responseData.status === 200,
        message:
          responseData.message ||
          responseData.msg ||
          "Message envoyé avec succès",
      };
    }

    // If the response is just a message or has no specific structure
    return {
      success: true,
      message:
        responseData.message ||
        responseData.msg ||
        "Message envoyé avec succès",
    };
  } catch (error: any) {
    console.log("API Error:", error); // Debug log
    if (error.response) {
      // Server responded with error status
      throw new Error(
        error.response.data?.message || "Erreur lors de l'envoi du message"
      );
    } else if (error.request) {
      // Network error
      throw new Error(
        "Erreur de connexion. Veuillez vérifier votre connexion internet."
      );
    } else {
      // Other error
      throw new Error("Une erreur inattendue s'est produite.");
    }
  }
};
