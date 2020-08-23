import { QuizType } from "./types";
import { shuffleArray } from "./Util";
let data: any;

export const fetchData = async (amount: number, level: string) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${level}&type=multiple`;
  console.log("ASD", amount, level);
  data = await fetch(url);
  let { results } = await data.json();

  return results.map((question: QuizType) => ({
    ...question,
    answers: shuffleArray([
      question.correct_answer,
      ...question.incorrect_answers,
    ]),
  }));
};
