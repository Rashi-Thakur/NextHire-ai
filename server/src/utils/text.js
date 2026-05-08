export const normalizeText = (input = "") =>
  input
    .toLowerCase()
    .replace(/[^\w\s.+#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const tokenize = (input = "") => normalizeText(input).split(" ").filter(Boolean);

export const unique = (arr = []) => [...new Set(arr)];

export const countOccurrences = (text, term) => {
  const pattern = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
  return (text.match(pattern) || []).length;
};
