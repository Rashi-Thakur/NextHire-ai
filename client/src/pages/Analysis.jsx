import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import AnalysisChart from "../components/AnalysisChart";
import ScoreCard from "../components/ScoreCard";
import SkillBadge from "../components/SkillBadge";
import { analysisApi } from "../services/api";
import { exportElementToPdf } from "../utils/helpers";

const Analysis = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bulletInput, setBulletInput] = useState("");
  const [rewrittenBullet, setRewrittenBullet] = useState("");

  useEffect(() => {
    setLoading(true);
    analysisApi
      .byId(id)
      .then((res) => setItem(res.data.analysis))
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Could not load analysis");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-8">Loading analysis...</div>;
  if (!item) return <div className="p-8">No analysis found.</div>;

  const copyToClipboard = async (text, label = "Text") => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
    } catch (_error) {
      toast.error("Copy failed");
    }
  };

  const rewriteBullet = () => {
    if (!bulletInput.trim()) {
      toast.error("Enter a bullet point first");
      return;
    }
    const preferredVerb = item.aiFeedback?.strongerActionVerbs?.[0] || "Engineered";
    const cleaned = bulletInput.trim().replace(/^[•\-]\s*/, "");
    const rewritten = `${preferredVerb.charAt(0).toUpperCase()}${preferredVerb.slice(
      1
    )} ${cleaned} with measurable impact, clear scope, and ATS-friendly keywords.`;
    setRewrittenBullet(rewritten);
  };

  return (
    <section className="mx-auto max-w-6xl space-y-5 px-4 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analysis Result</h2>
        <button onClick={() => exportElementToPdf("analysis-report")} className="rounded-xl bg-brand-600 px-4 py-2 text-white">
          Download PDF Report
        </button>
      </div>
      <div id="analysis-report" className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ScoreCard title="Overall ATS" value={item.atsScores.overall} />
          <ScoreCard title="Technical" value={item.atsScores.technicalSkill} />
          <ScoreCard title="Soft Skills" value={item.atsScores.softSkill} />
          <ScoreCard title="Compatibility" value={item.atsScores.compatibility} />
        </div>
        <div className="glass-card p-5">
          <AnalysisChart scores={item.atsScores} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="glass-card p-4">
            <h3 className="font-semibold">Missing Skills</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.missingSkills.map((skill) => <SkillBadge key={skill} text={skill} type="missing" />)}
            </div>
          </div>
          <div className="glass-card p-4">
            <h3 className="font-semibold">Matched Skills</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.matchedSkills.map((skill) => <SkillBadge key={skill} text={skill} />)}
            </div>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="glass-card p-4">
            <h3 className="font-semibold">Strengths</h3>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
              {item.strengths?.length ? item.strengths.map((s) => <li key={s}>{s}</li>) : <li>No strong signals detected yet.</li>}
            </ul>
          </div>
          <div className="glass-card p-4">
            <h3 className="font-semibold">Weaknesses</h3>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
              {item.weaknesses?.length ? item.weaknesses.map((w) => <li key={w}>{w}</li>) : <li>No major weaknesses detected.</li>}
            </ul>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="glass-card p-4">
            <h3 className="font-semibold">Recommended Keywords</h3>
            <div className="mt-3 mb-3 flex flex-wrap gap-2">
              {item.suggestedKeywords?.slice(0, 20).map((kw) => (
                <span key={kw} className="rounded-full bg-brand-100 px-3 py-1 text-xs text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                  {kw}
                </span>
              ))}
            </div>
            <button
              onClick={() => copyToClipboard((item.suggestedKeywords || []).slice(0, 20).join(", "), "Keywords")}
              className="rounded-lg border border-slate-300 px-3 py-1 text-sm"
            >
              Copy Keywords
            </button>
          </div>
          <div className="glass-card p-4">
            <h3 className="font-semibold">Top Matching Roles</h3>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
              {item.topJobRoles?.length ? item.topJobRoles.map((r) => <li key={r}>{r}</li>) : <li>No role recommendation yet.</li>}
            </ul>
          </div>
        </div>
        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold">AI Resume Feedback</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{item.aiFeedback?.summary || "No AI summary available."}</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div>
              <h4 className="font-medium">Improvement Suggestions</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
                {item.aiFeedback?.improvementSuggestions?.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Rewritten Bullet Points</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
                {item.aiFeedback?.rewrittenBullets?.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Suggested Projects</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
                {item.aiFeedback?.suggestedProjects?.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Recommended Certifications</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
                {item.aiFeedback?.recommendedCertifications?.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </div>
        </div>
        <div className="glass-card p-5">
          <h3 className="text-lg font-semibold">AI Rewrite This Bullet</h3>
          <p className="mt-1 text-sm text-slate-500">
            Paste a weak bullet point and instantly rewrite it in a stronger ATS-friendly style.
          </p>
          <textarea
            value={bulletInput}
            onChange={(e) => setBulletInput(e.target.value)}
            className="input mt-3 min-h-24"
            placeholder="Example: worked on a website for college event management."
          />
          <div className="mt-3 flex gap-2">
            <button onClick={rewriteBullet} className="rounded-lg bg-brand-600 px-4 py-2 text-white">
              Rewrite Bullet
            </button>
            <button
              onClick={() => copyToClipboard(rewrittenBullet, "Rewritten bullet")}
              className="rounded-lg border border-slate-300 px-4 py-2"
            >
              Copy Result
            </button>
          </div>
          {rewrittenBullet ? (
            <div className="mt-3 rounded-xl bg-emerald-100/70 p-3 text-sm text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
              {rewrittenBullet}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Analysis;
