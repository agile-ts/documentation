---
id: agileHOC
title: AgileHOC
sidebar_label: AgileHOC
slug: /react/AgileHOC
---

`AgileHOC` is a [Higher-Order Component](https://reactjs.org/docs/higher-order-components.html), that binds States to our React Components.

:::info

It is mainly thought for [Class Components](https://reactjs.org/docs/components-and-props.html),
because for [Functional Components](https://reactjs.org/docs/components-and-props.html) we have create a much [neater solution](./Hooks.md), based on Hooks.

:::

The `AgileHOC` gets wrapped around our React Class Component, to
ensure that our Class Component rerender, whenever a bound State mutates.
The `output` of the passed States gets merged into the `props` of the Class Component.
```tsx {4,9}
class RandomComponent extends React.Component {
  render() {
    // return <h1>Hi {this.props.myCoolState}</h1>;
    return <h1>Hi {MY_COOL_STATE.value}</h1>; // Recommended | More Typesafe
  }
}

// Wrapping AgileHOC around our Component, and binding MY_COOL_STATE to it
export default AgileHOC(RandomComponent, [MY_COOL_STATE]);
```

It is more typesafe to get the State Value directly from the State (MY_STATE.value) instead of the props.

```ts
  const [myCollection, myGroup] = useAgile([MY_COLLECTION, MY_GROUP]);
```
We are not limited to States, we can bind all Agile Instances that own
an `observer` to a React Component.
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
                <p>{MY_STATE.value}</p>
                <p>{this.props.myFirstState}</p>
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

const WrappedComponent = AgileHOC(RandomComponent, {myFirstState: MY_STATE});

render(<WrappedComponent/>);
```

### 🟦 Typescript

The `AgileHOC` isn't typesafe, since we can't apply a type to the `props`.
But there is a way to get typesafe with the `AgileHOC`
by not using the `props`, but direct using Agile Instance value such as `MY_STATE.value`.

### 📭 Props

| Prop              | Type                                            | Functionality                                                                | Required    |
| ----------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- | ------------|
| `state`           | State                                           | State to which the passed watcher callback gets applied                      | Yes         |
| `agileInstance`   | Agile                                           | To which main Agile Instance the Event get bound. Gets autodetect!           | No          |

### 📄 Return

`useWatcher` returns nothing.