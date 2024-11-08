<script>

import vue2Dropzone from "vue2-dropzone";
import {mapActions} from "vuex";
export default {
    name: "AddListSub",
    components: {
        vueDropzone: vue2Dropzone
    },
    props: ['actionType','contactGroupIdEdit'],
    data(){ return{
        fileUpload: null,
        contactGroupData: {
            name: '',
            description:''

        },
        dropzoneOptions: {
            url: "https://httpbin.org/post",
            thumbnailWidth: 150,
            maxFilesize: 1,
            maxFiles:1,
            headers: {
                "My-Awesome-Header": "header value"
            }
        },json_fields: {
            'Số điện thoại': 'modalMsisdn',
            'Họ tên': 'modalFullname',
            'Tuổi': 'modalAge',
            'Giới tính' : 'modalSex',
            'Loại thuê bao' : 'modalSubType',
            'ARPU' : 'modalArpu',
            'Tuổi thuê bao' : 'modalAgeSub',
            'Trạng thái' : 'modalStatus',
            'Thiết bị sử dụng' : 'modalDevice',
            'Hành vi, sở thích' : 'modalBehavior',
            'Lỗi' : 'error',
        },
        json_data: [],
    }},
    methods:{
        ...mapActions('contact/contact', {

            apiAddContactGroup: 'apiAddContactGroup',
            apiEditContactGroup:'apiEditContactGroup'
        }),
        fileUploaded(file, res){
            this.fileUpload = file;
            console.log(file);
        },

        addListSub() {
            let formData = new FormData();
            if(this.fileUpload ===null){
                this.commonNotifyVue("Bạn phải chọn file chứa danh sách thuê bao",'warn');
                return;
            }
            formData.append('fileExcel', this.fileUpload);

            if(this.actionType===1){
                if((this.contactGroupData.name===null) || (this.contactGroupData.name==='')){
                    this.commonNotifyVue("Bạn phải nhập tên tệp",'warn');
                    return;
                }
                formData.append('payload', JSON.stringify(this.contactGroupData));
                this.apiAddContactGroup(formData)
                    .then(response => {
                        console.log('apiAddContactGroup', response);
                        if (response.err_code === 0) {
                            this.$emit('handleModalCall');
                            this.$bvModal.hide('modal-add-file-tb');
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
            }else{
                let contactGroupEditData={id:this.contactGroupIdEdit};
                formData.append('payload', JSON.stringify(contactGroupEditData));
                this.apiEditContactGroup(formData)
                    .then(response => {
                        console.log('apiEditContactGroup', response);
                        if (response.err_code === 0) {
                            this.$emit('handleModalCall');
                            this.$bvModal.hide('modal-add-file-tb');
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
        },
        closeModalListSub() {
            this.$bvModal.hide('modal-add-file-tb');
        }
    }
}
</script>

<style scoped>

</style>

<template>
    <b-modal id="modal-add-file-tb" size="lg" title="Tải tập TB" title-class="font-18" hide-footer>
        <div class="card">
            <div class="card-body">
                <div class="row mb-3">
                    <export-excel
                        class   = "btn btn-default"
                        :data   = "json_data"
                        :fields = "json_fields"
                        worksheet = "My Worksheet"
                        name    = "ErrorDetail.xls"
                    v-show="json_data.length>0">

                        Tải file lỗi

                    </export-excel>
                </div>
                <div class="row mb-3">

                    <div class="col-12">
                        <label v-show="actionType==1">Tên tập TB</label>
                        <input type="text" maxlength="150" v-show="actionType==1" v-model="contactGroupData.name" class="form-control"/>
                    </div>
                </div>
                <div class="row mb-3">

                    <div class="col-12">
                        <label v-show="actionType==1">Thông tin khác</label>
                        <input type="text" maxlength="400" v-show="actionType==1" v-model="contactGroupData.description" class="form-control"/>
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
                    </div>0
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


