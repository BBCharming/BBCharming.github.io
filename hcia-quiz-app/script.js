// HCIA Quiz Application - Fixed Buttons Version
const quizState = {
    currentScreen: 'mainMenu',
    questions: [],
    currentQuestions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    quizType: '',
    selectedChapter: null,
    progress: JSON.parse(localStorage.getItem('hciaQuizProgress')) || {}
};

const chapters = [
    { id: 1, name: "Data Communication Network Basis" },
    { id: 2, name: "Network Reference Model" },
    { id: 3, name: "Huawei VRP" },
    { id: 4, name: "Network Layer Protocols and IP Addressing" },
    { id: 5, name: "IP Routing Basics" },
    { id: 6, name: "OSPF Basics" },
    { id: 7, name: "Ethernet Switching Basics" },
    { id: 8, name: "VLAN Principles and Configuration" },
    { id: 9, name: "STP Principles and Configuration" },
    { id: 10, name: "Inter-VLAN Communication" },
    { id: 11, name: "Eth-Trunk iStack and CSS" },
    { id: 12, name: "ACL Principles and Configuration" },
    { id: 13, name: "AAA Principles and Configuration" },
    { id: 14, name: "Network Address Translation" },
    { id: 15, name: "Network Services and Applications" },
    { id: 16, name: "WLAN Overview" },
    { id: 17, name: "WAN Technologies" },
    { id: 18, name: "Network Management and OM" },
    { id: 19, name: "IPv6 Basics" },
    { id: 20, name: "Introduction to SDN and NFV" },
    { id: 21, name: "Network Programmability and Automation" },
    { id: 22, name: "Typical Campus Network Architectures and Practices" }
];

// Initialize the application
function initApp() {
    loadQuestions();
    renderChapters();
    updateProgress();
    showScreen('mainMenu');
    console.log('✅ Quiz app initialized');
}

function loadQuestions() {
    try {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                quizState.questions = data.questions;
                console.log(`✅ Loaded ${quizState.questions.length} questions`);
            })
            .catch(error => {
                console.log('Using fallback questions');
                quizState.questions = getFallbackQuestions();
            });
    } catch (error) {
        console.log('Using fallback questions');
        quizState.questions = getFallbackQuestions();
    }
}

// FIXED: Screen navigation
function showScreen(screenId) {
    console.log('🔄 Switching to screen:', screenId);
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        quizState.currentScreen = screenId;
    } else {
        console.error('❌ Screen not found:', screenId);
    }
}

function showMainMenu() {
    showScreen('mainMenu');
    updateProgress();
}

function showChapterSelection() {
    showScreen('chapterSelection');
}

// FIXED: Render chapters
function renderChapters() {
    const chaptersGrid = document.getElementById('chaptersGrid');
    if (chaptersGrid) {
        chaptersGrid.innerHTML = chapters.map(chapter => `
            <div class="chapter-card" onclick="selectChapter(${chapter.id})">
                <div class="chapter-number">${chapter.id}</div>
                <div class="chapter-name">${chapter.name}</div>
            </div>
        `).join('');
    }
}

// FIXED: Chapter selection
function selectChapter(chapterId) {
    console.log('📖 Selected chapter:', chapterId);
    quizState.selectedChapter = chapterId;
    const chapter = chapters.find(c => c.id === chapterId);
    document.getElementById('settingsTitle').textContent = `${chapter.name} - Quiz Settings`;
    showScreen('quizSettings');
}

// FIXED: Button functions - THESE ARE THE MAIN FIXES!
function startChapterQuiz() {
    console.log('🎯 Chapter Quiz button clicked');
    quizState.quizType = 'chapter';
    showChapterSelection();
}

function startRandomQuiz() {
    console.log('🎲 Random Quiz button clicked');
    quizState.quizType = 'random';
    document.getElementById('settingsTitle').textContent = 'Random Quiz Settings';
    showScreen('quizSettings');
}

function startExam() {
    console.log('⚡ Final Exam button clicked');
    quizState.quizType = 'exam';
    document.getElementById('settingsTitle').textContent = 'Final Exam Settings';
    document.getElementById('questionCount').value = '20';
    showScreen('quizSettings');
}

