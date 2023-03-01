/**
 * @type {HTMLInputElement}
 */
const fileInput = document.querySelector("#markdown-file");
const slidesElement = document.querySelector("#slides");
let slides = [];

fileInput.addEventListener("input", async () => {
	fileInput.style.display = "none";

	const file = fileInput.files[0];
	let fileText = await file.text();
	generateSlides(fileText);
});

function generateSlides(fileText) {
	slides = fileText.split("---").map((str) => str.trim());

	let elements = [];
	let firstSlide = 0;
	slides.forEach((slideText, index) => {
		const element = document.createElement("div");
		element.innerHTML = marked.parse(slideText);
		element.classList.add("slide");

		if (element.children.length > 1) {
			element.querySelectorAll("style").forEach((el) => {
				el.outerHTML = `<style-disabled>${el.innerHTML}</style-disabled>`;
			});
		} else if (
			index === firstSlide &&
			element.children[0] instanceof HTMLStyleElement
		) {
			element.classList.remove("slide");
			console.log("yep");
			firstSlide += 1;
		}

		elements.push(element);
	});

	elements[firstSlide].classList.add("current");
	slidesElement.append(...elements);
}
