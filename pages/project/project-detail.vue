<script>
import { mapActions } from "vuex";
import Multiselect from "vue-multiselect";
import AddDetailModal from "../../components/project/AddDetailModal";
import { getUserInfo } from "../../utils/cookieAuthen";
import Swal from "sweetalert2";
import AddOutlineModal from "../../components/project/AddOutlineModal";

export default {
    middleware: ["check-authen"],
    name: "subscriber",
    components: {
        Multiselect,
        AddDetailModal,
        AddOutlineModal,
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
                    key: "title",
                    label: "Nội dung",
                    sortable: true,
                },
                {
                    key: "startDate",
                    label: "Ngày bắt đầu",
                    sortable: true,
                },
                {
                    key: "endDate",
                    label: "Ngày kết thúc",
                    sortable: true,
                },
                {
                    key: "reportFile",
                    label: "Báo cáo",
                    sortable: true,
                },
                {
                    key: "comment",
                    label: "Nhận xét giảng viên",
                    sortable: true,
                },
                {
                    key: "action",
                    label: "Thao tác",
                    tdClass: "text-center",
                },
            ],
            tableData: [],
            idDetail: 0,
            codeStudent: "",
            objProject: {
                teacherId: 0,
                conditionSearch: "",
                valueSearch: "",
            },
            detailObj: {
                id: -1,
                title: "",
                status: "",
                comment: "",
                content: "",
                reportFile: "",
                startDate: "",
                endDate: "",
                project: {
                    id: 0,
                },
            },
            objGetListStudent: {
                id: 0,
            },
            modalActionType: -1,
            flagModal: false,
            studentClass: [],
            status: "",
            role: "",
            projectObj: {
                name: "",
                student: {
                    fullName: "",
                    code: "",
                },
            },
            user: JSON.parse(getUserInfo()),
        };
    },
    created() {
        this.projectId = this.$route.query.id;
    },
    computed: {
        rows() {
            return this.tableData.length;
        },
    },
    mounted() {
        // this.searchContact();
        this.handleGetProjectDetail();
        this.handleGetProject();
        this.role = JSON.parse(getUserInfo()).role;
        // this.getStudentClass();
    },
    methods: {
        ...mapActions("project", {
            apiGetProjectDetail: "apiGetProjectDetail",
            apiGetProject: "apiGetProject",
            apiGetDetailById: "apiGetDetailById",
            apiDeleteProjectDetail: "apiDeleteProjectDetail",
            apiAddReportFileDetail: "apiAddReportFileDetail",
            apiDeleteFileDetail: "apiDeleteFileDetail",
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
                this.commonNotifyVue("Bạn phải chọn file chứa báo cáo", "warn");
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
            this.apiGetProject({
                conditionSearch: "ID",
                valueSearch: this.projectId,
            })
                .then((response) => {
                    this.projectObj = response[0];
                    console.log(this.projectObj);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {});
        },
        handleGetProjectDetail() {
            this.commonLoadingPage(true);
            this.apiGetProjectDetail(this.projectId)
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
            if (this.conditionSearch !== "" && this.conditionSearch !== "ALL") {
                if (this.valueSearch.trim() === "") {
                    this.commonNotifyVue("Bạn phải nhập từ khóa tìm kiếm", "warn");
                    return;
                }
            }
            this.apiGetStudent(objInput)
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
        prepareEditDetail(id) {
            this.isEditModalField = false;
            this.titleModal = "Sửa thông tin";
            this.detailObj.id = parseInt(id);
            this.idDetail = parseInt(id);

            this.teachersValue = [];
            this.apiGetDetailById(this.idDetail)
                .then((response) => {
                    this.detailObj.id = response.id;
                    this.detailObj.title = response.title;
                    this.detailObj.startDate = response.startDate;
                    this.detailObj.endDate = response.endDate;
                    this.detailObj.comment = response.comment === null ? "" : response.comment;
                    console.log(this.detailObj);
                    this.modalActionType = 2;
                    this.$bvModal.show("modal-add-detail-project");
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {});
            this.listConditions = [];
        },
        deleteDetail(id) {
            console.log("id: ", id);

            Swal.fire({
                title: "Bạn có chắc chắn muốn xóa?",
                text: "Bạn sẽ không lấy lại được dữ liệu đã xóa!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#f46a6a",
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Hủy",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.apiDeleteProjectDetail(id)
                        .then((response) => {
                            Swal.fire("", "Xóa thành công", "success");
                            this.handleGetProjectDetail();
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                        .finally(() => {
                            // this.commonLoadingPage(false);
                        });
                } else {
                }
            });
        },
        showModalDetailProject() {
            this.idDetail = -1;
            this.modalActionType = 1;
            this.detailObj.title = "";
            this.detailObj.comment = "";
            this.detailObj.startDate = "";
            this.detailObj.endDate = "";
            this.detailObj.status = "";
            this.flagModal = !this.flagModal;
            this.$bvModal.show("modal-add-file-outline");
        },
        handleModalCall() {
            this.searchStudent();
        },
        deleteFileDetail(id) {
            Swal.fire({
                title: "Bạn có chắc chắn muốn xóa?",
                text: "Bạn sẽ không lấy lại được dữ liệu đã xóa!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#f46a6a",
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Hủy",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.apiDeleteFileDetail(id)
                        .then((response) => {
                            Swal.fire("", "Xóa thành công", "success");
                            this.handleGetProjectDetail();
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                        .finally(() => {
                            // this.commonLoadingPage(false);
                        });
                } else {
                }
            });
        },
        showModalReport(id) {
            this.idDetail = id;
            this.type = "REPORT_DETAIL";
            this.flagModal = !this.flagModal;
            this.$bvModal.show("modal-add-file-outline");
        },
        showModalDetail(id) {
            this.modalActionType = 1;
            this.flagModal = !this.flagModal;
            this.$bvModal.show("modal-add-detail-project");
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
        formatDate(d) {
            return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
        },
    },
};
</script>

<style scoped></style>

<template>
    <div class="row">
        <div class="card">
            <div class="card-header">
                <div class="row" style="float: right">
                    <div class="col-12">
                        <!--                        <button type="button" class="btn btn-primary" @click="showModalOutline" v-b-modal.modal-add-file-outline><i class="uil uil-arrow-circle-up me-1"></i> Tải file đề cương</button>-->
                        <button type="button" class="btn btn-success" @click="showModalDetail"><i class="uil uil-plus me-1"></i> Thêm chi tiết</button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-5">
                        <label>Tên đồ án</label>
                        <h5>{{ this.projectObj.name }}</h5>
                    </div>
                    <div class="col-7">
                        <label>Thông tin sinh viên</label>
                        <h5>{{ this.projectObj.student.fullName + " - " + this.projectObj.student.code }}</h5>
                    </div>
                </div>
                <div class="table-responsive">
                    <b-table striped bordered :items="tableData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                        <template v-slot:cell(index)="data">
                            {{ data.index + 1 }}
                        </template>
                        <template #cell(startDate)="row">
                            {{ formatDate(new Date(row.value)) }}
                        </template>
                        <template #cell(endDate)="row">
                            {{ formatDate(new Date(row.value)) }}
                        </template>
                        <template v-slot:cell(title)="data">
                            <div v-html="data.item.title"></div>
                        </template>
                        <template v-slot:cell(reportFile)="data">
                            <a :href="data.value" :hidden="data.value === ''"> Tải xuống </a>
                            <button :hidden="data.value === ''" @click="deleteFileDetail(data.item.id)" class="btn btn-gray btn-block view-cart col-auto">
                                <i class="uil uil-trash me-1"></i>
                            </button>

                            <button :hidden="data.value !== '' || user.role === 'ROLE_TEACHER'" class="btn btn-block view-cart col-auto text-white" style="background-color: #5b73e8" @click="showModalReport(data.item.id)" v-b-modal.modal-add-file-outline>Upload</button>
                            <span :hidden="user.role !== 'ROLE_TEACHER'">{{ data.value !== "" ? "" : "Chưa có báo cáo" }}</span>
                        </template>
                        <template v-slot:cell(comment)="data">
                            <div v-html="data.item.comment"></div>
                        </template>
                        <template v-slot:cell(action)="data">
                            <div class="row align-items-center">
                                <button title="Sửa chi tiết" @click="prepareEditDetail(data.item.id)" class="btn btn-gray btn-block view-cart col-auto"><i class="uil uil-pen me-1"></i></button>
                                <button title="Xóa chi tiết" :hidden="user.role !== 'ROLE_TEACHER'" @click="deleteDetail(data.item.id)" class="btn btn-gray btn-block view-cart col-auto"><i class="uil uil-trash me-1"></i></button>
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

        <add-detail-modal :idDetail="idDetail" :idProject="Number(this.projectId)" :role="role" :actionType="modalActionType" :flagModal="flagModal" @handleGetProjectDetail="handleGetProjectDetail"> </add-detail-modal>
        <add-outline-modal :idDetail="idDetail" :type="this.type" :actionType="modalActionType" :flagModal="flagModal" @handleGetProjectDetail="handleGetProjectDetail"> </add-outline-modal>
    </div>
</template>
