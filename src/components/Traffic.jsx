import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/traffic.css";

function Traffic() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const keyword = "대통령";      // ✅ 사용자 입력으로 대체 가능
    const period = "weekly";       // ✅ 예: weekly, monthly 등

    axios
      .get("https://newsummarize.com/api/search/analytics", {
        params: {
          keyword,
          period,
        },
        responseType: "blob", // ✅ 이미지니까 blob으로 받기
      })
      .then((res) => {
        const imgUrl = URL.createObjectURL(res.data);
        setImageUrl(imgUrl);
      })
      .catch((err) => {
        console.error("트래픽 이미지 불러오기 실패:", err);
      });
  }, []);

  return (
    <div className="traffic">
      <h2>트래픽 📈</h2>
      {imageUrl ? (
        <img src={imageUrl} alt="트래픽 분석 결과" className="traffic-image" />
      ) : (
        <p>트래픽 이미지를 불러오는 중입니다...</p>
      )}
    </div>
  );
}

export default Traffic;
