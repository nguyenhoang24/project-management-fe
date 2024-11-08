<template>
    <div class="row">
        <div class="col-12">
            <h6 class="mb-0">
            <span class="badge bg-success d-block p-3">
                <i class="uil uil-save me-2"></i>
                Bắt đầu từ Segment liên hệ
            </span>
            </h6>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ID: "",
            identifierSyntax: "",
            sampleText: "",
        };
    },
    mounted() {
        this.$nextTick(() => {
            const id = this.$el.parentElement.parentElement.id;
            const data = this.$df.getNodeFromId(id.slice(5));
            console.log("NODE data : ", data);

            this.ID = data.data.ID;
            console.log("NODE ID : " + this.ID);
        });
    },
    methods: {
        instanceIdentifiersSyntaxChange(event, syntaxValue) {
            this.sampleText = syntaxValue;
            this.$df.updateConnectionNodes("node-" + this.ID);
        },
    },
};
</script>

<style>
</style>
