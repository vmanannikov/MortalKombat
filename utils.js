export const randNum = (n) => {
    return Math.ceil(Math.random() * n);
};

export const getDateTime = () => {
    return new Date().toTimeString().slice(0, 5);
};

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);

    if(className){
        $tag.classList.add(className);
    }

    return $tag;
};