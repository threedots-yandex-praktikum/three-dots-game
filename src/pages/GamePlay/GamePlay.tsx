import React, { FC, useRef, useEffect } from "react";
import "./style.scss";
import { random, getRadians } from "./utils";
import { TDots } from "./types";

type GamePlayProps = Record<string, unknown>;

const colorsDot = ["#FF4903", "#4378B", "#00E691", "#8157D1", "#000"];
const countColor = colorsDot.length;
const sizeCanvas = 1000;
const minRadiusDot = 5;
const maxRadiusDot = 40;
const dots: TDots[] = [];
const radians = getRadians(360);
const initDots = () => {
  for (let index = 0; index < 10; index++) {
    const radius = random(minRadiusDot, maxRadiusDot);
    const xyMax = sizeCanvas - radius;
    const xyMin = 0 + radius;
    const dot = {
      r: radius,
      x: random(xyMin, xyMax),
      y: random(xyMin, xyMax),
      color: colorsDot[random(0, countColor) - 1],
    };
    dots.push(dot);
  }
};

export const GamePlay: FC<GamePlayProps> = () => {
  const ref = useRef(null);
  initDots();

  useEffect(() => {
    if (ref?.current) {
      const ctx = (ref.current as HTMLCanvasElement).getContext("2d");
      if (ctx) {
        dots.forEach((dot) => {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.r, 0, radians);
          ctx.fillStyle = dot.color;
          ctx.fill();
        });
      }
    }
  }, []);

  return (
    <div className="playing-field">
      <canvas ref={ref} width={sizeCanvas} height={sizeCanvas} />
    </div>
  );
};

GamePlay.propTypes = {};
