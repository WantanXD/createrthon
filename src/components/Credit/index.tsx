"use client";
import React from 'react';
import styles from "./styles/style.module.scss";
import Image from 'next/image';

interface Props {
  credit: number;
}

function index(props: Props) {
  return (
    <div className={styles.creditContainer}>
      <Image className={styles.creditImage} src="/credit.png" width={250} height={70} alt=""/>
      <i
        className={styles.creditAmount}
      >
        ${props.credit.toLocaleString()}
      </i>
    </div>
  )
}

export default index