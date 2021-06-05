const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['harpoon', 'skull', 'fire'],
    attack: function (){
        console.log(this.name + ' Fight...');
    }
};

const player2 = {
    player: 2,
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['freeze', 'ice-rain', 'ice-arrow'],
    attack: function (){
        console.log(this.name + ' Fight...');
    }
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

function randNum(){
    return Math.ceil(Math.random() * 20);
}

function changeHP(player){
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= randNum();
    $playerLife.style.width = player.hp + '%';

    if(player.hp < 0){
        $playerLife.style.width = '0%';
        $arenas.appendChild(playerLose(player));
        $randomButton.disabled = true;
    }
}

function playerLose(player){
    const $loseTitle = createElement('div', 'loseTitle');
    console.log(player.name);
    const $winner = player.player === 1 ? player2.name : player1.name;
    $loseTitle.innerText = $winner + ' win';
    return $loseTitle;
};

$randomButton.addEventListener('click', function (){
    changeHP(player1);
    changeHP(player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));