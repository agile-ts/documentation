// File got generated with 'yarn run swizzle @docusaurus/theme-live-codeblock Playground --danger'
// To add the 'noInline' flag and customize the LiveCodeBlock

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import clsx from "clsx";

import styles from "./styles.module.css";
import styled from "styled-components";

function Playground({ children, theme, transformCode, ...props }) {
  return (
    <LiveProvider
      code={children.replace(/\n$/, "")}
      transformCode={transformCode || ((code) => `${code};`)}
      theme={theme}
      noInline={true}
      {...props}
    >
      <PlaygroundEditorHeader>Live Editor</PlaygroundEditorHeader>
      <PlaygroundEditor />
      <PlaygroundPreviewHeader>Result</PlaygroundPreviewHeader>
      <PlaygroundPreviewContainer>
        <LivePreview />
        <LiveError />
      </PlaygroundPreviewContainer>
    </LiveProvider>
  );
}

const PlaygroundHeader = styled.div`
  letter-spacing: 0.08rem;
  padding: 0.75rem;
  text-transform: uppercase;
  font-weight: bold;
`;

const PlaygroundEditorHeader = styled(PlaygroundHeader)`
  background: var(--ifm-color-primary-lightest);
  color: var(--ifm-color-content-inverse);
`;

const PlaygroundPreviewHeader = styled(PlaygroundHeader)`
  margin-top: 30px;
  background: var(--ifm-color-primary-darker);
  color: var(--ifm-color-content);
`;

const PlaygroundPreviewContainer = styled.div`
  border: 1px solid var(--ifm-color-emphasis-200);
  border-bottom-left-radius: var(--ifm-global-radius);
  border-bottom-right-radius: var(--ifm-global-radius);
  position: relative;
  padding: 1rem;
`;

const PlaygroundEditor = styled(LiveEditor)`
  font-family: var(--ifm-font-family-monospace) !important;
  border-bottom-left-radius: var(--ifm-global-radius);
  border-bottom-right-radius: var(--ifm-global-radius);
`;

export default Playground;
