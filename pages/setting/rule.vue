
<script>
import Multiselect from "vue-multiselect";

import "vue-multiselect/dist/vue-multiselect.min.css";
import vue2Dropzone from "vue2-dropzone";
import {mapActions} from "vuex";

export default {
    name: "rule",
    components: {
        Multiselect,
    },
    data() {
        return {
            ruleListChannel:[],
            ruleListCampaign:[],
            ruleListType:[]
        }
    },
    mounted() {
        this.getDataInit();
    },
    computed: {

    },
    methods: {
        ...mapActions('setting/rule', {
            apiGetListRule: 'apiGetListRule',
            apiUpdateRule: 'apiUpdateRule'
        }),
        getDataInit(){
            let objInput={id:0};
            this.apiGetListRule(objInput)
                .then(response => {

                    console.log('init dữ liệu', response);
                    if (response.err_code === 0) {
                        let data = response['data'];
                        this.ruleListChannel = data.channelRuleList;
                        this.ruleListCampaign = data.campaignRuleList;
                        this.ruleListType = data.typeRuleList;
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
        updateChannelRule(){
            let jsonInput ={jsonRuleList:this.ruleListChannel};
            this.apiUpdateRule(jsonInput)
                .then(response => {
                    console.log('apiUpdateRule', response);
                    if (response.err_code === 0) {
                       this.getDataInit();
                    } else {
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    // this.commonLoadingPage(false);
                });
        },
        updateCampaignRule(){
            let jsonInput ={jsonRuleList:this.ruleListCampaign};
            this.apiUpdateRule(jsonInput)
                .then(response => {
                    console.log('apiUpdateRule', response);
                    if (response.err_code === 0) {
                        this.getDataInit();
                    } else {
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    // this.commonLoadingPage(false);
                });
        },
        updateTypeRule(){
            let jsonInput ={jsonRuleList:this.ruleListType};
            this.apiUpdateRule(jsonInput)
                .then(response => {
                    console.log('apiUpdateRule', response);
                    if (response.err_code === 0) {
                        this.getDataInit();
                    } else {
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    // this.commonLoadingPage(false);
                });
        }
    }
}
</script>

<style scoped>

</style>

<template>

    <b-tabs content-class="mt-3">
        <b-tab title="Quản lý Tần suất trên một kênh Quảng cáo" active>
            <div div class="row col-12 mb-2">
                <div class="col-1">
                    <label style="font-weight: bold">Kênh quảng cáo</label>
                </div>
                <div class="col-2">
                    <label style="font-weight: bold">Loại hình QC</label>
                </div>
                <div class="col-4">
                    <label style="font-weight: bold">Rule</label>
                </div>
                <div class="col-2">
                    <label style="font-weight: bold"> Tần suất, Sản lượng</label>
                </div>
                <div class="col-2">
                    <label style="font-weight: bold"> Đơn vị</label>
                </div>
            </div>
            <div class="row col-12 mb-2" v-for="(rule,index) in ruleListChannel" :key="index">
                <div class="col-1">
                    <label>{{rule.ruleChannel}}</label>

                </div>
                <div class="col-2">
                    <label>{{rule.ruleType}}</label>
                </div>
                <div class="col-4">
                    <label>{{rule.ruleDesc}}</label>
                </div>
                <div class="col-2">
                    <input class="form-control" v-model="rule.ruleValue">
                </div>
                <div class="col-2">
                    <select v-model="rule.ruleUnit" v-show="rule.ruleUnitType===1" class="form-control">
                        <option value="Tin/Phút">Tin/Phút</option>
                        <option value="Tin/Giờ">Tin/Giờ</option>
                        <option value="Tin/Ngày">Tin/Ngày</option>
                        <option value="Tin/Tuần">Tin/Ngày</option>
                        <option value="Tin/Tháng">Tin/Tháng</option>
                    </select>
                    <select v-model="rule.ruleUnit" v-show="rule.ruleUnitType===2" class="form-control">
                        <option value="Cuộc">Cuộc</option>
                    </select>
                    <select v-model="rule.ruleUnit" v-show="rule.ruleUnitType===3" class="form-control">
                        <option value="Phút">Phút</option>
                        <option value="Giờ">Giờ</option>
                        <option value="Ngày">Ngày</option>
                    </select>
                    <select v-model="rule.ruleUnit" v-show="rule.ruleUnitType===4" class="form-control">
                        <option value="Tin">Tin</option>
                    </select>
                    <select v-model="rule.ruleUnit" v-show="rule.ruleUnitType===5" class="form-control">
                        <option value="Cuộc/Phút">Cuộc/Phút</option>
                        <option value="Cuộc/Giờ">Cuộc/Giờ</option>
                        <option value="Cuộc/Ngày">Cuộc/Ngày</option>
                        <option value="Cuộc/Tuần">Cuộc/Tuần</option>
                        <option value="Cuộc/Tháng">Cuộc/Tháng</option>
                    </select>
                </div>
            </div>
            <div style="padding-left: 80%">
                <button type="button" class="btn btn-primary px-4" @click="updateChannelRule">Cập nhật</button>
            </div>

        </b-tab>
        <b-tab title="Quản lý Tần suất cho từng chiến dịch">
            <div div class="row col-12 mb-2">
                <div class="col-1">
                    <label style="font-weight: bold">Kênh quảng cáo</label>
                </div>
                <div class="col-4">
                    <label style="font-weight: bold">Rule</label>
                </div>
                <div class="col-2">
                    <label style="font-weight: bold"> Tần suất, Sản lượng</label>
                </div>
                <div class="col-2">
                    <label style="font-weight: bold"> Đơn vị</label>
                </div>
            </div>
            <div class="row col-12 mb-2" v-for="(rule,index) in ruleListCampaign" :key="index">
                <div class="col-1">
                    <label>{{rule.ruleChannel}}</label>

                </div>
                <div class="col-4">
                    <label>{{rule.ruleDesc}}</label>
                </div>
                <div class="col-2">
                    <input class="form-control" v-model="rule.ruleValue">
                </div>
                <div class="col-2">
                    <select v-model="rule.ruleUnit" v-show="rule.ruleUnitType===1" class="form-control">
                        <option value="Tin/Phút">Tin/Phút</option>
                        <option value="Tin/Giờ">Tin/Giờ</option>
                        <option value="Tin/Ngày">Tin/Ngày</option>
                        <option value="Tin/Tuần">Tin/Ngày</option>
                        <option value="Tin/Tháng">Tin/Tháng</option>
                    </select>
                    <select v-model="rule.ruleUnit" v-show="rule.ruleUnitType===2" class="form-control">
                        <option value="Cuộc">Cuộc</option>
                    </select>
                    <select v-model="rule.ruleUnit" v-show="rule.ruleUnitType===3" class="form-control">
                        <option value="Phút">Phút</option>
                        <option value="Giờ">Giờ</option>
                        <option value="Ngày">Ngày</option>
                    </select>
                    <select v-model="rule.ruleUnit" v-show="rule.ruleUnitType===4" class="form-control">
                        <option value="Tin">Tin</option>
                    </select>
                    <select v-model="rule.ruleUnit" v-show="rule.ruleUnitType===5" class="form-control">
                        <option value="Cuộc/Phút">Cuộc/Phút</option>
                        <option value="Cuộc/Giờ">Cuộc/Giờ</option>
                        <option value="Cuộc/Ngày">Cuộc/Ngày</option>
                        <option value="Cuộc/Tuần">Cuộc/Tuần</option>
                        <option value="Cuộc/Tháng">Cuộc/Tháng</option>
                    </select>
                </div>
            </div>
            <div style="padding-left: 60%">
                <button type="button" class="btn btn-primary px-4" @click="updateCampaignRule">Cập nhật</button>
            </div>
        </b-tab>
        <b-tab title="Quản lý Tần suất cho từng Loại hình Quảng cáo">
            <div div class="row col-12 mb-2">

                <div class="col-2">
                    <label style="font-weight: bold">Loại hình QC</label>
                </div>
                <div class="col-4">
                    <label style="font-weight: bold">Rule</label>
                </div>
                <div class="col-2">
                    <label style="font-weight: bold"> Tần suất, Sản lượng</label>
                </div>
                <div class="col-2">
                    <label style="font-weight: bold"> Đơn vị</label>
                </div>
            </div>
            <div class="row col-12 mb-2" v-for="(rule,index) in ruleListType" :key="index">
                <div class="col-2">
                    <label>{{rule.ruleType}}</label>

                </div>
                <div class="col-4">
                    <label>{{rule.ruleDesc}}</label>
                </div>
                <div class="col-2">
                    <input class="form-control" v-model="rule.ruleValue">
                </div>
                <div class="col-2">
                    <select v-model="rule.ruleUnit" v-show="rule.ruleUnitType===1" class="form-control">
                        <option value="Tin/Phút">Tin/Phút</option>
                        <option value="Tin/Giờ">Tin/Giờ</option>
                        <option value="Tin/Ngày">Tin/Ngày</option>
                        <option value="Tin/Tuần">Tin/Ngày</option>
                        <option value="Tin/Tháng">Tin/Tháng</option>
                    </select>
                    <select v-model="rule.ruleUnit" v-show="rule.ruleUnitType===2" class="form-control">
                        <option value="Cuộc">Cuộc</option>
                    </select>
                    <select v-model="rule.ruleUnit" v-show="rule.ruleUnitType===3" class="form-control">
                        <option value="Phút">Phút</option>
                        <option value="Giờ">Giờ</option>
                        <option value="Ngày">Ngày</option>
                    </select>
                    <select v-model="rule.ruleUnit" v-show="rule.ruleUnitType===4" class="form-control">
                        <option value="Tin">Tin</option>
                    </select>
                    <select v-model="rule.ruleUnit" v-show="rule.ruleUnitType===5" class="form-control">
                        <option value="Cuộc/Phút">Cuộc/Phút</option>
                        <option value="Cuộc/Giờ">Cuộc/Giờ</option>
                        <option value="Cuộc/Ngày">Cuộc/Ngày</option>
                        <option value="Cuộc/Tuần">Cuộc/Tuần</option>
                        <option value="Cuộc/Tháng">Cuộc/Tháng</option>
                    </select>
                </div>
            </div>
            <div style="padding-left: 80%">
                <button type="button" class="btn btn-primary px-4" @click="updateTypeRule">Cập nhật</button>
            </div>
        </b-tab>
    </b-tabs>




</template>


