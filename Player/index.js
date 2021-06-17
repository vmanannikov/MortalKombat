import { createElement, randNum } from "../utils.js";

class Player {
    constructor(props) {
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.player = props.player;
        this.selector = `player${this.player}`;
        this.rootSelector = props.rootSelector;
    }
    elHP = () => {
        return document.querySelector('.player' + this.player + ' .life');
        console.log('####: elHP: '+ document.querySelector('.player' + this.player));
    };

     renderHP = () => {
        console.log('####: Input div: ' + this.elHP());
        this.elHP().style.width = this.hp + '%';
    };

     changeHP = (num) => {
        this.hp -= randNum(num);

        if(this.hp < 0){
            this.hp = 0;
        }
        console.log('#### changeHP: ' + this.hp)
    };

    createPlayer = () => {
        const $playerDiv = createElement('div', this.selector);
        const $progressDiv = createElement('div', 'progressbar');
        const $lifeDiv = createElement('div', 'life');
        $lifeDiv.style.width = this.hp + '%';

        const $nameDiv = createElement('div', 'name');
        $nameDiv.innerText = this.name;

        const $characterDiv = createElement('div', 'character');

        const $img = createElement('img')
        $img.src = this.img;

        $playerDiv.appendChild($progressDiv);
        $playerDiv.appendChild($characterDiv);
        $progressDiv.appendChild($lifeDiv);
        $progressDiv.appendChild($nameDiv);
        $characterDiv.appendChild($img);
        const $root = document.querySelector(`.${this.rootSelector}`);
        $root.appendChild($playerDiv);

        return $playerDiv;
    };
}

export default Player;