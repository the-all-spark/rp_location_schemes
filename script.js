window.onload = function() {

	// * --- Показать условные знаки при клике на иконку с вопросом (иконка меняется на "х")

	let questionIcon = document.querySelector(".signs-icon img:nth-of-type(1)");
	questionIcon.addEventListener("click", showHideSigns);

	function showHideSigns() {
        document.querySelector(".signs-outside-image").classList.add("shown-signs"); // показать усл. знаки

        questionIcon.style.display = "none";

        let closeIcon = document.querySelector(".signs-icon img:nth-of-type(2)"); // иконка закрытия
        closeIcon.style.display = "block";
        closeIcon.style.zIndex = "9999";

        closeIcon.addEventListener("click", function() {
            questionIcon.style.display = "block";
            questionIcon.style.zIndex = "9999";
            closeIcon.style.zIndex = "-1";
            document.querySelector(".signs-outside-image").classList.remove("shown-signs"); // скрыть усл. знаки
        });
	}

	// * ---- При переходе (клике) по ссылке из списка локаций подсвечивается нужный объект 
	// TODO - при клике на пункт должны закрываться все блоки в информацией по всем объектам и все выделения объектов!

	let locationListItems = document.querySelectorAll(".location-list a");
	let arrLocationListItems = Array.from(locationListItems);

	for(let i = 0; i < arrLocationListItems.length; i++) {
		//console.log(arrLocationListItems[i]);
		let idName = arrLocationListItems[i].hash.slice(1); // значение в href без символа #
		arrLocationListItems[i].addEventListener("click", function() { switchToObject(idName) });
	}

	// * функция выделяет границей полигон, на который совершен переход (по имени id)
	function switchToObject(id) {
		console.log(id);

		let polygons = document.querySelectorAll(".outside-block polygon");
		for(let i = 0; i < polygons.length; i++) {
			polygons[i].classList.remove("active-polygon");

			if(polygons[i].id === id) {
				polygons[i].classList.add("active-selected-polygon"); // выделение объекта из списка
				polygons[i].addEventListener("click", function() { showInfoSelectedObj(this) });
			}
		}

	}

	// при клике на уже выделенный через список объект
	function showInfoSelectedObj(obj) {
		console.log("Кликаем на уже выделенный объект!");
		console.log(obj);

		if(obj.classList.contains("active-selected-polygon")) {
			obj.classList.remove("active-selected-polygon");
		} 
	}

	// * ----- При клике на объект открывается информация по нему, прячется иконка i

    let objects = document.querySelectorAll("svg polygon"); // объекты (полигоны)
	let arrObjects = Array.from(objects);

	let objectsInfo = document.querySelectorAll(".outside-item"); // спозиционированные блоки с информацией
	let arrObjectsInfo = Array.from(objectsInfo);

    let infoIcons = document.querySelectorAll(".info-icon"); // иконки i над блоком
	let arrInfoIcons =  Array.from(infoIcons);

	// перебор объектов, вызов функции
	for(let i = 0; i < arrObjects.length; i++) {
		arrObjects[i].addEventListener("click", showHideInfo);
	}

	// * функция показа/скрытия иконки "i" выбранного полигона, показа/скрытия информации о нем
	function showHideInfo() {
		console.log("Прячем / показываем инфу");
		//console.log(e.target);
		//console.log(this);
		//console.log(obj); 

		let selectedObj = this.dataset.object; // значение атрибута объекта, по которому кликнули

		highlightPolygon(this); //  вызов функции выделения полигона 
		showHideIcon(); // вызов функции скрытия и показа иконки i

		// перебор блоков с информацией
		for(let j = 0; j < arrObjectsInfo.length; j++) {

			if(arrObjectsInfo[j].dataset.object === selectedObj) {

				// выбираем блок с совпадающим атрибутом (с объектом)
				let selectedObjInfo = document.querySelector('.outside-item[data-object = "' + selectedObj + '"]');
				let infoIcon = document.querySelector('.' + selectedObj + '-info-icon'); // иконка i выбранного объекта
				
				// перещелкивание между показом и скрытием блока с информацией
				if(selectedObjInfo.classList.contains("shown-outside-item")) {
					// если информация не отображается - показываем иконку i (удаляем класс hidden-info-icon)
					selectedObjInfo.classList.remove("shown-outside-item");
					infoIcon.classList.remove("hidden-info-icon");
				} else {
					// если показана информация - убираем иконку i (добавляем класс hidden-info-icon)
					selectedObjInfo.classList.add("shown-outside-item");
					infoIcon.classList.add("hidden-info-icon");
				}

			} else {
				// * скрытие предыдущих отображенных блоков с информацией
				// если атрибут не совпадает, но элемент включает класс - удаляем этот класс

				if(arrObjectsInfo[j].classList.contains("shown-outside-item")) {
					arrObjectsInfo[j].classList.remove("shown-outside-item");
				}
			}
		}

	}

	// * функция выделения выбранного полигона (перебор элементов массива объектов)
	function highlightPolygon(obj) {
		console.log(obj);

		for(let elem of arrObjects) {
			//console.log(elem);

			if(elem !== obj || elem.classList.contains("active-polygon")) {
				elem.classList.remove("active-polygon");
			} else {
				obj.classList.add("active-polygon");
			}

			// для объекта, выделенного через список локаций 
			if(elem !== obj && elem.classList.contains("active-selected-polygon")) { 
				elem.classList.remove("active-selected-polygon");
			} 
		}

	}

	// * функция показа / скрытия иконки i над полигоном (объектом)
	function showHideIcon() {

		// для всех объектов: если иконка i не показана - показываем
		for(let i = 0; i < arrInfoIcons.length; i++) {
			if(arrInfoIcons[i].classList.contains("hidden-info-icon")) {
				arrInfoIcons[i].classList.remove("hidden-info-icon");
			} 
		}
	}
	

}