import React, {  useContext} from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import questionsData from "../data/questions.json";
import OptionComponent from "./OptionComponent";
import ButtonComponent from "./ButtonComponent";
import { UserContext } from "../utility/UserProvider";

interface Answer {
  id: string;
  label: string;
  score: number;
}

interface NextWithAnswered {
  answered: string;
  next_question: string;
}

interface NextWithoutAnswered {
  next_question: string;
}

type NextType = NextWithAnswered | NextWithoutAnswered;

interface Question {
  id: string;
  question_text: string;
  answers: Answer[];
  next: NextType[];
}

const Question: React.FC = () => {




  const { currentQuestionIndex, setCurrentQuestionIndex, setTotalScore, selectedAnswerId, setSelectedAnswerId } = useContext(UserContext);

  const isLastQuestion = currentQuestionIndex === questionsData.questions.length - 1;
  const currentQuestion = questionsData.questions[currentQuestionIndex];

  const handleAnswerClick = (answerId: string) => {
    

    if (selectedAnswerId === answerId) {
   
      setSelectedAnswerId(null);

    } else {

      const answer = currentQuestion.answers.find((ans) => ans.id === answerId);
      setSelectedAnswerId(answerId);
      if (answer) {
        setTotalScore((prevScore) => prevScore + answer.score);
      }
    
    
    }
    
   
 
  };

  const navigateToQuestion = (nextQuestionIndex: number) => {
    setCurrentQuestionIndex(nextQuestionIndex);
    setSelectedAnswerId(null);
  };

  const handleNavigation = (isForward: boolean) => {
    if (isForward && !selectedAnswerId) return;

    const newIndex = isForward
      ? currentQuestionIndex + 1
      : currentQuestionIndex - 1;
    if (newIndex >= 0 && newIndex < questionsData.questions.length) {
      navigateToQuestion(newIndex);
    }
    console.log(newIndex, "what is the index");
    console.log(isForward, "what is isForward");
  };

  console.log(currentQuestion.question_text,"question text");

 
  

  return (
    <Box>
      <Text
        color="#3f6072"
        fontSize={{ base: "16px", md: "20px" }}
        padding={{ base: "16px", md: "30px" }}
        fontWeight={700}
        textAlign="center"
        mt="30px"
        width={{ md: "400px" }}
      >
        {currentQuestion.question_text}
      </Text>

      <Flex
        justifyContent="center"
        flexDirection="row"
        width="100%"
        gap={2}
        mt="20px"
      >
        {currentQuestion.answers.map((answer) => (
          <OptionComponent
            key={answer.id}
            buttonText={answer.label}
            isSelected={  selectedAnswerId === answer.id}
            onClick={() => handleAnswerClick(answer.id)}
          />
        ))}
      </Flex>

      <Box p={{ base: "20px " }} mt={40}>
        <ButtonComponent
          buttonText="Next"
          buttonBackgroundColor={selectedAnswerId? "#77d2c1": ""}
          showRightIcon={currentQuestionIndex >= 0}
          showLeftIcon={currentQuestionIndex > 0}
          onRightIconClick={() => handleNavigation(!isLastQuestion)}
          buttonColor={selectedAnswerId ? "#fff" : "#3f6072"}
        />
      </Box>
    </Box>
  );
};

export default Question;
