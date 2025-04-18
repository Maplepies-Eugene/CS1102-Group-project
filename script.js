const questions = [
    {
        question: "What is the primary purpose of Multi-Factor Authentication (MFA) in e-banking?",
        answers: [
            {text: "To speed up login processes.", correct: false},
            {text: "To replace passwords entirely.", correct: false},
            {text: "To reduce the risk of unauthorized access by requiring multiple verification steps.", correct: true},
            {text: "To share login credentials securely.", correct: false},
        ]
    },
    {
        question: "Which of the following is an example of a phishing attack?",
        answers: [
            {text: "A bank employee resetting your password.", correct: false},
            {text: "A software update notification from your operating system.", correct: false},
            {text: "A phone call from a known friend.", correct: false},
            {text: "An email pretending to be your bank asking for your login details.", correct: true},
        ] 
    },
    {
        question: "What does SSL/TLS encryption protect in e-banking?",
        answers: [
            {text: "Only the bank’s physical servers.", correct: false},
            {text: "The user’s mobile device hardware.", correct: false},
            {text: "Data transmitted between the user and the bank’s website.", correct: true},
            {text: "Paper bank statements.", correct: false},
        ] 
    },
    {
        question: "Which malware type locks a victim’s computer and demands payment to restore access?",
        answers: [
            {text: "Virus", correct: false},
            {text: "Worm", correct: false},
            {text: "Botnet", correct: false},
            {text: "Ransomware", correct: true},
        ] 
    },
    {
        question: "Why is cybersecurity critical for e-banking?",
        answers: [
            {text: "To increase transaction fees.", correct: false},
            {text: "To protect customer data, maintain trust, and comply with regulations.", correct: true},
            {text: "To slow down online transactions.", correct: false},
            {text: "To reduce the number of bank branches.", correct: false},
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
