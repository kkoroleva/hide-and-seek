'use strict';

//Картинки для поиска. 
//id - код элемента (техническая штука). делается по форме слово "item" + номер по порядку 
//name - название объекта
//link - ссылка на хранилище картинки
//width - ширина картинки; height - высота картинки
//multiplier - коэффициент увеличения/уменьшения. ВСЕГДА оставлять 1
const itemStorage = [{
        id: 'item1',
        name: 'Heart1',
        link: 'https://i.ibb.co/BfNSqLY/3-09.png',
        width: 20,
        height: 20,
        multiplier: 1,
    },
    {
        id: 'item2',
        name: 'Heart2',
        link: 'https://i.ibb.co/7g1MwBT/2-09.png',
        width: 60,
        height: 60,
        multiplier: 1,

    },
    {
        id: 'item3',
        name: 'Heart3',
        link: 'https://i.ibb.co/JtyhpGn/2-08.png',
        width: 60,
        height: 60,
        multiplier: 1,

    },
    {
        id: 'item4',
        name: 'Heart4',
        link: 'https://i.ibb.co/2dqkhWm/2-07.png',
        width: 40,
        height: 40,
        multiplier: 1,
    },
    {
        id: 'item5',
        name: 'Heart5',
        link: 'https://i.ibb.co/thXFhH3/2-06.png',
        width: 60,
        height: 60,
        multiplier: 1,
    },
    {
        id: 'item6',
        name: 'Heart6',
        link: 'https://i.ibb.co/F8Q0cC6/2-05.png',
        width: 60,
        height: 60,
        multiplier: 1,
    },
    {
        id: 'item7',
        name: 'Heart7',
        link: 'https://i.ibb.co/xJYQ6pv/2-04.png',
        width: 30,
        height: 30,
        multiplier: 1,
    },
    {
        id: 'item8',
        name: 'Heart8',
        link: 'https://i.ibb.co/Jx49RKh/2-03.png',
        width: 90,
        height: 60,
        multiplier: 1,
    },
    {
        id: 'item9',
        name: 'Heart9',
        link: 'https://i.ibb.co/h84MRyv/2-10.png',
        width: 60,
        height: 60,
        multiplier: 1,
    },
    {
        id: 'item10',
        name: 'Heart10',
        link: 'https://i.ibb.co/m05QW8Z/3-03.png',
        width: 60,
        height: 60,
        multiplier: 1,
    },
    {
        id: 'item11',
        name: 'Heart11',
        link: 'https://i.ibb.co/86SfSXW/3-04.png',
        width: 60,
        height: 60,
        multiplier: 1,
    },
    {
        id: 'item12',
        name: 'Heart12',
        link: 'https://i.ibb.co/m5ppwqK/3-05.png',
        width: 60,
        height: 60,
        multiplier: 1,
    },
    {
        id: 'item13',
        name: 'Heart13',
        link: 'https://i.ibb.co/PjtNnLm/3-06.png',
        width: 60,
        height: 60,
        multiplier: 1,
    },
    {
        id: 'item14',
        name: 'Heart14',
        link: 'https://i.ibb.co/jb2PWjQ/3-07.png',
        width: 60,
        height: 60,
        multiplier: 1,
    },
    {
        id: 'item15',
        name: 'Heart15',
        link: 'https://i.ibb.co/2hB7fsQ/3-08.png',
        width: 60,
        height: 80,
        multiplier: 1,
    }
];

const multiplierStorage = [0.9, 1, 2]; //Коэффициенты увеличения/уменьшения. Можно добавлять через запятую
const itemsPerRound = 15; //Количество предметов в раунде
const fieldWidth = 1200; //Ширина игрового поля
const fieldHeight = 600; //Высота игрового поля

