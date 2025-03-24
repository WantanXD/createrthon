"use client";
import React, { useState } from 'react';
import styles from "./styles/style.module.scss";

interface Props {
  isSleep: boolean;
  setIsSleep: React.Dispatch<React.SetStateAction<boolean>>;
}

function index(props: Props) {

  const [disableSleep, setDisableSleep] = useState<boolean>(false);

  return (
    <div className={styles.playerSleepButtonContainer}>
      <button 
        className={styles.playerSleepButton}
        onClick={() => props.setIsSleep(current => {
          if (current) {
            setDisableSleep(true);
            setTimeout(() => setDisableSleep(false), 20000);
          } else {
            setDisableSleep(true);
            setTimeout(() => setDisableSleep(false), 1000);
          }
          return !current;
        })}
        disabled={disableSleep}
        style={ disableSleep ? { filter: "grayscale(100%)" } : {}}
      >
        {props.isSleep ? "起床" : "睡眠"}
      </button>
    </div>
  )
}

export default index