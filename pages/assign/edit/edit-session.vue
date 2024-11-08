<script>
import { mapActions } from "vuex";
import AddAssignment from "../../../components/assign/AddAssignment.vue";
import Swal from "sweetalert2";

/**
 * Product-detail component
 */
export default {
    middleware: ["check-authen"],
    head() {
        return {
            title: `Xem chi tiết năm học`,
        };
    },
    asyncData({ params }) {},
    components: {
        AddAssignment,
    },
    data() {
        return {
            sizes: ["Small", "Medium", "Large", "Extra Large"],
            title: "Chi tiết tệp blacklist",
            contactGroupNam: "",
            contactGroupId: "",
            conditionSearch: "",
            valueSearch: "",
            startDate: "",
            endDate: "",
            email: "",
            idSession: 0,
            modalActionType: -1,
            flagModal: false,
            isEditModalField: false,
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: "age",
            sortDesc: false,
            sessionId: "",
            fields: [
                {
                    key: "index",
                    label: "STT",
                    sortable: true,
                    thStyle: { width: "3%" },
                    tdClass: "text-center",
                },
                {
                    key: "teacher.fullName",
                    label: "Tên giảng viên",
                    sortable: true,
                    thStyle: { width: "15%" },
                },
                {
                    key: "teacher.email",
                    label: "Email",
                    sortable: true,
                    thStyle: { width: "15%" },
                },
                {
                    key: "amount",
                    label: "Số sinh viên hướng dẫn",
                    sortable: true,
                    thStyle: { width: "10%" },
                },
                {
                    key: "createdBy",
                    label: "Tài khoản",
                    sortable: true,
                    thStyle: { width: "10%" },
                },
                {
                    key: "createdDate",
                    label: "Thời gian tạo",
                    sortable: true,
                    thStyle: { width: "15%" },
                },
                {
                    key: "action",
                    label: "Thao tác",
                    thStyle: { width: "15%" },
                },
            ],
            objAssignment: {
                session: {
                    id: 0,
                },
                teacher: {
                    id: 0,
                    code: "",
                },
            },
            tableData: [],
        };
    },

    methods: {
        ...mapActions("assign/assignment", {
            apiGetAssignment: "apiGetAssignment",
            apiDeleteAssignment: "apiDeleteAssignment",
            apiChangeAssignmentStatus: "apiChangeAssignmentStatus",
        }),
        goToPrev() {
            this.$router.go(-1);
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        searchSub() {
            let objInput = { conditionSearch: "SESSION", valueSearch: this.sessionId };
            console.log("apiGetListContact", objInput);
            this.commonLoadingPage(true);

            this.apiGetAssignment(objInput)
                .then((response) => {
                    this.tableData = response;
                    console.log("apiGetListSub", response);
                    if (response.err_code === 0) {
                    } else {
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.commonLoadingPage(false);
                });
        },
        closeModalSub() {
            this.$bvModal.hide("modal-add-one-tb");
        },
        addEditOneSub() {
            this.apiAddSession({ year: this.year })
                .then((response) => {
                    console.log("apiAddSession", response);

                    this.searchSession();
                    this.$bvModal.hide("modal-add-one-tb");
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    // this.commonLoadingPage(false);
                });
        },
        deleteAssignment(sessionId, teacherId) {
            this.objAssignment.session.id = sessionId;
            this.objAssignment.teacher.id = teacherId;
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
                    this.apiDeleteAssignment(this.objAssignment)
                        .then((response) => {
                            console.log("in");
                            if (!response) {
                                Swal.fire("", "Xóa thất bại", "error");
                            } else {
                                Swal.fire("", "Xóa thành công", "success");
                            }
                            this.searchSub();
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
        changeAssignmentStatus(id, oldStatus) {
            let status = !oldStatus;
            let objInput = { id: id, status: status };
            this.apiChangeAssignmentStatus(objInput)
                .then((response) => {
                    console.log("apiChangeSessionStatus", response);
                    Swal.fire("", "Thành công", "success");
                    this.searchSub();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    // this.commonLoadingPage(false);
                });
        },
    },
    created() {
        this.blacklistNam = this.$route.query.name;
        this.sessionId = this.$route.query.id;
    },
    mounted() {
        this.searchSub();
    },
    computed: {
        rows() {
            return this.tableData.length;
        },
    },
    prepareAddOne() {},
};
</script>

<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-6">
                                <button type="button" class="btn btn-outline-secondary" @click="goToPrev"><i class="uil uil-arrow-circle-left me-1"></i> Quay lại</button>
                                <label>{{ contactGroupNam }}</label>
                            </div>
                            <div class="col-6 text-end">
                                <button type="button" class="btn btn-primary" v-b-modal.modal-add-file-assigment><i class="uil uil-arrow-circle-up ms-1"></i> Tải tệp excel</button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-5">
                                <label>Điều kiện lọc</label>
                                <select v-model="conditionSearch" class="form-control">
                                    <option value=""></option>
                                    <option value="-1">Tất cả</option>
                                    <option value="ID">Tên giảng viên</option>
                                    <option value="SDT">Số điện thoại</option>
                                </select>
                            </div>
                            <div class="col-7">
                                <label>Giá trị tìm kiếm</label>
                                <div class="row">
                                    <div class="col-10">
                                        <input type="text" v-model="valueSearch" class="form-control" />
                                    </div>
                                    <div class="col-2">
                                        <button type="button" class="btn btn-primary d-block" @click="searchSub"><i class="uil uil-search me-2"></i> Tìm kiếm</button>
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
                                    <ul class="list-inline">
                                        <nuxt-link title="Xem tập TB" :to="{ path: '/assign/view/view-assign', query: { id: data.item.session.id, teacherId: data.item.teacher.id } }" class="text-secondary p-2"><i class="uil uil-eye font-size-18"></i> </nuxt-link>
                                        <nuxt-link title="Sửa tập TB" :to="{ path: '/assign/edit/edit-assign', query: { id: data.item.session.id, teacherId: data.item.teacher.id } }" class="text-secondary pe-2"><i class="uil uil-pen font-size-18"></i> </nuxt-link>
                                        <li class="list-inline-item">
                                            <a @click="deleteAssignment(data.item.session.id, data.item.teacher.id)" class="text-secondary" v-b-tooltip.hover title="Delete">
                                                <i class="uil uil-trash-alt font-size-18"></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" @click="changeAssignmentStatus(data.item.teacher.id, data.item.status)" v-model="data.item.status" />
                                                <label class="form-check-label" for="flexSwitchCheckChecked"></label>
                                            </div>
                                        </li>
                                    </ul>
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
                <!-- end card -->
            </div>
        </div>
        <add-assignment :idSession="idSession" :actionType="modalActionType" :flagModal="flagModal" @handleGetSession="searchSub"> </add-assignment>
        <!-- end row -->
    </div>
</template>
