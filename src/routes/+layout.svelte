<script lang="ts">
    import type { PageData } from "./$types";
    import "carbon-components-svelte/css/g100.css";
    import {
        Header,
        HeaderUtilities,
        HeaderAction,
        HeaderPanelLinks,
        HeaderPanelDivider,
        HeaderPanelLink,
        Content,
        Grid,
        Row,
        Column,
    } from "carbon-components-svelte";

    export let data: PageData;
</script>

<section>
    <Header company="Schwering" platformName="pw16" href="/">
        {#if data.user}
            <HeaderUtilities>
                <HeaderAction>
                    <HeaderPanelLinks>
                        <HeaderPanelDivider>Apps</HeaderPanelDivider>
                        <HeaderPanelLink>Home Lights</HeaderPanelLink>

                        <HeaderPanelDivider>Utils</HeaderPanelDivider>
                        <HeaderPanelLink href="/login">User</HeaderPanelLink>
                        {#if data.user.admin}
                            <HeaderPanelLink href="/admin"
                                >Admin</HeaderPanelLink
                            >
                        {/if}
                        <HeaderPanelLink href="/notification"
                            >Notification Tests</HeaderPanelLink
                        >
                    </HeaderPanelLinks>
                </HeaderAction>
            </HeaderUtilities>
        {/if}
    </Header>

    <Content>
        <div class="wrapper">
            <div class="container">
                <slot />
            </div>
        </div>
    </Content>
</section>

<style>
    .wrapper {
        display: flex;
        justify-content: center;
    }

    .container {
        width: 100%;
        max-width: 1250px;
    }
</style>
