---
id: react 
title: React 
sidebar_label: React 
slug: /quick-start/react
---

In this guide your learn, how to integrate and use AgileTs in a React Project.
I promise you, it's pretty easy.

## 🔽 Installation

To properly use AgileTs in a React Project, we need two packages. The `core` package, and a package that allows us to
integrate AgileTs into React, the `react` package.

### 📁 `@agile-ts/core`

```bash npm2yarn
npm install @agile-ts/core 
```

Let's start with the `core` package, which acts as the brain of AgileTs and manages all your States, Collections, ..

### 📂 `@agile-ts/react`

```bash npm2yarn
npm install @agile-ts/react 
```

Now we continue with installing the `react` package.
Which is like an interface to React and provides useful Functions like `useAgile` 
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

If you start a Project from scratch, you might use the `react-template` for AgileTs, which
automatically creates a react-app called _my-app_ and installs all necessary dependencies of AgileTs.
If you have chosen this way there is no need to follow the installation steps above.


<br />

---

<br />


## 💡 Create first State

### ❓ What is a State
A State holds an Information that you need to remember at a later point in time.
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

### 💻 Important Code Snippets

```ts
const App = new Agile();
```
Before we can create any State, we have to instantiate a main AgileTs Instance.
This Instance holds and manages all our States, Collections, ..
Be aware that it's not recommended having multiple Agile Instances in one application!

```ts
const MY_FIRST_STATE = App.State("Hello World");
```
In this snippet we create our first State in AgileTs.
It was built from our previously created AgileTs Instance and got stored in it 
with the initial value "Hello World".

```ts
const myFirstState = useAgile(MY_FIRST_STATE);
```
Here we use the `useAgile` React Hook to bind our State to a React Component.
`useAgile` returns the current `output` of our State.
Be aware that hooks can only be used in React Components!
For class component Users we have created the [AgileHOC](../packages/react/features/AgileHOC.md).

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
Each Collection Item needs an primaryKey like an id to be identifiable and unique.

**For instance** <br/>
You can use a Collection if you need a dynamically set of objects like Todos in a Todo-List.

### 🔴 Live Example

In this code snippet we create our first Collection 😃.
Below the Live Example you can find [some descriptions to important code snippets](#💻-Important-Code-Snippets).

```tsx live
// Let's again start by creating our Agile Instance
const App = new Agile();

// Now we are able to build our first Collection 
const MY_FIRST_COLLECTION = App.createCollection();

// After that we can collect our first Data 
MY_FIRST_COLLECTION.collect({id: 1, name: "Frank"});

const RandomComponent = () => {
    // With the 'useAgile' Hook we bind our first Collection to the 'RandomComponent'
    const myFirstCollection = useAgile(MY_FIRST_COLLECTION);

    // Current Input of Name Form
    const [currentInput, setCurrentInput] = React.useState("");

    return (
        <div>
            <h3>Add Person</h3>
            <input type="text" name="name" value={currentInput} onChange={(event) => {
                setCurrentInput(event.target.value);
            }}/>
            <button onClick={() => {
                // Collect new Person based on the current Input
                MY_FIRST_COLLECTION.collect({id: generateId(), name: currentInput});
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

```ts
const MY_FIRST_COLLECTION = App.createCollection({
  initialData: [{id: 1, name: "Frank"}]
});
```
To create our first Collection we need our previously defined instance of AgileTs.
Then we are able to bring our Collection to live, which initially has one Item (_{id: 1, name: "Frank"}_) collected.

```ts
const myFirstCollection = useAgile(MY_FIRST_COLLECTION);
```
Here we are using the `useAgile` React Hook to bind our Collection to the React Component.
`useAgile` returns the current `output` of our Collection.
Be aware that hooks can only be used in React Components!

```ts
 MY_FIRST_COLLECTION.collect({id: generateId(), name: currentInput});
```
To add new Data to our Collection, we cann use the `collect` function.
In this case we add the _currentInput_ to our Collection, with a random Id.
Be aware that Collections only work with Objects and don't forget that each Data Object needs an primaryKey like `id`!


## 🔍 More

AgileTs got your attention, and you want to learn more. Checkout the docs below.

- [core](../packages/core/Introduction.md)
- [react](../packages/react/Introduction.md)
