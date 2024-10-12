// * функция прокручивания страницы до полигона (с учетом наличия или отсутствия зафиксированной панели)

function scrollPageToObj(obj) {
    let bodyRect = document.body.getBoundingClientRect();
    let elemRect = obj.getBoundingClientRect();
    
    let offset   = elemRect.top - bodyRect.top; // значение top элемента относительно body 

    console.log(`elemRect.top = ${elemRect.top}`);
    console.log(`bodyRect.top = ${bodyRect.top}`);
    console.log(`offset = ${offset}`);

    let offsetTop;

    // если панель не зафиксирована
    if(!document.querySelector(".submenu").classList.contains("is-pinned")) {
        if(document.querySelector(".pinned-submenu").classList.contains("unpinned-flag")) { // кнопка
            offsetTop = offset - 10;
            console.log("отступ 10");	
        } 
        else {
            offsetTop = offset - 120;	
            console.log("изнач не зафикс / через список / отступ 120");
        }
    } 
    //если панель зафиксирована
    else if (document.querySelector(".burgermenu").style.display === "none") {  // блок бургер-меню
        offsetTop = offset - 175; 
        console.log("отступ 175 - зафиксирована");
    } else {
        offsetTop = offset - 107;
        console.log("зафикс / через панель / отступ 107");	
    }
    //console.log(offsetTop);

    scrollTo({ 
        top: `${offsetTop}`, 
        behavior: 'smooth'
    });
}