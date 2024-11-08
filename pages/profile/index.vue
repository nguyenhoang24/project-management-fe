<script>
import {getUserInfo} from '@/utils/cookieAuthen';
import {mapActions} from "vuex";
import Swal from "sweetalert2";

/**
 * Topbar component
 */
export default {
    head() {
        return {
            title: this.menuGetNameActive()
        };
    },
    components: {
        'ckeditor-nuxt': () => {
            if (process.client) {
                return import('@blowstack/ckeditor-nuxt')
            }
        },

    },
    data() {
        return {
            tableData: [],
            titleModal: "Nội quy",
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
                    key: "studentClass.course",
                    label: "Khóa",
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

            ],
            text: null,
            flag: null,
            value: null,
            user: {
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
            fieldsTeacher: [
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
                    key: "phone",
                    label: "Số điện thoại",
                    sortable: true,
                },
                {
                    key: "email",
                    label: "Email",
                    sortable: true,
                },
            ],
            showModal: false,
            eventModal: false,
            isEditModalField: false,
            userInfo: JSON.parse(getUserInfo()),
            objTeacher: {
                id: 0,
                conditionSearch: '',
                valueSearch: ''
            },
        };
    },
    mounted() {
        this.handleInitUser();
        this.handleInitStudent();
    },
    computed: {
        rows() {
            return this.tableData.length;
        }
    },
    methods: {
        getUserInfo,
        ...mapActions('authen', {
            apiLogout: 'apiLogout'
        }),
        ...mapActions('admin/students', {
            apiGetStudent: 'apiGetStudent',
            apiGetStudentClass: 'apiGetStudentClass'
        }),
        ...mapActions('admin/teachers', {
            apiGetTeacherById: 'apiGetTeacherById',
            apiAddRegulation: 'apiAddRegulation'
        }),
        ...mapActions('teachers', {
            apiGetStudentByTeacher: 'apiGetStudentByTeacher'
        }),
        /**
         * Toggle menu
         */
        handleInitUser() {
            if (JSON.parse(getUserInfo()).role === "ROLE_STUDENT") {

                this.apiGetStudent({
                    conditionSearch: "ID",
                    valueSearch: JSON.parse(getUserInfo()).studentId
                }).then(res => {
                    this.user = res[0];
                    this.user.class = res[0].studentClass.name + ' K' + res[0].studentClass.course;

                })

            }
            if (JSON.parse(getUserInfo()).role === "ROLE_TEACHER") {
                this.apiGetTeacherById({id: JSON.parse(getUserInfo()).teacherId}).then(res => {
                    this.user = res
                })
            }
        },
        handleInitStudent() {
            if(this.userInfo.role === 'ROLE_TEACHER') {
                this.objTeacher.id = this.userInfo.teacherId;
                this.apiGetStudentByTeacher(this.objTeacher).then(res => {
                    this.tableData = res;
                })
            } else
            if(this.userInfo.role === 'ROLE_STUDENT') {
                this.apiGetTeacherById({id: this.userInfo.teacherId}).then(res => {
                    this.tableData.push(res);
                })
            }
        },

        formatDate(d) {
            return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
        },
        menuGetNameActive() {
            let path = $nuxt.$route.path;
            let menuName = '';

            if (path === '' || path === '/') {
                menuName = 'Dashboard';
            } else if (path === '/customer') {
                menuName = 'Chăm sóc khách hàng';
            } else {

            }

            return menuName;
        },
        toggleMenu() {
            this.$parent.toggleMenu();
        },
        /**
         * Toggle rightsidebar
         */
        toggleRightSidebar() {
            this.$parent.toggleRightSidebar();
        },
        /**
         * Set languages
         */
        editSubmit(e) {
            this.submit = true;
            this.event.recipient = this.studentMail[0].value;

            this.apiEditReminder(this.event).then(response => {
                Swal.fire("", "Sửa thành công", "success");
                this.handleInitData();
            }).catch(err => {
                console.log(err);
                Swal.fire("", "Sửa không thành công", "error");
            }).finally(() => {
                // this.commonLoadingPage(false);
            });


            this.successmsg();
            this.eventModal = false;


        },
        prepareAddOne() {
            this.isEditModalField = false;
            this.isViewModalFileField = false;
            this.titleModal = 'Nội quy';

            this.apiGetTeacherById({id: JSON.parse(getUserInfo()).teacherId}).then(res => {
                this.teacher.regulation = res.regulation
            })
            console.log("user: ", this.teacher)

            this.$bvModal.show('modal-add-one');
        },
        closeModalSub() {
            this.$bvModal.hide('modal-add-one');
        },
        addEditOneSub() {
            this.teacher.id = JSON.parse(getUserInfo()).teacherId;
            this.apiAddRegulation(this.teacher)
                .then(response => {
                    this.teacher.regulation = response;
                    this.$bvModal.hide('modal-add-one');

                })
                .catch(err => {
                    console.log(err.message);

                })
                .finally(() => {
                    // this.commonLoadingPage(false);
                });


        },
        viewProject()  {
            this.$bvModal.show('project');
            this.$bvModal.hide('change-password');
        },
        viewChangePassword()  {
            this.$bvModal.show('change-password');
            this.$bvModal.hide('project');
        }

    },
};
</script>

