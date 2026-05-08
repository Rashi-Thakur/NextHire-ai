const SkillBadge = ({ text, type = "matched" }) => (
  <span
    className={`rounded-full px-3 py-1 text-xs font-medium ${
      type === "missing"
        ? "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
        : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
    }`}
  >
    {text}
  </span>
);

export default SkillBadge;
