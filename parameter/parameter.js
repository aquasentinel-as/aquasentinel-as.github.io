// ===============================
// AQUA SENTINEL PARAMETER SCRIPT
// ===============================

// Chart.js random data simulator
function generateRandomData(base, range, points = 10) {
  const data = [];
  for (let i = 0; i < points; i++) {
    const variation = (Math.random() - 0.5) * range;
    data.push((base + variation).toFixed(2));
  }
  return data;
}

// Setup for charts depending on parameter
const charts = {
  ph: { base: 7.2, range: 1.0, label: "pH Level", min: 5, max: 9, unit: "" },
  tds: { base: 300, range: 150, label: "TDS (ppm)", min: 0, max: 700, unit: " ppm" },
  turbidity: { base: 3, range: 2, label: "Turbidity (NTU)", min: 0, max: 10, unit: " NTU" },
  temperature: { base: 25, range: 6, label: "Temperature (°C)", min: 10, max: 40, unit: " °C" },
  do: { base: 6, range: 2, label: "Dissolved Oxygen (mg/L)", min: 0, max: 12, unit: " mg/L" },
  metals: { base: 0.005, range: 0.005, label: "Heavy Metals (ppm)", min: 0, max: 0.02, unit: " ppm" },
};

// Detect which parameter page we are on
const page = window.location.pathname.split("/").pop().replace(".html", "");

// Chart initialization
window.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById(`${page}Chart`);
  if (!ctx || !charts[page]) return;

  const config = charts[page];
  const data = generateRandomData(config.base, config.range);
  const labels = data.map((_, i) => `T-${data.length - i}`);

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: config.label,
        data,
        borderColor: "#0077b6",
        backgroundColor: "rgba(0, 123, 255, 0.1)",
        fill: true,
        tension: 0.3,
        pointRadius: 3,
      }]
    },
    options: {
      scales: {
        y: { min: config.min, max: config.max, beginAtZero: false },
      },
      plugins: {
        legend: { display: false },
      }
    }
  });

  // Update data live every 5 seconds
  setInterval(() => {
    const newValue = (config.base + (Math.random() - 0.5) * config.range).toFixed(2);
    chart.data.datasets[0].data.shift();
    chart.data.datasets[0].data.push(newValue);
    chart.update();

    // Update UI values
    document.getElementById(`${page}-current`).textContent = newValue + config.unit;
    const avg = (chart.data.datasets[0].data.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / chart.data.datasets[0].data.length).toFixed(2);
    document.getElementById(`${page}-average`).textContent = avg + config.unit;

    // Status color logic
    let status = "Safe";
    if (page === "ph" && (newValue < 6.5 || newValue > 8.5)) status = "Unsafe";
    if (page === "tds" && newValue > 500) status = "Unsafe";
    if (page === "turbidity" && newValue > 5) status = "Unsafe";
    if (page === "temperature" && (newValue < 20 || newValue > 30)) status = "Unsafe";
    if (page === "do" && newValue < 5) status = "Unsafe";
    if (page === "metals" && newValue > 0.01) status = "Unsafe";

    const statusElem = document.getElementById(`${page}-status`);
    statusElem.textContent = status;
    statusElem.style.color = status === "Safe" ? "green" : "red";

    // AI insight updates
    const insightElem = document.getElementById(`${page}-insight`);
    const insights = {
      Safe: [
        "Water quality is excellent. Keep monitoring for consistency.",
        "All readings stable — system efficiency optimal.",
        "Perfect range maintained. Ecosystem remains healthy."
      ],
      Unsafe: [
        "Anomalies detected — water treatment required!",
        "Levels exceeding safe limits. Immediate inspection needed.",
        "Potential contamination risk. Review sensor data promptly."
      ]
    };
    insightElem.textContent = insights[status][Math.floor(Math.random() * 3)];
  }, 5000);
});
