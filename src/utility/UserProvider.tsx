import { createContext, useState } from "react";
import questionsData from "../data/questions.json";
import {
  Props,
  Outcome,
  UserContextType,
} from "../interfaces/UserProvider/IUserProvider";

export const UserContext = createContext<UserContextType>({
  currentQuestionIndex: 0,
  setCurrentQuestionIndex: () => {},
  setTotalScore: () => {},
  totalScore: 0,
  selectedAnswerId: null,
  setSelectedAnswerId: () => {},
  currentQuestion: null,
  handleAnswerClick: () => {},
  determineOutcome: () => {
    return { id: "", text: "", show_booking_button: false };
  },
  calculateTotalScore: () => {},
  isLastQuestion: false,
  navigateToQuestion: () => {},
});

const UserProvider = ({ children }: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [questionScores, setQuestionScores] = useState<{
    [key: string]: number;
  }>({});

  const currentQuestion = questionsData.questions[currentQuestionIndex];
  const isLastQuestion =
    currentQuestionIndex == questionsData.questions.length - 1;

  const navigateToQuestion = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < questionsData.questions.length) {
      setCurrentQuestionIndex(newIndex);
      setSelectedAnswerId(null);
    }
  };

  const handleAnswerClick = (answerId: string) => {
    const answer = currentQuestion.answers.find((ans) => ans.id === answerId);
    if (selectedAnswerId !== answerId) {
      setSelectedAnswerId(answerId);
      if (answer) {
        setQuestionScores((prevScores) => ({
          ...prevScores,
          [currentQuestion.id]: answer.score,
        }));
      }
    } else {
      setSelectedAnswerId(null);
    }
  };

  const calculateTotalScore = () => {
    const newTotalScore = Object.values(questionScores).reduce(
      (acc, score) => acc + score,
      0,
    );
    setTotalScore(newTotalScore);
    return newTotalScore;
  };

  const determineOutcome = (totalScore: number): Outcome => {
    if (totalScore <= 5) {
      return questionsData.outcomes[0];
    } else if (totalScore <= 49) {
      return questionsData.outcomes[1];
    } else {
      return questionsData.outcomes[2];
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentQuestionIndex,
        setCurrentQuestionIndex,
        totalScore,
        setTotalScore,
        selectedAnswerId,
        setSelectedAnswerId,
        currentQuestion,
        handleAnswerClick,
        determineOutcome,
        calculateTotalScore,
        isLastQuestion,
        navigateToQuestion,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
