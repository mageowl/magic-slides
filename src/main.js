import createElements from "./createElements.js";

/**
 * @type {HTMLInputElement}
 */
const fileInput = document.querySelector("#markdown-file");
const slideDeckMD = document.querySelector("script[type='slides']");
const slidesElement = document.querySelector("#slides");

const FILE_LOADED = Symbol("FILE_LOADED");
let fileText = "";
let elements = [];
let skipped = [];

fileInput.addEventListener("input", async () => {
	fileInput.style.display = "none";

	const file = fileInput.files[0];
	fileText = await file.text();

	({ elements, skipped } = createElements(fileText, nextSlide, setSlide));
});

if (slideDeckMD != null) {
	fileInput.style.display = "none";

	fileText = FILE_LOADED;
	({ elements, skipped } = createElements(
		slideDeckMD.innerText,
		nextSlide,
		setSlide
	));
}

window.addEventListener("keydown", (e) => {
	console.log(e.key);
	if (e.key === "ArrowLeft") prevSlide();
	else if (e.key === "ArrowRight" || e.key === " ") nextSlide();
	else if (e.key === "e") exportDeck();
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

	setSlide(nextIndex);
}

function prevSlide() {
	const currentSlide = document.querySelector(".slide.current");
	let prevIndex = elements.indexOf(currentSlide) - 1;

	let checkSkip = () => {
		let shouldSkip = skipped.includes(prevIndex);
		prevIndex -= shouldSkip ? 1 : 0;
		if (shouldSkip) checkSkip();
	};
	checkSkip();

	setSlide(prevIndex);
}

function setSlide(n) {
	const currentSlide = document.querySelector(".slide.current");

	if (n > elements.length - 1 || skipped.includes(n) || n < 0) return;
	if (currentSlide != null) {
		currentSlide.classList.remove("current");

		currentSlide.querySelectorAll("style").forEach((el) => {
			el.outerHTML = `<style-disabled>${el.innerHTML}</style-disabled>`;
		});
	}

	const newSlide = elements[n];
	newSlide.classList.add("current");

	newSlide.querySelectorAll("style-disabled").forEach((el) => {
		el.outerHTML = `<style>${el.innerHTML}</style>`;
	});
}

async function exportDeck() {
	if (fileText === FILE_LOADED) return;

	const exportTemplate = await (await fetch("./export.html")).text();
	let file = exportTemplate
		.replace("{{SLIDEDECK}}", fileText)
		.replace("{{TITLE}}", slidesElement.querySelector("h1").innerText);

	download("slide-deck.html", file);
}

function download(filename, text) {
	var element = document.createElement("a");
	element.setAttribute(
		"href",
		"data:text/plain;charset=utf-8," + encodeURIComponent(text)
	);
	element.setAttribute("download", filename);

	element.style.display = "none";
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}
