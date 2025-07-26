// avatar upload and preview
const dropArea = document.querySelector("#dropArea")
	const inputFile = document.querySelector("#myFile")
	const imageView = document.querySelector("#image-view")
	const button = document.querySelector("button")

	inputFile.addEventListener("change", uploadImage);

	function uploadImage() {
		let imgLink = URL.createObjectURL(inputFile.files[0]);
		imageView.style.backgroundImage = `url(${imgLink})`;
		button.disabled = false
	}