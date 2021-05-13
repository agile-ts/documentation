---
id: hooks
title: React Hooks
sidebar_label: React Hooks
slug: /react/hooks
---

:::warning

Keep in mind that [React Hooks](https://reactjs.org/docs/hooks-intro.html) are only supported in **Functional React Components**!

:::


## `useAgile()`

The `useAgile()` React Hook binds/subscribes States to Functional React Components.
This binding ensures that the Component rerenders whenever a bound State mutates.
We can flexibly bind any State to any React Component.
```ts
  const myCoolState = useAgile(MY_COOL_STATE); 
```
Be aware, that `useAgile()` returns the current `value` of the passed State
and not the State Instance itself.
```ts {5}
const MY_STATE = App.createState('jeff');

// MyComponent.jsx

const myState = useAgile(MY_STATE);
console.log(myState); // Returns 'jeff'
```

### 🗂 Array

`useAgile()` also supports **arrays** of State Instances.
```ts
const [myCoolState1, myCoolState2] = useAgile([MY_COOL_STATE1, MY_COOL_STATE2]);
```
In which case it returns an array of State `values` that can be destructured.
```ts {6}
const MY_STATE = App.createState('jeff');
const MY_STATE_2 = App.createState('frank');

// MyComponent.jsx

const [myState, myState2] = useAgile([MY_STATE, MY_STATE_2]);
console.log(myState); // Returns 'jeff'
console.log(myState2); // Returns 'frank'
```
Binding multiple States to a Component using a single `useAgile()` Hook has one advantage.
In some cases, it can reduce the rerender count of the React Component triggered by AgileTs.
This is due to the fact that simultaneously triggered rerenders of different States are combined into one single rerender
if the States share the same `SubscriptionContainer`.
Each `useAgile()` Hook creates its own `SubscriptionContainer`,
which serves as an interface to the Component in order to trigger rerender on it.

### 🏷 Subscribable Instances

We are not limited to States.
We can bind any [Agile Sub Instance](../../../main/Introduction.md#agile-sub-instance) that owns
an `Observer` to React Components.
```ts
  const [myCollection, myGroup, myState] = useAgile([MY_COLLECTION, MY_GROUP, MY_STATE]);
```
Instances that can be bound to a React Component via the `useAgile()` Hook:
- ### [`State`](../../core/features/state/Introduction.md)
  ```ts {5}
  const MY_STATE = App.createState('jeff');
  
  // MyComponent.jsx

  const myState = useAgile(MY_STATE);
  console.log(myState); // Returns 'jeff'
  ```
- ### [`Computed`](../../core/features/computed/Introduction.md)
  ```ts {5}
  const MY_COMPUTED = App.createComputed(() => 'hello there');
  
  // MyComponent.jsx
  
  const myComputed = useAgile(MY_COMPUTED);
  console.log(myComputed); // Returns 'hello there'
  ```  
- ### [`Collection`](../../core/features/collection/Introduction.md)
  **Note:** The Collection has no own `Observer`.
  But `useAgile()` is smart enough, to identify a Collection
  and binds the [`defualt` Group](../../core/features/collection/group/Introduction.md#-default-group) to the Component instead.
  The `default` Group represents the default pattern of the Collection.
  ```ts {7}
  const MY_COLLECTION = App.createCollection({
     initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]  
  });
  
  // MyComponent.jsx
  
  const myCollection = useAgile(MY_COLLECTION);
  console.log(myCollection); // Returns (see below)
  // '[{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]'
  ```  
- ### [`Group`](../../core/features/collection/group/Introduction.md)
  ```ts {8}
  const MY_COLLECTION = App.createCollection({
     initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]  
  });
  const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [3, 1]);
  
  // MyComponent.jsx
  
  const myGroup = useAgile(MY_GROUP);
  console.log(myGroup); // Returns '[{id: 3, name: 'c'}, {id: 1, name: 'a'}]'
  ```
- ### [`Selector`](../../core/features/collection/selector/Introduction.md)
  ```ts {8}
  const MY_COLLECTION = App.createCollection({
     initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]  
  });
  const MY_SELECTOR = MY_COLLECTION.select(2);
  
  // MyComponent.jsx
  
  const mySelector = useAgile(MY_SELECTOR);
  console.log(mySelector); // Returns '{id: 2, name: 'b'}'
  ```
- ### [`Item`](../../core/features/collection/Introduction.md#-item)
  ```ts {8}
  const MY_COLLECTION = App.createCollection({
     initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]  
  });
  const MY_ITEM = MY_COLLECTION.getItem(3);
  
  // MyComponent.jsx
  
  const myItem = useAgile(MY_ITEM);
  console.log(myItem); // Returns '{id: 3, name: 'c'}'
  ```
- ### `undefined`
  ```ts {1}
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

The `useAgile()` Hook is almost 100% typesafe.

### 📭 Props

| Prop              | Type                                                                         | Description                                                                                                  | Required    | 
| ----------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------|
| `deps`            | Array<SubscribableAgileInstancesType\> \| SubscribableAgileInstancesType     | Agile Sub Instances that are bound to the Component in which the useAgile Hook is located                    | Yes         | 
| `config`          | [AgileHookConfigInterface](../../../Interfaces.md#agilehookconfiginterface)  | Configuration                                                                                                | No          |

#### SubscribableAgileInstancesType
```ts
type SubscribableAgileInstancesType = State | Collection | Observer | undefined;
```

### 📄 Return

`useAgile()` returns the current `output` of the passed [Agile Sub Instance](../../../main/Introduction.md#agile-sub-instance).
```ts {5}
const MY_STATE = App.createState('jeff');

// MyComponent.jsx

const myState = useAgile(MY_STATE);
console.log(myState); // Returns 'jeff'
```
When passing multiple Agile Sub Instances, an array of `outputs` matching the passed Instances is returned.
```ts {6}
const MY_STATE = App.createState('jeff');
const MY_STATE_2 = App.createState('frank');

// MyComponent.jsx

const [myState, myState2] = useAgile([MY_STATE, MY_STATE_2]);
console.log(myState); // Returns 'jeff'
console.log(myState2); // Returns 'frank'
```



<br />

---

<br />



## `useProxy()`

:::warning

**Note** that this is a "work in progress" hook that has not yet been tested that extensively.
But as far as I can tell, it works quite well. An example is the [Large State Sandbox](https://codesandbox.io/s/agilets-large-state-1kr4z).

:::

Basically `useProxy()` does the same as [`useAgile()`](#useagile).
It binds/subscribes States to Functional React Components. 
However, it differs in one key area.
`useProxy()` wraps a [Proxy()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) around its return value/s.
Through this Proxy, AgileTs is able to track accessed properties of the returned object/s
and can construct a path to these.
The paths allow AgileTs to rerender the Component more efficiently
by only causing a rerender when an actual accessed property value mutates.
With `useAgile()`, the Component is always rerendered on a State change,
regardless of whether the changed property value is accessed in the Component.
This is totally fine if the value is primitive or the whole object is displayed.
However, as soon as we display only a tiny part of the bound State value object,
the `useProxy()` Hook can reduce the rerender count.

### 🗂 Array

`useProxy()` also supports **arrays** of State Instances.
```ts
const [myCoolState1, myCoolState2] = useProxy([MY_COOL_STATE1, MY_COOL_STATE2]);
```
In which case it returns an array of State `values` that can be destructured.
```ts {6}
const MY_STATE = App.createState({name: 'jeff', age: 10});
const MY_STATE_2 = App.createState({size: 100, weight: 200});

// MyComponent.jsx

const [myState, myState2] = useProxy([MY_STATE, MY_STATE_2]);
console.log(myState); // Returns '{name: 'jeff', age: 10}'
console.log(myState2); // Returns '{size: 100, weight: 200}'
```

### 🏷 Subscribable Instances

We are not limited to States.
We can bind any [Agile Sub Instance](../../../main/Introduction.md#agile-sub-instance) that owns
an `Observer` to React Components.
```ts
  const [myCollection, myGroup, myState] = useProxy([MY_COLLECTION, MY_GROUP, MY_STATE]);
```
However, the [Proxy()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) is only wrapped
around objects and arrays. The other instances are treated as in [`useAgile()`](#useagile).

### 🔴 Example

```tsx live
const App = new Agile();
const MY_STATE = App.createState({name: 'jeff', location: 'Germany', age: 19}, {key: 'myState'});

let rerenderCount = 0;

const RandomComponent = () => {
  const myState = useProxy(MY_STATE);

  rerenderCount++;

  return (
          <div>
            <p>Name: {myState.name}</p>
            <p>Rerender: {rerenderCount}</p>
            <p>State Value: {JSON.stringify(MY_STATE.value)}</p>
            <button
                    onClick={() => {
                      MY_STATE.patch({name: generateId()})
                    }}
            >
              Update Name
            </button>
            <button
                    onClick={() => {
                      MY_STATE.patch({location: generateId()})
                    }}
            >
              Update Location
            </button>
          </div>
  );
}

render(<RandomComponent/>);
```

### 🟦 Typescript

The `useProxy()` Hook is almost 100% typesafe.

### 📭 Props

| Prop              | Type                                                                         | Description                                                                                                  | Required    | 
| ----------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------|
| `deps`            | Array<SubscribableAgileInstancesType\> \| SubscribableAgileInstancesType     | Agile Sub Instances that are bound to the Component in which the useProxy Hook is located                    | Yes         | 
| `config`          | [ProxyHookConfigInterface](../../../Interfaces.md#proxyhookconfiginterface)  | Configuration                                                                                                | No          |

#### SubscribableAgileInstancesType
```ts
type SubscribableAgileInstancesType = State | Collection | Observer | undefined;
```

### 📄 Return

`useProxy()` returns the current `output` of the passed [Agile Sub Instance](../../../main/Introduction.md#agile-sub-instance).
```ts {5}
const MY_STATE = App.createState({name: 'jeff', age: 10});

// MyComponent.jsx

const myState = useProxy(MY_STATE);
console.log(myState); // Returns '{name: 'jeff', age: 10}'
```
When passing multiple Agile Sub Instances, an array of `outputs` matching the passed Instances is returned.
```ts {6}
const MY_STATE = App.createState({name: 'jeff', age: 10});
const MY_STATE_2 = App.createState('frank');

// MyComponent.jsx

const [myState, myState2] = useProxy([MY_STATE, MY_STATE_2]);
console.log(myState); // Returns '{name: 'jeff', age: 10}'
console.log(myState2); // Returns 'frank'
```



<br />

---

<br />



## `useWatcher()`
Creates a  `callback` that observes the State on changes.
The provided `callback` function will be fired on every State `value` mutation.
For instance if we update the State value from 'jeff' to 'hans'.
```ts
useWatcher(MY_STATE, (value) => {
  console.log(value); // Returns current State Value
});
```
It is a synonym to the [`watch()`](../../core/features/state/Methods.md#watch) method.
However, it has some advantages.
For example, it automatically cleans up the created watcher callback when the React Component unmounts
and might be cleaner to read in 'UI-Component-Code'.

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

The `useWatcher()` Hook is almost 100% typesafe.

### 📭 Props

| Prop              | Type                                            | Description                                                                  | Required    | 
| ----------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- | ------------|
| `state`           | State<T\>                                       | State to which the passed watcher callback is applied                        | Yes         | 
| `callback`        | StateWatcherCallback<T\>                        | Callback function that is called on each State value change                  | Yes         |

### 📄 Return

```ts
void
```
