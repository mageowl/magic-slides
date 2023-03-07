<style>
	.big {
		font-size: 9em;
	}
</style>

---

<h1 class='big'> <img src="magic-wand.png" /></h1>

# Magic Slides

### Effortlessly Made Slide Decks

---

![column left](windows-xp.png)

## Magic Slides will auto-generate a slideshow!

It works by using a [markdown](https://markdownguide.org/basic-syntax) file, which means you can have **bold**, _italic_, or ~~striked text~~.  
You can also link to other slides by linking to `#n`: [#1](#1).  
Then you can print it out, or export it as a file or pdf document. To write a slide deck, just type plain text into a .md file.  
Then, separate your slides with `---` (three dashes in a row). Make sure to put it in it's own paragraph.

---

<style>
	.slide {
		background: #ff6640;
		color: white;
		box-shadow: 0 0 8px 4px rgba(90, 35, 35, 0.146);
	}

	.animated {
		animation: 1s ease-in-out infinite bounce;
		display: inline-block;
	}

	@keyframes bounce {
		from {
			translate: 0 3px
		}
		50% {
			translate: 0 -3px;
		}
		to {
			translate: 0 3px
		}
	}
</style>

![column right](windows-xp.png)

## If you don't like it, change it!

This slide is red. Isn't that cool? Magic Slides supports CSS out of the box. This means you can change the font, background, and <span class="animated">animate it!</span>
