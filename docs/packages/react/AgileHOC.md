---
id: agileHOC
title: AgileHOC
sidebar_label: AgileHOC
slug: /react/AgileHOC
---

`AgileHOC` is a [Higher-Order Component](https://reactjs.org/docs/higher-order-components.html), that binds Agile Instances to React Components.
It is mainly thought for [Class Component](https://reactjs.org/docs/components-and-props.html) Users,
since for [Functional Components](https://reactjs.org/docs/components-and-props.html) we have create a much neater solution, [useAgile](./useAgile.md).

## Class Component

So what is a HOC, well it's a [Higher Order Component](https://reactjs.org/docs/higher-order-components.html),
that gets wrapped around our React Class. By wrapping our Component into the `AgileHOC`, we are able to bind Agile Instances to it.
This ensures that our Class Component rerender, whenever a bound Agile Instance mutates.
The `output` of the Agile Instance gets merged into the `props` of the Class Component.
But we recommend using the the direct State Value, because it's more typesafe!
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

### 🛠 Straightforward Example

```tsx live
const App = new Agile();
const MY_STATE = App.State("Hello Stranger!", {key: "myFirstState"});

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

<br />

---

<br />

## Functional Component

:::warning

You can use the AgileHOC like above also in Functional Components.
But we recommend using [useAgile](./useAgile).

:::

<br />

---

<br />

## Typescript

The `AgileHOC` isn't typesafe, since we can't apply a type to the `props`.
But there is a way to get typesafe with the `AgileHOC`
by not using the `props`, but direct using Agile Instance value such as `MY_STATE.value`.

<br />

---

<br />

## Function Head

```ts
export function AgileHOC(
  ReactComponent: any,
  deps?: Array<State> | { [key: string]: State } | State,
  agileInstance?: Agile
)
```

### Props

| Prop              | Type                                            | Description                                                                  | Required    |
| ----------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- | ------------|
| `ReactComponent`  | any                                             | Component to which the Agile Instances get bound                             | Yes         |
| `dep`             | State \| Collection \| Observer \| undefined    | Agile Instances that get bound to Component                                  | No          |
| `agileInstance`   | Agile                                           | To witch main Agile Instance the Agile Instances get bound. Gets autodetect! | No          |

### Return

Returns modified Component that has bound passed Agile Instances to it.