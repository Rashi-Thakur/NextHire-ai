import OpenAI from "openai";

const buildFallbackFeedback = (missingSkills) => ({
  summary: "Your resume is decent but can be better aligned with the target job description.",
  improvementSuggestions: [
    "Add measurable impact to your project bullets (e.g., improved performance by 30%).",
    "Align your skill section with the job description's required technologies.",
    "Use stronger action verbs and outcome-focused language.",
  ],
  rewrittenBullets: [
    "Built and deployed a full-stack application using React and Node.js, serving 500+ active users.",
    "Optimized API response times by 35% through query indexing and caching.",
  ],
  suggestedProjects: [
    "ATS Resume Analyzer with NLP scoring and AI suggestions",
    "Job recommendation platform with personalized ranking",
  ],
  recommendedCertifications: ["AWS Cloud Practitioner", "MongoDB Node.js Developer Path"],
  strongerActionVerbs: ["engineered", "orchestrated", "delivered", "optimized", ...missingSkills.slice(0, 2)],
});

export const generateAiFeedback = async ({ resumeText, jobDescription, missingSkills }) => {
  if (!process.env.OPENAI_API_KEY) {
    return buildFallbackFeedback(missingSkills);
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `
You are an expert technical recruiter and resume coach.
Return ONLY valid JSON with keys:
summary, improvementSuggestions, rewrittenBullets, suggestedProjects, recommendedCertifications, strongerActionVerbs.

Resume:
${resumeText.slice(0, 6000)}

Job Description:
${jobDescription.slice(0, 6000)}

Missing Skills:
${missingSkills.join(", ")}
`;

  try {
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    });
    const raw = completion.choices?.[0]?.message?.content || "{}";
    const parsed = JSON.parse(raw);
    return {
      summary: parsed.summary || "",
      improvementSuggestions: parsed.improvementSuggestions || [],
      rewrittenBullets: parsed.rewrittenBullets || [],
      suggestedProjects: parsed.suggestedProjects || [],
      recommendedCertifications: parsed.recommendedCertifications || [],
      strongerActionVerbs: parsed.strongerActionVerbs || [],
    };
  } catch (_error) {
    return buildFallbackFeedback(missingSkills);
  }
};
