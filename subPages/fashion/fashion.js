let quizAnswers = {};
let currentQuestion = 1;

function answerQuestion(questionNum, answer, evt) {
    // Mark option as selected
    const question = document.getElementById(`q${questionNum}`);
    question.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    if (evt && evt.target) {
        evt.target.classList.add('selected');
    }

    // Store answer
    quizAnswers[`q${questionNum}`] = answer;

    // Update progress
    updateProgress(questionNum);

    // Show next question or result
    setTimeout(() => {
        if (questionNum < 3) {
            document.getElementById(`q${questionNum}`).classList.remove('active');
            currentQuestion = questionNum + 1;
            document.getElementById(`q${currentQuestion}`).classList.add('active');
            updateProgress(currentQuestion);
        } else {
            showResult();
        }
    }, 300);
}

function updateProgress(questionNum) {
    const dots = document.querySelectorAll('.progress-dot');
    dots.forEach((dot, idx) => {
        if (idx < questionNum) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function showResult() {
    // Hide all questions
    document.getElementById('q1').classList.remove('active');
    document.getElementById('q2').classList.remove('active');
    document.getElementById('q3').classList.remove('active');

    // Determine result based on answers
    let resultName = 'Tokyo Trendsetter';
    let resultStyle = 'Clean Minimal';
    let resultArea = 'Shibuya';
    let description = 'You love staying ahead of the curve with fresh styles!';

    if (quizAnswers.q1 === 'colorful' && quizAnswers.q2 === 'harajuku') {
        resultName = 'Harajuku Creative';
        resultStyle = 'Kawaii Street';
        resultArea = 'Harajuku';
        description = 'You\'re all about bold self-expression and colorful vibes. Harajuku is your playground!';
    } else if (quizAnswers.q1 === 'minimal' && quizAnswers.q2 === 'ginza') {
        resultName = 'Ginza Sophisticate';
        resultStyle = 'Clean Minimal';
        resultArea = 'Ginza';
        description = 'You appreciate timeless elegance and premium quality. Ginza\'s luxury brands are calling!';
    } else if (quizAnswers.q1 === 'vintage' && quizAnswers.q2 === 'shimokita') {
        resultName = 'Vintage Curator';
        resultStyle = 'Vintage Mix';
        resultArea = 'Shimokitazawa';
        description = 'You love hunting for unique pieces and vintage treasures. Shimokitazawa is your paradise!';
    } else if (quizAnswers.q1 === 'edgy' && quizAnswers.q2 === 'shibuya') {
        resultName = 'Techwear Enthusiast';
        resultStyle = 'Techwear Edge';
        resultArea = 'Shibuya';
        description = 'You\'re into cutting-edge fashion and modern aesthetics. Shibuya\'s energy suits you!';
    }

    // Update result display
    document.getElementById('resultName').textContent = resultName;
    document.getElementById('resultStyle').textContent = resultStyle;
    document.getElementById('resultArea').textContent = resultArea;
    document.querySelector('.result-description').textContent = description;

    // Show result
    document.getElementById('quizResult').classList.add('show');
}

function restartQuiz() {
    quizAnswers = {};
    currentQuestion = 1;
    document.getElementById('quizResult').classList.remove('show');
    document.getElementById('q1').classList.add('active');
    document.getElementById('q2').classList.remove('active');
    document.getElementById('q3').classList.remove('active');
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    updateProgress(1);
}

// Navigation active state (hash-only)
document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav-links a[href^="#"]').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Smooth scroll for sections
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            const id = section.id;
            document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});
