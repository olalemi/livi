import { useContext } from "react";
import { Box, Text } from "@chakra-ui/react";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utility/UserProvider";

const OutcomeComponent = () => {
  const { determineOutcome, totalScore } = useContext(UserContext);
  const navigate = useNavigate();
  const outcome = determineOutcome(totalScore);


  return (
    <Box>
      <Box backgroundColor="#fff" borderRadius={{ base: "5px" }}>
        <Box>
          <Box padding={{ base: "20px 10px", md: "50px 10px" }}>
            <Box>
              <Text
                color="#3f6072"
                fontSize={{ base: "16px", md: "24px" }}
                fontWeight={700}
                textAlign="center"
                mt={20}
              >
                Thank you for answering
                <br />
                the questions!
              </Text>
            </Box>
            <Box>
              <Text
                color="#3f6072"
                fontSize={{ base: "16px" }}
                width={{ base: "280px", md: "300px" }}
                fontWeight={400}
                textAlign="center"
                mt={10}
              >
                {outcome.text}
              </Text>
            </Box>
          </Box>

          {outcome.show_booking_button && (
            <Box p={{ base: "20px " }}>
              <ButtonComponent
                buttonText="Book a Meeting"
                buttonBackgroundColor="#77d2c1"
                buttonColor="#fff"
                showRightIcon={true}
              />
            </Box>
          )}

          <Box mt={"40px"}>
            <Text
              color="#77d2c1"
              fontSize={{ base: "16px" }}
              textDecoration={"underline"}
              fontWeight={500}
              textAlign="center"
              cursor="pointer"
              mt={50}
              p={5}
              onClick={() => navigate("/")}
            >
              Back to the start screen
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OutcomeComponent;
