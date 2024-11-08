
<script>
import {mapActions} from "vuex";
import Multiselect from "vue-multiselect";

import "vue-multiselect/dist/vue-multiselect.min.css";
export default {
    name: "EventModal",
    props: ['flagModal', 'actionType','eventEditId'],
    watch: {
        // 'flagModal'() {
        //     console.log('watch actionType', this.flagModal);
        //     this.handleInitData();
        // }
    },
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
        ...mapActions('contact/contact', {
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
                    this.apiGetEventById(objInput)
                        .then(response => {
                            if (response.err_code === 0) {
                                let data = response['data'];

                                this.eventObj=data.event;
                                console.log('apiGetEventById',data);
                                let objParseOption = data.jsonParseOptionEvent;
                                if(this.eventObj.dataSource==='tapping'){
                                    this.optionsEventType=[{value:'call',text:'CALL'},{value:'ussd',text:'USSD'}]
                                }else if(this.eventObj.dataSource==='ccsp'){
                                    this.optionsEventType=[{value:'package',text:'Gói cước'}]
                                }else if(this.eventObj.dataSource==='lbs'){
                                    this.optionsEventType=[{value:'sub_location',text:'Vị trí thuê bao'}]
                                }
                                if(this.eventObj.dataType==='call'){
                                    this.callOptionsSelected=objParseOption.callSelected;
                                    this.timeWaitCall = objParseOption.timeWait;
                                }else if(this.eventObj.dataType==='ussd'){
                                    this.ussdType = objParseOption.ussdObj.ussdType;
                                    this.ussdValue = objParseOption.ussdObj.ussdValue;
                                }else if(this.eventObj.dataType==='package'){
                                    this.pkgCode = objParseOption.pkgObj.pkg_code_value;
                                    this.pkgCapacity=objParseOption.pkgObj.pkg_capacity_value;
                                    this.pkgWarning=objParseOption.pkgObj.pkg_warning_value;
                                    this.pkgStartDate=objParseOption.pkgObj.pkg_startdate_value;
                                    this.pkgEndDate=objParseOption.pkgObj.pkg_enddate_value;
                                }else if(this.eventObj.dataType==='sub_location'){
                                    this.provinceOptionsSelected=objParseOption.provinceSelected;
                                    this.districtOptionsSelected=objParseOption.districtSelected;
                                }

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
                    optionEvent = this.ussdType+","+this.ussdValue;
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

                }
                console.log('addEvent',optionEvent);
                this.eventObj.eventOption=optionEvent;
                if(this.actionType ===2){
                    this.eventObj.id=this.eventEditId;
                    this.apiEditEvent(this.eventObj)
                        .then(response => {
                            console.log('apiEditEvent', response);
                            if (response.err_code === 0) {
                                this.$emit('hanleAfterAction');
                                this.$bvModal.hide('modal-add-event');
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
                }if(this.actionType ===1){
                    this.apiAddEvent(this.eventObj)
                        .then(response => {
                            console.log('apiAddEvent', response);
                            if (response.err_code === 0) {
                                this.$emit('hanleAfterAction');
                                this.$bvModal.hide('modal-add-event');
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
                    if(this.ussdType === null || this.ussdType.trim() ===''){
                        this.commonNotifyVue("Bạn nhập thông tin Truy vấn tài khoản",'warn');
                        return false;
                    }
                    if(this.ussdValue === null || this.ussdValue.trim() ===''){
                        this.commonNotifyVue("Bạn nhập thông tin Truy vấn tài khoản",'warn');
                        return false;
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
                this.optionsEventType=[{value:'call',text:'CALL'},{value:'ussd',text:'USSD'}]
                this.eventObj.dataType='call';
            }else if(this.eventObj.dataSource==='ccsp'){
                this.optionsEventType=[{value:'package',text:'Gói cước'}]
                this.eventObj.dataType='package';
            }else if(this.eventObj.dataSource==='lbs'){
                this.optionsEventType=[{value:'sub_location',text:'Vị trí thuê bao'}]
                this.eventObj.dataType='sub_location';
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

        }
    }
}
</script>

<style scoped>

</style>

<template>
    <b-modal id="modal-add-event"
             size="lg" :title="modalTitle"
             title-class="font-18" hide-footer
             @cancel="flagModal = false"
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
                            <option value="1">Trong khoảng</option>
                            <option value="2">Lớn hơn</option>
                            <option value="3">Nhỏ hơn</option>
                        </select>
                    </div>
                    <div class="col-4">
                        <input type="text" maxlength="20" v-model="ussdValue" class="form-control"/>
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
                        <input type="date" v-model="pkgStartDate" :disabled="actionType===3" class="form-control"/>
                        <label>Ngày kết thúc</label>
                        <input type="date" v-model="pkgEndDate" :disabled="actionType===3" class="form-control"/>
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
            </div>
        </div>
        <!-- end card-body -->
        <div class="text-end mt-4">
            <button type="button" class="btn btn-default" @click="closeModal">Bỏ qua</button>
            <button type="button" class="btn btn-primary px-4" @click="addEvent">Lưu</button>
        </div>
    </b-modal>
</template>


