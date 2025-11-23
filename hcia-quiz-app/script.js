<<<<<<< HEAD
// Enhanced HCIA Quiz Application with Fixed Question Distribution
=======
// HCIA Quiz Application - Fixed Button Functions
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
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

<<<<<<< HEAD
// HCIA Datacom Chapters with proper question distribution
=======
// HCIA Datacom Chapters
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
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

<<<<<<< HEAD
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
=======
// Load questions
function loadQuestions() {
    try {
        fetch('data.json')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                quizState.questions = data.questions;
                console.log(`✅ Loaded ${quizState.questions.length} questions`);
            })
            .catch(error => {
                console.log('Error loading data.json, using fallback questions:', error);
                quizState.questions = getFallbackQuestions();
            });
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
    } catch (error) {
        console.error('Error loading questions:', error);
        quizState.questions = getFallbackQuestions();
        updateQuickStats();
    }
}

<<<<<<< HEAD
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
=======
// Screen navigation - FIXED
function showScreen(screenId) {
    console.log('Showing screen:', screenId);
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    quizState.currentScreen = screenId;
<<<<<<< HEAD
    
    if (screenId === 'mainMenu') {
        updateQuickStats();
        updateProgress();
    }
=======
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
}

function showMainMenu() {
    showScreen('mainMenu');
}

function showChapterSelection() {
    showScreen('chapterSelection');
}

<<<<<<< HEAD
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

