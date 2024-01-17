import { useContext } from "react";
import { Box, Text } from "@chakra-ui/react";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utility/UserProvider";

const HomePage = () => {
  const { setCurrentQuestionIndex } = useContext(UserContext);
  const navigate = useNavigate();
  const handleStartQuestions = () => {
    navigate("/question");
    setCurrentQuestionIndex(0);
  };

  return (
    <Box>
      <Box backgroundColor="#fff" borderRadius={{ base: "5px" }}>
        <Box>
          <>
            <Box>
              <Text
                color="#3f6072"
                fontSize={{ base: "16px", md: "24px" }}
                fontWeight={700}
                textAlign="center"
                mt={40}
                p={5}
              >
                Click 'Start' to begin <br />
                your health assessment.
              </Text>
            </Box>
          </>

          <Box p={{ base: "20px " }} mt={40} onClick={handleStartQuestions}>
            <ButtonComponent
              buttonText="Start"
              buttonBackgroundColor="#77d2c1"
              buttonColor="#fff"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
