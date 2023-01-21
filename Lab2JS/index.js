function Question(Qtext, QNo) {
  this.Qtext = Qtext;
  this.QNo = QNo;
}

const Q1 = new Question("Which company first implemented the JavaScript language?", 1);
const Q2 = new Question("When was the first release of a browser supporting JavaScript?", 2);
const Q3 = new Question("The original name of JavaScript was", 3);
const Q4 = new Question("Which JavaScript version was the first to allow image swapping, or image roll-overs?", 4);
const Q5 = new Question("JavaScript is a", 5);

function Answer(Atext) {
  this.Atext = Atext;
}

const Q1A1 = new Answer("Microsoft Corp.");
const Q1A2 = new Answer("Netscape Corp.");
const Q1A3 = new Answer("Sun Microsystems Corp.");
const Q1A4 = new Answer("All of the above");

const Q2A1 = new Answer("1994");
const Q2A2 = new Answer("1995");
const Q2A3 = new Answer("1996");
const Q2A4 = new Answer("1997");

const Q3A1 = new Answer("JavaScript");
const Q3A2 = new Answer("LiveScript");
const Q3A3 = new Answer("WireScript");
const Q3A4 = new Answer("ECMAScript");

const Q4A1 = new Answer("1.0");
const Q4A2 = new Answer("1.1");
const Q4A3 = new Answer("1.2");
const Q4A4 = new Answer("1.3");

const Q5A1 = new Answer("Development");
const Q5A2 = new Answer("Programming Language");
const Q5A3 = new Answer("Language");
const Q5A4 = new Answer("All");

function QuestionAnswer(questionParam, ansParam, corAnsParam) {

  this.questionParam = questionParam;
  this.ansParam = ansParam;
  this.corAnsParam = corAnsParam;

  this.isItACorrectAnswer = function (selectedAns) {

     if (selectedAns === corAnsParam.Atext) {
        console.log("Correct")
        return true;
     } 
     else {
        console.log("Incorrect")
        return false;
     }
  }
}

const qa1 = new QuestionAnswer(Q1,
  [Q1A1, Q1A2, Q1A3, Q1A4], 
  Q1A2);

const qa2 = new QuestionAnswer(Q2,
  [Q2A1, Q2A2, Q2A3, Q2A4], 
  Q2A2);

const qa3 = new QuestionAnswer(Q3,
  [Q3A1, Q3A2, Q3A3, Q3A4], 
  Q3A2);

const qa4 = new QuestionAnswer(Q4,
  [Q4A1, Q4A2, Q4A3, Q4A4], 
  Q4A2);

const qa5 = new QuestionAnswer(Q5,
  [Q5A1, Q5A2, Q5A3, Q5A4], 
  Q5A2);


function QuizApplication(qaArray) {
  this.qaArray = qaArray;
  this.pageNum = 0;
  this.marks = 0;
  this.init = function () {
     this.initAndDisplayPage();
  }
  this.initAndDisplayPage = function () {
     this.pageNum = 0;
     this.attachListeners();
     this.displayQuizPage();
  }
  this.initAndDisplayNextPage = function () {
     this.pageNum++;
     this.attachListeners();
     this.displayQuizPage();
  }
  this.attachListeners = function () {
     const questionAnswerObj = qaArray[this.pageNum];
     const currentQuizApplicationObj = this;
     for (let index = 0; index < questionAnswerObj.ansParam.length; index++) {
        let buttonId = "btn" + index;
        const answerChoiceHtmlButtonElement = document.getElementById(buttonId);
        answerChoiceHtmlButtonElement.onclick = function (event) {
           const currentTarget = event.currentTarget;
           const selectedAns = currentTarget.children[0].innerHTML;;
           const result = questionAnswerObj.isItACorrectAnswer(selectedAns);
           if (result) {
              currentQuizApplicationObj.incrementScore()
           }
           currentQuizApplicationObj.next();
        }
     }
  }

  this.incrementScore = function () {
     this.marks++;
  }
  this.next = function () {

     if (this.isThisTheLastQuestion()) {
        this.displayResultPage();
     } else {
        this.initAndDisplayNextPage();
     }
  }
  this.isThisTheLastQuestion = function () {

     if (this.pageNum === this.qaArray.length - 1) {
        return true;
     } else {
        return false;
     }
  }
  this.displayQuizPage = function () {
     this.displayQASection();
     this.displayQuestionProgressSection();
  }
  this.displayQASection = function () {
     const questionAnswerObj = qaArray[this.pageNum];
     const Qtext = questionAnswerObj.questionParam.Qtext;
     const questionHtmlElement = document.getElementById("question");
     questionHtmlElement.innerHTML = Qtext;
     const ansParam = questionAnswerObj.ansParam;
     for (let index = 0; index < ansParam.length; index++) {
        let answerChoiceHtmlElementName = "choice" + index;
        const answerObj = ansParam[index];
        const answerChoiceHtmlElement = document.getElementById(answerChoiceHtmlElementName);
        answerChoiceHtmlElement.innerHTML = answerObj.Atext;
     }
  }

  this.displayQuestionProgressSection = function () {
     const questionAnswerObj = qaArray[this.pageNum];
     const QNo = questionAnswerObj.questionParam.QNo;
     const totalNoOfQuestions = qaArray.length;
     let progressText = `Question ${QNo} of ${totalNoOfQuestions}`;
     const progressHtmlElement = document.getElementById("progress");
     progressHtmlElement.innerHTML = progressText;
  }

  this.displayResultPage = function () {
     const percentage = (this.marks / this.qaArray.length) * 100;
     const resultPageContent = `
       <h1>Quiz Result</h1>
       <h3 id='marks'> 
       Your score is: ${this.marks}. Your Percentage is: ${percentage}
       </h3>
       `
     const quizHtmlElement = document.getElementById("quiz");
     quizHtmlElement.innerHTML = resultPageContent;
  }
}

const quizApplication = new QuizApplication(
  [qa1, qa2, qa3, qa4, qa5]
);
quizApplication.init();