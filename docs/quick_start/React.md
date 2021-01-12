---
id: react
title: React
sidebar_label: React
slug: /quick-start/react
---

## Installation

To properly integrate AgileTs into React, we need two packages. 
The `core` package, and a package that allows us to integrate AgileTs into React, the `React Integration`.

### 📁 `@agile-ts/core`

```bash npm2yarn
npm install @agile-ts/core 
```

Let's start with the `core` package, which acts as the brain of AgileTs. 
It manages all your Agile instances like states, collections, ...


### 📂 `@agile-ts/react`

```bash npm2yarn
npm install @agile-ts/react 
```

The `React` Package is an interface to React and provides 
Functions like `useAgile` to bind Agile Instances to React Components.

## Simple Example

```tsx live
const App = new Agile();
const MY_FIRST_STATE = App.State("Hello World");
let helloWorldCount = 0;

const RandomComponent = () => {
    const myFirstState = useAgile(MY_FIRST_STATE);

    return (
        <div>
            <p>{myFirstState}</p>
            <button
                onClick={() => {
                    MY_FIRST_STATE.set(`Hello World ${++helloWorldCount}`)
                }}
            >
                Update State
            </button>
        </div>
    );
}

render(<RandomComponent/>);
```
