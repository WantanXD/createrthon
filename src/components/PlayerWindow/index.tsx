"use client";
import React, { useEffect, useState } from 'react';
import styles from "./styles/style.module.scss";
import PlayerImage from './PlayerImage';
import Image from "next/image";
import HpBar from './HpBar';
import PlayerSleepButton from './PlayerSleepButton';

interface Props {
  name: string;
  hp: number;
  age: number;
  setHp: React.Dispatch<React.SetStateAction<number>>;
  isSleep: boolean;
  isGameStop: boolean;
  setIsSleep: React.Dispatch<React.SetStateAction<boolean>>;
}

function index(props: Props) {

  // プレイヤー睡眠中はHPを回復する
  useEffect(() => {
    const playerHeal = setInterval(() => {
      if (!props.isGameStop) {
        if (props.isSleep) {
          props.setHp(prev => prev + 40 - Math.floor(props.age / 20) > 50000 ? 50000 : prev + 40 - Math.floor(props.age / 20));
        } else {
          props.setHp(prev => prev - 10);
        }
      }
    }, 10);
    return () => clearInterval(playerHeal);
  }, [props.isSleep]);
  
  return (
    <div className={styles.playerWindow}>
      <Image 
        className={styles.playerWindowImage}
        src="/playerWindow.png"
        alt=""
        height={460}
        width={250}
      />
      <div className={styles.playerUI}>
        <div className={styles.playerName}>{props.name}</div>
        <div className={styles.playerImageContainer}>
          <PlayerImage 
            age={props.age}
            hp={props.hp}
            isSleep={props.isSleep}
          />
          <PlayerSleepButton
            isSleep={props.isSleep}
            setIsSleep={props.setIsSleep}
          />
        </div>
        <div className={styles.playerHp}>
          <HpBar hp={props.hp}/>
        </div>
        <div className={styles.exclamation}>
          <Image
            src="/warning.png"
            alt=""
            width={50}
            height={50}
            style={ props.hp < 25000 ? { opacity: 1 } : { opacity: 0 } }
          />
        </div>
      </div>
    </div>
  )
}

export default index