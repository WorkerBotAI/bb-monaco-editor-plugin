# BB-monaco-editor

Integrate monaco editor (Type: `Components`) into budibase through plugins's component

## Description

Integration Monaco editor (VSCode) into budibase platform

## Note

**Working with self-hosting only**

Must whitelist there CSP Policy for loading cross-origin resources:

Steps:
Edit your `budibase/proxy` container (Or build another one with already custom)

- Edit this file with path: `/etc/nginx/templates/nginx.conf.template`
- Append your `$csp_script "..."` into `$csp_script "...  https://unpkg.com https://cdn.jsdelivr.net"`
- Change `$csp_worker` line into `$csp_worker "worker-src 'self' blob: data:";`
- Restart the container

## Download

Navigate to [Releases](https://github.com/WorkerBotAI/bb-monaco-editor-plugin/releases)

## Known issues

- Changing theme in one editor should change all editors (Related to
  [Issue: monaco-editor-#338](https://github.com/microsoft/monaco-editor/issues/338)). Cannot fix due to no plans for monaco's developer support this.

## Instructions

To build `bb-monaco-editor` run the following in your Budibase CLI:

```
budi plugins --build
```

You can also re-build everytime you make a change to `bb-monaco-editor` plugin with the command:

```
budi plugins --watch
```
