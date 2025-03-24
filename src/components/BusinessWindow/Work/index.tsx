import React from 'react';
import styles from "./styles/style.module.scss";
import { WorkInformation } from '@/types/interfaces/WorkInformation';

interface Props {
  workSuggestions: WorkInformation[];
  selectWorkInformation: (ws: WorkInformation) => void;
}

const seasons = ["春", "夏", "秋", "冬"];

function index(props: Props) {
  return (
    <div className={styles.workContainer}>
      {props.workSuggestions.map((ws, index) => (
        <div 
          key={index}
          className={styles.workCard}
          onClick={() => props.selectWorkInformation(ws)}
        >
          <div className={styles.title}>
            <div className={styles.checkBox} />
            <h3>{ws.name}</h3>
            <div style={{fontSize: "10px", paddingLeft: "10px"}}>{ws.expire_time !== Infinity && `${Math.floor(ws.expire_time / 4)}歳${seasons[ws.expire_time % 4]}まで`}</div>
          </div>
          <div className={styles.detail}>
            <p>体力：{Math.floor(ws.cost / 500)}%/年</p>
            <p>報酬：${ws.reward.toLocaleString()}/年</p>
            <p>報酬日：{ws.reward_time === 0 ? "即日" : `${Math.floor(ws.reward_time / 4)}歳${seasons[ws.reward_time % 4]}`}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default index