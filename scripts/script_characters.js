window.onload = function() {

    let fractionList = document.querySelectorAll(".submenu-list-fractions a");
    console.log(fractionList); // ! все пункты списка фракций

    let universeList = document.querySelectorAll(".submenu-list-universe a");
    console.log(universeList); // ! все пункты списка вселенных

    // * ----- Выделение пункта подменю при открытии станицы "Персонажи"
    markMenuItem(fractionList, "all"); // изначально выделяется пункт "Все" во фракциях
    markMenuItem(universeList, "all"); // ... и "Все" во вселенных

    // * ----- Вывод всех карточек при открытии страницы "Персонажи"
    console.log(characters); // ! список персонажей
    //функция построение карточек вызывается для каждого объекта в массиве
    characters.forEach( (character, index) => constructCard(character, index) ); 

    // * ----- Сортировка выведенных карточек по имени на русском языке; вывод на страницу
    let sortedCards = sortCards();
    document.querySelector(".cards-block").append(...sortedCards);

    // * ----- Выбор вселенной (возможен сразу при открытии страницы)
    showUniverseCharacters();

    // * ----------------------------------- ФУНКЦИИ ---------------------------------------
 
    // ** Функция выделения пункта меню (и фракций, и вселенных)
    function markMenuItem(list, selectedHash) {
        //console.log(list);
        //console.log(selectedHash);

        for (let i = 0; i < list.length; i++) {
            // убираем предыдущее выделение пункта меню
            if (list[i].classList.contains("selected-list-item")) {
                list[i].classList.remove("selected-list-item");
            }
           
            let hash = list[i].hash.replace("#", '');
            let functionToFiltration = chooseFiltrationFunc(list[0]); // выбор обработчика для фильтрации

            if (hash === selectedHash) {
                list[i].classList.add("selected-list-item");
                list[i].removeEventListener("click", functionToFiltration); // если пункт выбран, убираем обработчик   
            } else {
                list[i].addEventListener("click", functionToFiltration); // для остальных - добавляем
            } 
        }  

    }

    // ** Функция определения обработчика для фильтрации 
    // принимает значение атрибута data-list, возвращает имя обработчика
    function chooseFiltrationFunc(element) {
        switch (element.dataset.list) {
            case "fractions":
                return showFractionMembers;
            case "universes":
                return showUniverseCharacters; 
        }
    }

    // * Функция перевода написания фракции из RU в ENG 
    // принимает написании фракции на русском, возвращает на английском
    function translateFromRUtoENG(fraction) {
        switch (fraction) {
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

    // * Функция перевода написания фракции из ENG в RU
    // принимает написании фракции на английском, возвращает на русском
    function translateFromENGtoRU(fraction) {
        switch (fraction) {
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
    
    // ** Функция отображения карточек персонажей конкретной фракции (или всех, если выбрано "Все")
    function showFractionMembers() {
        //console.log(this); // пункт меню, по которому кликнули

        let selectedFraction = this.hash.replace("#", '');
        console.log(`Выбрана фракция: ${selectedFraction}`);

        markListItems(selectedFraction); // выделение пунктов меню, разблокировка меню вселенных

        // Вывод персонажей:
        document.querySelector(".cards-block").innerHTML = '';
        let count = 0; // количество выведенных персонажей

        // если выбрана категории фракций "all" - выводим всех персонажей
        if (selectedFraction === "all") {
            characters.forEach( (character, index) => constructCard(character, index) ); 
            count = characters.length;
        }

        // вывод только тех персонажей, чья фракция соответствует выбранному пункту из списка фракций
        let characterFraction;
        for (let i = 0; i < characters.length; i++) {
            characterFraction = translateFromRUtoENG(characters[i].fraction);
            if(characterFraction === selectedFraction){
                constructCard(characters[i], i);
                count++;
            }
        }

        //console.log(count);
        // если персонажей данной фракции нет - вывод сообщения-предупреждения на страницу
        if (count === 0) {
            showWarningFraction(selectedFraction);

            // пункты списка вселенных сделать неактивными и убрать обработчик клика
            universeList.forEach( (list) => {
                list.classList.add("disabled-universe-links");  
                list.removeEventListener("click", showUniverseCharacters)
            } );  
        }

        // сортировка и вывод карточек на страницу
        let sortedCards = sortCards();
        document.querySelector(".cards-block").append(...sortedCards);

        showHideUpBtn(); // проверка скролла (скрытие/отображение кнопки вверх)
    }

    // ** Функция выделения пунктов меню фракции и разблокировки пунктов меню вселенных
    function markListItems(selectedFraction) {
        markMenuItem(fractionList, selectedFraction); // выделение пункта фракции
        markMenuItem(universeList, "all"); // при переходе на другую фракцию - выбор категории "Все" по умолчанию

        // сделать пункты списка вселенных активными
        universeList.forEach( (list) => {
            if (list.classList.contains("disabled-universe-links")) {
                list.classList.remove("disabled-universe-links");  
            }   
        } );  
    }
  
    // ** Функция выбора персонажей вселенной (запускается при клике на пункт меню из категории вселенных)
    function showUniverseCharacters() {
        let selectedUniverse; // пункт меню вселенной, который выбран

        // изначально this.hash === undefined, т.к. выделяется "Все" без клика 
        if (this.hash === undefined) {
            selectedUniverse = "all";
        } else {
            selectedUniverse = this.hash.replace("#", '');  
        }
        console.log(`Выбрана категория вселенной: ${selectedUniverse}`);
        markMenuItem(universeList, selectedUniverse); // выделение пункта меню вселенной

        // Выборка по персонажам фракции 
        let displayedFractionCharacters = document.querySelectorAll(".card"); // выведенные персонажи
        let count = displayedFractionCharacters.length;
        console.log(`Всего карточек показано во фракции: ${count}`);

        for (let i = 0; i < displayedFractionCharacters.length; i++) {  

            // изначально показать все
            if (displayedFractionCharacters[i].style.display === "none")  {
                displayedFractionCharacters[i].style.display = "block";
            }

            // поиск записи о вселенной в отдельной карточке
            let universeText = displayedFractionCharacters[i].querySelector(".universe").innerHTML;

            // если выбрана категория "Все" показываем все карточки
            // если вселенная карточки не совпадает с выбранной вселенной - скрываем карточку 
            if (selectedUniverse === "all") {
                displayedFractionCharacters[i].style.display = "block";
            } else if (selectedUniverse !== universeText) {
                displayedFractionCharacters[i].style.display = "none";
                count--;
            }
        }

        // скрытие сообщения с предупреждением, если есть
        if (document.querySelector(".message-universe")) {
            document.querySelector(".message-universe").remove();
        }

        console.log(`Осталось карточек на странице: ${count}`);
        if (count === 0) {
            showWarningUniverse(selectedUniverse); // вывод предупреждения, если ничего не выведено
            showHideUpBtn();
        }
    }

    // ** Функция вывода на страницу предупреждения, что персонажей данной фракции нет 
    // принимает хэш, соответствующий фракции (на англ.языке)
    function showWarningFraction(fraction) {
        let selectedFractionRU = translateFromENGtoRU(fraction);
        let message = `Персонажи фракции "${selectedFractionRU}" на сайте отсутствуют.`;

        let pMessage = document.createElement("p");
        pMessage.className = "message-fraction";
        pMessage.append(message);
        document.querySelector(".cards-block").append(pMessage);
    }

    // ** Функция вывода на страницу предупреждения, что персонажи данной вселенной отсутствуют 
    // принимает хэш, соответствующий вселенной (на англ.языке)
    function showWarningUniverse(universe) {
        let selectedFraction = document.querySelector(".selected-list-item");
        let fractionHash = selectedFraction.hash.replace("#", '');
        let fractionRU = translateFromENGtoRU(fractionHash);

        let message;
        if (fractionRU === "Все") {
            message = `В категории "Все" отсутствуют представители вселенной "${universe}".`;
        } else {
            message = `Во фракции "${fractionRU}" отсутствуют представители вселенной "${universe}".`;
        }
    
        let pMessage = document.createElement("p");
        pMessage.className = "message-universe";
        pMessage.append(message);
        document.querySelector(".cards-block").append(pMessage);
    }

    // ** Функция сборки карточки персонажа    
    function constructCard(person, index) {
        //console.log(person);
        //console.log(index);

        // конструирование по элементам
        let fractionIcon = createFractionIconBlock(person); // фракция (иконка)
        let photo = createPhotoBlock(person); // фото
        let briefInfo = createBriefInfoBlock(person);  // информация о вселенной и ОС (если надо)
        let nameRU = createNameRUBlock(person); // имя на русском
        let nameENG = createNameENGBlock(person); // имя на английском
        let altmode = createAltmodeBlock(person); // альтмод
        let heightSize = createHeightBlock(person); // рост
        let profession = createProfessionBlock(person); // профессия
        let arming = createArmingBlock(person); // вооружение
        
        // сборка элементов в блок
        let card = document.createElement("div"); // контейнер для персонажа
        card.classList.add("card");
        card.classList.add(`${person.nameENG}-card`);
        card.setAttribute("id",`n${index}`);

        // добавление блоков в карточку персонажа
        card.append(fractionIcon); 
        card.append(photo); 
        card.append(briefInfo); 
        card.append(nameRU); 
        card.append(nameENG); 
        card.append(altmode); 
        card.append(heightSize); 
        card.append(profession); 
        card.append(arming);

        //console.log(card); 
        showCard(card); // вывод карточки       
    }

    // ** Функция вывода карточки персонажа (получает карточку, добавляет в блок на страницу)
    function showCard(card) {
        let cardBlock = document.querySelector(".cards-block"); 
        cardBlock.append(card);
    }

    // ** Функция построения блока с иконкой фракции персонажа (возвращает блок)
    function createFractionIconBlock(person) {
        let divBlock = document.createElement("div"); // контейнер для фракции
        divBlock.className = "fraction-icon";

        let imgBlock = document.createElement("img");
        let src = getFractionIconPath(person.fraction);

        imgBlock.setAttribute("src", src);
        imgBlock.setAttribute("alt", person.fraction);
        imgBlock.setAttribute("title", `Фракция: ${person.fraction}`);

        divBlock.prepend(imgBlock);

        return divBlock;
    }

    // ** Функция получения пути для отображения иконки фракции (возвращает путь к иконке)
    function getFractionIconPath(fraction) {
        let iconFile;

        switch (fraction) {
            case "автобот":
                iconFile = "autobots_icon.svg"; break;
            case "десептикон":
                iconFile = "decepticons_icon.svg"; break;
            case "предакон":
                iconFile = "predacons_icon.svg"; break;
            /*case "нейтрал":
                iconFile = "neutrals_icon.svg"; break;*/
        }

        return `./assets/characters/${iconFile}`;
    }

    // ** Функция построения блока c фото персонажа (возвращает блок)
    function createPhotoBlock(person) {
        let divBlock = document.createElement("div"); // контейнер
        divBlock.className = "character-photo";

        let folder = getFolderName(person.fraction);

        let imgBlock = document.createElement("img");
        imgBlock.setAttribute("src", `./assets/characters/${folder}/${person.photo}`);
        imgBlock.setAttribute("alt", `${person.nameRU}, ${person.fraction}`);

        divBlock.prepend(imgBlock);

        return divBlock;
    }

    // ** Функция получения папки, где хранится фото персонажа (в зависимости от фракции) 
    // (возвращает имя папки)
    function getFolderName(fraction) {
        switch (fraction) {
            case "автобот":
                return "autobots";
            case "десептикон":
                return "decepticons";
            case "предакон":
                return "predacons"; 
            default:
                return "neutrals";
        }
    }

    // ** Функция построения блока вселенной и плашки "ОС" (если есть) (возвращает блок)
    function createBriefInfoBlock(person) {
        let divBlock = document.createElement("div"); // контейнер
        divBlock.className = "brief-info-block";

        if (person.isOC) {
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

    // ** Функция построения блока имени на русском (возвращает блок)
    function createNameRUBlock(person) {
        let h2Block = document.createElement("h2"); // контейнер
        h2Block.className = "name-ru";
        h2Block.append(`${person.nameRU}`);

        return h2Block;
    }

    // ** Функция построения блока имени на английском (возвращает блок)
    function createNameENGBlock(person) {
        let pBlock = document.createElement("p"); // контейнер
        pBlock.className = "name-en";
        pBlock.append(`(${person.nameENG})`);

        return pBlock;
    }
    
    // ** Функция построения блока альтмода (возвращает блок)
    function createAltmodeBlock(person) {
        let pBlock = document.createElement("p"); // контейнер

        let title = document.createElement("b");
        let titleText = "Альтмод: ";
        title.append(titleText);

        pBlock.append(title);

        let text = document.createElement("span");
        text.className = "altmode-str";
        text.append(`${person.altmode}`);

        pBlock.append(text);

        return pBlock;
    }

    // ** Функция построения блока роста (возвращает блок)
    function createHeightBlock(person) {
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

    // ** Функция построения блока профессии (возвращает блок)
    function createProfessionBlock(person) {
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

    // ** Функция построения блока вооружения (возвращает блок)
    function createArmingBlock(person) {
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

    // ** Функция сортировки карточек на текущей странице (без вывода)
    // Карточки для сортировки - те, что уже выведены на страницу
    // возвращает массив отсортированных карточек 
    function sortCards() {
        let displayedCards = document.querySelectorAll(".card");
        //console.log(displayedCharacters);

        let newCardOrder = Array.from(displayedCards).sort( (cardA, cardB) => {
            return cardA.querySelector(".name-ru").innerHTML
            .localeCompare(cardB.querySelector(".name-ru").innerHTML);
        } );

        //console.log(newCardOrder);
        return newCardOrder;
    }

    // ** Функция проверки наличия скролла и отображение/скрытие кнопки "Вверх"
    function showHideUpBtn() {
        if (document.documentElement.scrollHeight === window.innerHeight) {
            // Скролла нет
            document.querySelector(".up-btn").style.display = "none";
        } else {
            //Скролл есть
            document.querySelector(".up-btn").style.display = "block";
        }
    }



}

/* Свойства объекта (1 персонаж):
    - nameRU (имя на русском)
    - nameENG (имя на английском)
    - photo (имя файла с расширением)
    - fraction: автобот | десептикон | предакон | нейтрал
    - altmode (строка)
    - height (число в м)
    - profession (строка)
    - arming (строка)
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
    /*{
        //! копия - потом убрать
        nameRU: "Белый",
        nameENG: "some",
        photo: "wheeljack.jpg",
        fraction: "автобот",
        altmode: "спорткар Lancia Stratos Turbo",
        height: 7,
        profession: "инженер, техник, пилот, мечник, недоученый, вояка, бунтарь",
        arming: "два встроенных в манипуляторы среднемощных бластера; катаны, граната",
        universe: "IDW",
        isOC: true,
    },*/
     /*{
        //! копия - потом убрать
       nameRU: "Связист",
        nameENG: "new",
        photo: "soundwave.jpg",
        fraction: "десептикон",
        altmode: "беспилотник",
        height: 7.6,
        profession: "разведчик, связист, воин, гладиатор",
        arming: "лазерные пушки, щупальца, встроенные в манипуляторы клинки",
        universe: "TFP",
        isOC: true,
    },*/


     

]