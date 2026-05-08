import { Link } from "react-router-dom";
import ChatBot from "../components/ChatBot";

const Dashboard = () => (
  <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-3">
    <div className="glass-card p-6 lg:col-span-2">
      <h2 className="text-2xl font-bold">Resume Intelligence Dashboard</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Analyze your resume against any job description and get ATS + AI insights.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/upload" className="rounded-xl bg-brand-600 px-4 py-2 text-white">Upload Resume</Link>
        <Link to="/history" className="rounded-xl border border-slate-300 px-4 py-2">View History</Link>
        <Link to="/profile" className="rounded-xl border border-slate-300 px-4 py-2">Profile</Link>
      </div>
    </div>
    <ChatBot />
  </section>
);

export default Dashboard;
