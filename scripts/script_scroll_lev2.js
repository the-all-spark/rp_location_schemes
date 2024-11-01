// * функция прокручивания страницы до полигона (с учетом наличия или отсутствия зафиксированной панели)

function scrollPageToObj(obj) {
    let bodyRect = document.body.getBoundingClientRect();
    let elemRect = obj.getBoundingClientRect();
    
    let offset   = elemRect.top - bodyRect.top; // значение top элемента относительно body 
    //let offsetTop = offset - 90;

    scrollTo({ 
        top: `${offset}`, 
        behavior: 'smooth'
    });

}