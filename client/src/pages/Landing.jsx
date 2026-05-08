import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => (
  <section className="mx-auto max-w-6xl px-4 py-16">
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card bg-hero-gradient p-10">
      <p className="mb-3 inline-block rounded-full bg-brand-600/10 px-3 py-1 text-sm text-brand-700 dark:text-brand-300">
        AI Resume Analyzer + Job Matcher
      </p>
      <h1 className="text-4xl font-bold leading-tight md:text-5xl">Boost Your ATS Score and Land Better Interviews</h1>
      <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
        Upload your resume PDF, paste a job description, and get instant ATS score, missing skills, AI feedback,
        keyword suggestions, and role recommendations.
      </p>
      <div className="mt-8 flex gap-3">
        <Link to="/register" className="rounded-xl bg-brand-600 px-5 py-3 font-medium text-white">Start Free</Link>
        <Link to="/login" className="rounded-xl border border-slate-300 px-5 py-3 font-medium">Login</Link>
      </div>
    </motion.div>
  </section>
);

export default Landing;
