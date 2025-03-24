import { StockInformation } from "@/types/interfaces/StockInformation";

export const stocks: StockInformation[] = [
  {
    name: "絶対安定建設（100株）",
    value: 123.0,
    reward: 0.5,
    score: 0.2,
    rate: 0.02,
    prev_value: 25.0,
    prev_rate: 0.02,
    check: false,
    isBankrupt: false,
  },
  {
    name: "新興ゲーム開発（100株）",
    value: 67.0,
    reward: 0.5,
    score: -0.2,
    rate: -0.02,
    prev_value: 15.0,
    prev_rate: -0.02,
    check: false,
    isBankrupt: false,
  },
  {
    name: "ビッグカメラ（100株）",
    value: 267.0,
    reward: 0.4,
    score: 0.2,
    rate: 0.02,
    prev_value: 55.0,
    prev_rate: 0.02,
    check: false,
    isBankrupt: false
  }
] as const;

const initialStocks: StockInformation[] = [
  {
    name: "絶対安定建設（100株）",
    value: 123.0,
    reward: 0.5,
    score: 0.2,
    rate: 0.02,
    prev_value: 25.0,
    prev_rate: 0.02,
    check: false,
    isBankrupt: false,
  },
  {
    name: "新興ゲーム開発（100株）",
    value: 67.0,
    reward: 0.5,
    score: -0.2,
    rate: -0.02,
    prev_value: 15.0,
    prev_rate: -0.02,
    check: false,
    isBankrupt: false,
  },
  {
    name: "ビッグカメラ（100株）",
    value: 267.0,
    reward: 0.4,
    score: 0.2,
    rate: 0.02,
    prev_value: 55.0,
    prev_rate: 0.02,
    check: false,
    isBankrupt: false
  }
] as const;

/**
 * stockをリセットする
 */
export function resetStock() {
  Object.assign(stocks, initialStocks);
}