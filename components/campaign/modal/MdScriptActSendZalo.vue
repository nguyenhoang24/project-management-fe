<script>
export default {
    name: "MdScriptActSendZalo",
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
                title: "Gửi Zalo",
                node_type: "SEND_ZALO",
                extra_info: {
                    msg: "",
                    oa_id: "2798790902503571657"
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
                title: "Gửi Zalo",
                node_type: "SEND_ZALO",
                extra_info: {
                    msg: "",
                    oa_id: "2798790902503571657"
                }
            };

            console.log('handleModalHidden');
            this.$bvModal.hide("MdScriptActSendZalo");
        },
        handleModalOk() {
            console.log('handleModalOk', this.formData);
            this.$emit('handleModalCallback', this.formData);
            this.$bvModal.hide("MdScriptActSendZalo");
        },
        handleModalDemo() {
            console.log('handleModalDemo');
            this.$bvModal.hide("MdScriptActSendZalo");
        }
    }
}
</script>

<style scoped>

</style>
<template>
    <b-modal
        id="MdScriptActSendZalo"
        title="Gửi tin nhắn zalo"
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
                <label class="col-form-label">Tài khoản OA gửi tin</label>
                <select class="form-select" v-model="formData.extra_info.oa_id">
                    <option value="2798790902503571657">Công ty cổ phần ElcomPlus</option>
                    <option :value="2">Tài khoản 02</option>
                    <option :value="3">Tài khoản 03</option>
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
