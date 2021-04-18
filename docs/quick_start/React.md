---
id: react
title: React
sidebar_label: React
slug: /quick-start/react
---

Welcome to the React quick start guide. This tutorial will introduce you to AgileTs
and teach you how to use its basic functionalities in React.
By the time you finish this guide, you should be able to start building your own AgileTs applications.
**We recommend proceeding from top to bottom because some sections build on each other.**

## 🔽 Installation

Let's start with the installation. If you haven't planned to install AgileTs yet,
you can skip the Installation Section and jump straight into the '[Create first State](#-create-first-state)' guide.

In order to use AgileTs in a React Environment, we need to install two packages.
- [`@agile-ts/core`](#-agile-tscore)
- [`@agile-ts/react`](#-agile-tsreact)

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

If you start a project from scratch using AgileTs, feel free to use the AgileTs `react-template`.
This template will automatically generate a fully functional react-app with AgileTs installed.
Otherwise, you can install the `core` and `react` package directly in your existing application.

### 📁 `@agile-ts/core`

```bash npm2yarn
npm install @agile-ts/core 
```
The [`core` package](../packages/core/Introduction.md) contains the State Management Logic of AgileTs
and therefore offers powerful classes like the [`State Class`](../packages/core/features/state/Introduction.md).

### 📂 `@agile-ts/react`

```bash npm2yarn
npm install @agile-ts/react 
```
The [React Integration](../packages/react/Introduction.md), on the other hand, is an interface to React and provides useful functions
like the [`useAgile()`](../packages/react/features/Hooks.md#useagile) hook to bind States to React Components for reactivity.

## 💡 Create first State

After we have set up a project with AgileTs installed, we can start creating our first AgileTs State.
But first things first, what is a State in AgileTs?

### ❓ What is a State

A `State` is a global _information_ we need to remember at a later point in time.
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
It should be noted that it does not store the States; It only manages them.
Each State has an Instance of the `Agile Class`, for example, to ingest its changes into the `runtime`.
In summary, the main tasks of the `Agile Class` are to:
- queuing `Agile Sub Instance` changes in the `runtime` and preventing race conditions
- provide configuration object
- update/rerender subscribed Components through Integrations like the [React Integration](../packages/react/Introduction.md)
- Integrating with persistent [Storage](../packages/core/features/storage/Introduction.md)


### 🔴 Live Example {#live-example-1}

To get a better understanding of how to use a State, we should try it out.
Therefore, we have created a Live Example, where we can see a [State](../packages/core/features/state/Introduction.md) in action.
The sample project we'll look at is a small counter that lets us increase a number as we click the 'Update State' button.
It may not be fascinating, but it shows all the essential pieces of a React + AgileTs application in action.
After we have tried the live example a bit, we recommend giving the [Important Code Snippets](#important-code-snippets-1) below a look
to better understand the different parts used in the example.
In case you have any further questions, don't hesitate to join our [Community Discord](https://discord.gg/T9GzreAwPH).
```tsx live
// Let's start by creating an Agile Instance
const App = new Agile();

// Now we are able to build our first State which has the intial value "Hello World"
const MY_FIRST_STATE = App.createState("Hello World");
let helloWorldCount = 0;

const RandomComponent = () => {
    // With the 'useAgile' Hook we bind our just created State to the 'RandomComponent' for reactivity
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
Check out the [code sandbox](https://codesandbox.io/s/agilets-first-state-f12cz) to see the whole project in action.

### 💻 Important Code Snippets {#important-code-snippets-1}

```ts
const App = new Agile();
```
To be able to instantiate any State, we need an AgileTs Instance.
Such an Instance can be seen as the brain of AgileTs, which manages all our States.
Be aware that you should avoid having multiple Agile Instances in one application!

```ts
const MY_FIRST_STATE = App.createState("Hello World");
```
With the help of the previously instantiate AgileTs Instance, we can now create our first State.
We have assigned the initial value `'Hello World'` to the State.

```ts
const myFirstState = useAgile(MY_FIRST_STATE); // Returns 'Hello World x'
```
In order to make our application reactive,
we need to bind the State to our React Component using the [`useAgile()`](../packages/react/features/Hooks.md#useagile) Hook.
This ensures that the Component rerenders whenever the State mutates, so when its value changes.
The `useAgile()` Hook returns the current `output` of the State, in our case 'Hello World'.
Be aware that React Hooks can only be used in Function Components!
For Class Components we have provided a Higher Order Component called [AgileHOC](../packages/react/features/AgileHOC.md).

```ts
MY_FIRST_STATE.set(`Hello World ${++helloWorldCount}`);
```
To bring some life into our small application,
we update the State value with the help of the `set()` function on each 'Update State' button press.


## 💡 Create first Collection

Now that we know the basics of the State Class, we can continue learning something about Collections.
Simply put, a flexible array of States.

### ❓ What is a Collection

A Collection is like an array of object-shaped data following the same pattern.
For example, it can be used to remember a flexible list of todos globally.
Like the State, it is created with the help of an instantiated [Agile Instance](../packages/core/features/agile-instance/Introduction.md) often called `App`.
```ts
const MY_COLLECTION = App.createCollection();
```
After a successful instantiation, we can dynamically and easily manipulate its value.
```ts
TODOS.collect({id: "id1", todo: "Clean Bathroom"}); // Add new Data
TODOS.update("id1", {todo: "Clean Room"}); // Update already collected Data
TODOS.remove("id1").everywhere(); // Remove Data at 'id1'
TODOS.persist(); // Persist Collection Value into Storage
```
Each data we collect **needs a unique primary key** like an `id` to be correctly identified later.
```ts
TODOS.collect({id: "id2", todo: "Try AgileTs"});
```
In the above code snippet, 'id2' at the primary key property `id` is the unique primary key.
Every collected data will be automatically transformed into an extension of the State Class called `Item`.
Such an Item has the collected data as `value`, so in the above example, that would be '{id: "id2", todo: "Try AgileTs"}'.
A so-called Item has the same functionalities as normal States.
```ts
MY_COLLECTION.getItem('id2').patch({todo: "Clean Bathroom"});
```
Besides Items, a Collection consists primarily of Groups.
A Group allows us to split a Collection into multiple individual sections without
losing any redundant behavior. By default, each Item will be added to the `default` Group, representing the default Collection pattern.
Keep in mind, that a Group doesn't store the Item itself. It only holds an array of `primaryKeys` like a keymap of the data it represents.
```ts
const USER_TODOS = TODOS.createGroup("user-todos", ["id1", "id2"]); // TODOS of a specifc User
const TODAY_TODOS = TODOS.createGroup("today-todos", ["id3", "id2", "id5"]); // TODOS for Today
```

### 🔴 Live Example {#live-example-2}

In this Live Example, we see a simple [Collection](../packages/core/features/collection/Introduction.md) in action.
The sample project we'll look at is a small todo list that lets us create todos with the help of a text input and remove them with a button below each todo item.
In case you have any further questions, don't hesitate to join our [Community Discord](https://discord.gg/T9GzreAwPH).
```tsx live
// Let's start by creating our Agile Instance 
const App = new Agile();

// Now we are able to build our first Collection
const TODOS = App.createCollection({
  initialData: [{id: 1, name: "Clean Bathroom"}]
}).persist('todos'); // 'persist()' does store the Collection in the LocalStorage

const RandomComponent = () => {
    // With the 'useAgile' Hook we bind our first Collection to the 'RandomComponent' for reactivity
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
                
              // Add new Todo to the Collection based on the current input
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
                         // Remove Item at specific primary Key from Collection
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
Check out the [code sandbox](https://codesandbox.io/s/agilets-first-collection-uyi9g) to see the whole project in action.

### 💻 Important Code Snippets {#important-code-snippets-2}

```ts
const MY_FIRST_COLLECTION = App.createCollection({
  initialData: [{id: 1, name: "Clean Bathroom"}]
}).persist();
```
To create our first Collection, we need the previously instantiated Instance of AgileTs.
Then we can bring our first Collection to life,
which got the initial Item `{id: 1, name: "Clean Bathroom"}`.
Besides the creation, we store the Collection permanently in the `localStorage` with the help of the `persist()` function.
So if you refresh the page, your modifications to the todo list shouldn't be lost.

```ts
const myFirstCollection = useAgile(MY_FIRST_COLLECTION);
```
Here we use the [`useAgile`](../packages/react/features/Hooks.md#useagile) React Hook
to bind our Collection to the React Component.
When passing a Collection, `useAgile` returns the `default` Group `value` in array shape.
In our case, something like:
```ts
[
    {id: 1, name: 'Clean Bathroom'},
    {id: 5, name: 'Learn AgileTs'}
]
```

```ts
 MY_FIRST_COLLECTION.collect({id: generateId(), name: currentInput});
```
In order to add new Data to the Collection, we can use the `collect()` function.
In the example, we add the _currentInput_ with a random `id` as primaryKey to the Collection.

```ts
TODOS.remove(value.id).everywhere();
```
In case we have done a todo, of course, we want to remove it.
The `remove()` function helps us to reach such a goal.
The `everywhere()` tag means that the Item will be removed from the whole Collection
and not just from a Group.

## 🔍 Next Steps

Now that you know the basics of AgileTs, you can take a look into the [Style Guide](../main/StyleGuide.md) Section,
to learn something about: How to structure an application using AgileTs?
Or you check out the specific package documentations, where everything is described in more detail.
- [core](../packages/core/Introduction.md)
- [react](../packages/react/Introduction.md)