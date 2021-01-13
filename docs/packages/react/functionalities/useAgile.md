---
id: useAgile
title: useAgile
sidebar_label: useAgile
slug: /react/functionalities/useAgile
---

`useAgile` is a Hook that binds Agile Instances to React Components.

## Functional Component

The `useAgile` Hook is though for [Function Component](https://reactjs.org/docs/components-and-props.html) Users.
With this Hook we are able to bind Agile Instances to our Component.
These binding ensures that the Component rerender, whenever a bound Agile Instance mutates.
`useAgile` returns the current `output` of the passed Agile Instance.
```ts
const myCoolState = useAgile(MY_COOL_STATE); 
```
For instance if `MY_COOL_STATE` has the Value _"Frank"_ the `useAgile` Hook returns _"Frank"_.
It is also possible to bind more than one Agile Instance to a Component at once.
```ts
  const [myCoolState1, myCoolStat2] = useAgile([MY_COOL_STATE1, MY_COOL_STATE2]);
```

### 🛠 Straightforward Example

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
                      // Lets's update the State Value        
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

<br />

---

<br />

## Class Component

:::warning

Class Components doesn't support Hooks. 
Because of that we have created the [AgileHOC](./AgileHOC).

:::

<br />

---

<br />

## Typescript

The `useAgile` hook is almost 100% typesafe. 
There are a few side cases you probably won't run into.

<br />

---

<br />

## Function Head

```ts
export function useAgile<X extends State | Collection | Observer | undefined>(
    dep: X,
    key?: SubscriptionContainerKeyType,
    agileInstance?: Agile
): AgileHookType<X>;
```

### Props

| Prop              | Type                                            | Functionality                                                                | Optional    | 
| ----------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- | ------------|
| `dep`             | State \| Collection \| Observer \| undefined    | Agile Instances that get bound to Component                                  | No          | 
| `key`             | string \| number                                | Key/Name of created Observer. Mainly thought for Debugging                   | Yes         | 
| `agileInstance`   | Agile                                           | To witch main Agile Instance the Agile Instances get bound. Gets autodetect! | Yes         | 

### Return

Returns the `output` of the passed Agile Instance.