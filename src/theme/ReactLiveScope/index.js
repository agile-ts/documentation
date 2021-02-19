// File got generated with 'yarn run swizzle @docusaurus/theme-live-codeblock ReactLiveScope --danger'
// To create a custom live-code-block scope

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { Agile, generateId } from '@agile-ts/core';
import { useAgile, AgileHOC, useEvent, useWatcher } from '@agile-ts/react';
import { toast, ToastContainer } from 'react-toastify';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  Agile,
  useAgile,
  useEvent,
  useWatcher,
  AgileHOC,
  generateId,
  toast,
};

export default ReactLiveScope;
