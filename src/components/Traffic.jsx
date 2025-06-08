import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Line
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/traffic.css";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function Traffic() {
  const { keyword } = useParams();
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (!keyword) return;

    axios
      .get("https://newsummarize.com/api/search/analytics_num", {
        params: {
          keyword,
          period: "daily"
        }
      })
      .then((res) => {
        const rawData = res.data.results;

        const labels = rawData.map(item => item.period);
        const data = rawData.map(item => item.ratio);

        setChartData({
          labels,
          datasets: [
            {
              label: `"${keyword}" 트렌드 데이터`,
              data,
              borderColor: "#2c7be5",
              backgroundColor: "white", // 제목 옆에 있는 색
              pointBackgroundColor: "#2c7be5", // 동그라미 색
              tension: 0,
            }
          ]
        });

        // Chart 옵션 설정
        setChartOptions({
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: "#4a4a4a",
                font: {
                  weight: "bold",
                  size: 13.5
                }
              }
            },
          },
          scales: {
            x: {
              ticks: {
                callback: function (value) {
                  const label = this.getLabelForValue(value);
                  const [year, month, day] = label.split("-");
                  return [year, `${month}/${day}`];
                },
                font: {
                  size: 12
                },
              }
            },
            y: {
              min: 0,
              max: 110,
              grid: {
                drawTicks: true,
                drawOnChartArea: true
              },
              ticks: {
                stepSize: 10, // 기본 그리드 간격은 10 단위로 유지
                callback: function (value) {
                  // 20의 배수일 때만 숫자 표시
                  return value % 20 === 0 ? value : '';
                },
                font: {
                  size: 12
                },
              },
              title: {
                display: true,
                text: "검색량 (%)"
              }
            }
          }
        });
      })
      .catch((err) => {
        console.error("트래픽 데이터 불러오기 실패:", err);
      });
  }, [keyword]);

  return (
    <div className="traffic">
      <h2>트래픽 📈</h2>
      {chartData ? (
        <>
          <Line data={chartData} options={chartOptions} />
          <p className="traffic-text">* 검색량이 가장 많은 날을 100으로 설정한 상대적 비율</p>
        </>
      ) : (
        <p style={{ marginLeft: '12px', marginTop: '6px' }}>트래픽 데이터를 불러오는 중입니다.</p>
      )}
    </div>
  );
}

export default Traffic;
