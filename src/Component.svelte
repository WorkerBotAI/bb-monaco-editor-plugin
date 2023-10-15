<script lang="ts">
  import { getContext } from "svelte";
  import MonacoEditor from "./MonacoEditor.svelte";
  import { type Theme } from "./services/theme";
  import { onDestroy } from "svelte";
  import type { Language } from "./services/language";
  import { type Settings } from "./services/settings";

  //* ------ PROPS ------ *//
  export let field: string;
  export let theme: Theme = "Dark";
  export let height = 300;
  export let width = 300;
  export let initialValue = "";
  export let language: Language = "handlebars";
  export let tabSize: Settings["tabSize"];
  export let isEnableWordWrap: Settings["isEnableWordWrap"] = false;
  export let isShowMinimap: Settings["isShowMinimap"] = false;
  export let isReadOnly: Settings["isReadOnly"] = false;
  export let readOnlyMessage: Settings["readOnlyMessage"] = undefined;

  // Invoke settings
  $: settings = {
    theme,
    height: isNaN(height) ? 300 : height,
    width,
    initialValue,
    language,
    tabSize,
    isEnableWordWrap,
    isShowMinimap,
    isReadOnly,
    readOnlyMessage,
  } as Settings;

  //* ------ CONTEXTS ------ *//
  const formStepContext = getContext<any>("form-step");
  const { styleable } = getContext<any>("sdk");
  const formContext = getContext<any>("form");
  const component = getContext<any>("component");

  //* ------ CODES ------ *//
  const formApi = formContext?.formApi;
  $: formStep = formStepContext ? $formStepContext || 1 : 1;
  $: formField = formApi?.registerField(
    field,
    "longform",
    "",
    false,
    null,
    formStep
  );

  let fieldApi: any;
  /**
   * This variable is binding real time data from the editor (after changed by user)
   *
   * `realtimeData` from `<MonacoEditor />` component already debounced
   */
  let realtimeData = initialValue;

  $: unsubscribe = formField?.subscribe((value: any) => {
    fieldApi = value?.fieldApi;
  });

  $: fieldApi?.setValue(realtimeData);

  onDestroy(() => {
    fieldApi?.deregister();
    unsubscribe?.();
  });
</script>

<div use:styleable={$component.styles}>
  <MonacoEditor {settings} bind:realtimeData />
</div>

<style></style>
