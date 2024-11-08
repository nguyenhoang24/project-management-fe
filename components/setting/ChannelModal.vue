
<script>
import {mapActions} from "vuex";
export default {
    name: "ChannelModal",
    props: ['channelFlagModal', 'channelActionType','channelEditId'],
    watch: {

        'channelFlagModal'() {
            console.log('watch channelFlagModal', this.channelFlagModal);
            this.handleInitData();
        }
    },
    data(){
        return{
            channelObj:{
                id:-1,
                name: '',
                channelGroup: '',
                prefixBrand: '',
                status: '1',
                zaloOaId:'',
                zaloOaName:'',
                zaloOaSecret:'',
                zaloAppId:'',
                zaloAppSecret:'',
                zaloRefreshToken:''
            },
            channelModalTitle:''
        }
    },
    updated() {


    },
    methods:{
        ...mapActions('setting/channel', {
            apiAddChannel:'apiAddChannel',
            apiEditChannel:'apiEditChannel',
            apiGetChannelById:'apiGetChannelById'
        }),
        handleInitData() {
            this.resetData();
            this.$nextTick(() => {
                console.log('handleInitData', this.channelActionType);
                if(this.channelActionType===1){
                    this.channelModalTitle='Thêm kênh';
                }else if(this.channelActionType===2 || this.channelActionType===3){
                    let objInput={id:this.channelEditId};
                    if(this.channelActionType===2)
                        this.channelModalTitle='Sửa kênh';
                    else if(this.channelActionType===3)
                        this.channelModalTitle='Xem thông tin kênh';
                    this.apiGetChannelById(objInput)
                        .then(response => {
                            if (response.err_code === 0) {
                                let data = response['data'];
                                this.channelObj=data;
                                console.log('apiGetChannelById',data);
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
            });
        },
        addChannel(){
            if(this.checkInputData()){
                if(this.channelActionType ===2){
                    this.channelObj.id=this.channelEditId;
                    this.apiEditChannel(this.channelObj)
                        .then(response => {
                            console.log('apiEditChannel', response);
                            if (response.err_code === 0) {
                                this.$emit('handleAfterAction');
                                this.$bvModal.hide('modal-add-channel');
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
                }else if(this.channelActionType ===1){
                    this.apiAddChannel(this.channelObj)
                        .then(response => {
                            console.log('apiAddChannel', response);
                            if (response.err_code === 0) {
                                this.$emit('handleAfterAction');
                                this.$bvModal.hide('modal-add-channel');
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
        checkInputData(){
            if (this.channelObj.name===null || this.channelObj.name.trim()===''){
                this.commonNotifyVue('Vui lòng nhập Tên kênh','warn');
                return false;
            }
            if (this.channelObj.channelGroup===null || this.channelObj.channelGroup.trim()===''){
                this.commonNotifyVue('Vui lòng chọn Nhóm kênh','warn');
                return false;
            }
            if(this.channelObj.channelGroup!=='ZALO'){
                if(this.channelObj.prefixBrand === null || this.channelObj.prefixBrand.trim()===''){
                    this.commonNotifyVue('Vui lòng nhập Đầu số QC/Brandname QC','warn');
                    return false;
                }else{
                    if(this.channelObj.channelGroup==='USSD'){
                        if(isNaN(this.channelObj.prefixBrand)){
                            this.commonNotifyVue('Đầu số QC/Brandname QC phải là số','warn');
                            return false;
                        }
                    }
                }
            }else{
                if (this.channelObj.zaloOaId===null || this.channelObj.zaloOaId.trim()===''){
                    this.commonNotifyVue('Vui lòng nhập ID của OA','warn');
                    return false;
                }
                if (this.channelObj.zaloOaName===null || this.channelObj.zaloOaName.trim()===''){
                    this.commonNotifyVue('Vui lòng nhập Tên của OA','warn');
                    return false;
                }
                if (this.channelObj.zaloOaSecret===null || this.channelObj.zaloOaSecret.trim()===''){
                    this.commonNotifyVue('Vui lòng nhập Khóa bí mật của OA','warn');
                    return false;
                }
                if (this.channelObj.zaloAppId===null || this.channelObj.zaloAppId.trim()===''){
                    this.commonNotifyVue('Vui lòng nhập ID ứng dụng','warn');
                    return false;
                }
                if (this.channelObj.zaloAppSecret===null || this.channelObj.zaloAppSecret.trim()===''){
                    this.commonNotifyVue('Vui lòng nhập Khóa bí mật ứng dụng','warn');
                    return false;
                }
                if (this.channelObj.zaloRefreshToken===null || this.channelObj.zaloRefreshToken.trim()===''){
                    this.commonNotifyVue('Vui lòng nhập Refresh Token','warn');
                    return false;
                }
            }
            return true;
        },
        resetData(){
            this.channelObj={
                    id:-1,
                    name: '',
                    channelGroup: '',
                    prefixBrand: '',
                    status: '1',
                    zaloOaId:'',
                    zaloOaName:'',
                    zaloOaSecret:'',
                    zaloAppId:'',
                    zaloAppSecret:'',
                    zaloRefreshToken:''
            }
        },
        closeModal(){
            this.$bvModal.hide('modal-add-channel');
        }
    }
}
</script>

<style scoped>

</style>

<template>
    <b-modal id="modal-add-channel" size="xl" :title="channelModalTitle" title-class="font-18" hide-footer @cancel="channelFlagModal = false" @show="handleInitData">
        <div class="row pb-3">
            <div class="col-12 col-sm-12">
                <label>Tên kênh</label>
                <input type="text" maxlength="150" v-model="channelObj.name" :disabled="channelActionType===3" placeholder="Tên kênh" class="form-control form-control multiselect__tags"/>
            </div>
        </div>
        <div class="row pb-3">
            <div class="col-12 col-sm-12">
                <label>Nhóm kênh</label>
                <select v-model="channelObj.channelGroup"  :disabled="channelActionType===3 || channelActionType===2" class="form-control">
                    <option value="SMS">SMS</option>
                    <option value="USSD">USSD</option>
                    <option value="AVB">AVB</option>
                    <option value="ZALO">ZALO</option>
                </select>
            </div>
        </div>
        <div class="row pb-3" v-show="channelObj.channelGroup!=='ZALO'">
            <div class="col-12 col-sm-12">
                <label>Đầu số QC/ Brandname QC</label>
                <input type="text" maxlength="100" v-model="channelObj.prefixBrand" class="form-control"/>
            </div>
        </div>
        <div class="row pb-3" v-show="channelObj.channelGroup==='ZALO'">
            <div class="col-6 col-sm-6">
                <label>ID của OA</label>
                <input type="text" maxlength="100" v-model="channelObj.zaloOaId" :disabled="channelActionType===3 || channelActionType===2" class="form-control"/>
                <label>Tên của OA</label>
                <input type="text" maxlength="150" v-model="channelObj.zaloOaName" :disabled="channelActionType===3" class="form-control"/>
                <label>Khóa bí mật của OA</label>
                <input type="text" maxlength="100" v-model="channelObj.zaloOaSecret" :disabled="channelActionType===3" class="form-control"/>
            </div>
            <div class="col-6 col-sm-6">
                <label>ID của ứng dụng</label>
                <input type="text" maxlength="100" v-model="channelObj.zaloAppId" :disabled="channelActionType===3" class="form-control"/>
                <label>Khóa bí mật của ứng dụng</label>
                <input type="text" maxlength="100" v-model="channelObj.zaloAppSecret" :disabled="channelActionType===3" class="form-control"/>
            </div>
        </div>
        <div class="row pb-3" v-show="channelObj.channelGroup==='ZALO'">
            <div class="col-12">
                <label>Refresh Token</label>
                <input type="text" maxlength="300" v-model="channelObj.zaloRefreshToken" :disabled="channelActionType===3" class="form-control"/>
            </div>
        </div>
        <div class="row pb-3" v-show="channelActionType===2 || channelActionType===3">
            <div class="col-12 col-sm-12">
                <label>Trạng thái</label>
                <select v-model="channelObj.status"  :disabled="channelActionType===3" class="form-control">
                    <option value="0">Offline</option>
                    <option value="1">Online</option>
                    <option value="2">Tạm dừng</option>
                </select>
            </div>
        </div>

        <!-- end card-body -->
        <div class="text-end mt-4">
            <button type="button" class="btn btn-default" @click="closeModal">Bỏ qua</button>
            <button type="button" class="btn btn-primary px-4" @click="addChannel">Lưu</button>
        </div>
    </b-modal>
</template>


