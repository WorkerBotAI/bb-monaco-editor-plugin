<script lang="ts">
  import { onMount } from "svelte";
  import type monacoType from "monaco-editor";
  import loader from "@monaco-editor/loader";
  import type { VSCodeTheme } from "./services/theme";
  import type { Language } from "./services/language";

  //* ------ PROPS ------ *//
  export let vsTheme: VSCodeTheme;
  export let initialValue = "";
  export let language: Language = "handlebars";
  export let height = 100;
  export let realtimeData = initialValue;

  //* ------ CODES ------ *//
  let editor: monacoType.editor.IStandaloneCodeEditor;
  let monaco: typeof monacoType;
  let element: HTMLElement;

  // do switch vscode's theme
  $: vsTheme && editor && editor.updateOptions({ theme: vsTheme });

  // Update content when the datasource is modified
  $: editor?.setValue(initialValue || "");

  onMount(() => {
    // Initialize Monaco Editor
    loader.init().then((monacoInstance) => {
      monaco = monacoInstance;
      editor = monaco.editor.create(element, {
        value: initialValue,
        language,
        theme: vsTheme,
        automaticLayout: true,
      });
    });
  });

  // Debounce before binding realtimeData to the parent component
  let timer: NodeJS.Timeout;

  const debounce = (v: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      realtimeData = v;
    }, 650);
  };

  function onEditorChange() {
    // Access the code using `editor.getValue()`
    let code = editor.getValue() || "";
    debounce(code);
  }
</script>

<div bind:this={element} style:height on:input={onEditorChange} />

<style></style>
