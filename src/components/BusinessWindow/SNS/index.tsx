import React, { useEffect, useState } from 'react';
import styles from "./styles/style.module.scss";

interface Props {
  age: number;
  narikin: number;
  follower: number;
  setFollower: React.Dispatch<React.SetStateAction<number>>;
  setNarikin: React.Dispatch<React.SetStateAction<number>>;
}

function index(props: Props) {

  const [errorText, setErrorText] = useState<string>("");
  
  return (
    <div className={styles.snsContainer}>
      <div
        className={styles.narikinValueContainer}
      >
        <div className={styles.title}>現在の成金額</div>
        <input className={styles.narikinValueInput}
          type='number' 
          value={props.narikin}
          onChange={(e) => {
            if (!e.target.value.startsWith("-")) {
              props.setNarikin(e.target.value as unknown as number)
              props.setFollower(Math.floor(props.narikin * 2 / Math.floor(props.age / 40)));
              setErrorText("");
            }
            else {
              setErrorText("負の数は指定できないよ");
              setTimeout(() => setErrorText(""), 1000);
            }
          }}
        />
        <div className={styles.errorText}>{errorText}</div>
      </div>
      <div className={styles.snsInfo}>
        <div className={styles.follower}>フォロワー増加予測数：<span style={{ color: "red", fontWeight: "bold" }}>{Math.floor(props.narikin * 2 / Math.floor(props.age / 40))}</span>人/成金</div>
      </div>
    </div>
  )
}

export default index