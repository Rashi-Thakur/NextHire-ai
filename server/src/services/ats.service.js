import {
  ACTION_VERBS,
  EDUCATION_KEYWORDS,
  PROJECT_KEYWORDS,
  SOFT_SKILLS,
  TECH_SKILLS,
} from "../utils/constants.js";
import { countOccurrences, normalizeText, tokenize, unique } from "../utils/text.js";

const clamp = (value) => Math.max(0, Math.min(100, Math.round(value)));
const STOPWORDS = new Set([
  "the",
  "and",
  "for",
  "with",
  "from",
  "that",
  "this",
  "will",
  "your",
  "you",
  "are",
  "our",
  "not",
  "have",
  "has",
  "using",
  "use",
  "into",
  "their",
  "about",
  "role",
  "job",
  "work",
  "team",
  "build",
  "develop",
  "developer",
  "software",
  "engineer",
  "intern",
  "experience",
  "required",
  "preferred",
  "skills",
  "responsibilities",
  "candidate",
]);

const getMatches = (dictionary, resumeText, jdText) => {
  const jdRelevant = dictionary.filter((term) => jdText.includes(term));
  const matched = jdRelevant.filter((term) => resumeText.includes(term));
  const missing = jdRelevant.filter((term) => !resumeText.includes(term));
  // Keep neutral baseline if JD has no category words, but avoid overly high default.
  const score = jdRelevant.length ? (matched.length / jdRelevant.length) * 100 : 50;
  return { jdRelevant, matched, missing, score: clamp(score) };
};

const extractDynamicKeywords = (text) => {
  const tokens = tokenize(text).filter((word) => word.length > 2 && !STOPWORDS.has(word));
  const frequencies = tokens.reduce((acc, token) => {
    acc[token] = (acc[token] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(frequencies)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([word]) => word);
};

export const analyzeResumeAgainstJD = (rawResumeText, rawJobDescription) => {
  const resumeText = normalizeText(rawResumeText);
  const jdText = normalizeText(rawJobDescription);

  const tech = getMatches(TECH_SKILLS, resumeText, jdText);
  const soft = getMatches(SOFT_SKILLS, resumeText, jdText);
  const education = getMatches(EDUCATION_KEYWORDS, resumeText, jdText);
  const projects = getMatches(PROJECT_KEYWORDS, resumeText, jdText);
  const verbs = getMatches(ACTION_VERBS, resumeText, jdText);
  const jdDynamicKeywords = extractDynamicKeywords(jdText);
  const matchedDynamicKeywords = jdDynamicKeywords.filter((term) => resumeText.includes(term));
  const missingDynamicKeywords = jdDynamicKeywords.filter((term) => !resumeText.includes(term));
  const jdCoverageScore = jdDynamicKeywords.length
    ? clamp((matchedDynamicKeywords.length / jdDynamicKeywords.length) * 100)
    : 50;

  const resumeWords = tokenize(resumeText).length;
  const jdWords = tokenize(jdText).length;
  const keywordPool = unique([...tech.jdRelevant, ...soft.jdRelevant, ...education.jdRelevant, ...projects.jdRelevant]);
  const keywordCount = keywordPool.reduce((acc, key) => acc + countOccurrences(resumeText, key), 0);
  const keywordDensity = resumeWords ? (keywordCount / resumeWords) * 100 : 0;

  const readabilityScore = clamp(
    100 -
      Math.max(0, resumeWords - 900) * 0.07 -
      Math.max(0, 300 - resumeWords) * 0.08 -
      (resumeText.includes("lorem ipsum") ? 20 : 0)
  );

  const formattingScore = clamp(
    (/\b(email|phone|github|linkedin)\b/.test(resumeText) ? 30 : 10) +
      (/\b(experience|education|skills|projects)\b/.test(resumeText) ? 35 : 10) +
      (resumeText.length > 1000 ? 35 : 20)
  );

  // Generic mismatch signal based on overall JD keyword overlap, not specific domains/courses.
  const strongOverlapCandidates = jdDynamicKeywords.slice(0, 20);
  const overlapRatio = strongOverlapCandidates.length
    ? matchedDynamicKeywords.filter((kw) => strongOverlapCandidates.includes(kw)).length / strongOverlapCandidates.length
    : 0;
  const domainMismatch = overlapRatio < 0.18 && jdWords > 20;

  const compatibility = clamp(
    tech.score * 0.35 +
      soft.score * 0.15 +
      education.score * 0.1 +
      projects.score * 0.1 +
      verbs.score * 0.1 +
      jdCoverageScore * 0.1 +
      readabilityScore * 0.1 +
      formattingScore * 0.0
  );

  let overall = clamp((compatibility + tech.score + soft.score + jdCoverageScore) / 4);
  if (domainMismatch) {
    overall = Math.min(overall, 25);
  }
  const missingSkills = unique([...tech.missing, ...soft.missing, ...missingDynamicKeywords]).slice(0, 25);
  const matchedSkills = unique([...tech.matched, ...soft.matched, ...matchedDynamicKeywords]).slice(0, 25);
  const suggestedKeywords = unique([
    ...missingSkills,
    ...education.missing,
    ...projects.missing,
    ...verbs.missing,
    ...missingDynamicKeywords,
  ]).slice(0, 30);

  const strengths = [
    tech.score >= 70 ? "Good technical skill alignment with job description." : null,
    soft.score >= 70 ? "Solid soft-skill signals for teamwork and communication." : null,
    readabilityScore >= 70 ? "Readable resume length and language quality." : null,
    formattingScore >= 70 ? "ATS-friendly section structure appears present." : null,
  ].filter(Boolean);

  const weaknesses = [
    domainMismatch
      ? "Strong domain mismatch detected: resume content has very low overlap with core job-description keywords."
      : null,
    tech.score < 60 ? "Technical keywords in JD are missing from resume." : null,
    soft.score < 60 ? "Soft-skill coverage can be improved with concrete examples." : null,
    readabilityScore < 60 ? "Resume readability can improve with concise bullet points." : null,
    formattingScore < 60 ? "Formatting may not be fully ATS compatible." : null,
  ].filter(Boolean);

  const roleRecommendations = [
    tech.matched.includes("react") && tech.matched.includes("node.js") ? "Full Stack Developer Intern" : null,
    tech.matched.includes("react") ? "Frontend Developer Intern" : null,
    tech.matched.includes("node.js") ? "Backend Developer Intern" : null,
    tech.matched.includes("python") ? "Software Developer Intern (Python)" : null,
  ].filter(Boolean);

  return {
    atsScores: {
      overall,
      technicalSkill: tech.score,
      softSkill: soft.score,
      compatibility,
      readability: readabilityScore,
      formatting: formattingScore,
    },
    missingSkills,
    matchedSkills,
    suggestedKeywords,
    strengths,
    weaknesses,
    topJobRoles: unique(roleRecommendations).slice(0, 5),
    reportMeta: {
      resumeWordCount: resumeWords,
      jdWordCount: jdWords,
      keywordDensity: Number(keywordDensity.toFixed(2)),
      jdCoverageScore,
      domainMismatch,
      overlapRatio: Number(overlapRatio.toFixed(2)),
    },
  };
};