<template>
    <div class="container-fluid">

        <!-- start page title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-flex align-items-center justify-content-between">
                    <h4 class="mb-0">Profile</h4>

                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Contacts</a></li>
                            <li class="breadcrumb-item active">Profile</li>
                        </ol>
                    </div>

                </div>
            </div>
        </div>
        <!-- end page title -->

        <div class="row mb-4">
            <div class="col-xl-4">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="text-center">

                            <div class="clearfix"></div>
                            <div>
                                <img src="~/assets/images/users/avatar.jpg" alt="" class="avatar-lg rounded-circle img-thumbnail">
                            </div>
                            <h5 class="mt-3 mb-1">{{ user.fullName }}</h5>

                            <div class="mt-4">
                                <button type="button" class="btn btn-light btn-sm"><i class="uil uil-envelope-alt me-2"></i> Message</button>
                            </div>
                        </div>

                        <hr class="my-4">

                        <div class="text-muted">
                            <div class="table-responsive mt-4">
                                <div class="mt-4">
                                    <p class="mb-1">Tên :</p>
                                    <h5 class="font-size-16">{{ user.fullName }}</h5>
                                </div>
                                <div class="row" :hidden="userInfo.role !== 'ROLE_STUDENT'">
                                    <div class="col-6">
                                        <p class="mb-1">Mã sinh viên :</p>
                                        <h5 class="font-size-16">{{ user.code }}</h5>
                                    </div>
                                    <div class="col-6">
                                        <p class="mb-1">Lớp :</p>
                                        <h5 class="font-size-16">{{ user.class }}</h5>
                                    </div>
                                </div>

                                <div class="mt-4">
                                    <p class="mb-1">Số điện thoại :</p>
                                    <h5 class="font-size-16">{{ user.phone }}</h5>
                                </div>
                                <div class="mt-4">
                                    <p class="mb-1">Email :</p>
                                    <h5 class="font-size-16">{{ user.email }}</h5>
                                </div>
                                <div class="mt-4">
                                    <p class="mb-1">Địa chỉ :</p>
                                    <h5 class="font-size-16">{{ user.address }}</h5>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-8">
                <div class="card mb-0">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs nav-tabs-custom nav-justified" role="tablist">
                        <li class="nav-item" role="presentation">
                            <nuxt-link :hidden="userInfo.role !== 'ROLE_TEACHER'" class="nav-link active" data-bs-toggle="tab" role="tab" aria-selected="true" to>
                                <i class="uil uil-user-circle font-size-20"></i>
                                <span class="d-none d-sm-block" >Danh sách sinh viên hướng dẫn</span>
                            </nuxt-link>
                            <nuxt-link :hidden="userInfo.role !== 'ROLE_STUDENT'" class="nav-link active" data-bs-toggle="tab" role="tab" aria-selected="true" to>
                                <i class="uil uil-user-circle font-size-20"></i>
                                <span class="d-none d-sm-block" >Giảng viên hướng dẫn</span>
                            </nuxt-link>
                        </li>
                    </ul>
                    <!-- Tab content -->
                    <div class="tab-content p-4">
                        <div class="tab-pane active" id="project" role="tabpanel">
                            <div>
                                <div>
                                    <h5 :hidden="userInfo.role !== 'ROLE_STUDENT'" class="font-size-16 mb-4">Thông tin liên hệ</h5>

                                    <div class="table-responsive">
                                        <b-table striped bordered :items="tableData" :fields="userInfo.role === 'ROLE_TEACHER' ? fields : fieldsTeacher" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                                            <template v-slot:cell(index)="data">
                                                {{ data.index + 1 }}
                                            </template>
                                            <template #cell(dob)="row">
                                                {{ formatDate(new Date(row.value)) }}
                                            </template>
                                        </b-table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <!-- end row -->

    </div>
</template>
