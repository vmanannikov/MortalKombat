import {ATTACK, HIT} from "./const";
import {randNum} from "./utils";

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

export { enemyAttack, playerAttack };