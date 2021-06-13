//const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['harpoon', 'skull', 'fire'],
    attack,
    changeHP,
    elHP,
    renderHP
};

const player2 = {
    player: 2,
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['freeze', 'ice-rain', 'ice-arrow'],
    attack,
    changeHP,
    elHP,
    renderHP
};

function attack() {
    console.log(this.name + '  Fight...');
};

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

function randNum(n){
    return Math.ceil(Math.random() * n);
};

function elHP(){
    return document.querySelector('.player' + this.player + ' .life');
    console.log('####: elHP: '+ document.querySelector('.player' + this.player));
};

function renderHP(){
    console.log('####: Input div: ' + this.elHP());
    this.elHP().style.width = this.hp + '%';
};

function changeHP(num){
    this.hp -= randNum(num);

    if(this.hp < 0){
        this.hp = 0;
    }
    console.log('#### changeHP: ' + this.hp)
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

/*$randomButton.addEventListener('click', function (){
    player1.changeHP(randNum(20));
    player1.renderHP();

    player2.changeHP(randNum(20));
    player2.renderHP();

    if(player1.hp === 0 || player2.hp === 0){
        $randomButton.disabled = true;
        createReloadButton();
    }

    if(player1.hp === 0 &&  player1.hp < player2.hp){
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp){
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0){
        $arenas.appendChild(playerWins());
    }
});*/

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack(){
    const hit = ATTACK[randNum(3) - 1];
    const defence = ATTACK[randNum(3) - 1];

    return {
        value: randNum(HIT[hit]),
        hit,
        defence,
    }
};

function playerAttack() {
    const attack = {};

    for(let item of $formFight){
        if(item.checked && item.name === 'hit'){
            attack.value = randNum(HIT[item.value]);
            attack.hit = item.value;
        }

        if(item.checked && item.name === 'defence'){
            attack.defence = item.value;
        }
        item.checked = false;
    }

    return attack;
};

function showResult() {
    if(player1.hp === 0 || player2.hp === 0){
        if(player1.hp === 0 &&  player1.hp < player2.hp){
            $arenas.appendChild(playerWins(player2.name));
        } else if (player2.hp === 0 && player2.hp < player1.hp){
            $arenas.appendChild(playerWins(player1.name));
        } else if (player1.hp === 0 && player2.hp === 0){
            $arenas.appendChild(playerWins());
        }
        createReloadButton();
    }
};

$formFight.addEventListener('submit', function (e){
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();

    if(player.defence !== enemy.hit){
        player1.changeHP(enemy.value);
        player1.renderHP();
    }

    if(enemy.defence !== player.hit){
        player2.changeHP(enemy.value);
        player2.renderHP();
    }

    showResult();
});