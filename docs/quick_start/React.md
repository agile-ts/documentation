---
id: react 
title: React 
sidebar_label: React 
slug: /quick-start/react
---

## 🔽 Installation

To properly integrate AgileTs into React, we need two packages. The `core` package, and a package that allows us to
integrate AgileTs into React, the `React Integration`.

### 📁 `@agile-ts/core`

```bash npm2yarn
npm install @agile-ts/core 
```

Let's start with the `core` package, which acts as the brain of AgileTs. It manages all your Agile instances like
states, collections, ...

### 📂 `@agile-ts/react`

```bash npm2yarn
npm install @agile-ts/react 
```

The `React` Package is an interface to React and provides Functions like `useAgile` to bind Agile Instances to React
Components.

<br />

---

<br />

## 🚀 Straightforward Examples

To give you an idea how AgileTs works with React, I created some simple Examples that you can tweak in realtime.

### 💡 Create first State

```tsx live
// Let's start by creating our Agile Instance
const App = new Agile();

// Now we are able to build our first State which has the value "Hello World"
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

<br />

---

<br />

### 💡 Create first Collection

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

## 🔍 More

If you want to learn more. Checkout the links below.

- [core](../packages/core/Introduction.md)
- [react](../packages/react/Introduction.md)
