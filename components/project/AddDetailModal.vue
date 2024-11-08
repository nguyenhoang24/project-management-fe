<script>
import {mapActions} from "vuex";
import Multiselect from "vue-multiselect";

import "vue-multiselect/dist/vue-multiselect.min.css";
import Swal from "sweetalert2";
import {getAccessToken} from "@/utils/cookieAuthen";

export default {
    name: "AddDetailModal",
    props: {
        idDetail: {
            type: Number,
            default: 0
        },
        idProject: {
            type: Number,
            default: 0
        },
        actionType: {
            type: Number,
            default: 0
        },
        role: {
            type: String,
            default: ''
        },
    },
    watch: {
        // 'flagModal'() {
        //     console.log('watch actionType', this.flagModal);
        //     this.handleInitData();
        // }
    },
    data() {
        return {
            detailObj: {
                id: -1,
                title: '',
                status: '',
                comment: '',
                reportFile: '',
                startDate: '',
                endDate: '',
                project: {
                    id: 0
                },
            },
            modalTitle: '',
            optionClass: [],
            objClass: [],
            editorConfig: {
                removePlugins: ['Title'],
                simpleUpload: {
                    uploadUrl: 'http://localhost:8088/file/upload',
                    headers: {
                        'Authorization': 'Bearer ' + getAccessToken()
                    },
                }
            },
        }
    },
    components: {
        Multiselect,
        'ckeditor-nuxt': () => {
            if (process.client) {
                return import('@blowstack/ckeditor-nuxt')
            }
        },
    },
    updated() {

    },
    methods: {
        ...mapActions('project', {
            apiAddProjectDetail: 'apiAddProjectDetail',
            apiEditProjectDetail: 'apiEditProjectDetail',
            apiGetProjectDetail: 'apiGetProjectDetail',
            apiGetDetailById: 'apiGetDetailById',

        }),
        resetForm() {
            this.detailObj = {
                id: -1,
                title: '',
                status: '',
                comment: '',
                reportFile: '',
                startDate: '',
                endDate: '',
                project: {
                    id: 0
                },
            };

        },
        handleInitData() {
            this.$nextTick(() => {
                console.log('handleInitData', this.role);
                // alert(this.actionType);
                if (this.actionType === 1) {
                    this.modalTitle = 'Thêm chi tiết';
                    this.resetForm();
                } else if (this.actionType === 2 || this.actionType === 3) {
                    if (this.actionType === 2)
                        this.modalTitle = 'Sửa chi tiết';
                    else if (this.actionType === 3)
                        this.modalTitle = 'Xem thông tin chi tiết';
                    this.apiGetDetailById(this.idDetail).then(response => {
                        this.detailObj.id = response.id;
                        this.detailObj.title = response.title;
                        this.detailObj.startDate = response.startDate;
                        this.detailObj.endDate = response.endDate;
                        this.detailObj.comment = response.comment === null ? "" : response.comment;
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
        addDetail() {
            let optionEvent = '';
            let ids = [];
            if (this.checkDataInput()) {

                this.detailObj.title = this.detailObj.title.replaceAll('\n', '<br/>');
                if (this.actionType === 2) {
                    this.detailObj.project.id = this.idProject;
                    this.apiEditProjectDetail(this.detailObj)
                        .then(response => {
                            this.$emit('handleGetProjectDetail');
                            this.$bvModal.hide('modal-add-detail-project');
                        })
                        .catch(err => {
                            console.log(err);
                        })
                        .finally(() => {
                            // this.commonLoadingPage(false);
                        });
                }
                if (this.actionType === 1) {
                    this.detailObj.project.id = this.idProject;
                    this.apiAddProjectDetail(this.detailObj)
                        .then(response => {
                            this.$emit('handleGetProjectDetail');
                            Swal.fire("", "Thêm chi tiết thành công", "success");

                            this.$bvModal.hide('modal-add-detail-project');
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
        closeModal() {
            this.$bvModal.hide('modal-add-detail-project');
        },
        checkDataInput() {
            if (this.detailObj.title === null || this.detailObj.title.trim() === '') {
                this.commonNotifyVue("Bạn phải nhập nội dung", 'warn');
                return false;
            }

            if (this.detailObj.endDate === null) {
                this.commonNotifyVue("Bạn phải nhập ngày kết thúc", 'warn');
                return false;
            }
            if (this.detailObj.startDate === null) {
                this.commonNotifyVue("Bạn phải nhập ngày bắt đầu", 'warn');
                return false;
            }
            if (this.role === 'TEACHER' && this.detailObj.comment === null) {
                this.commonNotifyVue("Bạn phải nhập nội dung đánh giá", 'warn');
                return false;
            }

            return true;
        },
    }
}
</script>

<style scoped>

</style>

<template>

    <b-modal id="modal-add-detail-project"
             size="lg" :title="modalTitle"
             title-class="font-18" hide-footer
             @show="handleInitData"
    >

        <div class="row pb-3">
            <div class="col-12">
                <label>Nội dung</label>
                <textarea id="txtArea" type="text" maxlength="200" v-model="detailObj.title" :disabled="actionType===3 || role==='ROLE_TEACHER'" placeholder="Nội dung" class="form-control form-control multiselect__tags"/>
            </div>
        </div>
        <div class="row pb-3">
            <div class="col-6">
                <label>Ngày bắt đầu</label>
                <input type="date" v-model="detailObj.startDate" :disabled="actionType===3 || role==='ROLE_TEACHER'" class="form-control form-control multiselect__tags"/>
            </div>
            <div class="col-6">
                <label>Ngày kết thúc</label>
                <input type="date" v-model="detailObj.endDate" :disabled="actionType===3 || role==='ROLE_TEACHER'" class="form-control form-control multiselect__tags"/>
            </div>
        </div>
        <div class="row pb-3" :hidden="role!=='ROLE_TEACHER'">
            <div class="col-12">
                <label>Nhận xét</label>
                <client-only placeholder="loading..." :hidden="role!=='ROLE_TEACHER'" :disabled="actionType===3">
                    <ckeditor-nuxt v-model="detailObj.comment" :config="editorConfig"/>
                </client-only>
                <!--                <textarea  type="text" maxlength="200" v-model="detailObj.comment"  placeholder="Nhận xét" class="form-control form-control multiselect__tags"/>-->
            </div>
        </div>
        <!-- end card-body -->
        <div class="text-end mt-4">
            <button type="button" class="btn btn-default" @click="closeModal">Bỏ qua</button>
            <button type="button" class="btn btn-primary px-4" @click="addDetail">Lưu</button>
        </div>
    </b-modal>
</template>


