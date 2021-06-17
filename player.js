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

export { player1, player2 };