import { useMemo, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const StarAnimation = keyframes`
  0% {
    background: powderblue;
    height: 1px;
    width: 1px;
    box-shadow: 0px 0px 10px white;
  }
  10% {
    background: #b0e5de;
  }
  20% {
    background: #b0e5cc;
  }
  30% {
    background: #cce5b0;
  }
  40% {
    background: #dae5b0;
  }
  50% {
    background: #e5ddb0;
    width: 4px;
    height: 4px;
    box-shadow: 0px 0px 10px #d3bd3d;
  }
  100% {
    width: 1px;
    height: 1px;
    background: powderblue;
    box-shadow: 0px 0px 10px white;
}

`;

const Star = styled.div<{ top: number; left: number; delay: number }>`
  height: 1px;
  width: 1px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px white;
  background: powderblue;
  position: absolute;
  top: ${({ top }) => `${top}`};
  left: ${({ left }) => `${left}`};
  animation: ${StarAnimation} 2s infinite;
  animation-delay: ${({ delay }) => `${delay}s`};
  z-index: 2;
`;

export default function Stars() {
  const [stars, setStars] = useState<any>([]);

  useEffect(() => {
    const container = document.getElementById("container");
    if (!container) return;
    const windowWidth = container.scrollWidth;

    const windowHeight = container.scrollHeight;

    let createStars = [];
    for (let star = 0; star < 200; star++) {
      const x = Math.random() * windowWidth - 50;
      const y = Math.random() * windowHeight - 60;

      const position = {
        left: x + "px",
        top: y + "px",
      };
      createStars.push(position);
      setStars(createStars);
    }
  }, []);

  const starsList = useMemo(() => {
    return stars?.map((star: { left: number; top: number }) => {
      return <Star key={star.left} {...star} delay={Math.random() * 3} />;
    });
  }, [stars]);
  return starsList;
}