//Отсюда и дальше технический код. НЕ МЕНЯТЬ без специалиста
function getRandomInt (min = 0, max) {
    if (min >= max || min < 0 || max < 0) {
        return 'Error. Некорректные входные данные';
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getRandomArrayElement (array) {
    return array[getRandomInt(0, array.length - 1)];
};

function getRandomArray (refArray) {
    let resultArray = refArray.slice();
    for (let i = 0; i < resultArray.length - 1; i++) {
        const randIndex = getRandomInt(0, resultArray.length - 1);
        const temp = resultArray[i];
        resultArray[i] = resultArray[randIndex];
        resultArray[randIndex] = temp;
        resultArray[i].multiplier = getRandomArrayElement(multiplierStorage);
    }
    return resultArray.slice(0, itemsPerRound);
};

function createDOMElement (template) {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstChild;
};

function renderBlock (component, container) {
    if (container instanceof searchItem) {
        container = container.getElement();
    }

    if (component instanceof searchItem) {
        component = component.getElement();
    }
    container.append(component);
};

function findFreeSpot (arr, index) {
    return parseInt(arr.splice(index, 1));
};

function fieldFirstCheck () {
    if (temp.reduce((acc, cur) => acc + cur) > field.offsetWidth * field.offsetHeight) {
        alert('Предметы в списке поиска слишком большие. Не поместятся на экран');
    }
    if (temp[maxSizeIndex] > field.offsetWidth * field.offsetHeight) {
        alert('Самый большой предмет с учетом коэффициента изменения размера больше 1/15 поля. Программа может работать некорректно');
    }

    field.style = `grid-template: repeat(auto-fill, ${rowSize}px)/repeat(auto-fill, ${columnSize}px);`;
};

//Класс - поисковый элемент
class searchItem {
    constructor(storageItem) {
        this.itemId = storageItem.id;
        this.itemName = storageItem.name;
        this.itemLink = storageItem.link;
        this.itemWidth = storageItem.width;
        this.itemHeight = storageItem.height;
        this.multiplier = storageItem.multiplier;

        this._element = null;
        this._nameInList = null;

        this._clickHandler = this._clickHandler.bind(this);

    }

    init() {
        this.getElement();
        this.getElement().addEventListener('click', this._clickHandler);
    }

    getElement() {
        if (!this._element && !this._nameInList) {
            this._element = createDOMElement(this.getItemTemplate());
            this._nameInList = createDOMElement(this.getItemNameTemplate());
        }
        return this._element;
    }

    _removeItem() {
        this.getElement().remove();
        this._nameInList.style = "text-decoration: line-through;";
    }

    getItemTemplate() {
        return `<img id = "${this.itemId}" class = "item" src = "${this.itemLink}" style = "${this._getPosition()} " alt = "${this.itemName}">`;
    };

    getItemNameTemplate() {
        return `<li class = "item-name">${this.itemName}</li>`;
    };

    _getPosition = () => {
        let spot = findFreeSpot(freeSpots, getRandomInt(1, freeSpots.length - 1));
        this.posX = Math.floor(spot / columnCount);
        this.posY = spot % columnCount;
        return `grid-column: ${this.posY}/${this.posY+1}; 
                grid-row: ${this.posX+1}/${this.posX+2}; 
                width: ${this.itemWidth*this.multiplier}px;
                height: ${this.itemHeight*this.multiplier}px;
                margin-left: ${getRandomInt(1,(columnSize-this.itemWidth*this.multiplier)/2)}px;
                margin-top: ${(getRandomInt(1,rowSize-this.itemWidth*this.multiplier)/2)}px`;
    };

    _clickHandler = () => {
        this._removeItem();
        findCounter++;
        if (findCounter == 15) {
            findCounter = 0;
            instructions.hidden = false;
            //if (!startButton.hidden) {
                startButton.hidden = true;
                //restartButton.hidden = false;
            //}
        }
    };
};

let findCounter = 0; //Счетчик найденных элементов
const playableItemsData = getRandomArray(itemStorage); //Данные для поисковых элементов

//Вспомогательный массив с площадью картинок (чтобы найти наибольшую)
const temp = playableItemsData.map((item) => {
    return item.width * item.height * item.multiplier;
});
const maxSizeIndex = temp.indexOf(Math.max.apply(null, temp)); //Индекс самой большой картинки

const field = document.querySelector('.field');
const instructions = field.querySelector('.instructions');
const startButton = field.querySelector('.instructions_start-button');
const restartButton = field.querySelector('.instructions_restart-button');
const itemList = document.querySelector('.item-list');

//Параметры игрового поля (размер и количество колонок и столбцов)
const columnSize = playableItemsData[maxSizeIndex].width * playableItemsData[maxSizeIndex].multiplier;
const rowSize = playableItemsData[maxSizeIndex].height * playableItemsData[maxSizeIndex].multiplier;
const columnCount = (fieldWidth - fieldWidth % columnSize) / columnSize;
const rowCount = (fieldHeight - fieldHeight % rowSize) / rowSize;

//Массив свободных клеточек на игровом поле
let freeSpots = new Array(columnCount * rowCount).fill(0).map(((_, i) => i));
const spots = freeSpots.length;

fieldFirstCheck();

function renderItems () {
    let playableItems = [];
    itemList.innerHTML = "";
    instructions.hidden = true;
    for (let i = 0; i < playableItemsData.length; i++) {
        playableItems.push(new searchItem(playableItemsData[i]));
        playableItems[i].init();
        renderBlock(playableItems[i], field);
        renderBlock(playableItems[i]._nameInList, itemList);
    }
};

startButton.addEventListener('click', renderItems);
//restartButton.addEventListener('click', renderItems);
