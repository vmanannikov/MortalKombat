const player1 = {
    name: 'Scorpion',
    hp: 90,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['harpoon', 'skull', 'fire'],
    attack: function (){
        console.log(this.name + ' Fight...');
    }
};

const player2 = {
    name: 'Sub-Zero',
    hp: 10,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['freeze', 'ice-rain', 'ice-arrow'],
    attack: function (){
        console.log(this.name + ' Fight...');
    }
};

const $arenas = document.querySelector('.arenas');

function createPlayer(player, object){
  const $playerDiv = document.createElement('div');
  $playerDiv.classList.add(player);

  const $progressDiv = document.createElement('div');
  $progressDiv.classList.add('progressbar');

  const $lifeDiv = document.createElement('div');
  $lifeDiv.classList.add('life');
  $lifeDiv.style.width = object.hp + '%';

  const $nameDiv = document.createElement('div');
  $nameDiv.classList.add('name');
  $nameDiv.innerText = object.name;

  const $characterDiv = document.createElement('div');
  $characterDiv.classList.add('character');

  const $img = document.createElement('img');
  $img.src = object.img;

  $playerDiv.appendChild($progressDiv);
  $playerDiv.appendChild($characterDiv);
  $progressDiv.appendChild($lifeDiv);
  $progressDiv.appendChild($nameDiv);
  $characterDiv.appendChild($img);

  $arenas.appendChild($playerDiv);
};

createPlayer('player1', player1);
createPlayer('player2', player2);