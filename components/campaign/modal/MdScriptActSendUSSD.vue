<script>
export default {
    name: "MdScriptActSendUSSD",
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
                title: "Gửi USSD",
                node_type: "SEND_USSD",
                extra_info: {
                    msg: "",
                    channel_id: 1
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
                title: "Gửi USSD",
                node_type: "SEND_USSD",
                extra_info: {
                    msg: "",
                    channel_id: 1
                }
            };

            console.log('handleModalHidden');
            this.$bvModal.hide("MdScriptActSendUSSD");
        },
        handleModalOk() {
            console.log('handleModalOk', this.formData);
            this.$emit('handleModalCallback', this.formData);
            this.$bvModal.hide("MdScriptActSendUSSD");
        },
        handleModalDemo() {
            console.log('handleModalDemo');
            this.$bvModal.hide("MdScriptActSendUSSD");
        }
    }
}
</script>

<style scoped>

</style>
<template>
    <b-modal
        id="MdScriptActSendUSSD"
        title="Gửi USSD"
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
                <label class="col-form-label">Nội dung tin nhắn</label>
                <input type="text" class="form-control" v-model="formData.extra_info.msg"/>
            </div>
        </div>
        <template #modal-footer="{}">
            <b-button variant="outline-secondary me-auto" @click="handleModalDemo">
                Xem demo tin nhắn
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
