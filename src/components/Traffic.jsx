import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // 추가
import axios from "axios";
import "../styles/traffic.css";

function Traffic() {
  const { keyword } = useParams();  // 키워드 받아오기
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (!keyword) return; // keyword 없으면 호출하지 않음

    const period = "weekly";

    axios
      .get("https://newsummarize.com/api/search/analytics", {
        params: {
          keyword,
          period,
        },
        responseType: "blob",
      })
      .then((res) => {
        const imgUrl = URL.createObjectURL(res.data);
        setImageUrl(imgUrl);
      })
      .catch((err) => {
        console.error("트래픽 이미지 불러오기 실패:", err);
      });
  }, [keyword]);  // keyword가 바뀔 때마다 실행

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
