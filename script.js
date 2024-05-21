// Function to toggle audio
function toggleAudio() {
    const audio = document.getElementById('background-audio');
    const button = document.querySelector('#audio-controls button');
    if (audio.paused) {
        audio.play();
        button.textContent = 'Pause Music';
    } else {
        audio.pause();
        button.textContent = 'Play Music';
    }
}
let health1 = 100;
let health2 = 100;
let currentPlayer = 1;
let cardImages = [
    'images/card1.png',
    'images/card2.png',
    'images/card3.png',
    'images/card4.png',
    'images/card5.png',
    'images/card6.png',
    'images/card7.png',
    'images/card8.png'
];
let cardActions = ['attack', 'attack', 'defend', 'defend', 'special', 'special', 'attack', 'defend'];
let player1Card = null;
let computerCard = null;
let player1Defend = false;
let computerDefend = false;

const bearResponses = {
    'images/card1.png': {
        attack: 'Bartertown Teddy swings its powerful paws!',
        defend: 'Bartertown Teddy braces itself for the impact.',
        special: 'Bartertown Teddy unleashes a mighty roar!'
    },
    'images/card2.png': {
        attack: 'Bitcoin Teddy bashes with a huge coin!',
        defend: 'Bitcoin Teddy blocks with its blockchain shield.',
        special: 'Bitcoin Teddy mines a powerful block, causing an explosion of coins!'
    },
    'images/card3.png': {
        attack: 'BNB Teddy slashes with its claws!',
        defend: 'BNB Teddy defends with a golden shield.',
        special: 'BNB Teddy launches a blazing attack!'
    },
    'images/card4.png': {
        attack: 'Drip Teddy splashes with a water wave!',
        defend: 'Drip Teddy creates a water barrier.',
        special: 'Drip Teddy floods the battlefield!'
    },
    'images/card5.png': {
        attack: 'Ethereum Teddy zaps with a lightning strike!',
        defend: 'Ethereum Teddy forms an electric shield.',
        special: 'Ethereum Teddy conducts a high voltage shock!'
    },
    'images/card6.png': {
        attack: 'Pulse Chain Teddy punches with pulse energy!',
        defend: 'Pulse Chain Teddy generates a pulse shield.',
        special: 'Pulse Chain Teddy emits a pulse explosion!'
    },
    'images/card7.png': {
        attack: 'Richard Heart Teddy strikes with luxurious style!',
        defend: 'Richard Heart Teddy defends with a stylish shield.',
        special: 'Richard Heart Teddy dazzles with a fashion blast!'
    },
    'images/card8.png': {
        attack: 'TitanX Teddy crushes with brute force!',
        defend: 'TitanX Teddy forms a titanium shield.',
        special: 'TitanX Teddy smashes with titan strength!'
    }
};

document.addEventListener("DOMContentLoaded", function() {
    initializeCardSelection();
});

function initializeCardSelection() {
    const player1Options = document.getElementById('player1-options');
    player1Options.innerHTML = ''; // Clear previous options
    cardImages.forEach((src) => {
        const imgElement1 = document.createElement('img');
        imgElement1.src = src;
        imgElement1.onclick = () => selectCard(src);
        player1Options.appendChild(imgElement1);
    });
    document.getElementById('start-game').disabled = true;
    document.getElementById('player1-select').style.display = 'block';
}

function selectCard(src) {
    player1Card = src;
    // Ensure the computer picks a different card from the player's selected card
    let remainingCards = cardImages.filter(card => card !== src);
    computerCard = remainingCards[Math.floor(Math.random() * remainingCards.length)];
    document.getElementById('player1-select').style.display = 'none';
    document.getElementById('start-game').disabled = false;
}

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    document.getElementById('end-game').style.display = 'none';
    updateCardImages();
    updateHealth();
    enableControls();
}

function updateCardImages() {
    const player1Cards = document.getElementById('player1-cards');
    const player2Cards = document.getElementById('player2-cards');
    player1Cards.innerHTML = '';
    player2Cards.innerHTML = '';
    
    const imgElement1 = document.createElement('img');
    imgElement1.src = player1Card;
    player1Cards.appendChild(imgElement1);

    const imgElement2 = document.createElement('img');
    imgElement2.src = computerCard;
    player2Cards.appendChild(imgElement2);
}

function updateHealth() {
    document.getElementById('health1').style.width = health1 + '%';
    document.getElementById('health1-text').textContent = health1 + ' HP';
    document.getElementById('health2').style.width = health2 + '%';
    document.getElementById('health2-text').textContent = health2 + ' HP';
}