=======
// Render chapters grid - FIXED
function renderChapters() {
    const chaptersGrid = document.getElementById('chaptersGrid');
    if (!chaptersGrid) {
        console.error('Chapters grid element not found!');
        return;
    }
    
    const chapterHTML = chapters.map(chapter => {
        const chapterProgress = quizState.progress[chapter.id] || [];
        const bestScore = chapterProgress.length > 0 ? 
            Math.max(...chapterProgress.map(attempt => attempt.percentage)) : 0;
        
        return `
            <div class="chapter-card" onclick="selectChapter(${chapter.id})" data-chapter-id="${chapter.id}">
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

>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
function getScoreColor(percentage) {
    if (percentage >= 90) return '#00ff88';
    if (percentage >= 80) return '#00d4ff';
    if (percentage >= 70) return '#ffaa00';
    return '#ff4444';
}

<<<<<<< HEAD
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
=======
// Chapter selection - FIXED
function selectChapter(chapterId) {
    console.log('Selected chapter:', chapterId);
    quizState.selectedChapter = chapterId;
    const chapter = chapters.find(c => c.id === chapterId);
    if (chapter && document.getElementById('settingsTitle')) {
        document.getElementById('settingsTitle').textContent = `${chapter.name} - Quiz Settings`;
    }
    showScreen('quizSettings');
}

// Quiz initialization - FIXED BUTTON FUNCTIONS
function startChapterQuiz() {
    console.log('Starting chapter quiz');
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
    quizState.quizType = 'chapter';
    showChapterSelection();
}

function startRandomQuiz() {
<<<<<<< HEAD
    quizState.quizType = 'random';
    document.getElementById('settingsTitle').textContent = 'Random Quiz Settings';
    // For random quiz, allow up to 50 questions
    updateQuestionOptions(Math.min(50, quizState.questions.length));
=======
    console.log('Starting random quiz');
    quizState.quizType = 'random';
    if (document.getElementById('settingsTitle')) {
        document.getElementById('settingsTitle').textContent = 'Random Quiz Settings';
    }
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
    showScreen('quizSettings');
}

function startExam() {
<<<<<<< HEAD
    quizState.quizType = 'exam';
    document.getElementById('settingsTitle').textContent = 'Final Exam Settings';
    // For final exam, use session-based options
    updateQuestionOptions(quizState.questions.length);
=======
    console.log('Starting exam');
    quizState.quizType = 'exam';
    if (document.getElementById('settingsTitle')) {
        document.getElementById('settingsTitle').textContent = 'Final Exam Settings';
    }
    // Set default exam questions to 20
    const questionCountSelect = document.getElementById('questionCount');
    if (questionCountSelect) {
        questionCountSelect.value = '20';
    }
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
    showScreen('quizSettings');
}

function startQuiz() {
<<<<<<< HEAD
=======
    console.log('Starting quiz with type:', quizState.quizType);
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
    const questionCount = parseInt(document.getElementById('questionCount').value);
    const difficultyFilter = document.getElementById('difficultyFilter').value;
    
    // Filter questions based on quiz type
    let availableQuestions = [];
    
    // Filter questions based on quiz type and difficulty
    if (quizState.quizType === 'chapter') {
        availableQuestions = quizState.questions.filter(q => q.chapter === quizState.selectedChapter);
<<<<<<< HEAD
=======
        console.log(`Chapter ${quizState.selectedChapter} has ${availableQuestions.length} questions`);
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
    } else if (quizState.quizType === 'random') {
        availableQuestions = [...quizState.questions];
    } else if (quizState.quizType === 'exam') {
        availableQuestions = [...quizState.questions];
    }
    
<<<<<<< HEAD
    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
        availableQuestions = availableQuestions.filter(q => q.difficulty === difficultyFilter);
    }
    
    // Shuffle and select questions
    quizState.currentQuestions = shuffleArray(availableQuestions).slice(0, questionCount);
=======
    if (availableQuestions.length === 0) {
        alert('No questions available for this selection. Using fallback questions.');
        availableQuestions = getFallbackQuestions();
    }
    
    // Ensure we don't request more questions than available
    const actualCount = Math.min(questionCount, availableQuestions.length);
    
    quizState.currentQuestions = availableQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, actualCount);
    
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
    quizState.currentQuestionIndex = 0;
    quizState.userAnswers = new Array(quizState.currentQuestions.length).fill(null);
    quizState.quizStartTime = Date.now();
    
<<<<<<< HEAD
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
=======
    console.log(`Starting quiz with ${quizState.currentQuestions.length} questions`);
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
    showScreen('quizScreen');
    displayCurrentQuestion();
}

<<<<<<< HEAD
=======
// Question display - FIXED
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
function displayCurrentQuestion() {
    const question = quizState.currentQuestions[quizState.currentQuestionIndex];
    const totalQuestions = quizState.currentQuestions.length;
    
<<<<<<< HEAD
    // Update progress
    document.getElementById('questionCounter').textContent = 
        `${quizState.currentQuestionIndex + 1}/${totalQuestions}`;
    document.getElementById('quizProgress').style.width = 
        `${((quizState.currentQuestionIndex + 1) / totalQuestions) * 100}%`;
=======
    // Update header
    if (document.getElementById('quizType')) {
        document.getElementById('quizType').textContent = getQuizTypeName();
    }
    if (document.getElementById('questionCounter')) {
        document.getElementById('questionCounter').textContent = 
            `${quizState.currentQuestionIndex + 1}/${totalQuestions}`;
    }
    
    // Update progress bar
    const progressPercent = ((quizState.currentQuestionIndex) / totalQuestions) * 100;
    const quizProgress = document.getElementById('quizProgress');
    if (quizProgress) {
        quizProgress.style.width = `${progressPercent}%`;
    }
    
    // Display question
    const questionText = document.getElementById('questionText');
    if (questionText) {
        questionText.textContent = question.question;
    }
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
    
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
<<<<<<< HEAD
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
=======
    if (optionsContainer) {
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
    }
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const finishBtn = document.getElementById('finishBtn');
    
    if (prevBtn) prevBtn.disabled = quizState.currentQuestionIndex === 0;
    if (nextBtn) nextBtn.classList.toggle('hidden', quizState.currentQuestionIndex === totalQuestions - 1);
    if (finishBtn) finishBtn.classList.toggle('hidden', quizState.currentQuestionIndex !== totalQuestions - 1);
    
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
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('selected');
    });
    
    if (selectedAnswer === 'True' || selectedAnswer === 'False') {
        const optionIndex = selectedAnswer === 'True' ? 0 : 1;
        if (options[optionIndex]) {
            options[optionIndex].classList.add('selected');
        }
    } else {
        const optionIndex = selectedAnswer.charCodeAt(0) - 65;
        if (options[optionIndex]) {
            options[optionIndex].classList.add('selected');
        }
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
    }
}

// Navigation - FIXED
function nextQuestion() {
    if (quizState.currentQuestionIndex < quizState.currentQuestions.length - 1) {
        quizState.currentQuestionIndex++;
        displayCurrentQuestion();
    }
}

<<<<<<< HEAD
=======
function previousQuestion() {
    if (quizState.currentQuestionIndex > 0) {
        quizState.currentQuestionIndex--;
        displayCurrentQuestion();
    }
}

// Results - FIXED
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
function showResults() {
    const totalQuestions = quizState.currentQuestions.length;
    const correctAnswers = quizState.userAnswers.reduce((count, answer, index) => {
        return count + (answer === quizState.currentQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
    
<<<<<<< HEAD
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
=======
    const finalScore = document.getElementById('finalScore');
    const scorePercentage = document.getElementById('scorePercentage');
    const resultsMessage = document.getElementById('resultsMessage');
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
    
    if (finalScore) finalScore.textContent = `${score}/${totalQuestions}`;
    if (scorePercentage) scorePercentage.textContent = `${percentage}%`;
    if (resultsMessage) resultsMessage.textContent = getResultsMessage(percentage);
    
    // Build results list
    const resultsList = document.getElementById('resultsList');
    if (resultsList) {
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
    }
    
    // Update progress
    updateUserProgress(score, totalQuestions);
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

<<<<<<< HEAD
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
=======
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
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
}

function retryQuiz() {
    startQuiz();
}

<<<<<<< HEAD
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
=======
// Progress tracking - FIXED
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
    
    const progressText = document.getElementById('progressText');
    const progressFill = document.getElementById('progressFill');
    
    if (progressText) progressText.textContent = `${Math.round(totalProgress)}% Complete`;
    if (progressFill) progressFill.style.width = `${totalProgress}%`;
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
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
    }
    
    showScreen('weakAreas');
}

<<<<<<< HEAD
function practiceChapter(chapterId) {
    quizState.quizType = 'chapter';
    selectChapter(chapterId);
}

// Fallback questions in case data.json fails to load
=======
function getResultsMessage(percentage) {
    if (percentage >= 90) return "🎉 Excellent! You're mastering HCIA-Datacom!";
    if (percentage >= 80) return "👍 Great job! Strong understanding of the material.";
    if (percentage >= 70) return "💪 Good work! Keep practicing to improve.";
    if (percentage >= 60) return "📚 Not bad! Review the explanations below.";
    return "📖 Keep studying! Focus on the explanations and try again.";
}

// Fallback questions
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
function getFallbackQuestions() {
    // This would contain all 138+ questions as per your categorization
    // For brevity, I'm including a sample - you would expand this with all questions
    return [
        {
<<<<<<< HEAD
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
=======
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
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
        }
        // Add all 138+ questions here following the same structure
    ];
}

<<<<<<< HEAD
// Initialize the app when the page loads
=======
// Initialize app when page loads
>>>>>>> parent of 3d62f26 (	new file:   backups/quiz-script.js.backup)
document.addEventListener('DOMContentLoaded', initApp);
