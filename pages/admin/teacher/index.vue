<script>

import {mapActions} from "vuex";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import TeacherModal from "../../../components/teacher/TeacherModal.vue";

export default {
    middleware: ['check-authen'],
    name: "subscriber",
    components: {
        Multiselect,
        TeacherModal
    },
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
                    key: "fullName",
                    label: "Tên Giảng Viên",
                    sortable: true,
                },
                {
                    key: "dob",
                    label: "Ngày sinh",
                    sortable: true,
                },
                {
                    key: "address",
                    label: "Địa chỉ",
                    sortable: true,
                },
                {
                    key: "phone",
                    label: "Số điện thoại",
                    sortable: true,
                },
                {
                    key: "email",
                    label: "Email",
                    sortable: true,
                },
                {
                    key: "action",
                    label: "Thao tác",
                    tdClass: 'text-center',
                },
            ],
            tableData: [],
            idTeacher: 0,
            objGetTeacher: {
                id: 0,
                fullName: "",
                dob: "",
                gender: "",
                phone: "",
                email: "",
                address: ""
            },
            objGetListTeacher: {
                id: 0
            },
            modalActionType: -1,
            flagModal: false
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
        this.handleGetTeacher();
        this.handleGetListTeacher();
    },
    methods: {
        ...mapActions('admin/teachers', {
            apiGetListTeacher: 'apiGetListTeacher',
            apiGetTeacher: 'apiGetTeacher',
            apiGetTeacherById: 'apiGetTeacherById',
            apiDeleteTeacher: 'apiDeleteTeacher',
            apiSearchTeacher: 'apiSearchTeacher'
        }),
        handleGetListTeacher() {
            this.apiGetListTeacher(this.objGetListTeacher)
                .then(response => {
                    if (response.err_code === 0) {
                        this.teachersOptions = response.data
                    }
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                })
        },
        handleGetTeacher() {
            this.commonLoadingPage(true);
            this.apiGetTeacher(this.objGetTeacher)
                .then(response => {
                    console.log('apiGetListContactGroup', response)
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
            if (this.conditionSearch !== '') {
                if (this.valueSearch.trim() === '') {
                    this.commonNotifyVue('Bạn phải nhập từ khóa tìm kiếm', 'warn');
                    return;
                }
            }
            this.apiSearchTeacher(objInput)
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
        viewTeacher(id) {
            this.isEditModalField = true;
            this.disableAdd = true;
            this.titleModal = 'Xem Chi Tiết';
            this.typeSegment = 3;
            this.idTeacher = parseInt(id);
            this.objGetTeacher.id = parseInt(id);

            this.flagModal = !this.flagModal;

            this.apiGetTeacherById(this.objGetTeacher).then(response => {
                console.log("response:: ", response)
                this.objGetTeacher.name = response.fullName;
                this.objGetTeacher.dob = response.dob;
                this.objGetTeacher.gender = response.gender;
                this.objGetTeacher.phone = response.phone;
                this.objGetTeacher.email = response.email;
                this.objGetTeacher.address = response.address;

                console.log("object teacher:: ", this.objGetTeacher)

                this.modalActionType = 3;

                this.flagModal = !this.flagModal;
                this.$bvModal.show('modal-add-event');

            }).catch(err => {
                console.log(err)
            }).finally(() => {
            })
        },
        showModalTeacher() {
            this.idTeacher = -1;
            this.modalActionType = 1;
            this.objGetTeacher.name = "";
            this.objGetTeacher.dob = "";
            this.objGetTeacher.gender = "";
            this.objGetTeacher.phone = "";
            this.objGetTeacher.email = "";
            this.objGetTeacher.address = "";
            this.flagModal = !this.flagModal;
            this.$bvModal.show('modal-add-event');
        },
        prepareEditTeacher(id) {
            this.isEditModalField = false;
            this.titleModal = 'Sửa thông tin';
            this.typeTeacher = 2;
            this.objGetTeacher.id = parseInt(id);
            this.idTeacher = parseInt(id);

            this.teachersValue = [];
            this.listConditions = [];

            this.apiGetTeacherById(this.objGetTeacher).then(response => {
                console.log(response);
                this.objGetTeacher.name = response.fullName;
                this.objGetTeacher.dob = response.dob;
                this.objGetTeacher.gender = response.gender;
                this.objGetTeacher.phone = response.phone;
                this.objGetTeacher.email = response.email;
                this.objGetTeacher.address = response.address;
                this.modalActionType = 2;

                this.$bvModal.show('modal-add-event');

            }).catch(err => {
                console.log(err)
            }).finally(() => {
            })
        },
        deleteTeacher(id) {
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
                    this.apiDeleteTeacher(id).then(response => {
                        console.log("in")
                        Swal.fire("", response.err_message, "success");
                        this.handleGetTeacher();


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
                <div class="row" style="float: right">
                    <div class="col-12">
                        <button type="button" class="btn btn-success" @click="showModalTeacher"><i class="uil uil-plus me-1"></i> Tạo mới giảng viên</button>
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
                            <option value="NAME">Tên</option>
                            <option value="PHONE">Số điện thoại</option>
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
                        <template v-slot:cell(action)=data>
                            <div class="row align-items-center">
                                <button title="Xem chi tiết"
                                        @click="viewTeacher(data.item.id)"
                                        class="btn btn-gray btn-block view-cart col-auto"
                                ><i class="uil uil-eye me-1"></i>
                                </button>

                                <button title="Sửa Segment"
                                        @click="prepareEditTeacher(data.item.id)"
                                        class="btn btn-gray btn-block view-cart col-auto"
                                ><i class="uil uil-pen me-1"></i>
                                </button>

                                <button title="Xóa Segment"
                                        @click="deleteTeacher(data.item.id)"
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
        <teacher-modal
            :idTeacher="idTeacher"
            :actionType="modalActionType"
            :flagModal="flagModal"
            @handleGetTeacher="handleGetTeacher"
        >
        </teacher-modal>
    </div>

</template>


