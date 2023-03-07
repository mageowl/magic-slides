const slidesElement = document.querySelector("#slides");

/**
 *
 * @param {MouseEvent} e
 */
function cancel(e) {
	e.stopImmediatePropagation();
}

/**
 *
 * @param {string} fileText
 * @param {Function} clickCallback
 * @returns
 */
export default function createElements(fileText, clickCallback, setSlide) {
	const slides = fileText
		.replaceAll("\r", "")
		.split("\n---\n")
		.map((str) => str.trim());

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

		element
			.querySelectorAll("p:has(> img[alt='column left'])")
			.forEach((p) => p.classList.add("column-left"));
		element
			.querySelectorAll("p:has(> img[alt='column right'])")
			.forEach((p) => p.classList.add("column-right"));

		element.querySelectorAll("a").forEach((a) => {
			if (a.getAttribute("href").startsWith("#")) {
				let slideNumber = parseInt(a.getAttribute("href").slice(1));
				if (!isNaN(slideNumber))
					a.addEventListener("click", () => setSlide(slideNumber));
			}

			a.addEventListener("click", cancel);
		});

		element.addEventListener("click", clickCallback);

		elements.push(element);
	});

	elements[firstSlide].classList.add("current");
	slidesElement.append(...elements);

	return { elements, skipped, slides };
}
