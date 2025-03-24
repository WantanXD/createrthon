"use client";
import React from 'react';
import Image from "next/image";
import styles from "./styles/style.module.scss";

interface Props {
  hp: number;
  age: number;
  isSleep: boolean;
}

const ImageUrl = {
  normal: "/player/normal.png",
  oji: "/player/ozi.png",
  ojii: "/player/ozii.png",
  sleep: "/player/sleep.png"
}

function index(props: Props) {
  return (
    <div className={styles.playerImage}>
      <Image
        src={props.isSleep ? ImageUrl.sleep : Math.floor(props.age / 4) < 40 ? ImageUrl.normal : Math.floor(props.age / 4) < 60 ? ImageUrl.oji : ImageUrl.ojii }
        alt=""
        width={200}
        height={300}
      />
    </div>
  )
}

export default index