"use client";
import React, { useEffect, useState } from 'react';
import styles from './styles/style.module.scss';
import Image from "next/image";
import Work from './Work';
import Stock from './Stock';
import { WorkInformation } from '@/types/interfaces/WorkInformation';
import { works } from '@/data/works';
import { ReduceEffect } from '@/types/interfaces/ReduceEffect';
import { StockInformation } from '@/types/interfaces/StockInformation';
import { stocks } from '@/data/stocks';
import { Snackbar } from '@mui/material';
import SNS from './SNS';

interface Props {
  age: number;
  isSleep: boolean;
  credit: number;
  narikin: number;
  follower: number;
  setIsGameStop: React.Dispatch<React.SetStateAction<boolean>>;
  setHp: React.Dispatch<React.SetStateAction<number>>;
  setCredit: React.Dispatch<React.SetStateAction<number>>;
  setReduceEffects: React.Dispatch<React.SetStateAction<ReduceEffect[]>>;
  setNarikin: React.Dispatch<React.SetStateAction<number>>;
  setFollower: React.Dispatch<React.SetStateAction<number>>;
}

function index(props: Props) {

  const [business, setBusiness] = useState<number>(2);
  const [workSuggestions, setWorkSuggestions] = useState<WorkInformation[]>([]);
  const [workCount, setWorkCount] = useState<number>(0);
  const [snackbar, setSnackbar] = useState<boolean>(false);

  useEffect(() => {
    // workの処理
    const rand = Math.floor(Math.random() * 1000) % 100;
    if (rand < 30 && workSuggestions.length < 7) {
      const ws = JSON.parse(JSON.stringify(works[Math.floor(Math.random() * 1000 % works.length)]));
      if (ws.expire_time !== null) ws.expire_time = props.age + ws.expire_time;
      if (ws.expire_time === null) ws.expire_time = Infinity;
      ws.id = workCount;
      setWorkCount(current => current + 1);
      setWorkSuggestions(prev => [...prev, ws]);
    }
    setWorkSuggestions(prev => [...prev].filter(ws => ws.expire_time >= props.age && !ws.check));

    // stockの処理
    if (props.age % 4 === 0) {
      stocks.map(stock => {
        // 倒産している企業はスキップ
        if (!stock.isBankrupt) {
          // まずは配当金を配布
          if (stock.check) {
            props.setCredit(current => current + Math.floor(stock.reward * 100));
            props.setReduceEffects(current => [...current, { y: 30, startTime: performance.now(), value: Math.floor(stock.reward * 100) }])
          }

          stock.prev_rate = stock.rate;
          stock.prev_value = stock.value;

          // 乱数で成長率を決める
          const volatility = Math.random() / 50.0;
          const rand = Math.random() * 1000;
          if (rand < 500 - stock.rate * 1000) {
            // マイナス成長
            if (stock.rate < 0) {
              stock.rate -= volatility;
            } else {
              stock.rate -= volatility * (1 + stock.rate * 10);
            }
          } else {
            // プラス成長
            if (stock.rate > 0) {
              stock.rate += volatility;
            } else {
              stock.rate += volatility * (1 + -stock.rate * 10);
            }
          }

          // 成長率は±5%以上遷移しない
          stock.rate = Math.max(-0.05, Math.min(0.05, stock.rate));

          // 価値を変動
          stock.value = stock.value * (1 + stock.rate);
          // 配当を変動
          stock.reward = stock.reward * (1 + stock.rate);
        }
      });
    }

    // フォロワー数の処理
    // 年齢が変わったときに、獲得できるフォロワー数も変える
    props.setFollower(Math.floor(props.narikin * 2 / Math.floor(props.age / 40)));
    
  }, [props.age]);

  return (
    <div className={styles.businessContainer}>
      <Image
        src="/business/lottery.png"
        alt=""
        width={80}
        height={80}
        quality={100}
        className={styles.stickyNote}
        style={{ 
          top: "45px",
          right: "0px",
          zIndex: `${business === 2 ? 3 : 1}`
        }}
        onClick={() => setBusiness(2)}
      />
      <Image
        src="/business/stock.png"
        alt=""
        width={80}
        height={80}
        quality={100}
        className={styles.stickyNote}
        style={{
          right: "65px",
          zIndex: `${business === 1 ? 3 : 1}`
        }}
        onClick={() => setBusiness(1)}
      />
      <Image
        src="/business/work.png"
        alt=""
        width={80}
        height={80}
        quality={100}
        className={styles.stickyNote}
        style={{
          right: "130px",
          zIndex: `${ business === 0 ? 3 : 1 }`
        }}
        onClick={() => setBusiness(0)}
      />
      <Image
        src="/business/workPaper.png"
        alt=""
        width={300}
        height={400}
        className={styles.workPaper}
      />
      <div className={styles.businessData}>
        {business === 0 ? (
          <Work 
            workSuggestions={workSuggestions}
            selectWorkInformation={(ws: WorkInformation) => {
              if (!props.isSleep) {
                if (ws.reward_time === 0) {
                  props.setHp(current => current - ws.cost);
                  props.setCredit(current => current + ws.reward);
                  props.setReduceEffects(current => [...current, { y: 30, startTime: performance.now(), value: ws.reward }]);
                }
                setWorkSuggestions(current => [...current.filter(workSuggestion => workSuggestion.id !== ws.id)]);
              }
            }}
          />
        ) : business === 1 ? (
          <Stock 
            buy={(stock: StockInformation) => {
              if (!props.isSleep) {
                if (props.credit < Math.floor(stock.value*100)) {
                  setSnackbar(true);
                  return;
                }
                props.setCredit(current => current - Math.floor(stock.value*100));
                props.setReduceEffects(current => [...current, { y: 30, startTime: performance.now(), value: -Math.floor(stock.value*100) }]);
                stock.check = true;
              }
            }}
            sell={(stock: StockInformation) => {
              if (!props.isSleep) {
                props.setCredit(current => current + Math.floor(stock.value*100));
                props.setReduceEffects(current => [...current, { y: 30, startTime: performance.now(), value: Math.floor(stock.value*100) }]);
                stock.check = false;
              }
            }}
          />
        ) : (
          <SNS 
            age={props.age}
            follower={props.follower}
            setFollower={props.setFollower}
            narikin={props.narikin}
            setNarikin={props.setNarikin}
          />
        )}
      </div>
      <Snackbar
        open={snackbar}
        autoHideDuration={2000}
        message="資金不足です"
        onClose={() => setSnackbar(false)}
      />
    </div>
  )
}

export default index