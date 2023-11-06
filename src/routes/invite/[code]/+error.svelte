<script lang=ts>
    import { Button, ButtonSet, ToastNotification } from "carbon-components-svelte";
    import { Return } from "carbon-icons-svelte";
    import { page } from '$app/stores';
</script>

<section>
    <h1>Invitation</h1>

    <div class="toast">
        <ToastNotification
            fullWidth
            lowContrast
            hideCloseButton
            kind="error"
            title="Invitation Error"
            caption={$page.error.message}
        />
    </div>
    
    <div class="button">
        <ButtonSet>
            <Button href="/invite" kind="tertiary" icon={Return}
                >Go back</Button
            >
        </ButtonSet>
    </div>
</section>

<style>
    h1 {
        margin-bottom: 1em;
    }

    .toast {
        margin-bottom: 3em;
    }

    .button {
        margin-top: 4em;
    }
</style>
