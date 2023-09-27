import React, { Component } from "react";
import { QuizMarvel } from "../quizMarvel";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuizOver from "../QuizOver";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      levelNames: ["debutant", "confirme", "expert"],
      quizLevel: 0,
      maxQuestion: 10,
      storedQuestion: [],
      question: null,
      options: [],
      idQuestion: 0,
      btnDisabled: true,
      userAnswer: null,
      score: 0,
      showWelcomeMsg: false,
      quizEnd: false,
      percent: 0,
    };
    this.state = this.initialState;
    this.storedDataRef = React.createRef();

  }


  loadQuestion = (level) => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[level];
    console.log(fetchedArrayQuiz);
    if (fetchedArrayQuiz.length >= this.state.maxQuestion) {
      this.storedDataRef.current = fetchedArrayQuiz;
      const newArray = fetchedArrayQuiz.map(
        ({ answer, ...keepRest }) => keepRest
      );
      this.setState({
        storedQuestion: newArray,
      });
    } else {
      console.log("pas assez de question");
    }
  };

  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false,
    });
  };
  getPercent = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

  gameOver = () => {
    const gradePercent = this.getPercent(
      this.state.maxQuestion,
      this.state.score
    );

    if (gradePercent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent: gradePercent,
        quizEnd: true,
      });
    } else {
      this.setState({
        percent: gradePercent,
        quizEnd: true,
      });
    }
    this.setState({
      quizEnd: true,
    });
  };
  nextQuextion = () => {
    if (this.state.idQuestion === this.state.maxQuestion - 1) {
      this.gameOver();
    } else {
      this.setState((prevState) => ({
        idQuestion: prevState.idQuestion + 1,
      }));
    }
    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({
        score: this.state.score + 1,
      }));
      toast.success("Bravo +1", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Raté 0", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  showWelcomeMessage = (pseudo) => {
    if (!this.state.showWelcomeMsg) {
      toast.warn(`Bienvenue ${pseudo} et bonne chance`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      this.setState({
        showWelcomeMsg: true,
      });
    }
  };
  loadLevelQuestion = (params) => {
    console.log(params);
    this.setState({...this.initialState,quizLevel : params});
    this.loadQuestion(this.state.levelNames[params]);
  };
  componentDidMount() {
    this.loadQuestion(this.state.levelNames[this.state.quizLevel]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.storedQuestion !== prevState.storedQuestion) {
      this.setState({
        question: this.state.storedQuestion[this.state.idQuestion].question,
        options: this.state.storedQuestion[this.state.idQuestion].options,
      });
    }

    if (this.state.idQuestion !== prevState.idQuestion) {
      this.setState({
        question: this.state.storedQuestion[this.state.idQuestion].question,
        options: this.state.storedQuestion[this.state.idQuestion].options,
        userAnswer: null,
        btnDisabled: true,
      });
    }

    if (this.props.userData.pseudo) {
      console.log(this.props.userData.pseudo);
      this.showWelcomeMessage(this.props.userData.pseudo);
    }
  }
  //JSX
  render() {
    const options = this.state.options;

    const displayOptions = options.map((option, index) => {
      return (
        <p
          key={index}
          onClick={() => this.submitAnswer(option)}
          className={`answerOptions ${
            this.state.userAnswer === option ? "selected" : ""
          }`}
        >
          {option}
        </p>
      );
    });

    return this.state.quizEnd ? (
      <>
        <QuizOver
          ref={this.storedDataRef}
          levelNames={this.state.levelNames}
          score={this.state.score}
          maxQuestion={this.state.maxQuestion}
          quizLevel={this.state.quizLevel}
          percent={this.state.percent}
          loadLevelQuestion={this.loadQuestion}
        />
        <ToastContainer />
      </>
    ) : (
      <>
        <Levels />
        <ProgressBar
          idQuestion={this.state.idQuestion}
          maxQuestion={this.state.maxQuestion}
        />
        <ToastContainer />
        <h2>{this.state.question}</h2>
        {displayOptions}
        <button
          disabled={this.state.btnDisabled}
          className="btnSubmit"
          onClick={this.nextQuextion}
        >
          {this.state.idQuestion < this.state.maxQuestion - 1
            ? "Suivant"
            : "Terminer"}
        </button>
      </>
    );
  }
}

export default Quiz;
