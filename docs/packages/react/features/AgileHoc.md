---
id: agileHOC
title: AgileHOC
sidebar_label: AgileHOC
slug: /react/AgileHOC
---

:::info

The `AgileHOC` is mainly thought for [Class Components](https://reactjs.org/docs/components-and-props.html),
as we recommend using Hooks in [Functional Components](https://reactjs.org/docs/components-and-props.html).

:::

The `AgileHOC` is a Higher Order Component that is wrapped around a React Component.
It takes care of binding [Agile Sub Instances](../../../main/Introduction.md#agile-sub-instance) (like States or Collections) to the wrapped React Component.
```tsx
export default AgileHOC(RandomComponent, [MY_COOL_STATE]);
```
The `output` of the passed States will be mapped into the `props` property of the Class Component.
Therefore, each State should have a unique key to be correctly represented by the `props` property.
To be 100% sure that each State has its own key, we recommend providing the States to the `AgileHOC()` in a keymap instead of an array.
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

### 🏷 Subscribable Instances
We are not limited to States.
We can bind any [Agile Sub Instance](../../../main/Introduction.md#agile-sub-instance) that owns
an `Observer` to React Components.
```ts
  export default AgileHOC(RandomComponent, [MY_COOL_STATE, MY_GROUP]);
```
Instances that can be bound to a React Component via the `useAgile()` Hook:
- [`State`](../../core/features/state/Introduction.md)
- [`Computed`](../../core/features/computed/Introduction.md)
- [`Collection`](../../core/features/collection/Introduction.md)
- [`Group`](../../core/features/collection/group/Introduction.md)
- [`Selector`](../../core/features/collection/selector/Introduction.md)
- [`Item`](../../core/features/collection/Introduction.md#-item)
- `undefined`

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
But be aware that the [Agile Sub Instance](../../../main/Introduction.md#agile-sub-instance) `outputs` merged into the `props` property **aren't typesafe**.

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