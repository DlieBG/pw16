<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<section>
    <h1>Welcomde :)</h1>
    <h2>{JSON.stringify(data.user)}</h2>
</section>
