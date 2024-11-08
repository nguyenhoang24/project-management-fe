
<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import {mapActions} from "vuex";
export default {
    name: "MdFilter",
    props: ['searchGroup','searchStatus','searchRunTimce','searchCreate','searchCampaigName'],
    data (){
        return {
            optionsStatus:[
                {name:'Đã duyệt',value:'APPROVED'},
                {name:'Chưa duyệt',value:'PENDING'},
                {name:'Đang chạy',value:'ACTIVE'},
                {name:'Tạm dừng',value:'STOP'},
                {name:'Draft',value:'DRAFT'}],
            optionsStatusSelected:[],
            statusAllCheck:false,
            optionsRunType:[
                {name:'Chạy 1 lần',value:'ONLY_ONE'},
                {name:'Chạy nhiều lần',value:'MANY'},
                {name:'Chạy liên tục',value:'CONTINUOUS'}],
            optionsRunTypeSelected:[],
            runTypeAllCheck:false,
            optionsChannel:[],
            optionsChannelSelected:[],
            channelAllCheck:false,
            optionCampaignType:[
                {name:'Event Campaign',value:'EVENT'},
                {name:'Batch Campaign',value:'BATCH'}
            ],
            optionCampaignTypeSelected:[],
            typeAllCheck:false,
            optionsGroup:[],
            optionsGroupSelected:[],
            groupAllCheck:false,
            campaignName:'',
            runTimeQc:this.$moment().format('YYYY-MM-DD'),
            createdTimeQc:this.$moment().format('YYYY-MM-DD')

        }
    },
    components:{
        Multiselect
    },
    mounted() {
        // this.initData();
    },
    methods: {
        ...mapActions('setting/channel', {
            apiGetListChannel:'apiGetListChannel'
        }),
        ...mapActions('admin/group', {
            apiGetListGroup:'apiGetListGroup'
        }),
        handleOkFilter(evt) {
            let managementTemp='';
            for(let i=0;i<this.optionsGroupSelected.length;i++){
                let obj = this.optionsGroupSelected[i];
                if(obj.id !== '-1'){
                    managementTemp +=','+obj.id;
                }
            }
            let managementUnit = ''
            if(managementTemp!=='')
                managementUnit='('+managementTemp.substring(1)+')';

            let channelTemp='';
            for(let i=0;i<this.optionsChannelSelected.length;i++){
                let obj = this.optionsChannelSelected[i];
                if(obj.id !== '-1'){
                    channelTemp +=','+obj.id;
                }
            }
            let channels = ''
            if(channelTemp !== '')
                channels='('+channelTemp.substring(1)+')';

            let statusTemp='';
            for(let i=0;i<this.optionsStatusSelected.length;i++){
                let obj = this.optionsStatusSelected[i];
                if(obj.value !== '-1'){
                    statusTemp +=','+obj.value;
                }
            }
            let statuss = '' ;
            if(statusTemp !=='')
                statuss='('+statusTemp.substring(1)+')';

            let typeTemp='';
            for(let i=0;i<this.optionCampaignTypeSelected.length;i++){
                let obj = this.optionCampaignTypeSelected[i];
                if(obj.value !== '-1'){
                    typeTemp +=','+obj.value;
                }
            }
            let types = '';
            if(typeTemp !=='')
                types='('+typeTemp.substring(1)+')';

            let runTypeTemp='';
            for(let i=0;i<this.optionsRunTypeSelected.length;i++){
                let obj = this.optionsRunTypeSelected[i];
                if(obj.value !== '-1'){
                    runTypeTemp +=','+obj.value;
                }
            }
            let runTypes = '';
            if(runTypeTemp!=='')
                runTypes='('+runTypeTemp.substring(1)+')';

            let conditionSearch ={
                name: this.campaignName,
                managementUnit : managementUnit,
                timeAds: this.runTimeQc,
                timeCreate: this.createdTimeQc,
                campaignStatus: statuss,
                type: types,
                runType: runTypes,
                channelName: channels
            }
            console.log('MdFilter=> condition filter',conditionSearch);
            this.$emit('handleSearchFilter',conditionSearch);
            evt.preventDefault();
        },
        handleResetForm(evt) {
            this.resetForm();
            evt.preventDefault();
        },
        resetForm(){
            this.$nextTick(() => {
                console.log('resetForm',this.searchCampaigName);
                this.optionsStatusSelected=this.searchStatus;
                this.optionsRunTypeSelected=[];
                this.optionCampaignTypeSelected=[];
                this.optionsChannelSelected=[];
                this.optionsGroupSelected=this.searchGroup;
                this.campaignName=this.searchCampaigName;
                this.runTimeQc=this.searchRunTimce;
                this.createdTimeQc=this.searchCreate;
            });

        },
        initData(){
            this.resetForm();
            let objInput= {status: -1};
            this.apiGetListChannel(objInput)
                .then(response => {
                    console.log('init dữ liệu', response);
                    if (response.err_code === 0) {
                        let data = response['data'];
                        this.optionsChannel.push(...data);

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

            this.apiGetListGroup(objInput)
                .then(response => {
                    console.log('init dữ liệu', response);
                    if (response.err_code === 0) {
                        let data = response['data'];
                        this.optionsGroup.push(...data);
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
        groupCheckAllAction(){
            if(this.groupAllCheck ===false){
                this.optionsGroupSelected=this.optionsGroup;
            }else{
                this.optionsGroupSelected=[];
            }
        },
        channelCheckAllAction(){
            if(this.channelAllCheck ===false){
                this.optionsChannelSelected=this.optionsChannel;
            }else{
                this.optionsChannelSelected=[];
            }
        },
        statusCheckAllAction(){
            if(this.statusAllCheck ===false){
                this.optionsStatusSelected=this.optionsStatus;
            }else{
                this.optionsStatusSelected=[];
            }
        },
        typeCheckAllAction(){
            if(this.typeAllCheck ===false){
                this.optionCampaignTypeSelected=this.optionCampaignType;
            }else{
                this.optionCampaignTypeSelected=[];
            }
        },
        runTypeCheckAllAction(){
            if(this.runTypeAllCheck ===false){
                this.optionsRunTypeSelected=this.optionsRunType;
            }else{
                this.optionsRunTypeSelected=[];
            }
        }
    }
}
</script>

<style scoped>

</style>
<template>
    <b-modal
        size="sm"
        id="modal-filter"
        title="Lọc"
        title-class="font-18"
        ok-title-html="Đồng ý"
        cancel-title-html="Làm lại"
        cancel-variant="outline-secondary"
        style="height: 400px"
        :scrollable="true"
        @ok="handleOkFilter"
        @cancel="handleResetForm"
        @show="initData"
    >
            <div class="row">
                <div class="col-12">
                    <label>Kênh quảng cáo:</label>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" v-model="channelAllCheck" @click="channelCheckAllAction" type="checkbox"  value="option1">
                        <label class="form-check-label" for="inlineMonday">Tất cả</label>
                    </div>
                    <multiselect v-model="optionsChannelSelected" :options="optionsChannel" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn kênh" label="name" track-by="name">

                    </multiselect>
                </div>
                <div class="col-12">
                    <label>Loại chiến dịch:</label>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" v-model="typeAllCheck" @click="typeCheckAllAction" type="checkbox"  value="option1">
                        <label class="form-check-label" for="inlineMonday">Tất cả</label>
                    </div>
                    <multiselect v-model="optionCampaignTypeSelected" :options="optionCampaignType" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn loại chiến dịch" label="name" track-by="name">

                    </multiselect>
                </div>
                <div class="col-12">
                    <label>Hình thức chiến dịch:</label>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" v-model="runTypeAllCheck" @click="runTypeCheckAllAction" type="checkbox"  value="option1">
                        <label class="form-check-label" for="inlineMonday">Tất cả</label>
                    </div>
                    <multiselect v-model="optionsRunTypeSelected" :options="optionsRunType" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn hình thức" label="name" track-by="name">

                    </multiselect>
                </div>
            </div>

    </b-modal>
</template>


