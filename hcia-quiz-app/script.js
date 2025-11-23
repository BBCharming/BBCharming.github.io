// HCIA Quiz Application
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
}

// Load questions
function loadQuestions() {
    try {
        // Try to load from data.json first
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                quizState.questions = data.questions;
                console.log(`Loaded ${quizState.questions.length} questions from data.json`);
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

// Screen navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    quizState.currentScreen = screenId;
}

function showMainMenu() {
    showScreen('mainMenu');
    updateProgress();
}

function showChapterSelection() {
    showScreen('chapterSelection');
}

// Render chapters grid
function renderChapters() {
    const chaptersGrid = document.getElementById('chaptersGrid');
    
    const chapterHTML = chapters.map(chapter => {
        const chapterProgress = quizState.progress[chapter.id] || [];
        const bestScore = chapterProgress.length > 0 ? 
            Math.max(...chapterProgress.map(attempt => attempt.percentage)) : 0;
        
        return `
            <div class="chapter-card" onclick="selectChapter(${chapter.id})">
                <div class="chapter-number">${chapter.id}</div>
                <div class="chapter-name">${chapter.name}</div>
                ${bestScore > 0 ? `<div class="chapter-progress" style="color: ${getScoreColor(bestScore)}; margin-top: 8px; font-size: 12px;">
                    Best: ${bestScore}%
                </div>` : ''}
            </div>
        `;
    }).join('');
    
    chaptersGrid.innerHTML = chapterHTML;
}

function getScoreColor(percentage) {
    if (percentage >= 90) return '#00ff88';
    if (percentage >= 80) return '#00d4ff';
    if (percentage >= 70) return '#ffaa00';
    return '#ff4444';
}

// Chapter selection
function selectChapter(chapterId) {
    quizState.selectedChapter = chapterId;
    const chapter = chapters.find(c => c.id === chapterId);
    document.getElementById('settingsTitle').textContent = `${chapter.name} - Quiz Settings`;
    showScreen('quizSettings');
}

// Quiz initialization
function startChapterQuiz() {
    quizState.quizType = 'chapter';
    showChapterSelection();
}

function startRandomQuiz() {
    quizState.quizType = 'random';
    document.getElementById('settingsTitle').textContent = 'Random Quiz Settings';
    showScreen('quizSettings');
}

function startExam() {
    quizState.quizType = 'exam';
    document.getElementById('settingsTitle').textContent = 'Final Exam Settings';
    document.getElementById('questionCount').value = '20';
    showScreen('quizSettings');
}

function startQuiz() {
    const questionCount = parseInt(document.getElementById('questionCount').value);
    
    // Filter questions based on quiz type
    if (quizState.quizType === 'chapter') {
        quizState.currentQuestions = quizState.questions
            .filter(q => q.chapter === quizState.selectedChapter)
            .sort(() => Math.random() - 0.5)
            .slice(0, questionCount);
    } else if (quizState.quizType === 'random') {
        quizState.currentQuestions = [...quizState.questions]
            .sort(() => Math.random() - 0.5)
            .slice(0, questionCount);
    } else if (quizState.quizType === 'exam') {
        quizState.currentQuestions = [...quizState.questions]
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.min(questionCount, 50));
    }
    
    if (quizState.currentQuestions.length === 0) {
        alert('No questions available for this selection. Using fallback questions.');
        quizState.currentQuestions = getFallbackQuestions().slice(0, questionCount);
    }
    
    quizState.currentQuestionIndex = 0;
    quizState.userAnswers = new Array(quizState.currentQuestions.length).fill(null);
    
    showScreen('quizScreen');
    displayCurrentQuestion();
}

