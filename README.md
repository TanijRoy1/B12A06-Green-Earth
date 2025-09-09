## JavaScript ES6 Concepts


## 1. What is the difference between `var`, `let`, and `const`?

- `var` is function-scoped, it can be re-declared and re-assigned, and it is hoisted with the value `undefined`.

- `let` is block-scoped, it can be re-assigned but not re-declared in the same scope, and it is hoisted but stays in a temporal dead zone until declared.
  
- `const` is also block-scoped, it cannot be re-assigned or re-declared, and it is hoisted but also in the temporal dead zone.

---



## 2. What is the difference between `map()`, `forEach()`, and `filter()`?

- `forEach()` executes a function on each array element but always returns `undefined`.
- `map()` executes a function on each array element and returns a new array of the same length with the transformed values.
- `filter()` executes a condition on each array element and returns a new array with only the elements that pass the condition.

---



## 3. What are `arrow functions` in ES6?

- Arrow functions are a shorter syntax for writing functions.
- They do not have their own `this` and instead take `this` from the surrounding scope.
- They cannot be used as constructors with `new`. 
- They are mostly used for callbacks and small concise functions. 

---



## 4. How does `destructuring assignment` work in ES6?

**Destructuring** allows us to extract values from arrays or objects into variables directly.
### Example:
```js
const [a, b] = [10, 20];  
// a = 10, b = 20 
````


---

## 5. Explain `template literals` in ES6. How are they different from string concatenation?

- Template literals are strings written inside backticks `(``)`.
- They allow us to use `${}` for embedding variables or expressions inside a string.
- They also support multi-line strings without using `\n`.
- They are different from string concatenation because concatenation uses the `+` operator and becomes harder to read, especially when mixing variables and text, while template literals are more readable and flexible.

### Example:
```js
const name = "Abul";
const age = 22;

// Using concatenation
console.log("His name is " + name + " and He is " + age + " years old.");

// Using template literals
console.log(`His name is ${name} and He is ${age} years old.`);
````



---

