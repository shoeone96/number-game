let playButton = document.getElementById('play-button');
let userInput = document.getElementById('user-input');
let resultArea = document.getElementById('result-area');
let resetButton = document.getElementById('reset-button');
let chanceArea = document.getElementById('chance-area');
let gameOver = false;
let chance = 3;
let computerNum;
let history = [];

const pickRandomNum = () => {
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log(computerNum);

    alert("정답: " + computerNum);
};

pickRandomNum();

playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);

function reset() {
    resultArea.textContent = '즐거운 게임에 초대합니다 :)';
    pickRandomNum();
    playButton.disabled = false;
    chance = 3;
    chanceArea.textContent = '남은 찬스: 3번';
    history = [];
    userInput.value = '';
}

function play() {
    let userValue = userInput.value;
    console.log("userValue" + userValue)
    console.log("computerNum" + computerNum)
    if (!validateNumber(userValue)) return;

    chance--;
    chanceArea.textContent = `남은 찬스: ${chance}`;

    if (userValue < computerNum) {
        resultArea.textContent = 'UP!';
    } else if (userValue > computerNum) {
        resultArea.textContent = 'DOWN!';
    } else {
        alert('🎉 맞추셨습니다! 🎉');
        playButton.disabled = true;
        reset();
        return;
    }

    history.push(userValue);
    userInput.value = '';

    if (chance < 1) {
        gameOver = true;
        alert('😢 아쉽지만 다음 기회에!');
        playButton.disabled = true;
    }
}

function validateNumber(input) {
    if (!input || isNaN(input)) {
        resultArea.textContent = '⚠️ 숫자를 입력해주세요!';
        userInput.value = '';
        return false;
    }

    const num = Number(input);
    if (num < 1 || num > 100) {
        resultArea.textContent = '⚠️ 1부터 100 사이의 숫자만 입력 가능합니다!';
        userInput.value = '';
        return false;
    }

    if (history.includes(input)) {
        resultArea.textContent = '⚠️ 이미 입력한 숫자입니다!';
        userInput.value = '';
        return false;
    }
    return true;
};