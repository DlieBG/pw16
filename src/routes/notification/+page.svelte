<script lang="ts">
    import { Button, ButtonSet, TextInput } from "carbon-components-svelte";
    import { Send } from "carbon-icons-svelte";
</script>

<section>
    <h1>Notification Tests</h1>

    <form method="POST" action="?/send">
        <TextInput
            labelText="Title"
            placeholder="Enter Title..."
            name="title"
        />

        <br><br>

        <TextInput
            labelText="Message"
            placeholder="Enter Message..."
            name="message"
        />

        <div class="button">
            <ButtonSet>
                <Button type="submit" icon={Send}>Send Notification</Button>
            </ButtonSet>
        </div>
    </form>
</section>

<style>
    h1 {
        margin-bottom: 1em;
    }

    .button {
        margin-top: 4em;
    }
</style>
