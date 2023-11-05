<script lang="ts">
    import type { PageData } from "./$types";
    import {
        Button,
        ButtonSet,
        InlineNotification,
        NotificationActionButton,
        ToastNotification,
    } from "carbon-components-svelte";
    import { Login, Logout, Gift, Workspace, Chat } from "carbon-icons-svelte";
    import { startAuthentication } from "@simplewebauthn/browser";

    export let data: PageData;

    let error: string | null = null;
    let success: boolean = false;
    let name: string = "you wonderful person";
    let notification_success: boolean = false;

    const login = () => {
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

                        register();
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

    const register = async () => {
        await window.Notification.requestPermission((status) => {
            navigator.serviceWorker
                .getRegistration()
                .then((registration) => {
                    return registration.pushManager
                        .getSubscription()
                        .then(async (subscription) => {
                            if (subscription) return subscription;

                            return registration.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: data.public_key,
                            });
                        });
                })
                .then((subscription) => {
                    fetch("", {
                        method: "PUT",
                        body: JSON.stringify(subscription),
                    })
                        .then(() => {
                            notification_success = true;
                        })
                        .catch(() => {
                            notification_success = false;
                        });
                });
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
        >
            <div slot="caption">
                {data.user.name}<br>
                {data.user.description}
            </div>
        </ToastNotification>

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

            <InlineNotification
                lowContrast
                hideCloseButton
                kind={notification_success ? "success" : "error"}
                title="Notifications"
                subtitle={notification_success ? "active" : "inactive"}
            >
                <svelte:fragment slot="actions">
                    <NotificationActionButton on:click={register}
                        >Retry</NotificationActionButton
                    >
                </svelte:fragment>
            </InlineNotification>
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
                    <Button href="/" kind="tertiary" icon={Workspace}
                        >Goto Dashboard</Button
                    >
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
