window.onload = function() {
    
    //  Выделение пункта подменю - изначально "Все"
    let submenuList = document.querySelectorAll(".submenu-list a");
    console.log(submenuList);

    for(let i = 0; i < submenuList.length; i++) {
        console.log(submenuList[i].hash.replace("#",''));
        if(submenuList[i].hash.replace("#",'') === "all") {
            submenuList[i].classList.add("selected-list-item");
        }
    }

    //! потом вызвать для каждого элемента массива
    constructCard(characters[0]);  //! пример на одном персе - characters[0]

    // TODO - Вывод всех карточек при открытии страницы "Персонажи"
    // TODO Вывод карточки
    // Вывод иконки фракции fraction (автобот | десептикон)
    // Вывод фотографии персонажа photo //! определить размер изображения
    // Вывод имени персонажа на русском и английском
    // Вывод альтмода altmode
    // Вывод роста height
    // Вывод профессии profession
    // Вывод вооружения arming

    // * Функция сборки и вывода карточки персонажа
    function constructCard(person) {
        console.log(person); //! пример на одном персе - characters[0]

        // TODO конструирование по элементам
        let fractionIcon = showFractionIcon(person); // фракция (иконка)
        console.log(fractionIcon); 

        let photo = showPhoto(person); // фото
        console.log(photo);

        let nameRU = showNameRU(person); // имя на русском
        console.log(nameRU);

        let nameENG = showNameENG(person); // имя на английском
        console.log(nameENG);

        let altmode = showAltmode(person); // альтмод
        console.log(altmode);

        let heightSize = showHeight(person); // рост
        console.log(heightSize);

        let profession = showProfession(person); // профессия
        console.log(profession);

        let arming = showArming(person); // вооружение
        console.log(arming);
        
        // TODO сборка элементов в блок
        let card = document.createElement("div"); // контейнер для персонажа //! будет наполняться
        card.classList.add("card");
        card.classList.add(`${person.nameENG}-card`);
        console.log(card); 

        card.append(fractionIcon); // присоединение фракции
        card.append(photo); // присоединение фото
        card.append(nameRU); // присоединение имени на русском
        card.append(nameENG); // присоединение имени на английском
        card.append(altmode); // присоединение альтмода
        card.append(heightSize); // присоединение роста
        card.append(profession); // присоединение профессии
        card.append(arming); // присоединение вооружения

        // TODO вывод блока на страницу
        let cardBlock = document.querySelector(".cards-block"); 
        cardBlock.prepend(card); // ! вывод блока с карточкой вначале текущих
        console.log(cardBlock); 
    }

    // * Функция вывода иконки фракции персонажа
    function showFractionIcon(person) {
        let divBlock = document.createElement("div"); // контейнер для фракции
        divBlock.className = "fraction-icon";

        let imgBlock = document.createElement("img");
        let src;

        switch(person.fraction) {
            case "автобот":
                src = "./assets/characters/autobots_icon.svg"; break;
            case "десептикон":
                src = "./assets/characters/decepticons_icon.svg"; break;
            // ! default - нейтралы, предаконы
        }

        imgBlock.setAttribute("src", src);
        imgBlock.setAttribute("alt", person.fraction);
        imgBlock.setAttribute("title", `Фракция: ${person.fraction}`);

        divBlock.prepend(imgBlock);
        return divBlock;
    }

    // * Функция вывода фото персонажа
    function showPhoto(person) {
        let divBlock = document.createElement("div"); // контейнер
        divBlock.className = "character-photo";

        let imgBlock = document.createElement("img");
        imgBlock.setAttribute("src", `./assets/characters/${person.photo}`);
        imgBlock.setAttribute("alt", `${person.nameRU}, ${person.fraction}`);

        divBlock.prepend(imgBlock);
        return divBlock;
    }

    // * Функция вывода имена на русском
    function showNameRU(person) {
        let h2Block = document.createElement("h2"); // контейнер
        h2Block.className = "name-ru";
        h2Block.append(person.nameRU);

        return h2Block;
    }

    // * Функция вывода имена на английском
    function showNameENG(person) {
        let pBlock = document.createElement("p"); // контейнер
        pBlock.className = "name-en";
        pBlock.append(`(${person.nameENG})`);

        return pBlock;
    }
    
    // ! код функций ниже похож - подумать как объединить в одну универсальную
    // * Функция вывода альтмода
    function showAltmode(person) {
        let pBlock = document.createElement("p"); // контейнер

        let title = document.createElement("b");
        title.append("Альтмод: ");
        pBlock.append(title);

        let text = document.createElement("span");
        text.className = "altmode-str";
        text.append(`${person.altmode}`);
        pBlock.append(text);

        return pBlock;
    }

    // * Функция вывода роста
    function showHeight(person) {
        let pBlock = document.createElement("p"); // контейнер

        let title = document.createElement("b");
        title.append("Рост в робомоде: ");
        pBlock.append(title);

        let text = document.createElement("span");
        text.className = "height-str";
        text.append(`${person.height} м`);
        pBlock.append(text);

        return pBlock;
    }

    // * Функция вывода профессии
    function showProfession(person) {
        let pBlock = document.createElement("p"); // контейнер

        let title = document.createElement("b");
        title.append("Профессия: ");
        pBlock.append(title);

        let text = document.createElement("span");
        text.className = "profession-str";
        text.append(`${person.profession}`);
        pBlock.append(text);

        return pBlock;
    }

    // * Функция вывода вооружения
    function showArming(person) {
        let pBlock = document.createElement("p"); // контейнер

        let title = document.createElement("b");
        title.append("Вооружение: ");
        pBlock.append(title);

        let text = document.createElement("span");
        text.className = "arming-str";
        text.append(`${person.arming}`);
        pBlock.append(text);

        return pBlock;
    }






}

/* объект персонажа:
    - nameRU (имя на русском)
    - nameENG (имя на английском)
    - photo (ссылка на фото - ./assets/characters/autobots/wheeljack.jpg)
    - fraction: автобот | десептикон
    - altmode (текст)
    - height (значение в м)
    - profession (текст)
    - arming (текст)
*/

/* Массив персонажей:*/
let characters = [
    {
        nameRU: "Уилджек",
        nameENG: "Wheeljack",
        photo: "autobots/wheeljack.jpg",
        fraction: "автобот",
        altmode: "спорткар Lancia Stratos Turbo",
        height: 7,
        profession: "инженер, техник, пилот, мечник, недоученый (практик и экспериментатор), вояка, бунтарь",
        arming: "два встроенных в манипуляторы среднемощных бластера; катаны, граната",
    },
    {
        //! пример - потом удалить
        nameRU: "----",
        nameENG: "---",
        photo: "autobots/wheeljack.jpg",
        fraction: "десептикон",
        altmode: "спорткар",
        height: 10,
        profession: "инженер, техник, пилот",
        arming: "катаны, граната",
    },


]

console.log(characters);