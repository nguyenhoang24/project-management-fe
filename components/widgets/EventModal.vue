
<script>
import {mapActions} from "vuex";
import Multiselect from "vue-multiselect";

import "vue-multiselect/dist/vue-multiselect.min.css";
export default {
    name: "EventModal",
    props: [ 'actionType','eventEditId'],
    data(){
        return{
            eventObj:{
                id:-1,
                name: '',
                dataSource: '',
                dataType: '',
                dataShow: '',
                eventOption: ''
            },
            modalTitle:'',
            timeWaitCall:1,
            timeWaitList:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            optionsEventType: [
            ],
            optionsProvince:[],
            optionsDistrict:[],
            provinceOptionsSelected:[],
            districtOptionsSelected:[],
            ussdType:-1,
            ussdValue:'',
            topupType:-1,
            topupTime:'',
            topupValue:'',
            topupAbove:'',
            topupLow:'',
            pkgCode:'',
            pkgCapacity:'',
            pkgWarning:1,
            pkgStartDate:'',
            pkgEndDate:'',
            callOptionsSelected: [],
            optionsCall: [
                {name: 'Cuộc gọi normal call clearing - cuộc gọi thành công', value: 'call_success'},
                {name: 'Cuộc gọi low balance', value: 'call_low_balance'},
                {name: 'Cuộc gọi hết tiền', value: 'call_out_of_money'},
                {name: 'Cuộc gọi no answer', value: 'call_no_answer'},
                {name: 'Cuộc gọi user busy', value: 'call_user_busy'},
                {name: 'Thuê bao hủy cuộc gọi', value: 'call_destroy'}
            ],
            ussdAbove:'',
            ussdLow:'',
            apiKeyValue:[
                {key:'',condition:'-1',value:''}
            ]
        }
    },
    components:{
        Multiselect
    },
    updated() {

    },
    methods:{
        ...mapActions('setting/event', {
            apiAddEvent:'apiAddEvent',
            apiEditEvent:'apiEditEvent',
            apiGetEventById:'apiGetEventById'
        }),
        ...mapActions('contact/profile', {
            apiGetListProvince:'apiGetListProvince',
            apiGetListDistrict:'apiGetListDistrict'
        }),
        resetForm(){
            this.eventObj={
                    id:-1,
                    name: '',
                    dataSource: '',
                    dataType: '',
                    dataShow: '',
                    eventOption: ''
            };
            this.timeWaitCall=1;
            this.districtOptionsSelected=[];
            this.provinceOptionsSelected=[];
            this.callOptionsSelected=[];

        },
        handleInitData() {
            this.$nextTick(() => {
                console.log('handleInitData', this.actionType);
                let objInput ={id:0};
                this.apiGetListProvince(objInput)
                    .then(response => {
                        let data = response['data'];
                        this.optionsProvince = data;
                        console.log('apiGetListProvince', data);
                        if (response.err_code === 0) {
                        } else {
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .finally(() => {
                        // this.commonLoadingPage(false);
                    });
                // alert(this.actionType);
                if(this.actionType==1){
                    this.modalTitle='Thêm Event';
                    this.resetForm();
                }else if(this.actionType===2 || this.actionType===3){
                    objInput={id:this.eventEditId};
                    if(this.actionType===2)
                        this.modalTitle='Sửa Event';
                    else if(this.actionType===3)
                        this.modalTitle='Xem thông tin Event';
                    this.commonLoadingPage(true);
                    this.apiGetEventById(objInput)
                        .then(response => {
                            if (response.err_code === 0) {
                                let data = response['data'];

                                this.eventObj=data.event;
                                console.log('apiGetEventById',data);
                                let objParseOption = data.jsonParseOptionEvent;
                                if(this.eventObj.dataSource==='tapping'){
                                    this.optionsEventType=[{value:'call',text:'CALL'},{value:'ussd',text:'USSD'}];
                                }else if(this.eventObj.dataSource==='ccsp'){
                                    this.optionsEventType=[{value:'package',text:'Gói cước'}];
                                }else if(this.eventObj.dataSource==='lbs'){
                                    this.optionsEventType=[{value:'sub_location',text:'Vị trí thuê bao'}];
                                }else if(this.eventObj.dataSource==='neif'){
                                    this.optionsEventType=[{value:'topup',text:'Thông tin nạp thẻ'}];
                                }else if(this.eventObj.dataSource==='api'){
                                    this.optionsEventType=[{value:'apiinfo',text:'Thông tin API'}];
                                }

                                if(this.eventObj.dataType==='call'){
                                    this.callOptionsSelected=objParseOption.callSelected;
                                    this.timeWaitCall = objParseOption.timeWait;
                                }else if(this.eventObj.dataType==='ussd'){
                                    this.ussdType = objParseOption.ussdObj.ussdType;
                                    if(this.ussdType===1){
                                        this.ussdAbove=objParseOption.ussdObj.ussdAbove;
                                        this.ussdLow=objParseOption.ussdObj.ussdLow;
                                    }else{
                                        this.ussdValue = objParseOption.ussdObj.ussdValue;
                                    }

                                }else if(this.eventObj.dataType==='package'){
                                    this.pkgCode = objParseOption.pkgObj.pkg_code_value;
                                    this.pkgCapacity=objParseOption.pkgObj.pkg_capacity_value;
                                    this.pkgWarning=objParseOption.pkgObj.pkg_warning_value;
                                    this.pkgStartDate=objParseOption.pkgObj.pkg_startdate_value;
                                    this.pkgEndDate=objParseOption.pkgObj.pkg_enddate_value;
                                }else if(this.eventObj.dataType==='sub_location'){
                                    console.log('Province:',objParseOption.provinceSelected);
                                    console.log('District:',objParseOption.districtSelected);
                                    this.provinceOptionsSelected=objParseOption.provinceSelected;
                                    this.districtOptionsSelected=objParseOption.districtSelected;
                                    let objInput={provinces:this.provinceOptionsSelected};
                                    this.apiGetListDistrict(objInput)
                                        .then(response => {
                                            let data = response['data'];
                                            this.optionsDistrict=data ;
                                            console.log('apiGetListDistrict1', data);
                                            if (response.err_code === 0) {
                                            } else {
                                            }
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        })
                                        .finally(() => {
                                            // this.commonLoadingPage(false);
                                        });
                                }else if(this.eventObj.dataType==='topup'){
                                    console.log('topupObj:',objParseOption.topupObj)
                                    this.topupTime = objParseOption.topupObj.time;
                                    this.topupType = objParseOption.topupObj.topupType;
                                    if(this.topupType===1){
                                        this.topupAbove=objParseOption.topupObj.topupAbove;
                                        this.topupLow=objParseOption.topupObj.topupLow;
                                    }else{
                                        this.topupValue = objParseOption.topupObj.topupValue;
                                    }
                                }else if(this.eventObj.dataType==='apiinfo'){
                                    this.apiKeyValue = objParseOption.apiInfo;
                                }

                            } else {
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                        .finally(() => {
                            this.commonLoadingPage(false);
                        });
                }
            });
        },
        addEvent(){
            let optionEvent='';
            let ids = [];
            console.log('addEvent',this.callOptionsSelected);
            if(this.checkDataInput()){
                if(this.eventObj.dataType==='call'){
                    for(let i=0; i<this.callOptionsSelected.length; i++){
                        ids.push(this.callOptionsSelected[i].value);
                    }
                    if(this.callOptionsSelected.length>1){
                        optionEvent = ids.join(',') +';time_wait:'+this.timeWaitCall;
                    }else{
                        optionEvent = ids.join(',');
                    }
                }else if(this.eventObj.dataType==='ussd'){
                    if(this.ussdType===2 || this.ussdType===3)
                        optionEvent = this.ussdType+','+this.ussdValue;
                    else
                        optionEvent = this.ussdType+','+this.ussdLow+'-'+this.ussdAbove;
                }else if(this.eventObj.dataType==='package'){
                    optionEvent = 'pkg_code:'+this.pkgCode+',pkg_capacity:'+this.pkgCapacity+',pkg_warning:'+this.pkgWarning+',pkg_startdate:'+this.pkgStartDate+',pkg_enddate:'+this.pkgEndDate;
                }else if(this.eventObj.dataType==='sub_location'){
                    let provinceIds =[];
                    let proIds='';

                    for(let i=0; i<this.provinceOptionsSelected.length; i++){
                        provinceIds.push(this.provinceOptionsSelected[i].id);
                    }
                    proIds=provinceIds.join(',');
                    let districtIds =[];
                    let distIds='';
                    for(let j=0; j<this.districtOptionsSelected.length; j++){
                        districtIds.push(this.districtOptionsSelected[j].id);
                    }
                    distIds=districtIds.join(',');
                    optionEvent = 'provinces:'+proIds+';districts:'+distIds;

                }else if(this.eventObj.dataType==='topup'){
                    let tempTopup ='';
                    if(this.topupType===2 || this.topupType===3)
                        tempTopup = this.topupType+','+this.topupValue;
                    else
                        tempTopup = this.topupType+','+this.topupLow+'-'+this.topupAbove;
                    optionEvent =  tempTopup +';time:'+this.topupTime;
                }else if(this.eventObj.dataType==='apiinfo'){
                    let tempApi ='';

                    for(let k=0; k<this.apiKeyValue.length; k++){
                        let obj = this.apiKeyValue[k];
                        let keyValue = obj.key+','+obj.condition+','+obj.value;
                        console.log('api',keyValue);
                        tempApi += ';'+keyValue;
                        console.log('api',tempApi);
                    }
                    optionEvent = tempApi.substring(1);
                }
                console.log('addEvent',optionEvent);
                this.eventObj.eventOption=optionEvent;
                if(this.actionType ===2){
                    this.eventObj.id=this.eventEditId;
                    this.commonLoadingPage(true);
                    this.apiEditEvent(this.eventObj)
                        .then(response => {
                            console.log('apiEditEvent', response);
                            if (response.err_code === 0) {
                                this.$emit('hanleAfterAction');
                                this.$bvModal.hide('modal-add-event');
                            } else {
                                this.commonConfirmError(response.err_message);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                        .finally(() => {
                            this.commonLoadingPage(false);
                        });
                }if(this.actionType ===1){
                    this.commonLoadingPage(true);
                    this.apiAddEvent(this.eventObj)
                        .then(response => {
                            console.log('apiAddEvent', response);
                            if (response.err_code === 0) {
                                this.$emit('hanleAfterAction');
                                this.$bvModal.hide('modal-add-event');
                            } else {
                                this.commonConfirmError(response.err_message);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                        .finally(() => {
                            this.commonLoadingPage(false);
                        });
                }
            }
        },
        closeModal(){
            this.$bvModal.hide('modal-add-event');
        },
        checkDataInput(){
            if(this.eventObj.name === null || this.eventObj.name.trim() ===''){
                this.commonNotifyVue("Bạn phải nhập tên sự kiện",'warn');
                return false;
            }
            if(this.eventObj.dataSource === null || this.eventObj.dataSource.trim() ===''){
                this.commonNotifyVue("Bạn phải chọn nguồn sự kiện",'warn');
                return false;
            }
            if(this.eventObj.dataType === null || this.eventObj.dataType.trim() ===''){
                this.commonNotifyVue("Bạn phải chọn Loại dữ liệu cần lấy",'warn');
                return false;
            }else{
                if(this.eventObj.dataType==='call'){
                    if(this.callOptionsSelected.length===0){
                        this.commonNotifyVue("Bạn phải chọn Loại cuộc gọi",'warn');
                        return false;
                    }
                }else if(this.eventObj.dataType==='ussd'){
                    if(this.ussdType === -1){
                        this.commonNotifyVue("Bạn nhập điều kiện truy vấn",'warn');
                        return false;
                    }

                    if(this.ussdType === 2 || this.ussdType === 3){
                        if(this.ussdValue === null || this.ussdValue.trim() ===''){
                            this.commonNotifyVue("Bạn nhập giá trị Truy vấn tài khoản",'warn');
                            return false;
                        }
                    }else {
                        if(this.ussdAbove === null || this.ussdLow.trim() ===''){
                            this.commonNotifyVue("Bạn nhập giá trị Truy vấn trên",'warn');
                            return false;
                        }
                        if(this.ussdLow === null || this.ussdLow.trim() ===''){
                            this.commonNotifyVue("Bạn nhập giá trị Truy vấn dưới",'warn');
                            return false;
                        }
                    }

                }else if(this.eventObj.dataType==='ussd'){
                    if(this.pkgCode === null || this.pkgCode.trim() ===''){
                        this.commonNotifyVue("Bạn nhập Mã gói",'warn');
                        return false;
                    }
                    if(this.pkgCapacity === null || this.pkgCapacity.trim() ===''){
                        this.commonNotifyVue("Bạn nhập Dung lượng gói",'warn');
                        return false;
                    }
                    if(this.pkgStartDate === null || this.pkgStartDate.trim() ===''){
                        this.commonNotifyVue("Bạn nhập Ngày bắt đầu",'warn');
                        return false;
                    }
                    if(this.pkgEndDate === null || this.pkgEndDate.trim() ===''){
                        this.commonNotifyVue("Bạn nhập Ngày kết thúc",'warn');
                        return false;
                    }
                }else if(this.eventObj.dataType==='sub_location'){
                    if(this.provinceOptionsSelected.length==0){
                        this.commonNotifyVue("Bạn nhập Tỉnh/TP",'warn');
                        return false;
                    }
                }
            }
            return true;
        },
        onChangeDataSource(){
            this.eventObj.dataType='';
            if(this.eventObj.dataSource==='tapping'){
                this.optionsEventType=[{value:'call',text:'CALL'},{value:'ussd',text:'USSD'}];
                this.eventObj.dataType='call';
            }else if(this.eventObj.dataSource==='ccsp'){
                this.optionsEventType=[{value:'package',text:'Gói cước'}];
                this.eventObj.dataType='package';
            }else if(this.eventObj.dataSource==='lbs'){
                this.optionsEventType=[{value:'sub_location',text:'Vị trí thuê bao'}];
                this.eventObj.dataType='sub_location';
            }else if(this.eventObj.dataSource==='neif'){
                this.optionsEventType=[{value:'topup',text:'Thông tin nạp thẻ'}];
                this.eventObj.dataType='topup';
            }else if(this.eventObj.dataSource==='api'){
                this.optionsEventType=[{value:'apiinfo',text:'Thông tin API'}];
                this.eventObj.dataType='apiinfo';
            }
        },
        onChangeProvince(){
            console.log('onChangeProvince',this.provinceOptionsSelected);
                let objInput={provinces:this.provinceOptionsSelected};
                this.apiGetListDistrict(objInput)
                    .then(response => {
                        let data = response['data'];
                        this.optionsDistrict=data ;
                        console.log('apiGetListDistrict1', data);
                        if (response.err_code === 0) {
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
        addApiInfo(){
            this.apiKeyValue.push({key:'',condition:'',value:''});
            let convert =this.apiKeyValue.toString();
        },
        removeApiInfo(index){
            this.apiKeyValue.splice(index,1);
        }
    }
}
</script>

<style scoped>
.custom-btn {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #004390;
    color: #004390;
}
</style>

<template>
    <b-modal id="modal-add-event"
             size="lg" :title="modalTitle"
             title-class="font-18" hide-footer
             @show="handleInitData"
    >
        <div class="row pb-3">
            <div class="col-12 col-sm-12">
                <label>Tên Event</label>
                <input type="text" maxlength="200" v-model="eventObj.name" :disabled="actionType===3" placeholder="Tên Event" class="form-control form-control multiselect__tags"/>
            </div>
        </div>
        <div class="row pb-3">
            <div class="col-12 col-sm-12">
                <label>Nguồn sự kiện</label>
                <select v-model="eventObj.dataSource" @change="onChangeDataSource" :disabled="actionType===3" class="form-control">
                    <option value="tapping">Tapping</option>
                    <option value="ccsp">CCSP/VasFlatForm</option>
                    <option value="lbs">LBS</option>
                    <option value="neif">Neif</option>
                    <option value="api">Open Api</option>
                </select>
            </div>
        </div>
        <div class="row pb-3">
            <div class="col-12 col-sm-12">
                <label>Loại dữ liệu cần lấy</label>
                <select v-model="eventObj.dataType" :disabled="actionType===3" class="form-control">
                    <option v-for="option in optionsEventType" :value="option.value">
                        {{ option.text}}
                    </option>
                </select>
            </div>
        </div>
        <div class="row pb-3">
            <div class="col-12 col-sm-12">
                <label>Các option</label>
                <multiselect v-show="eventObj.dataType==='call'" :disabled="actionType===3" v-model="callOptionsSelected" :options="optionsCall" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn loại cuộc gọi" label="name" track-by="name" :preselect-first="true">

                </multiselect>
                <label v-show="callOptionsSelected.length>1">Thời gian chờ tổng hợp</label>
                <select v-model="timeWaitCall" class="form-control" v-show="callOptionsSelected.length>1">
                    <option :value="i" v-for="(i, index) in timeWaitList" :key="index">{{i}}</option>
                </select>
                <div class="row col-12" v-show="eventObj.dataType==='ussd'">
                    <div class="col-4">
                        <label>Truy vấn tài khoản</label>
                    </div>
                    <div class="col-4">
                        <select v-model="ussdType" :disabled="actionType===3" class="form-control">
                            <option :value="1">Trong khoảng</option>
                            <option :value="2">Lớn hơn</option>
                            <option :value="3">Nhỏ hơn</option>
                        </select>
                    </div>
                    <div class="col-4">
                        <input type="text" v-show="ussdType===2 || ussdType===3" maxlength="20" v-model="ussdValue" class="form-control"/>
                        <input type="text" v-show="ussdType===1" maxlength="20" v-model="ussdLow" class="form-control"/>
                        <input type="text" v-show="ussdType===1" maxlength="20" v-model="ussdAbove" class="form-control"/>
                    </div>
                </div>
                <div class="row col-12" v-show="eventObj.dataType=='package'">
                    <div class="col-6">
                        <label>Mã gói</label>
                        <input type="text" maxlength="10" v-model="pkgCode" :disabled="actionType===3" class="form-control"/>
                        <label>Dung lượng gói</label>
                        <input type="text" maxlength="10" v-model="pkgCapacity" :disabled="actionType===3" class="form-control"/>
                        <label>Cảnh báo hết dung lượng</label>
                        <select v-model="pkgWarning" :disabled="actionType===3" class="form-control">
                            <option value="1">Có</option>
                            <option value="0">Không</option>
                        </select>
                    </div>
                    <div class="col-6" >

                        <label>Ngày bắt đầu</label>
                        <b-form-datepicker
                            calendar-width="400px"
                            locale="vi"
                            v-model="pkgStartDate" :disabled="actionType===3"
                            :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                            class="form-select">
                        </b-form-datepicker>
                        <label>Ngày kết thúc</label>
                        <b-form-datepicker
                            calendar-width="400px"

                            locale="vi"
                            v-model="pkgEndDate" :disabled="actionType===3"
                            :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                            class="form-select">
                        </b-form-datepicker>
                    </div>
                </div>
                <div class="row col-12" v-show="eventObj.dataType==='sub_location'">
                    <div class="col-4">
                        <label>Vị trí thuê bao</label>
                    </div>
                    <div class="col-4">
                        <multiselect @input="onChangeProvince" :disabled="actionType===3" v-model="provinceOptionsSelected" :options="optionsProvince" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn tỉnh/TP" label="name" track-by="id" :preselect-first="true">

                        </multiselect>
                    </div>
                    <div class="col-4">

                        <multiselect :disabled="actionType===3" v-model="districtOptionsSelected" :options="optionsDistrict" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn huyện" label="name" track-by="id" :preselect-first="true">

                        </multiselect>
                    </div>
                </div>

                <div class="row col-12" v-show="eventObj.dataType==='topup'">

                    <div class="col-4 mb-3">
                        <label>Số tiền nạp</label>
                    </div>
                    <div class="col-4">
                        <select v-model="topupType" :disabled="actionType===3" class="form-control">
                            <option :value="1">Trong khoảng</option>
                            <option :value="2">Lớn hơn</option>
                            <option :value="3">Nhỏ hơn</option>
                        </select>
                    </div>
                    <div class="col-4">
                        <input type="text" v-show="topupType===2 || topupType===3" maxlength="20" v-model="topupValue" class="form-control"/>
                        <input type="text" v-show="topupType===1" maxlength="20" v-model="topupLow" class="form-control"/>
                        <input type="text" v-show="topupType===1" maxlength="20" v-model="topupAbove" class="form-control"/>
                    </div>
                    <div class="col-4">
                        <label>Khoảng thời gian </label>
                    </div>
                    <div class="col-4">
                        <input type="text" v-model="topupTime" class="form-control"/>
                    </div>
                    <div class="col-4">
                        <label>giờ</label>
                    </div>
                </div>
                <div class="row col-12" v-show="eventObj.dataType==='apiinfo'">
                    <div class="row mb-3" v-for="(info,index) in apiKeyValue" :key="index">
                        <div class="col-3">
                            <input type="text" v-model="info.key" class="form-control" placeholder="Key"/>
                        </div>
                        <div class="col-3">
                            <select v-model="info.condition" class="form-control">
                                <option value="-1">Condition</option>
                                <option value="greater">Lớn hơn</option>
                                <option value="greaterEqual">Lớn hơn</option>
                                <option value="lower">Nhỏ hơn</option>
                                <option value="lowerEqual">Nhỏ hơn</option>
                                <option value="equal">Bằng</option>
                                <option value="start">Bắt đầu</option>
                                <option value="contain">Chứa</option>
                                <option value="end">Kết thúc</option>
                            </select>

                        </div>
                        <div class="col-6">
                            <div class="row">
                                <div class="col-8">
                                    <input type="text" v-model="info.value" class="form-control" placeholder="Value"/>
                                </div>
                                <div class="col-1">
                                    <button type="button" v-show="index>1" class="custom-btn cursor-pointer d-flex justify-content-center align-items-center me-1 pb-1" @click="removeApiInfo(index)">
                                        <i class="uil uil-minus"></i>
                                    </button>
                                </div>
                                <div class="col-1">
                                    <button type="button" class="custom-btn cursor-pointer d-flex justify-content-center align-items-center pb-1" @click="addApiInfo">
                                        <i class="uil uil-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end card-body -->
        <div class="text-end mt-4">
            <button type="button" class="btn btn-default" @click="closeModal">Bỏ qua</button>
            <button type="button" class="btn btn-primary px-4" @click="addEvent">Lưu</button>
        </div>
    </b-modal>
</template>


