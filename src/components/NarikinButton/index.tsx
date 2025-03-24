"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from "next/image";
import styles from "./styles/style.module.scss";

interface Props {
  age: number;
  credit: number;
  isSleep: boolean;
  narikin: number;
  follower: number;
  isGameStop: boolean;
  burnCredit: () => void;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

function index(props: Props) {

  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(1800);
  const targetRef = useRef<number>(0); // 目標値
  const animateRef = useRef<number>(-1); // アニメーション状態
  const color = {
    normal: "rgb(139, 254, 145)",
    warning: "rgb(255, 255, 77)",
    danger: "rgb(230, 67, 67)"
  }

  useEffect(() => {
    // 一秒ごとに数値を加算
    const timer = setInterval(() => !props.isGameStop && setProgress(prev => prev + Math.floor(props.age / 70)), 10);
    return () => clearInterval(timer);
  }, [progress]);

  useEffect(() => {
    // フォロワーが0になったらゲームオーバー
    if (progress > 3600) {
      props.setIsGameOver(true);
    }
  }, [progress])

  const animate = useCallback(() => {
    setProgress((prev) => {
      const diff = targetRef.current - prev;
      console.log(`$diff: ${diff}, targetRef.current: ${targetRef.current}, prev: ${prev}`);

      if (Math.abs(diff) < 5) {
        cancelAnimationFrame(animateRef.current!);
        setTimeout(() => setIsAnimating(false), 2000); // アニメーション終了
        console.log("animation ended.");
        return targetRef.current;
      }

      const step = diff * 0.1;
      animateRef.current = requestAnimationFrame(animate);
      return prev + step;
    });
    
  }, []);

  const angle = progress / 10;

  return (
    <button 
      className={styles.buttonContainer} 
      onMouseDown={() => {
        setIsAnimating(true);
        targetRef.current = progress - props.follower <= 0 ? 0 : progress - props.follower;
        animateRef.current = requestAnimationFrame(animate);
        props.burnCredit();
      }}
      disabled={isAnimating || props.credit < props.narikin || props.isSleep}
    >
      <div
        className={styles.buttonProgressBar}
        style={{ background: `conic-gradient(transparent 0deg ${angle}deg, ${angle < 180 ? color.normal : angle < 300 ? color.warning : color.danger} ${angle}deg 360deg)` }}
      >
        <div className={styles.buttonColorContainer}>
          <Image 
            src="/narikin.png"
            alt=""
            width={200}
            height={200}
            className={styles.buttonColor}
          />
          <div 
            className={`${styles.buttonColor} ${styles.buttonColorCover}`}
            style={ isAnimating ? { backgroundColor: "rgba(255, 225, 191, 0.3)" } : {} }
          >
            <div className={styles.buttonText}>
              成金(-${props.narikin.toLocaleString()})
              <div className={styles.warnText}>{props.credit < props.narikin && "資金不足"}</div>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

export default index