// beginner

// 1
const obj = {
  a: 10,
  show() {
    console.log(this.a);
  },
};
obj.show();
// 10

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (show() is a normal function)
// 2. Is it called with an object? (obj.fn())
//    → Yes (obj.show())
//       ⇒ Rule applied: "this = the object before the dot"
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → No
// 5. Otherwise plain function call… (not needed here)

// Final Explanation:
// Since `show` is a *normal function* and it is called as `obj.show()`,
// the value of `this` becomes the object in front of the dot → `obj`.
// Therefore, `this.a` equals obj.a, which is 10, so it prints 10.

//2
const obj = {
  x: 5,
  getX() {
    console.log(this.x);
  },
};
const ref = obj.getX;
ref();
// undefined

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (getX is a normal function)
// 2. Is it called with an object? (obj.fn())
//    → No (we are calling ref(), not obj.getX())
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → No
// 5. Otherwise: plain function call (fn())
//    → Yes
//       ⇒ Rule applied: "plain function call"
//          - In strict mode → this = undefined
//          - In non-strict mode → this = window

// Final Explanation:
// `ref = obj.getX` removes the function from the object.
// When we call `ref()` by itself, there is no object before the dot,
// so `this` does NOT refer to `obj` anymore.
// In strict mode, this becomes undefined → undefined.x → prints undefined.

//3
let user = {
  name: "A",
  say() {
    console.log(this.name);
  },
};
let fn = user.say;
fn();
// undefined

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (say is a normal function)
// 2. Is it called with an object? (obj.fn())
//    → No (fn() is called standalone)
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → No
// 5. Otherwise: plain function call (fn())
//    → Yes
//       ⇒ Rule applied: "plain function call" → this = undefined (strict)

// Final Explanation:
// `fn = user.say` detaches the function from the object.
// When calling `fn()` without an object before it, `this` is undefined,
// so `this.name` becomes undefined and it prints undefined.

//4
let person = {
  age: 30,
  showAge: function () {
    console.log(this.age);
  },
};
person.showAge();
// 30

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (showAge is a normal function)
// 2. Is it called with an object? (obj.fn())
//    → Yes (person.showAge())
//       ⇒ Rule applied: "this = object before the dot"
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → No
// 5. Otherwise plain function call (not needed here)

// Final Explanation:
// The function is called as person.showAge(), so `this` refers to `person`.
// Therefore `this.age` = 30, and it prints 30.

//5
let car = {
  brand: "BMW",
  info() {
    console.log(this.brand);
  },
};
let fn = car.info;
fn();
// undefined

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (info is a normal function)
// 2. Is it called with an object? (obj.fn())
//    → No (fn() is called standalone)
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → No
// 5. Otherwise: plain function call (fn())
//    → Yes
//       ⇒ Rule applied: "plain function call" → this = undefined (strict)

// Final Explanation:
// Assigning fn = car.info removes the function from the object.
// Calling fn() has no object before the dot, so `this` becomes undefined.
// Therefore `this.brand` is undefined, so it prints undefined.

