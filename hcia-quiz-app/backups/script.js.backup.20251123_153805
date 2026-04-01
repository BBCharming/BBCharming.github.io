// HCIA Quiz Application - Enhanced Question Access
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
    updateQuestionCounts();
    updateProgress();
    showScreen('mainMenu');
}

function loadQuestions() {
    try {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                quizState.questions = data.questions;
                console.log(`✅ Loaded ${quizState.questions.length} questions`);
                updateQuestionCounts();
                updateQuizOptions();
            })
            .catch(error => {
                console.log('Using fallback questions');
                quizState.questions = getFallbackQuestions();
                updateQuestionCounts();
                updateQuizOptions();
            });
    } catch (error) {
        console.log('Using fallback questions');
        quizState.questions = getFallbackQuestions();
        updateQuestionCounts();
        updateQuizOptions();
    }
}

// Update question counts for each chapter
function updateQuestionCounts() {
    chapters.forEach(chapter => {
        const count = quizState.questions.filter(q => q.chapter === chapter.id).length;
        chapter.questionCount = count;
    });
}

// Update quiz options based on available questions
function updateQuizOptions() {
    const totalQuestions = quizState.questions.length;
    console.log(`📊 Total questions available: ${totalQuestions}`);
    
    // Update main menu with total count
    const menuFooter = document.querySelector('.menu-footer p');
    if (menuFooter) {
        menuFooter.textContent = `22 Chapters • ${totalQuestions} Questions • Progress Tracking`;
    }
    
    // Update chapter cards with question counts
    setTimeout(() => {
        document.querySelectorAll('.chapter-card').forEach(card => {
            const chapterId = parseInt(card.getAttribute('data-chapter-id') || card.textContent.match(/Chapter (\d+)/)?.[1]);
            if (chapterId) {
                const chapter = chapters.find(c => c.id === chapterId);
                const count = chapter?.questionCount || 0;
                let countElement = card.querySelector('.question-count');
                if (!countElement) {
                    countElement = document.createElement('div');
                    countElement.className = 'question-count';
                    card.appendChild(countElement);
                }
                countElement.textContent = `${count} questions`;
                countElement.style.color = count > 0 ? '#00d4ff' : '#64748b';
                countElement.style.fontSize = '11px';
                countElement.style.marginTop = '5px';
                countElement.style.fontWeight = '600';
            }
        });
    }, 100);
}

// Screen navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        quizState.currentScreen = screenId;
        
        // Update options when showing settings screen
        if (screenId === 'quizSettings') {
            updateQuestionOptions();
        }
    }
}

function showMainMenu() {
    showScreen('mainMenu');
    updateProgress();
}

function showChapterSelection() {
    showScreen('chapterSelection');
}

// Render chapters with question counts
function renderChapters() {
    const chaptersGrid = document.getElementById('chaptersGrid');
    if (chaptersGrid) {
        chaptersGrid.innerHTML = chapters.map(chapter => {
            const count = chapter.questionCount || quizState.questions.filter(q => q.chapter === chapter.id).length;
            const progress = quizState.progress[chapter.id] || [];
            const bestScore = progress.length > 0 ? Math.max(...progress.map(attempt => attempt.percentage)) : 0;
            
            return `
                <div class="chapter-card" onclick="selectChapter(${chapter.id})" data-chapter-id="${chapter.id}">
                    <div class="chapter-number">${chapter.id}</div>
                    <div class="chapter-name">${chapter.name}</div>
                    <div class="question-count">${count} questions</div>
                    ${bestScore > 0 ? `<div class="chapter-progress" style="color: ${getScoreColor(bestScore)}; margin-top: 3px; font-size: 10px;">
                        Best: ${bestScore}%
                    </div>` : ''}
                </div>
            `;
        }).join('');
    }
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
        `Chapter ${chapterId}: ${chapter.name} (${chapterQuestions} questions available)`;
    showScreen('quizSettings');
}

// Quiz type selection
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
    showScreen('quizSettings');
}

