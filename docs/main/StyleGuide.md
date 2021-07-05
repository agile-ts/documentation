---
id: style-guide
title: Style Guide
sidebar_label: Style Guide
slug: /style-guide
---

:::important

**AgileTs isn't bound to any specific Style-Guide**, 
but there are some you may get inspired from.

:::

A good frontend architecture isn't installable via npm
and even AgileTs cannot solve this problem on the go.
Planning and building a well-structured application requires a lot of time and effort.
At the beginning, it may not seem appealing to invest time in a good structure
as it will prevent you from getting everything up and running as quickly as possible.
However, a clear structure and consistent plan
saves you a lot of headache and will certainly pay of in the end.
You'll be able to better plan for scaling, avoid unnecessary refactoring sessions
and understand the app hierarchy without having to re-learn every component or service
every time you need to update existing code for a new feature.

So how does a good structured application looks like? 
Well that depends on many factors and to be honest there exists no right or wrong.
Every developer is an individual 
that has different code styles and visions for their applications

However, to give you some inspiration we have prepared some `Style Guides`.
These guides give you a basic idea of possible structures for frontend applications
using AgileTs as State Management Framework.
Feel free to choose one of them and adapt it to your needs.

## 🚀 Inspiration 1

The `Style Guide 1` is intended for **smaller and medium size applications** 
with about `1-3` entities. In AgileTs, `entities` are things with distinct 
and independent existence like users, posts, or todos.
We put everything related to these entities 
into a single file of truth called `store.js` or `core.js`.
In the end, the `core` file contains all the business logic of your application,
meaning all the global `States`, `actions`, ..
If your application scales and has more than `1-3` entities, 
we don't recommend using this Style Guide
as it gets a mess to put everything into a single file of truth.

