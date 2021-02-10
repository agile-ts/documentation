---
id: style-guide
title: Style Guide
sidebar_label: Style Guide
slug: /style-guide
---

:::note

**AgileTs isn't bound to any specific Style-Guide**, but there are some you may get inspired from.

:::

To give you an idea of possible structures for applications using AgileTs as a state management framework,
we have prepared some inspiration guides for you.
Feel free to choose one of them and adapt it to your needs.

## 🚀 Inspiration 1

In this Style-Guide, we have a so-called `core` at the top-level of our `src` folder beside our UI-Components.
The `core` is thought to be the brain of our application and should contain all business logic
and logic in general, that isn't specifically bound to a Component.
This outsourcing of our logic makes our code more decoupled,
portable, and above all easy testable.

Below you can see where our `core` should be located.

```js {3} title="MyApp"
my-app
├── src
│   └── core
│   └── render
.
```

To represent the `core` for a better understanding visual, I use one of a TODO application.
This application has two main [Entities](#📁-entities), that can be handled by AgileTs.
The **User** and of course the **TODO-Item**. These two parts are mapped in our `core`.

```js title="TodoList-Core"
core
│── api
│   ├── index.ts
│── entities
│  └── todo
│  |    ├── index.ts
│  |    └── todo.actions.ts
|  |    └── todo.controller.ts
|  |    └── todo.interface.ts
|  |    └── todo.routes.ts
│  └── user
│       ├── index.ts
│       └── user.actions.ts
|       └── user.controller.ts
|       └── user.interface.ts
|       └── user.routes.ts
|── app.ts
|── index.ts
.
```
Each property that you can find in the above shown graph, is described in detail below ⬇️.

## 📁 api

Our Todo-List has to communicate to a **Backend**, therefore we need something that creates http/s requests for us.
I am using the [AgileTs API](../packages/api/Introduction.md) but you can use whatever you want.

### 📝 index.ts

To make simple rest calls possible, we initialize our api class here.
These defined API instance gets mainly used in the [route](#📝-.routes.ts) section of an Entity.

```ts title="index.ts"
import {API} from "@agile-ts/api";

const API = API({
    baseURL: 'http://localhost:5000',
    timeout: 10000,
    options: {
        credentials: undefined
    }
});

export default API;
```

## 📁 entities

Our `core` consists of several entities, which exist apart from each other, having their own independent existence. Each
Entity manages its Data separately by doing rest calls or mutating States. This separation makes our `core` more
structured, readable, and improves maintainability.

**For instance:** <br />
A _User Entity_ should only treat the whole logic of the User and shouldn't do rest calls for the _Todo Entity_.

### 📝 index.ts

Here we just export all [actions](#📝-.action.ts), [routes](#📝-.routes.ts), [interfaces](#📝-.interface.ts) and
the [controller](#📝-.controller.ts). To properly import them in our UI-Layer later.

```ts title="index.ts in 📁todo"
import * as actions from "./todo.actions";
import * as controller from "./todo.controller";
import * as routes from "./todo.routes";
import * as interfaces from "./todo.interface";

export default {
    ...actions,
    ...controller,
    ...routes,
    ...interfaces,
};
```

### 📝 .action.ts

An action is any piece of code that modifies our `State`.
In principle, actions always happen in response to an event. For example, a button got clicked.

**For instance:** <br />
The creation of a Todo-Item in the UI-Layer triggers the `addTodo` action, which then mutates our State and makes rest calls.

```ts title="todo.action.ts in 📁todo"
import {TodoInterface} from './todo.interface';
import {ADD_TODO} from './todo.routes';
import {TODOS} from './todo.controller';

export const addTodo = async (userId: string, description: string): Promise<void> => {
    // Rest Call
    const response = await ADD_TODO({description: description, userId: userId});

    // Add Todo to Collection
    TODOS.collect(todo, userId);
};

// ..

```

### 📝 .controller.ts

The Controller of an Entity holds and controls States, Collections, .. for that Entity.
These Agile Sub Instances might get modified by [actions](#📝-.action.ts) or bound to a Component in the UI-Layer.

```ts title="todo.controller.ts in 📁todo"
import {App} from '../../app';
import {TodoInterface} from './todo.interface';
import {CURRENT_USER} from '../user'

// Holds all existing TODO's
export const TODOS = App.createCollection<TodoInterface>()();

// Holds all TODO's that belong to the current logged in USER
export const USER_TODOS = App.createComputed(() => {
    return TodosCollection.getGroup(CURRENT_USER.value.id).output;
});
```

### 📝 .interface.ts

:::note

The `interface` section can be ignored by non [Typescript](https://www.typescriptlang.org/) users!

:::

If you are a [Typescript](https://www.typescriptlang.org/) user, you properly want to create an interface for your entity.
These interfaces belonging to this entity should be defined here.

**For instance** <br />
In case of the TODO-Entity, it contains a _TodoInterface_.

```ts title="todo.interface.ts in 📁todo"
export interface TodoInterface {
    id: string
    userId: string
    description: string
    creationDate: string
}
```

### 📝 .routes.ts

To communicate to our server, we have to create [rest calls](https://en.wikipedia.org/wiki/Representational_state_transfer).
For better maintainability, these rest calls are provided here in function shape
and should only be used in [actions](#📝-.action.ts) of the Entity.
It's not recommended calling them from outside the corresponding Entity.

```ts title="todo.routes.ts in 📁todo"
import {TodoInterface} from "./todo.interface";
import API from "../../api";

interface AddTodoPayloadInterface {
    description: string,
    userId: string
}

export const ADD_TODO = async (payload: AddTodoPayloadInterface): Promise<TodoInterface> => {
    const response = await api.post('todos', payload);
    return response.data.body.todo;
}

// ..

```

## 📝 app.ts

In this file, we create our main `Agile Instance` and configure it to meet our needs.
For example, we determine here with which UI framework AgileTs works together.
States, Collections, etc. then can be created with help of this Instance.
**It's not recommended having multiple `Agile Instances` in one Application!!**

```ts title="app.ts"
import {Agile} from "@agile-ts/core";
import reactIntegration from "@agile-ts/react";

export const App = new Agile({logJobs: true}).use(reactIntegration);
```

## 📝 index.ts

Here we export our `core` entities so that each entity can be reached without any detours.
For instance, we might import the `core` in our UI-Layer. 
There we than just import our `core` and mutate each entity from it like `core.todo.addTodo(/* */)`.

```ts title="index.ts"
import todo from "./controllers/todo";
import user from "./controllers/user";
import {globalBind} from "@agile-ts/core";

const core = {
    todo: todo,
    user: user,
};

// For better debugging you might want our core global (Don't do that in PRODUCTION!!)
globalBind("__core__", core);

export default core;
```
