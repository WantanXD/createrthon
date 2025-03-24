import React from 'react';
import styles from "./styles/style.module.scss";
import { StockInformation } from '@/types/interfaces/StockInformation';

interface Props {
  stocks: StockInformation[];
  buy: (stock: StockInformation) => void;
  sell: (stock: StockInformation) => void;
}

function index(props: Props) {
  return (
    <div className={styles.stockContainer}>
      {props.stocks.map((stock, index) => (
        <div 
          key={index}
          className={styles.stock}
          style={ stock.isBankrupt ? { filter: "grayscale(100%)" } : {} }
        >
          <div className={styles.title}>{stock.name}</div>
          <div className={styles.detailContainer}>
            <div className={styles.detail}>
              <p>価格：${(stock.value * 100).toFixed(1).toLocaleString()}
                <span style={{fontSize: "10px", ...(stock.value - stock.prev_value > 0 ? {color: "green"} : {color: "red"})}}>(${(stock.value - stock.prev_value).toFixed(1)})</span>
              </p>
              <p>配当：${(stock.reward * 100).toFixed(1).toLocaleString()}/年</p>
              <p>成長率：{(stock.rate*100).toFixed(1)}%
              <span style={{fontSize: "10px", ...(stock.rate - stock.prev_rate > 0 ? {color: "green"} : {color: "red"})}}>({((stock.rate - stock.prev_rate) * 100).toFixed(1)}%)</span>
              </p>
            </div>
            <div className={styles.buttonContainer}>
              <button 
                className={styles.buy}
                style={ stock.check ? { filter: "grayscale(100%)" } : {} }
                disabled={stock.check || stock.isBankrupt}
                onClick={() => props.buy(stock)}
              >
                {stock.isBankrupt ? "倒産" : "購入"}
              </button>
              <button 
                className={styles.sell}
                style={ !stock.check ? { filter: "grayscale(100%)" } : {} }
                disabled={!stock.check || stock.isBankrupt}
                onClick={() => props.sell(stock)}
              >
                {stock.isBankrupt ? "倒産" : "売却"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default index