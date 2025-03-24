export interface RandomEvent {
  id: number;
  title: string;
  content: string;
  submit: string;
  submit_results: Result[]
}

export interface Result {
  id: number;
  rate: number;
  content: (name: string) => string;
  result: string;
}