function randNum(n){
    return Math.ceil(Math.random() * n);
};

function getDateTime(){
    return new Date().toTimeString().slice(0, 5);
};

export  { randNum, getDateTime };