var button = document.getElementById('button'),
    content = document.getElementsByTagName('div')[0],
    milSecCont = document.getElementsByClassName('milsec')[0],
    secCont = document.getElementsByClassName('sec')[0],
    minCont = document.getElementsByClassName('min')[0],
    saveContBig = document.getElementsByClassName('save')[0],
    resetButton = document.createElement('button'),
    saveButton = document.createElement('button');
    resetButton.className = 'button';
    resetButton.innerHTML = 'reset';
    saveButton.className = 'button';
    saveButton.innerHTML = 'save';

var timer,
    milSec = 0,
    sec = 0,
    min = 0,
    milSecChek = 0,
    secChek = 0,
    minChek = 0;

function start() {
    timer = setInterval(startCount, 10);
}

function stop() {
    clearInterval(timer);
}

button.addEventListener('click', pushButton, false);

function pushButton() {
    content.appendChild(resetButton);
    content.appendChild(saveButton);

    switch (button.dataset.button) {
        case 'start':
            button.dataset.button = 'stop';
            start();
            button.innerText = 'stop';
            break;
        case 'stop':
            button.dataset.button = 'run';
            stop();
            button.innerText = 'run';
            break;
        default:
            button.dataset.button = 'stop';
            start();
            button.innerText = 'stop';
            break;
    }
}

resetButton.addEventListener('click', reset, false);

function reset() {
    stop();
    button.classList.remove('visNo');
    button.dataset.button = 'start';
    button.innerText = 'start';

    deleteSmallSaveCont();

    resetButton.remove();
    saveButton.remove();

    milSec = 0;
    sec = 0;
    min = 0;

    milSecCont.innerHTML = '00';
    secCont.innerHTML = '00';
    minCont.innerHTML = '00';
}

saveButton.addEventListener('click', save, false);

function save() {
    saveContBig.insertAdjacentHTML('afterBegin', '<div class="savecont"><h1>' + minChek +
        ':' + secChek + ':' + milSecChek + '</h1></div>');
}

function deleteSmallSaveCont() {
    var el = document.getElementsByClassName('savecont');
    while(el.length > 0){
        el[0].parentNode.removeChild(el[0]);
    }
}

function startCount() {
    milSecChek = checkTime(milSec);
    secChek = checkTime(sec);
    minChek = checkTime(min);

    milSec = ++milSec;
    if (milSec === 100) {
        milSec = 0;
        sec = ++sec;
    }
    if (sec === 60) {
        min = ++min;
        sec = 0;
    }
    if (min === 60) {
        stop();
        button.classList.add('visNo');
        saveButton.remove();
    }

    milSecCont.innerHTML = milSecChek;
    secCont.innerHTML = secChek;
    minCont.innerHTML = minChek;
}

function checkTime(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}