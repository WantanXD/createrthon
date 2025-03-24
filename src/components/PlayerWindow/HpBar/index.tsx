"use client"
import React from 'react';
import styles from "./styles/style.module.scss";

interface Props {
  hp: number;
}

function index(props: Props) {

  const color = {
    normal: "rgb(139, 254, 145)",
    warning: "rgb(255, 255, 77)",
    danger: "rgb(230, 67, 67)"
  }

  return (
    <div className={styles.hpBarContainer}>
      <div className={styles.hpBarBorder}>
        <div 
          className={styles.hpBarProgress} 
          style={{ 
            width: `${props.hp / 50000 * 100}%`, 
            ...(props.hp > 25000 ? { backgroundColor: color.normal } : props.hp > 12500 ? { backgroundColor: color.warning } : { backgroundColor: color.danger }) 
          }}
        />
      </div>
    </div>
  )
}

export default index