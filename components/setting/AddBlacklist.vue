<script>

import vue2Dropzone from "vue2-dropzone";
import {mapActions} from "vuex";
export default {
    name: "AddBlacklist",
    components: {
        vueDropzone: vue2Dropzone
    },
    props: ['actionType','blacklistIdEdit'],
    data(){ return{
        fileUpload: null,
        blacklistData: {
            name: ''

        },
        dropzoneOptions: {
            url: "https://httpbin.org/post",
            thumbnailWidth: 150,
            maxFilesize: 0.5,
            maxFiles:1,
            headers: {
                "My-Awesome-Header": "header value"
            }
        },json_fields: {
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
        fileUploaded(file, res){
            this.fileUpload = file;
            console.log(file);
        },
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

                <!-- file upload -->
                <div class="card">
                    <div class="card-body">
                        <vue-dropzone id="dropzone" ref="myVueDropzone"
                                      @vdropzone-success="fileUploaded"
                                      :use-custom-slot="true" :options="dropzoneOptions">
                            <div class="dropzone-custom-content">
                                <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                                <h4>Thả files vào đây hoặc kích nút upload.</h4>
                            </div>
                        </vue-dropzone>
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


