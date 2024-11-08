 <script>

import {mapActions} from "vuex";
export default {
    name: "AddBlacklist",
    props: ['actionType','blacklistIdEdit'],
    data(){ return{
        fileUpload: null,
        blacklistData: {
            name: ''

        },
        json_fields: {
            'Số điện thoại': 'modalMsisdn',
            'Lỗi' : 'error',
        },
        json_data: [],
    }},
    methods:{
        ...mapActions('setting/blacklist', {

            apiAddBlacklist: 'apiAddBlacklist',
            apiEditBlacklist:'apiEditBlacklist'
        }),
        addListSub() {
            this.errorValidate=[];
            let formData = new FormData();
            if(this.fileUpload ===null){
                this.commonNotifyVue('Bạn phải chọn file chứa danh sách thuê bao','warn');
            }else{
                formData.append('fileExcel', this.fileUpload);
                if(this.actionType===1){
                    if((this.blacklistData.name===null) || (this.blacklistData.name==='')){
                        this.commonNotifyVue('Bạn phải nhập tên tệp','warn');
                    }else{
                        formData.append('payload', JSON.stringify(this.blacklistData));
                        this.apiAddBlacklist(formData)
                            .then(response => {
                                console.log('apiAddBlacklist', response);
                                if (response.err_code === 0) {

                                    this.$emit('handleModalCall');
                                    this.$bvModal.hide('modal-add-file-blacklist');
                                } else {
                                    this.commonWarningVue(response.err_message);
                                    if(response.err_code === 2){
                                        this.json_data = response.dataError;
                                        console.log('Data insert error', response.dataError);
                                    }
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                            .finally(() => {
                                // this.commonLoadingPage(false);
                            });
                    }

                }else{
                    let blacklistEditData={id:this.blacklistIdEdit};
                    console.log('blacklistEditData',blacklistEditData);
                    formData.append('payload', JSON.stringify(blacklistEditData));
                    this.apiEditBlacklist(formData)
                        .then(response => {
                            console.log('apiEditBlacklist', response);
                            if (response.err_code === 0) {
                                this.$emit('handleModalCall');
                                this.$bvModal.hide('modal-add-file-blacklist');
                            }else {
                                this.commonWarningVue(response.err_message);
                                if(response.err_code === 2){
                                    this.json_data = response.dataError;
                                    console.log('Data insert error', this.json_data);
                                }
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
        closeModalListSub() {
            this.$bvModal.hide('modal-add-file-blacklist');
        },
        onFileChange(e){
            let files =e.target.files || e.dataTransfer.files;
            console.log('add blacklist onchange file',files);
            if(files!=null)
                this.fileUpload = files[0];
        }
    }
}
</script>

<style scoped>

</style>

<template>
    <b-modal id="modal-add-file-blacklist" size="lg" title="Tải tập TB" title-class="font-18" hide-footer>
        <div class="card">
            <div class="card-body">

                <export-excel
                    class   = "btn btn-default"
                    :data   = "json_data"
                    :fields = "json_fields"
                    worksheet = "My Worksheet"
                    name    = "ErrorDetail.xls"
                    v-show="json_data.length>0">

                    Tải file lỗi

                </export-excel>
                <div class="row mb-3">
                    <div class="col-12">
                        <label v-show="actionType==1">Tên tập TB</label>
                        <input type="text" v-show="actionType==1" maxlength="150" v-model="blacklistData.name" class="form-control"/>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-12">
                        <label>File chứa thuê bao</label>
                        <input type="file" @change="onFileChange" class="form-control">
                    </div>
                </div>

            </div>
            <div class="card-footer text-end">
                <button type="button" class="btn btn-primary" @click="closeModalListSub">Bỏ qua</button>
                <button type="button" class="btn btn-success" @click="addListSub"><i class="uil uil-save me-1"></i> Lưu lại</button>

            </div>
            <!-- end card-body -->
        </div>
    </b-modal>
</template>