function showMessage(message) {
    const messages = document.getElementById('messages');
    const newMessage = document.createElement('p');
    newMessage.textContent = message;
    messages.appendChild(newMessage);
    messages.scrollTop = messages.scrollHeight; // Scroll to the bottom for new messages
}

function performAction(action) {
    if (currentPlayer === 1) {
        playerAction(action);
    } else {
        computerAction();
    }
}

function playerAction(action) {
    switch(action) {
        case 'attack':
            attack();
            break;
        case 'defend':
            player1Defend = true;
            showMessage(bearResponses[player1Card].defend);
            currentPlayer = 2;
            setTimeout(computerAction, 1000);
            break;
        case 'special':
            specialMove();
            break;
    }
}

function computerAction() {
    const actions = ['attack', 'defend', 'special'];
    const action = actions[Math.floor(Math.random() * actions.length)];
    showMessage(`Computer chooses to ${action}`);
    switch(action) {
        case 'attack':
            attack();
            break;
        case 'defend':
            computerDefend = true;
            showMessage(bearResponses[computerCard].defend);
            currentPlayer = 1;
            break;
        case 'special':
            specialMove();
            break;
    }
}

function attack() {
    if (currentPlayer === 1) {
        if (computerDefend) {
            showMessage('Player 1 attacks! Computer defends successfully, no damage taken.');
            computerDefend = false;
        } else {
            health2 -= 10;
            showMessage(bearResponses[player1Card].attack);
            document.getElementById('player2-cards').firstChild.classList.add('attack');
            setTimeout(() => {
                document.getElementById('player2-cards').firstChild.classList.remove('attack');
            }, 500);
        }
        currentPlayer = 2;
    } else {
        if (player1Defend) {
            showMessage('Computer attacks! Player 1 defends successfully, no damage taken.');
            player1Defend = false;
        } else {
            health1 -= 10;
            showMessage(bearResponses[computerCard].attack);
            document.getElementById('player1-cards').firstChild.classList.add('attack');
            setTimeout(() => {
                document.getElementById('player1-cards').firstChild.classList.remove('attack');
            }, 500);
        }
        currentPlayer = 1;
    }
    updateHealth();
    checkGameOver();
    if (currentPlayer === 2) {
        setTimeout(computerAction, 1000); // Delay for computer action
    }
}

function specialMove() {
    if (currentPlayer === 1) {
        health2 -= 20;
        currentPlayer = 2;
        showMessage(bearResponses[player1Card].special);
        document.getElementById('player2-cards').firstChild.classList.add('special');
        setTimeout(() => {
            document.getElementById('player2-cards').firstChild.classList.remove('special');
        }, 1000);
    } else {
        health1 -= 20;
        currentPlayer = 1;
        showMessage(bearResponses[computerCard].special);
        document.getElementById('player1-cards').firstChild.classList.add('special');
        setTimeout(() => {
            document.getElementById('player1-cards').firstChild.classList.remove('special');
        }, 1000);
    }
    updateHealth();
    checkGameOver();
    if (currentPlayer === 2) {
        setTimeout(computerAction, 1000); // Delay for computer action
    }
}

function checkGameOver() {
    if (health1 <= 0) {
        showMessage('Computer wins!');
        disableControls();
        displayEndGame('Computer wins!');
    } else if (health2 <= 0) {
        showMessage('Player 1 wins!');
        disableControls();
        displayEndGame('Player 1 wins!');
    }
}

function disableControls() {
    const buttons = document.querySelectorAll('#controls button');
    buttons.forEach(button => button.disabled = true);
}

function enableControls() {
    const buttons = document.querySelectorAll('#controls button');
    buttons.forEach(button => button.disabled = false);
}

function displayEndGame(message) {
    const endGame = document.getElementById('end-game');
    const winnerMessage = document.getElementById('winner-message');
    winnerMessage.textContent = message;
    endGame.style.display = 'block';
}

function restartGame() {
    health1 = 100;
    health2 = 100;
    currentPlayer = 1;
    player1Defend = false;
    computerDefend = false;
    player1Card = null;
    computerCard = null;
    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('game').style.display = 'none';
    document.getElementById('end-game').style.display = 'none';
    document.getElementById('player1-options').innerHTML = '';
    document.getElementById('player1-cards').innerHTML = ''; // Clear previous player card
    document.getElementById('player2-cards').innerHTML = ''; // Clear previous computer card
    document.getElementById('messages').innerHTML = ''; // Clear previous messages
    initializeCardSelection();
    updateHealth();
    enableControls();
}

document.addEventListener("DOMContentLoaded", function() {
    initializeCardSelection();
});
