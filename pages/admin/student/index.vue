<script>

import {mapActions} from "vuex";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import StudentModal from "../../../components/student/StudentModal.vue";
import AddStudentModal from "../../../components/student/AddStudentModal.vue";
import AddDetailModal from "../../../components/project/AddDetailModal";

export default {
    middleware: ['check-authen'],
    name: "subscriber",
    components: {
        Multiselect,
        AddDetailModal,
        AddStudentModal,
        StudentModal
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
                    key: "code",
                    label: "Mã Sinh Viên",
                    sortable: true,
                },
                {
                    key: "fullName",
                    label: "Tên Sinh Viên",
                    sortable: true,
                },
                {
                    key: "studentClass.name",
                    label: "Lớp ",
                    sortable: true,
                },
                {
                    key: "dob",
                    label: "Ngày sinh",
                    sortable: true,
                },
                {
                    key: "studentClass.course",
                    label: "Khóa",
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
            idStudent: 0,
            codeStudent: '',
            objGetStudent: {
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
            objGetListStudent: {
                id: 0
            },
            modalActionType: -1,
            flagModal: false,
            studentClass: [],
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
        this.handleGetStudent();

        // this.getStudentClass();
    },
    methods: {
        ...mapActions('admin/students', {
            apiGetStudent: 'apiGetStudent',
            apiDeleteStudent: 'apiDeleteStudent',
            apiSearchStudent: 'apiSearchStudent',
            apiImportStudent: 'apiImportStudent',
            apiGetStudentClass: 'apiGetStudentClass'
        }),
        closeModalListSub() {
            this.$bvModal.hide('modal-add-list-tb');
        },
        getStudentClass() {
            this.apiGetStudentClass().then(response => {
                this.studentClass = response;
            })
        },
        addListSub() {
            this.errorValidate = [];
            let formData = new FormData();
            if (this.fileUpload === null) {
                this.commonNotifyVue('Bạn phải chọn file chứa danh sách thuê bao', 'warn');
            } else {
                formData.append('fileExcel', this.fileUpload);
                console.log(formData);

                this.apiImportStudent(formData)
                    .then(response => {
                        console.log('apiAddBlacklist', response);
                        if (response === null) {
                            this.$emit('handleGetStudent');
                            this.$bvModal.hide('modal-add-file-student');
                        } else {
                            this.commonWarningVue("bug");
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
        handleGetStudent() {
            this.commonLoadingPage(true);
            this.apiGetStudent(this.objGetStudent)
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
            if (this.conditionSearch !== '' && this.conditionSearch !== 'ALL') {
                if (this.valueSearch.trim() === '') {
                    this.commonNotifyVue('Bạn phải nhập từ khóa tìm kiếm', 'warn');
                    return;
                }
            }
            this.apiGetStudent(objInput)
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
        viewStudent(id) {
            this.isEditModalField = true;
            this.disableAdd = true;
            this.titleModal = 'Xem Chi Tiết';
            this.typeSegment = 3;
            this.idStudent = parseInt(id);
            this.codeStudent = id;
            this.flagModal = !this.flagModal;

            this.apiGetStudent({
                conditionSearch: 'ID',
                valueSearch: id,
            }).then(response => {
                this.objGetStudent = response[0];

                console.log("object student:: ", this.objGetStudent)

                this.modalActionType = 3;

                this.flagModal = !this.flagModal;
                this.$bvModal.show('modal-add-event');

            }).catch(err => {
                console.log(err)
            }).finally(() => {
            })
        },
        showModalStudent() {
            this.idStudent = -1;
            this.modalActionType = 1;
            this.objGetStudent.name = "";
            this.objGetStudent.dob = "";
            this.objGetStudent.gender = "";
            this.objGetStudent.phone = "";
            this.objGetStudent.email = "";
            this.objGetStudent.address = "";
            this.objGetStudent.code = "";
            this.objGetStudent.class = "";
            this.flagModal = !this.flagModal;
            this.$bvModal.show('modal-add-event');
        },
        prepareEditStudent(id) {
            this.isEditModalField = false;
            this.titleModal = 'Sửa thông tin';
            this.typeStudent = 2;
            this.objGetStudent.id = parseInt(id);
            this.idStudent = parseInt(id);

            this.apiGetStudent({
                id: id,
                valueSearch: '',
                conditionSearch: ''
            }).then(response => {
                console.log(response);
                this.objGetStudent.code = response.code;
                this.objGetStudent.name = response.fullName;
                this.objGetStudent.dob = response.dob;
                this.objGetStudent.gender = response.gender;
                this.objGetStudent.phone = response.phone;
                this.objGetStudent.email = response.email;
                this.objGetStudent.address = response.address;
                this.modalActionType = 2;

                this.$bvModal.show('modal-add-event');

            }).catch(err => {
                console.log(err)
            }).finally(() => {
            })
        },
        deleteStudent(id) {
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
                    this.apiDeleteStudent(id).then(response => {
                        console.log("in")
                        Swal.fire("", response.err_message, "success");
                        this.handleGetStudent();


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
                        <button type="button" class="btn btn-primary" v-b-modal.modal-add-file-student><i class="uil uil-arrow-circle-up me-1"></i> Tải tập SV</button>
                        <button type="button" class="btn btn-success" @click="showModalStudent"><i class="uil uil-plus me-1"></i> Tạo mới sinh viên</button>
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
                            <option value="PHONE">Số điện thoại</option>
                            <option value="EMAIL">Email</option>
                            <option value="CLASS">Lớp</option>
                            <option value="CODE">Mã sinh viên</option>
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
                                        @click="viewStudent(data.item.id)"
                                        class="btn btn-gray btn-block view-cart col-auto"
                                ><i class="uil uil-eye me-1"></i>
                                </button>

                                <button title="Sửa chi tiết"
                                        @click="prepareEditStudent(data.item.id)"
                                        class="btn btn-gray btn-block view-cart col-auto"
                                ><i class="uil uil-pen me-1"></i>
                                </button>

                                <button title="Xóa chi tiết"
                                        @click="deleteStudent(data.item.id)"
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

        <student-modal
            :idStudent="idStudent"
            :actionType="modalActionType"
            :flagModal="flagModal"
            @handleGetStudent="handleGetStudent"
        >
        </student-modal>

        <add-student-modal
            :idStudent="idStudent"
            :codeStudent="codeStudent"
            :actionType="modalActionType"
            :flagModal="flagModal"
            @handleGetStudent="handleGetStudent"
        >
        </add-student-modal>
    </div>

</template>


