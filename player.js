import randNum from "./utils.js";

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['harpoon', 'skull', 'fire'],
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
    changeHP,
    elHP,
    renderHP
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

export { player1, player2, elHP, renderHP, changeHP};