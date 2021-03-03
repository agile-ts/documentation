---
id: react
title: React
sidebar_label: React
slug: /quick-start/react
---

In this guide, you learn how to integrate and use AgileTs in a React Project. I promise you, it's pretty easy 😃. We
recommend proceeding from top to bottom because some sections build on each other.

## 🔽 Installation

To properly use AgileTs in a React Application, we have to install two packages. On the one side, the `core` package and an AgileTs Integration for React on the other site.

### 📁 `@agile-ts/core`

```bash npm2yarn
npm install @agile-ts/core 
```

Let's begin with the `core` package, which acts as the brain of AgileTs
and manages all our [States](../packages/core/features/state/Introduction.md),
[Collections](../packages/core/features/collection/Introduction.md), ..
It is the only essential package for using AgileTs.

### 📂 `@agile-ts/react`

```bash npm2yarn
npm install @agile-ts/react 
```

Besides the `core` package, we install a React Integration.
It is like an interface to React and provides useful Functions
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

In case you start your project from scratch, feel free to use the `react-template` for AgileTs. This template will automatically
generate a fully functional react-app with AgileTs installed.


<br />

---

<br />

## 💡 Create first State

### ❓ What is a State

States hold  _information_ we need to remember at a later point in time.
Such information might be the current theme or the logged-in user.
In AgileTs a State gets created with the help
of an instantiated [Agile Instance](../packages/core/features/agile-instance/Introduction.md) often called `App`.

```ts
const MY_FIRST_STATE = App.createState("Hello World");
```

After a successful instantiation of our State, we can dynamically and easily manipulate its value.

```ts
MY_FIRST_STATE.set("Hello There"); // Set State Value to "Hello There"
MY_FIRST_STATE.undo(); // Undo latest change
MY_FIRST_STATE.is("Hello World"); // Check if State has a specific Value
MY_FIRST_STATE.persist(); // Persist State Value into Storage
```

### 🔴 Live Example

In the following snippet we will create our first AgileTs [State](../packages/core/features/state/Introduction.md) which has the initial
value `Hello World`. Next to the `Hello World` output, we have provided a button that incrementally raises a number and attaches
it to the `Hello World` State. In case you have any further questions, take a look into the [Important Code Snippets](#-important-code-snippets) Section, or join our awesome [Community Discord](https://discord.gg/T9GzreAwPH)

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

Before we can create any State, we have to instantiate an AgileTs Instance. Such an Instance holds and manages
all our States, Collections, .. Be aware that you should avoid having multiple Agile Instances in one application!

```ts
const MY_FIRST_STATE = App.createState("Hello World");
```

With the help of our previously instantiate AgileTs Instance, we can create our first State. Our State got the initial value `'Hello World'`, which we passed as first property.

```ts
const myFirstState = useAgile(MY_FIRST_STATE);
```

[`useAgile`](../packages/react/features/Hooks.md#useagile) is React Hook to bind our State to a specific React
Component. This binding is necessary to rerender the Component whenever our State mutates. For instance, if its value changes.
`useAgile` returns the current `output` of the State, so in our case 'Hello World'. Be aware that React Hooks can only be used in React Components!
For class component users we have created the [AgileHOC](../packages/react/features/AgileHOC.md).

```ts
MY_FIRST_STATE.set(`Hello World ${++helloWorldCount}`);
```

To bring some life into our small application, we update the State with the help of the `set` function and pass our desired new
value as first property.

<br />

---

<br />

## 💡 Create first Collection

### ❓ What is a Collection

A Collection is like an array of object-shaped data following the same pattern. A use case might be to store a flexible todo list or the messages of a chat. It gets created with the help of an
instantiated [Agile Instance](../packages/core/features/agile-instance/Introduction.md) often called `App`.

```ts
const MY_COLLECTION = App.createCollection();
```

After a successful instantiation of our Collection, we can dynamically and easily manipulate its value.

```ts
TODOS.collect({id: "id1", todo: "Clean Bathroom"}); // Add new Data
TODOS.update("id1", {todo: "Clean Room"}); // Update already collected Data
TODOS.remove("id1").everywhere(); // Remove Data at 'id1'
TODOS.persist(); // Persist Collection Value into Storage
```

Be aware that each collected data has to be in object shape and needs a unique primary key like an `id`. Each collected data is automatically
transformed into a new State, representing the value it was collected as. A so-called Item has the same
functionalities as a normal State.

```ts
MY_COLLECTION.getItem('id1').patch({todo: "Clean Bathroom"})
```

Besides Items, a Collection consists primarily of Groups, which allows us to split the Collection into multiple individual sections without
losing redundant behavior. Each Item will be added to the `default` Group, which represents the default Collection pattern.  But a Group doesn't store the Item itself. It only holds the primary keys of the data it represents.

```ts
const USER_TODOS = TODOS.createGroup("user-todos", ["id1", "id2"]); // TODOS of a specifc User
const TODAY_TODOS = TODOS.createGroup("today-todos", ["id3", "id2", "id5"]); // TODOS for Today
```

### 🔴 Live Example

In the code snippet below, we create a basic Todo [Collection](../packages/core/features/collection/Introduction.md). To
feet it with new todos, we have a text input and an `add` button in the UI layer. 
Next to each singe todo, you can find a `remove` button, 
which removes the todo from our Collection. In case you have any further questions, 
take a look into the [Important Code Snippets](#-important-code-snippets) Section, or join our awesome [Community Discord](https://discord.gg/T9GzreAwPH)

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

To create our first Collection, we need the previously instantiated Instance of AgileTs. Then we can bring our
first Collection to life, which got the initial Item `{id: 1, name: "Clean Bathroom"}`. Besides the creation, we store the
Collection in the `localStorage`
with the help of the `persist` function.

```ts
const myFirstCollection = useAgile(MY_FIRST_COLLECTION);
```

Here we use the [`useAgile`](../packages/react/features/Hooks.md#useagile) React Hook to bind our Collection to the
React Component. In the case of a Collection, it returns the `default` Group value in array shape.

```ts
 MY_FIRST_COLLECTION.collect({id: generateId(), name: currentInput});
```

To add new Data to our Collection, we use the `collect` function. 
In our case the _currentInput_ with a random Id as primaryKey.

```ts
TODOS.remove(value.id).everywhere();
```

In case we have done a todo, of course, we want to remove it. 
The `remove` function helps us to reach this goal.
The `everywhere()` tag means that the Item will be removed from the whole Collection.

## 🔍 More

AgileTs got your attention, and you want to learn more. Don't hesitate to check out the docs below.

- [core](../packages/core/Introduction.md)
- [react](../packages/react/Introduction.md)
