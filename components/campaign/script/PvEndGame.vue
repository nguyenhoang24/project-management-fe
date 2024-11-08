<script>
export default {
    components: {},
    data() {
        return {
            textView: ""
        };
    },
    mounted() {
        this.$nextTick(() => {
            const id = this.$el.parentElement.parentElement.id;
            const data = this.$df.getNodeFromId(id.slice(5));
            console.log("NODE data : ", data);

            this.textView = data.data.textView;
        });
    }
};
</script>

<style scoped>
</style>

<template>
    <div>
        <div class="row">
            <div class="col-12">
                <div class="card mb-0">
                    <div class="row g-0">
                        <div class="col-2 bg-danger rounded"></div>
                        <div class="col-10">
                            <div class="card-body p-0">
                                <h6 class="mb-0">
                                    <span class="text-black bg-light d-block p-3">
                                        {{ textView }}
                                    </span>
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
