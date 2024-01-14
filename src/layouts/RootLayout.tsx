import { useContext } from "react";
import LeftNavIcon from "../assets/icons/left.svg?react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import questionsData from "../data/questions.json";
import { UserContext } from "../utility/UserProvider";
import { useLocation, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const { currentQuestionIndex, setCurrentQuestionIndex, selectedAnswerId } =
    useContext(UserContext);

  const questionLength = questionsData.questions.length;

  const progressionPercentage = (currentQuestionIndex / questionLength) * 100;

  const location = useLocation();
  const navigate = useNavigate();

  const handleLeftIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (location.pathname === "/question" && currentQuestionIndex === 0) {
      navigate("/");
    } else if (selectedAnswerId && currentQuestionIndex >= 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }

  };



  

  return (
    <Flex
      backgroundColor="#77d2c1"
      backgroundSize="cover"
      justifyContent="center"
      alignItems="center"
      padding={{ base: "20px 100px ", md: "100px 0px" }}
      minHeight="100vh"
    >
      <Box backgroundColor="#fff" borderRadius={{ base: "5px" }}>
        <Box>
          <Box>
            <Box>
              <Flex>
                <Box mt={"15px"} ml={"8px"}>
                  {location.pathname === "/question" && (
                    <Box>
                      <LeftNavIcon
                        style={{
                          color: "#77d2c1",
                          width: "20",
                          height: "20",
                          cursor: "pointer",
                        }}
                        onClick={handleLeftIconClick}
                      />
                    </Box>
                  )}
                </Box>
                <Text
                  color="#3f6072"
                  fontSize={{ base: "10px", md: "16px" }}
                  padding={{ base: "10px 100px" }}
                  fontWeight={700}
                  textAlign="center"
                >
                  Heartburn Checker
                </Text>
              </Flex>
              <Box borderBottom="2px solid #f5f5f5">
                {location.pathname === "/question" && (
                  <Box
                    borderBottom={
                      progressionPercentage > 0 ? "2px solid #77d2c1" : ""
                    }
                    width={`${progressionPercentage}%`}
                    transition="width 0.3s ease-in-out"
                  ></Box>
                )}
              </Box>
            </Box>
          </Box>

          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default RootLayout;