#### 🖥️ Example Application
- [Simple Todo List](https://codesandbox.io/s/agilets-simple-todo-list-glmc4)

The Style Guide builds on the single source of truth principle.
Thus, it has a single source of truth file called `store.ts`
at the top-level of the `src` folder besides the UI-Components.
```js {3} title="MyApp"
my-app
├── src
│   └── store.ts
│   └── render
.
```
The `store.ts` file is, so to say, the brain of your application and contains all business logic
and logic, in general, that isn't explicitly bound to a UI-Component.
This outsourcing of our logic makes our code more decoupled,
portable, and above all, easily testable.

We use the `store.ts` file of a simple TODO application to illustrate visually
how it can be constructed.

### 📝 store.ts

In the `store.ts` file, we instantiate the Agile Instance (`Agile`) 
and define all [Agile Sub Instances](../main/Introduction.md#agile-sub-instance) (`MY_TODOS`).
In addition, all actions (`updateTodo()`, `toogleTodo()`, ..) 
and if you are using Typescript interfaces (`TodoInterface`) are located here.
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
If you are wondering why we write AgileTs States uppercase. 
Well, it has a simple advantage.
We can easily differentiate between global and local States in our UI-Components.



<br />

---

<br />



## 🚀 Inspiration 2

The `Style Guide 2` is intended for **medium size and large applications** 
with more than `3` entities. 
In AgileTs, `entities` are things with distinct and independent existence like users, posts, or todos.
At first glance, this way of organizing your application looks very boiler-late-ey. 
Each entity has its own directory with a bunch of files.
However, there is a system behind it,
that will definitely improve the maintainability and scalability of your application.
This Style Guide can also be applied to smaller applications
like a simple single-page application with `1-3` entities.
Indeed, this might be an overkill and brings no added value.
But for large applications with many entities that have planned to scale,
it is definitely worth a try.

#### 🖥️ ExampleApplications
Currently, no open-source application is using this `Style Guide`.
I have personally worked with it in a medium-sized private repository with about seven entities, 
and it worked pretty well.

In this Style-Guide, we have a so-called `core` at the top-level of our `src` folder, 
besides our UI-Components.
```js {3} title="MyApp"
my-app
├── src
│   └── core
│   └── render
.
```
The `core` is the brain of your application and contains all business logic
and logic in general that isn't explicitly bound to a UI-Component.
This outsourcing of our logic makes our code more decoupled,
portable, and above all, easily testable.

We use the `core` of a simple TODO application to visually illustrate how such a `core` can be constructed.
Our todo application has two main [entities](#📁-entities), which a State Manager like AgileTs should handle.
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
|  |    └── todo.interfaces.ts
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
Each property you find in the above folder structure of the `TodoList-Core`, 
is described in detail below ⬇️.

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

Our `core` consists of several entities, 
which exist apart from each other, having their own independent existence.
Each `entity` manages its data separately by making rest calls or mutating its States. 
This separation makes our `core` more
structured, readable, and improves maintainability.

**For example:** <br />
The _User Entity_ should only treat the user's whole logic 
and shouldn't do rest calls for the _Todo-Item Entity_.

### 📝 index.ts

Here we just export all [actions](#-actionts), [routes](#-routets), [interfaces](#-interfacests) and
the [controller](#-controllerts). To properly import them in our UI-Layer later.
```ts title="index.ts in 📁todo"
import * as actions from "./todo.actions";
import * as controller from "./todo.controller";
import * as routes from "./todo.routes";
import * as interfaces from "./todo.interfaces";

export default {
    ...actions,
    ...controller,
    ...routes,
    ...interfaces,
};
```
In the UI-Layer it can then be imported like that:
```ts
import core from '../core';

// Call create Todo action
core.todo.createTodo();

// Retreive the 'TODOS' Collection
core.todo.TODOS;
```

### 📝 .action.ts

All actions of the entity are defined in this file.
In general, an action modifies the `State`, 
makes rest calls (through the functions provided by the [route.ts](#-routets) file),
and computes some values if necessary.
In principle, actions always happen in response to an event. 
For example, when the add todo button got pressed.
Thus, they should be called like action sounding names. 
For instance `createTodo` or `removeTodo`.

**For example:** <br />
The creation of a Todo-Item in the UI-Layer triggers the `addTodo()` action,
which then mutates our TodoItems State and makes a rest call to the backend.

```ts title="todo.action.ts in 📁todo"
import {TodoInterface} from './todo.interfaces';
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

The `controller.ts` manages 
and contains the [Agile Sub Instances](../main/Introduction.md#agile-sub-instance) for an entity.
These Agile Sub Instances can then be modified by the actions ([action.ts](#📝-.action.ts))
or bound to UI-Components for reactivity.
```ts title="todo.controller.ts in 📁todo"
import {App} from '../../app';
import {TodoInterface} from './todo.interfaces';
import {CURRENT_USER} from '../user'

// Manages all existing TODO's
export const TODOS = App.createCollection<TodoInterface>()();

// Manages all TODO's that belong to the current logged in USER
export const USER_TODOS = App.createComputed(() => {
    return TodosCollection.getGroup(CURRENT_USER.value.id).output;
});
```
If you are wondering why we write AgileTs States uppercase. 
Well, it has a simple advantage.
We can easily differentiate between global and local States in our UI-Components.

### 📝 .interfaces.ts

:::note

The `interface` section can be ignored by non [Typescript](https://www.typescriptlang.org/) users!

:::

If you are familiar with [Typescript](https://www.typescriptlang.org/), 
you properly want to create some interfaces for your entity.
These interfaces belonging to the entity should be defined here.

**For example** <br />
In the case of the TODO-Entity, it contains the `TodoInterface`.

```ts title="todo.interfaces.ts in 📁todo"
export interface TodoInterface {
    id: string
    userId: string
    description: string
    creationDate: string
}
```

### 📝 .route.ts

In order to communicate to our backend, we have to create [rest calls](https://en.wikipedia.org/wiki/Representational_state_transfer).
For better maintainability, these rest calls are outsourced 
from the [action.ts](#-actionts) file and provided by this section in function shape.
These route functions should only be used in the [actions](#-actionts) of the entity.
It's not recommended calling them from outside the corresponding entity.
```ts title="todo.route.ts in 📁todo"
import {TodoInterface} from "./todo.interfaces";
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
import {Agile, Logger, assignSharedAgileInstance} from "@agile-ts/core";
import reactIntegration from "@agile-ts/react";

export const App = new Agile({logConfig: {level: Logger.level.WARN}}).integrate(reactIntegration);

// Assign created Agile Instance as shared Agile Instance
assignSharedAgileInstance(App);
```

## 📝 index.ts

Here we export our `core` Entities so that each entity can be reached without any detours.
In our UI-Layer we than simply import our `core` 
and can mutate Entities like the Todo-Entity (`core.todo.addTodo(/* */)`)
without further thinking.
```ts title="index.ts"
import todo from "./controllers/todo";
import user from "./controllers/user";
import {globalBind} from "@agile-ts/core";

const core = {
    todo: todo,
    user: user,
};

// For better debugging, we bind the core globally (Don't do that in PRODUCTION!!)
globalBind("__core__", core);

export default core;
```



<br />

---

<br />



## 🚀 Inspiration 3

:::note

There is no third Inspiration Guide yet.
It does not have to be like this forever.
Feel free to share your own `Style Guide` inspiration here. 
Every contribution is welcome. 😀

:::
