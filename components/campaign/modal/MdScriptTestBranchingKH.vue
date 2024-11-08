<script>
export default {
    name: "MdScriptTestBranchingKH",
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
            listCmbInteract: [
                {
                    value: 'USER_REGISTER',
                    text: 'Đăng ký'
                },
                {
                    value: 'USER_REJECTED',
                    text: 'Từ chối'
                }
            ],
            dateFromTemp: this.$moment().format('YYYY-MM-DD'),
            dateToTemp: this.$moment().format('YYYY-MM-DD'),
            timeFromTemp: this.$moment().format('HH:mm:ss'),
            timeToTemp: this.$moment().format('HH:mm:ss'),
            formData: {
                id: 0,
                title: "Rẽ nhánh bằng phản hồi/ tương tác KH",
                node_type: "ACTIVITY_BRANCH",
                extra_info: {
                    channel_name: "SMS",
                    channel_cond: "USER_REGISTER",
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

                    this.dateFromTemp = this.$moment(this.formData.extra_info.time_from).format('YYYY-MM-DD');
                    this.dateToTemp = this.$moment(this.formData.extra_info.time_to).format('YYYY-MM-DD');
                    this.timeFromTemp = this.$moment(this.formData.extra_info.time_from).format('HH:mm:ss');
                    this.timeToTemp = this.$moment(this.formData.extra_info.time_to).format('HH:mm:ss');

                    this.handleChangeChannel(null);
                }
                this.formData.id = this.nodeId;

                console.log('handleModalShow', this.nodeId);
                console.log('handleModalShow this.formData', this.formData);
            });
        },
        handleModalHidden() {
            this.listCmbInteract = [
                {
                    value: 'USER_REGISTER',
                    text: 'Đăng ký'
                },
                {
                    value: 'USER_REJECTED',
                    text: 'Từ chối'
                }
            ];

            this.dateFromTemp = this.$moment().format('YYYY-MM-DD');
            this.dateToTemp = this.$moment().format('YYYY-MM-DD');
            this.timeFromTemp = this.$moment().format('HH:mm:ss');
            this.timeToTemp = this.$moment().format('HH:mm:ss');

            this.formData = {
                id: 0,
                title: "Rẽ nhánh bằng phản hồi/ tương tác KH",
                node_type: "ACTIVITY_BRANCH",
                extra_info: {
                    channel_name: "SMS",
                    channel_cond: "USER_REGISTER",
                    time_type: 0,
                    time_from: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
                    time_to: this.$moment().format('YYYY-MM-DD HH:mm:ss')
                }
            };

            console.log('handleModalHidden');
        },
        handleModalOk(event) {
            // event.preventDefault();
            this.formData.extra_info.time_from = this.dateFromTemp + " " + this.timeFromTemp;
            this.formData.extra_info.time_to = this.dateToTemp + " " + this.timeToTemp;

            if (this.formData.extra_info.time_type > 0) {
                this.formData.extra_info.time_to = this.formData.extra_info.time_from;
            }

            console.log('handleModalOk', this.formData);

            this.$emit('handleModalCallback', this.formData);
        },
        handleChangeChannel(evt) {
            if (this.formData.extra_info.channel_name === 'ZALO') {
                this.listCmbInteract = [
                    {
                        value: 'USER_REGISTER',
                        text: 'Đăng ký'
                    },
                    {
                        value: 'USER_REJECTED',
                        text: 'Từ chối'
                    },
                    {
                        value: 'USER_REPLY_TEXT',
                        text: 'Đã trả lời'
                    },
                    {
                        value: 'USER_SEEN',
                        text: 'Đã xem'
                    },
                    {
                        value: 'USER_RECEIVED_MESSAGE',
                        text: 'Người dùng nhận thông báo'
                    }
                ];

                if (evt) {
                    this.formData.extra_info.channel_cond = 'USER_SEEN';
                }
            } else {
                this.listCmbInteract = [
                    {
                        value: 'USER_REGISTER',
                        text: 'Đăng ký'
                    },
                    {
                        value: 'USER_REJECTED',
                        text: 'Từ chối'
                    }
                ];

                if (evt) {
                    this.formData.extra_info.channel_cond = 'USER_REGISTER';
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
<template>
    <b-modal
        id="MdScriptTestBranchingKH"
        title="Rẽ nhánh bằng phản hồi/tương tác KH"
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
            <div class="col-12">
                <label class="col-form-label">Chọn kênh truyền thông</label>
                <select class="form-select" v-model="formData.extra_info.channel_name" @change="handleChangeChannel">
                    <option value="SMS">SMS</option>
                    <option value="AVB">AVB</option>
                    <option value="USSD">USSD</option>
                    <option value="ZALO">ZALO</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <label class="col-form-label">Chọn loại phản hồi/tương tác</label>
                <select class="form-select" v-model="formData.extra_info.channel_cond">
                    <option v-for="(obj, index) in listCmbInteract" :key="index" :value="obj.value">{{ obj.text }}</option>
                </select>
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
                    <div class="col-7 pe-0">
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
