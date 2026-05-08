import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UploadZone from "../components/UploadZone";
import { analysisApi } from "../services/api";

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const extractPdfText = async () => {
    if (!file) return toast.error("Upload resume PDF first");
    const formData = new FormData();
    formData.append("resume", file);
    setLoading(true);
    try {
      const res = await analysisApi.extractResume(formData);
      setResumeText(res.data.resumeText);
      toast.success("Resume text extracted");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to extract PDF text");
    } finally {
      setLoading(false);
    }
  };

  const runAnalysis = async () => {
    if (!resumeText || !jobDescription.trim()) return toast.error("Resume text and JD are required");
    setLoading(true);
    try {
      const res = await analysisApi.analyze({ resumeText, jobDescription });
      navigate(`/analysis/${res.data.analysis._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Analysis failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl space-y-4 px-4 py-8">
      <UploadZone onFileSelect={setFile} selectedFile={file} />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="glass-card p-4">
          <h3 className="font-semibold">Extracted Resume Text</h3>
          <button onClick={extractPdfText} className="my-3 rounded-lg bg-brand-600 px-3 py-2 text-white">
            {loading ? "Processing..." : "Extract Text from PDF"}
          </button>
          <textarea className="input min-h-56" value={resumeText} onChange={(e) => setResumeText(e.target.value)} />
        </div>
        <div className="glass-card p-4">
          <h3 className="font-semibold">Job Description</h3>
          <textarea
            className="input mt-3 min-h-72"
            placeholder="Paste JD here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
      </div>
      <button onClick={runAnalysis} className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white">
        {loading ? "Analyzing..." : "Analyze Resume vs JD"}
      </button>
    </section>
  );
};

export default Upload;
