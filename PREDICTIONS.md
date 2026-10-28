# JavaScript Output Drill - Predictions & Results

This document contains predictions, actual outputs run via Node.js (v22), and explanations for all 10 classic JavaScript interview snippets.

---

### Snippet 1
```javascript
console.log(a);
var a = 5;
```
- **Prediction:** `undefined`
- **Real Output:** `undefined`
- **Why:** `var` declarations are hoisted to the top of their scope and initialized with `undefined` during the creation phase before execution starts.

---

### Snippet 2
```javascript
console.log(b);
let b = 5;
```
- **Prediction:** `ReferenceError: Cannot access 'b' before initialization`
- **Real Output:** `ReferenceError: Cannot access 'b' before initialization`
- **Why:** `let` is hoisted but remains uninitialized in the Temporal Dead Zone (TDZ) from the start of the block until its declaration is evaluated.

---

### Snippet 3
```javascript
sayHi();
function sayHi() {
  console.log('hi');
}
```
- **Prediction:** `hi`
- **Real Output:** `hi`
- **Why:** Function declarations are completely hoisted along with their function body, allowing them to be called anywhere within their scope.

---

### Snippet 4
```javascript
const c = makeCounter();
c();
c();
console.log(c());
```
*(where `makeCounter` returns `() => ++count`)*
- **Prediction:** `3`
- **Real Output:** `3`
- **Why:** The returned arrow function creates a closure that preserves and increments the `count` variable in `makeCounter`'s lexical environment across each call.

---

### Snippet 5 (Version A - `var`)
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i));
}
```
- **Prediction:** `3`, `3`, `3`
- **Real Output:**
  ```text
  3
  3
  3
  ```
- **Why:** `var` is function/globally scoped, so all three timer callbacks reference the same mutable variable `i`, which evaluates to `3` when the event loop executes the queued macrotasks after the loop completes.

---

### Snippet 5 (Version B - `let`)
```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i));
}
```
- **Prediction:** `0`, `1`, `2`
- **Real Output:**
  ```text
  0
  1
  2
  ```
- **Why:** `let` is block-scoped, so JavaScript creates a fresh, separate lexical binding of `i` for each iteration of the loop, which each timer callback captures individually.

---

### Snippet 6
```javascript
function intro(city) {
  return `${this.name} from ${city}`;
}
console.log(
  intro.call({ name: 'Ravi' }, 'Pune'),
  intro.bind({ name: 'Meena' })('Delhi')
);
```
- **Prediction:** `Ravi from Pune Meena from Delhi`
- **Real Output:** `Ravi from Pune Meena from Delhi`
- **Why:** `.call()` immediately executes `intro` with explicit `this` (`{ name: 'Ravi' }`) and arguments, whereas `.bind()` returns a new bound function with `this` permanently set to `{ name: 'Meena' }`, which is then invoked with `'Delhi'`.

---

### Snippet 7
```javascript
const user = {
  name: 'Asha',
  regular() {
    return this.name;
  },
  arrow: () => this.name,
};
console.log(user.regular(), user.arrow());
```
- **Prediction:** `Asha undefined`
- **Real Output:** `Asha undefined`
- **Why:** Regular methods dynamically bind `this` to the calling object (`user`), while arrow functions do not have their own `this` and lexically inherit `this` from the outer scope (which is `module.exports` / `{}` in Node.js, where `.name` is `undefined`).

---

### Snippet 8
```javascript
console.log(0 == '0', 0 === '0', null == undefined, [] == false);
```
- **Prediction:** `true false true true`
- **Real Output:** `true false true true`
- **Why:** `0 == '0'` coerces the string to a number (0 == 0); `===` checks type without coercion (number vs string); `null == undefined` is explicitly defined as true by the loose equality spec; and `[] == false` coerces `[]` to empty string `""`, then to `0`, making `0 == 0` true.

---

### Snippet 9
```javascript
console.log([!!'', !!'0', !![], !!{}, !!NaN]);
```
- **Prediction:** `[ false, true, true, true, false ]`
- **Real Output:** `[ false, true, true, true, false ]`
- **Why:** In JavaScript, empty strings `''` and `NaN` are falsy values, whereas non-empty strings `'0'`, arrays `[]`, and plain objects `{}` are truthy, and `!!` converts them into their boolean equivalents.

---

### Snippet 10
```javascript
console.log(
  [1, 2, 3, 4]
    .filter((n) => n % 2)
    .map((n) => n * 10)
    .reduce((a, b) => a + b, 0)
);
```
- **Prediction:** `40`
- **Real Output:** `40`
- **Why:** `filter(n => n % 2)` keeps odd numbers `[1, 3]`; `map(n => n * 10)` multiplies them to `[10, 30]`; and `reduce((a, b) => a + b, 0)` sums them up: `10 + 30 = 40`.
