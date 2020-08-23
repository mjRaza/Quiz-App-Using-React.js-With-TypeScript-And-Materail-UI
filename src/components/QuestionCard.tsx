import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
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
    backgroundColor: "#ffdede",
  },
}));
export type Props = {
  question?: any;
  questionNumber?: Number;
  answers: string[];
  correctAnswer: string;
  updateQuestionNumber: () => void;
  updateScore: () => void;
  totalQuestions: number;
  score: number;
};

export const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  correctAnswer,
  questionNumber,
  updateQuestionNumber,
  totalQuestions,
  updateScore,
  score,
}) => {
  const classes = useStyles();

  const SelectionChange = (e: React.ChangeEvent<HTMLButtonElement>) => {
    if (e.currentTarget.value === correctAnswer) {
      updateScore();
    }

    updateQuestionNumber();
    if (questionNumber === totalQuestions - 1) {
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" component="h2">
                Score : {score}/{totalQuestions}
              </Typography>

              <Typography variant="h4" component="h2">
                <div dangerouslySetInnerHTML={{ __html: question }} />
              </Typography>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {answers.map((ans, indx) => (
                  <Button
                    key={indx}
                    value={ans}
                    onClick={(e: any) => SelectionChange(e)}
                  >
                    <div dangerouslySetInnerHTML={{ __html: ans }} />
                  </Button>
                ))}
              </div>
            </span>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
