import { Box } from "@chakra-ui/react";
import HomePage from "./screens/HomePage";
import RootLayout from "./layouts/RootLayout";
import Question from "./components/QuestionComponent";
import UserProvider from "./utility/UserProvider";
import OutcomeComponent from "./components/OutcomeComponent";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index={true} element={<HomePage />} />
      <Route path="question" element={<Question />} />
      <Route path="outcome" element={<OutcomeComponent />} />
    </Route>,
  ),
);

function App() {
  return (
    <Box>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </Box>
  );
}

export default App;
