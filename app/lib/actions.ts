"use server";

import { revalidatePath } from "next/cache";
import { addRegistration } from "./data";
import { SessionId } from "./types";

export type FormState = {
  success: boolean;
  isWaitingList: boolean;
  message: string;
  errors?: {
    firstName?: string;
    phoneNumber?: string;
    general?: string;
  };
};

export async function registerAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const sessionId = formData.get("sessionId") as SessionId;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const email = formData.get("email") as string;
  const photoConsent = formData.get("photoConsent") === "on";

  // Validation
  const errors: FormState["errors"] = {};

  if (!firstName || firstName.trim() === "") {
    errors.firstName = "First name is required";
  }

  if (!phoneNumber || phoneNumber.trim() === "") {
    errors.phoneNumber = "Phone number is required";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      isWaitingList: false,
      message: "Please fix the errors below",
      errors,
    };
  }

  try {
    const result = await addRegistration(sessionId, {
      sessionId,
      firstName: firstName.trim(),
      lastName: lastName?.trim() ?? "",
      phoneNumber: phoneNumber.trim(),
      email: email?.trim() ?? "",
      photoConsent,
    });

    revalidatePath("/");
    revalidatePath("/register");

    return result;
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      isWaitingList: false,
      message: "An error occurred. Please try again.",
      errors: {
        general: "Failed to process registration",
      },
    };
  }
}

