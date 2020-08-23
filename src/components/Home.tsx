import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import { fetchData } from "./Api";
import { DifficultyLevel, QuestionsState } from "./types";
import { QuestionCard } from "./QuestionCard";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  containerClass: {
    backgroundColor: "red",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const TOTALQUESTIONS: number = 10;
export const Home: React.FC = () => {
  const classes = useStyles();

  const [quizData, setQuizData] = useState<QuestionsState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [QuizStart, setQuizStart] = useState(false);
  const [score, setScore] = useState(0);

  const updateQuestionNumber = () => {
    setQuestionNumber((prev) => prev + 1);
  };

  const updateScore = () => {
    setScore((prev) => prev + 1);
  };

  const startQuiz = async () => {
    setQuestionNumber(0);
    setScore(0);
    setQuizStart(true);
    const quizQuestions = await fetchData(TOTALQUESTIONS, DifficultyLevel.EASY);
    await setQuizData(quizQuestions);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center !important",
            marginTop: "10%",
            width: "100%",
          }}
          item
          xs={12}
        >
          <div className={classes.paper}>
            {!QuizStart && (
              <Button variant="contained" color="primary" onClick={startQuiz}>
                <Typography variant="h1" component="h2">
                  Start
                </Typography>
              </Button>
            )}
            {TOTALQUESTIONS === questionNumber ? (
              <>
                <Typography variant="h1" component="h2">
                  Game Over
                </Typography>
                <Typography variant="h2" component="h2">
                  Total Score : {score} / {TOTALQUESTIONS}
                </Typography>
                <Button variant="contained" color="primary" onClick={startQuiz}>
                  <Typography variant="h6" component="h2">
                    Restart
                  </Typography>
                </Button>
              </>
            ) : (
              <span>
                {quizData.length > 0 && (
                  <QuestionCard
                    question={quizData[questionNumber].question}
                    answers={quizData[questionNumber].answers}
                    correctAnswer={quizData[questionNumber].correct_answer}
                    questionNumber={questionNumber}
                    updateQuestionNumber={updateQuestionNumber}
                    totalQuestions={TOTALQUESTIONS}
                    updateScore={updateScore}
                    score={score}
                  />
                )}
              </span>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
