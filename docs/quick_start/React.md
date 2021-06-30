---
id: react
title: React
sidebar_label: React
slug: /quick-start/react
---

Welcome to the [React](https://www.reactjs.org) quick start guide. This tutorial will introduce you to AgileTs
and teach you how to use its basic functionalities in React.
By the time you finish this guide, you will be able to start building your own AgileTs applications.
**We recommend proceeding from top to bottom because some sections build on each other.**

## 🔽 Installation

Let's start with the installation. If you haven't intended to install AgileTs yet,
you can skip the installation guide and jump straight into the '[Create first State](#-create-first-state)' section.

In order to use AgileTs in a React Environment, we need to install two packages.
- [`@agile-ts/core`](#-agile-tscore)
- [`@agile-ts/react`](#-agile-tsreact)

If you have planned to set up a new project from scratch using AgileTs and React,
feel free to use the official AgileTs + React template from `create-react-app`.
This will automatically generate a fully functional React app with AgileTs installed.

<Tabs
defaultValue="javascript"
values={[
{label: 'Javascript', value: 'javascript'},
{label: 'Typescript', value: 'typescript'},
]}>
<TabItem value="javascript">

     npx create-react-app my-app --template agile

   </TabItem>
  <TabItem value="typescript">

     npx create-react-app my-app --template agile-typescript

  </TabItem>
</Tabs>

Otherwise, you can install the `@agile-ts/core` and `@agile-ts/react` packages directly 
into your existing React application.

### 📁 `@agile-ts/core`

```bash npm2yarn
npm install @agile-ts/core 
```
The [`core`](../packages/core/Introduction.md) package contains the State Management Logic of AgileTs
and therefore provides powerful classes like the [`State Class`](../packages/core/api/state/Introduction.md).

### 📂 `@agile-ts/react`

```bash npm2yarn
npm install @agile-ts/react 
```
The [React Integration](../packages/react/Introduction.md), on the other hand, 
is an interface to React and provides useful functionalities
such as the [`useAgile()`](../packages/react/api/Hooks.md#useagile) hook 
for binding States to React Components for reactivity.

## 💡 Create first State

After we have successfully set up a project with AgileTs installed, 
we can start creating our first AgileTs State.
But first things first, what is a State in AgileTs?

### ❓ What is a State

A `State` represents a piece of Information that we need to remember globally at a later point in time.
Such information can be the current theme or the logged-in user,
which we have to access in multiple React Components.
All we need to instantiate a State, is to call `createState()` and specify an initial value.
```ts
const MY_FIRST_STATE = createState("Hello World");
```
Now that we have instantiated our first State, 
we can dynamically and easily manipulate its value.
```ts
// Update State value to 'Hello There'
MY_FIRST_STATE.set("Hello There");

// Undo latest change (-> Value is now "Hello World" again)
MY_FIRST_STATE.undo();

// Permanently store State value in an external Storage
MY_FIRST_STATE.persist();
```


### 🔴 Live Example {#live-example-1}

To get a better understanding of how to use an AgileTs State in React, we should try it out.
Therefore, we have created a Live Example, 
where we can see a [AgileTs State](../packages/core/api/state/Introduction.md) in action.
The sample project we'll look at is a small counter 
that lets us increase a number as we click the 'Update State' button.
It may not be fascinating, 
but it shows all the essential pieces of a React + AgileTs application in action.
After playing a bit with the Live Example, 
we recommend taking a look at the [Important Code Snippets Section](#important-code-snippets-1) below.
There important code snippets related to AgileTs are described in more detail.
In case you have any further questions, 
don't hesitate to join our [Community Discord](https://discord.gg/T9GzreAwPH).
```tsx live
// 1️⃣ Create State with the initial value "Hello World"
const MY_FIRST_STATE = createState("Hello World");

let helloWorldCount = 0;
const RandomComponent = () => {
    // 2️⃣ Bind initialized State to 'RandomComponent' for reactivity
    const myFirstState = useAgile(MY_FIRST_STATE);

    return (
        <div>
            <p>{myFirstState}</p>
            <button
                onClick={() => {
                    // 3️⃣ Update State value on Button press
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
Check out the [code sandbox](https://codesandbox.io/s/agilets-first-state-f12cz) 
to see the whole example in a production near environment.

### 💻 Important Code Snippets {#important-code-snippets-1}

```ts
const MY_FIRST_STATE = createState("Hello World");
```
1️⃣ We create a State by using the `createState()` function 
and specifying 'Hello World' as initial value.

```ts
const myFirstState = useAgile(MY_FIRST_STATE); // Returns 'Hello World [x_number]'
```
️2️⃣ Now, we bind the previously created 'Hello World' State to the React Component 
using the [`useAgile()`](../packages/react/api/Hooks.md#useagile) Hook.
This binding ensures that the React Component re-renders whenever the current State `value` changes.
`useAgile()` returns the current `value` of the State. 
In our case that would be something like 'Hello World [x_number]'.

```ts
MY_FIRST_STATE.set(`Hello World ${++helloWorldCount}`);
```
3️⃣ To bring some life into our small counter application,
we update the current State value using the `set()` function 
every time we press the 'Update State' button.

### 😱 Troubleshooting

#### Component doesn't rerender when State mutates.
Such a problem can occur when the automatic integration of React has failed.
Often it helps to manually integrate the React integration  
into the Agile Instance to which the State belongs. 
In our case that would be the internal `shared` Agile Instance.
```ts
import {shared as App} from "@agile-ts/core";
import reactIntegration from "@agile-ts/react";

App.integrate(reactIntegration);
```

## 🔍 Next Steps

Now that you have learned the basics of AgileTs, 
you can take a look into the [Style Guide](../main/StyleGuide.md) documentation.
There you will learn more about how to structure your application States correctly.
Or you check out the individual package documentations, 
where everything is described in more detail, 
and you can discover more nice APIs and functionalities of AgileTs.

- [core](../packages/core/Introduction.md)
- [react](../packages/react/Introduction.md)
