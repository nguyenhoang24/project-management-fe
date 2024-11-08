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
                    key: "name",
                    label: "Tên đề tài",
                    sortable: true,
                },
                {
                    key: "topic.name",
                    label: "Chủ đề",
                    sortable: true,
                },
                {
                    key: "student.code",
                    label: "Mã sinh viên",
                    sortable: true,
                },
                {
                    key: "student.fullName",
                    label: "Sinh viên",
                    sortable: true,
                },
                {
                    key: "outlineFile",
                    label: "Đề cương",
                    sortable: true,
                },
                {
                    key: "reportFile",
                    label: "Báo cáo",
                    sortable: true,
                },
                {
                    key: "status",
                    label: "Trạng thái",
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
            objProject: {
                teacherId: 0,
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
            status: "",
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
        this.handleGetProject();
        // this.getStudentClass();
    },
    methods: {
        ...mapActions("project", {
            apiGetProject: "apiGetProject",
            apiGetStudent: "apiGetStudent",
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
                console.log(formData);

                this.apiImportStudent(formData)
                    .then((response) => {
                        console.log("apiAddBlacklist", response);
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
        handleGetProject() {
            this.objProject.valueSearch = JSON.parse(getUserInfo()).teacherId;
            this.objProject.conditionSearch = "TEACHER";
            this.commonLoadingPage(true);
            this.apiGetProject(this.objProject)
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
            let objInput = { id: JSON.parse(getUserInfo()).studentId, conditionSearch: this.conditionSearch, valueSearch: this.valueSearch };
            console.log("apiGetListContactGroup", objInput);
            console.log("valueSearch:", this.valueSearch);
            if (this.conditionSearch !== null && this.conditionSearch !== "ALL") {
                if (this.valueSearch.trim() === "") {
                    this.commonNotifyVue("Bạn phải nhập từ khóa tìm kiếm", "warn");
                    return;
                }
            }
            this.apiGetProject(objInput)
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

            this.apiGetStudent({
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
        getRowClass(row) {
            if (row.value === "ACTIVE") {
                row.value = "Đã duyệt";
                return "text-success";
            } else if (row.value === "RESERVE") {
                row.value = "Bảo lưu";
                return "text-danger";
            } else if (row.value === "INACTIVE") {
                row.value = "Chưa duyệt";
                return "text-warning";
            } else {
                return "";
            }
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
                        <template #cell(status)="row">
                            <div :class="getRowClass(row)">
                                {{ row.value }}
                            </div>
                        </template>
                        <template v-slot:cell(index)="data">
                            {{ data.index + 1 }}
                        </template>
                        <template #cell(outlineFile)="row">
                            <a :href="row.value" :hidden="row.value === ''">
                                {{ "Tải xuống" }}
                            </a>
                            <span :hidden="row.value !== ''">Chưa có đề cương</span>
                        </template>
                        <template #cell(reportFile)="row">
                            <a :href="row.value" :hidden="row.value === ''">
                                {{ "Tải xuống" }}
                            </a>
                            <span :hidden="row.value !== ''">Chưa có đề cương</span>
                        </template>
                        <template v-slot:cell(action)="data">
                            <div class="row align-items-center">
                                <nuxt-link title="Xem chi tiết" :to="{ path: '/project/project-detail', query: { id: data.item.id } }" class="text-secondary p-2"><i class="uil uil-eye font-size-18"></i> </nuxt-link>
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

        <student-modal :idStudent="idStudent" :actionType="modalActionType" :flagModal="flagModal" @handleGetStudent="handleGetProject"> </student-modal>
    </div>
</template>
