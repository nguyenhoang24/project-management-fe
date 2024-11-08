<script>
import { mapActions } from "vuex";
import Multiselect from "vue-multiselect";

import "vue-multiselect/dist/vue-multiselect.min.css";
import Swal from "sweetalert2";
import { getUserInfo } from "@/utils/cookieAuthen";

export default {
    middleware: ["check-authen"],
    name: "TeacherModal",
    props: {
        idTeacher: {
            type: Number,
            default: 0,
        },
        actionType: {
            type: Number,
            default: 0,
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
            pkgStartDate: "",
            pkgEndDate: "",
            objProject: {
                id: 0,
                name: "",
                student: {
                    id: 0,
                    name: "",
                },
                teacher: {
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
    },
    updated() {},
    methods: {
        ...mapActions("teachers", {
            apiAddTeacher: "apiAddTeacher",
            apiEditTeacher: "apiEditTeacher",
            apiGetTeacherById: "apiGetTeacherById",
        }),
        ...mapActions("topic", {
            apiGetTopic: "apiGetTopic",
        }),
        ...mapActions("project", {
            apiAddProject: "apiAddProject",
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
                console.log("handleInitData", this.idTeacher);
                let objInput = { id: 0 };
                this.apiGetTopic({
                    conditionSearch: "",
                    valueSearch: "",
                }).then((response) => {
                    this.optionTopic = response;
                });
                // alert(this.actionType);
                if (this.actionType === 1) {
                    this.modalTitle = "Thêm Event";
                    this.resetForm();
                } else if (this.actionType === 2 || this.actionType === 3) {
                    objInput = { id: this.idTeacher };
                    if (this.actionType === 2) this.modalTitle = "Sửa Event";
                    else if (this.actionType === 3) this.modalTitle = "Xem thông tin Event";
                    this.apiGetTeacherById(objInput)
                        .then((response) => {
                            this.teacherObj = response;
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                        .finally(() => {
                            // this.commonLoadingPage(false);
                        });
                }
            });
        },
        addEvent() {
            let optionEvent = "";
            let ids = [];
            if (this.checkDataInput()) {
                // console.log('addEvent', this.callOptionsSelected);
                //     if (this.teacherObj.dataType === 'call') {
                //         for (let i = 0; i < this.callOptionsSelected.length; i++) {
                //             ids.push(this.callOptionsSelected[i].value);
                //         }
                //         if (this.callOptionsSelected.length > 1) {
                //             optionEvent = ids.join(',') + ';time_wait:' + this.timeWaitCall;
                //         } else {
                //             optionEvent = ids.join(',');
                //         }
                //     } else if (this.eventObj.dataType === 'ussd') {
                //         optionEvent = this.ussdType + "," + this.ussdValue;
                //     } else if (this.eventObj.dataType === 'package') {
                //         optionEvent = 'pkg_code:' + this.pkgCode + ',pkg_capacity:' + this.pkgCapacity + ',pkg_warning:' + this.pkgWarning + ',pkg_startdate:' + this.pkgStartDate + ',pkg_enddate:' + this.pkgEndDate;
                //     } else if (this.eventObj.dataType === 'sub_location') {
                //         let provinceIds = [];
                //         let proIds = '';
                //
                //         for (let i = 0; i < this.provinceOptionsSelected.length; i++) {
                //             provinceIds.push(this.provinceOptionsSelected[i].id);
                //         }
                //         proIds = provinceIds.join(',');
                //         let districtIds = [];
                //         let distIds = '';
                //         for (let j = 0; j < this.districtOptionsSelected.length; j++) {
                //             districtIds.push(this.districtOptionsSelected[j].id);
                //         }
                //         distIds = districtIds.join(',');
                //         optionEvent = 'provinces:' + proIds + ';districts:' + distIds;
                //
                //     }
                //     console.log('addEvent', optionEvent);
                //     this.eventObj.eventOption = optionEvent;
                if (this.actionType === 2) {
                    this.teacherObj.id = this.idTeacher;
                    this.apiEditTeacher(this.teacherObj)
                        .then((response) => {
                            console.log("apiEditTeacher", response);
                            this.$emit("handleGetTeacher");
                            this.$bvModal.hide("modal-add-event");
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                        .finally(() => {
                            // this.commonLoadingPage(false);
                        });
                }
                if (this.actionType === 1) {
                    this.objProject.teacher.id = JSON.parse(getUserInfo()).teacherId;
                    this.objProject.student.id = JSON.parse(getUserInfo()).studentId;
                    this.objProject.session.id = JSON.parse(getUserInfo()).session;
                    this.objProject.status = 0;
                    this.apiAddProject(this.objProject)
                        .then((response) => {
                            // this.$emit("handleGetTeacher");
                            Swal.fire("Thành công", "Thêm mới đồ án thành công", "success");

                            this.$bvModal.hide("modal-add-event");
                            location.reload();
                        })
                        .catch((err) => {
                            console.log("Error response:", err);
                            if (err.toString().includes("400")) {
                                Swal.fire("Thêm thất bại", "Bạn đã có đồ án, không thể thêm mới", "error");
                            }
                            if (err.toString().includes("403")) {
                                Swal.fire("Thêm thất bại", "Đồ án bạn chọn đã có trong hệ thống năm 2024, vui lòng chọn đề tài khác", "error");
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
            this.$bvModal.hide("modal-add-project");
        },
        checkDataInput() {
            if (this.objProject.name === null || this.objProject.name.trim() === "") {
                this.commonNotifyVue("Bạn phải nhập tên giảng viên", "warn");
                return false;
            }
            return true;
        },
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files != null) this.fileUpload = files[0];
        },
    },
};
</script>

<style scoped></style>

<template>
    <b-modal id="modal-add-project" size="lg" :title="modalTitle" title-class="font-18" hide-footer @cancel="flagModal = false" @show="handleInitData">
        <div class="row pb-3">
            <div class="col-12">
                <label>Tên Đề tài</label>
                <input type="text" maxlength="200" v-model="objProject.name" :disabled="actionType === 3" placeholder="Tên đề tài" class="form-control form-control multiselect__tags" />
            </div>
        </div>
        <div class="row pb-3">
            <div class="col-12">
                <label>Chủ đề</label>
                <select v-model="objProject.topic.id" :disabled="actionType === 3" class="form-control">
                    <option v-for="option in optionTopic" :value="option.id">
                        {{ option.name }}
                    </option>
                </select>
            </div>
        </div>
        <!-- end card-body -->
        <div class="text-end mt-4">
            <button type="button" class="btn btn-default" @click="closeModal">Bỏ qua</button>
            <button type="button" class="btn btn-primary px-4" @click="addEvent">Lưu</button>
        </div>
    </b-modal>
</template>
