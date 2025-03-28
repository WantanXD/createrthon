"use client";
import { ReduceEffect } from '@/types/interfaces/ReduceEffect';
import React, { useEffect, useState } from 'react';
import styles from "./styles/style.module.scss";
import Credit from '@/components/Credit';
import CreditReduceEffector from '@/components/CreditReduceEffector';
import NarikinButton from '@/components/NarikinButton';
import PlayerWindow from '@/components/PlayerWindow';
import { useParams, useRouter } from 'next/navigation';
import BusinessWindow from '@/components/BusinessWindow';
import AgeDisplay from '@/components/AgeDisplay';
import RandomEventModal from '@/components/RandomEventModal';
import { generateRandomEvents } from '@/data/randomEvent';

function page() {
  const router = useRouter();
  const name = decodeURIComponent(useParams().name as string);

  const seasons = ["春", "夏", "秋", "冬"];

  const [credit, setCredit] = useState<number>(7500);
  const [narikin, setNarikin] = useState<number>(1000);
  const [hp, setHp] = useState<number>(50000);
  const [follower, setFollower] = useState<number>(1000);
  const [reduceEffects, setReduceEffects] = useState<ReduceEffect[]>([]);
  const [isSleep, setIsSleep] = useState<boolean>(false);
  const [age, setAge] = useState<number>(80); // 春夏秋冬 * （最長）80年 = 320秒
  const [isGameStop, setIsGameStop] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isHappeningEvent, setIsHappeningEvent] = useState<number>(-1);

  useEffect(() => {
    const countAge = setInterval(() => {
      if(!isGameStop) {
        setAge(current => current + 1);
        if (Math.random() < 0.003) { // 0.3%の確率でランダムイベント
          setIsGameStop(true);
          setIsHappeningEvent(Math.floor(Math.random() * 100 % generateRandomEvents().length));
        }
      }
    }, 1000);
    return () => clearInterval(countAge);
  }, [isGameStop]);

  // 体力0でゲームオーバー
  useEffect(() => {
    if (hp < 0) {
      setIsGameOver(true);
    }
  }, [hp]);

  useEffect(() => {
    if (isGameOver) setIsGameStop(true);
  }, [isGameOver])

  return (
    <main>
      <div style={{ backgroundColor: "orange" }}>
        <div className={styles.gameContainer}>
          <div className={styles.gameArea}>
            <div className={styles.ageContainer}>
              <AgeDisplay age={age} />
            </div>
            <div className={styles.creditContainer}>
              <Credit credit={credit} />
            </div>
            <div className={styles.creditReduceEffectorContainer}>
              <CreditReduceEffector
                reduceEffects={reduceEffects}
                setReduceEffects={setReduceEffects}
              />
            </div>
            <NarikinButton 
              age={age}
              credit={credit}
              isSleep={isSleep}
              narikin={narikin}
              follower={follower}
              isGameStop={isGameStop}
              setIsGameOver={setIsGameOver}
              burnCredit={() => {
                setCredit(prev => prev - narikin);
                const newReduceEffect: ReduceEffect = { y: 30, startTime: performance.now(), value: -narikin };
                setReduceEffects(current => [...current, newReduceEffect]);
              }}
            />
            <div className={styles.playerWindowContainer}>
              <PlayerWindow 
                name={name}
                hp={hp}
                age={age}
                setHp={setHp}
                isSleep={isSleep}
                isGameStop={isGameStop}
                setIsSleep={setIsSleep}
              />
            </div>
            <div className={styles.businessesContainer}>
              <BusinessWindow 
                setIsGameStop={setIsGameStop}
                setHp={setHp}
                setCredit={setCredit}
                setReduceEffects={setReduceEffects}
                age={age}
                isSleep={isSleep}
                credit={credit}
                narikin={narikin}
                setNarikin={setNarikin}
                follower={follower}
                setFollower={setFollower}
              />
            </div>
          </div>
        </div>
      </div>
      <RandomEventModal
        name={name}
        setHp={setHp}
        setCredit={setCredit}
        setReduceEffects={setReduceEffects}
        event={isHappeningEvent}
        handleClose={() => {
          setIsGameStop(false);
          setIsHappeningEvent(-1);
        }}
      />
      {isGameOver && (
        <div className={styles.gameOverGray}>
          <div className={styles.gameOver}>
            昇天
          </div>
          <div className={styles.result}>
            あなたの記録：{Math.floor(age / 4)}歳{seasons[age % 4]}
          </div>
          <button
            className={styles.restart} 
            onClick={() => router.push(`/?name=${name}`)}
          >
            スタートにもどる
          </button>
        </div>
      )}
    </main>
  );
}

export default page