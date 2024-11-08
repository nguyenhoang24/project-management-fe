<script>
export default {
    name: "MdScriptTestWaitByTime",
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
                title: "Chờ theo một khoảng thời gian",
                node_type: "WAIT",
                extra_info: {
                    time_day: 0,
                    time_hour: 0,
                    time_minute: 0
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
                title: "Chờ theo một khoảng thời gian",
                node_type: "WAIT",
                extra_info: {
                    time_day: 0,
                    time_hour: 0,
                    time_minute: 0
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
        id="MdScriptTestWaitByTime"
        title="Chờ theo khoảng thời gian"
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
                <label class="col-form-label">Ngày</label>
                <input type="text" class="form-control" v-model="formData.extra_info.time_day"/>
            </div>
            <div class="col-4">
                <label class="col-form-label">Giờ</label>
                <input type="text" class="form-control" v-model="formData.extra_info.time_hour"/>
            </div>
            <div class="col-4">
                <label class="col-form-label">Phút</label>
                <input type="text" class="form-control" v-model="formData.extra_info.time_minute"/>
            </div>
        </div>
    </b-modal>
</template>
