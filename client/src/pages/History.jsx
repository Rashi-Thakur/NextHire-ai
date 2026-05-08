import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { analysisApi } from "../services/api";
import { shortDate } from "../utils/helpers";

const History = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [minScore, setMinScore] = useState("all");
  const pageSize = 5;

  useEffect(() => {
    setLoading(true);
    analysisApi
      .history()
      .then((res) => setItems(res.data.items))
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Failed to fetch history");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = items.filter((item) => {
    const text = `${item.jobDescription || ""} ${item.missingSkills?.join(" ") || ""}`.toLowerCase();
    const queryMatch = query.trim() ? text.includes(query.toLowerCase()) : true;
    const scoreMatch = minScore === "all" ? true : item.atsScores?.overall >= Number(minScore);
    return queryMatch && scoreMatch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pagedItems = filteredItems.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <h2 className="mb-4 text-2xl font-bold">Analysis History</h2>
      <div className="mb-4 grid gap-3 md:grid-cols-3">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          className="input md:col-span-2"
          placeholder="Search by JD or missing skills..."
        />
        <select
          value={minScore}
          onChange={(e) => {
            setMinScore(e.target.value);
            setPage(1);
          }}
          className="input"
        >
          <option value="all">All scores</option>
          <option value="60">60% and above</option>
          <option value="70">70% and above</option>
          <option value="80">80% and above</option>
          <option value="90">90% and above</option>
        </select>
      </div>
      {loading ? <p className="text-slate-500">Loading history...</p> : null}
      <div className="space-y-3">
        {pagedItems.map((item) => (
          <Link key={item._id} to={`/analysis/${item._id}`} className="glass-card block p-4 hover:border-brand-400">
            <p className="font-semibold">ATS Overall: {item.atsScores.overall}%</p>
            <p className="text-sm text-slate-500">{shortDate(item.createdAt)}</p>
          </Link>
        ))}
        {!loading && !filteredItems.length ? <p className="text-slate-500">No matching history found.</p> : null}
      </div>
      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          disabled={safePage === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="rounded-lg border border-slate-300 px-3 py-1 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm text-slate-600 dark:text-slate-300">
          Page {safePage} of {totalPages}
        </span>
        <button
          disabled={safePage === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="rounded-lg border border-slate-300 px-3 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default History;
