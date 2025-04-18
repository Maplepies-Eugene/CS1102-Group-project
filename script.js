const questions = [
    {
        question: "What is the primary purpose of Multi-Factor Authentication (MFA) in e-banking?",
        answers: [
            {text: "User preferences only", correct: false},
            {text: "Ratings", correct: false},
            {text: "User preferences and relevance", correct: true},
            {text: "Relevance only", correct: false},
        ]
    },
    {
        question: "What is the purpose of researchers and analysts use sorting methods to organize and process large datasets?",
        answers: [
            {text: "Generate reports", correct: false},
            {text: "Tracking of orders for shipment", correct: false},
            {text: "Determine the most effective path", correct: false},
            {text: "Perform pattern identification and statistical analysis", correct: true},
        ] 
    },
    {
        question: "Which storage device is used in external sorting?",
        answers: [
            {text: "RAM only", correct: false},
            {text: "Hard Disk only", correct: false},
            {text: "Both Hard Disk and RAM", correct: true},
            {text: "Cache memory", correct: false},
        ] 
    },
    {
        question: "What is out-of-place sorting?",
        answers: [
            {text: "The sorting algorithm uses secondary memory for sorting", correct: false},
            {text: "The sorting algorithm uses the main memory for sorting", correct: false},
            {text: "The sorting algorithm uses no extra memory except the array for sorting", correct: false},
            {text: "The sorting algorithm uses extra memory for sorting", correct: true},
        ] 
    },
    {
        question: "What is the purpose of using external algorithms in sorting?",
        answers: [
            {text: "To minimize time complexity", correct: false},
            {text: "To manage extensive data sets that exceed the capacity of the main memory", correct: true},
            {text: "To maintain stability during the sorting process", correct: false},
            {text: "To reduce comparisons", correct: false},
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Home";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function gohome()
{
window.history.back();
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        gohome()
    }
})


startQuiz();
