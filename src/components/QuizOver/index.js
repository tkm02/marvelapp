import React, { Fragment, useEffect, useState } from "react";

const QuizOver = React.forwardRef((props, ref) => {
  const { levelNames, score, maxQuestion, quizLevel, percent,loadLevelQuestion } = props;
  const [asked, setAsked] = useState([]);
  console.log(asked);
  useEffect(() => {
    setAsked(ref.current);
  }, [ref]);
  const averageGrade = maxQuestion / 2;

  const questionAnswer =
    score >= averageGrade ? (
      asked.map((question) => {
        return (
          <tr id={question.id}>
            <td>{question.question}</td>
            <td>{question.answer}</td>
            <td>
              <button className="btnInfo">Infos</button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr columnSpan="3">
        <p style={{ textAlign: "center", color: "red" }}>Pas de réponses !</p>
      </tr>
    );

  const decision =
    score >= averageGrade ? (
      <>
        <div className="stepsBtnContainer">
          {quizLevel < levelNames.length ? (
            <>
              <p className="successMsg">Bravo, passez au niveau suivant !</p>
              <button className="btnResult success" onClick={()=>loadLevelQuestion(quizLevel)}>Niveau suivant</button>
            </>
          ) : (
            <>
              <p className="successMsg">Bravo, vous êtes un expert !</p>
              <button className="btnResult gameOver" onClick={()=>loadLevelQuestion(0)} >Accueil</button>
            </>
          )}
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite: {percent} %</div>
          <div className="progressPercent">
            Note: {score}/{maxQuestion}
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez échoué</p>
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite: {percent} %</div>
          <div className="progressPercent">
            Note: {score}/{maxQuestion}
          </div>
        </div>
      </>
    );
  return (
    <Fragment>
      {decision}
      <hr />
      <p>Les réponses aux question posées:</p>

      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponses</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>{questionAnswer}</tbody>
        </table>
      </div>
    </Fragment>
  );
});

export default React.memo(QuizOver);
