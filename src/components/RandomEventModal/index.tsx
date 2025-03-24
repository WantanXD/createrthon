import React, { useEffect, useState } from 'react';
import styles from "./styles/style.module.scss";
import { Modal } from '@mui/material';
import { RandomEvent, Result } from '@/types/interfaces/RandomEvent';
import { generateRandomEvents } from '@/data/randomEvent';
import { RandomEventHooks } from './hooks/RandomEventHooks';
import { ReduceEffect } from '@/types/interfaces/ReduceEffect';

interface Props {
  event: number;
  handleClose: () => void;
  name: string;
  setHp: React.Dispatch<React.SetStateAction<number>>;
  setCredit: React.Dispatch<React.SetStateAction<number>>;
  setReduceEffects: React.Dispatch<React.SetStateAction<ReduceEffect[]>>;
}

function index(props: Props) {

  const [randomEvents, setRandomEvents] = useState<RandomEvent[]>(generateRandomEvents());
  const [result, setResult] = useState<Result>();
  const [resultContent, setResultContent] = useState<string>("");
  const {
    eventResultId1,
    eventResultId2
  } = RandomEventHooks();

  useEffect(() => {
    console.log(result)
  }, [result])

  return (
    <>
      <Modal
        open={props.event !== -1}
        onClose={() => {
          props.handleClose();
          setResult(undefined);
          setResultContent("");
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={styles.modalContainer}>
          <div className={styles.title}>
            ランダムイベント：{randomEvents[props.event]?.title}
          </div>
          <div className={styles.content}>
            {randomEvents[props.event]?.content}
          </div>
          <button 
            onClick={() => {
              const res = Math.floor(Math.random() * 1000 % randomEvents[props.event]?.submit_results.length);
              setResult(randomEvents[props.event]?.submit_results[res]);
              if (randomEvents[props.event]?.id === 0) eventResultId1(randomEvents[props.event]?.submit_results[res]?.id, props.setHp);
              else if (randomEvents[props.event]?.id === 1) eventResultId2(randomEvents[props.event]?.submit_results[res]?.id, props.setCredit, props.setReduceEffects);
              setResultContent(randomEvents[props.event]?.submit_results[res]?.content(props.name));
            }}
            className={styles.button}
            disabled={!!result}
            style={ !!result ? { filter: "grayscale(100%)" } : {} }
          >
            {randomEvents[props.event]?.submit}
          </button>
          {result !== undefined && (
            <>
              <div className={styles.result}>
                {resultContent}
              </div>
              <div className={styles.effect}>
                {result.result}
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  )
}

export default index