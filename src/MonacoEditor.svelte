<script lang="ts">
  import { onMount } from "svelte";
  import type monacoType from "monaco-editor";
  import loader from "@monaco-editor/loader";
  import { getThemeForMonaco } from "./services/theme";
  import { DefaultSettings, type Settings } from "./services/settings";

  //* ------ PROPS ------ *//
  export let settings: Settings;
  $: ({ width, height } = settings);
  export let realtimeData = settings?.initialValue || "";

  //* ------ CODES ------ *//
  let editor: monacoType.editor.IStandaloneCodeEditor;
  let monaco: typeof monacoType;
  let monacoElement: HTMLElement;
  let isFullscreen = false;

  $: {
    if (settings && editor) {
      editor.updateOptions({
        tabSize: settings.tabSize || DefaultSettings.tabSize,
        wordWrap: settings.isEnableWordWrap ? "on" : "off",
        minimap: {
          enabled: settings.isShowMinimap,
        },
        readOnly: settings.isReadOnly,
        readOnlyMessage: {
          value: settings?.readOnlyMessage || DefaultSettings.readOnlyMessage,
        },
        theme: getThemeForMonaco(settings.theme),
      });
    }
  }
  // Update content when the datasource is modified
  $: settings && editor && editor?.setValue(settings.initialValue || "");

  onMount(() => {
    // Initialize Monaco Editor
    loader.init().then((monacoInstance) => {
      monaco = monacoInstance;
      editor = monaco.editor.create(monacoElement, {
        value: settings.initialValue,
        language: settings.language,
        theme: getThemeForMonaco(settings.theme),
        automaticLayout: true,
        wordWrap: settings.isEnableWordWrap ? "on" : "off",
        tabSize: settings.tabSize || DefaultSettings.tabSize,
        cursorBlinking: "smooth",
        minimap: {
          enabled: settings.isShowMinimap,
        },
        readOnly: settings.isReadOnly,
        readOnlyMessage: {
          value: settings?.readOnlyMessage || DefaultSettings.readOnlyMessage,
        },
        bracketPairColorization: { enabled: true },
        scrollBeyondLastLine: false,
      });

      // update the value when the editor is changed
      editor.onDidChangeModelContent(onContentChanged);
    });
  });

  // Debounce before binding realtimeData to the parent component
  let timer: NodeJS.Timeout;

  function debounce(v: string) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      realtimeData = v;
    }, 350);
  }

  function onContentChanged() {
    // Access the code using `editor.getValue()`
    let code = editor.getValue() || "";
    debounce(code);
  }

  function toggleFullscreen() {
    isFullscreen = !isFullscreen;

    if (isFullscreen) {
      monacoElement.style.height = "99%";
    } else {
      monacoElement.style.height = settings.height.toString();
      monacoElement.style.width = settings.width.toString();
    }
  }
</script>

<div class="monaco-editor" class:fullscreen={isFullscreen}>
  <!-- Toolbar -->
  <div class="toolbar">
    <button
      class="item"
      class:active={isFullscreen}
      on:click={toggleFullscreen}
      title="Fullscreen"
    >
      <i class="fa fa-arrows-alt" />
    </button>
  </div>
  <!-- Editor -->
  <div bind:this={monacoElement} style:height style:width />
</div>

<style>
  .monaco-editor {
    background: #ffffff;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .fullscreen {
    position: fixed;
    bottom: 5%;
    left: 0;
    width: 100% !important;
    height: 74% !important;
    z-index: 1000;
  }

  .toolbar {
    padding: 10px;
    display: flex;
  }

  .toolbar .item {
    background: transparent;
    border: none;
    cursor: pointer;
    height: 30px;
    width: 30px;
    border-radius: 5px;
    color: #000000;
  }

  .toolbar .item.active,
  .toolbar .item:hover {
    background: #276ffe;
    color: #ffffff;
    transition: all 0.2s ease;
  }
</style>
