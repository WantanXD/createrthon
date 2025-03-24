import React from 'react';
import styles from "./styles/style.module.scss";

interface Props {
  age: number;
}

const seasons = ["春", "夏", "秋", "冬"];

function index(props: Props) {
  return (
    <>
      <div className={styles.ageDisplay}>
        <span>{Math.floor(props.age / 4)}歳</span>
        <span className={styles.season}>{seasons[props.age % 4]}</span>
      </div>
    </>
  )
}

export default index