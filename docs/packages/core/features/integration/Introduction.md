---
id: introduction
title: Integration
sidebar_label: Introduction
slug: /core/integration
---

:::info

The `Integration Class` is useful for creating an Integration for a specific Framework.
Luckily there already exists some Integrations, so we don't have to built them from scratch.
Check [here](../../../../main/Frameworks.md) if your required Integration already exists.

:::

The `Integration Class` is an Interface for AgileTs to other Frameworks like [React](https://reactjs.org/).
It is mainly used to cause rerender on Components which has subscribed a particular State for reactivity.
```ts
const reactIntegration = new Integration<typeof React, AgileReactComponent>({
  key: 'myFramework',
  frameworkInstance: MyFramework,
  bind() {
    // Will be called as soon as the Integration gets integrated into AgileTs
  },
  updateMethod(componentInstance, updatedData) {
    // Will be called on each Agile Sub Instance mutation (Component based Subscription) 
    // For instance if MY_STATE value mutates from 'jeff' to 'hans'
    // Function based Subscriptions use a callback to cause a rerender on Components and therefore don't call 'updateMethod()'
    // componentInstance: The Component to which the State got subscribed to (In React it might be the Class Component)
    // updatedData: The data which got updated, for instance '{myState: 'hans'}'
  }
});
```

## 💾 Example

### 🔵 [`React`](https://reactjs.org/)
Here is how the React Integration looks like.
```ts
import { Agile, flatMerge, Integration } from '@agile-ts/core';
import { AgileReactComponent } from './hocs/AgileHOC';
import React from 'react';

const reactIntegration = new Integration<typeof React, AgileReactComponent>({
  key: 'react',
  frameworkInstance: React,
  bind() {
    // Nothing to bind ;D
    return Promise.resolve(true);
  },
  // Used to update State in Class Component (Component based Subscription)
  // (Function Components use a Function based Subscription therefore they don't call 'updateMethod()')  
  updateMethod(componentInstance, updatedData: Object) {
    // Merge changes into State if some Data updated otherwise force rerender
    if (Object.keys(updatedData).length !== 0) {
      componentInstance.agileProps = flatMerge(
        componentInstance.agileProps,
        updatedData
      );
      componentInstance.setState(
        flatMerge(componentInstance.state, updatedData)
      );
    } else {
      componentInstance.forceUpdate();
    }
  },
});
Agile.initialIntegrations.push(reactIntegration);

export default reactIntegration;
```
However, to properly use AgileTs in React Function and Class Components there were some other things to do.
For instance, we had to create the `useAgile` Hook or the `AgileHOC` to properly subscribe States to Components.
So lets take a quick look how a simplified `useAgile` Hook looks like.
```ts
import React from 'react';
import {
    Agile,
    getAgileInstance,
    extractObservers,
    Observer,
    State,
} from '@agile-ts/core';

function useAgile(deps: Array<State | Collection | Observer | undefined>, agileInstance?: Agile){
    // Extract Observers from passed Agile Sub Instances
    // Each State has an Observer, which can be subscribed to a Component
    // Through such Observer the State is able to trigger rerenders on the subscribed Components
    const depsArray = extractObservers(deps);
    
    // Trigger State, used to force Component to rerender
    const [, forceRender] = React.useReducer((s) => s + 1, 0);
    
    useEffect(() => {
        // Try to get Agile Instance from passed Instances, otherwise drop error
        if (!agileInstance) agileInstance = getAgileInstance(depsArray[0]);
        if (!agileInstance || !agileInstance.subController) {
            Agile.logger.error('Failed to subscribe Component with deps', depsArray);
            return;
        }

        // Remove undefined Observers, since we can't subscirbe a not existing Observer
        const observers: Observer[] = depsArray.filter(
            (dep): dep is Observer => dep !== undefined
        );

        // Create Callback based Subscription
        // -> whenever a subscribed State mutates, this callback will be called
        // or if its an Component based Subscription the 'updateMethod()' in the React Integration (used in AgileHOC)
        const subscriptionContainer = agileInstance.subController.subscribeWithSubsArray(
            () => {
                forceRender();
            },
            observers,
            key
        );

        // Unsubscribe Callback based Subscription on Unmount (cleaning up, otherwise it can lead to memory leaks)
        return () => {
            agileInstance?.subController.unsubscribe(subscriptionContainer);
        };
    }, []);

    // Create return value
    return depsArray.map((dep) => {
        return dep?.value;
    });
}
```


## 🛠 Subscriptions

To properly create an Integration for AgileTs, 
we need a basic understanding of how States can be bound/subscribed to Components.
Such subscriptions are important to cause rerender on the Component as soon as the State mutates.
In AgileTs there are two ways of binding a State to a Component:

### `Component` based

A `Component based Subscription` is thought for Components which handle their States in a specific property.
For instance in React Class Components the `this.state` property.
If a State mutates, we simply can merge the changed State values into the Component State property.
This will trigger a rerender.
```ts
const MY_STATE = App.createState('hans', {key: 'myState'});
this.agileInstance().subController.subscribeWithSubsArray(
   MyComponent,
   [MY_STATE.observer]
);
```
Now if the State mutates 
```ts
MY_STATE.set('jeff');
```
the `updateMethod()` defined in the Integration will be called
```ts
// ..
updateMethod(componentInstance, updatedData){
    console.log(componentInstance); // Returns 'MyComponent'
    console.log(updatedData); // Returns '{myState: 'jeff'}'
}
// ..
```

### `Function` based

A `Function based Subscription` is thought for Components which don't have a specific property to handle States.
So we can't trigger a rerender by mutating the State property of a Component.
Therefore, we came across another solution. A callback function which triggers a rerender on the Component.
This callback function will be called instead of the `updateMethd()`, whenever a bound State mutates.
```ts
const MY_STATE = App.createState('hans', {key: 'myState'});
this.agileInstance().subController.subscribeWithSubsArray(
    () => {console.log('Called callback')},
   [MY_STATE.observer]
);
```
Now if the State mutates
```ts
MY_STATE.set('jeff');
```
the callback function will be called.
```ts
// console: 'Called callback'
```


## 📭 Props

```ts
new Integration(config);
```

### `config`

A `Integration` takes a required configuration object as its only parameter.
Here is a Typescript Interface of the configuration object for quick reference,
however each property will be explained in more detail below.
```ts
export interface CreateIntegrationConfig<F = any, C = any>
    extends IntegrationMethods<C> {
    key: string;
    frameworkInstance?: F;
}

// or without extending

export interface CreateIntegrationConfig<F = any, C = any> {
    key: string;
    frameworkInstance?: F;
    bind?: (agileInstance: Agile) => Promise<boolean>;
    updateMethod?: (componentInstance: C, updatedData: Object) => void;
}
```

<br/>

#### `key`

The property `key/name` should be a unique `string/number` to identify the Integration later.
```ts
new Integration({
    key: "myIntegration"
    // ..
});
```

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `string \| number` | undefined   | Yes      |

<br/>

#### `frameworkInstance`

The Instance of the Framework the Integration represents.
For instance in case of [React](https://reactjs.org) it should be the 'React' Instance.

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `any`              | undefined   | No       |

<br/>

#### `frameworkInstance`

The Instance of the Framework the Integration represents.
For instance in case of [React](https://reactjs.org) it should be the `React` Instance.

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `any`              | undefined   | No       |

<br/>

#### `bind`

Will be called as soon as the Integration gets integrated into AgileTs.
It might be used to configure something's in the Framework the Integration represents.
If that's done it should return `true` if the Framework is ready and `false` if it's not.

| Type                                               | Default     | Required |
|----------------------------------------------------|-------------|----------|
| `(agileInstance: Agile) => Promise<boolean>`       | undefined   | No       |

<br/>

#### `updateMethod`

Will be called as soon as a to a Component (`componentInstance`) subscribed State mutates.
Be aware that this is only the case if it is a `Component based Subscription`, 
since in `Function based Subscription` a callback function will be called to trigger a rerender on the Component.

| Type                                                   | Default     | Required |
|--------------------------------------------------------|-------------|----------|
| `(componentInstance: C, updatedData: Object) => void`  | undefined   | No       |






