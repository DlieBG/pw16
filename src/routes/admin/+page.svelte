<script lang="ts">
    import type { PageData } from "./$types";
    import {
        StructuredList,
        StructuredListHead,
        StructuredListRow,
        StructuredListCell,
        StructuredListBody,
        Tag,
    } from "carbon-components-svelte";

    export let data: PageData;

    const select = async (user) => {
        window.location.href = `admin/${user._id}`;
    };
</script>

<section>
    <h1>Admin</h1>

    <StructuredList selection>
        <StructuredListHead>
            <StructuredListRow head>
                <StructuredListCell head>Name</StructuredListCell>
                <StructuredListCell head>Description</StructuredListCell>
                <StructuredListCell head>Status</StructuredListCell>
            </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
            {#each data.users as user}
                <StructuredListRow on:click={() => select(user)}>
                    <StructuredListCell noWrap>
                        {user.name}
                    </StructuredListCell>
                    <StructuredListCell>
                        {user.description}
                    </StructuredListCell>
                    <StructuredListCell>
                        {#if user.active}
                            <Tag type="green">Active</Tag>
                        {:else}
                            <Tag type="purple">Deactive</Tag>
                        {/if}
                        {#if user.credentials}
                            <Tag type="teal">Credentials</Tag>
                        {/if}
                        {#if !!user.invitation.code}
                            <Tag type="blue">Invitation</Tag>
                        {/if}
                        <Tag type="gray"
                            >{user.subscriptions.length} Subscriptions</Tag
                        >
                        {#if user.admin}
                            <Tag type="red">Admin</Tag>
                        {/if}
                    </StructuredListCell>
                </StructuredListRow>
            {/each}
        </StructuredListBody>
    </StructuredList>
</section>

<style>
    h1 {
        margin-bottom: 1em;
    }
</style>