// Question display
function displayCurrentQuestion() {
    if (quizState.currentQuestions.length === 0) {
        showResults();
        return;
    }
    
    const question = quizState.currentQuestions[quizState.currentQuestionIndex];
    const totalQuestions = quizState.currentQuestions.length;
    
    // Update header
    document.getElementById('quizType').textContent = getQuizTypeName();
    document.getElementById('questionCounter').textContent = 
        `${quizState.currentQuestionIndex + 1}/${totalQuestions}`;
    
    // Update progress bar
    const progressPercent = ((quizState.currentQuestionIndex) / totalQuestions) * 100;
    document.getElementById('quizProgress').style.width = `${progressPercent}%`;
    
    // Display question
    document.getElementById('questionText').textContent = question.question;
    
    // Display options
    const optionsContainer = document.getElementById('optionsContainer');
    let optionsHTML = '';
    
    if (question.type === 'true_false') {
        optionsHTML = `
            <div class="option" onclick="selectOption('True')">A) True</div>
            <div class="option" onclick="selectOption('False')">B) False</div>
        `;
    } else if (question.type === 'single_choice') {
        optionsHTML = question.options.map((option, index) => `
            <div class="option" onclick="selectOption('${String.fromCharCode(65 + index)}')">
                ${String.fromCharCode(65 + index)}) ${option}
            </div>
        `).join('');
    }
    
    optionsContainer.innerHTML = optionsHTML;
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = quizState.currentQuestionIndex === 0;
    document.getElementById('nextBtn').classList.toggle('hidden', 
        quizState.currentQuestionIndex === totalQuestions - 1);
    document.getElementById('finishBtn').classList.toggle('hidden', 
        quizState.currentQuestionIndex !== totalQuestions - 1);
    
    // Restore previous selection
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
    
    if (selectedAnswer === 'True' || selectedAnswer === 'False') {
        const optionIndex = selectedAnswer === 'True' ? 0 : 1;
        document.querySelectorAll('.option')[optionIndex].classList.add('selected');
    } else {
        const optionIndex = selectedAnswer.charCodeAt(0) - 65;
        document.querySelectorAll('.option')[optionIndex].classList.add('selected');
    }
}

// Navigation
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

// Results
function showResults() {
    const score = calculateScore();
    const totalQuestions = quizState.currentQuestions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    document.getElementById('finalScore').textContent = `${score}/${totalQuestions}`;
    document.getElementById('scorePercentage').textContent = `${percentage}%`;
    document.getElementById('resultsMessage').textContent = getResultsMessage(percentage);
    
    // Build results list
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = quizState.currentQuestions.map((question, index) => {
        const userAnswer = quizState.userAnswers[index];
        const isCorrect = isAnswerCorrect(question, userAnswer);
        const correctAnswer = getCorrectAnswerText(question);
        
        return `
            <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                <strong>Q${index + 1}: ${question.question}</strong>
                <div>Your answer: ${userAnswer || 'Not answered'}</div>
                <div>Correct answer: ${correctAnswer}</div>
                ${!isCorrect && question.explanation ? `<div class="explanation">${question.explanation}</div>` : ''}
            </div>
        `;
    }).join('');
    
    // Update progress
    updateUserProgress(score, totalQuestions);
    showScreen('resultsScreen');
}

function calculateScore() {
    return quizState.currentQuestions.reduce((score, question, index) => {
        return score + (isAnswerCorrect(question, quizState.userAnswers[index]) ? 1 : 0);
    }, 0);
}

function isAnswerCorrect(question, userAnswer) {
    if (!userAnswer) return false;
    
    if (question.type === 'true_false') {
        return userAnswer === question.correct_answer;
    } else if (question.type === 'single_choice') {
        const correctIndex = question.correct_answer.charCodeAt(0) - 65;
        const userIndex = userAnswer.charCodeAt(0) - 65;
        return userIndex === correctIndex;
    }
    return false;
}

function getCorrectAnswerText(question) {
    if (question.type === 'true_false') {
        return question.correct_answer;
    } else if (question.type === 'single_choice') {
        const index = question.correct_answer.charCodeAt(0) - 65;
        return question.options[index];
    }
    return question.correct_answer;
}

function retryQuiz() {
    startQuiz();
}

