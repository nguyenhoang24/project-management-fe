<script>
export default {
    name: "MdScriptActAVB",
    props: {
        nodeId: {
            type: Number,
            default: 0
        },
        dataNodeModal: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            formData: {
                id: 0,
                title: "AVB",
                node_type: "SEND_AVB",
                extra_info: {
                    channel_id: 1,
                    scenario: "",
                    voice: "male"
                }
            }
        }
    },
    methods: {
        handleModalShow() {
            this.$nextTick(() => {
                if (this.dataNodeModal) {
                    this.formData = this.dataNodeModal;
                }
                this.formData.id = this.nodeId;

                console.log('handleModalShow', this.nodeId);
                console.log('handleModalShow', this.dataNodeModal);
            });
        },
        handleModalHidden() {
            this.formData = {
                id: 0,
                title: "AVB",
                node_type: "SEND_AVB",
                extra_info: {
                    channel_id: 1,
                    scenario: "",
                    voice: "male"
                }
            };

            console.log('handleModalHidden');
            this.$bvModal.hide("MdScriptActAVB");
        },
        handleModalOk() {
            console.log('handleModalOk', this.formData);
            this.$emit('handleModalCallback', this.formData);
            this.$bvModal.hide("MdScriptActAVB");
        },
        handleModalDemo() {
            console.log('handleModalDemo');
            this.$bvModal.hide("MdScriptActAVB");
        }
    }
}
</script>

<style scoped>

</style>
<template>
    <b-modal
        id="MdScriptActAVB"
        title="AVB"
        @show="handleModalShow"
        @hidden="handleModalHidden"
    >
        <div class="row">
            <div class="col-12">
                <label class="col-form-label pt-0">Đặt tên cho bước thực hiện</label>
                <input type="text" class="form-control" v-model="formData.title"/>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <label class="col-form-label">Đầu số truyền thông</label>
                <select class="form-select" v-model="formData.extra_info.channel_id">
                    <option :value="1">01</option>
                    <option :value="2">02</option>
                    <option :value="3">03</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <label class="col-form-label">Kịch bản chi tiết AVB</label>
                <button type="button" class="btn btn-link float-end pe-0">
                    <i class="uil uil-download-alt me-2"></i> Tải file (.txt)
                </button>
                <input type="text" class="form-control" v-model="formData.extra_info.scenario"/>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <label class="col-form-label">Giọng đọc khi gọi đến</label>
                <select class="form-select" v-model="formData.extra_info.voice">
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                </select>
            </div>
        </div>
        <template #modal-footer="{}">
            <b-button variant="outline-secondary me-auto" @click="handleModalDemo">
                Nghe demo
            </b-button>
            <b-button variant="outline-secondary" @click="handleModalHidden">
                Bỏ qua
            </b-button>
            <b-button variant="primary" @click="handleModalOk">
                Lưu
            </b-button>
        </template>
    </b-modal>
</template>
