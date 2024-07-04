import * as readline from 'readline';

interface Question {
  question: string;
  correctAnswer: string;
}


class MultipleChoiceQuestion implements Question {
  constructor(public question: string, public options: string[], public correctAnswer: string) {}


  displayQuestion() {
    console.log(this.question);
    this.options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });
  }

  isCorrect(answer: string) {
    return answer.toLowerCase() === this.correctAnswer.toLowerCase();
  }
}


class Quiz {
  private questions: Question[] = [];
  private userAnswers: string[] = [];

  addQuestion(question: Question) {
    this.questions.push(question);
  }


  startQuiz() {
    console.log('=== Welcome to the Quiz ===');
    console.log('Answer each question with your best guess. Let\'s begin!\n');
    this.askQuestion(0);
  }

  // Method to ask a question
  askQuestion(index: number) {
    if (index < this.questions.length) {
      const question = this.questions[index];
      console.log(`Question ${index + 1}: ${question.question}`);

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      rl.question('Your answer: ', (answer: string) => {
        this.userAnswers.push(answer);

        // Move to the next question or end the quiz
        rl.close();
        console.log(); // New line for spacing

        this.askQuestion(index + 1);
      });
    } else {
      // End of quiz, calculate and display results
      this.gradeQuiz();
    }
  }

  // Method to grade the quiz
  gradeQuiz() {
    console.log('=== Quiz Results ===');
    let score = 0;
    this.questions.forEach((question, index) => {
      const userAnswer = this.userAnswers[index];
      const isCorrect = question instanceof MultipleChoiceQuestion
        ? question.isCorrect(userAnswer)
        : userAnswer.toLowerCase() === question.correctAnswer.toLowerCase();

      console.log(`Question ${index + 1}: ${question.question}`);
      console.log(`Your answer: ${userAnswer}`);
      console.log(`Correct answer: ${question.correctAnswer}`);
      console.log(`Result: ${isCorrect ? 'Correct' : 'Incorrect'}`);
      console.log(); // New line for spacing

      if (isCorrect) {
        score++;
      }
    });

    console.log(`Your total score: ${score} out of ${this.questions.length}`);
  }
}


const quiz = new Quiz();


quiz.addQuestion(new MultipleChoiceQuestion(
  'What is the capital of France?',
  ['Paris', 'London', 'Berlin', 'Madrid'],
  'Paris'
));

quiz.addQuestion(new MultipleChoiceQuestion(
  'Which is the largest planet in our solar system?',
  ['Jupiter', 'Saturn', 'Mars', 'Earth'],
  'Jupiter'
));

quiz.addQuestion({
  question: 'Who invented the light bulb?',
  correctAnswer: 'Thomas Edison'
});

// Starting the quiz
quiz.startQuiz();
