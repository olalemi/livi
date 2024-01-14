import React, { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export interface UserContextType {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  setTotalScore: React.Dispatch<React.SetStateAction<number>>;
  totalScore: number;
  selectedAnswerId: string |null,
  setSelectedAnswerId: React.Dispatch<React.SetStateAction<string|null>>;
}

export const UserContext = createContext<UserContextType>({
  currentQuestionIndex: 0,
  setCurrentQuestionIndex: () => {},
  setTotalScore: () => {},
  totalScore: 0,
  selectedAnswerId:null,
  setSelectedAnswerId: () => {},
});

const UserProvider = ({ children }: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);

  return (
    <UserContext.Provider
      value={{
        currentQuestionIndex,
        setCurrentQuestionIndex,
        totalScore,
        setTotalScore,
        selectedAnswerId,
        setSelectedAnswerId
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
