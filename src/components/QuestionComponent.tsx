import React, { useContext } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import OptionComponent from "./OptionComponent";
import ButtonComponent from "./ButtonComponent";
import { UserContext } from "../utility/UserProvider";
import { useNavigate } from "react-router-dom";


const Question: React.FC = () => {
  const {
    currentQuestionIndex,
    selectedAnswerId,
    currentQuestion,
    handleAnswerClick,
    determineOutcome,
    calculateTotalScore,
    isLastQuestion,
    navigateToQuestion,
    totalScore,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const handleNavigation = (isForward: boolean) => {
    if (isForward && !selectedAnswerId) return;

    calculateTotalScore();
    if (isLastQuestion) {
      navigate("/outcome");

     determineOutcome(totalScore);

    } else {
      navigateToQuestion(currentQuestionIndex + 1);
    }

    navigateToQuestion(
      isForward ? currentQuestionIndex + 1 : currentQuestionIndex - 1,
    );
  };

  return (
    <Box>
      <Text
        color="#3f6072"
        fontSize={{ base: "16px", md: "18px" }}
        width={{ base: "280px", md: "300px" }}
        padding={{ base: "20px 10px", md: "50px 10px" }}
        margin="auto"
        fontWeight={700}
        textAlign="center"
        mt="30px"
      >
        {currentQuestion?.question_text}
      </Text>

      <Flex
        justifyContent="center"
        flexDirection="row"
        width="100%"
        gap={2}
        mt="30px"
      >
        {currentQuestion?.answers.map((answer) => (
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
          onClick={() => handleNavigation(true)}
        />
      </Box>
    </Box>
  );
};

export default Question;
