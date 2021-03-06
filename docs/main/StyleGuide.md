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

In general, the `Style Guide 1` is intended for smaller applications with about `1-2` entities.
Entities are in AgileTs things with distinct and independent existence like `users`, `posts`, `todos`.
We put everything related to these entities into a single file of truth called `store.ts`.
In the end, this file contains the Agile Instance, all States, actions, ..
Simply put, the whole business logic of your application.
If your application scales and has more than `1-2` entities, we don't recommend using this Style Guide
since it might get a mess to put everything into a single file of truth.

#### 🖥 Example Application
- [Simple Todo List](https://codesandbox.io/s/agilets-simple-todo-list-glmc4)

In this Style-Guide, we have a so-called `store.ts` file at the top-level of our `src` folder, besides our UI-Components.
The `store.ts` is thought to be the brain of our application and should contain all business logic
and logic in general that isn't explicitly bound to a Component.
This outsourcing of our logic makes our code more decoupled,
portable, and above all easy testable.

Below you see where our `store.ts` file might be located in the main tree.
```js {3} title="MyApp"
my-app
├── src
│   └── store.ts
│   └── render
.
```
We use the `store.ts` file of a simple TODO application to illustrate how it can be constructed visually.

### 📝 store.ts

In the `store.ts` file, we instantiate the Agile Instance (`Agile`) and define all [Agile Sub Instances](../main/Introduction.md#agile-sub-instance) (`MY_TODOS`).
In addition, all actions (`updateTodo()`, `toogleTodo()`, ..) and if you are using Typescript, interfaces (`TodoInterface`) are located here.
If you are wondering why we write AgileTs States uppercase. Well, it has a simple advantage.
We can easily differentiate between global and local States in our Components.
```ts title="store.ts"
import { Agile } from "@agile-ts/core";
import reactIntegration from "@agile-ts/react";

export interface TodoInterface {
  id: number;
  text: string;
  done: boolean;
}

// Create Agile Instance
const App = new Agile().integrate(reactIntegration);

// Create Collection (A dynamic Array of States)
export const MY_TODOS = App.createCollection<TodoInterface>({
  key: "todos"
}).persist(); // perist does store the Collection in the Local Storage

export const updateTodo = (id: number, text: string): void => {
  MY_TODOS.update(id, { text: text });
};

export const toggleTodo = (id: number): void => {
  MY_TODOS.update(id, { done: true });
};

export const removeTodo = (id: number): void => {
  MY_TODOS.remove(id).everywhere();
};

export const addTodo = (text: string): void => {
  MY_TODOS.collect(
    {
      id: randomId(),
      text: text,
      done: false
    }
  );
};
```



<br />

---

<br />



## 🚀 Inspiration 2

At the first look, the `Style Guide 2` might look very boiler-plate-ey.
Every Entity has its own directory, with a bunch of files.
However, there is a  system behind it, which improves the maintainability of your application for almost 100%
True, for small apps like a simple single-page application with `0-2` entities, this might be an overkill.
However, for applications with many entities that have planned to scale, it's definitely worth a try.

####  🖥 ExampleApplications
Currently, no open-source application is using this `Style Guide`.
I have personally worked with it in a medium-sized private repository with about 7 entities, 
and it worked pretty good.

In this Style-Guide, we have a so-called `core` at the top-level of our `src` folder, besides our UI-Components.
The `core` is thought to be the brain of our application and should contain all business logic
and logic in general that isn't explicitly bound to a Component.
This outsourcing of our logic makes our code more decoupled,
portable, and above all easy testable.

Below you see where our `core` might be located in the main tree.
```js {3} title="MyApp"
my-app
├── src
│   └── core
│   └── render
.
```
We use the `core` of a simple TODO application to visually illustrate how such a `core` can be constructed.
Our todo application has two main [Entities](#📁-entities), which a State Manager like AgileTs should handle.
The **User** and of course, the **TODO-Item**. These two parts are mapped in our `core`.
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
Each property you find in the above folder structure of the `TodoList-Core`, is described in detail below ⬇️.

## 📁 api

Our Todo-List has to communicate to a `backend`. Therefore, we need something that creates http/s requests for us.
In the example, we use the [AgileTs API](../packages/api/Introduction.md), but you can use whatever you want.
If your application doesn't need to communicate to a `backend,` you can entirely skip the `api` section.

### 📝 index.ts

To make rest calls possible, we initialize our api class in the `index` file of the `api` folder.
The defined API Instance will be mainly used in the [route](#-routets) files of the [Entities](#-entities),
where we define the single routes to the backend.
```ts title="index.ts"
import API from '@agile-ts/api';

const api = new API({
    baseURL: 'http://localhost:5000',
    timeout: 10000,
    options: {
        credentials: undefined,
    },
});

export default api;
```

## 📁 entities

Our `core` consists of several entities, which exist apart from each other, having their own independent existence.
Each `Entity` manages its Data separately by doing rest calls or mutating its States. This separation makes our `core` more
structured, readable and improves maintainability.

**For example:** <br />
The _User Entity_ should only treat the user's whole logic and shouldn't do rest calls, for instance, for the _Todo-Item Entity_.

### 📝 index.ts

Here we just export all [actions](#-actionts), [routes](#-routets), [interfaces](#-interfacets) and
the [controller](#-controllerts). To properly import them in our UI-Layer later, like `core.todo.createTodo()`.
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

All actions of the Entity are defined in this file.
In general, an action modifies the `State`, makes rest calls (through the functions provided by the [route.ts](#-routets) file),
and computes some values if necessary.
In principle, actions always happen in response to an event. For example, if the add todo button got pressed.
Therefore, they should be called after action sounding names. For instance `createTodo`, `removeTodo`.

**For example:** <br />
The creation of a Todo-Item in the UI-Layer triggers the `addTodo()` action,
which then mutates our TodoItems State and makes a rest call to the backend.

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

The `controller.ts` manages and represents the [Agile Sub Instances](../main/Introduction.md#agile-sub-instance) (like States, Collections, ..) for an Entity.
These [Agile Sub Instances](../main/Introduction.md#agile-sub-instance) might get modified by the actions in the [action.ts](#📝-.action.ts) file or bound to Components in the UI-Layer.
If you are wondering why we write AgileTs States uppercase. Well, it has a simple advantage.
We can easily differentiate between global and local States in our Components.
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

If you are familiar with [Typescript](https://www.typescriptlang.org/), you properly want to create some interfaces for your Entity.
These interfaces belonging to the Entity should be defined here.

**For example** <br />
In the case of the TODO-Entity, it contains the `TodoInterface`.

```ts title="todo.interface.ts in 📁todo"
export interface TodoInterface {
    id: string
    userId: string
    description: string
    creationDate: string
}
```

### 📝 .route.ts

In order to communicate to our backend, we have to create [rest calls](https://en.wikipedia.org/wiki/Representational_state_transfer).
For better maintainability, these rest calls are outsourced from the [action.ts](#-actionts) file and provided by this section in function shape.
These route functions should only be used in the [actions](#-actionts) of the Entity.
It's not recommended calling them from outside the corresponding Entity.
```ts title="todo.route.ts in 📁todo"
import {TodoInterface} from "./todo.interface";
import api from "../../api";

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

In the `app` file, we create our main `Agile Instance` and configure it to meet our needs.
For example, we determine here with which UI framework AgileTs should work together.
States, Collections, etc., can then be created with the help of this instance.
**It's not recommended to have multiple `Agile Instances` in one application!!**

```ts title="app.ts"
import {Agile} from "@agile-ts/core";
import reactIntegration from "@agile-ts/react";

export const App = new Agile({logJobs: true}).integrate(reactIntegration);
```

## 📝 index.ts

Here we export our `core` Entities so that each Entity can be reached without any detours.
In our UI-Layer we than simply import our `core` and can mutate Entities like the Todo-Entity (`core.todo.addTodo(/* */)`)
without further thinking.
```ts title="index.ts"
import todo from "./controllers/todo";
import user from "./controllers/user";
import {globalBind} from "@agile-ts/core";

const core = {
    todo: todo,
    user: user,
};

// For better debugging, you might want our core global (Don't do that in PRODUCTION!!)
globalBind("__core__", core);

export default core;
```



<br />

---

<br />



## 🚀 Inspiration 3

:::note

There is no third Inspiration Guide yet. But feel free to share your own 'Style Guide' inspiration here. Every contribution
is welcome. :D

:::