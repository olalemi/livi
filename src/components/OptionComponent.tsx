import { Box, Button } from "@chakra-ui/react";
import {Props} from "../interfaces/OptionComponent/IOptionComponent"


const OptionComponent = ({ buttonText, isSelected, onClick }: Props) => {
  return (
    <Box>
      <Button
        onClick={onClick}
        style={{
          backgroundColor: isSelected ? "#77d2c1" : "#fff",
          color: isSelected ? "#fff" : "#77d2c1",
          borderRadius: "50px",
          border: "1px solid #e9ecf0",
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default OptionComponent;
