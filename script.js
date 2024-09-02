window.onload = function() {

	// *Показать условные знаки при клике на иконку с вопросом (иконка меняется на "х")

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

	// * При клике на объект открывается информация по нему, прячется иконка i

    let objects = document.querySelectorAll("svg polygon"); // объекты (полигоны)
	let arrObjects = Array.from(objects);

	let objectsInfo = document.querySelectorAll(".outside-item"); // спозиционированные блоки с информацией
	let arrObjectsInfo = Array.from(objectsInfo);

    let infoIcons = document.querySelectorAll(".info-icon"); // иконки i над блоком
	let arrInfoIcons =  Array.from(infoIcons);

	// перебор объектов
	for(let i = 0; i < arrObjects.length; i++) {

		arrObjects[i].addEventListener("click", function() {
			let selectedObj = this.dataset.object; // значение атрибута объекта, по которому кликнули
			//console.log(selectedObj);

			// для всех объектов: если иконка i не показана - показываем
			for(let k = 0; k < arrInfoIcons.length; k++) {
				if(arrInfoIcons[k].classList.contains("hidden-info-icon")) {
					arrInfoIcons[k].classList.remove("hidden-info-icon");
				} 
			}

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

		});
		
	}
}