// Update question options based on quiz type
function updateQuestionOptions() {
    const questionCountSelect = document.getElementById('questionCount');
    if (!questionCountSelect) return;
    
    let maxQuestions = 0;
    let options = [];
    
    if (quizState.quizType === 'chapter' && quizState.selectedChapter) {
        // Chapter quiz: all questions from that chapter
        maxQuestions = quizState.questions.filter(q => q.chapter === quizState.selectedChapter).length;
        options = generateOptions(maxQuestions, [5, 10, 15, 20, 25, 30, 40, 50]);
    } else if (quizState.quizType === 'random') {
        // Random quiz: up to 50 questions
        maxQuestions = Math.min(50, quizState.questions.length);
        options = generateOptions(maxQuestions, [5, 10, 15, 20, 25, 30, 40, 50]);
    } else if (quizState.quizType === 'exam') {
        // Final exam: up to 130 questions (all questions)
        maxQuestions = Math.min(130, quizState.questions.length);
        options = generateOptions(maxQuestions, [20, 40, 60, 80, 100, 120, 130]);
    }
    
    // Update select options
    questionCountSelect.innerHTML = options.map(opt => 
        `<option value="${opt.value}" ${opt.selected ? 'selected' : ''}>${opt.label}</option>`
    ).join('');
    
    console.log(`🎯 ${quizState.quizType} quiz: ${maxQuestions} questions available`);
}

function generateOptions(maxAvailable, preferredOptions) {
    const options = [];
    
    // Add preferred options that are <= maxAvailable
    preferredOptions.forEach(opt => {
        if (opt <= maxAvailable) {
            options.push({
                value: opt,
                label: `${opt} Questions`,
                selected: opt === Math.min(20, maxAvailable) // Default to 20 or max available
            });
        }
    });
    
    // Always include the maximum available
    if (maxAvailable > 0 && !options.some(opt => opt.value === maxAvailable)) {
        options.push({
            value: maxAvailable,
            label: `All ${maxAvailable} Questions`,
            selected: options.length === 0
        });
    }
    
    return options;
}

// Start quiz with proper question selection
function startQuiz() {
    const questionCount = parseInt(document.getElementById('questionCount').value);
    const totalAvailable = quizState.questions.length;
    
    console.log(`🚀 Starting ${quizState.quizType} quiz with ${questionCount} questions (${totalAvailable} total available)`);
    
    let availableQuestions = [];
    
    if (quizState.quizType === 'chapter' && quizState.selectedChapter) {
        // Get ALL questions from selected chapter
        availableQuestions = quizState.questions.filter(q => q.chapter === quizState.selectedChapter);
        console.log(`📖 Chapter ${quizState.selectedChapter}: ${availableQuestions.length} questions available`);
    } else if (quizState.quizType === 'random') {
        // Random selection from ALL questions (up to 50)
        availableQuestions = [...quizState.questions];
    } else if (quizState.quizType === 'exam') {
        // Exam: ALL questions (up to 130)
        availableQuestions = [...quizState.questions];
    }
    
    // Ensure we don't exceed available questions
    const actualCount = Math.min(questionCount, availableQuestions.length);
    
    if (actualCount === 0) {
        alert('No questions available for this selection. Using fallback questions.');
        availableQuestions = getFallbackQuestions();
    }
    
    // Shuffle and select questions
    quizState.currentQuestions = shuffleArray(availableQuestions).slice(0, actualCount);
    quizState.currentQuestionIndex = 0;
    quizState.userAnswers = new Array(quizState.currentQuestions.length).fill(null);
    
    console.log(`📝 Quiz started with ${quizState.currentQuestions.length} questions`);
    showScreen('quizScreen');
    displayCurrentQuestion();
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// [Include all other essential functions...]
function displayCurrentQuestion() {
    if (quizState.currentQuestions.length === 0) {
        showResults();
        return;
    }
    
    const question = quizState.currentQuestions[quizState.currentQuestionIndex];
    const totalQuestions = quizState.currentQuestions.length;
    
    document.getElementById('quizType').textContent = getQuizTypeName();
    document.getElementById('questionCounter').textContent = `${quizState.currentQuestionIndex + 1}/${totalQuestions}`;
    document.getElementById('questionText').textContent = question.question;
    
    // Update progress bar
    const progressPercent = ((quizState.currentQuestionIndex) / totalQuestions) * 100;
    document.getElementById('quizProgress').style.width = `${progressPercent}%`;
    
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
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = quizState.currentQuestionIndex === 0;
    document.getElementById('nextBtn').classList.toggle('hidden', quizState.currentQuestionIndex === totalQuestions - 1);
    document.getElementById('finishBtn').classList.toggle('hidden', quizState.currentQuestionIndex !== totalQuestions - 1);
    
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
    return userAnswer === question.correct_answer;
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
    
    document.getElementById('progressText').textContent = `${Math.round(totalProgress)}% Complete`;
    document.getElementById('progressFill').style.width = `${totalProgress}%`;
}

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
        }
    ];
}

// Initialize app
document.addEventListener('DOMContentLoaded', initApp);
