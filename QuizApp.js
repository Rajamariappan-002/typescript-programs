"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
class MultipleChoiceQuestion {
    constructor(question, options, correctAnswer) {
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }
    displayQuestion() {
        console.log(this.question);
        this.options.forEach((option, index) => {
            console.log(`${index + 1}. ${option}`);
        });
    }
    isCorrect(answer) {
        return answer.toLowerCase() === this.correctAnswer.toLowerCase();
    }
}
class Quiz {
    constructor() {
        this.questions = [];
        this.userAnswers = [];
    }
    addQuestion(question) {
        this.questions.push(question);
    }
    startQuiz() {
        console.log('=== Welcome to the Quiz ===');
        console.log('Answer each question with your best guess. Let\'s begin!\n');
        this.askQuestion(0);
    }
    // Method to ask a question
    askQuestion(index) {
        if (index < this.questions.length) {
            const question = this.questions[index];
            console.log(`Question ${index + 1}: ${question.question}`);
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('Your answer: ', (answer) => {
                this.userAnswers.push(answer);
                // Move to the next question or end the quiz
                rl.close();
                console.log(); // New line for spacing
                this.askQuestion(index + 1);
            });
        }
        else {
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
quiz.addQuestion(new MultipleChoiceQuestion('What is the capital of France?', ['Paris', 'London', 'Berlin', 'Madrid'], 'Paris'));
quiz.addQuestion(new MultipleChoiceQuestion('Which is the largest planet in our solar system?', ['Jupiter', 'Saturn', 'Mars', 'Earth'], 'Jupiter'));
quiz.addQuestion({
    question: 'Who invented the light bulb?',
    correctAnswer: 'Thomas Edison'
});
// Starting the quiz
quiz.startQuiz();
