import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
const customTheme = extendTheme({
  fonts: {
    body: "Montserrat, sans-serif",
    heading: "Montserrat, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={customTheme}>
    <App />
  </ChakraProvider>,
);
