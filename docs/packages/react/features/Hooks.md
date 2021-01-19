---
id: hooks
title: React Hooks
sidebar_label: React Hooks
slug: /react/hooks
---

:::warning

Be aware that Hooks are only supported in Functional Components!

:::


## `useAgile`

The `useAgile` React Hook, helps us to bind States to our React Component.
These binding ensures that the Component rerender, whenever the bound State mutates.
We can flexibly bind any State to our Component. It doesn't matter which State and how many States.
`useAgile` returns the current _output_ of the passed State.
```ts
  const myCoolState = useAgile(MY_COOL_STATE); 
```

<br/>


```ts
  const [myCoolState1, myCoolStat2] = useAgile([MY_COOL_STATE1, MY_COOL_STATE2]);
```
It is also possible to bind more than one State to our component at once. 
This multiple binding has one advantage. It can lower the rerender count of our component,
because it allows AgileTs to determine whether we can combine two rerender triggered by different States and at same moment.
In this case `useAgile` returns the _output_ of the passed States, in the same order 
as they were entered.

<br/>

```ts
  const [myCollection, myGroup] = useAgile([MY_COLLECTION, MY_GROUP]);
```
We are also not limited to States, we can bind all Agile Instances that own
an `observer` to our React Component. These include:
- State
- Group
- Computed
- Item  
- Collection (_exception_ since it has no `observer`)

### 🔴 Example

```tsx live
  const App = new Agile();
  const MY_STATE = App.State("Hello Stranger!");
  
  const RandomComponent = () => {
      // With 'useAgile' we bind our State to our 'RandomComponent'
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

The `useAgile` hook is almost 100% typesafe.
There are a few side cases you probably won't run into.

### 📭 Props

| Prop              | Type                                            | Functionality                                                                | Required    | 
| ----------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- | ------------|
| `dep`             | State \| Collection \| Observer \| undefined    | Agile Instances that get bound to the Component the useAgile Hook is in      | Yes         | 
| `key`             | string \| number                                | Key/Name of created Observer. Mainly thought for Debugging                   | No          | 
| `agileInstance`   | Agile                                           | To witch main Agile Instance the Agile Instances get bound. Gets autodetect! | No          | 

### 📄 Return

Returns the `output` of the passed Agile Instance.

<br />

---

<br />

## `useEvent`

The `useEvent` React Hook, allows us to register a new callback function to the passed Event.
```ts
  useEvent(MY_EVENT, () => {
      // Do whatever the event should do if it gets tirggered
  })
```
It automatically removes the registered callback, whenever the component unmounts.

### 🔴 Example

```tsx live
const App = new Agile();
const MY_EVENT = App.Event();

const RandomComponent = () => {
    // With 'useAgile' we bind our State to our 'RandomComponent'
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



