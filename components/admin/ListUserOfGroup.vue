
<script>
import {mapActions} from "vuex";

export default {
    name: "ListUserOfGroup",
    props:['groupId'],
    mounted() {
        this.searchUser();
    },
    methods:{
        ...mapActions('admin/user', {
            apiGetListUser: 'apiGetListUser'
        }),
        searchUser(){
            let objInput = {groupId:this.groupId};
            this.apiGetListUser(objInput)
                .then(response => {
                    if (response.err_code === 0) {
                        let data = response['data'];
                        console.log('searchUser', data);
                        this.tableData = data;
                    } else {
                        this.commonWarningVue(response.err_message);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    // this.commonLoadingPage(false);
                });
        },
        prepareAddQuantity(){

        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        prepareEditGroupQuantity(){

        },
        deleteGroupQuantity(){

        }
    },
    data: function () {
        return {
            fields: [
                {
                    key: "index",
                    label: "STT",
                    sortable: true,
                    thStyle: {width: "3%"},
                },
                {
                    key: "userName",
                    label: "Tên người dùng",
                    sortable: true,
                    thStyle: {width: "12%"},
                },
                {
                    key: "fullname",
                    label: "Tên đầy đủ",
                    sortable: true,
                    thStyle: {width: "10%"},
                },
                {
                    key: "email",
                    label: 'Email',
                    sortable: true,
                    thStyle: {width: "10%"},
                },
                {
                    key: "phone",
                    label: 'Số điện thoại',
                    sortable: true,
                    thStyle: {width: "10%"},
                },
                {
                    key: "status",
                    label: 'Trạng thái',
                    sortable: true,
                    thStyle: {width: "10%"},
                },
                {
                    key: "createDate",
                    label: 'Ngày tạo',
                    sortable: true,
                    thStyle: {width: "10%"},
                }
            ],
            tableData: [],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: "name",
            sortDesc: false,
        }
    },
    computed: {
        rows() {
            return this.tableData.length;
        }
    }
}
</script>

<style scoped>

</style>

<template>
    <div class="row">

        <div class="table-responsive mb-1">
            <b-table striped bordered :items="tableData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                <template v-slot:cell(index)="data">
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
</template>
