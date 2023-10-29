<script lang="ts">
    import {
        Button,
        ButtonSet,
        ToastNotification,
    } from "carbon-components-svelte";
    import type { PageData } from "./$types";
    import { startRegistration } from "@simplewebauthn/browser";
    import { Login, Password } from "carbon-icons-svelte";

    export let data: PageData;

    let error: string | null = null;
    let success: boolean = false;

    const register = () => {
        startRegistration(data.options)
            .then((response) => {
                fetch("", {
                    method: "POST",
                    body: JSON.stringify(response),
                })
                    .then(() => {
                        error = null;
                        success = true;
                    })
                    .catch((e) => {
                        error = e.toString();
                        success = false;
                    });
            })
            .catch((e) => {
                error = e.toString();
                success = false;
            });
    };
</script>

<section>
    <h1>Invitation</h1>

    {#if error}
        <div class="toast">
            <ToastNotification
                fullWidth
                lowContrast
                hideCloseButton
                kind="error"
                title="Registration Failed"
                caption={error}
            />
        </div>
    {/if}

    {#if success}
        <div class="toast">
            <ToastNotification
                fullWidth
                lowContrast
                hideCloseButton
                kind="success"
                title="You are registered!"
                caption="Welcome, {data.name}!"
            />
        </div>
    {/if}

    <p>
        Hey {data.name}! <br />
        You are invited to activate your account for the Schwering App at the location
        Pröbstingweg 16.
    </p>

    <ToastNotification
        fullWidth
        lowContrast
        hideCloseButton
        kind="info"
        title="Login Method"
        caption="You will be asked to proceed with a platform embedded login."
    />

    {#if success}
        <div class="button">
            <ButtonSet>
                <Button href="/login" kind="tertiary" icon={Login}
                    >Goto Login</Button
                >
            </ButtonSet>
        </div>
    {:else}
        <div class="button">
            <ButtonSet>
                <Button on:click={register} icon={Password}>Register</Button>
            </ButtonSet>
        </div>
    {/if}
</section>

<style>
    h1 {
        margin-bottom: 1em;
    }

    .toast {
        margin-bottom: 3em;
    }

    p {
        margin-bottom: 3em;
    }

    .button {
        margin-top: 4em;
    }
</style>
