<script lang="ts">
    import { Accordion, AccordionItem } from "carbon-components-svelte";

    export let data;
</script>

<section>
    <h1>User {data.admin_user.name}</h1>

    <Accordion>
        <AccordionItem title="General">
            <p>
                Natural Language Classifier uses advanced natural language
                processing and machine learning techniques to create custom
                classification models. Users train their data and the service
                predicts the appropriate category for the inputted text.
            </p>
        </AccordionItem>
        <AccordionItem title="Active">
            <p>
                Analyze text to extract meta-data from content such as concepts,
                entities, emotion, relations, sentiment and more.
            </p>
        </AccordionItem>
        <AccordionItem title="Credentials">
            <p>
                Translate text, documents, and websites from one language to
                another. Create industry or region-specific translations via the
                service's customization capability.
            </p>
        </AccordionItem>
        <AccordionItem title="Invitation">
            <p>
                Translate text, documents, and websites from one language to
                another. Create industry or region-specific translations via the
                service's customization capability.
            </p>
        </AccordionItem>
        <AccordionItem title="Subscription">
            <p>
                Translate text, documents, and websites from one language to
                another. Create industry or region-specific translations via the
                service's customization capability.
            </p>
        </AccordionItem>
    </Accordion>
</section>

<style>
    h1 {
        margin-bottom: 1em;
    }
</style>
