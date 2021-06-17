import {player1, player2} from "./player";

function showResult() {
    if(player1.hp === 0 || player2.hp === 0){
        if(player1.hp === 0 &&  player1.hp < player2.hp){
            $arenas.appendChild(playerWins(player2.name));
            generateLogs('end', player2, player1);
        } else if (player2.hp === 0 && player2.hp < player1.hp){
            $arenas.appendChild(playerWins(player1.name));
            generateLogs('end', player1, player2);
        } else if (player1.hp === 0 && player2.hp === 0){
            $arenas.appendChild(playerWins());
            generateLogs('draw');
        }
        createReloadButton();
    }
};

function playerWins(name){
    const $loseTitle = createElement('div', 'loseTitle');
    if(name){
        $loseTitle.innerText = name + ' wins';
    } else {
        $loseTitle.innerText = 'draw';
    }
    return $loseTitle;
};

function createReloadButton(){
    const $reloadDiv = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');
    $button.innerText = 'reload';

    $reloadDiv.addEventListener('click', function (){
        window.location.reload();
    });

    $reloadDiv.appendChild($button);
    $arenas.appendChild($reloadDiv);
};

export { showResult, playerWins, createReloadButton };