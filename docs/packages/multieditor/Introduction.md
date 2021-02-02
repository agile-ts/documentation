---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /multieditor
---

:::warning

WIP Package!

:::

> Simple Form Manager

<br />

<a href="https://github.com/agile-ts/agile">
  <img src="https://img.shields.io/github/license/agile-ts/agile.svg?label=license&style=flat&colorA=293140&colorB=4a4872" alt="GitHub License"/></a>
<a href="https://npm.im/@agile-ts/multieditor">
  <img src="https://img.shields.io/npm/v/@agile-ts/multieditor.svg?label=npm&style=flat&colorA=293140&colorB=4a4872" alt="npm version"/></a>
<a href="https://npm.im/@agile-ts/multieditor">
  <img src="https://img.shields.io/bundlephobia/min/@agile-ts/multieditor.svg?label=minified%20size&style=flat&colorA=293140&colorB=4a4872" alt="npm minified size"/></a>
<a href="https://npm.im/@agile-ts/multieditor">
  <img src="https://img.shields.io/npm/dt/@agile-ts/multieditor.svg?label=downloads&style=flat&colorA=293140&colorB=4a4872" alt="npm total downloads"/></a>

## ❓ `multieditor` 

The `multieditor` package is an extension for AgileTs, that makes creating reliable forms easy.

### ⏰ Short Example
```ts
// Let's create our first MultiEditor
const multiEditor = new MultiEditor(editor => ({
  data: {
    id: "myId", // Inital Id
    email: undefined, // Inital Email
    name: undefined, // Inital Name
  },
  onSubmit: async (data) => {
    console.log("Submitted ", data);  // <-------------------------------------------    
  },                                                                  //            |
  fixedProperties: ["id"], // Properties that always get passed as data into the onSubmit function
  validateMethods: {
    email: editor.Validator().string().email().required(), // Email is requiered, a string and follows the Email regex
    name: editor.Validator().string().max(10).min(2).required(), // Name is required, a string, has to be shorter than 10 and longer than 2 chars
  },
  editableProperties: ["email", "name"], // Properties that can be edited
}));

// Lets update the requiered properties to validate the Editor
multiEditor.setValue("email", "test@test.com");
multiEditor.setValue("name", "Jeff");

// Now we can submit the Editor and see what the onSubmit will log
multiEditor.submit();
// Submited {
//   id: "myId",
//   name: "Jeff",
//   email: "test@test.com"
// }
```

### ⛳️ Sandbox
Test the MultiEditor Extension yourself, it's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/multieditor-yxt4x)
- Vue (coming soon)
- Angular (coming soon)

