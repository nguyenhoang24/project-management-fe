<script>
import { mapActions } from "vuex";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import StudentModal from "../../components/student/StudentModal.vue";
import AddStudentModal from "../../components/student/AddStudentModal.vue";
import { getUserInfo } from "@/utils/cookieAuthen";

export default {
    middleware: ["check-authen"],
    name: "subscriber",
    components: {
        Multiselect,
        StudentModal,
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
            conditionSearch: "",
            valueSearch: "",
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: "age",
            sortDesc: false,
            fields: [
                {
                    key: "index",
                    label: "STT",
                    sortable: true,
                },
                {
                    key: "code",
                    label: "Mã Sinh Viên",
                    sortable: true,
                },
                {
                    key: "fullName",
                    label: "Tên Sinh Viên",
                    sortable: true,
                },
                {
                    key: "studentClass.name",
                    label: "Lớp ",
                    sortable: true,
                },
                {
                    key: "dob",
                    label: "Ngày sinh",
                    sortable: true,
                },
                {
                    key: "studentClass.course",
                    label: "Khóa",
                    sortable: true,
                },
                {
                    key: "email",
                    label: "Email",
                    sortable: true,
                },
                {
                    key: "action",
                    label: "Thao tác",
                    tdClass: "text-center",
                },
            ],
            tableData: [],
            idStudent: 0,
            codeStudent: "",
            objTeacher: {
                id: 0,
                conditionSearch: "",
                valueSearch: "",
            },
            objGetStudent: {
                id: 0,
                code: "",
                fullName: "",
                dob: "",
                gender: "",
                phone: "",
                email: "",
                address: "",
                class: "",
            },
            objGetListStudent: {
                id: 0,
            },
            modalActionType: -1,
            flagModal: false,
            studentClass: [],
        };
    },
    created() {},
    computed: {
        rows() {
            return this.tableData.length;
        },
    },
    mounted() {
        // this.searchContact();
        this.handleGetStudent();
        // this.getStudentClass();
    },
    methods: {
        ...mapActions("teachers", {
            apiGetStudentByTeacher: "apiGetStudentByTeacher",
        }),
        closeModalListSub() {
            this.$bvModal.hide("modal-add-list-tb");
        },
        getStudentClass() {
            this.apiGetStudentClass().then((response) => {
                this.studentClass = response;
            });
        },
        addListSub() {
            this.errorValidate = [];
            let formData = new FormData();
            if (this.fileUpload === null) {
                this.commonNotifyVue("Bạn phải chọn file chứa danh sách thuê bao", "warn");
            } else {
                formData.append("fileExcel", this.fileUpload);

                this.apiImportStudent(formData)
                    .then((response) => {
                        if (response === null) {
                            this.$emit("handleGetStudent");
                            this.$bvModal.hide("modal-add-file-student");
                        } else {
                            this.commonWarningVue("bug");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => {
                        // this.commonLoadingPage(false);
                    });
            }
        },
        handleGetStudent() {
            this.commonLoadingPage(true);
            this.objTeacher.id = JSON.parse(getUserInfo()).teacherId;
            this.apiGetStudentByTeacher(this.objTeacher)
                .then((response) => {
                    this.tableData = response;
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.commonLoadingPage(false);
                });
        },
        searchStudent() {
            let objInput = { id: JSON.parse(getUserInfo()).teacherId, conditionSearch: this.conditionSearch, valueSearch: this.valueSearch };
            console.log("apiGetListContactGroup", objInput);
            if (this.conditionSearch !== "" && this.conditionSearch !== "ALL") {
                if (this.valueSearch.trim() === "") {
                    this.commonNotifyVue("Bạn phải nhập từ khóa tìm kiếm", "warn");
                    return;
                }
            }
            this.apiGetStudentByTeacher(objInput)
                .then((response) => {
                    let data = response;
                    this.tableData = data;
                    console.log("apiGetListContactGroup", data);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    // this.commonLoadingPage(false);
                });
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        viewStudent(id) {
            this.isEditModalField = true;
            this.disableAdd = true;
            this.titleModal = "Xem Chi Tiết";
            this.typeSegment = 3;
            this.idStudent = parseInt(id);
            this.codeStudent = id;

            this.flagModal = !this.flagModal;

            this.apiGetStudentByTeacher({
                conditionSearch: "ID",
                valueSearch: id,
            })
                .then((response) => {
                    this.objGetStudent = response[0];

                    console.log("object student:: ", this.objGetStudent);

                    this.modalActionType = 3;

                    this.flagModal = !this.flagModal;
                    this.$bvModal.show("modal-add-event");
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {});
        },
        showModalStudent() {
            this.idStudent = -1;
            this.modalActionType = 1;
            this.objGetStudent.name = "";
            this.objGetStudent.dob = "";
            this.objGetStudent.gender = "";
            this.objGetStudent.phone = "";
            this.objGetStudent.email = "";
            this.objGetStudent.address = "";
            this.objGetStudent.code = "";
            this.objGetStudent.class = "";
            this.flagModal = !this.flagModal;
            this.$bvModal.show("modal-add-event");
        },
        handleModalCall() {
            this.searchStudent();
        },
    },
};
</script>

<style scoped></style>

<template>
    <div class="row">
        <div class="card">
            <div class="card-header">
                <div class="row"></div>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-5">
                        <label>Điều kiện lọc</label>
                        <select v-model="conditionSearch" class="form-control">
                            <option value="ALL">Tất cả</option>
                            <option value="NAME">Tên</option>
                            <option value="PHONE">Số điện thoại</option>
                            <option value="EMAIL">Email</option>
                            <option value="CLASS">Lớp</option>
                            <option value="CODE">Mã sinh viên</option>
                        </select>
                    </div>
                    <div class="col-7">
                        <label>Từ khóa tìm kiếm</label>
                        <div class="row">
                            <div class="col-10">
                                <input type="text" v-model="valueSearch" class="form-control" />
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-primary d-block" @click="searchStudent"><i class="uil uil-search me-2"></i> Tìm kiếm</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <b-table striped bordered :items="tableData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                        <template v-slot:cell(index)="data">
                            {{ data.index + 1 }}
                        </template>
                        <template v-slot:cell(action)="data">
                            <div class="row align-items-center">
                                <button title="Xem chi tiết" @click="viewStudent(data.item.id)" class="btn btn-gray btn-block view-cart col-auto"><i class="uil uil-eye me-1"></i></button>
                            </div>
                        </template>
                    </b-table>
                </div>

                <div class="row">
                    <div class="col-6 d-inline-flex">
                        <label class="d-inline-flex align-items-center mb-0 pb-0"> <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;&nbsp;Số/ Trang </label>
                    </div>
                    <div class="col-6">
                        <b-pagination class="mb-0" align="right" v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
                    </div>
                </div>
            </div>
        </div>

        <student-modal :idStudent="idStudent" :actionType="modalActionType" :flagModal="flagModal" @handleGetStudent="handleGetStudent"> </student-modal>

        <add-student-modal :idStudent="idStudent" :codeStudent="codeStudent" :actionType="modalActionType" :flagModal="flagModal" @handleGetStudent="handleGetStudent"> </add-student-modal>
    </div>
</template>
