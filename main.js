/* All answer options */
const   option1 = document.querySelector('.option1'),
        option2 = document.querySelector('.option2'),
        option3 = document.querySelector('.option3'),
        option4 = document.querySelector('.option4');

// All your options
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); /*сам вопрос*/

const   numberOfQuestion = document.getElementById('number-of-question'),  /*номер вопроса*/
        numberOfAllQuestions = document.getElementById('number-of-all-questions'); /*количество всех вопросов*/

let     indexOfQuestion, /*индекс текущего вопроса*/
        indexOfPage = 0;  /*индекс страницы*/

const answersTracker = document.getElementById('answers-tracker'); /*обертка для трекера*/
const btnNext = document.getElementById('btn-next'); /*кнопка далее*/

let score = 0; /*итоговый результат викторины*/

const   correctAnswer = document.getElementById('correct-answer'),  /*количество правильных ответов*/
        numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), /*количество всех вопросов*/
        btnTryAgain = document.getElementById('btn-try-again'); /*кнопка "начать викторину заново" */

let contentTitle = document.querySelector('.content__title');
let percent;

const questions = [
    {
        question: 'Выберите правильный вариант',
        options: [
            ' if (i != 2)',
            'if i != 2 then',
            'if i <> 2',
            'if (i <> 2)',
        ],
        rightAnswer:0
    },
    {
        question: 'Результат выражения "25" + 1',
        options: [
            '26',
            '25',
            '35',
            '251',
        ],
        rightAnswer:3
    },
    {
        question: 'Как найти наибольшее из двух чисел?',
        options: [
            'top(x, y)',
            'Math.max(x, y)',
            'Math.ceil(x, y)',
            'ceil(x, y)',
        ],
        rightAnswer:1
    },
    {
        question: 'Какое из перечисленных ниже слов НЕ является зарезервированным в JavaScript ?',
        options: [
            ' undefined',
            'throw',
            'finally',
            'default',
        ],
        rightAnswer:0
    },
    {
        question: 'Какое имя переменой является недопустимым ?',
        options: [
            ' prettyDog',
            '_prettydog',
            '#prettyDog',
            '$pretty_dog',
        ],
        rightAnswer:2
    },
];


numberOfAllQuestions.innerHTML = questions.length; /*выводим количество вопросов*/

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;  /*сам вопрос*/ 

    /*мапим ответы*/
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; //установка номера текущей страницы
    indexOfPage++; //увеличение индекса старницы
}

let completedAnswers = []; //массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; //чкорь для проверки одинаковых вопросов

    if (indexOfPage == questions.length) {
        quizOver()
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score ++;
        percent = ( score * 100 / questions.length);
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

for (option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из указанных вариантов ответов ');
    } else {
        randomQuestion();
        enableOptions();
    }
}



const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length; 

    titleNewVery();
}

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})

function titleNewVery  ()  {
    if( percent == 100 ) {
        // let newTitleCool = document.getElementsByClassName('content')[0].getElementsByTagName('h1')[0].firstChild.nodeValue = 'Отличный результат';
        res = 'Отличный результат';
        resultOfGame(res);
    } 
    else if( percent >= 80) {
        contentTitle.firstChild.nodeValue = 'Хороший результат';
    } 
    else if( percent >= 60) {
        contentTitle.firstChild.nodeValue = 'Нормальный результат';
    } 
    else if( percent >= 40) {
        contentTitle.firstChild.nodeValue = 'Плохой результат';
    } 
    else if( percent >= 20) {
        contentTitle.firstChild.nodeValue = 'Ужасный результат';
    } 
    else  {
        resul = 'Нулевой результат';
        resultOfGame(resul);
    } 

}

const resultOfGame = win => {
    contentTitle.firstChild.nodeValue = ` ${win} !` ;
}