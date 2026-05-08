import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { CheckCircle2, Upload } from "lucide-react";

const UploadZone = ({ onFileSelect, selectedFile }) => {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }
    onFileSelect(file);
    toast.success("Resume uploaded successfully");
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFile(e.dataTransfer.files?.[0]);
      }}
      className={`glass-card cursor-pointer p-10 text-center transition ${
        dragOver ? "scale-[1.01] border-brand-500" : ""
      }`}
      onClick={() => fileInputRef.current?.click()}
    >
      <Upload className="mx-auto mb-3 text-brand-600" />
      <h3 className="text-lg font-semibold">Drag & Drop Resume PDF</h3>
      <p className="mt-1 text-sm text-slate-500">or click to browse</p>
      {selectedFile ? (
        <div className="mx-auto mt-4 flex max-w-md items-center justify-center gap-2 rounded-xl bg-emerald-100 px-3 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
          <CheckCircle2 size={16} />
          Resume uploaded: {selectedFile.name}
        </div>
      ) : null}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
};

export default UploadZone;
