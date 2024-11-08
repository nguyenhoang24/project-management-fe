<script>
import { mapActions } from "vuex";
import Multiselect from "vue-multiselect";

import "vue-multiselect/dist/vue-multiselect.min.css";
import Swal from "sweetalert2";

export default {
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
            optionsEventType: [],
            optionsProvince: [],
            optionsDistrict: [],
            pkgStartDate: "",
            pkgEndDate: "",
            teachersList: [],
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
            apiGetListTeacher: "apiGetListTeacher",
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
            console.log("handleInitData is called");
            this.$nextTick(() => {
                let objInput = { id: 0 };

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
                this.apiGetListTeacher({
                    conditionSearch: "",
                    valueSearch: "",
                }).then((res) => {
                    this.teachersList = res;
                });
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
                    this.apiAddTeacher(this.teacherObj)
                        .then((response) => {
                            console.log("apiAddTeacher", response.err_code);
                            this.$emit("handleGetTeacher");
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
            if (this.teacherObj.fullName === null || this.teacherObj.fullName.trim() === "") {
                this.commonNotifyVue("Bạn phải nhập tên giảng viên", "warn");
                return false;
            }
            if (this.teacherObj.dob === null || this.teacherObj.dob.trim() === "") {
                this.commonNotifyVue("Bạn phải chọn ngày sinh", "warn");
                return false;
            }
            if (this.teacherObj.address === null || this.teacherObj.address.trim() === "") {
                this.commonNotifyVue("Bạn phải chọn địa chỉ", "warn");
                return false;
            }
            if (this.teacherObj.phone === null || this.teacherObj.phone.trim() === "") {
                this.commonNotifyVue("Bạn phải chọn số điện thoại", "warn");
                return false;
            }
            if (this.teacherObj.email === null || this.teacherObj.email.trim() === "") {
                this.commonNotifyVue("Bạn phải chọn email", "warn");
                return false;
            }
            if (this.teacherObj.gender === null || this.teacherObj.gender.trim() === "") {
                this.commonNotifyVue("Bạn phải chọn giới tính", "warn");
                return false;
            }
            // Giả sử bạn có danh sách giảng viên hiện tại trong biến teachersList
            let existingTeacher = this.teachersList.find((teacher) => teacher.email === this.teacherObj.email || teacher.phone === this.teacherObj.phone);

            if (existingTeacher) {
                this.commonNotifyVue("Giảng viên đã tồn tại", "warn");
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
    <b-modal id="modal-add-event" size="lg" :title="modalTitle" title-class="font-18" hide-footer @cancel="flagModal = false" @show="handleInitData">
        <div class="row pb-3">
            <div class="col-6">
                <label>Tên Giảng Viên</label>
                <input type="text" maxlength="200" v-model="teacherObj.fullName" :disabled="actionType === 3" placeholder="Tên Giảng Viên" class="form-control form-control multiselect__tags" />
            </div>
            <div class="col-6">
                <label>Năm sinh</label>
                <input type="date" v-model="teacherObj.dob" :disabled="actionType === 3" placeholder="Năm sinh" class="form-control form-control multiselect__tags" />
            </div>
        </div>
        <div class="row pb-3">
            <div class="col-6">
                <label>Địa chỉ</label>
                <input type="text" maxlength="200" v-model="teacherObj.address" :disabled="actionType === 3" placeholder="Địa chỉ" class="form-control form-control multiselect__tags" />
            </div>
            <div class="col-6">
                <label>Giới tính</label>
                <select v-model="teacherObj.gender" :disabled="actionType === 3 || actionType === 2" class="form-control form-control multiselect__tags">
                    <option value="0">Nữ</option>
                    <option value="1">Nam</option>
                    <option value="2">Không xác định</option>
                </select>
            </div>
        </div>
        <div class="row pb-3">
            <div class="col-6">
                <label>Số điện thoại</label>
                <input type="text" maxlength="200" v-model="teacherObj.phone" :disabled="actionType === 3" placeholder="Số điện thoại" class="form-control form-control multiselect__tags" />
            </div>
            <div class="col-6">
                <label>Email</label>
                <input type="text" maxlength="200" v-model="teacherObj.email" :disabled="actionType === 3" placeholder="Email" class="form-control form-control multiselect__tags" />
            </div>
        </div>
        <!-- end card-body -->
        <div class="text-end mt-4">
            <button type="button" class="btn btn-default" @click="closeModal">Bỏ qua</button>
            <button type="button" class="btn btn-primary px-4" @click="addEvent">Lưu</button>
        </div>
    </b-modal>
</template>
