"use client";
import { ReduceEffect } from '@/types/interfaces/ReduceEffect'
import React, { useCallback, useEffect, useRef } from 'react';
import styles from "./styles/style.module.scss";

interface Props {
  reduceEffects: ReduceEffect[];
  setReduceEffects: React.Dispatch<React.SetStateAction<ReduceEffect[]>>;
}

function index(props: Props) {
  const animateRef = useRef<number>(-1);

  const animate = useCallback((time: number) => {
    props.setReduceEffects(current => {
      const newReduceEffects: ReduceEffect[] = [];
      current.map(reduceEffect => {
        const newY = reduceEffect.y - reduceEffect.y * 0.1;
        newReduceEffects.push({ ...reduceEffect, y: newY });
      });
      return newReduceEffects.filter(reduceEffect => time - reduceEffect.startTime < 700);
    });

    animateRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animateRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animateRef.current!);
  }, []);

  return (
    <div className={styles.reduceEffectContainer}>
      {props.reduceEffects.map((reduceEffect, index) => (
        <i
          id={index.toString()}
          key={index}
          className={styles.reduceEffect}
          style={{
            bottom: `${reduceEffect.y}px`,
            color: `${reduceEffect.value < 0 ? "red" : "green"}`
          }}
        >
          {reduceEffect.value < 0 ? "-" : "+"}${Math.abs(reduceEffect.value).toLocaleString()}
        </i>
      ))}
    </div>
  )
}

export default index