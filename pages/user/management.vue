
<script>
import {mapActions} from "vuex";
import CreateEditUser from "@/components/admin/modal/CreateEditUser";

export default {
    name: "user-management",
    mounted() {
        this.getListUser();
    },
    components:{
        CreateEditUser
    },
    methods: {
        ...mapActions('admin/user', {
            apiGetListUser: 'apiGetListUser'
        }),
        prepareAddUser(){
            this.isEditModalField = false;
            this.titleModal = 'Thêm mới người dùng';
            this.$bvModal.show('modal-add-user');
        },
        prepareEditUser(){
            this.isEditModalField = false;
            this.titleModal = 'Sửa người dùng';
            this.$bvModal.show('modal-add-user');
        },
        viewUser(){
            this.isEditModalField = true;
            this.titleModal = 'Thông tin người dùng';
            this.$bvModal.show('modal-add-user');
        },
        deleteUser(){

        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        getListUser(){
            let objInput = {groupId:-1};
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
        }
    },
    computed: {
        /**
         * Total no. of records
         */
        rows() {
            return this.tableData.length;
        }
    },data() {
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
                    label: "Tên tài khoản",
                    sortable: true,
                    thStyle: {width: "10%"},
                },
                {
                    key: "fullname",
                    label: "Họ và tên",
                    sortable: true,
                    thStyle: {width: "10%"},
                },
                {
                    key: "group_name",
                    label: 'Nhóm người dùng',
                    sortable: true,
                    thStyle: {width: "10%"},
                },
                {
                    key: "role",
                    label: 'Nhóm quyền',
                    sortable: true,
                    thStyle: {width: "15%"},
                },
                {
                    key: "email",
                    label: 'Email',
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
                },
                {
                    key: "action",
                    label: 'Thao tác',
                    thStyle: {width: "10%"},
                    tdClass: 'text-center',
                },
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
            actionType:-1,
            userEditId:-1
        }
    }
}
</script>

<template>
    <div class="row">
        <div class="card">
            <div class="card-header">
                <div class="row" style="float: right">
                    <div class="col-12">
                        <button type="button" class="btn btn-success" @click="prepareAddUser"><i class="uil uil-plus me-1"></i> Tạo mới người dùng</button>
                    </div>

                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive mb-1">
                    <b-table striped bordered :items="tableData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                        <template v-slot:cell(index)="data">
                            {{ data.index + 1 }}
                        </template>
                        <template v-slot:cell(action)=data>
                            <ul class="list-inline mb-0">
                                <a title="Xem nhóm quyền"
                                   @click="viewUser(data.item.id)"
                                   class="text-secondary p-2"
                                ><i class="uil uil-eye font-size-18"></i>
                                </a>
                                <a title="Sửa nhóm quyền"
                                   @click="prepareEditUser(data.item.id)"
                                   class="text-secondary pe-2"
                                ><i class="uil uil-pen font-size-18"></i>
                                </a>
                                <li class="list-inline-item">
                                    <a
                                        @click="deleteUser(data.item.id)"
                                        class="text-secondary"
                                        v-b-tooltip.hover
                                        title="Xóa nhóm quyền"
                                    >
                                        <i class="uil uil-trash-alt font-size-18"></i>
                                    </a>
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
    <create-edit-user :actionType="actionType"></create-edit-user>
    </div>
</template>



<style scoped>

</style>
