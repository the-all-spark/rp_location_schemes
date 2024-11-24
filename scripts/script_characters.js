window.onload = function() {

    // * ----- Выделение пункта подменю при открытии станицы "Персонажи"
    let fractionList = document.querySelectorAll(".submenu-list-fractions a");
    console.log(fractionList); // ! все пункты списка фракций

    let universeList = document.querySelectorAll(".submenu-list-universe a");
    console.log(universeList); // ! все пункты списка вселенных

    markMenuItem(fractionList, "all"); // изначально выделяется пункт "Все" во фракциях
    markMenuItem(universeList, "all"); // ... и "Все" во вселенных

    // * ----- Вывод всех карточек при открытии страницы "Персонажи"
    console.log(characters); // ! список персонажей

    //функция построение карточек вызывается для каждого объекта в массиве
    characters.forEach((character, index) => constructCard(character, index)); 

    // * ----- Выбор вселенной (возможен сразу при открытии страницы)
    showUniverseCharacters();

    // * ФУНКЦИИ

    // * Функция выделения пункта меню (и фракций, и вселенных)
    function markMenuItem(list, selectedHash) {
        //console.log(list);
        //console.log(selectedHash);

        for(let i = 0; i < list.length; i++) {

            // убираем предыдущее выделение пункта меню
            if(list[i].classList.contains("selected-list-item")) {
                list[i].classList.remove("selected-list-item");
                list[i].style.cursor = "pointer";
            }
           
            let hash = list[i].hash.replace("#",'');
            let functionToFiltration = chooseFiltration(list[0]); // выбор обработчика для фильтрации

            if(hash === selectedHash) {
                list[i].classList.add("selected-list-item");
                list[i].style.cursor = "not-allowed";
                list[i].removeEventListener("click", functionToFiltration); // если пункт выбран, убираем обработчик   
            } else {
                list[i].addEventListener("click", functionToFiltration); // для остальных - добавляем
            } 
        }  
    }

    // Функция определения списка (и функции) для фильтрации
    function chooseFiltration(element) {
        switch(element.dataset.list) {
            case "fractions":
                return showFractionMembers;
            case "universes":
                return showUniverseCharacters; 
        }
    }

    // Функция перевода написания фракции из RU в ENG 
    function fromRUtoENG(fraction) {
        switch(fraction) {
            case "автобот":
                return "autobots";
            case "десептикон":
                return "decepticons";
            case "предакон":
                return "predacons";
            case "нейтрал":
                return "neutrals";
        }
    }

    // Функция перевода написания фракции из ENG в RU
    function fromENGtoRU(hash) {
        switch(hash) {
            case "autobots":
                return "Автоботы"; 
            case "decepticons":
                return "Десептиконы";
            case "predacons":
                return "Предаконы";
            case "neutrals":
                return "Нейтралы"; 
            case "all":
                return "Все";
        }   
    }
    
    // * Функция выбора персонажей конкретной фракции (или всех)
    function showFractionMembers() {
        //console.log(this); // пункт меню, по которому кликнули

        markMenuItem(universeList, "all"); // при переходе на другую фракцию - выбор категории "Все" по умолчанию

        let selectedHash = this.hash.replace("#",'');
        console.log(`Выбор фракции: ${selectedHash}`);

        document.querySelector(".cards-block").innerHTML = ''; // очищаем что выведено ранее
        let count = 0; // количество выведенных персонажей

        // если выбран хэш "all" - выводим всех
        if(selectedHash === "all") {
            characters.forEach((character, index) => constructCard(character, index)); 
            count = characters.length;
        }

        // вывод только тех, чья фракция соответствует выбранному пункту (хэшу)
        let fraction;
        for(let i = 0; i < characters.length; i++) {
            fraction = fromRUtoENG(characters[i].fraction); // перевод написания фракции из RU в ENG 
            if(fraction === selectedHash){
                constructCard(characters[i], i);
                count++;
            }
        }

        //console.log(count);
        // если персонажей данной фракции нет - вывод сообщения-предупреждения на страницу
        if(count === 0) {
            showWarning(selectedHash);
            // ! сделать пункты меню вселенных неактивными
            // ! для каждого элемента меню убрать обработчик события?

        }

        markMenuItem(fractionList, selectedHash); // выделение пункта меню
        showHideUpBtn(); // проверка скролла (скрытие/отображение кнопки вверх)
    }
  
    // * Функция выбора персонажей вселенной (запускается при клике на пункт меню из категории вселенных)
    function showUniverseCharacters() {

        // скрытие сообщения с предупреждением
        if(document.querySelector(".message-universe")) {
            document.querySelector(".message-universe").remove();
        }
 
        let selectedHash; // пункт меню вселенной, который выбран

        // изначально this.hash === undefined, т.к. выделяется "Все" без клика 
        if(this.hash === undefined) {
            selectedHash = "all";
        } else {
            selectedHash = this.hash.replace("#",'');  
        }
        console.log(`Выбрана категория вселенной: ${selectedHash}`);
        markMenuItem(universeList, selectedHash); // выделение пункта меню вселенной

        // * Выборка по персонажам фракции 

        let displayedFractionCharacters = document.querySelectorAll(".card"); // выведенные персонажи
        let count = displayedFractionCharacters.length;
        console.log(`Всего карточек показано во фракции: ${count}`);

        for(let i = 0; i < displayedFractionCharacters.length; i++) {  

            // изначально показать все
            if(displayedFractionCharacters[i].style.display === "none")  {
                displayedFractionCharacters[i].style.display = "block";
            }

            // поиск записи о вселенной в отдельной карточке
            let universeText = displayedFractionCharacters[i].querySelector(".universe").innerHTML;

            // если выбрана категория "Все" показываем все карточки
            // если вселенная карточки не совпадает с выбранной вселенной - скрываем карточку 
            if(selectedHash === "all") {
                displayedFractionCharacters[i].style.display = "block";
            } else if(selectedHash !== universeText) {
                displayedFractionCharacters[i].style.display = "none";
                count--;
            }
        }

        console.log(`Осталось карточек на странице: ${count}`);
        if(count === 0) {
            showWarningUniverse(selectedHash); // вывод предупреждения если ничего не выведено
        }

    }

    // * Функция вывода на страницу предупреждения, что персонажей данной фракции нет 
    // принимает хэш, соотв. фракции (на англ.)
    function showWarning(hash) {
        let selectedHashRU = fromENGtoRU(hash); // перевод написания хэша из ENG в RU
        let message = `Персонажи фракции "${selectedHashRU}" на сайте отсутствуют.`;

        let pMessage = document.createElement("p");
        pMessage.className = "message-fraction";
        pMessage.append(message);
        document.querySelector(".cards-block").append(pMessage);
    }

    // * Функция вывода на страницу предупреждения, что персонажей данной вселенной нет 
    // принимает хэш, соотв. фракции (на англ.)
    function showWarningUniverse(universe) {

        let selectedFraction = document.querySelector(".selected-list-item");
        let hash = selectedFraction.hash.replace("#",'');
        //console.log(hash);

        let fraction = fromENGtoRU(hash); // перевод написания хэша из ENG в RU
        //console.log(fraction);

        let message;
        if(fraction === "Все") {
            message = `В категории "Все" отсутствуют представители вселенной ${universe}.`;
        } else {
            message = `Во фракции "${fraction}" отсутствуют представители вселенной "${universe}".`;
        }
    
        let pMessage = document.createElement("p");
        pMessage.className = "message-universe";
        pMessage.append(message);
        document.querySelector(".cards-block").append(pMessage);
    }

     // * функция проверки скролла и отображение/скрытие кнопки вверх
     function showHideUpBtn() {
        if(document.documentElement.scrollHeight === window.innerHeight) {
            //console.log("Скролла нет");
            document.querySelector(".up-btn").style.display = "none";
        } else {
            //console.log("Скролл есть");
            document.querySelector(".up-btn").style.display = "block";
        }
    }

    // * ---- Функция сборки и вывода карточки персонажа
    // Вывод карточки в порядке: иконки фракции (fraction: автобот | десептикон), 
    // фотографии персонажа (photo), имени персонажа на русском и английском, 
    // альтмода (altmode), роста (height), профессии (profession), вооружения (arming)
    
    function constructCard(person, index) {
        //console.log(person);
        //console.log(index);

        // конструирование по элементам
        let fractionIcon = showFractionIcon(person); // фракция (иконка)
        let photo = showPhoto(person); // фото
        let briefInfo = showBriefInfo(person);  // информация о вселенной и ОС (если надо)
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
        card.setAttribute("id",`n${index}`);

        console.log(card); 

        card.append(fractionIcon); // присоединение фракции
        card.append(photo); // присоединение фото
        card.append(briefInfo); // присоединение краткой информации (вселенная, ОС)
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
                src = "./assets/characters/predacons_icon.svg"; break;
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

    // * Функция вывода вселенной и плашки "ОС" (если есть)
    function showBriefInfo(person) {
        let divBlock = document.createElement("div"); // контейнер
        divBlock.className = "brief-info-block";

        if(person.isOC) {
            let pOCBlock = document.createElement("p");
            pOCBlock.className = "isOC-block";
            pOCBlock.append("OC");
            divBlock.append(pOCBlock);
            divBlock.style.width = "40%";
        } else {
            divBlock.style.width = "20%";
        }
        
        let pUniverseBlock = document.createElement("p");
        pUniverseBlock.className = "universe";
        pUniverseBlock.append(`${person.universe}`);
        divBlock.append(pUniverseBlock);

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
        profession: "инженер, техник, пилот, мечник, недоученый, вояка, бунтарь",
        arming: "два встроенных в манипуляторы среднемощных бластера; катаны, граната",
        universe: "TFP",
        isOC: false,
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
        photo: "Darksteel.jpg",
        fraction: "предакон",
        altmode: "грифон",
        height: 11.5,
        profession: "клон древнего предакона, воин",
        arming: "плазменный огнемёт, когти",
        universe: "TFP",
        isOC: false,
    },
    {
        //! копия - потом убрать
        nameRU: "У",
        nameENG: "some",
        photo: "wheeljack.jpg",
        fraction: "автобот",
        altmode: "спорткар Lancia Stratos Turbo",
        height: 7,
        profession: "инженер, техник, пилот, мечник, недоученый, вояка, бунтарь",
        arming: "два встроенных в манипуляторы среднемощных бластера; катаны, граната",
        universe: "IDW",
        isOC: true,
    },
    {
        //! копия - потом убрать
        nameRU: "C",
        nameENG: "new",
        photo: "soundwave.jpg",
        fraction: "десептикон",
        altmode: "беспилотник",
        height: 7.6,
        profession: "разведчик, связист, воин, гладиатор",
        arming: "лазерные пушки, щупальца, встроенные в манипуляторы клинки",
        universe: "TFP",
        isOC: true,
    },


     

]