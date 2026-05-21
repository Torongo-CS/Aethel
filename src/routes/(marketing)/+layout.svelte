<!-- src/routes/(marketing)/+layout.svelte -->
<script lang="ts">
  let { children } = $props();
</script>

<!-- This snippet tells Svelte exactly where to load your landing page content -->
{@render children()}