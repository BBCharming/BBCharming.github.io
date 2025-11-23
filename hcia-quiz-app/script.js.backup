// HCIA Quiz Application - Enhanced Version
const quizState = {
    currentScreen: 'mainMenu',
    questions: [],
    currentQuestions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    quizType: '',
    selectedChapter: null,
    progress: JSON.parse(localStorage.getItem('hciaQuizProgress')) || {},
    settings: JSON.parse(localStorage.getItem('hciaQuizSettings')) || {
        soundEnabled: true,
        animationEnabled: true
    }
};

// HCIA Datacom Chapters
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
    setupEventListeners();
}

function setupEventListeners() {
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            showMainMenu();
        }
    });
}

// Load questions
function loadQuestions() {
    try {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                quizState.questions = data.questions;
                console.log(`✅ Loaded ${quizState.questions.length} questions`);
                updateQuestionCounts();
            })
            .catch(error => {
                console.log('Using fallback questions');
                quizState.questions = getFallbackQuestions();
                updateQuestionCounts();
            });
    } catch (error) {
        console.log('Using fallback questions');
        quizState.questions = getFallbackQuestions();
        updateQuestionCounts();
    }
}

function updateQuestionCounts() {
    // Update UI with question counts
    const chapterCounts = {};
    chapters.forEach(chapter => {
        const count = quizState.questions.filter(q => q.chapter === chapter.id).length;
        chapterCounts[chapter.id] = count;
    });
    
    // Update chapter cards with question counts
    setTimeout(() => {
        document.querySelectorAll('.chapter-card').forEach(card => {
            const chapterId = parseInt(card.getAttribute('data-chapter-id'));
            const count = chapterCounts[chapterId] || 0;
            const countElement = card.querySelector('.question-count') || document.createElement('div');
            if (!card.querySelector('.question-count')) {
                countElement.className = 'question-count';
                card.appendChild(countElement);
            }
            countElement.textContent = `${count} questions`;
            countElement.style.color = count > 0 ? '#00d4ff' : '#64748b';
            countElement.style.fontSize = '11px';
            countElement.style.marginTop = '5px';
        });
    }, 100);
}

// [Rest of the functions remain the same as previous version, but with enhanced error handling]
// ... (include all the previous functions from script.js)

// Enhanced question filtering for better distribution
function startQuiz() {
    const questionCount = parseInt(document.getElementById('questionCount').value);
    
    let availableQuestions = [];
    
    if (quizState.quizType === 'chapter') {
        availableQuestions = quizState.questions.filter(q => q.chapter === quizState.selectedChapter);
    } else if (quizState.quizType === 'random') {
        availableQuestions = [...quizState.questions];
    } else if (quizState.quizType === 'exam') {
        availableQuestions = [...quizState.questions];
    }
    
    if (availableQuestions.length === 0) {
        alert('No questions available for this selection. Using fallback questions.');
        availableQuestions = getFallbackQuestions();
    }
    
    // Ensure we don't request more questions than available
    const actualCount = Math.min(questionCount, availableQuestions.length);
    
    quizState.currentQuestions = availableQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, actualCount);
    
    quizState.currentQuestionIndex = 0;
    quizState.userAnswers = new Array(quizState.currentQuestions.length).fill(null);
    
    showScreen('quizScreen');
    displayCurrentQuestion();
}

// Enhanced results with detailed statistics
function showResults() {
    const score = calculateScore();
    const totalQuestions = quizState.currentQuestions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Calculate chapter performance if it's a chapter quiz
    let chapterStats = '';
    if (quizState.quizType === 'chapter' && quizState.selectedChapter) {
        const chapter = chapters.find(c => c.id === quizState.selectedChapter);
        chapterStats = `<div class="chapter-stats">Chapter ${quizState.selectedChapter}: ${chapter?.name || 'Unknown'}</div>`;
    }
    
    document.getElementById('finalScore').textContent = `${score}/${totalQuestions}`;
    document.getElementById('scorePercentage').textContent = `${percentage}%`;
    document.getElementById('resultsMessage').innerHTML = getResultsMessage(percentage) + chapterStats;
    
    // Build enhanced results list
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = quizState.currentQuestions.map((question, index) => {
        const userAnswer = quizState.userAnswers[index];
        const isCorrect = isAnswerCorrect(question, userAnswer);
        const correctAnswer = getCorrectAnswerText(question);
        const chapter = chapters.find(c => c.id === question.chapter);
        
        return `
            <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                <strong>Q${index + 1} (Ch. ${question.chapter}): ${question.question}</strong>
                <div class="answer-comparison">
                    <span class="user-answer">Your answer: ${userAnswer || 'Not answered'}</span>
                    <span class="correct-answer">Correct: ${correctAnswer}</span>
                </div>
                ${!isCorrect && question.explanation ? `<div class="explanation">💡 ${question.explanation}</div>` : ''}
                <div class="question-meta">
                    <span class="difficulty ${question.difficulty}">${question.difficulty}</span>
                    <span class="chapter">Chapter ${question.chapter}: ${chapter?.name || 'Unknown'}</span>
                </div>
            </div>
        `;
    }).join('');
    
    // Update progress
    updateUserProgress(score, totalQuestions);
    showScreen('resultsScreen');
}

// [Include all other functions from the previous script.js version]

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', initApp);
