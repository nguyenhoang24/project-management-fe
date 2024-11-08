<template>
    <div v-if="loading" class="loading-page">
        <div class="loading">
        </div>
    </div>
</template>
<script>
export default {
    data: () => ({
        loading: false
    }),
    methods: {
        start() {
            this.loading = true;
        },
        finish() {
            this.loading = false;
        }
    }
};
</script>
<style scoped>
.loading-page {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.5);
    text-align: center;
    font-size: 3rem;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.loading {
    display: inline-block;
    width: 3.5rem;
    height: 3.5rem;
    border: 4px solid rgba(9, 133, 81, 0.705);
    border-radius: 50%;
    border-top-color: #158876;
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    to {
        -webkit-transform: rotate(360deg);
    }
}
</style>
