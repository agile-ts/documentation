---
id: agileHOC
title: AgileHOC
sidebar_label: AgileHOC
slug: /react/functionalities/AgileHOC
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

const WrappedComponent = AgileHOC(RandomComponent, [MY_STATE]);

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