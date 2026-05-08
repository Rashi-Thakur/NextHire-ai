const ScoreCard = ({ title, value }) => (
  <div className="glass-card p-4">
    <p className="text-sm text-slate-500">{title}</p>
    <h3 className="mt-2 text-3xl font-bold text-brand-600">{value}%</h3>
  </div>
);

export default ScoreCard;
