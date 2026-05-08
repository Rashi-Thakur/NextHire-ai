import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AnalysisChart = ({ scores }) => {
  const data = {
    labels: ["Overall", "Technical", "Soft Skills", "Compatibility", "Readability", "Formatting"],
    datasets: [
      {
        label: "Score",
        data: [
          scores.overall,
          scores.technicalSkill,
          scores.softSkill,
          scores.compatibility,
          scores.readability,
          scores.formatting,
        ],
        backgroundColor: "rgba(124,58,237,0.6)",
        borderRadius: 10,
      },
    ],
  };

  return <Bar data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />;
};

export default AnalysisChart;
