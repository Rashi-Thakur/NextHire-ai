import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportElementToPdf = async (elementId, filename = "analysis-report.pdf") => {
  const element = document.getElementById(elementId);
  if (!element) return;
  const canvas = await html2canvas(element, { scale: 2 });
  const image = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const width = 190;
  const height = (canvas.height * width) / canvas.width;
  pdf.addImage(image, "PNG", 10, 10, width, height);
  pdf.save(filename);
};

export const shortDate = (date) => new Date(date).toLocaleString();
