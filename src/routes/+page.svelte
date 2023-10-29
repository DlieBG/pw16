<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<section>
    <h1>Welcome :)</h1>
    <pre>{JSON.stringify(data.user)}</pre>
</section>

<style>
    h1 {
        margin-bottom: 2em;
    }
</style>
