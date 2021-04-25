---
id: hooks
title: React Hooks
sidebar_label: React Hooks
slug: /react/hooks
---

:::warning

Be aware that [React Hooks](https://reactjs.org/docs/hooks-intro.html) are only supported in **Functional React Components**!

:::


## `useAgile`

The `useAgile()` React Hook, helps us to bind States to Functional React Components.
This binding ensures that the Component rerender, whenever the bound State mutates.
We can flexibly bind any State to any React Component.
```ts
  const myCoolState = useAgile(MY_COOL_STATE); 
```
`useAgile()` returns the current `value` of the passed State.
```ts
const MY_STATE = App.createState('jeff');

// myComponent.jsx

const myState = useAgile(MY_STATE);
console.log(myState); // Returns 'jeff'
```
It is also possible to bind more than one State at once to a React Component.
```ts
  const [myCoolState1, myCoolState2] = useAgile([MY_COOL_STATE1, MY_COOL_STATE2]);
```
Now `useAgile()` returns an array of State `values` that can be destructured.
```ts
const MY_STATE = App.createState('jeff');
const MY_STATE_2 = App.createState('frank');

// myComponent.jsx

const [myState, myState2] = useAgile([MY_STATE, MY_STATE_2]);
console.log(myState); // Returns 'jeff'
console.log(myState2); // Returns 'frank'
```
The binding of multiple State Instances at once has one advantage. 
It can lower the rerender count of the React Component,
because AgileTs combines multiple at the same point in time triggered rerender of different States,
if they have the same `SubscriptionContainer`. Each used `useAgile()` creates its own `SubscriptionContainer`.

We are not limited to States, we can bind any [Agile Sub Instance](../../../main/Introduction.md#agile-sub-instance) that owns
an `observer` to a React Component.
```ts
  const [myCollection, myGroup] = useAgile([MY_COLLECTION, MY_GROUP]);
```
Instances that can be bound to a React Component via the `useAgile()` Hook:
- ### [`State`](../../core/features/state/Introduction.md)
  ```ts
  const MY_STATE = App.createState('jeff');
  
  // myComponent.jsx

  const myState = useAgile(MY_STATE);
  console.log(myState); // Returns 'jeff'
  ```
- ### [`Computed`](../../core/features/computed/Introduction.md)
  ```ts
  const MY_COMPUTED = App.createComputed(() => 'hello there');
  
  // myComponent.jsx
  
  const myComputed = useAgile(MY_COMPUTED);
  console.log(myComputed); // Returns 'hello there'
  ```  
- ### [`Collection`](../../core/features/collection/Introduction.md)
  **Note:** The Collection has no own `observer`. 
  But `useAgile()` is smart enough, to identify the Collection under the hood 
  and binds the [`defualt` Group](../../core/features/collection/group/Introduction.md#-default-group) to the Component instead.
  The `default` Group represents the default pattern of the Collection.
  ```ts
  const MY_COLLECTION = App.createCollection({
     initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]  
  });
  
  // myComponent.jsx
  
  const myCollection = useAgile(MY_COLLECTION);
  console.log(myCollection); // Returns (see below)
  // '[{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]'
  ```  
- ### [`Group`](../../core/features/collection/group/Introduction.md)
  ```ts
  const MY_COLLECTION = App.createCollection({
     initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]  
  });
  const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [3, 1]);
  
  // myComponent.jsx
  
  const myGroup = useAgile(MY_GROUP);
  console.log(myGroup); // Returns '[{id: 3, name: 'c'}, {id: 1, name: 'a'}]'
  ```
- ### [`Selector`](../../core/features/collection/selector/Introduction.md)
  ```ts
  const MY_COLLECTION = App.createCollection({
     initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]  
  });
  const MY_SELECTOR = MY_COLLECTION.select(2);
  
  // myComponent.jsx
  
  const mySelector = useAgile(MY_SELECTOR);
  console.log(mySelector); // Returns '{id: 2, name: 'b'}'
  ```
- ### [`Item`](../../core/features/collection/Introduction.md#-item)
  ```ts
  const MY_COLLECTION = App.createCollection({
     initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]  
  });
  const MY_ITEM = MY_COLLECTION.getItem(3);
  
  // myComponent.jsx
  
  const myItem = useAgile(MY_ITEM);
  console.log(myItem); // Returns '{id: 3, name: 'c'}'
  ```
- ### `undefined`
  ```ts
  const myUndefined = useAgile(undefined);
  console.log(myUndefined); // Returns 'undefined'
  ```

### 🔴 Example

```tsx live
  const App = new Agile();
  const MY_STATE = App.createState("Hello Stranger!");
  
  const RandomComponent = () => {
      const myFirstState = useAgile(MY_STATE); // Returns "Hello Stranger!"
   
      return (
          <div>                                              
              <p>{myFirstState}</p>                          
              <button                                       
                  onClick={() => {
                      MY_STATE.set("Hello Friend!"); 
                  }}
              >
                  Update State
              </button>
          </div>
      );
  }
  
  render(<RandomComponent/>);
```

### 🟦 Typescript

`useAgile` is almost 100% typesafe.
There are a few side cases you probably won't run into.

### 📭 Props

| Prop              | Type                                                                       | Description                                                                                                  | Required    | 
| ----------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------|
| `dep`             | Array<SubscribableAgileInstancesType\> \| SubscribableAgileInstancesType   | Agile Sub Instances that get bound to the Component the useAgile Hook is in                                  | Yes         | 
| `key`             | string \| number                                                           | Key/Name of Observer that gets created. Mainly thought for Debugging.                                        | No          | 
| `agileInstance`   | Agile                                                                      | To which Agile Instance the State get bound. Gets autodetect if only one Agile Instance exists.              | No          |

#### SubscribableAgileInstancesType
```ts
type SubscribableAgileInstancesType = State | Collection | Observer | undefined;
```

### 📄 Return

`useAgile` returns the current `output` of the passed [Agile Sub Instance/s](../../../main/Introduction.md#agile-sub-instance).

```ts {6,9}
const MY_STATE = App.State(1);
const MY_STATE_2 = App.State(2);
const MY_STATE_3 = App.State(3);

// One passed Agile Sub Instance
useAgile(MY_STATE); // Returns 3

// Multiple passed Agile Sub Instances
useAgile([MY_STATE, MY_STATE_2, MY_STATE_3]); // Returns [1, 2, 3]
```



<br />

---

<br />



## `useWatcher`

With the `useWatcher` React Hook we are able to create a callback function that gets called whenever
the passed State mutates. It's a synonym to the `watch` function, but might be cleaner to read in a React Component.
```ts
useWatcher(MY_STATE, () => {
   // This is a 'callback function' which gets called whenever MY_STATE mutates
});
```

### 🔴 Example

```tsx live
const App = new Agile();
const MY_STATE = App.createState("hello");

const RandomComponent = () => {
    useWatcher(MY_STATE, (value) => {
        toast("New Value: " + value);
    });

    return (
        <div>
            <button
                onClick={() => {
                    MY_STATE.set("bye");
                }}
            >
                Change State
            </button>
        </div>
    );
}

render(<RandomComponent/>);
```

### 🟦 Typescript

`useWatcher` is almost 100% typesafe.

### 📭 Props

| Prop              | Type                                            | Description                                                                  | Required    | 
| ----------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- | ------------|
| `state`           | State<T\>                                       | State to which the passed watcher callback gets applied.                     | Yes         | 
| `callback`        | StateWatcherCallback<T\>                        | Callback Function that gets applied to the passed State                      | Yes         |

### 📄 Return

`useWatcher` returns nothing.

