<script>
/**
 * Starter page
 */
export default {
    head() {
        return {
            title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`
        };
    },
    data() {
        return {
            title: "Starter Page",
            items: [{
                    text: "Utility",
                    href: "/"
                },
                {
                    text: "Starter Page",
                    active: true
                }
            ]
        };
    },
    middleware: "authentication"
};
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />
</div>
</template>
