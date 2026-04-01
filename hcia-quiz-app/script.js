// Enhanced HCIA Quiz Application with Fixed Question Distribution
const quizState = {
    currentScreen: 'mainMenu',
    questions: [],
    currentQuestions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    quizType: '',
    selectedChapter: null,
    progress: JSON.parse(localStorage.getItem('hciaQuizProgress')) || {},
    quizStartTime: null,
    weakAreas: []
};

// HCIA Datacom Chapters with proper question distribution
const chapters = [
    { id: 1, name: "Data Communication Network Basis", expectedQuestions: 4 },
    { id: 2, name: "Network Reference Model", expectedQuestions: 4 },
    { id: 3, name: "Huawei VRP", expectedQuestions: 12 },
    { id: 4, name: "Network Layer Protocols and IP Addressing", expectedQuestions: 16 },
    { id: 5, name: "IP Routing Basics", expectedQuestions: 6 },
    { id: 6, name: "OSPF Basics", expectedQuestions: 20 },
    { id: 7, name: "Ethernet Switching Basics", expectedQuestions: 5 },
    { id: 8, name: "VLAN Principles and Configuration", expectedQuestions: 12 },
    { id: 9, name: "STP Principles and Configuration", expectedQuestions: 10 },
    { id: 10, name: "Inter-VLAN Communication", expectedQuestions: 2 },
    { id: 11, name: "Eth-Trunk iStack and CSS", expectedQuestions: 5 },
    { id: 12, name: "ACL Principles and Configuration", expectedQuestions: 6 },
    { id: 13, name: "AAA Principles and Configuration", expectedQuestions: 5 },
    { id: 14, name: "Network Address Translation", expectedQuestions: 7 },
    { id: 15, name: "Network Services and Applications", expectedQuestions: 9 },
    { id: 16, name: "WLAN Overview", expectedQuestions: 16 },
    { id: 17, name: "WAN Technologies", expectedQuestions: 4 },
    { id: 18, name: "Network Management and OM", expectedQuestions: 4 },
    { id: 19, name: "IPv6 Basics", expectedQuestions: 10 },
    { id: 20, name: "Introduction to SDN and NFV", expectedQuestions: 2 },
    { id: 21, name: "Network Programmability and Automation", expectedQuestions: 2 },
    { id: 22, name: "Typical Campus Network Architectures and Practices", expectedQuestions: 9 }
];

// Initialize the application
async function initApp() {
    await loadQuestions();
    renderChapters();
    updateProgress();
    updateQuickStats();
    setupEventListeners();
    showScreen('mainMenu');
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('settingsBackBtn').addEventListener('click', function() {
        if (quizState.quizType === 'chapter') {
            showChapterSelection();
        } else {
            showMainMenu();
        }
    });
}

// Load questions from JSON file
async function loadQuestions() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        quizState.questions = data.questions;
        console.log(`✅ Loaded ${quizState.questions.length} questions`);
        updateQuickStats();
    } catch (error) {
        console.error('Error loading questions:', error);
        quizState.questions = getFallbackQuestions();
        updateQuickStats();
    }
}

// Update quick stats in main menu
function updateQuickStats() {
    const totalQuestions = quizState.questions.length;
    const chaptersCompleted = Object.keys(quizState.progress).length;
    const avgScore = calculateAverageScore();
    
    document.getElementById('totalQuestions').textContent = totalQuestions;
    document.getElementById('chaptersCompleted').textContent = chaptersCompleted;
    document.getElementById('avgScore').textContent = avgScore + '%';
}

function calculateAverageScore() {
    let totalScore = 0;
    let totalAttempts = 0;
    
    Object.values(quizState.progress).forEach(attempts => {
        attempts.forEach(attempt => {
            totalScore += attempt.percentage;
            totalAttempts++;
        });
    });
    
    return totalAttempts > 0 ? Math.round(totalScore / totalAttempts) : 0;
}

// Screen navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    quizState.currentScreen = screenId;
    
    if (screenId === 'mainMenu') {
        updateQuickStats();
        updateProgress();
    }
}

function showMainMenu() {
    showScreen('mainMenu');
}

function showChapterSelection() {
    showScreen('chapterSelection');
}

