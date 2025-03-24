import { WorkInformation } from "@/types/interfaces/WorkInformation";

export const works: WorkInformation[] = [
  {
    id: -1,
    name: "ビル清掃",
    cost: 4000,
    reward: 2000,
    reward_time: 0,
    expire_time: 30,
    check: false
  },
  {
    id: -1,
    name: "居酒屋",
    cost: 5000,
    reward: 2500,
    reward_time: 0,
    expire_time: 10,
    check: false
  },
  {
    id: -1,
    name: "着ぐるみ",
    cost: 10000,
    reward: 3500,
    reward_time: 0,
    expire_time: 15,
    check: false
  },
  {
    id: -1,
    name: "工場",
    cost: 2000,
    reward: 800,
    reward_time: 0,
    expire_time: 10,
    check: false
  }
] as const;