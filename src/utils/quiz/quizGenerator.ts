import { Question } from '../../types/quiz';

interface QuizConfig {
  totalQuestions: number;
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  questionTypes: ('multiple_choice' | 'true_false')[];
}

export const generateQuiz = (
  questionBank: Question[],
  studentPerformance: number,
  config: QuizConfig
) => {
  // Sort questions by difficulty
  const questionsByDifficulty = {
    easy: questionBank.filter(q => q.difficulty === 'easy'),
    medium: questionBank.filter(q => q.difficulty === 'medium'),
    hard: questionBank.filter(q => q.difficulty === 'hard')
  };

  // Adjust difficulty distribution based on student performance
  let distribution = { ...config.difficultyDistribution };
  if (studentPerformance > 80) {
    distribution.hard += 0.2;
    distribution.easy -= 0.2;
  } else if (studentPerformance < 60) {
    distribution.easy += 0.2;
    distribution.hard -= 0.2;
  }

  // Calculate number of questions for each difficulty
  const questionCounts = {
    easy: Math.round(config.totalQuestions * distribution.easy),
    medium: Math.round(config.totalQuestions * distribution.medium),
    hard: Math.round(config.totalQuestions * distribution.hard)
  };

  // Select questions randomly from each difficulty level
  const selectedQuestions = [
    ...selectRandomQuestions(questionsByDifficulty.easy, questionCounts.easy),
    ...selectRandomQuestions(questionsByDifficulty.medium, questionCounts.medium),
    ...selectRandomQuestions(questionsByDifficulty.hard, questionCounts.hard)
  ];

  // Shuffle the questions
  return shuffleArray(selectedQuestions);
};

const selectRandomQuestions = (questions: Question[], count: number) => {
  const shuffled = shuffleArray([...questions]);
  return shuffled.slice(0, count);
};

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};