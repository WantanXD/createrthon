import { ReduceEffect } from "@/types/interfaces/ReduceEffect";
import { useCallback } from "react";

/**
 * 各ランダムイベントの動作をIDごとに定義する
 */
export function RandomEventHooks() {

  const eventResultId1 = useCallback((resultId: number, setHp: React.Dispatch<React.SetStateAction<number>>) => {
    setHp(current => {
      switch (resultId) {
        case 1: return current - 5000;
        case 2: return current - 2500;
        case 3: return current + 2500;
        case 4: return current + 5000;
        default: return current;
      }
    })
  }, []);

  const eventResultId2 = useCallback((resultId: number, setCredit: React.Dispatch<React.SetStateAction<number>>, setReduceEffects: React.Dispatch<React.SetStateAction<ReduceEffect[]>>) => {
    switch (resultId) {
      case 1:
        setCredit(current => current + 3000);
        setReduceEffects(current => [...current, { y: 30, startTime: performance.now(), value: 3000 }]);
        break;
      case 2:
        break;
      case 3:
        setCredit(current => current - 4000 < 0 ? 0 : current - 4000);
        setReduceEffects(current => [...current, { y: 30, startTime: performance.now(), value: -4000 }]);
        break;
    }
  }, []);

  return {
    eventResultId1,
    eventResultId2
  }
}