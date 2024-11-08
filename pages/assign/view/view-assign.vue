<script>

import {mapActions} from "vuex";

/**
 * Product-detail component
 */
export default {
    middleware: ['check-authen'],
    head() {
        return {
            title: `Danh sách sinh viên được hướng dẫn`
        };
    },
    asyncData({
                  params
              }) {

    },
    data() {
        return {

            title: "Danh sách sinh viên được hướng dẫn",
            contactGroupNam:'',
            contactGroupId:'',
            conditionSearch:'',
            valueSearch:'',
            startDate:'',
            endDate:'',

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
                    thStyle: { width: "3%" },
                },
                {
                    key: "student.code",
                    label: "Mã sinh viên",
                    sortable: true,
                    thStyle: { width: "10%" },
                },
                {
                    key: "student.email",
                    label: 'Email',
                    sortable: true,
                    thStyle: { width: "20%" },
                },
                {
                    key: "createdBy",
                    label: 'Tài khoản',
                    sortable: true,
                    thStyle: { width: "10%" },
                },
                {
                    key: "createdDate",
                    label: 'Thời gian tạo',
                    sortable: true
                }
            ],
            tableData: []
        };
    },
    methods:{
        ...mapActions('assign/assignment', {
            apiGetStudent: 'apiGetStudent',
            apiGetAssignment: 'apiGetAssignment'
        }),
        goToPrev() {
            this.$router.go(-1);
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        searchSub(){
            let objInput={conditionSearch:this.conditionSearch,valueSearch:this.valueSearch,startDate:this.startDate,endDate:this.endDate,assignmentId:this.assignmentId};


            this.apiGetAssignment(objInput)
                .then(response => {
                    let data = response['data'];
                    this.tableData = data;
                    if (response.err_code === 0) {
                    } else {
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    // this.commonLoadingPage(false);
                });

        }
    },
    created() {
        this.teacherId = this.$route.query.teacherId;
        this.sessionId = this.$route.query.id;
    },
    mounted() {
        let objInput = {conditionSearch: 'ID', valueSearch: this.assignmentId}
        this.commonLoadingPage(true);
        this.apiGetStudent({sessionId: this.sessionId, teacherId: this.teacherId})
            .then(response => {
                this.tableData = response;
                if (response.err_code === 0) {
                } else {
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                this.commonLoadingPage(false);
            });
    },
    computed:{
        rows() {
            return this.tableData.length;
        }
    },

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

                        </div>
                    </div>
                    <div class="card-body">

                        <div class="row mb-3">
                            <div class="col-5">
                                <label>Điều kiện lọc</label>
                                <select v-model="conditionSearch" class="form-control">
                                    <option value=""></option>
                                    <option value="-1">Tất cả</option>
                                    <option value="ID">ID SĐT</option>
                                    <option value="SDT">Số điện thoại</option>
                                </select>
                            </div>
                            <div class="col-7">
                                <label>Giá trị tìm kiếm</label>
                                <div class="row">
                                    <div class="col-10">
                                        <input type="text" v-model="valueSearch" class="form-control"/>
                                    </div>
                                    <div class="col-2">
                                        <button type="button" class="btn btn-primary d-block" @click="searchSub"><i class="uil uil-search me-2"></i> Tìm kiếm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">

                            <b-table striped bordered :items="tableData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                                <template v-slot:cell(index) = data>
                                    {{ data.index + 1 }}
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
                <!-- end card -->
            </div>
        </div>
        <!-- end row -->
    </div>
</template>
