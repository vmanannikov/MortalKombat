import { player1, player2} from "./player.js";
import randNum from "./utils.js";

const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

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

function getDateTime(){
    return new Date().toTimeString().slice(0, 5);
};

function generateLogs (type, attacker, defending, damage) {
    const data = logs[type];
    const time = getDateTime();
    const i = (randNum(data.length) - 1);
    let log;

    switch (type) {
        case 'start':
            log = data.replace('[time]', time).replace('[player1]', player1.name).replace('[player2]', player2.name);
            break;
        case 'end':
            log = `${time} ${data[i].replace('[playerWins]', attacker.name).replace('[playerLose]', defending.name)}`;
            break;
        case 'hit':
        case 'defence':
            let text = data[i].replace('[playerKick]', attacker.name).replace('[playerDefence]', defending.name);
            log = `${time} ${text} ${(damage ? (defending.name + ' -' + damage + 'hp: ' + defending.hp + '/100') : '')}`;
            break;
        case 'draw':
            log = `${time} ${data}`;
            break;
        default:
            log = '404';
            break;
    }

    const el = `<p>${log}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
};

$formFight.addEventListener('submit', function (e){
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();

    if(player.defence !== enemy.hit){
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1);
    }

    if(enemy.defence !== player.hit){
        player2.changeHP(enemy.value);
        player2.renderHP();
        generateLogs('hit', player1, player2);
    }

    showResult();
});

generateLogs('start', player1.name, player2.name);