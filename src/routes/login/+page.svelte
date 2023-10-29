<script lang="ts">
    import type { PageData } from "./$types";
    import {
        Button,
        ButtonSet,
        ToastNotification,
    } from "carbon-components-svelte";
    import { Login, Logout, Gift, Workspace } from "carbon-icons-svelte";
    import { startAuthentication } from "@simplewebauthn/browser";

    export let data: PageData;

    let error: string | null = null;
    let success: boolean = false;
    let name: string = "you wonderful person";

    const login = () => {
        console.log(data.options);
        startAuthentication(data.options)
            .then((response) => {
                fetch("", {
                    method: "POST",
                    body: JSON.stringify(response),
                })
                    .then(async (login) => {
                        error = null;
                        success = true;

                        name = (await login.json()).name;
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
    {#if data.user}
        <h1>User Info</h1>

        <ToastNotification
            fullWidth
            lowContrast
            hideCloseButton
            kind="success"
            title="You are logged in!"
            caption="Welcome, {data.user.name}!"
        />

        <form class="button" method="POST" action="?/logout">
            <ButtonSet>
                <Button type="submit" kind="danger-tertiary" icon={Logout}
                    >Logout</Button
                >
            </ButtonSet>
        </form>
    {:else}
        <h1>Login</h1>

        {#if error}
            <ToastNotification
                fullWidth
                lowContrast
                hideCloseButton
                kind="error"
                title="Login Failed"
                caption={error}
            />
        {/if}

        {#if success}
            <ToastNotification
                fullWidth
                lowContrast
                hideCloseButton
                kind="success"
                title="You are logged in!"
                caption="Welcome, {name}!"
            />
        {/if}

        {#if !success}
            <ToastNotification
                fullWidth
                lowContrast
                hideCloseButton
                kind="info"
                title="Login Method"
                caption="You will be asked to proceed with a platform embedded login."
            />
        {/if}

        {#if success}
            <div class="button">
                <ButtonSet>
                    <Button href="/" kind="tertiary" icon={Workspace}>Goto Dashboard</Button>
                </ButtonSet>
            </div>
        {:else}
            <div class="button">
                <ButtonSet stacked>
                    <Button on:click={login} icon={Login}>Login</Button>
                    <Button kind="ghost" href="/invite" icon={Gift}
                        >Invitation Code</Button
                    >
                </ButtonSet>
            </div>
        {/if}
    {/if}
</section>

<style>
    h1 {
        margin-bottom: 1em;
    }

    .button {
        margin-top: 4em;
    }
</style>
