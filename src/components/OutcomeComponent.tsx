

import { Box, Text } from "@chakra-ui/react";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigate } from "react-router-dom";

const OutcomeComponent = () => {
  const navigate = useNavigate();




   
    
  



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
                Thank you for answering<br />
                the questions!
              </Text>
            </Box>
          </>

          <Box
            p={{ base: "20px " }}
            mt={40}
            onClick={() => navigate("/question")}
          >
            <ButtonComponent
              buttonText="Book a Meeting"
              buttonBackgroundColor="#77d2c1"
              buttonColor="#fff"
              showRightIcon={true}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OutcomeComponent;