function startQuiz() {
    console.log('🚀 Starting quiz:', quizState.quizType);
    const questionCount = parseInt(document.getElementById('questionCount').value);
    
    let availableQuestions = [];
    
    if (quizState.quizType === 'chapter' && quizState.selectedChapter) {
        availableQuestions = quizState.questions.filter(q => q.chapter === quizState.selectedChapter);
    } else {
        availableQuestions = [...quizState.questions];
    }
    
    if (availableQuestions.length === 0) {
        availableQuestions = getFallbackQuestions();
    }
    
    const actualCount = Math.min(questionCount, availableQuestions.length);
    quizState.currentQuestions = availableQuestions.slice(0, actualCount);
    quizState.currentQuestionIndex = 0;
    quizState.userAnswers = new Array(quizState.currentQuestions.length).fill(null);
    
    console.log(`📝 Starting quiz with ${quizState.currentQuestions.length} questions`);
    showScreen('quizScreen');
    displayCurrentQuestion();
}

// [Include other essential functions...]
function displayCurrentQuestion() {
    if (quizState.currentQuestions.length === 0) {
        showResults();
        return;
    }
    
    const question = quizState.currentQuestions[quizState.currentQuestionIndex];
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('questionCounter').textContent = 
        `${quizState.currentQuestionIndex + 1}/${quizState.currentQuestions.length}`;
    
    // Display options
    const optionsContainer = document.getElementById('optionsContainer');
    if (question.type === 'true_false') {
        optionsContainer.innerHTML = `
            <div class="option" onclick="selectOption('True')">A) True</div>
            <div class="option" onclick="selectOption('False')">B) False</div>
        `;
    } else if (question.type === 'single_choice') {
        optionsContainer.innerHTML = question.options.map((option, index) => `
            <div class="option" onclick="selectOption('${String.fromCharCode(65 + index)}')">
                ${String.fromCharCode(65 + index)}) ${option}
            </div>
        `).join('');
    }
    
    // Restore selection
    const previousAnswer = quizState.userAnswers[quizState.currentQuestionIndex];
    if (previousAnswer) {
        highlightSelectedOption(previousAnswer);
    }
}

function selectOption(selectedAnswer) {
    quizState.userAnswers[quizState.currentQuestionIndex] = selectedAnswer;
    highlightSelectedOption(selectedAnswer);
}

function highlightSelectedOption(selectedAnswer) {
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    
    const options = document.querySelectorAll('.option');
    if (selectedAnswer === 'True' || selectedAnswer === 'False') {
        const optionIndex = selectedAnswer === 'True' ? 0 : 1;
        options[optionIndex].classList.add('selected');
    } else {
        const optionIndex = selectedAnswer.charCodeAt(0) - 65;
        options[optionIndex].classList.add('selected');
    }
}

function nextQuestion() {
    if (quizState.currentQuestionIndex < quizState.currentQuestions.length - 1) {
        quizState.currentQuestionIndex++;
        displayCurrentQuestion();
    }
}

function previousQuestion() {
    if (quizState.currentQuestionIndex > 0) {
        quizState.currentQuestionIndex--;
        displayCurrentQuestion();
    }
}

function showResults() {
    const score = calculateScore();
    const totalQuestions = quizState.currentQuestions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    document.getElementById('finalScore').textContent = `${score}/${totalQuestions}`;
    document.getElementById('scorePercentage').textContent = `${percentage}%`;
    document.getElementById('resultsMessage').textContent = getResultsMessage(percentage);
    
    showScreen('resultsScreen');
}

function calculateScore() {
    return quizState.currentQuestions.reduce((score, question, index) => {
        return score + (isAnswerCorrect(question, quizState.userAnswers[index]) ? 1 : 0);
    }, 0);
}

function isAnswerCorrect(question, userAnswer) {
    if (!userAnswer) return false;
    return userAnswer === question.correct_answer;
}

function getResultsMessage(percentage) {
    if (percentage >= 90) return "🎉 Excellent!";
    if (percentage >= 80) return "👍 Great job!";
    if (percentage >= 70) return "💪 Good work!";
    return "📖 Keep studying!";
}

function retryQuiz() {
    startQuiz();
}

function updateProgress() {
    const progressText = document.getElementById('progressText');
    const progressFill = document.getElementById('progressFill');
    if (progressText && progressFill) {
        progressText.textContent = '0% Complete';
        progressFill.style.width = '0%';
    }
}

function getFallbackQuestions() {
    return [
        {
            "id": 1,
            "chapter": 1,
            "question": "Making a call on a landline telephone is a type of network communication.",
            "type": "true_false",
            "correct_answer": "True",
            "explanation": "Traditional telephone systems are a form of network communication.",
            "difficulty": "easy"
        },
        {
            "id": 2, 
            "chapter": 1,
            "question": "A gateway must be configured for communication between hosts.",
            "type": "true_false",
            "correct_answer": "False",
            "explanation": "Gateways are only needed for different networks.",
            "difficulty": "medium"
        }
    ];
}

// Initialize app
document.addEventListener('DOMContentLoaded', initApp);
