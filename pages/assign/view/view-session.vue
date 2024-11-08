<script>

import {mapActions} from "vuex";

/**
 * Product-detail component
 */
export default {
    middleware: ['check-authen'],
    head() {
        return {
            title: `Xem chi tiết năm học`
        };
    },
    asyncData({
                  params
              }) {

    },
    data() {
        return {

            title: "Chi tiết tệp blacklist",
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
            sessionId: '',
            fields: [
                {
                    key: "index",
                    label: "STT",
                    sortable: true,
                    thStyle: {width: "3%"},
                },
                {
                    key: "teacher.fullName",
                    label: "Tên giảng viên",
                    sortable: true,
                    thStyle: {width: "15%"},
                },
                {
                    key: "teacher.email",
                    label: 'Email',
                    sortable: true,
                    thStyle: {width: "15%"},
                },
                {
                    key: "amount",
                    label: 'Số sinh viên hướng dẫn',
                    sortable: true,
                    thStyle: { width: "10%" },
                },
                {
                    key: "createdBy",
                    label: 'Tài khoản',
                    sortable: true,
                    thStyle: {width: "10%"},
                },
                {
                    key: "createdDate",
                    label: 'Thời gian tạo',
                    sortable: true,
                    thStyle: {width: "15%"},
                },
                {
                    key: "action",
                    label: 'Thao tác',
                    thStyle: {width: "10%"}
                },
            ],
            tableData: []
        };
    },



    methods:{
        ...mapActions('assign/assignment', {
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
            let objInput={conditionSearch:'SESSION',valueSearch:this.sessionId};

            console.log('apiGetListContact', objInput);

            this.commonLoadingPage(true);
            this.apiGetAssignment(objInput)
                .then(response => {
                    this.tableData = response;
                    console.log('apiGetListSub', response);
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

        }
    },
    created() {
        this.blacklistNam = this.$route.query.name;
        this.sessionId = this.$route.query.id;
    },
    mounted() {
        this.searchSub();
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
                                <template v-slot:cell(action) = data>

                                </template>

                                <template v-slot:cell(action)=data>
                                    <ul class="list-inline" style="padding-right: 40%">
                                        <nuxt-link title="Xem tập TB"
                                                   :to="{ path: '/assign/view/view-assign', query: { id: data.item.session.id, teacherId: data.item.teacher.id }}"
                                                   class="text-secondary p-2"
                                        ><i class="uil uil-eye font-size-18"></i>
                                        </nuxt-link>

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
                <!-- end card -->
            </div>
        </div>
        <!-- end row -->
    </div>
</template>
