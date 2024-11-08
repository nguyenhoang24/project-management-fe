<script>
import {mapActions} from 'vuex';
import Multiselect from 'vue-multiselect';
import "vue-multiselect/dist/vue-multiselect.min.css";
import Swal from "sweetalert2";

export default {
    components: {
        Multiselect
    },
    data() {
        return {
            objInsertDataFinal: {
                general: {},
                campaignTime: {
                    type: 'type2',
                    starrtime: '',
                    endtime: ''
                },
                adsTime: {
                    startTime: '',
                    endTime: '',
                    arr1: [],
                    arr2: []
                },
            },
            objInsertData: {
                id: -1,
                name: '',
                type: 'Batch',
                tag: '',
                segment: 1,
                dataSource: -1,
                runType: 1,
                startTime: '',
                endTime: '',
                exceptStartTime: '',
                exceptEndTime: '',
                managementUnit: -1,
                quantity: -1,
                systemBlacklist: '',
                campaignBlacklist: ''
            },
            generalForm: {
                name: "",
                type: "EVENT_START",
                tag: "",
                segmentId: 0,
                eventID: 0,
                runType: "ONLY_ONE",
                managementUnit: 1,
                quantity: 3,
                newsType: 1,
                systemBlacklist: "",
                campaignBlacklist: ""
            },
            adsTimeForm: [],
            campaignTimeForm: [],
            adsTimeFormOnly: {
                startDay: this.$moment().format('YYYY-MM-DD'),
                endDay: this.$moment().format('YYYY-MM-DD'),
                startTime: "01:01:01",
                endTime: "10:10:10",
                weekDays: "Mon,Tue,Wed,Thu,Fri,Sat,Sun",
                monthDays: "1,3,5,7,9"
            },
            showCampaignRunOne: 0,
            segmentsOptions: [],
            eventsOptions: [],
            repeatType: 0,
            checkDayInWeek: true,
            listDayOfMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            listTimeDistances: [],
            runManyDayStartDate: '',
            runManyDayEndDate: '',
            runManyDayStartTime: '',
            runManyDayEndTime: '',
            listTimeDistancesNoAdv: [],
            noAdvStartDate: '',
            noAdvEndDate: '',
            noAdvStartTime: '',
            noAdvEndTime: '',
            noAdvRepeat: '',
            noAdvDayRepeat: [],
            campaignType: -1,
            title: "Form File Upload",
            items: [{
                text: "Forms",
                href: "/"
            },
                {
                    text: "Form File Upload",
                    active: true
                }
            ],
            dropzoneOptions: {
                url: "https://httpbin.org/post",
                thumbnailWidth: 150,
                maxFilesize: 0.5,
                headers: {
                    "My-Awesome-Header": "header value"
                }
            },
            blacklistSysValue: [],
            blacklistSysOptions: [
                {name: 'blacklist 1', language: 'JavaScript'},
                {name: 'blacklist 2', language: 'JavaScript'},
                {name: 'blacklist 3', language: 'Ruby'},
                {name: 'blacklist 4', language: 'Ruby'},
                {name: 'blacklist 5', language: 'PHP'},
                {name: 'blacklist 6', language: 'Elixir'}
            ],
            blacklistCampValue: [],
            blacklistCampOptions: [
                {name: 'segment 1', language: 'JavaScript'},
                {name: 'segment 2', language: 'JavaScript'},
                {name: 'segment 3', language: 'Ruby'},
                {name: 'segment 4', language: 'Ruby'},
                {name: 'segment 5', language: 'PHP'},
                {name: 'segment 6', language: 'Elixir'}
            ],
        };
    },
    computed: {},
    mounted() {
        this.handleGetListSegment();
        this.handleGetListEvent();
    },
    methods: {
        ...mapActions('campaign/manage', {
            apiAddCampaign: 'apiAddCampaign'
        }),
        ...mapActions('setting/event', {
            apiGetListEvent: 'apiGetListEvent'
        }),
        ...mapActions('contacts', {
            apiGetListSegment: 'apiGetListSegment'
        }),
        handleGetListSegment() {
            this.apiGetListSegment({id: 0})
                .then(response => {
                    if (response.err_code === 0) {
                        console.log('handleGetListSegment: ', response.data);
                        this.segmentsOptions = response.data
                    }
                })
                .catch(err => {
                    console.log(err)
                })
                .finally({})
        },
        handleGetListEvent() {
            this.apiGetListEvent({status: -1})
                .then(response => {
                    console.log('init dữ liệu', response);

                    if (response.err_code === 0) {
                        let data = response['data'];
                        this.eventsOptions = data;
                        console.log('init dữ liệu', data);
                    } else {
                        this.commonWarningVue(response.err_message);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    // this.commonLoadingPage(false);
                });
        },
        handleOkFilter(evt) {
            evt.preventDefault();
        },
        handleResetForm(evt) {
            evt.preventDefault();
        },
        addTimeDistance() {
            this.listTimeDistances.push({startDate: this.runManyDayStartDate, endDate: this.runManyDayEndDate, startTime: this.runManyDayStartTime, endTime: this.runManyDayEndTime})
        },
        removeTimeDistance(index) {
            this.listTimeDistances.splice(index, 1);
        },
        addTimeDistanceNoAdv() {
            this.listTimeDistancesNoAdv.push({startDate: this.noAdvStartDate, endDate: this.noAdvEndDate, startTime: this.noAdvStartTime, endTime: this.noAdvEndTime, dayRepeat: this.noAdvDayRepeat.toString()})
        },
        removeTimeDistanceNoAdv(index) {
            this.listTimeDistancesNoAdv.splice(index, 1);
        },
        fileAdded: function (file) {
            console.log(file);
        },
        handleActionInsertCamp() {
            if (this.campaignType === 2) {
                this.objInsertData.type = 'Event';
            }

            // this.generalForm.systemBlacklist = this.blacklistSysValue;
            // this.generalForm.campaignBlacklist = this.blacklistCampValue;

            if (this.generalForm.runType === 'ONLY_ONE') {
                this.adsTimeForm.push(this.adsTimeFormOnly);
            }

            for (let k = 0; k < this.listTimeDistances.length; k++) {
                let objData = this.listTimeDistances[k];
                let objFill = {
                    startDay: objData.startDate,
                    endDay: objData.endDate,
                    startTime: objData.startTime,
                    endTime: objData.endTime,
                    weekDays: "Mon,Tue,Wed,Thu,Fri,Sat,Sun",
                    monthDays: "1,3,5,7,9"
                };

                // this.adsTimeForm.push(objFill);
            }

            for (let k = 0; k < this.listTimeDistancesNoAdv.length; k++) {
                let objData = this.listTimeDistancesNoAdv[k];
                let objFill = {
                    startDay: objData.startDate,
                    endDay: objData.endDate,
                    startTime: objData.startTime,
                    endTime: objData.endTime,
                    weekDays: "Mon,Tue,Wed,Thu,Fri,Sat,Sun"
                };

                // this.campaignTimeForm.push(objFill);
            }

            let payloadFormData = {
                general: this.generalForm,
                adsTime: this.adsTimeForm,
                campaignTime: this.campaignTimeForm
            };

            console.log('payloadFormData: ', payloadFormData);

            this.apiAddCampaign(payloadFormData)
                .then(response => {
                    console.log('apiUploadVideoDone', response);
                    if (response.err_code === 0) {
                        let data = response.data;
                        let objCallback = {
                            campaignId: data.campaignId,
                            campaignType: this.generalForm.type
                        };
                        this.$emit("handleCampaignCallback", objCallback);

                        Swal.fire("", response.err_message, "success");
                    } else {
                        Swal.fire("", response.err_message, "warning");
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    // this.commonLoadingPage(false);
                });
        }
    },
    middleware: "authentication"
};
</script>
<style>
.multiselect__option--selected {
    background: beige;
    color: #35495e;
    font-weight: 700;
}
</style>

<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-9">
                    <div class="">
                        <div class="row mb-3">
                            <div class="col-4">
                                <label>Tên chiến dịch</label>
                                <input type="text" class="form-control form-control-sm" v-model="generalForm.name"/>
                            </div>
                            <div class="col-4">
                                <label>Loại chiến dịch</label>
                                <select v-model="generalForm.type" class="form-select form-select-sm">
                                    <option>Chọn</option>
                                    <option value="BATCH_START">Batch campaign</option>
                                    <option value="EVENT_START">Event campaign</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-4">
                                <label>Tag chiến dịch</label>
                                <input v-model="generalForm.tag" type="text" class="form-control form-control-sm"/>
                            </div>
                            <div class="col-4">
                                <label>Thông tin Segment</label>
                                <select class="form-select form-select-sm" v-model="generalForm.segmentId">
                                    <option :value="0">Chọn</option>
                                    <option v-for="(obj, index) in segmentsOptions" :key="index" :value="obj.id">{{ obj.name }}</option>
                                </select>
                            </div>
                            <div class="col-4" v-show="generalForm.type === 'EVENT_START'">
                                <label>Sự kiện</label>
                                <select class="form-select form-select-sm" v-model="generalForm.eventID">
                                    <option :value="0">Chọn</option>
                                    <option v-for="(obj, index) in eventsOptions" :key="index" :value="obj.id">{{ obj.name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <label>Thời gian chạy chiến dịch</label>
                    </div>
                    <div class="row mb-3">
                        <div class="col-3">
                            <input class="form-check-input" v-model="generalForm.runType" value="ONLY_ONE" type="radio" name="campaignTime" id="campaignOneRun">
                            <label class="form-check-label" for="campaignOneRun">
                                Chiến dịch chạy 1 lần
                            </label>
                        </div>

                    </div>
                    <div class="row mb-3" v-show="generalForm.runType === 'ONLY_ONE'">
                        <div class="col-6">
                            <label>Ngày bắt đầu</label>
                            <div class="row">
                                <div class="col-9">
                                    <input type="date" v-model="adsTimeFormOnly.startDay" class="form-control form-control-sm"/>
                                </div>
                                <div class="col-3">
                                    <label>dd/mm/yyyy</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <label>Ngày kết thúc</label>
                            <div class="row">
                                <div class="col-9">
                                    <input type="date" v-model="adsTimeFormOnly.endDay" class="form-control form-control-sm"/>
                                </div>
                                <div class="col-3">
                                    <label>dd/mm/yyyy</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3" v-show="generalForm.runType === 'ONLY_ONE'">
                        <div class="col-6">
                            <label>Thời gian bắt đầu trong ngày</label>
                            <div class="row">
                                <div class="col-9">
                                    <input type="text" v-model="adsTimeFormOnly.startTime" class="form-control form-control-sm"/>
                                </div>
                                <div class="col-3">
                                    <label>hh:mm:ss</label>
                                </div>
                            </div>

                        </div>
                        <div class="col-6">
                            <label>Thời gian kết thúc trong ngày</label>
                            <div class="row">
                                <div class="col-9">
                                    <input type="text" v-model="adsTimeFormOnly.endTime" class="form-control form-control-sm"/>
                                </div>
                                <div class="col-3">
                                    <label>hh:mm:ss</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-3">
                            <input class="form-check-input" v-model="generalForm.runType" type="radio" value="MANY" name="campaignTime" id="campaignOneRun">
                            <label class="form-check-label" for="campaignOneRun">
                                Chiến dịch chạy nhiều ngày
                            </label>
                        </div>
                    </div>
                    <div class="row mb-3" v-show="generalForm.runType === 'MANY'">
                        <div class="col-6">
                            <label>Ngày bắt đầu</label>
                            <div class="row">
                                <div class="col-9">
                                    <input type="date" v-model="runManyDayStartDate" class="form-control form-control-sm"/>
                                </div>
                                <div class="col-3">
                                    <label>dd/mm/yyyy</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <label>Ngày kết thúc</label>
                            <div class="row">
                                <div class="col-9">
                                    <input type="date" v-model="runManyDayEndDate" class="form-control form-control-sm"/>
                                </div>
                                <div class="col-3">
                                    <label>dd/mm/yyyy</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3" v-show="generalForm.runType === 'MANY'">
                        <div class="col-6">
                            <label>Thời gian bắt đầu trong ngày</label>
                            <div class="row">
                                <div class="col-9">
                                    <input type="text" v-model="runManyDayStartTime" class="form-control form-control-sm"/>
                                </div>
                                <div class="col-3">
                                    <label>hh:mm:ss</label>
                                </div>
                            </div>

                        </div>
                        <div class="col-6">
                            <label>Thời gian kết thúc trong ngày</label>
                            <div class="row">
                                <div class="col-9">
                                    <input type="text" v-model="runManyDayEndTime" class="form-control form-control-sm"/>
                                </div>
                                <div class="col-3">
                                    <label>hh:mm:ss</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3" v-show="generalForm.runType === 'MANY'">
                        <div class="col-3">
                            <button type="button" class="btn btn-success" @click="addTimeDistance"><i class="uil uil-plus me-1"></i> Thêm</button>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped mb-0">
                                <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Ngày kết thúc</th>
                                    <th>Thời gian bắt đầu</th>
                                    <th>Thời gian kết thúc</th>
                                    <th>Lặp lại</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(distance,index) in listTimeDistances" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>
                                        {{ distance.startDate }}
                                    </td>
                                    <td>
                                        {{ distance.endDate }}
                                    </td>
                                    <td>
                                        {{ distance.startTime }}
                                    </td>
                                    <td>
                                        {{ distance.endTime }}
                                    </td>
                                    <td>
                                        <button title="Xóa" @click="removeTimeDistance({index})"
                                                class="btn btn-gray btn-block view-cart"
                                        ><i class="uil uil-trash me-1"></i>
                                        </button>
                                    </td>
                                </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-3">
                            <input class="form-check-input" v-model="generalForm.runType" value="CONTINUOUS" type="radio" name="campaignTime" id="campaignOneRun">
                            <label class="form-check-label" for="campaignOneRun">
                                Chiến dịch chạy liên tục
                            </label>
                        </div>
                    </div>
                    <div class="row mb-3" v-show="generalForm.runType === 'CONTINUOUS'">
                        <div class="col-6">
                            <label>Ngày bắt đầu</label>
                            <div class="row">
                                <div class="col-9">
                                    <input type="date" value="2019-08-19" class="form-control form-control-sm"/>
                                </div>
                                <div class="col-3">
                                    <label>dd/mm/yyyy</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <label>Ngày kết thúc</label>
                            <div class="row">
                                <div class="col-9">
                                    <input type="date" value="2019-08-19" class="form-control form-control-sm"/>
                                </div>
                                <div class="col-3">
                                    <label>dd/mm/yyyy</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3" v-show="generalForm.runType === 'CONTINUOUS'">
                        <div class="col-6">
                            <label>Thời gian bắt đầu trong ngày</label>
                            <div class="row">
                                <div class="col-9">
                                    <input type="text" class="form-control form-control-sm"/>
                                </div>
                                <div class="col-3">
                                    <label>hh:mm:ss</label>
                                </div>
                            </div>

                        </div>
                        <div class="col-6">
                            <label>Thời gian kết thúc trong ngày</label>
                            <div class="row">
                                <div class="col-9">
                                    <input type="text" class="form-control form-control-sm"/>
                                </div>
                                <div class="col-3">
                                    <label>hh:mm:ss</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3" v-show="generalForm.runType === 'CONTINUOUS'">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" name="repeatMany" @click="repeatType=1" type="radio" id="inlineday" value="option1">
                            <label class="form-check-label" for="inlineday">Lặp ngày trong tuần</label>
                        </div>
                    </div>
                    <div class="row mb-3" v-show="repeatType==1">
                        <div class="col-9">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" v-model="checkDayInWeek" type="checkbox" id="inlineMonday" value="option1">
                                <label class="form-check-label" for="inlineMonday">Thứ 2</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" v-model="checkDayInWeek" type="checkbox" id="inlineTuesday" value="option2">
                                <label class="form-check-label" for="inlineTuesday">Thứ 3</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" v-model="checkDayInWeek" type="checkbox" id="inlineWednesday" value="option3">
                                <label class="form-check-label" for="inlineWednesday">Thứ 4</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" v-model="checkDayInWeek" type="checkbox" id="inlineThursday" value="option3">
                                <label class="form-check-label" for="inlineThursday">Thứ 5 </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" v-model="checkDayInWeek" type="checkbox" id="inlineFriday" value="option3">
                                <label class="form-check-label" for="inlineFriday">Thứ 6</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" v-model="checkDayInWeek" type="checkbox" id="inlineSaturday" value="option3">
                                <label class="form-check-label" for="inlineSaturday">Thứ 7</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" v-model="checkDayInWeek" type="checkbox" id="inlineSunday" value="option3">
                                <label class="form-check-label" for="inlineSunday">Chủ nhật</label>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3" v-show="generalForm.runType === 'CONTINUOUS'">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" @click="repeatType=2" name="repeatMany" type="radio" id="inlineMonth" value="option1">
                            <label class="form-check-label" for="inlineMonth">Lặp ngày trong tháng</label>
                        </div>
                    </div>
                    <div class="row mb-3" v-show="repeatType==2">
                        <div class="col-10">

                            <div class="form-check form-check-inline" v-for="(day, index) in listDayOfMonth" :key="index">
                                <input class="form-check-input" checked type="checkbox" :id="day">
                                <label class="form-check-label" for="inlineSunday">{{ day }}</label>
                            </div>

                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <label>Khung thời gian không thực hiện quảng cáo</label>
                    </div>
                    <div class="row mb-3">
                        <div class="col-6">
                            <label>Ngày bắt đầu</label>
                            <div class="row">
                                <div class="col-9">
                                    <input type="date" v-model="noAdvStartDate" class="form-control form-control-sm"/>
                                </div>
                                <div class="col-3">
                                    <label>dd/mm/yyyy</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <label>Ngày kết thúc</label>
                            <div class="row">
                                <div class="col-9">
                                    <input type="date" v-model="noAdvEndDate" class="form-control form-control-sm"/>
                                </div>
                                <div class="col-3">
                                    <label>dd/mm/yyyy</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-6">
                            <label>Thời gian bắt đầu trong ngày</label>
                            <div class="row">
                                <div class="col-9">
                                    <input type="text" v-model="noAdvStartTime" class="form-control form-control-sm"/>
                                </div>
                                <div class="col-3">
                                    <label>hh:mm:ss</label>
                                </div>
                            </div>

                        </div>
                        <div class="col-6">
                            <label>Thời gian kết thúc trong ngày</label>
                            <div class="row">
                                <div class="col-9">
                                    <input type="text" v-model="noAdvEndTime" class="form-control form-control-sm"/>
                                </div>
                                <div class="col-3">
                                    <label>hh:mm:ss</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-9">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineMonday" v-model="noAdvDayRepeat" value="2">
                                <label class="form-check-label" for="inlineMonday">Thứ 2</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineTuesday" v-model="noAdvDayRepeat" value="3">
                                <label class="form-check-label" for="inlineTuesday">Thứ 3</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineWednesday" v-model="noAdvDayRepeat" value="4">
                                <label class="form-check-label" for="inlineWednesday">Thứ 4</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineThursday" v-model="noAdvDayRepeat" value="5">
                                <label class="form-check-label" for="inlineThursday">Thứ 5 </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineFriday" v-model="noAdvDayRepeat" value="6">
                                <label class="form-check-label" for="inlineFriday">Thứ 6</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineSaturday" v-model="noAdvDayRepeat" value="7">
                                <label class="form-check-label" for="inlineSaturday">Thứ 7</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineSunday" v-model="noAdvDayRepeat" value="8">
                                <label class="form-check-label" for="inlineSunday">Chủ nhật</label>
                            </div>

                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-3">
                            <button type="button" class="btn btn-success" @click="addTimeDistanceNoAdv"><i class="uil uil-plus me-1"></i> Thêm</button>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped mb-0">
                                <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Ngày kết thúc</th>
                                    <th>Thời gian bắt đầu</th>
                                    <th>Thời gian kết thúc</th>
                                    <th>Lặp lại</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(distance,index) in listTimeDistancesNoAdv" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>
                                        {{ distance.startDate }}
                                    </td>
                                    <td>
                                        {{ distance.endDate }}
                                    </td>
                                    <td>
                                        {{ distance.startTime }}
                                    </td>
                                    <td>
                                        {{ distance.endTime }}
                                    </td>
                                    <td>
                                        {{ distance.dayRepeat }}
                                    </td>
                                    <td>
                                        <button title="Xóa" @click="removeTimeDistanceNoAdv({index})"
                                                class="btn btn-gray btn-block view-cart"
                                        ><i class="uil uil-trash me-1"></i>
                                        </button>
                                    </td>
                                </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                    <hr>
                    <div class="row mb-3">
                        <div class="col-6">
                            <label>Đơn vị quản lý chiến dịch</label>
                            <select class="form-select form-select-sm" v-model="generalForm.managementUnit">
                                <option :value="1">Chọn</option>
                                <option :value="2">P1</option>
                                <option :value="3">P2</option>
                            </select>
                        </div>
                        <div class="col-6">
                            <label>Sản lượng quảng cáo</label>
                            <input type="text" class="form-control form-control-sm" v-model="generalForm.quantity"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label>Blacklist hệ thống</label>

                            <multiselect v-model="blacklistSysValue" :options="blacklistSysOptions" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn tập Blacklist" label="name" track-by="name" :preselect-first="true">
                            </multiselect>

                        </div>
                        <div class="col-6">
                            <label>Blacklist chiến dịch</label>
                            <multiselect v-model="blacklistCampValue" :options="blacklistCampOptions" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn tập Blacklist" label="name" track-by="name" :preselect-first="true">
                            </multiselect>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-9 mt-3">
                    <button type="button" class="btn btn-success" @click="handleActionInsertCamp">
                        <i class="uil uil-save me-1"></i> Lưu lại
                    </button>
                    <button type="button" class="btn btn-primary">Tiếp tục <i class="uil uil-arrow-circle-right ms-1"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

