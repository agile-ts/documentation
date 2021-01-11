---
id: style-guide 
title: Style Guide 
sidebar_label: Style Guide 
slug: /style-guide
---

:::note

**AgileTs isn't bound to any specific Style-Guide** but there are some may get inspiration from.


:::

## 🚀 Suggestion

To give you an idea, I will show you the style guide which worked well for me. Feel free to tweak it to your needs

In this Style-Guide we have a so called `core` at the top level of our `src` folder, which is thought to be the brain of
our application and should contain all business logic, that isn't bound to any specific Component. It holds and manages
for instance our _Routes_, _States_, _Collections_, .. This outsourcing of our Logic makes the code more decoupled,
portable, and above all, easily testable.

Below you can see where our `core` could be located.

```js {3} title="MyApp"
my - app
├── src
│   └── core
│   └── render
    .
```

To visually demonstrate the structure of a `core`, I use the core of a simple [TODO-List Application](TODO).

```js title="TodoList-Core"
core
├── src
│── api
│   ├── index.ts
│── entities
│  └── todo
│  |    ├── index.ts
│  |    └── todo.actions.ts
| |    └── todo.controller.ts
| |    └── todo.interface.ts
| |    └── todo.routes.ts
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

A basic Todo-List has two [Entities](#📁-entities) that can be handled by a State-Management Framework.
The **User**'s and of course the **TODO**'s. These 2 main parts are also shown in our `core`.

## 📁 api

Our Todo-List has to communicate to a **Backend**, that's why we need something that handles http/s requests for us. I
am using the [AgileTs API](../packages/api/introduction.md) but of course you can use whatever you want. 

### 📝 index.ts

To make the rest calls possible we initialize our API here.

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

Our core consists of several entities which exists apart from each other, having its own independent existence. Each
Entity manages its Data separately by doing rest calls or mutating our States. This separation makes our `core` more
structured, readable and improves the maintainability.

For Instance the `user` entity only treaties the whole Logic of the User.

### 📝 index.ts

Here we just export all [actions](#📝-.action.ts), [routes](#📝-.routes.ts), [interfaces](#📝-.interface.ts) and
the [controller](#📝-.controller.ts). To properly import it later in our UI-Components.

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

Actions are functions we call from our UI-Layer, 
to make rest calls, mutate your AgileTs Instances(State, Collection, ..), ..

**For instance** we trigger `addTodo` from a Button which than makes a rest call to maintain the database and updates
the Collection to do immediately apparent changes in the UI.

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

Holds and instantiates all Agile Instances that belong to the Entity.

**For instance** in the `todo.controller` we instantiate a _TODOS_ Collection, and a Computed called _USER_TODOS_.

```ts title="todo.controller.ts in 📁todo"
import {App} from '../../app';
import {TodoInterface} from './todo.interface';
import {CURRENT_USER} from '../user'

// Holds all existing TODO's
export const TODOS = App.Collection<TodoInterface>()();

// Holds all TODO's that belong to the current logged in USER
export const USER_TODOS = App.Computed(() => {
    return TodosCollection.getGroup(CURRENT_USER.value.id).output;
});
```

### 📝 .interface.ts

Here we can define our Interfaces which are used in the Entity.

:::info

Not necessary if you aren't using [Typescript](https://www.typescriptlang.org/).

:::

```ts title="todo.interface.ts in 📁todo"
export interface TodoInterface {
    id: string
    userId: string
    description: string
    creationDate: string
}

```

### 📝 .routes.ts

Our rest calls live here.

**For Instance** in the `todo.routes.ts` we make a rest call to add a TODO to our database in the backend.

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

Here we just define AgileTs with the Framework we are using right now.

```ts title="app.ts"
import {Agile} from "@agile-ts/core";
import reactIntegration from "@agile-ts/react";

export const App = new Agile({logJobs: true}).use(reactIntegration);
```

## 📝 index.ts

In this index.ts we export our core to the wide world of our Application.

```ts title="index.ts"
import todo from "./controllers/todo";
import user from "./controllers/user";
import {globalBind} from "@agile-ts/core";

const core = {
    todo: todo,
    user: user,
};

// If you want to have your core global (Don't do that in PRODUCTION!!)
globalBind("__core__", core);

export default core;
```