// Filter chapters based on search
function filterChapters() {
    const searchTerm = document.getElementById('chapterSearch').value.toLowerCase();
    const chapterCards = document.querySelectorAll('.chapter-card');
    
    chapterCards.forEach(card => {
        const chapterName = card.querySelector('.chapter-name').textContent.toLowerCase();
        const chapterNumber = card.querySelector('.chapter-number').textContent;
        
        if (chapterName.includes(searchTerm) || chapterNumber.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Render chapters grid with progress
function renderChapters() {
    const chaptersGrid = document.getElementById('chaptersGrid');
    
    const chapterHTML = chapters.map(chapter => {
        const chapterQuestions = quizState.questions.filter(q => q.chapter === chapter.id).length;
        const chapterProgress = quizState.progress[chapter.id] || [];
        const bestScore = chapterProgress.length > 0 ? 
            Math.max(...chapterProgress.map(attempt => attempt.percentage)) : 0;
        
        const progressClass = getProgressClass(bestScore);
        const progressBadge = bestScore > 0 ? 
            `<div class="chapter-progress ${progressClass}">Best: ${bestScore}%</div>` : '';
        
        return `
            <div class="chapter-card" onclick="selectChapter(${chapter.id})" data-chapter-id="${chapter.id}">
                <div class="chapter-number">${chapter.id}</div>
                <div class="chapter-name">${chapter.name}</div>
                <div class="question-count">${chapterQuestions} questions</div>
                ${progressBadge}
            </div>
        `;
    }).join('');
    
    if (chaptersGrid) chaptersGrid.innerHTML = chapterHTML;
}

function getProgressClass(percentage) {
    if (percentage >= 90) return 'excellent';
    if (percentage >= 80) return 'good';
    if (percentage >= 70) return 'average';
    return 'poor';
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
    const chapterQuestions = quizState.questions.filter(q => q.chapter === chapterId).length;
    
    document.getElementById('settingsTitle').textContent = 
        `Chapter ${chapterId}: ${chapter.name}`;
    
    // Update question count options based on available questions
    updateQuestionOptions(chapterQuestions);
    
    showScreen('quizSettings');
}

// Update question options based on available questions
function updateQuestionOptions(maxQuestions) {
    const questionCountSelect = document.getElementById('questionCount');
    const options = [];
    
    if (quizState.quizType === 'exam') {
        // Exam sessions: 50, 50, 38
        const examSessions = [
            { value: 50, label: "Session 1: 50 Questions" },
            { value: 50, label: "Session 2: 50 Questions" },
            { value: 38, label: "Session 3: 38 Questions" }
        ];
        
        examSessions.forEach(session => {
            if (session.value <= maxQuestions) {
                options.push(`<option value="${session.value}">${session.label}</option>`);
            }
        });
    } else {
        // Chapter and Random quiz options
        const standardOptions = [5, 10, 15, 20, 25, 30];
        standardOptions.forEach(opt => {
            if (opt <= maxQuestions) {
                options.push(`<option value="${opt}" ${opt === 10 ? 'selected' : ''}>${opt} Questions</option>`);
            }
        });
        
        // Always add the maximum available
        if (maxQuestions > 0 && !options.some(opt => opt.includes(`value="${maxQuestions}"`))) {
            options.push(`<option value="${maxQuestions}">All ${maxQuestions} Questions</option>`);
        }
    }
    
    questionCountSelect.innerHTML = options.join('');
}

// Quiz initialization
function startChapterQuiz() {
    quizState.quizType = 'chapter';
    showChapterSelection();
}

function startRandomQuiz() {
    quizState.quizType = 'random';
    document.getElementById('settingsTitle').textContent = 'Random Quiz Settings';
    // For random quiz, allow up to 50 questions
    updateQuestionOptions(Math.min(50, quizState.questions.length));
    showScreen('quizSettings');
}

function startExam() {
    quizState.quizType = 'exam';
    document.getElementById('settingsTitle').textContent = 'Final Exam Settings';
    // For final exam, use session-based options
    updateQuestionOptions(quizState.questions.length);
    showScreen('quizSettings');
}

function startQuiz() {
    const questionCount = parseInt(document.getElementById('questionCount').value);
    const difficultyFilter = document.getElementById('difficultyFilter').value;
    
    let availableQuestions = [];
    
    // Filter questions based on quiz type and difficulty
    if (quizState.quizType === 'chapter') {
        availableQuestions = quizState.questions.filter(q => q.chapter === quizState.selectedChapter);
    } else if (quizState.quizType === 'random') {
        availableQuestions = [...quizState.questions];
    } else if (quizState.quizType === 'exam') {
        availableQuestions = [...quizState.questions];
    }
    
    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
        availableQuestions = availableQuestions.filter(q => q.difficulty === difficultyFilter);
    }
    
    // Shuffle and select questions
    quizState.currentQuestions = shuffleArray(availableQuestions).slice(0, questionCount);
    quizState.currentQuestionIndex = 0;
    quizState.userAnswers = new Array(quizState.currentQuestions.length).fill(null);
    quizState.quizStartTime = Date.now();
    
    if (quizState.currentQuestions.length === 0) {
        alert('No questions available with the selected criteria. Please try different settings.');
        return;
    }
    
    showQuizScreen();
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function showQuizScreen() {
    showScreen('quizScreen');
    displayCurrentQuestion();
}

function displayCurrentQuestion() {
    const question = quizState.currentQuestions[quizState.currentQuestionIndex];
    const totalQuestions = quizState.currentQuestions.length;
    
    // Update progress
    document.getElementById('questionCounter').textContent = 
        `${quizState.currentQuestionIndex + 1}/${totalQuestions}`;
    document.getElementById('quizProgress').style.width = 
        `${((quizState.currentQuestionIndex + 1) / totalQuestions) * 100}%`;
    
    // Update quiz type display
    let quizTypeText = 'Chapter Quiz';
    if (quizState.quizType === 'random') quizTypeText = 'Random Quiz';
    if (quizState.quizType === 'exam') quizTypeText = 'Final Exam';
    document.getElementById('quizType').textContent = quizTypeText;
    
    // Update question content
    document.getElementById('questionChapter').textContent = `Chapter ${question.chapter}`;
    document.getElementById('questionTopic').textContent = question.topic || chapters.find(c => c.id === question.chapter)?.name || 'General';
    document.getElementById('questionText').textContent = question.text;
    document.getElementById('currentDifficulty').textContent = 
        question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1);
    
    // Update options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        if (quizState.userAnswers[quizState.currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
        }
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = quizState.currentQuestionIndex === 0;
    document.getElementById('nextBtn').classList.toggle('hidden', 
        quizState.currentQuestionIndex === totalQuestions - 1);
    document.getElementById('finishBtn').classList.toggle('hidden', 
        quizState.currentQuestionIndex !== totalQuestions - 1);
}

function selectOption(optionIndex) {
    quizState.userAnswers[quizState.currentQuestionIndex] = optionIndex;
    displayCurrentQuestion();
}

function previousQuestion() {
    if (quizState.currentQuestionIndex > 0) {
        quizState.currentQuestionIndex--;
        displayCurrentQuestion();
    }
}

function nextQuestion() {
    if (quizState.currentQuestionIndex < quizState.currentQuestions.length - 1) {
        quizState.currentQuestionIndex++;
        displayCurrentQuestion();
    }
}

function showResults() {
    const totalQuestions = quizState.currentQuestions.length;
    const correctAnswers = quizState.userAnswers.reduce((count, answer, index) => {
        return count + (answer === quizState.currentQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const timeSpent = Math.round((Date.now() - quizState.quizStartTime) / 1000);
    
    // Update results display
    document.getElementById('finalScore').textContent = `${correctAnswers}/${totalQuestions}`;
    document.getElementById('scorePercentage').textContent = `${percentage}%`;
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('incorrectAnswers').textContent = totalQuestions - correctAnswers;
    document.getElementById('timeSpent').textContent = `${timeSpent}s`;
    
    // Update results message
    let message = '';
    if (percentage >= 90) {
        message = 'Excellent! You have mastered this content.';
    } else if (percentage >= 80) {
        message = 'Great job! You have a good understanding.';
    } else if (percentage >= 70) {
        message = 'Good effort! Review the incorrect answers.';
    } else {
        message = 'Keep practicing! Focus on the weak areas.';
    }
    document.getElementById('resultsMessage').textContent = message;
    
    // Update progress tracking
    updateProgressTracking(correctAnswers, totalQuestions, percentage);
    
    // Show results details
    showResultsDetails();
    
    showScreen('resultsScreen');
}

function updateProgressTracking(correct, total, percentage) {
    if (quizState.quizType === 'chapter' && quizState.selectedChapter) {
        const chapterId = quizState.selectedChapter;
        if (!quizState.progress[chapterId]) {
            quizState.progress[chapterId] = [];
        }
        
        quizState.progress[chapterId].push({
            date: new Date().toISOString(),
            score: correct,
            total: total,
            percentage: percentage
        });
        
        // Keep only last 5 attempts
        if (quizState.progress[chapterId].length > 5) {
            quizState.progress[chapterId] = quizState.progress[chapterId].slice(-5);
        }
        
        localStorage.setItem('hciaQuizProgress', JSON.stringify(quizState.progress));
        updateProgress();
    }
}

function updateProgress() {
    const totalChapters = chapters.length;
    const completedChapters = Object.keys(quizState.progress).length;
    const progressPercentage = Math.round((completedChapters / totalChapters) * 100);
    
    document.getElementById('progressText').textContent = `${progressPercentage}% Complete`;
    document.getElementById('progressFill').style.width = `${progressPercentage}%`;
    
    // Add progress class for color coding
    const progressFill = document.getElementById('progressFill');
    progressFill.className = 'progress-fill ' + getProgressClass(progressPercentage);
}

function showResultsDetails() {
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';
    
    quizState.currentQuestions.forEach((question, index) => {
        const userAnswer = quizState.userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        
        const resultItem = document.createElement('div');
        resultItem.className = `result-item ${isCorrect ? 'correct' : 'incorrect'}`;
        
        resultItem.innerHTML = `
            <strong>Question ${index + 1}: ${isCorrect ? '✓ Correct' : '✗ Incorrect'}</strong>
            <div>${question.text}</div>
            <div>Your answer: ${userAnswer !== null ? question.options[userAnswer] : 'Not answered'}</div>
            ${!isCorrect ? `<div>Correct answer: ${question.options[question.correctAnswer]}</div>` : ''}
            ${question.explanation ? `<div class="explanation">Explanation: ${question.explanation}</div>` : ''}
        `;
        
        resultsList.appendChild(resultItem);
    });
}

function retryQuiz() {
    startQuiz();
}

function showWeakAreas() {
    // Calculate weak areas based on incorrect answers
    quizState.weakAreas = [];
    const chapterErrors = {};
    
    quizState.currentQuestions.forEach((question, index) => {
        if (quizState.userAnswers[index] !== question.correctAnswer) {
            const chapterId = question.chapter;
            if (!chapterErrors[chapterId]) {
                chapterErrors[chapterId] = 0;
            }
            chapterErrors[chapterId]++;
        }
    });
    
    // Convert to weak areas array
    Object.keys(chapterErrors).forEach(chapterId => {
        const chapter = chapters.find(c => c.id === parseInt(chapterId));
        if (chapter) {
            quizState.weakAreas.push({
                chapterId: parseInt(chapterId),
                chapterName: chapter.name,
                errorCount: chapterErrors[chapterId]
            });
        }
    });
    
    // Sort by error count (descending)
    quizState.weakAreas.sort((a, b) => b.errorCount - a.errorCount);
    
    // Display weak areas
    const weakAreasList = document.getElementById('weakAreasList');
    weakAreasList.innerHTML = '';
    
    if (quizState.weakAreas.length === 0) {
        weakAreasList.innerHTML = '<div class="weak-area-item"><h4>No Weak Areas Found!</h4><p>Great job! You answered all questions correctly.</p></div>';
    } else {
        quizState.weakAreas.forEach(area => {
            const areaItem = document.createElement('div');
            areaItem.className = 'weak-area-item';
            areaItem.innerHTML = `
                <h4>Chapter ${area.chapterId}: ${area.chapterName}</h4>
                <p>Incorrect answers: ${area.errorCount}</p>
                <button class="btn-secondary" onclick="practiceChapter(${area.chapterId})">Practice This Chapter</button>
            `;
            weakAreasList.appendChild(areaItem);
        });
    }
    
    showScreen('weakAreas');
}

function practiceChapter(chapterId) {
    quizState.quizType = 'chapter';
    selectChapter(chapterId);
}

// Fallback questions in case data.json fails to load
function getFallbackQuestions() {
    // This would contain all 138+ questions as per your categorization
    // For brevity, I'm including a sample - you would expand this with all questions
    return [
        {
            id: 1,
            chapter: 1,
            topic: "Basic Networking",
            text: "Making a call on a landline telephone is a type of network communication.",
            options: ["True", "False"],
            correctAnswer: 0,
            difficulty: "easy",
            explanation: "Landline telephone communication is indeed a form of network communication, specifically circuit-switched networking."
        },
        {
            id: 2,
            chapter: 1,
            topic: "OSI Model",
            text: "What are the components of the OSI reference model from top to bottom?",
            options: [
                "Application, presentation, session, transport, network, data link, physical",
                "Physical, data link, network, transport, session, presentation, application", 
                "Application, session, presentation, transport, network, data link, physical",
                "Physical, network, data link, transport, session, presentation, application"
            ],
            correctAnswer: 0,
            difficulty: "medium",
            explanation: "The OSI model layers from top to bottom are: Application, Presentation, Session, Transport, Network, Data Link, Physical."
        }
        // Add all 138+ questions here following the same structure
    ];
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', initApp);
