# Brew & Byte Café - Landing Page & JavaScript Drill

A responsive, accessible one-page website for **Brew & Byte Café**, built with semantic HTML5, modern CSS (Flexbox & CSS Grid), and event delegation in vanilla JavaScript. Includes an in-depth JavaScript output drill analyzing 10 core concepts frequently asked in technical interviews.

---

## Live Demo & Repository
- **GitHub Repository:** [https://github.com/dhanushshenoyh/cafe-landing-page-js-drill](https://github.com/dhanushshenoyh/cafe-landing-page-js-drill)
- **Live Preview:** Open `index.html` in any modern web browser or run via local HTTP server.

---

## Answers to Core Questions

### 1. Specificity Drill: What color is `<p id="price" class="amount">`?

Given the three CSS rules:
```css
#price { color: green; }
.menu .amount { color: red; }
p.amount { color: blue; }
```

#### Prediction & Outcome:
The element `<p id="price" class="amount">` renders in **green**.

#### Explanation using Specificity:
In CSS, when conflicting styles target the same element, browsers calculate selector specificity using a tuple structure `(Inline, ID, Class/Attribute/Pseudo-class, Element/Pseudo-element)`:

1. **`#price`**
   - Specificity: `(0, 1, 0, 0)` &rarr; **1 ID selector**
2. **`.menu .amount`**
   - Specificity: `(0, 0, 2, 0)` &rarr; **2 Class selectors**
3. **`p.amount`**
   - Specificity: `(0, 0, 1, 1)` &rarr; **1 Class selector + 1 Element selector**

Because an ID selector `(0, 1, 0, 0)` strictly outweighs any quantity of class or element selectors, `#price` wins regardless of the order in which the rules appear in the stylesheet. Hence, the text color is `green`.

---

### 2. Box Model Drill: What changes for a 300px-wide card with `box-sizing: border-box`?

Suppose a menu card is styled with:
```css
width: 300px;
padding: 20px;
border: 2px solid #ccc;
```

#### Under default `box-sizing: content-box`:
- The `width: 300px` property applies **only to the inner content area**.
- Padding and borders are added on top of the content width:
  $$\text{Total Width} = 300\text{px (content)} + 40\text{px (left + right padding)} + 4\text{px (left + right border)} = 344\text{px}$$
- This expansion frequently causes elements to break column boundaries, exceed viewport widths, or unintentionally drop onto new rows.

#### Under `box-sizing: border-box`:
- The `width: 300px` defines the **entire outer width** of the card including borders and padding.
- The browser automatically recalculates the content box so everything fits inside 300px:
  $$\text{Inner Content Width} = 300\text{px} - 40\text{px (padding)} - 4\text{px (border)} = 256\text{px}$$
  $$\text{Total Rendered Width} = 300\text{px}$$
- **Result:** The card occupies exactly 300px on screen. It never overflows its grid column, making responsive grid and flexbox calculations completely predictable.

---

## Architectural & Design Decisions

### Semantic, Accessible HTML
- Built strictly with semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<address>`, and `<footer>`.
- **Zero generic `<div>` elements**: Every container uses the correct semantic tag that reflects its purpose.
- Every menu card image includes descriptive, meaningful `alt` text.
- Contact form utilizes explicit `<label for="...">` matching input IDs, appropriate input types (`text`, `email`, `textarea`), and the `required` attribute.
- Accessible focus states (`:focus-visible`) are provided across all interactive elements (navigation links, buttons, inputs) with keyboard tab navigation support.

### CSS Layout: Flexbox vs. CSS Grid
- **Flexbox for the Navbar:** Chosen because navigation is essentially a 1-dimensional layout along a single axis. Flexbox makes distributing space between the logo and navigation links effortless (`justify-content: space-between`) and neatly stacks below `768px`.
- **CSS Grid for the Menu:** Chosen because the menu is a 2-dimensional collection of cards. Using `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))` ensures the cards wrap automatically and size uniformly across 375px mobile screens, tablets, and 1280px desktops without requiring manual breakpoint rules.
- **Header Stickiness:** Implemented via `position: sticky; top: 0; z-index: 100`.
- **Bestseller Badge:** Positioned using `position: absolute` placed inside a parent card with `position: relative`.

### Event Delegation
- Rather than attaching individual event listeners to each "Add to order" button, one click listener is attached to the parent `.menu-grid` container.
- Handled with `event.target.closest('button')` and `data-item` attributes.
- Automatically supports dynamic menu additions through DOM event bubbling.

---

## JavaScript Output Drill (10 Snippets)

All 10 interview snippets were created as standalone runnable files under `snippets/` and executed using Node.js.

The detailed predictions, verified console outputs, and one-line reasons are documented in [PREDICTIONS.md](./PREDICTIONS.md).

To run any snippet:
```bash
node snippets/snippet01.js
node snippets/snippet02.js
# ...
node snippets/snippet10.js
```

---

## Project Structure

```text
cafe-landing-page-js-drill/
├── index.html            # Semantic, accessible HTML structure
├── styles.css            # Responsive layout, variables, specificity rules
├── app.js                # Event delegation & accessible form feedback
├── README.md             # Project documentation & box model / specificity answers
├── PREDICTIONS.md        # JavaScript drill predictions and runtime results
└── snippets/             # Standalone JS snippet files
    ├── snippet01.js
    ├── snippet02.js
    ├── snippet03.js
    ├── snippet04.js
    ├── snippet05.js
    ├── snippet05_var.js
    ├── snippet05_let.js
    ├── snippet06.js
    ├── snippet07.js
    ├── snippet08.js
    ├── snippet09.js
    └── snippet10.js
```

---

## Testing & Verification
- Tested at **375px** (mobile portrait) and **1280px** (desktop).
- Verified keyboard tab navigation order and outline visibility.
- Verified event delegation and live count updating in the header.
- Verified specificity and CSS cascade rendering in Chromium engine.
