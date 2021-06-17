import { player1, player2} from "./player.js";
import {generateLogs, logs} from "./logs.js";

const $formFight = document.querySelector('.control');
const $arenas = document.querySelector('.arenas');

function createElement (tag, className) {
    const $tag = document.createElement(tag);

    if(className){
        $tag.classList.add(className);
    }

    return $tag;
};

function createPlayer(object){
  const $playerDiv = createElement('div', 'player' + object.player);
  const $progressDiv = createElement('div', 'progressbar');
  const $lifeDiv = createElement('div', 'life');
  $lifeDiv.style.width = object.hp + '%';

  const $nameDiv = createElement('div', 'name');
  $nameDiv.innerText = object.name;

  const $characterDiv = createElement('div', 'character');

  const $img = createElement('img')
  $img.src = object.img;

  $playerDiv.appendChild($progressDiv);
  $playerDiv.appendChild($characterDiv);
  $progressDiv.appendChild($lifeDiv);
  $progressDiv.appendChild($nameDiv);
  $characterDiv.appendChild($img);

  return $playerDiv;
};

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$formFight.addEventListener('submit', function (e){
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();

    if(player.defence !== enemy.hit){
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemy.value);
    } else {
        generateLogs('defence', player2, player1);
    }

    if(enemy.defence !== player.hit){
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, player.value);
    } else {
        generateLogs('defence', player1, player2);
    }

    showResult();
});

generateLogs('start', player1.name, player2.name);