<script>

import {mapActions} from "vuex";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import UserModal from "../../components/admin/UserModal.vue";

export default {
    middleware: ['check-authen'],
    name: "subscriber",
    components: {
        Multiselect,
        UserModal
    },
    data() {
        return {
            fileUpload: null,
            items: [{
                text: "Forms",
                href: "/"
            },
                {
                    text: "Form File Upload",
                    active: true
                }
            ],
            conditionSearch: '',
            valueSearch: '',
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
                    key: "username",
                    label: "Tên tài khoản",
                    sortable: true,
                },
                {
                    key: "email",
                    label: "Email",
                    sortable: true,
                },
                {
                    key: "roles[0].name",
                    label: "Quyền",
                    sortable: true,
                },
                {
                    key: "action",
                    label: "Thao tác",
                    tdClass: 'text-center',
                },
            ],
            tableData: [],
            idUser: 0,
            codeUser: '',
            objGetUser: {
                id: 0,
                code: "",
                fullName: "",
                dob: "",
                gender: "",
                phone: "",
                email: "",
                address: "",
                class: ""
            },
            objUser: {
                id: 0,
                username: "",
                password: "",
                email: "",
                status: "",
                roles: [],
                role: {
                    id: "",
                    name: ""
                }
            },
            objGetListUser: {
                id: 0
            },
            modalActionType: -1,
            flagModal: false,
            myDateFormat: ''
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
        // this.searchContact();
        this.handleGetUser();

    },
    methods: {
        ...mapActions('admin/user', {
            apiGetUser: 'apiGetUser',
            apiSaveUser: 'apiSaveUser',
            apiUpdateUser: 'apiUpdateUser',
            apiDeleteUser: 'apiDeleteUser'
        }),
        closeModalListSub() {
            this.$bvModal.hide('modal-add-list-tb');
        },
        handleGetUser() {
            let objInput = {conditionSearch: this.conditionSearch, valueSearch: this.valueSearch};
            this.commonLoadingPage(true);
            this.apiGetUser(objInput)
                .then(response => {
                    this.tableData = response;
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                    this.commonLoadingPage(false);
                })
        },
        searchContact() {
            let objInput = {conditionSearch: this.conditionSearch, valueSearch: this.valueSearch};
            console.log('apiGetListContactGroup', objInput);
            if (this.conditionSearch !== '' && this.conditionSearch !== 'ALL') {
                if (this.valueSearch.trim() === '') {
                    this.commonNotifyVue('Bạn phải nhập từ khóa tìm kiếm', 'warn');
                    return;
                }
            }
            this.apiGetUser(objInput)
                .then(response => {
                    let data = response;
                    this.tableData = data;
                    console.log('apiGetListContactGroup', data);
                })
                .catch(err => {
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
        viewUser(id) {
            this.isEditModalField = true;
            this.disableAdd = true;
            this.titleModal = 'Xem Chi Tiết';
            this.typeSegment = 3;
            this.idUser = parseInt(id);
            this.codeUser = id;

            this.flagModal = !this.flagModal;

            this.apiGetUser({
                conditionSearch: 'ID',
                valueSearch: id,
            }).then(response => {
                this.objUser = response[0];

                console.log("object student:: ", this.objUser)

                this.modalActionType = 3;

                this.flagModal = !this.flagModal;
                this.$bvModal.show('modal-add-event');

            }).catch(err => {
                console.log(err)
            }).finally(() => {
            })
        },
        showModalUser() {
            this.idUser = -1;
            this.modalActionType = 1;
            this.objUser.username = "";
            this.objUser.password = "";
            this.objUser.email = "";
            this.objUser.status = "";
            this.objUser.roles = [];
            this.flagModal = !this.flagModal;
            this.$bvModal.show('modal-add-event');
        },
        prepareEditUser(id) {
            this.isEditModalField = false;
            this.titleModal = 'Sửa thông tin';
            this.typeUser = 2;
            this.objUser.id = parseInt(id);
            this.idUser = parseInt(id);

            this.apiGetUser({
                id: id,
                valueSearch: '',
                conditionSearch: ''
            }).then(response => {
                console.log(response);
                this.objUser.username = response.username;
                this.objUser.password = response.password;
                this.objUser.email = response.email;
                this.objUser.status = response.status;
                this.objUser.roles = response.roles;
                this.modalActionType = 2;

                this.$bvModal.show('modal-add-event');

            }).catch(err => {
                console.log(err)
            }).finally(() => {
            })
        },
        deleteUser(id) {
            console.log("id: ", id);

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
                if (result.isConfirmed) {
                    this.apiDeleteUser(id).then(response => {
                        console.log("in")
                        Swal.fire("", response.err_message, "success");
                        this.handleGetUser();


                    }).catch(err => {
                        console.log(err);
                    }).finally(() => {
                        // this.commonLoadingPage(false);
                    })
                } else {
                }
                if (result.value) {
                    Swal.fire("Deleted!", "Your file has been deleted.", "success");
                }
            });
        },
        changeContactGroupStatus(id, oldStatus) {
            let status = -1;
            if (oldStatus === 1)
                status = 0;
            if (oldStatus === 0)
                status = 1;
            let objInput = {id: id, status: status};
            this.apiChangeContactGroupStatus(objInput)
                .then(response => {
                    console.log('apiChangeContactGroupStatus', response);
                    if (response.err_code === 0) {
                        Swal.fire("", response.err_message, "success");
                        this.searchContact();
                        // this.searchContact();
                    } else {
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    // this.commonLoadingPage(false);
                });

        },
        handleModalCall() {
            this.searchContact();
        },
        formatDate(d) {
            return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
        }
    }
}
</script>

<style scoped>

</style>


<template>
    <div class="row">
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-6"></div>
                    <div class="col-6 text-end">
                        <button type="button" class="btn btn-success" @click="showModalUser"><i class="uil uil-plus me-1"></i> Tạo mới tài khoản</button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-5">
                        <label>Điều kiện lọc</label>
                        <select v-model="conditionSearch" class="form-control">
                            <option value="ALL">Tất cả</option>
                            <option value="NAME">Tên</option>
                            <option value="EMAIL">Email</option>
                        </select>
                    </div>
                    <div class="col-7">
                        <label>Từ khóa tìm kiếm</label>
                        <div class="row">
                            <div class="col-10">
                                <input type="text" v-model="valueSearch" class="form-control"/>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-primary d-block" @click="searchContact"><i class="uil uil-search me-2"></i> Tìm kiếm</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <b-table striped bordered :items="tableData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                        <template v-slot:cell(index)="data">
                            {{ data.index + 1 }}
                        </template>
                        <template #cell(dob)="row">
                            {{ formatDate(new Date(row.value)) }}
                        </template>
                        <template v-slot:cell(action)=data>
                            <div class="row align-items-center">
                                <button title="Xem chi tiết"
                                        @click="viewUser(data.item.id)"
                                        class="btn btn-gray btn-block view-cart col-auto"
                                ><i class="uil uil-eye me-1"></i>
                                </button>

                                <button title="Sửa tài khoản"
                                        @click="prepareEditUser(data.item.id)"
                                        class="btn btn-gray btn-block view-cart col-auto"
                                ><i class="uil uil-pen me-1"></i>
                                </button>

                                <button title="Xóa tài khoản"
                                        @click="deleteUser(data.item.id)"
                                        class="btn btn-gray btn-block view-cart col-auto"
                                ><i class="uil uil-trash me-1"></i>
                                </button>

                            </div>
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

        <user-modal
            :idUser="idUser"
            :actionType="modalActionType"
            :flagModal="flagModal"
            @handleGetUser="handleGetUser"
        >
        </user-modal>

    </div>

</template>


