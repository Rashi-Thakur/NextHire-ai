import pdf from "pdf-parse";

export const extractTextFromPdfBuffer = async (buffer) => {
  const parsed = await pdf(buffer);
  return parsed.text?.trim() || "";
};
