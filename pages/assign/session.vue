<script>

import {mapActions} from "vuex";
import Swal from "sweetalert2";
import AddAssignment from "@/components/assign/AddAssignment.vue";

export default {
    middleware: ['check-authen'],
    name: "subscriber",

    data() {
        return {
            items: [{
                text: "Forms",
                href: "/"
            },
                {
                    text: "Form File Upload",
                    active: true
                }
            ],
            titleModal: '',
            conditionSearch: '',
            valueSearch: '',
            year: 0,

            isEditModalField: false,
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
                    thStyle: {width: "3%"},
                },
                {
                    key: "id",
                    label: "ID Session",
                    sortable: true,
                    thStyle: {width: "10%"},
                },
                {
                    key: "year",
                    label: 'Năm học',
                    sortable: true,
                    thStyle: {width: "20%"},
                },
                {
                    key: "amount",
                    label: 'Số lượng giảng viên',
                    sortable: true,
                    thStyle: {width: "10%"},
                },
                {
                    key: "createdBy",
                    label: 'Tài khoản',
                    sortable: true,
                    thStyle: {width: "10%"},
                },
                {
                    key: "action",
                    label: 'Thao tác',
                    thStyle: {width: "10%"}
                },
            ],
            tableData: []
        }
    },
    created() {

    },
    computed: {
        rows() {
            return this.tableData.length;
        }
    },
    mounted() {
        this.searchSession();
    },
    methods: {
        ...mapActions('assign/session', {
            apiGetSession: 'apiGetSession',
            apiDeleteSession: 'apiDeleteSession',
            apiAddSession: 'apiAddSession',
            apiChangeSessionStatus: 'apiChangeSessionStatus'
        }),
        searchSession() {
            let objInput = {conditionSearch: this.conditionSearch, valueSearch: this.valueSearch};

            if (this.conditionSearch !== '') {
                if (this.valueSearch.trim() === '') {
                    this.commonNotifyVue('Bạn phải nhập từ khóa tìm kiếm', 'warn');
                    return;
                }
            }

            this.commonLoadingPage(true);
            this.apiGetSession(objInput)
                .then(response => {


                    let data = response;
                    this.tableData = data;

                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    this.commonLoadingPage(false);
                });

        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        deleteSession(id) {

            Swal.fire({
                title: "Bạn có chắc chắn muốn xóa?",
                text: "Bạn sẽ không lấy lại được dữ liệu đã xóa!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#f46a6a",
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Hủy"
            }).then(result => {
                if (result.value) {
                    this.apiDeleteSession(parseInt(id))
                        .then(response => {
                            if (!response) {
                                Swal.fire("", "Xóa thất bại", "warning");
                            } else {
                                Swal.fire("", "Xóa thành công", "success");
                            }
                            this.searchSession();

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
        changeSessionStatus(id, oldStatus) {
            let status = !oldStatus;
            let objInput = {id: id, status: status};
            this.apiChangeSessionStatus(objInput)
                .then(response => {
                    Swal.fire("", "Thành công", "success");
                    this.searchSession();
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    // this.commonLoadingPage(false);
                });

        },
        handleModalCall() {
            this.searchSession();
        },
        prepareAddOne() {
            this.isEditModalField = false;
            this.isViewModalFileField = false;
            this.titleModal = 'Tải đơn liên hệ vào tập TB';
            this.$bvModal.show('modal-add-one-tb');
            this.year = '';
        },
        closeModalSub() {
            this.$bvModal.hide('modal-add-one-tb');
        },
        addEditOneSub() {
            this.apiAddSession({year: this.year})
                .then(response => {

                    this.searchSession();
                    this.$bvModal.hide('modal-add-one-tb');

                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    // this.commonLoadingPage(false);
                });

        },
    }
}
</script>

<style scoped>

</style>


<template>
    <div class="row">
        <div class="card">

            <div class="card-header">
                <div class="row" style="float: right">
                    <div class="col-12">
                        <button type="button" class="btn btn-primary" @click="prepareAddOne"><i class="uil uil-arrow-circle-up ms-1"></i> Thêm năm học</button>

                    </div>
                </div>

            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-6">
                        <label>Điều kiện lọc</label>

                        <select v-model="conditionSearch" class="form-control">
                            <option value=""></option>
                            <option value="-1">Tất cả</option>
                            <option value="YEAR">Năm học</option>
                        </select>
                    </div>
                    <div class="col-6">
                        <label>Giá trị tìm kiếm</label>
                        <div class="row">
                            <div class="col-10">
                                <input type="text" v-model="valueSearch" class="form-control"/>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-primary d-block" @click="searchSession"><i class="uil uil-search me-2"></i> Tìm kiếm</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <b-table striped bordered :items="tableData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                        <template v-slot:cell(index)="data">
                            {{ data.index + 1 }}
                        </template>
                        <template v-slot:cell(action)=data>
                            <ul class="list-inline mb-0">
                                <nuxt-link title="Xem năm học"
                                           :to="{ path: '/assign/view/view-session', query: { id: data.item.id, name: data.item.name }}"
                                           class="text-secondary p-2"
                                ><i class="uil uil-eye font-size-18"></i>
                                </nuxt-link>
                                <nuxt-link title="Sửa năm học"
                                           :to="{path:'/assign/edit/edit-session',query: { id: data.item.id, name: data.item.name }}"
                                           class="text-secondary pe-2"
                                ><i class="uil uil-pen font-size-18"></i>
                                </nuxt-link>
                                <li class="list-inline-item">
                                    <a
                                        @click="deleteSession(data.item.id)"
                                        class="text-secondary"
                                        v-b-tooltip.hover
                                        title="Delete"
                                    >
                                        <i class="uil uil-trash-alt font-size-18"></i>
                                    </a>
                                </li>
                                <li class="list-inline-item">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" @click="changeSessionStatus(data.item.id,data.item.status)" v-model="data.item.status">
                                        <label class="form-check-label" for="flexSwitchCheckChecked"></label>
                                    </div>
                                </li>
                            </ul>
                        </template>
                    </b-table>
                </div>

                <div class="row">
                    <div class="col-6 d-inline-flex">
                        <label class="d-inline-flex align-items-center mb-0 pb-0">
                            <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;&nbsp;Số/ Trang
                        </label>
                    </div>
                    <div class="col-6">
                        <b-pagination
                            class="mb-0" align="right"
                            v-model="currentPage"
                            :total-rows="rows"
                            :per-page="perPage"
                        ></b-pagination>
                    </div>
                </div>
            </div>
        </div>

        <b-modal id="modal-add-one-tb"
                 size="lg"
                 :title="titleModal"
                 title-class="font-18"
                 hide-footer>
            <div class="card-body">
                <div class="row mb-3">

                    <div class="col-12">
                        <label>Năm học</label>
                        <input type="text" maxlength="15" v-model="year" :disabled="isEditModalField" class="form-control"/>
                    </div>
                </div>

                <div class="card-footer text-end">
                    <button type="button" class="btn btn-primary" @click="closeModalSub" v-show="!isEditModalField">Bỏ qua</button>
                    <button type="button" class="btn btn-success" @click="addEditOneSub" v-show="!isEditModalField"><i class="uil uil-save me-1"></i> Lưu lại</button>

                </div>
            </div>

        </b-modal>

    </div>

</template>


