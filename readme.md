#  Pole playing location schemes info site (HTML | CSS | JS)

[Switch to Russian | Переключиться на русский](./readme-ru.md)

## About the project
The site includes basic information about the location of objects within the role-playing world.

**Tools:** 
![image](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white "Visual Studio Code")

**Stack:** 
![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white "HTML") 
![image](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white "CSS") 
![image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E "JS") 

**Демо:** [Перейти на сайт](https://the-all-spark.github.io/rp_location_schemes/)  
<img src="./assets/screenshot/main-page.jpg" width="600" alt="Главная страница">

## Realized functionality:
1. _main menu_: navigation through the pages of the site - base levels;
2. _additional menu_ in the form of a “sticking” panel (the main objects on the current page are listed). When the panel “sticks”:
    - the eye icon appears:
      - when hovering over the eye icon, it changes to the crossed-out eye icon;
      - when clicking on the crossed-out eye, the panel with objects “sticks” (the pin icon opposite the list of objects becomes crossed out).
    - the burger menu icon appears:
      - when clicking on the icon the menu that duplicates the main menu of the page opens; the icon changes to a cross;
      - when clicking on the cross the menu closes.
3. When clicking on the crossed-out pin icon, the panel “sticks” again and is displayed at the top when scrolling down the page;
4. When clicking on the question icon the _image with conditional signs_ for the current page displays; the icon changes to a cross. When the icon is clicked again, the image closes.
5. When clicking on an object (in the object list or when the panel is pinned), it is highlighted; the page scrolls directly to the object (the amount of offset is calculated based on whether the panel is pinned or not);
6. When hovering over an object, it is highlighted (for mobile devices, the object that has information is additionally marked with an “i” icon);
7. When clicking on an object:
    - it is highlighted with a maroon frame/outline; 
    - the “i” icon is hidden;
    - a _block with information_ about the object is displayed.
8. Clicking on the object again removes the selection by the frame/outline, displays the “i” icon, hides the block with information;
9. Clicking on the _“Arrow” (Up)_ icon scrolls the page smoothly to the main menu. 
10. Responsive layout.

## Functional demonstration  
|      Description |   Screenshot   | 
|------------------|----------------|
|“Sticking” of the panel with objects | <img src="./assets/screenshot/panel_is_sticky.jpg" width="500" alt='“Sticking” of the panel with objects'> |
| Opened burger menu and the effect when hovering over the “Hide Panel” icon  | <img src="./assets/screenshot/burgermenu_hide_panel.jpg" width="600" alt='Opened burger menu and the effect when hovering over the “Hide Panel” icon'> |
| The panel is not pinned. The pin icon has changed to a crossed out icon. | <img src="./assets/screenshot/panel_is_unsticked.jpg" width="600" alt='The panel is not pinned. The pin icon has changed to a crossed out icon.'>  |
| Object highlighting and page scrolling (on the example of the base) | <img src="./assets/screenshot/move_to_base.jpg" width="600" alt='Object highlighting and page scrolling (on the base example)'> |
| Displaying information about an object (on the example of the base) | <img src="./assets/screenshot/object_info.jpg" width="600" alt='Displaying information about an object (on the example of the base)'>  
| Conditional sign image for the current page | <img src="./assets/screenshot/page_signs.jpg" width="600" alt='Conditional sign image for the current page'> |