---
id: vue
title: Vue
sidebar_label: Vue
slug: /quick-start/vue
---

:::warning

**The Vue integration is currently 'Work in Progress'**
and hasn't yet been tested extensively! 
But as far as I can tell, it works well, with some type limitations.

:::

Welcome to the [Vue](https://vuejs.org/) quick start guide. This tutorial will introduce you to AgileTs
and teach you how to use its basic functionalities in Vue.
By the time you finish this guide, you should be able to start building your own AgileTs applications.
**We recommend proceeding from top to bottom because some sections build on each other.**

## 🔽 Installation

Let's start with the installation. If you haven't planned to install AgileTs yet,
you can skip the Installation Section and jump straight into the '[Create first State](#-create-first-state)' guide.

In order to use AgileTs in a Vue Environment, we need to install two packages.
- [`@agile-ts/core`](#-agile-tscore)
- [`@agile-ts/vue`](#-agile-tsvue)

### 📁 `@agile-ts/core`

```bash npm2yarn
npm install @agile-ts/core 
```
The [`core`](../packages/core/Introduction.md) package contains the State Management Logic of AgileTs
and therefore offers powerful classes such as the [`State Class`](../packages/core/features/state/Introduction.md).

### 📂 `@agile-ts/vue`

```bash npm2yarn
npm install @agile-ts/vue 
```
The [Vue Integration](../packages/vue/Introduction.md), on the other hand, is an interface to Vue and provides useful functions
like the [`bindAgileInstances()`](../packages/vue/Introduction.md#bindagileinstances)) method to bind States to Vue Components for reactivity.

## 💡 Create first State

After we have set up a project with AgileTs installed, we can start creating our first AgileTs State.
But first things first, what is a State in AgileTs?

### ❓ What is a State

A `State` manages a global _information_ that we need to remember at a later point in time.
Such information might be the current theme or the logged-in user,
which we need to access globally in multiple Components.
In AgileTs States are created with the help
of an instantiated [Agile Instance](#agile-instance-app) often called `App`.
```ts
const MY_FIRST_STATE = App.createState("Hello World");
```
After a successful instantiation, we can dynamically and easily manipulate its value.
```ts
MY_FIRST_STATE.set("Hello There"); // Set State Value to "Hello There"
MY_FIRST_STATE.undo(); // Undo latest change
MY_FIRST_STATE.is("Hello World"); // Check if State has a specific Value
MY_FIRST_STATE.persist(); // Persist State Value into Storage
```

#### `Agile Instance (App)`

As you have just seen, States are created with the help of an instantiated [Agile Instance](../packages/core/features/agile-instance/Introduction.md) called `App`.
```ts
const App = new Agile();
```
But what is this _Agile Instance_ and why do we need it to create a State?
Simply put, the Agile Instance is the brain of AgileTs and manages all our States.
It should be noted that it doesn't store the States; It only manages them.
Each State has an Instance of the `Agile Class`, for example, to ingest its changes into the `runtime`.
In summary, the main tasks of the `Agile Class` are to:
- queuing [`Agile Sub Instance`](../main/Introduction.md#agile-sub-instance) changes in the `runtime` and preventing race conditions
- update/rerender subscribed Components through Integrations like the [Vue Integration](../packages/vue/Introduction.md)
- Integrating with persistent [Storage](../packages/core/features/storage/Introduction.md)
- provide configuration object


### 👨‍💻 Example {#example-1}

To better understand how to use an Agile State in Vue, we should view it in an example.
The sample project we'll look at is a small counter that lets us increase a number as we click the 'Update State' button.
It may not be fascinating, but it shows all the essential pieces of a Vue + AgileTs application in action.
After checking out the example, we recommend taking a look at the [Important Code Snippets Section](#important-code-snippets-1) below,
where important code snippets related to AgileTs are described in more detail.
In case you have any further questions, don't hesitate to join our [Community Discord](https://discord.gg/T9GzreAwPH).
```tsx
// -- core.js ------------------------------------------------

// 1️⃣ Create Instance of AgileTs
const App = new Agile();

// 2️⃣ Create State with help of before defined Agile Instance
const MY_FIRST_STATE = App.createState("Hello World");

// -- MyComponent.vue ------------------------------------------------

<template>
    <div>
        <!-- 4️⃣ Access State value in the 'sharedState' property -->
        <p>{{sharedState.myFirstState}}</p>
        <button @click='updateHelloWorld'>Update State</button>
    </div>
</template>

<script>
    const helloWorldCount = 0;
    
    export default {
      data: function() {
        return {
            // 3️⃣ Bind initialized State to Component for reactivity
            ...this.bindAgileInstances({
             myFirstSTate: MY_FIRST_STATE
            }),
        };
      }
      methods: {
        updateHelloWorld: function() {
            // 5️⃣ Update State value on Button press
            MY_FIRST_STATE.set(`Hello World ${++helloWorldCount}`)
        }
      }  
   }
</script>
```
Check out the [code sandbox](https://codesandbox.io/s/agilets-first-state-i5xxs) to see the whole example in a production near environment.

### 💻 Important Code Snippets {#important-code-snippets-1}

```ts
const App = new Agile();
```
1️⃣ In order to instantiate any State, we need an AgileTs Instance.
Such an Instance can be seen as the brain of AgileTs, which manages all our States.
Be aware that you should avoid having multiple Agile Instances in one application!

```ts
const MY_FIRST_STATE = App.createState("Hello World");
```
2️⃣ Now, we can create our first State using the previously instantiated AgileTs Instance.
In our example, we have assigned the initial Value `'Hello World'` to the State.

```ts
data: function() {
    return {
        ...this.bindAgileInstances({
            myFirstSTate: MY_FIRST_STATE
        }),
    };
}
```
3️⃣ Here we bind our created State to the Vue Component using the [`bindAgileInstances()`](../packages/vue/Introduction.md#bindagileinstances) method,
which merges the passed State `values` into the local `data` object.
This ensures that the Component rerenders whenever the State `value` mutates.
Furthermore, the State `value` can be accessed in the `html` code like a local Vue State.
Unfortunately, we haven't managed to make it typesafe yet. But we are working on it.

```tsx
<p>{{sharedState.myFirstState}}</p>
```
4️⃣ After binding the States to the Vue Component (Step 3),
we can access it like a local State in the `html` code.
However, the AgileTs State `values` are under the `sharedState` property located
to separate them from the local Vue States.

```ts
MY_FIRST_STATE.set(`Hello World ${++helloWorldCount}`);
```
5️⃣ To bring some life into our small application,
we update the State value with the help of the `set()` function on each 'Update State' button press.

### 😱 Troubleshooting

#### Component doesn't rerender when State mutates.
Such an issue might occur when the automatic integration of Vue has failed.
It often helps to manually integrate the Vue Integration into the Agile Instance then.
```ts
import {Agile} from "./agile";
import vueIntegration from "@agile-ts/vue";

const App = new Agile().integrate(vueIntegration);
```
If the problem continues to occur. Join our [Community Discord](https://discord.gg/T9GzreAwPH).
We are looking forward to helping you.

## 🔍 Next Steps

Now that you know the basics of AgileTs, you can take a look into the [Style Guide](../main/StyleGuide.md) Section,
to learn something about: How to structure an application using AgileTs?
Or you check out the specific package documentations, where everything is described in more detail.

- [core](../packages/core/Introduction.md)
- [vue](../packages/vue/Introduction.md)
