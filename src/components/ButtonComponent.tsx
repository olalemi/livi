import React, { useContext } from "react";
import RightNavIcon from "../assets/icons/right.svg?react";
import { Box, Button, Spacer } from "@chakra-ui/react";
import { UserContext } from "../utility/UserProvider";

type Props = {
  buttonText: string;
  buttonBackgroundColor: string;
  buttonColor: string;
  showRightIcon?: boolean;
  showLeftIcon?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onRightIconClick?: () => void;
};

const ButtonComponent = ({
  buttonText,
  buttonColor,
  buttonBackgroundColor,
  showRightIcon = false,
  onClick,
}: Props) => {
  const { currentQuestionIndex, setCurrentQuestionIndex, selectedAnswerId,setSelectedAnswerId } =
    useContext(UserContext);

  const handleRightIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    
    if (selectedAnswerId && currentQuestionIndex >= 0) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    setSelectedAnswerId(null);
   
  };

 

  return (
    <Box>
      <Button
        type="submit"
        rightIcon={showRightIcon ? (<RightNavIcon  onClick={handleRightIconClick} style={{ color:selectedAnswerId ? "#fff": "#3f6072"   }}  />) : (  <Spacer /> )  }
        leftIcon={  ( <Spacer /> ) }
        fontSize={{ base: "16px", md: "18px" }}
        width={{ base: "100%" }}
        flexGrow={1}
        justifyContent={"space-between"}
        backgroundColor={buttonBackgroundColor}
        color= {buttonColor}
        gap="40px"
        borderRadius="5px"
        height="40px"
        padding="10px"
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default ButtonComponent;
