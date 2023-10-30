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

<Header company="Schwering" platformName="pw16" href="/">
    {#if data.user}
        <HeaderUtilities>
            <HeaderAction>
                <HeaderPanelLinks>
                    <HeaderPanelDivider>Apps</HeaderPanelDivider>
                    <HeaderPanelLink>Home Lights</HeaderPanelLink>

                    <HeaderPanelDivider>User</HeaderPanelDivider>
                    <HeaderPanelLink href="/login">User Info</HeaderPanelLink>
                    <HeaderPanelLink href="/notification">Notification Tests</HeaderPanelLink>
                </HeaderPanelLinks>
            </HeaderAction>
        </HeaderUtilities>
    {/if}
</Header>

<Content>
    <Grid>
        <Row>
            <Column>
                <slot />
            </Column>
        </Row>
    </Grid>
</Content>
