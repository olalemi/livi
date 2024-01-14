import React, { useContext, useState } from "react";
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

interface NextType {
  answered?: string;
  next_question: string;
}

interface Question {
  id: string;
  question_text: string;
  answers: Answer[];
  next: NextType[];
}

const Question: React.FC = () => {
  const [questionScores, setQuestionScores] = useState<{
    [key: string]: number;
  }>({});
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedAnswerId,
    setSelectedAnswerId,
  } = useContext(UserContext);

  const currentQuestion = questionsData.questions[currentQuestionIndex];
  const isLastQuestion =
    currentQuestionIndex == 9;

 console.log(isLastQuestion,"lastQuestion");
 
 

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



  const navigateToQuestion = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < questionsData.questions.length) {
      setCurrentQuestionIndex(newIndex);
      setSelectedAnswerId(null);
    }
  };

  const calculateTotalScore = () => {
    return Object.values(questionScores).reduce((acc, score) => acc + score, 0);
  };


  const determineOutcome = (totalScore: number) => {
    if (totalScore <= 5) {
      return questionsData.outcomes[0]; 
    } else if (totalScore <= 49) {
      return questionsData.outcomes[1]; 
    } else {
      return questionsData.outcomes[2]; 
    }
  };

  console.log(questionsData.outcomes[0],"q data");
  

  const handleNavigation = (isForward: boolean) => {
    if (isForward && !selectedAnswerId) return;

    const newTotalScore = calculateTotalScore();
    if (isLastQuestion) {

      const outcome = determineOutcome(newTotalScore);

  console.log("Outcome:", outcome);  
    


    } else {
      navigateToQuestion(currentQuestionIndex + 1);
    }

    navigateToQuestion(
      isForward ? currentQuestionIndex + 1 : currentQuestionIndex - 1,
    );
  };
      console.log("print meeee"); 
  console.log(currentQuestionIndex,"question index");
  

  return (
    <Box>
      <Text
        color="#3f6072"
        fontSize={{ base: "16px", md: "20px" }}
        width={{ base: "200px", md: "300px" }}
        padding={{ base: "20px 0px", md: "50px 0px" }}
        margin="auto"
        fontWeight={700}
        textAlign="center"
        mt="30px"
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
            isSelected={selectedAnswerId === answer.id}
            onClick={() => handleAnswerClick(answer.id)}
          />
        ))}
      </Flex>
      <Box p={{ base: "20px" }} mt={40}>
        <ButtonComponent
          buttonText="Next"
          buttonBackgroundColor={selectedAnswerId ? "#77d2c1" : ""}
          buttonColor={selectedAnswerId ? "#fff" : "#3f6072"}
          showRightIcon={true}
          showLeftIcon={currentQuestionIndex > 0}
          onRightIconClick={() => handleNavigation(true)}
        />
      </Box>
    </Box>
  );
};

export default Question;
