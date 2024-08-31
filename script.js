window.onload = function() {

	// *Показать условные знаки при клике на иконку с вопросом

	let signImage = document.querySelector(".signs-icon img");
	signImage.addEventListener("click", showSigns);

	function showSigns() {
		document.querySelector(".signs-outside-image").classList.toggle("shown-signs");
	}

	// * При клике на объект открывается информация по нему

	

    
	
}