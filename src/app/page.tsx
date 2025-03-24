"use client";
import { resetStock } from "@/data/stocks";
import styles from "./styles/style.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * メインプログラム
 */
export default function Home() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const initName = searchParams.get("name");
  const [name, setName] = useState<string>(initName ?? "");

  // ストックをリセット
  useEffect(() => {
    resetStock();
  }, [])

  return (
    <>
      <div className={styles.pageContainer}>
        <input
          className={styles.pageInput}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="預言者の名前"
        />
        <button 
          onClick={() => router.push(`/${name}`)}
          disabled={!name.length}
          className={styles.pageButton}
          style={!name.length ? { filter: "grayscale(100%)" } : {}}
        >
          <div className={styles.insidePageButton}>
            生誕する
          </div>
        </button>
      </div>
    </>
  );
}
