---
id: introduction
title: Integration
sidebar_label: Integration
slug: /core/integration
---

:::info

Most UI-Frameworks have already an Integration for AgileTs.
So a way to use AgileTs in that UI-Framework and bind States to Components.
Check [here](../../../../main/Frameworks.md) if an Integration for your preferred UI-Framework already exists.
However, if there is no existing Integration yet, then this Section could be interesting for you.
Here we explain how to integrate AgileTs in UI-Frameworks, to properly bind States to Components for reactivity.

:::

The `Integration Class` is an Interface for AgileTs to UI-Frameworks like [React](https://reactjs.org/),
to cause rerender on Components that have subscribed a particular State.
```ts
const reactIntegration = new Integration<typeof React, AgileReactComponent>({
  key: 'myFramework',
  frameworkInstance: MyFramework,
  bind: () => {
    // Will be called shortly after the instatniation of AgileTs
  },
  updateMethod: (componentInstance, updatedData) => {
    // Will be called on each Agile Sub Instance mutation (Component based Subscription) 
    // For instance if MY_STATE value mutates from 'jeff' to 'hans'
    // Note: Function based Subscriptions use a callback to cause a rerender on Components
    // and therefore don't call this method!
    // Props:  
    // componentInstance: The Component to which the State is subscribed to
    // updatedData: The changed data, for instance '{myState: 'hans'}'
  }
});
```


## 🛠 Subscriptions

In order to create a well-functioning Integration,
we need a basic understanding of how States can be bound/subscribed to Components.
In AgileTs there are two different ways with different purposes to bind States to Components:

### `Component` based

A `Component based Subscription` is intended for Components that manage their States internally in a specific property.
For example in a React Class Component the `this.state` property.
Often a rerender is also triggered when the State property got changed.
Therefore, we can merge the changed AgileTs State values into the Component State property,
to cause a rerender on the Component.
```ts
const MY_STATE = App.createState('hans', {key: 'myState'});
this.agileInstance().subController.subscribeWithSubsArray(
   MyComponent,
   [MY_STATE.observer]
);
```
If we now mutate the `MY_STATE` value
```ts
MY_STATE.set('jeff');
```
the `updateMethod()` defined in the `Integration Class` will be called with the following properties:
```ts
// ..
updateMethod: (componentInstance, updatedData) => {
    console.log(componentInstance); // Returns 'MyComponent'
    console.log(updatedData); // Returns '{myState: 'jeff'}'
}
// ..
```

### `Function` based

A `Function based Subscription` is intended for Components that don't manage their States internally 
or don't have a specific property handling their States.
That is why we can't trigger a rerender by mutating the State property of the Component.
Therefore, we came across another solution. A callback function which triggers a rerender on the Component.
This callback function will then be called instead of the `updateMethd()`, 
whenever a bound State mutates.
```ts
const MY_STATE = App.createState('hans', {key: 'myState'});
this.agileInstance().subController.subscribeWithSubsArray(
    () => {console.log('Called callback')},
   [MY_STATE.observer]
);
```
If we now mutate the `MY_STATE` value
```ts
MY_STATE.set('jeff');
```
the defined callback function will be called.
```ts
// console: 'Called callback'
```
Be aware that it won't call the `updateMethod()` defined in the `Integration Class`
since it is only called in a `Component based Subscription`.


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
  // Used to update State in Class Components (Component based Subscription)
  // Note: Functional Components use a Function based Subscription, 
  // therefore they don't call 'updateMethod()'  
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

// Register Integration to AgileTs before instantiation
// So that the user don't have to integrate it manually (App.integration(reactIntegration))
Agile.initialIntegrations.push(reactIntegration);

export default reactIntegration;
```
However, to easily use AgileTs in React Functional and Class Components we had to create ways to simply subscribe a State.
To accomplish this goal we created the `useAgile()` Hook and the `AgileHOC()`.
You can see below how much easier it is to bind a State to a Functional Component using the `useAgile()` Hook
instead of doing it manually:
- with `useAgile()`:
   ```ts title=FunctionalComponent.ts
    useAgile(MY_STATE);
   ```
- doing it manually:
   ```ts title=FunctionalComponent.ts
    const [, forceRender] = React.useReducer((s) => s + 1, 0);

    useEffect(() => {
        // Create Callback based Subscription to bind State to Component
        // and rerender Component whenever the State mutates
        const subscriptionContainer = App.subController.subscribeWithSubsArray(
            // Our rerender trigger callback
            () => {
                forceRender();
            },
            [MY_STATE.observer]
        );
 
        // Unsubscribe Callback based Subscription on Unmount
        // -> cleaning up, otherwise it can lead to memory leaks
        return () => {
            App.subController.unsubscribe(subscriptionContainer);
        };
    });
   ```

So lets take a quick look how a simplified `useAgile()` Hook looks like.
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






