<script>
export default {
    name: "MdScriptActRatioAB",
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
            dateTemp: this.$moment().format('YYYY-MM-DD'),
            timeTemp: this.$moment().format('HH:mm:ss'),
            formData: {
                id: 0,
                title: "Chia các liên hệ theo các Kịch bản A, B...",
                node_type: "AB_TESTING",
                extra_info: {
                    scenarios: [],
                    evaluation: 0,
                    default_scenario: 1,
                    scenario_time_to: this.$moment().format('YYYY-MM-DD HH:mm:ss')
                }
            },
            arrayDataScript: [
                {
                    id: 1,
                    subscriber_quantity: 33,
                    title: 'Kịch bản 1',
                    unit: 1
                }
            ]
        }
    },
    methods: {
        handleModalShow() {
            this.$nextTick(() => {
                if (this.dataNodeModal) {
                    this.formData = this.dataNodeModal;

                    this.arrayDataScript = this.formData.extra_info.scenarios;
                    this.dateTemp = this.$moment(this.formData.extra_info.scenario_time_to).format('YYYY-MM-DD');
                    this.timeTemp = this.$moment(this.formData.extra_info.scenario_time_to).format('HH:mm:ss');
                }
                this.formData.id = this.nodeId;

                console.log('handleModalShow', this.nodeId);
                console.log('handleModalShow', this.dataNodeModal);
            });
        },
        handleModalHidden() {
            this.dateTemp = this.$moment().format('YYYY-MM-DD');
            this.timeTemp = this.$moment().format('HH:mm:ss');

            this.formData = {
                id: 0,
                title: "Chia các liên hệ theo các Kịch bản A, B...",
                node_type: "AB_TESTING",
                extra_info: {
                    scenarios: [],
                    evaluation: 0,
                    default_scenario: 1,
                    scenario_time_to: this.$moment().format('YYYY-MM-DD HH:mm:ss')
                }
            };

            this.arrayDataScript = [
                {
                    id: 1,
                    subscriber_quantity: 33,
                    title: 'Kịch bản 1',
                    unit: 1
                }
            ];

            console.log('handleModalHidden');
        },
        handleAddScript() {
            let countS = this.arrayDataScript.length;
            if (countS > 4) {
                return;
            }

            countS++;

            let objNew = {
                id: countS,
                subscriber_quantity: 33,
                title: 'Kịch bản ' + countS,
                unit: 1
            };

            this.arrayDataScript.push(objNew);
        },
        handleModalOk(event) {
            // event.preventDefault();
            this.formData.extra_info.scenario_time_to = this.dateTemp + " " + this.timeTemp;
            this.formData.extra_info.scenarios = this.arrayDataScript;

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
        id="MdScriptActRatioAB"
        title="Chia các liên hệ theo tỉ lệ theo các Kịch bản A, B..."
        size="lg"
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
        <template v-for="(obj, index) in arrayDataScript">
            <div :key="index" class="row">
                <div class="col-2 text-center">
                    <label class="col-form-label">Kịch bản</label>
                    <div class="text-center">
                        <span class="border-red text-black form-control">{{ obj.id }}</span>
                    </div>
                </div>
                <div class="col-7">
                    <label class="col-form-label">Sản lượng thử nghiệm</label>
                    <input type="text" class="form-control" v-model="obj.subscriber_quantity"/>
                </div>
                <div class="col-3">
                    <label class="col-form-label">Đơn vị</label>
                    <select class="form-select" v-model="obj.unit">
                        <option :value="1">%</option>
                        <option :value="2">cái</option>
                    </select>
                </div>
            </div>
        </template>
        <div class="row">
            <div class="col-12 pt-3">
                <button
                    type="button"
                    class="btn btn-sm btn-outline-primary"
                    @click="handleAddScript"
                >
                    <i class="uil uil-plus me-2"></i> Thêm kịch bản
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <label class="col-form-label">Tiêu chí đánh giá</label>
                <select class="form-select" v-model="formData.extra_info.evaluation">
                    <option :value="0">Tỷ lệ TB phản hồi</option>
                    <option :value="1">Tỷ lệ gửi tin thành công</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <label class="col-form-label">Kịch bản chạy mặc định nếu không có kịch bản tốt nhất</label>
                <select class="form-select" v-model="formData.extra_info.default_scenario">
                    <option v-for="(obj, index) in arrayDataScript" :key="index" :value="obj.id">{{ obj.title }}</option>
                </select>
            </div>
            <div class="col-6">
                <label class="col-form-label">Chọn thời gian</label>
                <div class="row">
                    <div class="col-7 pe-0">
                        <b-form-datepicker
                            calendar-width="400px"
                            v-model="dateTemp"
                            :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                            class="form-select">
                        </b-form-datepicker>
                    </div>
                    <div class="col-5 ps-0">
                        <b-form-timepicker :hour12="false" v-model="timeTemp" class="form-select"></b-form-timepicker>
                    </div>
                </div>
            </div>
        </div>
    </b-modal>
</template>
