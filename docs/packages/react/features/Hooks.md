---
id: hooks
title: React Hooks
sidebar_label: React Hooks
slug: /react/hooks
---

:::warning

Be aware that [React Hooks](https://reactjs.org/docs/hooks-intro.html) are only supported in **Functional Components**!

:::


## `useAgile`

The `useAgile` React Hook, helps us to bind States to our React Component.
These binding ensures that the Component rerender, whenever the bound State mutates.
We can flexibly bind any State to our Component. 
It doesn't matter which State and how many States.
```ts
  const myCoolState = useAgile(MY_COOL_STATE); 
```
`useAgile` returns the current _output_ of the passed State.

It is also possible to bind more than one State to our Component at once.
```ts
  const [myCoolState1, myCoolStat2] = useAgile([MY_COOL_STATE1, MY_COOL_STATE2]);
```
The binding of multiple State Instances, can lower the rerender count of our Component,
because it allows AgileTs to combine two rerender triggered by different States at same point in time.
Here `useAgile` returns the _output_ of the passed States, in the same order
as they were passed.

We are not limited to States, we can bind any Agile Sub Instances that own
an `observer` to a React Component.
```ts
  const [myCollection, myGroup] = useAgile([MY_COLLECTION, MY_GROUP]);
```
Agile Sub Instances with `observer`:
- State
- Group
- Computed
- Item
- Collection (_exception_ since it has no `observer`)

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

`useAgile` returns the current `output` of the passed Agile Sub Instance/s.

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

## `useEvent`

The `useEvent` React Hook allows us to register a new callback function to the passed Event.
```ts
useEvent(MY_EVENT, () => {
   // This is a 'callback function' which gets called when ever the EVENT gets triggered
})
```
The advantage of using this Hook instead of the `on` method in a React Component, 
is that the registered callback function gets automatically unregistered whenever the Component unmounts.

### 🔴 Example

```tsx live
const App = new Agile();
const MY_EVENT = App.createEvent();

const RandomComponent = () => {
    useEvent(MY_EVENT, () => {
        toast("You successfully triggered an Event!");
    })

    return (
        <div>
            <button
                onClick={() => {
                    MY_EVENT.trigger();
                }}
            >
                Trigger Event
            </button>
        </div>
    );
}

render(<RandomComponent/>);
```

### 🟦 Typescript

`useEvent` is almost 100% typesafe.

### 📭 Props

| Prop              | Type                                            | Description                                                                  | Required    | 
| ----------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- | ------------|
| `event`           | Event (E)                                       | Event to which the passed callback function gets applied.                    | Yes         | 
| `callback`        | EventCallbackFunction<E['payload']>             | Callback Function that gets applied to the passed Event                      | Yes         | 
| `key`             | string \| number                                | Key/Name of created Observer. Mainly thought for Debugging.                  | No          | 
| `agileInstance`   | Agile                                           | To which Agile Instance the Event get bound. Gets autodetect!                | No          |

### 📄 Return

`useEvent` returns nothing.

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

