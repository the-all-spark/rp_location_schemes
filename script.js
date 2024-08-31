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

	// * При клике на объект открывается информация по нему

	


	
}