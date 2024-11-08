<script>
export default {
    name: "MdScriptActSendSMS",
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
                title: "Gửi SMS",
                node_type: "SEND_SMS",
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
                title: "Gửi SMS",
                node_type: "SEND_SMS",
                extra_info: {
                    msg: "",
                    channel_id: 1
                }
            };

            console.log('handleModalHidden');
            this.$bvModal.hide("MdScriptActSendSMS");
        },
        handleModalOk() {
            console.log('handleModalOk', this.formData);
            this.$emit('handleModalCallback', this.formData);
            this.$bvModal.hide("MdScriptActSendSMS");
        },
        handleModalDemo() {
            console.log('handleModalDemo');
            this.$bvModal.hide("MdScriptActSendSMS");
        }
    }
}
</script>

<style scoped>

</style>
<template>
    <b-modal
        id="MdScriptActSendSMS"
        title="Gửi SMS"
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
                <label class="col-form-label">Chọn kênh</label>
                <select class="form-select" v-model="formData.extra_info.channel_id">
                    <option :value="1">1</option>
                    <option :value="2">2</option>
                    <option :value="3">3</option>
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
                Xem trước gửi tin
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
