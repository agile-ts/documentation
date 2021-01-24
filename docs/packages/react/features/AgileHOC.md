---
id: agileHOC
title: AgileHOC
sidebar_label: AgileHOC
slug: /react/AgileHOC
---

`AgileHOC` is a [Higher-Order Component](https://reactjs.org/docs/higher-order-components.html), that helps us to bind States to our React Component.

:::info

It is mainly thought for [Class Components](https://reactjs.org/docs/components-and-props.html),
because for [Functional Components](https://reactjs.org/docs/components-and-props.html) we have create a much [neater solution](./Hooks.md), based on Hooks.

:::

The `AgileHOC` gets wrapped around our React Class Component, to
ensure that our Class Component rerender, whenever a bound State mutates.
The `output` of the passed States gets merged into the `props` of the Class Component.
The property where the State Value is represented in the `props` is named after the State Key.
```tsx
export default AgileHOC(RandomComponent, [MY_COOL_STATE]);
```
If our State has no key, be aware that you have to pass it in Object shape into the AgileHOC,
so that it properly can be merged into the `props` of the Component.
```tsx
export default AgileHOC(RandomComponent, {
  myState: MY_STATE
});
```
But it is recommended to use the direct State Value anyway, because it is more reliable and typesafe.
```tsx {4,9}
class RandomComponent extends React.Component {
  render() {
    // return <h1>Hi {this.props.myCoolState}</h1>; // Not Typesafe
    return <h1>Hi {MY_COOL_STATE.value}</h1>; // Recommended | More Typesafe
  }
}

// Wrapping AgileHOC around our Component, and binding MY_COOL_STATE to it
export default AgileHOC(RandomComponent, [MY_COOL_STATE]);
```
We are not limited to States, we can bind any Agile Instances that own
an `observer` to a React Component.
```ts
  export default AgileHOC(RandomComponent, [MY_COOL_STATE, MY_GROUP]);
```
Agile Instances with `observer`:
- State
- Group
- Computed
- Item
- Collection (_exception_ since it has no `observer`)




### 🔴 Example

```tsx live
const App = new Agile();
const MY_STATE = App.createState("Hello Stranger!", {key: "myFirstState"});

class RandomComponent extends React.Component {
    render() {
        return (
            <div>
                <p>Direct Value: {MY_STATE.value}</p>
                <p>Props Value: {this.props.myFirstState}</p>
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
    };
}

const WrappedComponent = AgileHOC(RandomComponent, [MY_STATE]);

render(<WrappedComponent/>);
```

### 🟦 Typescript

The `AgileHOC` is nearly 100% typesafe.
But the State Values that get merged into the `props` **aren't typesafe**.
Because of that reason we recommend using the direct State Value (`MY_STATE.value`).

### 📭 Props

| Prop              | Type                                            | Description                                                                                                 | Required    |
| ----------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------|
| `reactComponent`  | ComponentClass                                  | Component to which the Agile Instances get applied                                                          | Yes         |
| `deps`            | DepsType                                        | Agile Instances that get bound to the Component                                                             | Yes         |
| `key`             | string \| number                                | Key/Name of Observer that gets created. Mainly thought for Debugging.                                       | No          |
| `agileInstance`   | Agile                                           | To which main Agile Instance the State get bound. Gets autodetect if only one main Agile Instance exists.   | No          |

#### DepsType
```ts
type DepsType =
  | Array<SubscribableAgileInstancesType>
  | { [key: string]: SubscribableAgileInstancesType }
  | SubscribableAgileInstancesType;
```

#### SubscribableAgileInstancesType
```ts
type SubscribableAgileInstancesType = State | Collection | Observer | undefined;
```

### 📄 Return

`AgileHOC` returns a modified version of the React Component that got passed in.