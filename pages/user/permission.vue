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
                    key: "name",
                    label: "Quyền",
                    sortable: true,
                }
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
        this.handleGetRole();

    },
    methods: {
        ...mapActions('admin/role', {
            apiGetListRole: 'apiGetListRole'
        }),
        closeModalListSub() {
            this.$bvModal.hide('modal-add-list-tb');
        },
        handleGetRole() {
            this.apiGetListRole()
                .then(response => {
                    this.tableData = response;
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                })
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        formatDate(d) {
            return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
        },
        searchContact() {

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

            </div>
            <div class="card-body">

                <div class="table-responsive">
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
        </div>


    </div>

</template>


