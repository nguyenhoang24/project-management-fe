<script>
import { mapActions } from "vuex";
import Multiselect from "vue-multiselect";

import "vue-multiselect/dist/vue-multiselect.min.css";
import Swal from "sweetalert2";
import { getUserInfo } from "@/utils/cookieAuthen";
import Autocomplete from "@/components/project/Autocomplete.vue";

export default {
    middleware: ["check-authen"],
    name: "ProjectModal",
    props: {
        idProject: {
            type: Number,
            default: 0,
        },
        actionType: {
            type: Number,
            default: 0,
        },
        students: {
            type: Array,
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
            fileUpload: null,
            items: [
                {
                    text: "Forms",
                    href: "/",
                },
                {
                    text: "Form File Upload",
                    active: true,
                },
            ],
            teacherObj: {
                id: -1,
                name: "",
                dob: this.$moment().format("YYYY-MM-DD"),
                gender: "",
                phone: "",
                email: "",
                address: "",
            },
            modalTitle: "",
            optionTopic: [],
            optionSession: [],
            optionTeacher: [],
            pkgStartDate: "",
            pkgEndDate: "",
            objProject: {
                id: 0,
                name: "",
                student: {
                    id: 0,
                    name: "",
                    code: "",
                },
                teacher: {
                    fullName: "",
                    id: 0,
                },
                session: {
                    id: 0,
                    name: "",
                },
                topic: {
                    id: 0,
                    name: "",
                },
                status: 0,
            },
            projectData: {
                name: "",
            },
        };
    },
    components: {
        Multiselect,
        Autocomplete,
    },
    updated() {},
    methods: {
        ...mapActions("teachers", {
            apiAddTeacher: "apiAddTeacher",
            apiGetListTeacher: "apiGetListTeacher",
            apiEditTeacher: "apiEditTeacher",
            apiGetTeacherById: "apiGetTeacherById",
        }),
        ...mapActions("topic", {
            apiGetTopic: "apiGetTopic",
        }),
        ...mapActions("project", {
            apiAddProject: "apiAddProject",
            apiGetProject: "apiGetProject",
            apiEditProject: "apiEditProject",
        }),
        ...mapActions("assign/session", {
            apiGetSession: "apiGetSession",
        }),
        resetForm() {
            this.teacherObj = {
                id: -1,
                fullName: "",
                dob: "",
                gender: "",
                phone: "",
                email: "",
                address: "",
            };
        },
        handleInitData() {
            this.$nextTick(() => {
                console.log("handleInitData", this.idProject);
                this.apiGetTopic({
                    conditionSearch: "",
                    valueSearch: "",
                }).then((response) => {
                    this.optionTopic = response;
                });
                this.apiGetListTeacher({
                    conditionSearch: "",
                    valueSearch: "",
                }).then((res) => {
                    this.optionTeacher = res;
                });
                this.apiGetSession({
                    conditionSearch: "",
                    valueSearch: "",
                }).then((res) => {
                    this.optionSession = res;
                });
                if (this.idProject !== -1) {
                    this.apiGetProject({
                        valueSearch: this.idProject,
                        conditionSearch: "ID",
                    }).then((res) => {
                        this.objProject = res[0];
                    });
                }
            });
        },
        addProject() {
            let optionEvent = "";
            let ids = [];
            if (this.checkDataInput()) {
                if (this.actionType === 2) {
                    this.apiEditProject(this.objProject)
                        .then((response) => {
                            this.$emit("handleGetProject");
                            this.$bvModal.hide("modal-add-project-admin");
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                        .finally(() => {
                            // this.commonLoadingPage(false);
                        });
                }
                if (this.actionType === 1) {
                    this.objProject.status = 1;
                    this.apiAddProject(this.objProject)
                        .then((response) => {
                            Swal.fire("Thành công", "Thêm mới đồ án thành công", "success");

                            this.$bvModal.hide("modal-add-project-admin");
                            this.$emit("handleGetProject");
                        })
                        .catch((err) => {
                            console.log("Error response:", err);
                            if (err.toString().includes("400")) {
                                Swal.fire("Thêm thất bại", "SInh viên đã có đồ án, không thể thêm mới", "error");
                            }
                            if (err.toString().includes("403")) {
                                Swal.fire("Thêm thất bại", "Đồ án này đã có trong hệ thống năm 2024, vui lòng chọn đề tài khác", "error");
                            }
                            if (err.toString().includes("404")) {
                                Swal.fire("Thêm thất bại", "Mã sinh viên không tồn tại", "error");
                            }
                            console.log(err);
                        })
                        .finally(() => {
                            // this.commonLoadingPage(false);
                        });
                }
            }
        },
        closeModal() {
            this.$bvModal.hide("modal-add-project-admin");
        },
        checkDataInput() {
            if (this.objProject.name === null || this.objProject.name.trim() === "") {
                this.commonNotifyVue("Bạn phải nhập tên đồ án", "warn");
                return false;
            }
            if (this.objProject.topic.id === 0) {
                this.commonNotifyVue("Bạn phải chọn chủ đề", "warn");
                return false;
            }
            if (this.objProject.session.id === 0) {
                this.commonNotifyVue("Bạn phải chọn năm học", "warn");
                return false;
            }
            if (this.objProject.student.code === null || this.objProject.student.code.trim() === "") {
                this.commonNotifyVue("Bạn phải nhập mã sinh viên thực hiện", "warn");
                return false;
            }
            if (this.objProject.teacher.id === 0) {
                this.commonNotifyVue("Bạn phải chọn giảng viên hướng dẫn", "warn");
                return false;
            }
            return true;
        },
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files != null) this.fileUpload = files[0];
        },
        setStudentCode(code) {
            this.objProject.student.code = code;
        },
    },
};
</script>

<style scoped></style>

<template>
    <b-modal id="modal-add-project-admin" size="lg" :title="modalTitle" title-class="font-18" hide-footer @cancel="flagModal = false" @show="handleInitData">
        <div class="row pb-3">
            <div class="col-12">
                <label>Tên Đề tài</label>
                <input type="text" maxlength="200" v-model="objProject.name" :disabled="actionType === 3" placeholder="Tên đề tài" class="form-control form-control multiselect__tags" />
            </div>
        </div>
        <div class="row pb-3">
            <div class="col-6">
                <label>Chủ đề</label>
                <select v-model="objProject.topic.id" :disabled="actionType === 3" class="form-control">
                    <option v-for="option in optionTopic" :value="option.id">
                        {{ option.name }}
                    </option>
                </select>
            </div>
            <div class="col-6">
                <label>Năm học</label>
                <select v-model="objProject.session.id" :disabled="actionType === 3" class="form-control">
                    <option v-for="option in optionSession" :value="option.id">
                        {{ option.year }}
                    </option>
                </select>
            </div>
        </div>
        <div class="row pb-3">
            <div class="col-6">
                <label>Sinh viên thực hiện</label>
                <autocomplete @setStudentCode="setStudentCode" :suggestions="students" :selection="objProject.student.code"></autocomplete>
            </div>
            <div class="col-6">
                <label>Giảng viên hướng dẫn</label>
                <select v-model="objProject.teacher.id" :disabled="actionType === 3" class="form-control">
                    <option v-for="option in optionTeacher" :value="option.id">
                        {{ option.fullName }}
                    </option>
                </select>
            </div>
        </div>

        <!-- end card-body -->
        <div class="text-end mt-4">
            <button type="button" class="btn btn-default" @click="closeModal">Bỏ qua</button>
            <button type="button" class="btn btn-primary px-4" @click="addProject">Lưu</button>
        </div>
    </b-modal>
</template>
