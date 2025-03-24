import { RandomEvent } from "@/types/interfaces/RandomEvent";

export function generateRandomEvents(): RandomEvent[] {
  return [
    {
      id: 0,
      title: "エゴサーチ",
      content: "あなたは、SNSをエゴサーチすることで自己顕示欲を満たし、悦に入ろうとしています。しかし、エゴサーチで見つかる情報は、決して良いものだけではないかもしれません...。",
      submit: "エゴサーチをする",
      submit_results: [
        {
          id: 1,
          rate: 0.2,
          content: (name: string) => `${name}は、あなたの行いは非道であると侮辱するつぶやきを目撃し、思わずネット上で口論になってしまいました...。`,
          result: "体力-10%"
        },
        {
          id: 2,
          rate: 0.5,
          content: (name: string) => `${name}は、あなたにまつわる不快な情報を目にし、やる気を少し失いました...。`,
          result: "体力-5%"
        },
        {
          id: 3,
          rate: 0.8,
          content: (name: string) => `インターネットは${name}を羨望する声で溢れており、自己顕示欲が充足しました。`,
          result: "体力+5%"
        },
        {
          id: 4,
          rate: 1.0,
          content: (name: string) => `${name}に関する投稿はモデレータによってひどく検閲されており、あなたを信仰する情報しか目に入らなかった！`,
          result: "体力+10%"
        }
      ]
    },
    {
      id: 1,
      title: "カスタマーハラスメント",
      content: "着ぐるみバイトをしていたあなたの元に、怒鳴り散らかしているおじいさんがやってきました。このモーダルを閉じてやりすごすこともできますが、真正面から言い返すこともできます。",
      submit: "反論する",
      submit_results: [
        {
          id: 1,
          rate: 0.2,
          content: (name: string) => `おじいさんは、突然言い返してきた${name}に慄き、逃げるように立ち去りました。雇い主から感謝金をもらった！`,
          result: "所持金+$3,000"
        },
        {
          id: 2,
          rate: 0.6,
          content: (name: string) => `${name}とおじいさんは言い争いになり、雇い主が仲裁に入りました。次からはしないようにと後悔しました...。`,
          result: "変化なし"
        },
        {
          id: 3,
          rate: 0.2,
          content: (name: string) => `激しい口論の末、${name}はおじいさんを突き飛ばし、ケガをさせてしまった！`,
          result: "所持金-$4,000"
        }
      ]
    }
  ]
}