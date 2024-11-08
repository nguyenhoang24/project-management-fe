<script>

import {mapActions} from "vuex";
import Swal from "sweetalert2";

export default {
    name: "AddAssignment",
    props: {
        idSession: {
            type: Number,
            default: 0
        },

        actionType: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            fileUpload: null,
            blacklistData: {
                name: ''

            },
            json_fields: {
                'Số điện thoại': 'modalMsisdn',
                'Lỗi': 'error',
            },
            json_data: [],
        }
    },

    methods: {
        ...mapActions('assign/assignment', {
            apiImportAssignment: 'apiImportAssignment'
        }),
        addListSub() {
            let formData = new FormData();
            if (this.fileUpload === null) {
                this.commonNotifyVue('Bạn phải chọn file chứa danh sách thuê bao', 'warn');
            } else {
                formData.append('fileExcel', this.fileUpload);
                formData.append('session', this.idSession);
                this.apiImportAssignment(formData)
                    .then(response => {
                        if(response.length === 0) {
                            Swal.fire("", "File không hợp lệ", "warning");
                        }
                        this.$emit('handleGetSession');
                        this.$bvModal.hide('modal-add-file-assigment');

                    })
                    .catch(err => {
                        Swal.fire("", "Tải file không thành công", "warning");
                        console.log(err);
                    })
                    .finally(() => {
                        // this.commonLoadingPage(false);
                    });


            }
        },
        closeModalListSub() {
            this.$bvModal.hide('modal-add-file-assigment');
        },
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            console.log('add blacklist onchange file', files);
            if (files != null)
                this.fileUpload = files[0];
        }
    }
}
</script>

<style scoped>

</style>

<template>
    <b-modal id="modal-add-file-assigment" size="lg" title="Tải tập excel" title-class="font-18" hide-footer>
        <div class="card">
            <div class="card-body">

                <export-excel
                    class="btn btn-default"
                    :data="json_data"
                    :fields="json_fields"
                    worksheet="My Worksheet"
                    name="ErrorDetail.xls"
                    v-show="json_data.length>0">

                    Tải file lỗi

                </export-excel>
                <div class="row mb-3">
                    <div class="col-12">
                        <label v-show="actionType===1">Tên tập TB</label>
                        <input type="text" v-show="actionType===1" maxlength="150" v-model="blacklistData.name" class="form-control"/>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-12">
                        <label>File chứa sinh viên</label>
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


