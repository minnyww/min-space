import { useEffect, useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";

// const moveCloud = `
//     from {background-position:0 0;}
//   to {background-position:10000px 0;}
// `;

// const Cloud = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   width: 100%;
//   height: 100%;
//   background: transparent
//     url(http://www.script-tutorials.com/demos/360/images/clouds3.png) repeat top
//     center;
//   z-index: 3;

//   animation: ${moveCloud} 200s linear infinite;
// `;

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

const useWidth = () => {
  const [width, setWidth] = useState(0);
  const [height, setHieght] = useState(0);
  const handleResize = () => {
    setWidth(window.innerWidth);
    setHieght(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  return { width, height };
};

export default function Stars() {
  const [stars, setStars] = useState<any>([]);
  const { width, height } = useWidth();
  const createStarList = useCallback(() => {
    let createStars: any = [];

    const container = document.getElementById("container");
    if (!container) return;
    const windowWidth = width === 0 ? window.innerWidth : width;
    const windowHeight = height === 0 ? window.innerHeight : height;
    for (let star = 0; star < 40; star++) {
      const x = Math.random() * windowWidth - 30;
      const y = Math.random() * windowHeight - 50;
      const position = {
        left: x + "px",
        top: y + "px",
      };
      createStars.push(position);
    }
    setStars([...createStars]);
  }, [width, height]);

  // useEffect(() => {
  //   const container = document.getElementById("container");
  //   if (!container) return;
  //   const windowWidth = window.screen.width;

  //   const windowHeight = window.screen.height;

  //   let createStars = [];
  //   for (let star = 0; star < 200; star++) {
  //     const x = Math.random() * windowWidth - 50;
  //     const y = Math.random() * windowHeight - 60;

  //     const position = {
  //       left: x + "px",
  //       top: y + "px",
  //     };
  //     createStars.push(position);
  //     setStars(createStars);
  //   }
  // }, []);

  useEffect(() => {
    createStarList();
    window.addEventListener("resize", createStarList);
    return () => {
      window.removeEventListener("resize", createStarList);
    };
  }, [createStarList]);

  // const starsList = useMemo(() => {
  //   return stars?.map((star: { left: number; top: number }) => {
  //     return <Star key={star.left} {...star} delay={Math.random() * 3} />;
  //   });
  // }, [stars]);
  return (
    <div>
      {/* <Cloud /> */}
      {stars?.map((star: { left: number; top: number }) => {
        return <Star key={star.left} {...star} delay={Math.random() * 3} />;
      })}
    </div>
  );
}
