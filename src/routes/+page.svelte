<script lang="ts">
    import { Tile } from "carbon-components-svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<section>
    <h1>Welcome :)</h1>

    <div class="wrapper">
        <div class="tile">
            <Tile>
                <h3>{data.user.name}</h3>
                {data.user.description}
            </Tile>
        </div>
    </div>
</section>

<style>
    h1 {
        margin-bottom: 1em;
    }

    .wrapper {
        display: flex;
    }

    .tile {
        min-width: 320px;
    }
</style>
