import { useContext } from "react";
import LeftNavIcon from "../assets/icons/left.svg?react";
import { Box, Flex, Text, Spacer } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../utility/UserProvider";
import { useLocation, useNavigate } from "react-router-dom";
import questionsData from "../data/questions.json";

const RootLayout = () => {
  const { currentQuestionIndex, setCurrentQuestionIndex } =
    useContext(UserContext);


  const location = useLocation();
  const navigate = useNavigate();

  const handleLeftIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (location.pathname === "/question" && currentQuestionIndex === 0) {
      navigate("/");
    } else if (location.pathname === "/outcome") {
      navigate(-1);
    } else if (currentQuestionIndex >= 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const questionLength = questionsData.questions.length;

  let progressionPercentage = (currentQuestionIndex / questionLength) * 100;

  if (location.pathname === "/outcome") {
    progressionPercentage = 100;

  }

 
  return (
    <Flex
      backgroundColor="#77d2c1"
      backgroundSize="cover"
      justifyContent="center"
      alignItems="center"
      padding={{ base: "20px 0px ", md: "100px 0px" }}
      minHeight="100vh"
    >
      <Box backgroundColor="#fff" borderRadius={{ base: "5px" }}>
        <Box>
          <Box>
            <Box>
              <Flex justifyContent={"space-between"} p={"10px"}>
                <Box mt={{ base: "0px", md: "6px" }}>
                  {location.pathname !== "/" && (
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
                <Box>
                  <Text
                    color="#3f6072"
                    fontSize={{ base: "14px", md: "16px" }}
                    mt="3px"
                    fontWeight={700}
                    textAlign="center"
                  >
                    Heartburn Checker
                  </Text>
                </Box>
                <Box>
                  {" "}
                  <Spacer />
                </Box>
              </Flex>

              <Box mt="3px" borderBottom="2px solid #f5f5f5"></Box>
              {location.pathname !== "/" && (
                <Box
                  borderBottom={
                    progressionPercentage > 0 ? "2px solid #77d2c1" : ""
                  }
                  width={`${progressionPercentage}%`}
                  mt="-2px"
                  transition="width 0.3s ease-in-out"
                ></Box>
              )}
            </Box>
          </Box>

          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default RootLayout;
