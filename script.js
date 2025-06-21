// 効果音を読み込む
const correctSound = new Audio('correct.mp3'); // 正解音のファイル名
const incorrectSound = new Audio('incorrect.mp3'); // 不正解音のファイル名

const quizData = [
    // ... (前回作成した30問のクイズデータ) ...
];

const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const feedbackAreaEl = document.getElementById('feedback-area');
const nextBtn = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const scoreTextEl = document.getElementById('score-text');
const resultMessageEl = document.getElementById('result-message');

let currentQuestionIndex = 0;
let score = 0;

function loadQuiz() {
    feedbackAreaEl.style.display = 'none';
    nextBtn.style.display = 'none';
    const currentQuizData = quizData[currentQuestionIndex];
    questionNumberEl.innerText = `問題 ${currentQuestionIndex + 1} / ${quizData.length}`;
    questionTextEl.innerText = currentQuizData.question;
    optionsContainerEl.innerHTML = '';
    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', () => selectOption(index));
        optionsContainerEl.appendChild(button);
    });
}

function selectOption(selectedIndex) {
    const currentQuizData = quizData[currentQuestionIndex];
    const correctIndex = currentQuizData.answer;

    Array.from(optionsContainerEl.children).forEach((button, index) => {
        if (index === correctIndex) {
            button.classList.add('correct');
        } else if (index === selectedIndex) {
            button.classList.add('incorrect');
        }
        button.disabled = true;
    });

    if (selectedIndex === correctIndex) {
        score++;
        correctSound.play(); // 正解音を鳴らす
        feedbackAreaEl.innerHTML = `<strong>正解！</strong><br>${currentQuizData.explanation}`;
        feedbackAreaEl.className = 'feedback-area correct';
    } else {
        incorrectSound.play(); // 不正解音を鳴らす
        feedbackAreaEl.innerHTML = `<strong>不正解...</strong><br>${currentQuizData.explanation}`;
        feedbackAreaEl.className = 'feedback-area incorrect';
    }

    feedbackAreaEl.style.display = 'block';
    nextBtn.style.display = 'block';
}

function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreTextEl.innerText = `${quizData.length}問中 ${score}問 正解！`;
    let message = '';
    const percentage = (score / quizData.length) * 100;
    if (percentage === 100) {
        message = '完璧です！全問正解！自信を持って試験に臨んでください！';
    } else if (percentage >= 80) {
        message = '素晴らしい成績です。合格圏内です。間違えた数問を完璧にすれば、もう安心です。';
    } else if (percentage >= 60) {
        message = 'おしい！合格ラインは目前です。特に間違えた分野の解説を重点的に復習しましょう。';
    } else {
        message = '基礎からじっくり復習が必要です。解説を何度も読み返し、知識の土台を固めましょう。';
    }
    resultMessageEl.innerText = message;
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuiz();
    } else {
        showResult();
    }
});

// 最初のクイズを読み込む
loadQuiz();