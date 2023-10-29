<script lang="ts">
    import { redirect } from "@sveltejs/kit";
    import { Button, ButtonSet, TextInput } from "carbon-components-svelte";
    import { CheckmarkOutline } from "carbon-icons-svelte";

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
        <ButtonSet>
            <Button href="/invite/{code}" icon={CheckmarkOutline}>Accept Invitation</Button>
        </ButtonSet>
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
