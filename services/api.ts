import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";
import { Platform } from "react-native";

// Update this to your machine's local IP if running on a real device
// For Android emulator use: http://10.0.2.2:3001
// For physical device use: http://YOUR_MACHINE_IP:3001
const BASE_URL = "http://192.168.1.5:3001";
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

export interface Vehicle {
  plateNumber: string;
  owner: string;
  make: string;
  model: string;
  registrationDate: string;
}

export interface CheckResponse {
  found: boolean;
  fuzzy?: boolean;
  vehicle?: Vehicle;
}

export interface OcrResponse {
  plateNumber: string;
  rawText: string;
}

/**
 * Send a captured image to the backend for OCR processing.
 * Returns the extracted plate number.
 */
export async function scanPlateFromImage(
  imageUri: string,
): Promise<OcrResponse> {
  // Resize to reduce upload size
  const manipulated = await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width: 1200 } }],
    { compress: 0.85, format: ImageManipulator.SaveFormat.JPEG },
  );

  const formData = new FormData();
  formData.append("image", {
    uri: manipulated.uri,
    type: "image/jpeg",
    name: "plate.jpg",
  } as any);

  const response = await api.post<OcrResponse>("/api/plates/ocr", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

/**
 * Check if a plate number exists in the database.
 */
export async function checkPlate(plateNumber: string): Promise<CheckResponse> {
  const response = await api.post<CheckResponse>("/api/plates/check", {
    plateNumber,
  });
  return response.data;
}
