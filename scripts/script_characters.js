window.onload = function() {
    
    // * ----- Выделение пункта подменю (изначально "Все")
    let submenuList = document.querySelectorAll(".submenu-list a");
    console.log(submenuList); // ! список подменю

    for(let i = 0; i < submenuList.length; i++) {
        console.log(submenuList[i].hash.replace("#",''));
        if(submenuList[i].hash.replace("#",'') === "all") {
            submenuList[i].classList.add("selected-list-item");
        }
    }

    // * ----- Вывод всех карточек при открытии страницы "Персонажи"

    console.log(characters); // ! список персонажей
    //функция построение карточек вызывается для каждого объекта в массиве
    characters.forEach((character) => constructCard(character)); 

    // * Функция сборки и вывода карточки персонажа
    // Вывод карточки в порядке: иконки фракции (fraction: автобот | десептикон), 
    // фотографии персонажа (photo), имени персонажа на русском и английском, 
    // альтмода (altmode), роста (height), профессии (profession), вооружения (arming)

    function constructCard(person) {

        // конструирование по элементам
        let fractionIcon = showFractionIcon(person); // фракция (иконка)
        let photo = showPhoto(person); // фото
        let nameRU = showNameRU(person); // имя на русском
        let nameENG = showNameENG(person); // имя на английском
        let altmode = showAltmode(person); // альтмод
        let heightSize = showHeight(person); // рост
        let profession = showProfession(person); // профессия
        let arming = showArming(person); // вооружение
        
        // сборка элементов в блок
        let card = document.createElement("div"); // контейнер для персонажа
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

        // вывод блока на страницу
        let cardBlock = document.querySelector(".cards-block"); 
        cardBlock.append(card);
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
            case "предакон":
                src = "./assets/characters/decepticons_icon.svg"; break; //! исправить иконку
            // ! default - нейтралы
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

        let folder;
        switch(person.fraction) {
            case "автобот":
                folder = "autobots"; break;
            case "десептикон":
                folder = "decepticons"; break;
            case "предакон":
                folder = "predacons"; break;
            // ! default - нейтралы
        }

        imgBlock.setAttribute("src", `./assets/characters/${folder}/${person.photo}`);
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
    - universe: вселенная (IDW | TFP | G1 | WFC)
    - isOC: true (если ОС), false (если канон)
*/

/* Массив персонажей:*/
let characters = [
    {
        nameRU: "Уилджек",
        nameENG: "Wheeljack",
        photo: "wheeljack.jpg",
        fraction: "автобот",
        altmode: "спорткар Lancia Stratos Turbo",
        height: 7,
        profession: "инженер, техник, пилот, мечник, недоученый (практик и экспериментатор), вояка, бунтарь",
        arming: "два встроенных в манипуляторы среднемощных бластера; катаны, граната",
        universe: "TFP",
        isOC: true, //! потом поменять
    },
    {
        nameRU: "Саундвейв",
        nameENG: "Soundwave",
        photo: "soundwave.jpg",
        fraction: "десептикон",
        altmode: "беспилотник",
        height: 7.6,
        profession: "разведчик, связист, воин, гладиатор",
        arming: "лазерные пушки, щупальца, встроенные в манипуляторы клинки",
        universe: "TFP",
        isOC: false,
    },
    {
        nameRU: "Даркстил",
        nameENG: "Darksteel",
        photo: "",
        fraction: "предакон",
        altmode: "грифон",
        height: "11.5",
        profession: "клон древнего предакона, воин",
        arming: "плазменный огнемёт, когти",
        universe: "TFP",
        isOC: false,
    },


]