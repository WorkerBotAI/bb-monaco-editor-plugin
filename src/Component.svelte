<script lang="ts">
  import { getContext } from "svelte";
  import MonacoEditor from "./MonacoEditor.svelte";
  import { getThemeForMonaco, type Theme } from "./services/theme";
  import { onDestroy } from "svelte";
  import type { Language } from "./services/language";

  //* ------ PROPS ------ *//
  export let field: string;
  export let theme: Theme = "Dark";
  export let height = 100;
  export let initialValue = "";
  export let language: Language = "handlebars";

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

  // Switch theme
  $: vsTheme = getThemeForMonaco(theme);
</script>

<div use:styleable={$component.styles}>
  <MonacoEditor
    {initialValue}
    {language}
    {height}
    {vsTheme}
    bind:realtimeData
  />
</div>

<style>
</style>
