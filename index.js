(function() {
    const ROLL_BUTTON = document.querySelector('#btnRoll');
    const REPEAT_BUTTON = document.querySelector('#btnRepeat');
    const MESSAGE = document.querySelector(`#message`);
    const DICE = document.querySelectorAll(`[id*=Dice]`);
    const LOSING_THROW = 1;
    const WINNING_SCORE = 20;
    
    let currentPlayer = 1;
    let playerScores = [0,0];
    
    ROLL_BUTTON.addEventListener('click', processTurn);
    REPEAT_BUTTON.addEventListener('click', resetGame);
    
    function processTurn () {
        let status;
        renderDie(0,currentPlayer);
        const throwResult = generateRollResult();
        renderDie(throwResult, currentPlayer);
        if (status = checkLost(throwResult))
            return renderResult(status);
        const currentPlayerScore = addScore(throwResult, currentPlayer);
        renderPlayerCurrentScore(currentPlayerScore, currentPlayer);
        
        if (status = checkWon(currentPlayerScore))
            return renderResult(status);
        passRound();
    }

    function generateRollResult () {
        const dieMax = 6;
        const dieMin = 1;
        return ~~(Math.random() * (dieMax - dieMin) + dieMin);
    }

    function renderPlayerCurrentScore(score, player) {
        const playerScore = document.querySelector(`#player${player}Score`);
        playerScore.innerHTML = score;
    }

    function renderDie(throwResult, player){
        const playerDie = document.querySelector(`#player${player}Dice`);
        playerDie.innerHTML = throwResult;
    }

    function addScore (score, player) {
        return playerScores[player-1] += score;        
    }
    
    function checkLost(throwResult) {
        return throwResult === LOSING_THROW ? `lost. ${LOSING_THROW} was thrown` : '';
    }
    
    function checkWon(score) {
        return score >= WINNING_SCORE ? 'won' : '';
    }
    
    function renderResult(status) {
       MESSAGE.innerHTML = `Player ${currentPlayer} ${status}.`;
       toggleButton('btnRoll');
       toggleButton('btnRepeat'); 
    }
    
    function toggleButton(buttonSelector){
        document.querySelector(`#${buttonSelector}`).toggleAttribute('hidden');   
    }
    
    function passRound() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        const playerDie = document.querySelector(`#player${currentPlayer}Dice`);
        
        MESSAGE.innerHTML = `Player ${currentPlayer} turn`;
        DICE.forEach(die => die.classList.remove(`active`));
        playerDie.classList.add('active');   
    }
    
    function resetGame() {
        currentPlayer = 1;
        playerScores = [0,0];
        MESSAGE.innerHTML = `Player ${currentPlayer} turn.`;
        toggleButton('btnRoll');
        toggleButton('btnRepeat'); 
        DICE.forEach((die,index) => {
            renderPlayerCurrentScore(0, index+1);
            renderDie(0,index+1);
        });
    }
})();