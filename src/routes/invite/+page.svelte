<script lang="ts">
    import { redirect } from "@sveltejs/kit";
    import { Button, TextInput } from "carbon-components-svelte";

    let code: string;

    const click = () => {
        console.log(code);
        throw redirect(307, code);
    };
</script>

<section>
    <h1>Invitation</h1>

    <TextInput
        labelText="Invitation Code"
        placeholder="Enter Invitation Code..."
        bind:value={code}
    />

    <div class="button">
        <Button href="/invite/{code}">Accept Invitation</Button>
    </div>
</section>

<style>
    h1 {
        margin-bottom: 1em;
    }

    .button {
        margin-top: 4em;
    }
</style>
