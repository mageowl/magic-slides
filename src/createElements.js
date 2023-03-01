const slidesElement = document.querySelector("#slides");

export default function createElements(fileText, clickCallback) {
	const slides = fileText.split("\n---\n").map((str) => str.trim());

	let elements = [];
	let skipped = [];
	let firstSlide = 0;
	slides.forEach((slideText, index) => {
		const element = document.createElement("div");
		element.innerHTML = marked.parse(slideText);
		element.classList.add("slide");

		if (element.children.length > 1) {
			element.querySelectorAll("style").forEach((el) => {
				el.outerHTML = `<style-disabled>${el.innerHTML}</style-disabled>`;
			});
		} else if (element.children[0] instanceof HTMLStyleElement) {
			if (index === firstSlide) {
				element.classList.remove("slide");
				firstSlide += 1;
			}

			skipped.push(index);
		}

		element.addEventListener("click", clickCallback);

		elements.push(element);
	});

	elements[firstSlide].classList.add("current");
	slidesElement.append(...elements);

	return { elements, skipped, slides };
}
