---
id: react 
title: React 
sidebar_label: React 
slug: /quick-start/react
---

In this guide we show you how to integrate and use AgileTs in a React Project.
I promise you, it's really easy.

## 🔽 Installation

To properly use AgileTs in a React Project, we need two packages. The `core` package, and a package that allows us to
integrate AgileTs into React, a `React Integration`.

### 📁 `@agile-ts/core`

```bash npm2yarn
npm install @agile-ts/core 
```

Let's start with the `core` package, which acts as the brain of AgileTs and manages all your States, Collections, ..

### 📂 `@agile-ts/react`

```bash npm2yarn
npm install @agile-ts/react 
```

Now we can install the `react` package, too.
The `React` Integration is like an interface to React 
and provides Functions like `useAgile` to bind our States to a React Component.
This is necessary to cause rerender on the Component if a bound State mutates.

<br />

---

<br />


## 💡 Create first State

### ❓ What is a State
A State is an Information that you need to remember at a later point in time.
It can be dynamically and easily manipulated.

**For instance** <br/>
You can use a State to remember which user is currently logged in or what theme is active right now.

### 🔴 Live Example

In this code snippet we create our first State 😃.
Below the Live Example you can find [some descriptions to important code snippets](#💻-Important-Code-Snippets).

```tsx live
// Let's start by creating an Agile Instance
const App = new Agile();

// Now we are able to build our first State which has the intial value "Hello World"
const MY_FIRST_STATE = App.State("Hello World");
let helloWorldCount = 0;

const RandomComponent = () => {
    // With the 'useAgile' Hook we bind our first State to the 'RandomComponent'
    const myFirstState = useAgile(MY_FIRST_STATE);

    return (
        <div>
            <p>{myFirstState}</p>
            <button
                onClick={() => {
                    // Here we just update our State Value
                    MY_FIRST_STATE.set(`Hello World ${++helloWorldCount}`);
                }}
            >
                Update State
            </button>
        </div>
    );
}

render(<RandomComponent/>);
```

### 💻 Important Code Snippets

```ts
const App = new Agile();
```
Before we can create any State, we have to instantiate a main Agile Instance.
This Instance holds and manages all our States, Collections, ..
Be aware that it's not recommended having multiple Agile Instances in one application!

```ts
const MY_FIRST_STATE = App.State("Hello World");
```
Now we can create our first State in AgileTs.
It was built from our previously created Agile Instance 
and got the initial value "Hello World".

```ts
const myFirstState = useAgile(MY_FIRST_STATE);
```
Here we are using the `useAgile` React Hook to bind our State to the React Component.
`useAgile` returns the current `output` of our State.
Be aware that hooks can only be used in React Components! 

```ts
MY_FIRST_STATE.set(`Hello World ${++helloWorldCount}`);
```
We can easily mutate our State for instance with the `set` function, 
in which we just pass our desired new value.

<br />

---

<br />

## 💡 Create first Collection

### ❓ What is a Collection
A Collection is like an array of object shaped data following the same pattern.
It can be dynamically and easily manipulated.
Each Collection Item needs an primaryKey like an id to be easily identifiable.

**For instance** <br/>
You can use a Collection if you need a dynamically set of objects like Todos in a Todo-List.

### 🔴 Live Example

In this code snippet we create our first Collection 😃.
Below the Live Example you can find [some descriptions to important code snippets](#💻-Important-Code-Snippets).

```tsx live
// Let's again start by creating our Agile Instance
const App = new Agile();

// Now we are able to build our first Collection 
const MY_FIRST_COLLECTION = App.Collection();

// After that we can collect our first Data 
MY_FIRST_COLLECTION.collect({id: 1, name: "Frank"});

// To simply create unique id's we just increase the currentId
let currentId = 2;

const RandomComponent = () => {
    // With the 'useAgile' Hook we bind our first Collection to the 'RandomComponent'
    const myFirstCollection = useAgile(MY_FIRST_COLLECTION);

    // Current Input of Name-Form
    const [currentInput, setCurrentInput] = React.useState("");

    return (
        <div>
            <h3>Add Person</h3>
            <input type="text" name="name" value={currentInput} onChange={(event) => {
                setCurrentInput(event.target.value);
            }}/>
            <button onClick={() => {
                // Collect new Person based on the current Input
                MY_FIRST_COLLECTION.collect({id: ++currentId, name: currentInput});
            }}>
                Submit
            </button>
            
            {
                myFirstCollection.map((value) =>
                    <div key={value.id}>
                        <p>{value.name}</p>
                    </div>
                )
            }
        </div>
    );
}

render(<RandomComponent/>);
```

### 💻 Important Code Snippets

TODO

## 🔍 More

AgileTs got your attention, and you want to learn more. Checkout the links below.

- [core](../packages/core/Introduction.md)
- [react](../packages/react/Introduction.md)
