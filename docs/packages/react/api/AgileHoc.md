---
id: agileHOC
title: AgileHOC
sidebar_label: AgileHOC
slug: /react/AgileHOC
---

:::info

The `AgileHOC` is intended for [Class Components](https://reactjs.org/docs/components-and-props.html),
as we recommend using Hooks in [Functional Components](https://reactjs.org/docs/components-and-props.html).

:::

The `AgileHOC` is a Higher Order Component that binds/subscribes AgileTs States 
to a Functional React Component for reactivity. 
This binding ensures that the Component re-renders whenever a bound State changes.
We can flexibly bind any [Agile Sub Instances](../../../main/Introduction.md#agile-sub-instance)
(like States or Collections) to any React Component.
The `AgileHOC` is wrapped around the React Component,
to which the States are to be bound.
```tsx
export default AgileHOC(RandomComponent, [MY_COOL_STATE]);
```
The `output` of the provided State Instances is mapped 
into the `props` property of the Class Component.
Each State should have a unique identifier key to be correctly represented in the `props` property.
To ensure that each State can be uniquely identified,
we recommend providing the States to the `AgileHOC` in a keymap
instead of an array.
```tsx
export default AgileHOC(RandomComponent, {
    myState: MY_STATE
});
```
However, using the direct State value is the most reliable and typesafe way.
```tsx {4,9}
class RandomComponent extends React.Component {
    render() {
        // return <h1>Hi {this.props.myCoolState}</h1>; // Not Typesafe
        return <h1>Hi {MY_COOL_STATE.value}</h1>; // Recommended | Typesafe
    }
}

// Wrapping AgileHOC around the React Component and binding MY_COOL_STATE to it
export default AgileHOC(RandomComponent, [MY_COOL_STATE]);
```

### 👀 Subscribable Instances

Not only AgileTs States can be bound to React Components via the `AgileHOC`,
but also all other [Agile Sub Instances](../../../main/Introduction.md#agile-sub-instance)
that contain an [`Observer`](../../../main/Introduction.md#observer).
```ts
  export default AgileHOC(RandomComponent, [MY_COOL_STATE, MY_GROUP]);
```
Instances that contain an `Observer` are, for example:
- [`State`](../../core/api/state/Introduction.md)
- [`Computed`](../../core/api/computed/Introduction.md)
- [`Collection`](../../core/api/collection/Introduction.md)
- [`Group`](../../core/api/collection/group/Introduction.md)
- [`Selector`](../../core/api/collection/selector/Introduction.md)
- [`Item`](../../core/api/collection/Introduction.md#-item)

### 🔴 Example

```tsx live
const App = new Agile({waitForMount: false});
const MY_STATE = App.createState("Hello Stranger!", {key: "myFirstState"});

class RandomComponent extends React.Component {
    render() {
        return (
            <div>
                <p>Direct Value: {MY_STATE.value}</p>
                <p>Props Value: {this.props.myFirstState}</p>
                <button
                    onClick={() => {
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
But be aware that the [Agile Sub Instance](../../../main/Introduction.md#agile-sub-instance) 
`outputs` merged into the `props` property **aren't typesafe**.

### 📭 Props

| Prop              | Type                                            | Description                                                                                                 | Required    |
| ----------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------|
| `reactComponent`  | ComponentClass                                  | Component to which the passed Agile Sub Instances will be applied                                           | Yes         |
| `deps`            | DepsType                                        | Agile Sub Instances that are bound to the passed Component                                                  | Yes         |
| `key`             | string \| number                                | Key/Name of SubscriptionContainer that is created. Mainly thought for Debugging                             | No          |
| `agileInstance`   | Agile                                           | To which Agile Instance the State belongs. Automatically detected if only one Agile Instance exists.        | No          |

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

```ts
AgileReactComponent
```
Returns a modified version of the passed React Component.
