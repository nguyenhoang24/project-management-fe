<script>
export default {
    name: "MdScriptTestConvertTime",
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
            dateFromTemp: this.$moment().format('YYYY-MM-DD'),
            dateToTemp: this.$moment().format('YYYY-MM-DD'),
            timeFromTemp: this.$moment().format('HH:mm:ss'),
            timeToTemp: this.$moment().format('HH:mm:ss'),
            formData: {
                id: 0,
                title: "Chuyển đổi bằng bộ đếm thời gian",
                node_type: "TIME_SWITCH",
                extra_info: {
                    time_type: 0,
                    time_from: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
                    time_to: this.$moment().format('YYYY-MM-DD HH:mm:ss')
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
            this.dateFromTemp = this.$moment().format('YYYY-MM-DD');
            this.dateToTemp = this.$moment().format('YYYY-MM-DD');
            this.timeFromTemp = this.$moment().format('HH:mm:ss');
            this.timeToTemp = this.$moment().format('HH:mm:ss');

            this.formData = {
                id: 0,
                title: "Chuyển đổi bằng bộ đếm thời gian",
                node_type: "TIME_SWITCH",
                extra_info: {
                    time_type: 0,
                    time_from: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
                    time_to: this.$moment().format('YYYY-MM-DD HH:mm:ss')
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
        id="MdScriptTestConvertTime"
        title="Chuyển đổi bằng bộ đếm thời gian"
        size="lg"
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
                <label class="col-form-label">Thời gian</label>
                <select class="form-select" v-model="formData.extra_info.time_type">
                    <option :value="0">Trong khoảng</option>
                    <option :value="1">Trước ngày</option>
                    <option :value="2">Sau ngày</option>
                </select>
            </div>
            <div class="col-8" v-if="formData.extra_info.time_type > 0">
                <label class="col-form-label">Chọn thời gian</label>
                <div class="row">
                    <div class="col-7 pe-1">
                        <b-form-datepicker
                            calendar-width="400px"
                            v-model="dateFromTemp"
                            :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                            class="form-select">
                        </b-form-datepicker>
                    </div>
                    <div class="col-5 ps-0">
                        <b-form-timepicker :hour12="false" v-model="timeFromTemp" class="form-select"></b-form-timepicker>
                    </div>
                </div>
            </div>
            <div class="col-4" v-if="formData.extra_info.time_type === 0">
                <label class="col-form-label">Từ</label>
                <div class="row">
                    <div class="col-7 pe-1">
                        <b-form-datepicker
                            calendar-width="400px"
                            v-model="dateFromTemp"
                            :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                            class="form-select">
                        </b-form-datepicker>
                    </div>
                    <div class="col-5 ps-0">
                        <b-form-timepicker :hour12="false" v-model="timeFromTemp" class="form-select"></b-form-timepicker>
                    </div>
                </div>
            </div>
            <div class="col-4" v-if="formData.extra_info.time_type === 0">
                <label class="col-form-label">Đến</label>
                <div class="row">
                    <div class="col-7 pe-1">
                        <b-form-datepicker
                            calendar-width="400px"
                            v-model="dateToTemp"
                            :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                            class="form-select">
                        </b-form-datepicker>
                    </div>
                    <div class="col-5 ps-0">
                        <b-form-timepicker :hour12="false" v-model="timeToTemp" class="form-select"></b-form-timepicker>
                    </div>
                </div>
            </div>
        </div>
    </b-modal>
</template>
