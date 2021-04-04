---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/integration
---

The `Integration Class` is used to integrate AgileTs into other frameworks like [React](https://reactjs.org/).
```ts
const reactIntegration = new Integration<typeof React, AgileReactComponent>({
  key: 'myFramework',
  frameworkInstance: MyFramework,
  bind() {
    // Will be called on the instantiaten of AgileTs
  },
  updateMethod(componentInstance, updatedData: Object) {
    // Will be called on each Agile Sub Instance mutation
    // For instance if MY_STATE value mutates from 'jeff' to 'hans'
    // componentInstance: The Component to which the State got subscribed (In React it might be the Class Component)
    // updatedData: The data which got updated, for instance {myState: 'hans'}  
  }
    
});
```








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



