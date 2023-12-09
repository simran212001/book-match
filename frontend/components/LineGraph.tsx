import { useEffect, useRef } from "react";
import { NextComponentType } from "next";
// Chart.Js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Legend,
  Tooltip,
  ChartData,
  Plugin,
} from "chart.js";
// Redux
import { useAppSelector } from "@/redux/hooks";
import { selectStudent } from "@/redux/reducer/studentSlice";
// Constants
import { appTitle, personalities } from "utils/constants";

const LineGraph: NextComponentType = () => {
  const { result } = useAppSelector(selectStudent);
  const bookVector = result?.bookVector || [];
  const studentVector = result?.studentVector || [];

  // Creating a ref for the chart canvas element
  const chartRef = useRef<HTMLCanvasElement>(null);

  // Defining a plugin for Chart.js
  const plugins: Plugin = {
    id: "lineID",
    beforeDraw: (chart) => {
      // Checking if there are tooltip data points
      if (chart.tooltip?.dataPoints) {
        // Extracting x and y coordinates from the tooltip data points
        const x = chart.tooltip.dataPoints[0].element.x;
        const y = chart.tooltip.dataPoints[0].element.y;

        // Extracting y-axis and x-axis scales and chart context
        const yAxis = chart.scales.y;
        const xAxis = chart.scales.x;
        const ctx = chart.ctx;

        // Saving the current context state
        chart.ctx.save();

        // Drawing vertical dashed line at the x-coordinate
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x, yAxis.top);
        ctx.lineTo(x, yAxis.bottom);
        ctx.stroke();

        // Drawing horizontal dashed line at the y-coordinate
        ctx.beginPath();
        ctx.moveTo(xAxis.left, y);
        ctx.lineTo(xAxis.right, y);
        ctx.stroke();

        // Restoring the context state to its original state
        ctx.restore();
      }
    },
  };

  // Register Chart.js modules
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LineController,
    Tooltip,
    Title,
    Legend,
    plugins
  );

  useEffect(() => {
    // Get the chart canvas element
    const chart = chartRef.current;

    // Check if the chart element exists
    if (!chart) {
      return;
    }

    // Get 2D rendering context of the canvas
    const ctx = chart.getContext("2d")!;

    // Define colors for different data sets
    const studentColor = "rgba(78, 175, 11, 1)";
    const bookColor = "rgba(50, 70, 255, 1)";

    // Chart data configuration
    const data: ChartData = {
      labels: personalities as unknown as string[], // Array of labels for x-axis
      datasets: [
        // Dataset for student vector
        {
          data: studentVector, // Data points for the student vector
          borderColor: studentColor, // Color of the line
          tension: 0.2, // Line tension for bezier curves
          borderWidth: 2, // Width of the line
          yAxisID: "y", // ID of the y-axis to associate this dataset with
          label: "Student", // Label for the legend
        },
        // Dataset for book vector
        {
          data: bookVector, // Data points for the book vector
          borderColor: bookColor, // Color of the line
          tension: 0.2, // Line tension for bezier curves
          borderWidth: 2, // Width of the line
          yAxisID: "y", // ID of the y-axis to associate this dataset with
          label: "Book", // Label for the legend
        },
      ],
    };

    const lineChart = new ChartJS(ctx, {
      type: "line",
      plugins: [plugins], // Add any plugins you need
      data: data, // Provide the chart data
      options: {
        // Event handling
        onHover: (event, activeEvents) => {
          // Change cursor style based on hover state
          (event?.native?.target as HTMLElement).style.cursor =
            activeEvents?.length > 0 ? "crosshair" : "default";
        },
        // Chart layout and responsiveness
        maintainAspectRatio: true,
        responsive: true,
        elements: {
          point: {
            radius: 1, // Set point radius to 1 to reduce its radius
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        scales: {
          // X-axis configuration
          x: {
            ticks: {
              color: "black", // Set tick color
            },
            grid: { drawTicks: true }, // Show ticks on the grid
          },
          // Y-axis configuration
          y: {
            display: true,
            beginAtZero: true,
            max: 10,
            min: 0,
            ticks: {
              stepSize: 1,
              padding: 5,
              color: "black", // Set tick color
            },
            grid: {
              drawTicks: false, // Hide ticks on the grid
            },
          },
        },
        // Chart-specific plugins
        plugins: {
          // Tooltip configuration
          tooltip: {
            position: "nearest",
            mode: "index",
            intersect: false,
            backgroundColor: "white",
            borderColor: "lightgrey",
            borderWidth: 1,
            displayColors: false,
            padding: 4,
            titleMarginBottom: 4,
            titleColor: "black",
            callbacks: {
              // Customize tooltip title
              title: (context) => {
                const index = context[0].dataIndex;
                const personality = personalities[index];
                return personality;
              },
              // Customize tooltip labels
              label: function (context) {
                const index = context.dataIndex;
                const label = context.dataset.label;
                if (label === "Book") {
                  const bookPath = bookVector[index];
                  return `Book: ${bookPath}`;
                } else {
                  const studentPath = studentVector[index];
                  return `Student: ${studentPath}`;
                }
              },
              // Customize tooltip label text color
              labelTextColor: (context) => {
                if (context.dataset.label === "Book") {
                  return bookColor;
                } else {
                  return studentColor;
                }
              },
            },
          },
          // Legend configuration
          legend: {
            display: true,
          },
          // Chart title configuration
          title: {
            display: true,
            text: `${appTitle}: ${result?.books[0]?.genre}`.toUpperCase(),
            font: {
              size: 20,
            },
          },
        },
      },
    });

    // Update the line chart
    lineChart.update();

    // Cleanup function to destroy the line chart when the component unmounts
    return () => {
      lineChart.destroy();
    };
  }, [result]);

  return (
    <div className="relative overflow-hidden p-5 block">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default LineGraph;
