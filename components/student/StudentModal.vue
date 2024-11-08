<script>
import { mapActions } from "vuex";
import Multiselect from "vue-multiselect";

import "vue-multiselect/dist/vue-multiselect.min.css";
import Swal from "sweetalert2";

export default {
    name: "StudentModal",
    props: {
        idStudent: {
            type: Number,
            default: 0,
        },
        actionType: {
            type: Number,
            default: 0,
        },
        code: {
            type: String,
            default: "",
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
            studentObj: {
                id: -1,
                code: "",
                name: "",
                dob: this.$moment().format("YYYY-MM-DD"),
                gender: "",
                phone: "",
                email: "",
                address: "",
                studentClass: {
                    id: "",
                    course: "",
                    name: "",
                },
            },
            modalTitle: "",
            optionClass: [],
            objClass: [],
            studentsList: [],
        };
    },
    components: {
        Multiselect,
    },
    updated() {},
    methods: {
        ...mapActions("admin/students", {
            apiAddStudent: "apiAddStudent",
            apiEditStudent: "apiEditStudent",
            apiGetStudent: "apiGetStudent",
            apiGetStudentClass: "apiGetStudentClass",
        }),
        resetForm() {
            this.studentObj = {
                id: -1,
                code: "",
                studentClass: {
                    id: "",
                    course: "",
                    name: "",
                },
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
                console.log("handleInitData", this.idStudent);
                let objInput = { id: 0 };
                this.apiGetStudentClass({
                    conditionSearch: "",
                    valueSearch: "",
                }).then((response) => {
                    this.optionClass = response;
                });
                // alert(this.actionType);
                if (this.actionType === 1) {
                    this.modalTitle = "Thêm Sinh viên";
                    this.resetForm();
                } else if (this.actionType === 2 || this.actionType === 3) {
                    if (this.actionType === 2) this.modalTitle = "Sửa Sinh viên";
                    else if (this.actionType === 3) this.modalTitle = "Xem thông tin Sinh viên";
                    this.apiGetStudent({
                        conditionSearch: "ID",
                        valueSearch: this.idStudent,
                    })
                        .then((response) => {
                            this.studentObj = response[0];
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                        .finally(() => {
                            // this.commonLoadingPage(false);
                        });
                }
                this.apiGetStudent({
                    conditionSearch: "",
                    valueSearch: "",
                }).then((res) => {
                    this.studentsList = res;
                });
            });
        },
        addStudent() {
            let optionEvent = "";
            let ids = [];
            if (this.checkDataInput()) {
                // console.log('addEvent', this.callOptionsSelected);
                //     if (this.studentObj.dataType === 'call') {
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
                    console.log("before edit: ", this.studentObj);
                    this.apiEditStudent(this.studentObj)
                        .then((response) => {
                            console.log("apiEditStudent", response);
                            this.$emit("handleGetStudent");
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
                    this.apiAddStudent(this.studentObj)
                        .then((response) => {
                            console.log("apiAddStudent", response.err_code);
                            this.$emit("handleGetStudent");
                            Swal.fire("", response.err_message, "success");

                            this.$bvModal.hide("modal-add-event");
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                        .finally(() => {
                            // this.commonLoadingPage(false);
                        });
                }
            }
        },
        closeModal() {
            this.$bvModal.hide("modal-add-event");
        },
        checkDataInput() {
            if (this.studentObj.fullName === null || this.studentObj.fullName.trim() === "") {
                this.commonNotifyVue("Bạn phải nhập tên sinh viên", "warn");
                return false;
            }

            if (this.studentObj.code === null || this.studentObj.code.trim() === "") {
                this.commonNotifyVue("Bạn phải nhập mã sinh viên", "warn");
                return false;
            }
            if (this.studentObj.email === null || this.studentObj.email.trim() === "") {
                this.commonNotifyVue("Bạn phải chọn email", "warn");
                return false;
            }
            if (this.studentObj.gender === null) {
                this.commonNotifyVue("Bạn phải chọn giới tính", "warn");
                return false;
            }
            let existingStudent = this.studentsList.find((student) => student.code === this.studentObj.code || student.phone === this.studentObj.phone);

            if (existingStudent) {
                this.commonNotifyVue("Sinh viên đã tồn tại", "warn");
                return false;
            }

            return true;
        },
        onChangeDataSource() {
            this.eventObj.dataType = "";
            if (this.eventObj.dataSource === "tapping") {
                this.optionsEventType = [
                    { value: "call", text: "CALL" },
                    { value: "ussd", text: "USSD" },
                ];
                this.eventObj.dataType = "call";
            } else if (this.eventObj.dataSource === "ccsp") {
                this.optionsEventType = [{ value: "package", text: "Gói cước" }];
                this.eventObj.dataType = "package";
            } else if (this.eventObj.dataSource === "lbs") {
                this.optionsEventType = [{ value: "sub_location", text: "Vị trí thuê bao" }];
                this.eventObj.dataType = "sub_location";
            }
        },
        onChangeProvince() {
            console.log("onChangeProvince", this.provinceOptionsSelected);
            let objInput = { provinces: this.provinceOptionsSelected };
            this.apiGetListDistrict(objInput)
                .then((response) => {
                    let data = response["data"];
                    this.optionsDistrict = data;
                    console.log("apiGetListDistrict1", data);
                    if (response.err_code === 0) {
                    } else {
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    // this.commonLoadingPage(false);
                });
        },
    },
};
</script>

<style scoped></style>

<template>
    <b-modal id="modal-add-event" size="lg" :title="modalTitle" title-class="font-18" hide-footer @show="handleInitData">
        <div class="row pb-3">
            <div class="col-6">
                <label>Tên Sinh Viên</label>
                <input type="text" maxlength="200" v-model="studentObj.fullName" :disabled="actionType === 3" placeholder="Tên Sinh Viên" class="form-control form-control multiselect__tags" />
            </div>
            <div class="col-6">
                <label>Năm sinh</label>
                <input type="date" v-model="studentObj.dob" :disabled="actionType === 3" placeholder="Năm sinh" class="form-control form-control multiselect__tags" />
            </div>
        </div>
        <div class="row pb-3">
            <div class="col-6">
                <label>Mã Sinh Viên</label>
                <input type="text" maxlength="200" v-model="studentObj.code" :disabled="actionType === 3" placeholder="Mã Sinh Viên" class="form-control form-control multiselect__tags" />
            </div>
            <div class="col-6">
                <label>Lớp</label>
                <select v-model="studentObj.studentClass.id" :disabled="actionType === 3" class="form-control">
                    <option v-for="option in optionClass" :value="option.id">
                        {{ option.name + " K" + option.course }}
                    </option>
                </select>
            </div>
        </div>
        <div class="row pb-3">
            <div class="col-6">
                <label>Địa chỉ</label>
                <input type="text" maxlength="200" v-model="studentObj.address" :disabled="actionType === 3" placeholder="Địa chỉ" class="form-control form-control multiselect__tags" />
            </div>
            <div class="col-6">
                <label>Giới tính</label>
                <select v-model="studentObj.gender" :disabled="actionType === 3" class="form-control form-control multiselect__tags">
                    <option value="0">Nữ</option>
                    <option value="1">Nam</option>
                    <option value="2">Không xác định</option>
                </select>
            </div>
        </div>
        <div class="row pb-3">
            <div class="col-6">
                <label>Số điện thoại</label>
                <input type="text" maxlength="200" v-model="studentObj.phone" :disabled="actionType === 3" placeholder="Số điện thoại" class="form-control form-control multiselect__tags" />
            </div>
            <div class="col-6">
                <label>Email</label>
                <input type="text" maxlength="200" v-model="studentObj.email" :disabled="actionType === 3" placeholder="Email" class="form-control form-control multiselect__tags" />
            </div>
        </div>
        <!-- end card-body -->
        <div class="text-end mt-4">
            <button type="button" class="btn btn-default" @click="closeModal">Bỏ qua</button>
            <button type="button" class="btn btn-primary px-4" @click="addStudent">Lưu</button>
        </div>
    </b-modal>
</template>