// Progress tracking
function updateUserProgress(score, totalQuestions) {
    const percentage = (score / totalQuestions) * 100;
    
    if (quizState.quizType === 'chapter' && quizState.selectedChapter) {
        if (!quizState.progress[quizState.selectedChapter]) {
            quizState.progress[quizState.selectedChapter] = [];
        }
        quizState.progress[quizState.selectedChapter].push({
            score,
            total: totalQuestions,
            percentage,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 5 attempts per chapter
        if (quizState.progress[quizState.selectedChapter].length > 5) {
            quizState.progress[quizState.selectedChapter] = 
                quizState.progress[quizState.selectedChapter].slice(-5);
        }
    }
    
    localStorage.setItem('hciaQuizProgress', JSON.stringify(quizState.progress));
    updateProgress();
}

function updateProgress() {
    const chaptersWithProgress = Object.keys(quizState.progress).length;
    const totalProgress = (chaptersWithProgress / chapters.length) * 100;
    
    document.getElementById('progressText').textContent = 
        `${Math.round(totalProgress)}% Complete`;
    document.getElementById('progressFill').style.width = `${totalProgress}%`;
}

// Utility functions
function getQuizTypeName() {
    switch (quizState.quizType) {
        case 'chapter': 
            const chapter = chapters.find(c => c.id === quizState.selectedChapter);
            return `Chapter ${quizState.selectedChapter}: ${chapter?.name || 'Quiz'}`;
        case 'random': return 'Random Quiz';
        case 'exam': return 'Final Exam';
        default: return 'Quiz';
    }
}

function getResultsMessage(percentage) {
    if (percentage >= 90) return "🎉 Excellent! You're mastering HCIA-Datacom!";
    if (percentage >= 80) return "👍 Great job! Strong understanding of the material.";
    if (percentage >= 70) return "💪 Good work! Keep practicing to improve.";
    if (percentage >= 60) return "📚 Not bad! Review the explanations below.";
    return "📖 Keep studying! Focus on the explanations and try again.";
}

// Fallback questions
function getFallbackQuestions() {
    return [
        {
            "id": 1,
            "chapter": 1,
            "chapter_name": "Data Communication Network Basis",
            "topic": "Network Fundamentals",
            "type": "true_false",
            "question": "Making a call on a landline telephone is a type of network communication.",
            "correct_answer": "True",
            "explanation": "Traditional telephone systems are indeed a form of network communication, establishing dedicated circuits for voice transmission.",
            "difficulty": "easy"
        },
        {
            "id": 2,
            "chapter": 1,
            "chapter_name": "Data Communication Network Basis",
            "topic": "Network Devices", 
            "type": "true_false",
            "question": "A gateway must be configured for communication between a host and other hosts.",
            "correct_answer": "False",
            "explanation": "A gateway is only required when communicating with devices on different networks. Hosts on the same network can communicate directly.",
            "difficulty": "medium"
        },
        {
            "id": 3,
            "chapter": 2,
            "chapter_name": "Network Reference Model",
            "topic": "Protocol Analysis",
            "type": "true_false", 
            "question": "When the host accesses web service of the server, the value of the 'Protocol' field at the network layer is 6.",
            "correct_answer": "True",
            "explanation": "The Protocol field value 6 indicates TCP, which is used for web services (HTTP/HTTPS).",
            "difficulty": "medium"
        },
        {
            "id": 4,
            "chapter": 4,
            "chapter_name": "Network Layer Protocols and IP Addressing",
            "topic": "IP Routing",
            "type": "true_false",
            "question": "When forwarding a data packet, a router needs to change the destination IP address of the packet.",
            "correct_answer": "False", 
            "explanation": "Routers change the Layer 2 (MAC) address, not the Layer 3 (IP) destination address (except in NAT scenarios).",
            "difficulty": "medium"
        },
        {
            "id": 5,
            "chapter": 6,
            "chapter_name": "OSPF Basics",
            "topic": "OSPF Fundamentals",
            "type": "true_false",
            "question": "A router in the backbone area has complete LSDBs of routers in other areas.",
            "correct_answer": "False",
            "explanation": "Backbone area routers have summarized route information, not complete LSDBs from other areas.",
            "difficulty": "hard"
        },
        {
            "id": 6,
            "chapter": 8,
            "chapter_name": "VLAN Principles and Configuration",
            "topic": "VLAN Basics",
            "type": "single_choice",
            "question": "What is the main purpose of VLANs in network design?",
            "options": [
                "To increase network bandwidth",
                "To create broadcast domains within a switch",
                "To connect different buildings",
                "To replace routers entirely"
            ],
            "correct_answer": "B",
            "explanation": "VLANs create separate broadcast domains within a single switch, improving network performance and security.",
            "difficulty": "medium"
        }
    ];
}

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', initApp);
