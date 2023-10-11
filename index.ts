export { default as MonacoEditor } from "./src/MonacoEditor.svelte";

import Wrapper from "./lib/Wrapper.svelte";
import schema from "./schema.json";
import pkg from "./package.json";

if (window) {
  const plugin = { Component: Wrapper, schema, version: pkg.version };
  if (!window["##BUDIBASE_CUSTOM_COMPONENTS##"]) {
    window["##BUDIBASE_CUSTOM_COMPONENTS##"] = [];
  }
  window["##BUDIBASE_CUSTOM_COMPONENTS##"].push(plugin);
  //@ts-ignore
  if (window.registerCustomComponent) {
    //@ts-ignore
    window.registerCustomComponent(plugin);
  }
}

export const Component = Wrapper;
export const version = pkg.version;
export { schema };
