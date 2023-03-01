import createElements from "./createElements.js";

/**
 * @type {HTMLInputElement}
 */
const fileInput = document.querySelector("#markdown-file");

let slides = [];
let elements = [];
let skipped = [];

fileInput.addEventListener("input", async () => {
	fileInput.style.display = "none";

	const file = fileInput.files[0];
	let fileText = await file.text();

	({ slides, elements, skipped } = createElements(fileText, nextSlide));
});

function nextSlide() {
	const currentSlide = document.querySelector(".slide.current");
	let nextIndex = elements.indexOf(currentSlide) + 1;

	let checkSkip = () => {
		let shouldSkip = skipped.includes(nextIndex);
		nextIndex += shouldSkip ? 1 : 0;
		if (shouldSkip) checkSkip();
	};
	checkSkip();

	const newSlide = elements[nextIndex];
	currentSlide.classList.remove("current");
	newSlide.classList.add("current");

	currentSlide.querySelectorAll("style").forEach((el) => {
		el.outerHTML = `<style-disabled>${el.innerHTML}</style-disabled>`;
	});
	newSlide.querySelectorAll("style-disabled").forEach((el) => {
		el.outerHTML = `<style>${el.innerHTML}</style>`;
	});
}
