<script>
export default {
    name: "MdScriptTestConvertDefault",
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
                title: "Chuyển đổi bằng bộ đếm",
                node_type: "COUNT_SWITCH",
                extra_info: {
                    subscriber_quantity: 0,
                    unit: "percent",
                    level: 1
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
                title: "Chuyển đổi bằng bộ đếm",
                node_type: "COUNT_SWITCH",
                extra_info: {
                    subscriber_quantity: 0,
                    unit: "percent",
                    level: 1
                }
            };

            console.log('handleModalHidden');
        },
        handleModalOk(event) {
            // event.preventDefault();
            console.log('handleModalOk', this.formData);
            this.$emit('handleModalCallback', this.formData);
        }
    }
}
</script>

<style scoped>

</style>
<template>
    <b-modal
        id="MdScriptTestConvertDefault"
        title="Chuyển đổi bằng bộ đếm"
        okTitle="Lưu"
        cancelTitle="Bỏ qua"
        cancelVariant="outline-secondary"
        @show="handleModalShow"
        @hidden="handleModalHidden"
        @ok="handleModalOk"
    >
        <div class="row">
            <div class="col-12">
                <label class="col-form-label pt-0">Đặt tên cho bước thực hiện</label>
                <input type="text" class="form-control" v-model="formData.title"/>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <label class="col-form-label">Số lượng TB</label>
                <input type="text" class="form-control" v-model="formData.extra_info.subscriber_quantity"/>
            </div>
            <div class="col-4">
                <label class="col-form-label">Đơn vị</label>
                <select class="form-select" v-model="formData.extra_info.unit">
                    <option value="quantity">Số lượng</option>
                    <option value="percent">%</option>
                </select>
            </div>
            <div class="col-4">
                <label class="col-form-label">Mức độ ưu tiên</label>
                <select class="form-select" v-model="formData.extra_info.level">
                    <option :value="1">1</option>
                    <option :value="2">2</option>
                    <option :value="3">3</option>
                </select>
            </div>
        </div>
    </b-modal>
</template>
