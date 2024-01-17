export type Props = {
  children: React.ReactNode;
};

interface Answer {
  id: string;
  label: string;
  score: number;
}

interface NextStep {
  answered?: string;
  next_question?: string;
  max_score?: number;
  outcome?: string;
}

interface Question {
  id: string;
  question_text: string;
  answers: Answer[];
  next: NextStep[];
}

export interface Outcome {
  id: string;
  text: string;
  show_booking_button: boolean;
}

export interface UserContextType {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  setTotalScore: React.Dispatch<React.SetStateAction<number>>;
  totalScore: number;
  selectedAnswerId: string | null;
  setSelectedAnswerId: React.Dispatch<React.SetStateAction<string | null>>;
  handleAnswerClick: (answerId: string) => void;
  currentQuestion: Question | null;
  determineOutcome: (totalScore: number) => Outcome;
  calculateTotalScore: () => void;
  isLastQuestion: boolean;
  navigateToQuestion: (newIndex: number) => void;
}
