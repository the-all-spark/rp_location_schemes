window.onload = function() {

	// * --- Отменить перетаскивание ссылок и изображений
	
	let allA = document.querySelectorAll("a");
	let allImg = document.querySelectorAll("img");

	allA.forEach( (elem) => {
		elem.addEventListener("dragstart", function(event) { event.preventDefault(); } );
	})
	allImg.forEach( (elem) => {
		elem.addEventListener("dragstart", function(event) { event.preventDefault(); } );
	})

	// ! подкорректировать для всех условных знаков на странице
	// * --- Показать условные знаки при клике на иконку с вопросом (иконка меняется на "х")

	let signsImageAll = document.querySelectorAll(".signs-image"); // коллекция изображений УЗ  (1 эл. - если только общие)
	//console.log(signsImageAll);

	let signsIconAll = Array.from(document.querySelectorAll(".signs-icon")); // коллекция иконок открыть/закрыть 
	//console.log(signsIconAll);

	for(let i = 0; i < signsIconAll.length; i++) {
		let questionIcon = signsIconAll[i].children[0]; // иконка - ?

		let chosenDataBlock = questionIcon.parentElement.dataset.block; // значение data-block блока с УЗ
		if(chosenDataBlock !== undefined) { 
			questionIcon.addEventListener("click", function() { showHideSignsSeveral(signsIconAll[i],chosenDataBlock) });
		} else {
			questionIcon.addEventListener("click", showHideSigns); // УЗ только 1 на странице
		}
	}

	// * функция отображения/скрытия условных знаков (если их несколько на странице)
	// принимает текущий блок иконок (открытия и закрытия) и значение атрибута data-block
	function showHideSignsSeveral(icons,data) {
		//console.log(icons);
		//console.log(data);

		let openIcon = icons.children[0]; // иконка открытия - ?
		let closeIcon = icons.children[1]; // иконка закрытия - x

		let signImg = document.querySelector(`.signs-image[data-block="${data}"]`); // соотв. изображение с УЗ
		//console.log(signImg);

		signImg.classList.add("shown-signs"); // показать усл. знаки
		openIcon.style.display = "none"; 

		closeIcon.style.display = "block";
		closeIcon.style.zIndex = "9000";
		closeIcon.style.position = "absolute"; // !

		// другое позиционирование иконки закрытия УЗ для общих УЗ
		if(data === "general") {
			closeIcon.style.top = "7px"; // !
			closeIcon.style.right = "4px"; // !
		} else {
			closeIcon.style.top = "-15px"; // !
			closeIcon.style.right = "0"; // !
		}
		
		closeIcon.addEventListener("click", function() {
			openIcon.style.display = "block";
			openIcon.style.zIndex = "999";
			//closeIcon.style.zIndex = "-1";
			closeIcon.style.display = "none";
			signImg.classList.remove("shown-signs"); // скрыть усл. знаки
		});
	}

	// * функция отображения/скрытия условных знаков (если одни на странице)
	function showHideSigns() {
		let questionIcon = document.querySelector(".signs-icon img:nth-of-type(1)"); // иконка открытия - ? 

        signsImageAll[0].classList.add("shown-signs"); // показать усл. знаки
        questionIcon.style.display = "none";

        let closeIcon = document.querySelector(".signs-icon img:nth-of-type(2)"); // иконка закрытия - x
        closeIcon.style.display = "block";
        closeIcon.style.zIndex = "9000";

        closeIcon.addEventListener("click", function() {
            questionIcon.style.display = "block";
            questionIcon.style.zIndex = "999";
            //closeIcon.style.zIndex = "-1";
			closeIcon.style.display = "none";
            signsImageAll[0].classList.remove("shown-signs"); // скрыть усл. знаки
        });
	}

	// * КНОПКИ УПРАВЛЕНИЯ ПАНЕЛЬЮ С ОБЪЕКТАМИ

	let submenu = document.querySelector(".submenu");
	let shownEye = document.querySelector(".shown-eye-btn"); // открытый глаз
	let hiddenEye = document.querySelector(".hidden-eye-btn"); // перечеркнутый глаз
	let pinnedSubmenuIcon = document.querySelector(".pinned-submenu"); // кнопка
	let unpinnedSubmenuIcon = document.querySelector(".unpinned-submenu"); // перечеркнутая кнопка

	let burgermenuBlock = document.querySelector(".burgermenu"); // блок бургер-меню
	let burgermenuBtn = document.querySelector(".burgermenu-btn-open"); // иконка бургер-меню
	let burgermenuCloseBtn = document.querySelector(".burgermenu-btn-close"); // крестик закрытия бургер-меню
	let burgermenu = document.querySelector(".burgermenu .nav"); // само бургер-меню

	// * Отслеживание ширины окна браузера и изменение позиционирования бургер-меню и его иконок
	function getBurgerMenuBtnOffset() {

		// отслеживаем ширину экрана браузера (значение в px)
		if(window.innerWidth <= 1170) {
			burgermenuBtn.style.top = "15px"; // кнопка меню
			burgermenuBtn.style.left = "15px";

			burgermenuBlock.style.top = "-1px"; // само меню
			burgermenuBlock.style.left = "-1px";
			//burgermenuBlock.style.position = "sticky";

			burgermenuCloseBtn.style.top = 0; // крестик закрытия
			burgermenuCloseBtn.style.left = 0;

		} else if(window.innerWidth <= 1200) {
			burgermenuBtn.style.top = "15px"; 
			burgermenuBtn.style.left = "15px";

			burgermenuBlock.style.top = "-1px"; 
			burgermenuBlock.style.left = "-86px";
			//burgermenuBlock.style.position = "sticky";

			burgermenuCloseBtn.style.top = 0;
			burgermenuCloseBtn.style.left = "calc(50% - 16px)";

		} else {
			burgermenuBtn.style.top = "15px"; 
			burgermenuBtn.style.left = "-70px";

			burgermenuBlock.style.top = "-1px"; 
			burgermenuBlock.style.left = "-86px";
			//burgermenuBlock.style.position = "sticky";

			burgermenuCloseBtn.style.top = 0;
			burgermenuCloseBtn.style.left = 0;
		}
	}
	getBurgerMenuBtnOffset();

	// * ---- Прилипание и отлипание списка объектов
	// При прилипании списка с объектами появляется иконка глаза (= панель отображается)
	/*создаем перед 'sticky'-элементом "сентинель" и следим за его видимостью. 
	  Когда сентинель исчезнет из поля зрения, элемент перейдет в режим прилипания.
	*/

	const sentinel = document.createElement('div');
	//document.querySelector(".sign-block").before(sentinel);
	submenu.before(sentinel);
	switchPinnedEffect(); // вызов функции

	// функция переключения между реакцией элементов при прилипании и отлипании панели подменю/списка
	function switchPinnedEffect() {
		new IntersectionObserver(
			([entry]) => {
				// * "прилипание" блока (когда элемент не наблюдается)
				if (!entry.isIntersecting) {
					//console.log('Sticky-элемент активирован!');

					// если иконка присутствует на странице
					if(pinnedSubmenuIcon !== null && pinnedSubmenuIcon.classList.contains("unpinned-flag")) {
						burgermenuBlock.style.display = "none"; // если панель откреплена, стили блока бургер-меню "не скачут"
					} else {
						// отобразить иконку бургер-меню, скрыть основное меню в шапке
						burgermenuBlock.style.display = "grid";
						burgermenuBtn.classList.add("burgermenu-btn-open-shown");

						// определение смещения кнопки бургер-меню и крестика в зависимости от ширины окна
						window.addEventListener("resize", getBurgerMenuBtnOffset);
						
						burgermenuBtn.addEventListener("click", showMenu);
					}
					
					if(pinnedSubmenuIcon !== null && !pinnedSubmenuIcon.classList.contains("unpinned-flag")) {
						//console.log("Панель закреплена и ею можно управлять!");
						//console.log(pinnedSubmenuIcon);
	
						submenu.classList.add("is-pinned");
						document.querySelector(".is-pinned").style.borderBottom = "1px solid #1b1b1b";
						pinnedSubmenuIcon.classList.add("is-hidden");

						if(shownEye.classList.contains("unpinned-flag")) {
							shownEye.classList.remove("is-shown");
						} else {
							shownEye.classList.add("is-shown");
						}

					}   // иначе панель должна быть недоступна,т.к. откреплена
				}
	
				// * отмена "прилипания" блока
				if (entry.isIntersecting) {
					//console.log('Не активирован!');

					// скрыть иконку бургер-меню, крестик, само меню
					burgermenuBlock.style.display = "none";
					burgermenuBtn.classList.remove("burgermenu-btn-open-shown");
					burgermenuCloseBtn.classList.remove("burgermenu-btn-close-shown");
					burgermenuBlock.classList.remove("burgermenu-shown");
					burgermenu.classList.remove("burgermenu-nav-shown");

					document.querySelector(".submenu").style.borderBottom = "2px solid transparent";
					submenu.classList.remove("is-pinned");

					if(shownEye !== null && hiddenEye !== null && pinnedSubmenuIcon !== null) {
						shownEye.classList.remove("is-shown");
						hiddenEye.classList.remove("is-shown");

						if(pinnedSubmenuIcon.classList.contains("unpinned-flag")) {
							pinnedSubmenuIcon.classList.add("is-hidden");
						} else {
							pinnedSubmenuIcon.classList.remove("is-hidden");
						}
					}
				}
			}, 
			{ rootMargin: '0px 0px 0px 0px', threshold: [0] }
		).observe(sentinel);

	}

	// * функция отображения меню при клике на кнопку бургер-меню
	function showMenu() {
		//console.log('Показать меню!');

		// поменять кнопку на крестик
		burgermenuCloseBtn.classList.add("burgermenu-btn-close-shown");
		burgermenuBtn.classList.remove("burgermenu-btn-open-shown");
		burgermenuCloseBtn.addEventListener("click", closeMenu);

		burgermenuBlock.classList.add("burgermenu-shown");
		burgermenu.classList.add("burgermenu-nav-shown");

	}

	// * функция скрытия меню при клике на крестик
	function closeMenu() {
		//console.log('Скрыть меню!');

		burgermenuCloseBtn.classList.remove("burgermenu-btn-close-shown");
		burgermenuBtn.classList.add("burgermenu-btn-open-shown");

		burgermenuBlock.classList.remove("burgermenu-shown");
		burgermenu.classList.remove("burgermenu-nav-shown");
	}

	// * ---- При наведении на глаз иконка меняется на перечеркнутую, при уходе курсора - обратно
	// если иконка присутствует на странице
	if(shownEye !== null) {
		shownEye.addEventListener("mouseover", switchEye);
	}

	function switchEye() {
		if(submenu.classList.contains("is-pinned")) { // глазики появляются, только если панель закреплена
			if(shownEye.classList.contains("is-shown")) {
				shownEye.classList.remove("is-shown");
				hiddenEye.classList.add("is-shown");
				hiddenEye.addEventListener("mouseout", switchEye);
			} else {
				shownEye.classList.add("is-shown");
				hiddenEye.classList.remove("is-shown");
			}
		}
	}

	// * ---- При клике на глаз панель перестает быть sticky и возвращается на место (position меняются)
	// если иконка присутствует на странице
	if(hiddenEye !== null) { 
		hiddenEye.addEventListener("click", hideSubmenu);
	}

	function hideSubmenu() {
		//console.log('Скрыть панель со списком объектов');
		submenu.style.position = "relative";
		document.querySelector(".is-pinned").style.borderBottom = "2px solid transparent";
		burgermenuBlock.style.display = "none";

		shownEye.classList.remove("is-shown");
		shownEye.classList.add("is-hidden");
		shownEye.classList.add("unpinned-flag");

		unpinnedSubmenuIcon.classList.add("is-shown");
		pinnedSubmenuIcon.classList.add("unpinned-flag");
	}
	
	// * При клике на перечеркнутую кнопку список с объектами закрепляется, только если присутствуют иконки глаза и закрепления меню
	unpinnedSubmenuIcon.addEventListener("click", function() {
		unpinnedSubmenuIcon.classList.remove("is-shown");

		if(shownEye !== null && pinnedSubmenuIcon !== null) {
			pinnedSubmenuIcon.classList.remove("is-hidden");
			pinnedSubmenuIcon.classList.remove("unpinned-flag");

			submenu.style.position = "sticky";
			shownEye.classList.remove("is-hidden");
			shownEye.classList.remove("unpinned-flag");
			
			switchPinnedEffect();
		}
		
	});	

	// * ОБЪЕКТЫ, ПОЛИГОНЫ, ИНФОРМАЦИЯ

	let objects = document.querySelectorAll("svg polygon"); // объекты (полигоны)
	let arrObjects = Array.from(objects);

	let objectsInfo = document.querySelectorAll(".item-block"); // спозиционированные блоки с информацией
	let arrObjectsInfo = Array.from(objectsInfo);

    let infoIcons = document.querySelectorAll(".info-icon"); // иконки i над блоком
	let arrInfoIcons =  Array.from(infoIcons);

	// * ---- При переходе (клике) по ссылке из списка локаций подсвечивается нужный объект 

	let locationListItems = document.querySelectorAll(".location-list a");
	let arrLocationListItems = Array.from(locationListItems);

	for(let i = 0; i < arrLocationListItems.length; i++) {
		//console.log(arrLocationListItems[i]);
		let idName = arrLocationListItems[i].hash.slice(1); // значение в href без символа #

		// выделение полигона при клике, скрытие прочих выделений, прокручивание страницы до полигона
		arrLocationListItems[i].addEventListener("click", function (e) {
			e.preventDefault();
			hidePreviousInfo(); // вызов функции
			switchToObject(idName);
		});

	}

	// * функция выделяет границей полигон, на который совершен переход + прокручивает страницу
	function switchToObject(id) {
		//console.log(id);

		let polygons = document.querySelectorAll(".map-block polygon");
		
		for(let i = 0; i < polygons.length; i++) {
			polygons[i].classList.remove("active-polygon");

			if(polygons[i].id === id) {
				polygons[i].classList.add("active-selected-polygon"); // выделение объекта из списка
				scrollPageToObj(polygons[i]); // ! вызов функции из другого файла

				// при клике на уже выделенный объект
				polygons[i].addEventListener("click", function() { 
					if(this.classList.contains("active-selected-polygon")) {
						this.classList.remove("active-selected-polygon");
					}
				});
			}
		}
	}

	// * функция прокручивания страницы до полигона (с учетом наличия или отсутствия зафиксированной панели)
	// в файле ./scripts/script_scroll_...

	// * функция скрывает все выделенные ранее объекты и открытые блоки с информацией, если есть
	// * при наведении на объект из списка
	function hidePreviousInfo() {
		//console.log("Прячем все выделения и инфу");
		//console.log(arrObjects);
		//console.log(arrObjectsInfo);
		//console.log(arrInfoIcons);

		// проверяем по объектам
		for(let i = 0; i < arrObjects.length; i++) {
			if(arrObjects[i].classList.contains("active-selected-polygon")) {
				arrObjects[i].classList.remove("active-selected-polygon");
			}
			if(arrObjects[i].classList.contains("active-polygon")) {
				arrObjects[i].classList.remove("active-polygon");
			}
		}

		// проверяем по инфо
		for(let j = 0; j < arrObjectsInfo.length; j++) {
			if(arrObjectsInfo[j].classList.contains("shown-item")) {
				arrObjectsInfo[j].classList.remove("shown-item");
			}
		}

		// проверяем по иконкам i
		for(let k = 0; k < arrInfoIcons.length; k++) {
			if(arrInfoIcons[k].classList.contains("hidden-info-icon")) {
				arrInfoIcons[k].classList.remove("hidden-info-icon");
			}
		}
	}

	// * ----- При клике на объект открывается информация по нему, прячется иконка i

	// перебор объектов, вызов функции при клике
	for(let i = 0; i < arrObjects.length; i++) {
		//arrObjects[i].addEventListener("click", showHideInfo);
		arrObjects[i].addEventListener("click", function() { showHideInfo(arrObjects[i]) });
	}

	// перебор иконок i, вызов функции при клике
	for(let i = 0; i < arrInfoIcons.length; i++) {

		arrInfoIcons[i].addEventListener("click", function() {

			for(let j = 0; j < arrObjects.length; j++) {
		
				// атрибуты иконки и полигона совпадают
				if(arrInfoIcons[i].dataset.object === arrObjects[j].dataset.object) { 
						//console.log("Совпадает с кликнутой иконкой!");
						//console.log(arrObjects[j]);
					showHideInfo(arrObjects[j]);
				}
			}
		});
	}

	// * Функция показа/скрытия иконки "i" выбранного полигона, показа/скрытия информации о нем
	function showHideInfo(obj) {
			//console.log("Прячем / показываем инфу");
			//console.log(e.target);
			//console.log(obj);
			//console.log(obj); 

		let selectedObj = obj.dataset.object; // значение атрибута объекта, по которому кликнули

		highlightPolygon(obj); //  вызов функции выделения полигона 
		showHideIcon(); // вызов функции скрытия и показа иконки i

		// показ / скрытие информации
		// перебор блоков с информацией
		for(let j = 0; j < arrObjectsInfo.length; j++) {

			if(arrObjectsInfo[j].dataset.object === selectedObj) {
				// выбираем блок с совпадающим атрибутом (с объектом)
				let selectedObjInfo = document.querySelector('.item-block[data-object = "' + selectedObj + '"]');
				let infoIcon = document.querySelector('.' + selectedObj + '-info-icon'); // иконка i выбранного объекта
				
				// перещелкивание между показом и скрытием блока с информацией
				if(selectedObjInfo.classList.contains("shown-item")) {
					// если информация не отображается - показываем иконку i (удаляем класс hidden-info-icon)
					selectedObjInfo.classList.remove("shown-item");
					infoIcon.classList.remove("hidden-info-icon");
				} else {
					// если показана информация - убираем иконку i (добавляем класс hidden-info-icon)
					selectedObjInfo.classList.add("shown-item");
					infoIcon.classList.add("hidden-info-icon");
				}

			} else {
				// * скрытие предыдущих отображенных блоков с информацией
				// если атрибут не совпадает, но элемент включает класс - удаляем этот класс

				if(arrObjectsInfo[j].classList.contains("shown-item")) {
					arrObjectsInfo[j].classList.remove("shown-item");
				}
			}
		}

	}

	// * Функция выделения _выбранного_ полигона (перебор элементов массива объектов)
	function highlightPolygon(obj) {
			//console.log(obj); //кликнутый полигон

		for(let elem of arrObjects) {
				//console.log(elem); // элемент массива

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

	// * Функция показа / скрытия иконки i над полигоном (объектом)
	function showHideIcon() {
		// для всех объектов: если иконка i не показана - показываем
		for(let i = 0; i < arrInfoIcons.length; i++) {
			if(arrInfoIcons[i].classList.contains("hidden-info-icon")) {
				arrInfoIcons[i].classList.remove("hidden-info-icon");
			} 
		}
	}
	
	// * ---- Прокручивание страницы вверх при клике на кнопку "стрелка вверх"
	let upBtn = document.querySelector(".up-btn");
	upBtn.addEventListener("click", function() {
		//event.preventDefault();
		const anchor = document.querySelector(".container");
		anchor.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
			});

	});

}