//6
const obj = {
  a: 10,
  show: () => console.log(this.a),
};
obj.show();
// undefined

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → Yes (show is an arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"
// 2. (Other rules are ignored because arrow functions never bind their own this)

// Final Explanation:
// Arrow functions do NOT get their own `this`.
// They use `this` from the surrounding (parent) scope, which here is the global scope.
// In the global scope, `this.a` is undefined.
// So the output is: undefined.

//7
function test() {
  const x = () => console.log(this);
  x();
}
test();
// undefined on strict mode or module type || global on normal

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → Yes (x is an arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"
// 2. Parent scope of x is the function test()
// 3. Is test() called with an object? (obj.test())
//    → No (plain function call)
// 4. Is call/apply/bind used?
//    → No
// 5. Is it created using new?
//    → No
// 6. Otherwise: plain function call
//    → In strict mode: this = undefined
//    → In non-strict mode: this = global object (window in browser, global in Node)

// Final Explanation:
// Arrow function x uses `this` from its parent scope (test function).
// Since test() is called as a plain function, `this` inside test() depends on mode:
// - Strict mode → undefined
// - Non-strict mode → global object
// Therefore, x() prints `undefined` in strict mode or `window/global` in non-strict mode.

//8
let obj = {
  num: 7,
  show() {
    const f = () => console.log(this.num);
    f();
  },
};
obj.show();
// 7

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → Yes (f is an arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"
// 2. Parent scope of f is the method show() of obj
// 3. Is show() called with an object? (obj.show())
//    → Yes
//       ⇒ Rule applied: "this = object before the dot"

// In-depth Explanation of Parent Scope:
// - In JavaScript, arrow functions do NOT have their own `this`.
// - They "capture" the `this` of the surrounding lexical environment, i.e., where they are **defined**, not where they are called.
// - Here, f is **defined inside show()**, which is a method of obj.
// - The `this` inside show() is determined by **how show() is called**. Since we call `obj.show()`, `this` inside show() is `obj`.
// - Therefore, the arrow function f() inherits `this` from show(), which is `obj`.
// - That’s why `this.num` inside f() correctly points to `obj.num`.

// Final Explanation:
// Calling obj.show() executes show() with `this = obj`.
// The arrow function f() inherits this `this` from show(), so `this.num = 7`.
// Hence, f() prints 7.

//9
let obj = { num: 9, show: () => console.log(this.num) };
obj.show();
// undefined

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → Yes (show is an arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"
// 2. Parent scope of show is the global scope (where obj is defined)
// 3. Is show() called with an object? (obj.show())
//    → It does not matter for arrow functions; they ignore the caller object
// 4. Is call/apply/bind used?
//    → No
// 5. Is it created using new?
//    → No

// In-depth Explanation of Parent Scope:
// - Arrow functions do NOT have their own `this`; they capture `this` from where they were defined.
// - show() is defined directly inside obj, but its **lexical parent scope** is the surrounding global scope (not obj itself).
// - In the global scope:
//     - Strict mode → `this = undefined`
//     - Non-strict mode → `this = global object` (window in browser)
// - Therefore, `this.num` looks for `num` on the global object, not on obj, because arrow functions ignore the object calling them.

// Final Explanation:
// Calling obj.show() does NOT change `this` for the arrow function.
// `this` is taken from the surrounding lexical scope (global), so `this.num` is undefined.
// Hence, the output is undefined.

//10
const obj = {
  a: 1,
  b() {
    return () => console.log(this.a);
  },
};
const f = obj.b();
f();
// 1

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → Yes (the function returned by b() is an arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"
// 2. Parent scope of the arrow function is the method b() of obj
// 3. Is b() called with an object? (obj.b())
//    → Yes
//       ⇒ Rule applied: "this = object before the dot" inside b()

// In-depth Explanation of Parent Scope:
// - The arrow function does not have its own `this` and captures it from where it is **defined**.
// - It is defined inside the method b() of obj.
// - b() is called as obj.b(), so `this` inside b() is obj.
// - Therefore, the arrow function inherits `this = obj` from b().
// - When we later call f(), the arrow function still remembers `this = obj`.

// Final Explanation:
// Calling obj.b() returns the arrow function with `this` bound to obj.
// Then calling f() executes the arrow function, printing `this.a = obj.a = 1`.
// Output: 1

// 11
function show() {
  console.log(this);
}
show();
// global object

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (show is a normal function)
// 2. Is it called with an object? (obj.show())
//    → No (plain function call)
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → No
// 5. Otherwise: plain function call
//    → In strict mode: this = undefined
//    → In non-strict mode: this = global object (window in browser, global in Node)

// Final Explanation:
// show() is called as a plain function without an object before the dot.
// Therefore, `this` depends on the mode:
// - Strict mode → undefined
// - Non-strict mode → global object
// So the output is either undefined (strict) or window/global (non-strict).

//12
function show() {
  console.log(this.name);
}
const name = "Global";
show();

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (show is a normal function)
// 2. Is it called with an object? (obj.show())
//    → No (plain function call)
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → No
// 5. Otherwise: plain function call
//    → `this` = global object (in non-strict mode), undefined in strict mode

// Final Explanation:
// show() is a normal function called as a plain function.
// In non-strict mode, `this` refers to the global object (window in browsers).
// However, the variable `name` declared with `const name = "Global"` does NOT become a property of the global object.
// Therefore, `this.name` looks for a property 'name' on the global object, which is undefined.
// Output: undefined

//13
function show() {
  console.log(this.val);
}
const obj = { val: 100 };
obj.fn = show;
obj.fn();
// 100

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (show is a normal function)
// 2. Is it called with an object? (obj.fn())
//    → Yes (obj.fn())
//       ⇒ Rule applied: "this = object before the dot"
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → No

// Final Explanation:
// The function show() is assigned as a method fn of obj.
// Calling obj.fn() makes the object before the dot (`obj`) the value of `this`.
// Therefore, `this.val` = obj.val = 100, and it prints 100.

//14
function print() {
  console.log(this.x);
}
let x = 20;
print();
// undefined

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (print is a normal function)
// 2. Is it called with an object? (obj.print())
//    → No (plain function call)
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → No
// 5. Otherwise: plain function call
//    → In strict mode: this = undefined
//    → In non-strict mode: this = global object

// Final Explanation:
// print() is a normal function called as a plain function.
// `this` refers to the global object in non-strict mode, or undefined in strict mode.
// The variable `x` declared with `let` does NOT become a property of the global object.
// Therefore, `this.x` is undefined, and the output is undefined.

//15
function f() {
  console.log(this.y);
}
var y = 50;
f();
// 50

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (f is a normal function)
// 2. Is it called with an object? (obj.f())
//    → No (plain function call)
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → No
// 5. Otherwise: plain function call
//    → In non-strict mode: this = global object
//    → In strict mode: this = undefined

// Final Explanation:
// f() is a normal function called without an object before the dot.
// In non-strict mode, `this` is the global object.
// However, variables declared with `var` in the global scope do become properties of the global object.
// Therefore, `this.y` = 50 in non-strict mode.
// In strict mode, `this` is undefined, so `this.y` is undefined.

// 16
function show() {
  console.log(this.a);
}
show.call({ a: 10 });
// 10

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (show is a normal function)
// 2. Is it called with an object? (obj.show())
//    → Not exactly; call() is used
// 3. Is call/apply/bind used?
//    → Yes (show.call({ a: 10 }))
//       ⇒ Rule applied: "this = explicitly passed object"
// 4. Is it created using new?
//    → No

// Final Explanation:
// Using show.call({ a: 10 }) explicitly sets `this` to the object { a: 10 }.
// Therefore, `this.a` refers to 10, and it prints 10.

//17
function show() {
  console.log(this.b);
}
show.apply({ b: 20 });
// 20

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (show is a normal function)
// 2. Is it called with an object? (obj.show())
//    → Not exactly; apply() is used
// 3. Is call/apply/bind used?
//    → Yes (show.apply({ b: 20 }))
//       ⇒ Rule applied: "this = explicitly passed object"
// 4. Is it created using new?
//    → No

// Final Explanation:
// Using show.apply({ b: 20 }) explicitly sets `this` to the object { b: 20 }.
// Therefore, `this.b` refers to 20, and it prints 20.

//18
function show() {
  console.log(this.c);
}
const fn = show.bind({ c: 30 });
fn();
//30

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (show is a normal function)
// 2. Is it called with an object? (obj.show())
//    → Not directly; bind() is used
// 3. Is call/apply/bind used?
//    → Yes (show.bind({ c: 30 }))
//       ⇒ Rule applied: "this = explicitly passed object"
// 4. Is it created using new?
//    → No

// Final Explanation:
// show.bind({ c: 30 }) returns a new function with `this` permanently bound to { c: 30 }.
// Calling fn() executes the bound function, so `this.c` = 30, and it prints 30.

//19
const obj = { x: 40 };
function test() {
  console.log(this.x);
}
const newFn = test.bind(obj);
newFn();
// 40

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (test is a normal function)
// 2. Is it called with an object? (obj.test())
//    → Not directly; bind() is used
// 3. Is call/apply/bind used?
//    → Yes (test.bind(obj))
//       ⇒ Rule applied: "this = explicitly passed object"
// 4. Is it created using new?
//    → No

// Final Explanation:
// test.bind(obj) creates a new function with `this` permanently set to obj.
// Calling newFn() executes the bound function, so `this.x` = obj.x = 40.
// Output: 40

// 20
const obj = { a: 1 };
const fn = function () {
  console.log(this.a);
}.bind(obj);
fn.call({ a: 2 });
// 1

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (normal function)
// 2. Is it called with an object? (obj.fn())
//    → Not relevant; bind is already used
// 3. Is call/apply/bind used?
//    → Yes, both:
//       - bind(obj) → permanently sets `this` to obj
//       - call({ a: 2 }) → ignored because bind has higher priority
// 4. Is it created using new?
//    → No

// Final Explanation:
// The function is permanently bound to obj using bind(obj).
// Even though call({ a: 2 }) is used, it cannot override the binding.
// Therefore, `this.a` = obj.a = 1, and it prints 1.

// Case 1: Using bind after call
const obj1 = { a: 1 };
const fn1 = function () {
  console.log(this.a);
}
  .call({ a: 2 })
  .bind(obj1);
// ❌ This would actually throw an error because call() executes the function immediately
// and returns undefined, so bind() cannot be called on it.

// Case 2: Using call after bind (original case)
const obj2 = { a: 1 };
const fn2 = function () {
  console.log(this.a);
}.bind(obj2);
fn2.call({ a: 2 });
// ✅ Output: 1 (bind takes precedence, call cannot override it)

// Explanation:
// - bind permanently sets `this` for a function. Any later call/apply/call cannot change it.
// - call temporarily sets `this` only when the function is invoked.
// - So:
//     bind → call → `this` = bound object
//     call → bind → ❌ invalid because call executes immediately, leaving nothing to bind

// 21
const a = {
  x: 10,
  b: {
    x: 20,
    show() {
      console.log(this.x);
    },
  },
};
a.b.show();
// 20

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (show is a normal function)
// 2. Is it called with an object? (obj.fn())
//    → Yes (a.b.show())
//       ⇒ Rule applied: "this = object before the dot"
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → No

// Final Explanation:
// The method show() is called as a property of a.b (a.b.show()).
// Therefore, `this` refers to the object a.b.
// `this.x` = a.b.x = 20, so it prints 20.

//22
const obj = {
  name: "Outer",
  inner: {
    name: "Inner",
    show() {
      console.log(this.name);
    },
  },
};
const fn = obj.inner.show;
fn();
// undefined

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (show is a normal function)
// 2. Is it called with an object? (obj.fn())
//    → No (fn() is called standalone)
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → No
// 5. Otherwise: plain function call
//    → In strict mode: this = undefined
//    → In non-strict mode: this = global object

// Final Explanation:
// Assigning fn = obj.inner.show detaches the function from obj.inner.
// When fn() is called as a plain function, `this` is no longer obj.inner.
// - Strict mode → `this` is undefined → `this.name` is undefined
// - Non-strict mode → `this` is global object → `this.name` depends on global.name (likely undefined)
// Output: undefined

//23
const obj = {
  val: 5,
  show() {
    return {
      val: 10,
      show2() {
        console.log(this.val);
      },
    };
  },
};
obj.show().show2();
//10

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (both show and show2 are normal functions)
// 2. Is it called with an object? (obj.fn())
//    → show2 is called as the method of the object returned by show()
//       ⇒ Rule applied: "this = object before the dot"
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → No

// Final Explanation:
// - obj.show() returns a new object: { val: 10, show2() { … } }
// - Calling .show2() on that returned object makes `this` refer to that object.
// - Therefore, `this.val` = 10, and it prints 10.

//24
const obj = {
  val: 5,
  show() {
    return () => console.log(this.val);
  },
};
obj.show()();
//5

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → Yes (the function returned by show() is an arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"
// 2. Parent scope of the arrow function is the method show() of obj
// 3. Is show() called with an object? (obj.show())
//    → Yes
//       ⇒ Rule applied: "this = object before the dot" inside show()

// Final Explanation:
// - The arrow function inherits `this` from show(), which is called as obj.show().
// - Therefore, `this` inside the arrow function refers to obj.
// - `this.val` = obj.val = 5, so it prints 5.

//25
const obj = {
  val: 5,
  inner: {
    val: 6,
    fn: () => console.log(this.val),
  },
};
obj.inner.fn();
// undefined

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → Yes (fn is an arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"
// 2. Parent scope of fn is the object literal defining obj (the outer scope)
// 3. Is fn called with an object? (obj.inner.fn())
//    → Arrow functions ignore the caller object
// 4. Is call/apply/bind used?
//    → No
// 5. Is it created using new?
//    → No

// Final Explanation:
// - Arrow function fn() does not have its own `this`.
// - It captures `this` from the lexical parent scope, which is the outer object literal (obj's definition context, typically global scope).
// - In non-strict mode, `this` = global object; in strict mode, `this` = undefined.
// - `this.val` refers to the global object's val property, which is undefined.
// Output: undefined
// Important: object literals do NOT create a new `this` scope.
// So, the lexical scope of `fn` is actually the outer scope where `obj` is declared (probably the global scope or module scope), not `obj` or `inner`.

//26
function Person(age) {
  this.age = age;
}
const p = new Person(25);
console.log(p.age);
//25

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (Person is a normal function)
// 2. Is it called with an object? (obj.fn())
//    → Not exactly; created using new
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → Yes
//       ⇒ Rule applied: "this = new instance created by new"

// Final Explanation:
// - When we use `new Person(25)`, a new object is created and `this` inside Person points to that new object.
// - `this.age = age` sets the age property on the newly created object.
// - `p` is the instance returned by new Person(25), so `p.age` = 25.
// Output: 25

//27
function Test() {
  this.x = 10;
}
const t = Test();
console.log(t);
//undefined

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (Test is a normal function)
// 2. Is it called with an object? (obj.Test())
//    → No
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → No (function called as plain function)

// Final Explanation:
// - Test() is called as a plain function, not with `new`.
// - In non-strict mode, `this` refers to the global object (window in browser).
//   `this.x = 10` sets a property x on the global object.
// - In strict mode, `this` would be undefined and trying to set this.x would throw an error.
// - The variable t stores the return value of Test(), but the function does not return anything explicitly, so t = undefined.
// Output: undefined

//28
function A(n) {
  this.n = n;
}
const x = new A(5);
const y = new A(10);
console.log(x.n, y.n);
// 5 10

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (A is a normal function)
// 2. Is it called with an object? (obj.A())
//    → Not directly; called using `new`
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → Yes
//       ⇒ Rule applied: "this = new instance created by new"

// Final Explanation:
// - Each call to new A(...) creates a separate instance with its own `this`.
// - x = new A(5) → x.n = 5
// - y = new A(10) → y.n = 10
// - Therefore, console.log(x.n, y.n) prints 5 10

//29
function Car() {
  this.brand = "Tata";
}
const obj = new Car();
console.log(obj.brand);
//Tata

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (Car is a normal function)
// 2. Is it called with an object? (obj.Car())
//    → Not directly; called using `new`
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → Yes
//       ⇒ Rule applied: "this = new instance created by new"

// Final Explanation:
// - Calling new Car() creates a new object, and `this` inside Car points to that object.
// - this.brand = "Tata" assigns the brand property to the new object.
// - obj is the instance returned, so obj.brand = "Tata".
// Output: "Tata"

//30
function Phone() {
  this.name = "iPhone";
}
const fn = Phone;
fn();
console.log(globalThis.name);
// iPhone

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (Phone is a normal function)
// 2. Is it called with an object? (obj.Phone())
//    → No
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → No (function called as plain function)

// Final Explanation:
// - fn() is a plain function call, so `this` refers to the global object (globalThis) in non-strict mode.
// - this.name = "iPhone" sets the name property on the global object.
// - Therefore, globalThis.name = "iPhone", and console.log prints "iPhone".

//31
class A {
  constructor() {
    this.val = 7;
  }
  show() {
    console.log(this.val);
  }
}
new A().show();
//7

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (show is a normal method in a class)
// 2. Is it called with an object? (obj.show())
//    → Yes, indirectly via new A()
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → Yes (new A())
//       ⇒ Rule applied: "this = new instance created by new"

// Final Explanation:
// - new A() creates a new instance of class A, and `this` in the constructor points to that instance.
// - this.val = 7 sets val on the instance.
// - Calling show() on the instance makes `this` refer to the same instance.
// - Therefore, this.val = 7, and it prints 7.

//32
class A {
  show() {
    console.log(this);
  }
}
const a = new A();
const fn = a.show;
fn();
//undefined

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (show is a normal method in a class)
// 2. Is it called with an object? (obj.show())
//    → No (fn() is called standalone)
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → Yes (a = new A()), but fn is detached from the instance

// Final Explanation:
// - a.show() is a method, but assigning it to fn detaches it from the instance.
// - Calling fn() as a plain function makes `this` undefined in strict mode (classes are strict by default).
// - Therefore, console.log(this) prints undefined.

//33
class A {
  constructor(x) {
    this.x = x;
  }
}
const a = new A(10);
console.log(a.x);
//10

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (constructor is a normal function)
// 2. Is it called with an object? (obj.constructor())
//    → Not directly; called using `new`
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → Yes (new A(10))
//       ⇒ Rule applied: "this = new instance created by new"

// Final Explanation:
// - new A(10) creates a new instance of class A, with `this` pointing to that instance.
// - this.x = x sets the x property of the new instance to 10.
// - Therefore, a.x = 10, and console.log(a.x) prints 10.

//34
class A {
  constructor() {
    this.n = 1;
  }
  show = () => console.log(this.n);
}
const a = new A();
const fn = a.show;
fn();
//1

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → Yes (show is an arrow function defined as a class field)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"
// 2. Parent scope of show is the instance `a` created by new A()
// 3. Is it called with an object? (fn())
//    → Doesn't matter for arrow functions; they ignore the caller
// 4. Is call/apply/bind used?
//    → No
// 5. Is it created using new?
//    → Yes (new A())

// Final Explanation:
// - show is an arrow function defined as a class field, so it captures `this` from the surrounding context, which is the instance `a`.
// - Even when fn = a.show and called as fn(), `this` still refers to the instance `a`.
// - Therefore, this.n = 1, and fn() prints 1.

//  the arrow function is created inside the constructor, and its lexical `this` is whatever `this` is in the constructor.
// In `new A()`, the constructor is called with `this = the new instance`
// So when the arrow function is created, its `this` is bound to that instance.

//35
class A {
  constructor() {
    this.v = 5;
  }
  test() {
    return () => console.log(this.v);
  }
}
new A().test()();
//5

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → Yes (the function returned by test() is an arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"
// 2. Parent scope of the arrow function is the method test() of the instance created by new A()
// 3. Is test() called with an object? (new A().test())
//    → Yes
//       ⇒ Rule applied: "this = object before the dot" inside test()
// 4. Is call/apply/bind used?
//    → No
// 5. Is it created using new?
//    → Yes (new A())

// Final Explanation:
// - test() is called on a new instance of A, so `this` inside test() refers to that instance.
// - The arrow function returned by test() inherits `this` from test(), i.e., the instance.
// - Therefore, this.v = 5, and calling the arrow function prints 5.

//36
document.body.onclick = function () {
  console.log(this === document.body);
};

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (the assigned function is a normal function)
// 2. Is it called with an object? (obj.fn())
//    → Yes, automatically by the event system (this = element that received the event)
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → No

// Final Explanation:
// - In DOM event handlers assigned with a normal function, `this` refers to the element on which the handler is registered.
// - Here, the handler is assigned to document.body, so `this` inside the function points to document.body.
// - Therefore, `this === document.body` evaluates to true, and the console logs true.

//37
document.body.addEventListener("click", () => {
  console.log(this === document.body);
});
// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → Yes (the callback is an arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"
// 2. Parent scope of the arrow function is the surrounding script/global scope
// 3. Is it called with an object? (element.addEventListener(...))
//    → Irrelevant for arrow functions
// 4. Is call/apply/bind used?
//    → No
// 5. Is it created using new?
//    → No

// Final Explanation:
// - Arrow functions do not have their own `this` and inherit it from their lexical parent scope.
// - The parent scope here is the surrounding script/global scope, not document.body.
// - Therefore, `this` inside the arrow function is not document.body.
// - `this === document.body` evaluates to false, and the console logs false.

//38
const obj = {
  handle() {
    console.log(this);
  },
};
document.body.onclick = obj.handle;
// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (handle is a normal function)
// 2. Is it called with an object? (obj.handle())
//    → No, it’s assigned as an event handler
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → No

// Final Explanation:
// - When a normal function is assigned as a DOM event handler, the browser sets `this` to the element that received the event.
// - Here, obj.handle is assigned to document.body.onclick, so `this` inside handle points to document.body.
// - Therefore, console.log(this) logs the body element.

//39
document.body.onclick = function () {
  console.log(this.tagName);
};
// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → No (normal function)
// 2. Is it called with an object? (obj.fn())
//    → Yes, automatically by the event system (this = element receiving the event)
// 3. Is call/apply/bind used?
//    → No
// 4. Is it created using new?
//    → No

// Final Explanation:
// - In DOM event handlers using a normal function, `this` refers to the element that received the event.
// - Here, the function is assigned to document.body.onclick, so `this` points to document.body.
// - document.body.tagName is "BODY", so console.log(this.tagName) prints "BODY".

//40
document.body.onclick = () => {
  console.log(this.tagName);
};
// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → Yes (the callback is an arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"
// 2. Parent scope of the arrow function is the surrounding script/global scope
// 3. Is it called with an object? (element.onclick())
//    → Irrelevant for arrow functions
// 4. Is call/apply/bind used?
//    → No
// 5. Is it created using new?
//    → No

// Final Explanation:
// - Arrow functions do not have their own `this` and inherit it from the lexical parent scope.
// - The parent scope here is the surrounding script/global scope, not document.body.
// - Therefore, `this.tagName` is undefined, because `this` is not the body element.
// - Console logs undefined.

//41
("use strict");
function show() {
  console.log(this);
}
show();
// "use strict"; normal function call
// Checklist:
// 1. Is it an arrow function? → No
// 2. Plain function call → this = undefined
// Final Explanation:
// show() is called as a plain function in strict mode, so this = undefined.
// Output: undefined

//42
("use strict");
function show() {
  console.log(this.a);
}
let a = 10;
show();
// "use strict"; plain function
// Checklist:
// 1. Is it an arrow function? → No
// 2. Plain function call → this = undefined
// Final Explanation:
// Variables declared with let are not global object properties.
// show() is plain function, strict mode → this = undefined, so this.a is undefined.
// Output: undefined

//43
("use strict");
function test() {
  console.log(this);
}
const obj = { f: test };
obj.f();
// "use strict"; method call
// Checklist:
// 1. Is it an arrow function? → No
// 2. Called as obj.f() → this = obj
// Final Explanation:
// obj.f() calls test as a method, so this inside test = obj.
// Output: { f: [Function: test] }

//44
("use strict");
function f() {
  console.log(this.x);
}
var x = 5;
f();
// "use strict"; plain function
// Checklist:
// 1. Is it an arrow function? → No
// 2. Plain function call → this = undefined
// Final Explanation:
// f() is called as plain function, strict mode → this = undefined.
// Variables declared with var are not accessed via this in strict mode, so this.x is undefined.
// Output: undefined

//45
("use strict");
let obj = {
  x: 10,
  show() {
    console.log(this.x);
  },
};
obj.show();
// "use strict"; method call
// Checklist:
// 1. Is it an arrow function? → No
// 2. Called as obj.show() → this = obj
// Final Explanation:
// this.x inside show() refers to obj.x = 10
// Output: 10

//46
console.log(this);
// Global scope
// Checklist:
// 1. Is it an arrow function? → N/A
// 2. Top-level this
// Final Explanation:
// In non-strict mode: global object
// In strict mode (module) → undefined
// Output depends on environment

//47
(() => console.log(this))();
// Arrow function at global scope
// Checklist:
// 1. Arrow function → this from parent scope (global scope)
// Final Explanation:
// Lexical this at global scope: window in browsers or global in Node.js
// Output: global object
//48
const obj = {
  x: 1,
  f() {
    setTimeout(() => console.log(this.x), 0);
  },
};
obj.f();
// setTimeout with arrow function inside method
// Checklist:
// 1. Arrow function → this comes from parent scope
// 2. Parent scope is obj.f(), called as obj.f() → this = obj
// Final Explanation:
// Arrow function inside setTimeout inherits this from obj.f(), so this.x = obj.x = 1
// Output: 1

//49
const obj = {
  x: 1,
  f() {
    setTimeout(function () {
      console.log(this.x);
    }, 0);
  },
};
obj.f();
// setTimeout with normal function inside method
// Checklist:
// 1. Normal function inside setTimeout → this determined by call
// 2. setTimeout calls function with this = global object (window in browser) in non-strict, undefined in strict
// Final Explanation:
// this inside the function is global object in non-strict mode, undefined in strict mode.
// global object has no x → this.x = undefined
// Output: undefined

//50
function outer() {
  console.log(this);
  return function inner() {
    console.log(this);
  };
}
outer()();
// outer() returns inner function, both normal functions
// Checklist:
// 1. outer() called as plain function → this = undefined (strict mode assumed)
// 2. inner() called as plain function → this = undefined
// Final Explanation:
// Both outer and inner are plain function calls, so this = undefined for both.
// Output: outer() logs undefined, inner() logs undefined

//51
const obj = {
  a: 10,
  f: function () {
    return () => console.log(this.a);
  },
};
obj.f()();
//10

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → Yes (the returned function is an arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope?
//    → The parent scope is the function f(), which is a normal method.

// 3. Is f() called with an object? (obj.f())
//    → Yes
//       ⇒ Rule applied: "normal method call → this = object before the dot"
//       So inside f(), this = obj

// 4. The arrow function inherits this from f()
//    → So inside the arrow function, this = obj

// Final Explanation:
// - obj.f() is called as a method → this = obj
// - f() returns an arrow function → the arrow function inherits this from f()
// - Therefore this.a = obj.a = 10
// Output: 10

//52
const obj = {
  a: 10,
  f: () => {
    return function () {
      console.log(this.a);
    };
  },
};
obj.f()();
// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → Yes (f is an arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. Parent scope of f?
//    → The surrounding/global scope (NOT obj)
//       Arrow functions do NOT bind their own `this`, so obj.f() does NOT give it obj’s this.

// 3. What does f return?
//    → A normal function: function(){ console.log(this.a); }

// 4. How is the returned function called?
//    → As a plain function: obj.f()()
//       ⇒ Rule applied: "plain function call in strict mode → this = undefined"
//       (In non-strict mode → this = globalThis)

// Final Explanation:
// - f is an arrow function, so `this` inside f is NOT obj, it is the global scope.
// - f returns a normal function.
// - That returned function is called as a plain function, so `this` is undefined (strict mode)
//   or globalThis (non-strict).
// - In both cases → this.a is undefined because:
//      • undefined.a → undefined
//      • globalThis.a is usually not defined

// Output: undefined

//53
const obj = {
  a: 10,
  f() {
    const t = () => this;
    console.log(t().a);
  },
};
obj.f();
//10

// Checklist for figuring out `this`:
// 1. Is t an arrow function?
//    → Yes
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. Parent scope of t()?
//    → The method f(), which is called as obj.f()
//       ⇒ Rule applied: "method call → this = obj"

// 3. What does t() return?
//    → It returns this (which is obj)

// 4. console.log(t().a);
//    → t() returns obj, so obj.a = 10

// Final Explanation:
// - f() is called as obj.f() → this inside f = obj
// - Arrow function t inherits that same this = obj
// - So t() returns obj
// - t().a = obj.a = 10

//54
let a = 5;
const obj = {
  a: 20,
  f: () => console.log(this.a),
};
obj.f();
//undefined

// Checklist for figuring out `this`:
// 1. Is it an arrow function?
//    → Yes (f is an arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of f?
//    → The surrounding global/script scope (NOT obj)
//       Arrow functions do NOT get `this` from the object they are placed in.

// 3. Is a global variable `a` added to `this`?
//    → let a = 5 does NOT become this.a
//       (only var in sloppy mode attaches to global object)

// 4. What is this?
//    → In modules/strict mode → undefined
//    → In browser global sloppy mode → window

// Final Explanation:
// - f is an arrow function → it ignores obj
// - this comes from the outer/global scope
// - globalThis.a is undefined because `let a = 5` does NOT create a global property
// - Therefore console.log(this.a) prints undefined.

//55
function test() {
  this.x = 10;
  return {
    x: 20,
    f: () => console.log(this.x),
  };
}
test().f();
//10

// Checklist for figuring out `this`:
// 1. Is f an arrow function?
//    → Yes
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of f?
//    → The parent scope is the function test()

// 3. How is test() called?
//    → As a plain function: test()
//       ⇒ In non-strict mode → this = global object
//       ⇒ In strict mode → this = undefined (and this.x = 10 would error)
//       (Assuming non-strict mode, because code works)

// 4. What happens inside test()?
//    → this.x = 10 (global.x = 10 in non-strict mode)

// 5. f() is an arrow function
//    → It uses the same this as test()
//    → So this.x refers to global.x (which is 10)

// Final Explanation:
// - test() is called as a plain function, so this refers to the global object.
// - The arrow function f inherits that same this.
// - test() sets global.x = 10
// - f logs this.x, which is global.x = 10
// Output: 10

//56
const obj = { a: 10 };
const fn = () => console.log(this.a);
fn.bind(obj)();
//undefined

// Checklist for figuring out `this`:
// 1. Is fn an arrow function?
//    → Yes
//      ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. Does bind() affect arrow functions?
//    → No
//      ⇒ Arrow functions completely ignore call/apply/bind

// 3. What is the parent scope of fn?
//    → The surrounding/global scope (NOT obj)

// 4. Does the global scope have a property `a`?
//    → No, because `a` is only inside obj

// Final Explanation:
// - fn is an arrow function → it does NOT get `this` from obj
// - bind(obj) does nothing because arrow functions cannot be rebound
// - this remains the global scope
// - globalThis.a is undefined
// Output: undefined

//57
function show() {
  console.log(this.a);
}
const obj = { a: 30 };
show.bind(obj).bind({ a: 50 })();
// 30

// Checklist for figuring out `this`:
// 1. Is show() an arrow function?
//    → No
//       ⇒ Rule applied: "regular function → this depends on binding/call site"

// 2. How is show() bound?
//    → First bind: show.bind(obj) creates function with this = obj
//    → Second bind: .bind({ a: 50 }) tries to rebind
//       ⇒ Rule applied: "once bound with bind(), cannot be rebound"

// 3. How is the final function called?
//    → As a plain function: ()
//       ⇒ But binding overrides call site

// 4. What is the effective binding?
//    → First bind(obj) takes precedence
//    → Second bind({ a: 50 }) has no effect

// Final Explanation:
// - show.bind(obj) creates a permanently bound function with this = obj
// - Subsequent .bind() calls cannot change the binding
// - show() executes with this = obj, so this.a = obj.a = 30
// Output: 30

// 58
function f() {
  console.log(this.a);
}
const g = f.bind({ a: 10 });
const h = g.bind({ a: 20 });
h();
//10

// Checklist for figuring out `this`:
// 1. Is h() an arrow function?
//    → No (h comes from g which comes from f - all regular functions)
//       ⇒ Rule applied: "regular function → this depends on binding/call site"

// 2. How is h() created?
//    → f.bind({ a: 10 }) creates g with this = { a: 10 }
//    → g.bind({ a: 20 }) creates h trying to rebind
//       ⇒ Rule applied: "once bound with bind(), cannot be rebound"

// 3. How is h() called?
//    → As a plain function: h()
//       ⇒ But binding overrides call site

// 4. What is the effective binding?
//    → First bind({ a: 10 }) takes precedence
//    → Second bind({ a: 20 }) has no effect

// Final Explanation:
// - f.bind({ a: 10 }) creates g permanently bound to { a: 10 }
// - g.bind({ a: 20 }) cannot change the binding, h remains bound to { a: 10 }
// - h() executes with this = { a: 10 }, so this.a = 10
// Output: 10

//59
const obj = { a: 50 };
function f() {
  console.log(this.a);
}
const fn = f.bind(obj);
fn.call({ a: 100 });
// 50

// Checklist for figuring out `this`:
// 1. Is fn() an arrow function?
//    → No (fn comes from f - both regular functions)
//       ⇒ Rule applied: "regular function → this depends on binding/call site"

// 2. How is fn() created?
//    → f.bind(obj) creates fn with this = obj
//       ⇒ Rule applied: "once bound with bind(), cannot be rebound"

// 3. How is fn() called?
//    → Using call() with { a: 100 }
//       ⇒ But binding overrides call site

// 4. What is the effective binding?
//    → bind(obj) takes precedence
//    → call({ a: 100 }) has no effect

// Final Explanation:
// - f.bind(obj) creates fn permanently bound to obj
// - fn.call({ a: 100 }) cannot change the binding
// - fn() executes with this = obj, so this.a = obj.a = 50
// Output: 50

//60
const obj = { a: 1 };
function f() {
  console.log(this.a);
}
const fn = f.bind(obj);
fn.apply({ a: 99 });
// 1

// Checklist for figuring out `this`:
// 1. Is fn() an arrow function?
//    → No (fn comes from f - both regular functions)
//       ⇒ Rule applied: "regular function → this depends on binding/call site"

// 2. How is fn() created?
//    → f.bind(obj) creates fn with this = obj
//       ⇒ Rule applied: "once bound with bind(), cannot be rebound"

// 3. How is fn() called?
//    → Using apply() with { a: 99 }
//       ⇒ But binding overrides call site

// 4. What is the effective binding?
//    → bind(obj) takes precedence
//    → apply({ a: 99 }) has no effect

// Final Explanation:
// - f.bind(obj) creates fn permanently bound to obj
// - fn.apply({ a: 99 }) cannot change the binding
// - fn() executes with this = obj, so this.a = obj.a = 1
// Output: 1

//61
const obj = {
  x: 1,
  a: {
    x: 2,
    show() {
      console.log(this.x);
    },
  },
};
const fn = obj.a.show;
fn();
// undefined

// Checklist for figuring out `this`:
// 1. Is fn() an arrow function?
//    → No (fn is reference to obj.a.show which is a regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is fn() called?
//    → As a plain function: fn()
//       ⇒ In non-strict mode → this = global object
//       ⇒ In strict mode → this = undefined

// 3. What is the value of this.x?
//    → this = global object (non-strict)
//    → global.x is undefined
//    → console.log(undefined) outputs undefined

// Final Explanation:
// - fn is extracted from obj.a.show but called as standalone function
// - Method loses its original binding when called separately
// - Called as plain function so this = global object
// - global.x is undefined
// Output: undefined

//62
const obj = {
  x: 10,
  show() {
    console.log(this.x);
  },
};
(obj.show = obj.show)();
// undefined

// (obj.show = obj.show)();

// Checklist for figuring out `this`:
// 1. Is the function an arrow function?
//    → No (obj.show is a regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. What happens in the assignment?
//    → obj.show = obj.show returns the function reference
//    → The function is then called immediately: ()

// 3. How is the function called?
//    → As a plain function: ()
//       ⇒ In non-strict mode → this = global object
//       ⇒ In strict mode → this = undefined

// 4. What is the value of this.x?
//    → this = global object (non-strict)
//    → global.x is undefined
//    → console.log(undefined) outputs undefined

// Final Explanation:
// - Assignment expression returns the function reference
// - Function is called without any object context
// - Called as plain function so this = global object
// - global.x is undefined
// Output: undefined

//63
const obj = {
  x: 10,
  show() {
    console.log(this.x);
  },
};
const fn = (0, obj.show);
fn();
// undefined

// Checklist for figuring out `this`:
// 1. Is fn() an arrow function?
//    → No (fn comes from obj.show which is a regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. What happens in the comma operator?
//    → (0, obj.show) evaluates to obj.show (the function reference)
//    → Similar to assignment - extracts the function from its object

// 3. How is fn() called?
//    → As a plain function: fn()
//       ⇒ In non-strict mode → this = global object
//       ⇒ In strict mode → this = undefined

// 4. What is the value of this.x?
//    → this = global object (non-strict)
//    → global.x is undefined
//    → console.log(undefined) outputs undefined

// Final Explanation:
// - Comma operator returns the function reference without object context
// - Function is called without any object binding
// - Called as plain function so this = global object
// - global.x is undefined
// Output: undefined

//64
const obj = {
  x: 5,
  inner: {
    x: 6,
    print() {
      console.log(this.x);
    },
  },
};
obj.inner.print.call(obj);
//5

// obj.inner.print.call(obj);

// Checklist for figuring out `this`:
// 1. Is print() an arrow function?
//    → No (print is a regular method)
//       ⇒ Rule applied: "regular function → this depends on binding/call site"

// 2. How is print() called?
//    → Using call() with obj as argument
//       ⇒ Rule applied: "call() explicitly sets this to first argument"

// 3. What is the binding?
//    → call(obj) sets this = obj
//    → Overrides the normal method lookup (which would be obj.inner)

// 4. What is the value of this.x?
//    → this = obj
//    → obj.x = 5

// Final Explanation:
// - print() is called with explicit binding using call()
// - call(obj) sets this to obj, not obj.inner
// - this.x refers to obj.x which is 5
// Output: 5

//65
const obj = {
  x: 5,
  inner: {
    x: 6,
    print() {
      console.log(this.x);
    },
  },
};
obj.inner.print.bind(obj.inner)();
// 6

// Checklist for figuring out `this`:
// 1. Is print() an arrow function?
//    → No (print is a regular method)
//       ⇒ Rule applied: "regular function → this depends on binding/call site"

// 2. How is print() bound?
//    → Using bind() with obj.inner as argument
//       ⇒ Rule applied: "bind() creates new function with this permanently set"

// 3. How is the bound function called?
//    → As a plain function: ()
//       ⇒ But binding overrides call site

// 4. What is the effective binding?
//    → bind(obj.inner) sets this = obj.inner

// Final Explanation:
// - obj.inner.print.bind(obj.inner) creates function bound to obj.inner
// - Bound function is called without context, but binding takes precedence
// - this.x refers to obj.inner.x which is 6
// Output: 6

//66
const obj = { x: 20 };
obj.f = function () {
  setTimeout(function () {
    console.log(this.x);
  }, 0);
};
obj.f();
// undefined

// obj.f();

// Checklist for figuring out `this`:
// 1. Is the setTimeout callback an arrow function?
//    → No (regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the setTimeout callback called?
//    → Called by setTimeout internally
//       ⇒ Rule applied: "callback functions lose their original this"
//       ⇒ setTimeout calls the function with this = global object (or undefined in strict mode)

// 3. What is the value of this.x?
//    → this = global object (non-strict)
//    → global.x is undefined
//    → console.log(undefined) outputs undefined

// Final Explanation:
// - obj.f() is called with this = obj
// - But setTimeout callback is a regular function called separately
// - Callback loses original binding, this = global object
// - global.x is undefined
// Output: undefined

//67
const obj = { x: 20 };
obj.f = function () {
  setTimeout(() => console.log(this.x), 0);
};
obj.f();
// 20

// Checklist for figuring out `this`:
// 1. Is the setTimeout callback an arrow function?
//    → Yes
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is obj.f()

// 3. How is obj.f() called?
//    → As a method: obj.f()
//       ⇒ Rule applied: "method call → this = obj"

// 4. What is the value of this.x?
//    → Arrow function inherits this from obj.f()
//    → obj.f() has this = obj
//    → obj.x = 20

// Final Explanation:
// - obj.f() is called as method, so this = obj
// - Arrow function inherits this from parent scope (obj.f())
// - this.x refers to obj.x which is 20
// Output: 20

//68
function f() {
  setTimeout(() => console.log(this), 0);
}
f.call({ y: 10 });
//  { y: 10 }

// Checklist for figuring out `this`:
// 1. Is the setTimeout callback an arrow function?
//    → Yes
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is f()

// 3. How is f() called?
//    → Using call() with { y: 10 }
//       ⇒ Rule applied: "call() sets this to first argument"

// 4. What is the value of this?
//    → Arrow function inherits this from f()
//    → f() has this = { y: 10 }

// Final Explanation:
// - f.call({ y: 10 }) sets this = { y: 10 } inside f()
// - Arrow function inherits this from parent scope (f())
// - console.log(this) outputs { y: 10 }
// Output: { y: 10 }

//69
function f() {
  setTimeout(function () {
    console.log(this);
  }, 0);
}
f.call({ y: 10 });
//global object

// Checklist for figuring out `this`:
// 1. Is the setTimeout callback an arrow function?
//    → No (regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the setTimeout callback called?
//    → Called by setTimeout internally
//       ⇒ Rule applied: "callback functions lose their original this"
//       ⇒ setTimeout calls the function with this = global object

// 3. What is the value of this?
//    → this = global object (non-strict)

// Final Explanation:
// - f.call({ y: 10 }) sets this = { y: 10 } inside f()
// - But setTimeout callback is a regular function called separately
// - Callback loses original binding, this = global object
// Output: global object

//70
const obj = {
  val: 10,
  f() {
    setTimeout(this.g, 0);
  },
  g() {
    console.log(this.val);
  },
};
obj.f();
//undefined

// Checklist for figuring out `this`:
// 1. Is setTimeout callback an arrow function?
//    → No (this.g is a regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the callback passed?
//    → setTimeout(this.g, 0) passes function reference
//    → Similar to method extraction - loses object context

// 3. How is the callback called?
//    → Called by setTimeout internally
//       ⇒ Rule applied: "callback functions lose their original this"
//       ⇒ setTimeout calls the function with this = global object

// 4. What is the value of this.val?
//    → this = global object (non-strict)
//    → global.val is undefined

// Final Explanation:
// - obj.f() is called as method, so this = obj inside f()
// - But this.g extracts the function reference without context
// - setTimeout calls g() with this = global object
// - this.val refers to global.val which is undefined
// Output: undefined

//71
class A {
  constructor() {
    this.x = 10;
  }
  f() {
    console.log(this.x);
  }
}
const a = new A();
const fn = a.f;
fn();
// undefined

// Checklist for figuring out `this`:
// 1. Is fn() an arrow function?
//    → No (fn is reference to a.f which is a regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is fn() called?
//    → As a plain function: fn()
//       ⇒ In non-strict mode → this = global object
//       ⇒ In strict mode → this = undefined

// 3. What is the value of this.x?
//    → this = global object (non-strict)
//    → global.x is undefined

// Final Explanation:
// - fn is extracted from a.f but called as standalone function
// - Method loses its original binding when called separately
// - Called as plain function so this = global object
// - global.x is undefined
// Output: undefined

//72
class A {
  x = 10;
  f = () => console.log(this.x);
}
const a = new A();
const fn = a.f;
fn();
//10

// Checklist for figuring out `this`:
// 1. Is fn() an arrow function?
//    → Yes (f is class field arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is the class instance (created in constructor)

// 3. How is the arrow function bound?
//    → Arrow functions are bound lexically to the instance
//    → Binding is permanent and survives extraction

// 4. What is the value of this.x?
//    → Arrow function maintains this = a (the instance)
//    → a.x = 10

// Final Explanation:
// - f is class field arrow function, bound to instance at creation
// - Extraction to fn doesn't change the binding
// - Arrow function maintains this = a, so this.x = 10
// Output: 10

//73
class A {
  constructor() {
    this.x = 5;
    this.f = function () {
      console.log(this.x);
    };
  }
}
const a = new A();
const fn = a.f;
fn();
// undefined

// Checklist for figuring out `this`:
// 1. Is fn() an arrow function?
//    → No (f is regular function assigned in constructor)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is fn() called?
//    → As a plain function: fn()
//       ⇒ In non-strict mode → this = global object
//       ⇒ In strict mode → this = undefined

// 3. What is the value of this.x?
//    → this = global object (non-strict)
//    → global.x is undefined

// Final Explanation:
// - fn is extracted from a.f but called as standalone function
// - Regular function loses binding when called separately
// - Called as plain function so this = global object
// - global.x is undefined
// Output: undefined

//74
class A {
  constructor() {
    this.x = 8;
  }
  f() {
    return () => console.log(this.x);
  }
}
const fn = new A().f();
fn();
// 8

// Checklist for figuring out `this`:
// 1. Is fn() an arrow function?
//    → Yes (f() returns arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is f() method

// 3. How is f() called?
//    → As a method: new A().f()
//       ⇒ Rule applied: "method call → this = instance"

// 4. What is the value of this.x?
//    → Arrow function inherits this from f()
//    → f() has this = instance (with x: 8)

// Final Explanation:
// - new A().f() creates instance and calls f() with this = instance
// - Arrow function inherits this from parent scope (f())
// - this.x refers to instance.x which is 8
// Output: 8

//75
class A {
  constructor(x) {
    this.x = x;
  }
  f() {
    return function () {
      console.log(this.x);
    };
  }
}
new A(10).f()();
// undefined

// Checklist for figuring out `this`:
// 1. Is the returned function an arrow function?
//    → No (f() returns regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the returned function called?
//    → As a plain function: ()
//       ⇒ In non-strict mode → this = global object
//       ⇒ In strict mode → this = undefined

// 3. What is the value of this.x?
//    → this = global object (non-strict)
//    → global.x is undefined

// Final Explanation:
// - new A(10).f() returns a regular function
// - The function is called without context
// - Called as plain function so this = global object
// - global.x is undefined
// Output: undefined

//76
let obj = {
  x: 10,
  show() {
    console.log(this.x);
  },
};
let ref = obj.show;
obj = { x: 100 };
ref();
//undefined

// Checklist for figuring out `this`:
// 1. Is ref() an arrow function?
//    → No (ref is reference to obj.show which is a regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is ref() called?
//    → As a plain function: ref()
//       ⇒ In non-strict mode → this = global object
//       ⇒ In strict mode → this = undefined

// 3. What is the value of this.x?
//    → this = global object (non-strict)
//    → global.x is undefined

// Final Explanation:
// - ref stores the function reference before obj is reassigned
// - Function is called without object context
// - Called as plain function so this = global object
// - global.x is undefined
// Output: undefined

//77
let obj = {
  x: 10,
  show() {
    console.log(this.x);
  },
};
let ref = obj;
obj = { x: 20 };
ref.show();
// 10

// Checklist for figuring out `this`:
// 1. Is show() an arrow function?
//    → No (show is a regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is show() called?
//    → As a method: ref.show()
//       ⇒ Rule applied: "method call → this = ref"

// 3. What is ref pointing to?
//    → ref still points to original obj (with x: 10)
//    → obj reassignment doesn't affect ref

// 4. What is the value of this.x?
//    → this = ref (original obj with x: 10)

// Final Explanation:
// - ref stores reference to original obj before reassignment
// - ref.show() is method call, so this = ref (original obj)
// - this.x refers to original obj.x which is 10
// Output: 10

//78
const obj = {
  x: 1,
  show() {
    console.log(this.x);
  },
};
const fn = obj.show;
const obj2 = { x: 2 };
obj2.show = fn;
obj2.show();
// 2

// Checklist for figuring out `this`:
// 1. Is show() an arrow function?
//    → No (show is a regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is show() called?
//    → As a method: obj2.show()
//       ⇒ Rule applied: "method call → this = obj2"

// 3. What is the value of this.x?
//    → this = obj2
//    → obj2.x = 2

// Final Explanation:
// - fn contains reference to original show function
// - obj2.show = fn assigns it as method to obj2
// - obj2.show() is method call, so this = obj2
// - this.x refers to obj2.x which is 2
// Output: 2

//79
const a = {
  x: 1,
  f() {
    console.log(this.x);
  },
};
const b = { x: 2 };
b.f = a.f;
a.f();
b.f();
// 1
//2

// Checklist for figuring out `this`:
// 1. Is f() an arrow function?
//    → No (f is a regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is f() called?
//    → As a method: a.f()
//       ⇒ Rule applied: "method call → this = a"

// 3. What is the value of this.x?
//    → this = a
//    → a.x = 1

// Final Explanation:
// - a.f() is method call, so this = a
// - this.x refers to a.x which is 1
// Output: 1

// Checklist for figuring out `this`:
// 1. Is f() an arrow function?
//    → No (f is a regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is f() called?
//    → As a method: b.f()
//       ⇒ Rule applied: "method call → this = b"

// 3. What is the value of this.x?
//    → this = b
//    → b.x = 2

// Final Explanation:
// - b.f() is method call, so this = b
// - this.x refers to b.x which is 2
// Output: 2

//80
const obj = {
  x: 10,
  get f() {
    return function () {
      console.log(this.x);
    };
  },
};
obj.f();
//undefined

// Checklist for figuring out `this`:
// 1. Is the returned function an arrow function?
//    → No (get f returns regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the function called?
//    → As a plain function: obj.f() (getter returns function, then it's called)
//       ⇒ In non-strict mode → this = global object
//       ⇒ In strict mode → this = undefined

// 3. What is the value of this.x?
//    → this = global object (non-strict)
//    → global.x is undefined

// Final Explanation:
// - obj.f getter returns a regular function
// - The function is called without context after getter returns it
// - Called as plain function so this = global object
// - global.x is undefined
// Output: undefined

//81
const obj = {
  x: 10,
  get y() {
    console.log(this.x);
    return this.x;
  },
};
obj.y;
// 10

// Checklist for figuring out `this`:
// 1. Is y an arrow function?
//    → No (y is a getter - regular function)
//       ⇒ Rule applied: "getter/setter → this = object being accessed"

// 2. How is y accessed?
//    → As property access: obj.y
//       ⇒ Rule applied: "property access → this = obj"

// 3. What is the value of this.x?
//    → this = obj
//    → obj.x = 10

// Final Explanation:
// - Getter is called with this = obj
// - this.x refers to obj.x which is 10
// Output: 10

//82
const obj = {
  x: 10,
  set y(v) {
    console.log(this.x, v);
  },
};
obj.y = 5;

// Checklist for figuring out `this`:
// 1. Is y an arrow function?
//    → No (y is a setter - regular function)
//       ⇒ Rule applied: "getter/setter → this = object being accessed"

// 2. How is y accessed?
//    → As property assignment: obj.y = 5
//       ⇒ Rule applied: "property access → this = obj"

// 3. What is the value of this.x?
//    → this = obj
//    → obj.x = 10

// Final Explanation:
// - Setter is called with this = obj
// - this.x refers to obj.x which is 10
// - v = 5
// Output: 10 5

//83
const obj = {
  x: 10,
  get y() {
    return () => console.log(this.x);
  },
};
obj.y();

// Checklist for figuring out `this`:
// 1. Is the returned function an arrow function?
//    → Yes (getter returns arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is the getter y()

// 3. How is the getter called?
//    → As property access: obj.y
//       ⇒ Rule applied: "property access → this = obj"

// 4. What is the value of this.x?
//    → Arrow function inherits this from getter
//    → Getter has this = obj
//    → obj.x = 10

// Final Explanation:
// - Getter is called with this = obj
// - Arrow function inherits this from parent scope (getter)
// - this.x refers to obj.x which is 10
// Output: 10

//84
const obj = {
  x: 10,
  get y() {
    return function () {
      console.log(this.x);
    };
  },
};
obj.y();

// Checklist for figuring out `this`:
// 1. Is the returned function an arrow function?
//    → No (getter returns regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the returned function called?
//    → As a plain function: obj.y() (getter returns function, then it's called)
//       ⇒ In non-strict mode → this = global object
//       ⇒ In strict mode → this = undefined

// 3. What is the value of this.x?
//    → this = global object (non-strict)
//    → global.x is undefined

// Final Explanation:
// - Getter returns a regular function
// - The function is called without context after getter returns it
// - Called as plain function so this = global object
// - global.x is undefined
// Output: undefined

//85
const obj = {
  a: 10,
  b: {
    a: 20,
    get x() {
      console.log(this.a);
    },
  },
};
obj.b.x;

// Checklist for figuring out `this`:
// 1. Is x an arrow function?
//    → No (x is a getter - regular function)
//       ⇒ Rule applied: "getter/setter → this = object being accessed"

// 2. How is x accessed?
//    → As property access: obj.b.x
//       ⇒ Rule applied: "property access → this = obj.b"

// 3. What is the value of this.a?
//    → this = obj.b
//    → obj.b.a = 20

// Final Explanation:
// - Getter is called with this = obj.b (the immediate object)
// - this.a refers to obj.b.a which is 20
// Output: 20

//86
("use strict");
function f() {
  console.log(this);
}
f();

// Checklist for figuring out `this`:
// 1. Is f() an arrow function?
//    → No (f is regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is f() called?
//    → As a plain function: f()
//       ⇒ In strict mode → this = undefined

// Final Explanation:
// - f() called as plain function in strict mode
// - this = undefined
// Output: undefined

//87
("use strict");
function f() {
  console.log(this.x);
}
var x = 10;
f();

// Checklist for figuring out `this`:
// 1. Is f() an arrow function?
//    → No (f is regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is f() called?
//    → As a plain function: f()
//       ⇒ In strict mode → this = undefined

// 3. What is the value of this.x?
//    → this = undefined
//    → Accessing property of undefined throws TypeError

// Final Explanation:
// - f() called as plain function in strict mode
// - this = undefined
// - Accessing this.x throws TypeError
// Output: TypeError

//88
("use strict");
const obj = {
  x: 30,
  f() {
    console.log(this.x);
  },
};
const fn = obj.f;
fn();

// Checklist for figuring out `this`:
// 1. Is fn() an arrow function?
//    → No (fn comes from obj.f - regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is fn() called?
//    → As a plain function: fn()
//       ⇒ In strict mode → this = undefined

// 3. What is the value of this.x?
//    → this = undefined
//    → Accessing property of undefined throws TypeError

// Final Explanation:
// - fn extracted from obj.f but called as standalone function
// - Called as plain function in strict mode so this = undefined
// - Accessing this.x throws TypeError
// Output: TypeError

//89
("use strict");
function a() {
  return function () {
    console.log(this);
  };
}
a()();

// Checklist for figuring out `this`:
// 1. Is the returned function an arrow function?
//    → No (a() returns regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the returned function called?
//    → As a plain function: ()
//       ⇒ In strict mode → this = undefined

// Final Explanation:
// - a() returns a regular function
// - The function is called without context in strict mode
// - this = undefined
// Output: undefined

//90
("use strict");
function a() {
  return () => console.log(this);
}
a()();

// Checklist for figuring out `this`:
// 1. Is the returned function an arrow function?
//    → Yes (a() returns arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is a()

// 3. How is a() called?
//    → As a plain function: a()
//       ⇒ In strict mode → this = undefined

// 4. What is the value of this?
//    → Arrow function inherits this from a()
//    → a() has this = undefined

// Final Explanation:
// - a() called as plain function in strict mode, this = undefined
// - Arrow function inherits this from parent scope (a())
// - this = undefined
// Output: undefined

//91
const obj = {
  x: 5,
  f() {
    console.log(this.x);
    return () => console.log(this.x);
  },
};
obj.f()();

// Checklist for figuring out `this`:
// 1. Is f() an arrow function?
//    → No (f is regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is f() called?
//    → As a method: obj.f()
//       ⇒ Rule applied: "method call → this = obj"

// 3. What is the value of this.x?
//    → this = obj
//    → obj.x = 5
// Output: 5

// Checklist for figuring out `this`:
// 1. Is the returned function an arrow function?
//    → Yes (f() returns arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is f()

// 3. How is f() called?
//    → As a method: obj.f()
//       ⇒ Rule applied: "method call → this = obj"

// 4. What is the value of this.x?
//    → Arrow function inherits this from f()
//    → f() has this = obj
//    → obj.x = 5

// Final Explanation:
// - f() called as method, this = obj
// - Arrow function inherits this from parent scope (f())
// - this.x refers to obj.x which is 5
// Output: 5

//92
function outer() {
  console.log(this);
  return {
    inner() {
      console.log(this);
    },
  };
}
outer().inner();

// Checklist for figuring out `this`:
// 1. Is outer() an arrow function?
//    → No (outer is regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is outer() called?
//    → As a plain function: outer()
//       ⇒ In non-strict mode → this = global object
// Output: global object

// Checklist for figuring out `this`:
// 1. Is inner() an arrow function?
//    → No (inner is regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is inner() called?
//    → As a method: outer().inner()
//       ⇒ Rule applied: "method call → this = returned object"

// Final Explanation:
// - inner() called as method on returned object
// - this = returned object
// Output: { inner: [Function: inner] }

//93
function outer() {
  console.log(this);
  return {
    inner: () => console.log(this),
  };
}
outer().inner();

// Checklist for figuring out `this`:
// 1. Is outer() an arrow function?
//    → No (outer is regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is outer() called?
//    → As a plain function: outer()
//       ⇒ In non-strict mode → this = global object
// Output: global object

// Checklist for figuring out `this`:
// 1. Is inner() an arrow function?
//    → Yes (inner is arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is outer()

// 3. How is outer() called?
//    → As a plain function: outer()
//       ⇒ In non-strict mode → this = global object

// 4. What is the value of this?
//    → Arrow function inherits this from outer()
//    → outer() has this = global object

// Final Explanation:
// - outer() called as plain function, this = global object
// - Arrow function inherits this from parent scope (outer())
// - this = global object
// Output: global object

//94
const obj = {
  x: 10,
  f() {
    return {
      g: () => console.log(this.x),
    };
  },
};
obj.f().g();

// Checklist for figuring out `this`:
// 1. Is g() an arrow function?
//    → Yes (g is arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is f()

// 3. How is f() called?
//    → As a method: obj.f()
//       ⇒ Rule applied: "method call → this = obj"

// 4. What is the value of this.x?
//    → Arrow function inherits this from f()
//    → f() has this = obj
//    → obj.x = 10

// Final Explanation:
// - f() called as method, this = obj
// - Arrow function inherits this from parent scope (f())
// - this.x refers to obj.x which is 10
// Output: 10

//95
const obj = {
  x: 10,
  f() {
    return {
      g: function () {
        console.log(this.x);
      },
    };
  },
};
obj.f().g();

// Checklist for figuring out `this`:
// 1. Is g() an arrow function?
//    → No (g is regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is g() called?
//    → As a plain function: obj.f().g()
//       ⇒ In non-strict mode → this = global object
//       ⇒ In strict mode → this = undefined

// 3. What is the value of this.x?
//    → this = global object (non-strict)
//    → global.x is undefined

// Final Explanation:
// - g() extracted from returned object but called as standalone function
// - Method loses its original binding when called separately
// - Called as plain function so this = global object
// - global.x is undefined
// Output: undefined

//96
(function () {
  console.log(this);
})();

// Checklist for figuring out `this`:
// 1. Is the IIFE an arrow function?
//    → No (IIFE is regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the IIFE called?
//    → As a plain function: (function(){})()
//       ⇒ In non-strict mode → this = global object

// Final Explanation:
// - IIFE called as plain function in non-strict mode
// - this = global object
// Output: global object

//97
("use strict");
(function () {
  console.log(this);
})();

// Checklist for figuring out `this`:
// 1. Is the IIFE an arrow function?
//    → No (IIFE is regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the IIFE called?
//    → As a plain function: (function(){})()
//       ⇒ In strict mode → this = undefined

// Final Explanation:
// - IIFE called as plain function in strict mode
// - this = undefined
// Output: undefined

//98
const obj = {
  x: 10,
  f: (function () {
    console.log(this);
    return function () {
      console.log(this.x);
    };
  })(),
};
obj.f();

// Checklist for figuring out `this`:
// 1. Is the IIFE an arrow function?
//    → No (IIFE is regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the IIFE called?
//    → As a plain function during object creation
//       ⇒ In non-strict mode → this = global object
// Output: global object (during object creation)

// Checklist for figuring out `this`:
// 1. Is f() an arrow function?
//    → No (f is regular function assigned by IIFE)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is f() called?
//    → As a method: obj.f()
//       ⇒ Rule applied: "method call → this = obj"

// 3. What is the value of this.x?
//    → this = obj
//    → obj.x = 10

// Final Explanation:
// - IIFE executes during object creation with this = global
// - f() called as method, this = obj
// - this.x refers to obj.x which is 10
// Output: 10

//99
const obj = {
  x: 10,
  f: (function () {
    return () => console.log(this.x);
  })(),
};
obj.f();

// Checklist for figuring out `this`:
// 1. Is the IIFE an arrow function?
//    → No (IIFE is regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the IIFE called?
//    → As a plain function during object creation
//       ⇒ In non-strict mode → this = global object

// Checklist for figuring out `this`:
// 1. Is f() an arrow function?
//    → Yes (IIFE returns arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is the IIFE

// 3. How is the IIFE called?
//    → As a plain function: (function(){})()
//       ⇒ In non-strict mode → this = global object

// 4. What is the value of this.x?
//    → Arrow function inherits this from IIFE
//    → IIFE has this = global object
//    → global.x is undefined

// Final Explanation:
// - IIFE called as plain function, this = global object
// - Arrow function inherits this from parent scope (IIFE)
// - this.x refers to global.x which is undefined
// Output: undefined

//100
const obj = {
  x: 10,
  f: (function () {
    return function () {
      return () => console.log(this.x);
    };
  })(),
};
obj.f()();

// Checklist for figuring out `this`:
// 1. Is the IIFE an arrow function?
//    → No (IIFE is regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the IIFE called?
//    → As a plain function during object creation
//       ⇒ In non-strict mode → this = global object

// Checklist for figuring out `this`:
// 1. Is the first returned function an arrow function?
//    → No (IIFE returns regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the first function called?
//    → As a method: obj.f()
//       ⇒ Rule applied: "method call → this = obj"

// Checklist for figuring out `this`:
// 1. Is the final returned function an arrow function?
//    → Yes (first function returns arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is the first returned function

// 3. How is the first function called?
//    → As a method: obj.f()
//       ⇒ Rule applied: "method call → this = obj"

// 4. What is the value of this.x?
//    → Arrow function inherits this from first function
//    → First function has this = obj
//    → obj.x = 10

// Final Explanation:
// - First function called as method, this = obj
// - Arrow function inherits this from parent scope (first function)
// - this.x refers to obj.x which is 10
// Output: 10

//101
function A() {
  this.x = 10;
}
A.prototype.show = function () {
  console.log(this.x);
};
const obj = { x: 50 };
A.prototype.show.call(obj);

// Checklist for figuring out `this`:
// 1. Is show() an arrow function?
//    → No (show is regular function)
//       ⇒ Rule applied: "regular function → this depends on binding/call site"

// 2. How is show() called?
//    → Using call() with obj as argument
//       ⇒ Rule applied: "call() explicitly sets this to first argument"

// 3. What is the binding?
//    → call(obj) sets this = obj

// Final Explanation:
// - A.prototype.show.call(obj) explicitly sets this = obj
// - this.x refers to obj.x which is 50
// Output: 50

//101
function A() {
  this.x = 10;
}
A.prototype.show = () => console.log(this.x);
new A().show();

// Checklist for figuring out `this`:
// 1. Is show() an arrow function?
//    → Yes (show is arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is the global scope (where A is defined)

// 3. What is the value of this.x?
//    → Arrow function inherits this from global scope
//    → global.x is undefined

// Final Explanation:
// - Arrow function defined on prototype inherits this from definition scope
// - this refers to global object, global.x is undefined
// Output: undefined

//101
function A() {
  this.x = 20;
}
A.prototype.f = function () {
  return () => console.log(this.x);
};
new A().f()();

// Checklist for figuring out `this`:
// 1. Is the returned function an arrow function?
//    → Yes (f() returns arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is f()

// 3. How is f() called?
//    → As a method: new A().f()
//       ⇒ Rule applied: "method call → this = instance"

// 4. What is the value of this.x?
//    → Arrow function inherits this from f()
//    → f() has this = instance (with x: 20)

// Final Explanation:
// - f() called as method, this = instance
// - Arrow function inherits this from parent scope (f())
// - this.x refers to instance.x which is 20
// Output: 20

//101
function A() {
  this.x = 1;
}
A.prototype.f = function () {
  return function () {
    console.log(this.x);
  };
};
A.prototype.x = 100;
A.prototype.f()();

// Checklist for figuring out `this`:
// 1. Is the returned function an arrow function?
//    → No (f() returns regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the returned function called?
//    → As a plain function: A.prototype.f()()
//       ⇒ In non-strict mode → this = global object

// 3. What is the value of this.x?
//    → this = global object
//    → global.x is undefined

// Final Explanation:
// - A.prototype.f() returns regular function
// - Function called without context, this = global object
// - global.x is undefined
// Output: undefined

//101
function A() {
  this.x = 1;
}
A.prototype.f = function () {
  return function () {
    console.log(this.x);
  };
};
const f = new A().f();
f.call({ x: 99 });

// Checklist for figuring out `this`:
// 1. Is the returned function an arrow function?
//    → No (f() returns regular function)
//       ⇒ Rule applied: "regular function → this depends on binding/call site"

// 2. How is the function called?
//    → Using call() with { x: 99 } as argument
//       ⇒ Rule applied: "call() explicitly sets this to first argument"

// Final Explanation:
// - f.call({ x: 99 }) explicitly sets this = { x: 99 }
// - this.x refers to 99
// Output: 99

//B.1
class A {
  x = 5;
  f() {
    console.log(this.x);
  }
}
A.prototype.x = 100;
new A().f();

// Checklist for figuring out `this`:
// 1. Is f() an arrow function?
//    → No (f is regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is f() called?
//    → As a method: new A().f()
//       ⇒ Rule applied: "method call → this = instance"

// 3. What is the value of this.x?
//    → this = instance
//    → instance has own property x = 5 (shadows prototype)

// Final Explanation:
// - f() called as method, this = instance
// - Instance property x = 5 shadows prototype x = 100
// Output: 5

//B.2
class A {
  constructor() {
    this.x = 1;
  }
  f = () => console.log(this.x);
}
class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
}
new B().f();

// Checklist for figuring out `this`:
// 1. Is f() an arrow function?
//    → Yes (f is class field arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is the class instance

// 3. How is the arrow function bound?
//    → Arrow functions are bound lexically to the instance

// Final Explanation:
// - f is class field arrow function, bound to instance at creation
// - Instance is of class B with x = 2
// Output: 2

//B.3
class A {
  f() {
    return () => console.log(this);
  }
}
const a = new A();
const f = a.f();
f.call({ y: 20 });

// Checklist for figuring out `this`:
// 1. Is the returned function an arrow function?
//    → Yes (f() returns arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is f()

// 3. How is f() called?
//    → As a method: a.f()
//       ⇒ Rule applied: "method call → this = a"

// 4. What is the value of this?
//    → Arrow function inherits this from f()
//    → f() has this = a
//    → call() has no effect on arrow functions

// Final Explanation:
// - f() called as method, this = a
// - Arrow function inherits this from parent scope (f())
// - call() cannot rebind arrow function
// Output: A instance

//B.4
class A {
  f() {
    return function () {
      console.log(this);
    };
  }
}
const a = new A();
a.f().bind(a).call({ z: 99 });

// Checklist for figuring out `this`:
// 1. Is the returned function an arrow function?
//    → No (f() returns regular function)
//       ⇒ Rule applied: "regular function → this depends on binding/call site"

// 2. How is the function bound?
//    → Using bind() with a as argument
//       ⇒ Rule applied: "bind() creates new function with this permanently set"

// 3. How is the bound function called?
//    → Using call() with { z: 99 }
//       ⇒ But binding overrides call site

// Final Explanation:
// - a.f().bind(a) creates function bound to a
// - call({ z: 99 }) cannot change the binding
// - this = a
// Output: A instance

//B.5
class A {
  constructor() {
    this.x = 10;
  }
  f() {
    console.log(this.x);
  }
}
const { f } = new A();
f();

// Checklist for figuring out `this`:
// 1. Is f() an arrow function?
//    → No (f is regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is f() called?
//    → As a plain function: f()
//       ⇒ In non-strict mode → this = global object

// 3. What is the value of this.x?
//    → this = global object
//    → global.x is undefined

// Final Explanation:
// - f extracted via destructuring but called as standalone function
// - Method loses its original binding when called separately
// Output: undefined

//C.1
const obj = {
  a: 10,
  show() {
    console.log(this.a);
  },
};
const { show } = obj;
show();

// Checklist for figuring out `this`:
// 1. Is show() an arrow function?
//    → No (show is regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is show() called?
//    → As a plain function: show()
//       ⇒ In non-strict mode → this = global object

// Final Explanation:
// - show extracted via destructuring but called as standalone function
// - Method loses its original binding
// Output: undefined

//C.2
const obj = {
  a: 10,
  show() {
    return () => console.log(this.a);
  },
};
const { show } = obj;
show()();

// Checklist for figuring out `this`:
// 1. Is the returned function an arrow function?
//    → Yes (show() returns arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is show()

// 3. How is show() called?
//    → As a plain function: show()
//       ⇒ In non-strict mode → this = global object

// Final Explanation:
// - show() called as plain function, this = global object
// - Arrow function inherits this from parent scope (show())
// - global.a is undefined
// Output: undefined

//C.3
const obj = {
  a: 10,
  show: () => console.log(this.a),
};
const { show } = obj;
show();

// Checklist for figuring out `this`:
// 1. Is show() an arrow function?
//    → Yes (show is arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is the global scope

// Final Explanation:
// - Arrow function defined in object literal inherits this from global scope
// - global.a is undefined
// Output: undefined

//C.4
const obj = {
  a: 10,
  nested: {
    a: 20,
    show() {
      console.log(this.a);
    },
  },
};
const { show } = obj.nested;
show();

// Checklist for figuring out `this`:
// 1. Is show() an arrow function?
//    → No (show is regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is show() called?
//    → As a plain function: show()
//       ⇒ In non-strict mode → this = global object

// Final Explanation:
// - show extracted via destructuring but called as standalone function
// - Method loses its original binding to obj.nested
// Output: undefined

//C.5
const obj = {
  a: 1,
  f() {
    return { g: () => console.log(this.a) };
  },
};
const { g } = obj.f();
g();

// Checklist for figuring out `this`:
// 1. Is g() an arrow function?
//    → Yes (g is arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is f()

// 3. How is f() called?
//    → As a method: obj.f()
//       ⇒ Rule applied: "method call → this = obj"

// Final Explanation:
// - f() called as method, this = obj
// - Arrow function inherits this from parent scope (f())
// - this.a refers to obj.a which is 1
// Output: 1

//D.1
const obj = {
  a: 10,
  get x() {
    return function () {
      console.log(this.a);
    };
  },
};
obj.x();

// Checklist for figuring out `this`:
// 1. Is the returned function an arrow function?
//    → No (getter returns regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the returned function called?
//    → As a plain function: obj.x()
//       ⇒ In non-strict mode → this = global object

// Final Explanation:
// - Getter returns regular function
// - Function called without context, this = global object
// Output: undefined

//D.2
const obj = {
  a: 10,
  get x() {
    return () => console.log(this.a);
  },
};
obj.x();

// Checklist for figuring out `this`:
// 1. Is the returned function an arrow function?
//    → Yes (getter returns arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is the getter x()

// 3. How is the getter called?
//    → As property access: obj.x
//       ⇒ Rule applied: "property access → this = obj"

// Final Explanation:
// - Getter called with this = obj
// - Arrow function inherits this from parent scope (getter)
// Output: 10

//D.3
const obj = {
  a: 5,
  get x() {
    return {
      y: () => console.log(this.a),
    };
  },
};
obj.x.y();

// Checklist for figuring out `this`:
// 1. Is y() an arrow function?
//    → Yes (y is arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is the getter x()

// 3. How is the getter called?
//    → As property access: obj.x
//       ⇒ Rule applied: "property access → this = obj"

// Final Explanation:
// - Getter called with this = obj
// - Arrow function inherits this from parent scope (getter)
// Output: 5

//D.4
const obj = {
  a: 5,
  get x() {
    return {
      y: function () {
        console.log(this.a);
      },
    };
  },
};
obj.x.y();

// Checklist for figuring out `this`:
// 1. Is y() an arrow function?
//    → No (y is regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is y() called?
//    → As a method: obj.x.y()
//       ⇒ Rule applied: "method call → this = returned object"

// Final Explanation:
// - y() called as method on returned object
// - this = returned object (which has no a property)
// Output: undefined

//D.5
const obj = {
  a: 10,
  get y() {
    console.log(this);
    return () => console.log(this.a);
  },
};
obj.y();

// Checklist for figuring out `this`:
// 1. Is the getter an arrow function?
//    → No (getter is regular function)
//       ⇒ Rule applied: "getter/setter → this = object being accessed"

// 2. How is the getter called?
//    → As property access: obj.y
//       ⇒ Rule applied: "property access → this = obj"
// Output: obj

// Checklist for figuring out `this`:
// 1. Is the returned function an arrow function?
//    → Yes (getter returns arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is the getter y()

// Final Explanation:
// - Getter called with this = obj
// - Arrow function inherits this from parent scope (getter)
// Output: 10

//E.1
const obj = {
  a: 10,
  f() {
    console.log(this.a);
  },
};
let temp = obj.f;
obj.f = function () {
  console.log(this.a * 2);
};
temp();

// Checklist for figuring out `this`:
// 1. Is temp() an arrow function?
//    → No (temp is reference to original f - regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is temp() called?
//    → As a plain function: temp()
//       ⇒ In non-strict mode → this = global object

// Final Explanation:
// - temp stores original function reference
// - Called as plain function, this = global object
// Output: undefined

//E.2
const a = {
  x: 1,
  f() {
    console.log(this.x);
  },
};
const b = { x: 2 };
const c = { x: 3 };
b.f = a.f;
c.f = b.f;
a.f();
b.f();
c.f();

// Checklist for figuring out `this`:
// 1. Is f() an arrow function?
//    → No (f is regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is each f() called?
//    → a.f(): method call → this = a → Output: 1
//    → b.f(): method call → this = b → Output: 2
//    → c.f(): method call → this = c → Output: 3

// Final Explanation:
// - Each method call uses this = the object it's called on
// Output: 1, 2, 3

//E.3
const obj = {
  a: 10,
  f() {
    return this;
  },
};
console.log(obj.f().a);

// Checklist for figuring out `this`:
// 1. Is f() an arrow function?
//    → No (f is regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is f() called?
//    → As a method: obj.f()
//       ⇒ Rule applied: "method call → this = obj"

// Final Explanation:
// - f() returns this which = obj
// - obj.a = 10
// Output: 10

//E.4
let obj = {
  x: 10,
  f() {
    console.log(this.x);
  },
};
let g = obj.f;
obj = { x: 20 };
g.call(obj);

// Checklist for figuring out `this`:
// 1. Is g() an arrow function?
//    → No (g is regular method)
//       ⇒ Rule applied: "regular function → this depends on binding/call site"

// 2. How is g() called?
//    → Using call() with current obj as argument
//       ⇒ Rule applied: "call() explicitly sets this to first argument"

// Final Explanation:
// - g.call(obj) explicitly sets this = current obj (with x: 20)
// Output: 20

//E.5
let obj = {
  x: 10,
  f() {
    return () => console.log(this.x);
  },
};
let g = obj.f();
obj = { x: 20 };
g();

// Checklist for figuring out `this`:
// 1. Is g() an arrow function?
//    → Yes (f() returns arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is f()

// 3. How is f() called?
//    → As a method: obj.f()
//       ⇒ Rule applied: "method call → this = original obj"

// Final Explanation:
// - f() called when obj had x: 10, this = original obj
// - Arrow function permanently bound to original obj
// - obj reassignment doesn't affect the binding
// Output: 10

//F.1
function f() {
  console.log(this.x);
}
const g = f.bind({ x: 10 });
g.call({ x: 20 });

// Checklist for figuring out `this`:
// 1. Is g() an arrow function?
//    → No (g is bound regular function)
//       ⇒ Rule applied: "regular function → this depends on binding"

// 2. How is g() created?
//    → Using bind() with { x: 10 }
//       ⇒ Rule applied: "once bound with bind(), cannot be rebound"

// Final Explanation:
// - f.bind({ x: 10 }) creates g permanently bound to { x: 10 }
// - call({ x: 20 }) has no effect
// Output: 10

//F.2
function f() {
  console.log(this.x);
}
const g = f.bind({ x: 10 });
g.apply({ x: 20 });

// Checklist for figuring out `this`:
// 1. Is g() an arrow function?
//    → No (g is bound regular function)
//       ⇒ Rule applied: "regular function → this depends on binding"

// 2. How is g() created?
//    → Using bind() with { x: 10 }
//       ⇒ Rule applied: "once bound with bind(), cannot be rebound"

// Final Explanation:
// - f.bind({ x: 10 }) creates g permanently bound to { x: 10 }
// - apply({ x: 20 }) has no effect
// Output: 10

//F.3
function f() {
  console.log(this.x);
}
const g = f.bind({ x: 10 });
const h = g.bind({ x: 50 });
h();

// Checklist for figuring out `this`:
// 1. Is h() an arrow function?
//    → No (h is double-bound regular function)
//       ⇒ Rule applied: "regular function → this depends on binding"

// 2. How is h() created?
//    → First bind: f.bind({ x: 10 }) creates g
//    → Second bind: g.bind({ x: 50 }) creates h
//       ⇒ Rule applied: "once bound with bind(), cannot be rebound"

// Final Explanation:
// - First bind({ x: 10 }) takes precedence
// - Second bind({ x: 50 }) has no effect
// Output: 10

//F.4
const obj = { x: 10 };
function f() {
  console.log(this.x);
}
const g = f.bind(obj);
g.call({ x: 99 });
g.apply({ x: 88 });

// Checklist for figuring out `this`:
// 1. Is g() an arrow function?
//    → No (g is bound regular function)
//       ⇒ Rule applied: "regular function → this depends on binding"

// 2. How is g() created?
//    → Using bind() with obj
//       ⇒ Rule applied: "once bound with bind(), cannot be rebound"

// Final Explanation:
// - f.bind(obj) creates g permanently bound to obj
// - call() and apply() have no effect
// Output: 10, 10

//F.5
function f() {
  console.log(this.x);
}
const a = f.bind({ x: 1 });
const b = a.bind({ x: 2 });
b.call({ x: 3 });

// Checklist for figuring out `this`:
// 1. Is b() an arrow function?
//    → No (b is double-bound regular function)
//       ⇒ Rule applied: "regular function → this depends on binding"

// 2. How is b() created?
//    → First bind: f.bind({ x: 1 }) creates a
//    → Second bind: a.bind({ x: 2 }) creates b
//       ⇒ Rule applied: "once bound with bind(), cannot be rebound"

// Final Explanation:
// - First bind({ x: 1 }) takes precedence
// - Second bind and call have no effect
// Output: 1

//G.1
const obj = {
  x: 10,
  f: () => console.log(this.x),
};
obj.f.call({ x: 999 });

// Checklist for figuring out `this`:
// 1. Is f() an arrow function?
//    → Yes (f is arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is the global scope

// Final Explanation:
// - Arrow function defined in object literal inherits this from global scope
// - call() cannot rebind arrow function
// Output: undefined

//G.2
function outer() {
  return {
    inner: () => console.log(this),
  };
}
outer().inner.call({ a: 10 });

// Checklist for figuring out `this`:
// 1. Is inner() an arrow function?
//    → Yes (inner is arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is outer()

// 3. How is outer() called?
//    → As a plain function: outer()
//       ⇒ In non-strict mode → this = global object

// Final Explanation:
// - outer() called as plain function, this = global object
// - Arrow function inherits this from parent scope (outer())
// - call() cannot rebind arrow function
// Output: global object

//G.3
const obj = {
  x: 1,
  f() {
    return () => {
      return () => console.log(this.x);
    };
  },
};
obj.f()()();

// Checklist for figuring out `this`:
// 1. Is the final function an arrow function?
//    → Yes (nested arrow functions)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope chain?
//    → Final arrow → middle arrow → f()

// 3. How is f() called?
//    → As a method: obj.f()
//       ⇒ Rule applied: "method call → this = obj"

// Final Explanation:
// - f() called as method, this = obj
// - Arrow functions inherit this through the chain
// Output: 1

//G.4
const obj = {
  x: 10,
  f() {
    return function () {
      return () => console.log(this.x);
    };
  },
};
obj.f()().call({ x: 99 });

// Checklist for figuring out `this`:
// 1. Is the final function an arrow function?
//    → Yes (returns arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is the middle function

// 3. How is the middle function called?
//    → Using call() with { x: 99 }
//       ⇒ Rule applied: "call() sets this for regular functions"

// Final Explanation:
// - Middle function called with call({ x: 99 }), this = { x: 99 }
// - Arrow function inherits this from parent scope (middle function)
// Output: 99

//G.5
const obj = {
  x: 10,
  f() {
    return () =>
      function () {
        console.log(this.x);
      };
  },
};
obj.f()().call({ x: 50 });

// Checklist for figuring out `this`:
// 1. Is the final function an arrow function?
//    → No (returns regular function)
//       ⇒ Rule applied: "regular function → this depends on binding/call site"

// 2. How is the final function called?
//    → Using call() with { x: 50 }
//       ⇒ Rule applied: "call() explicitly sets this to first argument"

// Final Explanation:
// - Final function called with call({ x: 50 }), this = { x: 50 }
// Output: 50

//H.1
const obj = {
  x: 10,
  f() {
    setTimeout(function () {
      console.log(this.x);
    }, 0);
  },
};
obj.f();

// Checklist for figuring out `this`:
// 1. Is the setTimeout callback an arrow function?
//    → No (regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the callback called?
//    → Called by setTimeout internally
//       ⇒ Rule applied: "callback functions lose their original this"

// Final Explanation:
// - Callback loses original binding, this = global object
// Output: undefined

//H.2
const obj = {
  x: 10,
  f() {
    setTimeout(() => console.log(this.x), 0);
  },
};
obj.f();

// Checklist for figuring out `this`:
// 1. Is the setTimeout callback an arrow function?
//    → Yes
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is f()

// 3. How is f() called?
//    → As a method: obj.f()
//       ⇒ Rule applied: "method call → this = obj"

// Final Explanation:
// - f() called as method, this = obj
// - Arrow function inherits this from parent scope (f())
// Output: 10

//H.3
function f() {
  console.log(this.x);
}
const obj = { x: 10 };
setTimeout(f.bind(obj), 0);

// Checklist for figuring out `this`:
// 1. Is the callback an arrow function?
//    → No (bound regular function)
//       ⇒ Rule applied: "regular function → this depends on binding"

// 2. How is the callback created?
//    → Using bind() with obj
//       ⇒ Rule applied: "once bound with bind(), cannot be rebound"

// Final Explanation:
// - f.bind(obj) creates function permanently bound to obj
// - setTimeout calls the bound function
// Output: 10

//H.4
function f() {
  console.log(this.x);
}
const obj = { x: 10 };
setTimeout(f.bind(obj).bind({ x: 20 }), 0);

// Checklist for figuring out `this`:
// 1. Is the callback an arrow function?
//    → No (double-bound regular function)
//       ⇒ Rule applied: "regular function → this depends on binding"

// 2. How is the callback created?
//    → First bind: f.bind(obj)
//    → Second bind: .bind({ x: 20 })
//       ⇒ Rule applied: "once bound with bind(), cannot be rebound"

// Final Explanation:
// - First bind(obj) takes precedence
// - Second bind has no effect
// Output: 10

//H.5
const obj = {
  x: 1,
  f() {
    setTimeout(this.g, 0);
  },
  g() {
    console.log(this.x);
  },
};
obj.f();

// Checklist for figuring out `this`:
// 1. Is the callback an arrow function?
//    → No (this.g is regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the callback passed?
//    → setTimeout(this.g, 0) passes function reference
//    → Similar to method extraction - loses object context

// Final Explanation:
// - this.g extracts the function reference without context
// - setTimeout calls g() with this = global object
// Output: undefined

//I.1
(function (x) {
  console.log(this, x);
})(10);

// Checklist for figuring out `this`:
// 1. Is the IIFE an arrow function?
//    → No (IIFE is regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the IIFE called?
//    → As a plain function: (function(){})()
//       ⇒ In non-strict mode → this = global object

// Final Explanation:
// - IIFE called as plain function in non-strict mode
// - this = global object, x = 10
// Output: global object, 10

//I.2
("use strict");
(function () {
  console.log(this);
})();

// Checklist for figuring out `this`:
// 1. Is the IIFE an arrow function?
//    → No (IIFE is regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the IIFE called?
//    → As a plain function: (function(){})()
//       ⇒ In strict mode → this = undefined

// Final Explanation:
// - IIFE called as plain function in strict mode
// - this = undefined
// Output: undefined

//I.3
const obj = {
  x: 10,
  f: (function () {
    console.log(this);
    return () => console.log(this.x);
  })(),
};
obj.f();

// Checklist for figuring out `this`:
// 1. Is the IIFE an arrow function?
//    → No (IIFE is regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the IIFE called?
//    → As a plain function during object creation
//       ⇒ In non-strict mode → this = global object
// Output: global object (during object creation)

// Checklist for figuring out `this`:
// 1. Is f() an arrow function?
//    → Yes (IIFE returns arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is the IIFE

// Final Explanation:
// - IIFE called as plain function, this = global object
// - Arrow function inherits this from parent scope (IIFE)
// - global.x is undefined
// Output: undefined

//I.4
const obj = {
  x: 10,
  f: (function () {
    return function () {
      console.log(this.x);
    };
  })(),
};
obj.f();

// Checklist for figuring out `this`:
// 1. Is the IIFE an arrow function?
//    → No (IIFE is regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the IIFE called?
//    → As a plain function during object creation
//       ⇒ In non-strict mode → this = global object

// Checklist for figuring out `this`:
// 1. Is f() an arrow function?
//    → No (IIFE returns regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is f() called?
//    → As a method: obj.f()
//       ⇒ Rule applied: "method call → this = obj"

// Final Explanation:
// - f() called as method, this = obj
// Output: 10

//I.5
const obj = {
  x: 10,
  f: (function () {
    return () =>
      function () {
        console.log(this.x);
      };
  })(),
};
obj.f()();

// Checklist for figuring out `this`:
// 1. Is the IIFE an arrow function?
//    → No (IIFE is regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the IIFE called?
//    → As a plain function during object creation
//       ⇒ In non-strict mode → this = global object

// Checklist for figuring out `this`:
// 1. Is the first returned function an arrow function?
//    → Yes (IIFE returns arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is the IIFE

// Checklist for figuring out `this`:
// 1. Is the final function an arrow function?
//    → No (first function returns regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 3. How is the final function called?
//    → As a plain function: obj.f()()
//       ⇒ In non-strict mode → this = global object

// Final Explanation:
// - First arrow function inherits this = global from IIFE
// - Final function called as plain function, this = global object
// Output: undefined

//J.1
const obj = {
  x: 5,
  f() {
    console.log(this.x);
  },
};
(obj?.f)();

// Checklist for figuring out `this`:
// 1. Is f() an arrow function?
//    → No (f is regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is f() called?
//    → As a plain function: (obj?.f)()
//       ⇒ Optional chaining doesn't preserve method binding

// Final Explanation:
// - Optional chaining extracts function reference
// - Called as plain function, this = global object
// Output: undefined

//J.2
const obj = {
  x: 5,
  f() {
    return function () {
      console.log(this.x);
    };
  },
};
(obj?.f)()();

// Checklist for figuring out `this`:
// 1. Is the returned function an arrow function?
//    → No (f() returns regular function)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is the returned function called?
//    → As a plain function: (obj?.f)()()
//       ⇒ In non-strict mode → this = global object

// Final Explanation:
// - Optional chaining extracts function reference
// - Final function called as plain function
// Output: undefined

//J.3
const obj = {
  x: 5,
  f() {
    return () => console.log(this.x);
  },
};
(obj?.f)()();

// Checklist for figuring out `this`:
// 1. Is the returned function an arrow function?
//    → Yes (f() returns arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is f()

// 3. How is f() called?
//    → As a plain function: (obj?.f)()
//       ⇒ In non-strict mode → this = global object

// Final Explanation:
// - f() called as plain function due to optional chaining, this = global object
// - Arrow function inherits this from parent scope (f())
// Output: undefined

//J.4
const obj = {
  x: 10,
  nested: null,
  f() {
    console.log(this.x);
  },
};
const fn = obj.nested?.f;
fn?.();

// Checklist for figuring out `this`:
// 1. Is fn an arrow function?
//    → No (f is regular method)
//       ⇒ Rule applied: "regular function → this depends on call site"

// 2. How is fn accessed?
//    → obj.nested?.f returns undefined (nested is null)
//    → fn?.() does nothing (safe call on undefined)

// Final Explanation:
// - obj.nested?.f returns undefined
// - fn?.() safely calls nothing
// Output: (no output)

//J.5
const obj = {
  x: 10,
  f: () => console.log(this.x),
};
obj?.f?.();

// Checklist for figuring out `this`:
// 1. Is f() an arrow function?
//    → Yes (f is arrow function)
//       ⇒ Rule applied: "arrow function → this comes from parent scope"

// 2. What is the parent scope of the arrow function?
//    → The parent scope is the global scope

// Final Explanation:
// - Arrow function defined in object literal inherits this from global scope
// - Optional chaining doesn't affect arrow function binding
// Output: undefined
