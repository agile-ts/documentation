---
id: react 
title: React 
sidebar_label: React 
slug: /quick-start/react
---

In this guide your learn, how to integrate and use AgileTs in a React Project. I promise you, it's pretty easy 😃. We
recommend you to proceed from top to bottom, because some sections build on each other.

## 🔽 Installation

To properly use AgileTs in a React Application, we have to install two packages. The `core` package, and a package that
allows us to integrate AgileTs into a React Environment.

### 📁 `@agile-ts/core`

```bash npm2yarn
npm install @agile-ts/core 
```

Let's begin with the `core` package, which acts as the brain of AgileTs 
and manages all our [States](../packages/core/features/state/Introduction.md), 
[Collections](../packages/core/features/collection/Introduction.md), ..

### 📂 `@agile-ts/react`

```bash npm2yarn
npm install @agile-ts/react 
```

Now we continue installing the React Integration, which is like an interface to React and provides useful Functions
like [`useAgile`](../packages/react/features/Hooks.md#useagile)
to bind our States to a React Component.

### 🚀 `create-react-app`

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

In case you start a project from scratch, feel free to use the `react-template` for AgileTs, which automatically
generates a react-app with AgileTs installed.


<br />

---

<br />

## 💡 Create first State

### ❓ What is a State

A State holds an _information_ that we need to remember at a later point in time. In AgileTs it gets created with help
of an instantiated [Agile Instance](../packages/core/features/agile-instance/Introduction.md) here called `App`.

```ts
const MY_FIRST_STATE = App.createState("Hello World");
```

After we have successfully created our State, we can dynamically and easily manipulate it.

```ts
MY_FIRST_STATE.set("Hello There"); // Set State Value to "Hello There"
MY_FIRST_STATE.undo(); // Undo latest change
MY_FIRST_STATE.is("Hello World"); // Check if State has a specific Value
MY_FIRST_STATE.persist(); // Persist State Value into Storage
```

In case you have no idea in which scenario you need a State, here are some ideas:

- current theme (dark theme, light theme)
- current logged-in user

### 🔴 Live Example

In the code snippet below, we create a [State](../packages/core/features/state/Introduction.md) which has the initial
value `Hello World`. Next to the `Hello World` output, we have a button that incrementally raises a number and attaches
it to the `Hello World` State. In case you have any questions, they might be answered in
the [Important Code Snippets](#-important-code-snippets) Section below, or by our awesome community in
the [Community Discord](https://discord.gg/T9GzreAwPH).

```tsx live
// Let's start by creating an Agile Instance
const App = new Agile();

// Now we are able to build our first State which has the intial value "Hello World"
const MY_FIRST_STATE = App.createState("Hello World");
let helloWorldCount = 0;

const RandomComponent = () => {
    // With the 'useAgile' Hook we bind our just created State to the 'RandomComponent'
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

To find out more about States, checkout our [State](../packages/core/features/state/Introduction.md) docs.

### 💻 Important Code Snippets

```ts
const App = new Agile();
```

Before we are able to create any State, we have to instantiate a AgileTs Instance. Such an Instance holds and manages
all our States, Collections, .. Be aware that it's not recommended having multiple Agile Instances in one application!

```ts
const MY_FIRST_STATE = App.createState("Hello World");
```

In this snippet we create our first State in AgileTs. It was built from our previously instantiated AgileTs Instance and
got automatically stored in it with the initial value "Hello World".

```ts
const myFirstState = useAgile(MY_FIRST_STATE);
```

Here we use the [`useAgile`](../packages/react/features/Hooks.md#useagile) React Hook to bind our State to the React
Component. This binding is necessary to rerender the Component whenever the State mutates, for instance if we change the
value of the State.
`useAgile` returns the current `output` of our State. Be aware that hooks can only be used in React Components!
For class component Users we have created the [AgileHOC](../packages/react/features/AgileHOC.md).

```ts
MY_FIRST_STATE.set(`Hello World ${++helloWorldCount}`);
```

To bring some life into our small application we update the State with the `set` function and pass our desired new
value.

<br />

---

<br />

## 💡 Create first Collection

### ❓ What is a Collection

A Collection is like an array of object shaped data following the same pattern. It gets created with help of an
instantiated [Agile Instance](../packages/core/features/agile-instance/Introduction.md) here called `App`.

```ts
const MY_COLLECTION = App.createCollection();
```

After the instantiation it can be dynamically and easily manipulated.

```ts
TODOS.collect({id: "id1", todo: "Clean Bathroom"}); // Add new Data
TODOS.update("id1", {todo: "Clean Room"}); // Update already collected Data
TODOS.remove("id1").everywhere(); // Remove Data at 'id1'
TODOS.persist(); // Persist Collection Value into Storage
```

Be aware that each collected data has to be in object shape and needs a unique primaryKey like an `id`. The data gets
transformed to a fresh State, which represents the value it was collected as. A so-called Item has the same
functionalities as a normal State.

```ts
MY_COLLECTION.getItem('id1').patch({todo: "Clean Bathroom"})
```

Beside Items a Collection consists out of Groups, which allow us to split our Collection into multiple sections, without
losing the redundant behavior. Each Item is always added to the `default` Group, but it doesn't get stored there, it
just follows the primary Pattern the Group provides.

```ts
const USER_TODOS = TODOS.createGroup("user-todos", ["id1", "id2"]); // TODOS of a specifc User
const TODAY_TODOS = TODOS.createGroup("today-todos", ["id3", "id2", "id5"]); // TODOS for Today
```

If you have no idea where in hell you need such a Collection, here are some examples:

- dynamically set of Todo-Objects (example below)
- messages in a chat application

### 🔴 Live Example

In the code snippet below, we create a basic Todo [Collection](../packages/core/features/collection/Introduction.md). To
feet it with fresh todos we have a text input and a `add` button in the ui layer. And to remove a todo later when it's
done, we have a `remove` button next to it. In case you have any questions, they might be answered in
the [Important Code Snippets](#-important-code-snippets) Section below or by our awesome community in
the  [Community Discord](https://discord.gg/T9GzreAwPH).

```tsx live
// Let's start by creating our Agile Instance 
const App = new Agile();

// Now we are able to build our first Collection
const TODOS = App.createCollection({
  initialData: [{id: 1, name: "Clean Bathroom"}]
}).persist('todos');

const RandomComponent = () => {
    // With the 'useAgile' Hook we bind our first Collection to the 'RandomComponent'
    const todos = useAgile(TODOS);

    // Current Input of Name Form
    const [currentInput, setCurrentInput] = React.useState("");

    return (
        <div>
            <h3>Simple TODOS</h3>
            <input type="text" name="name" value={currentInput} onChange={(event) => {
                setCurrentInput(event.target.value);
            }}/>
            <button onClick={() => {
              if(currentInput === '') return;
                
              // Add new Todo to the Collection based on the current Input
              TODOS.collect({id: generateId(), name: currentInput});
              setCurrentInput('');
            }}>
                Add
            </button>
            {
                todos.map((value) =>
                    <div key={value.id} style={{marginBottom: 10}}>
                        <div>{value.name}</div>
                        <button style={{margin: 0}}  onClick={() => {
                         // Remove Item at specific primary Key
                         TODOS.remove(value.id).everywhere();
                       }}>
                        Remove
                      </button>
                    </div>
                )
            }
        </div>
    );
}

render(<RandomComponent/>);
```

To find out more about Collections, checkout our [Collection](../packages/core/features/collection/Introduction.md)
docs.

### 💻 Important Code Snippets

```ts
const MY_FIRST_COLLECTION = App.createCollection({
  initialData: [{id: 1, name: "Clean Bathroom"}]
}).persist();
```

To create our first Collection we need the previously instantiated Instance of AgileTs. Then we are able to bring our
first Collection to life, with the initial Item '_{id: 1, name: "Clean Bathroom"}_'. Beside to the creation we store the
Collection in the `localStorage`
with help of the `persist` function.

```ts
const myFirstCollection = useAgile(MY_FIRST_COLLECTION);
```

Here we use the [`useAgile`](../packages/react/features/Hooks.md#useagile) React Hook to bind our Collection to the
React Component. In case of Collections it returns the built `default` Group value in array shape.

```ts
 MY_FIRST_COLLECTION.collect({id: generateId(), name: currentInput});
```

To add new Data to our Collection, we use the `collect` function. In this example, we add the _currentInput_ to our
Collection, with a random Id as primaryKey.

```ts
TODOS.remove(value.id).everywhere();
```

In case we have done a todo, we want to remove it. The `remove` function of the Collection helps us to do this.
`everywhere()` means, that the Item will be removed from the whole Collection.

## 🔍 More

AgileTs got your attention, and you want to learn more. Checkout the docs below.

- [core](../packages/core/Introduction.md)
- [react](../packages/react/Introduction.md)
