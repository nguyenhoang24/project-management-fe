<script>


import "vue2-dropzone/dist/vue2Dropzone.min.css";
import Swal from "sweetalert2";
import {mapActions} from "vuex";
import AddBlacklist from "@/components/setting/AddBlacklist";

/**
 * Product-detail component
 */
export default {
    head() {
        return {

            title: `Sửa Blacklist`
        };
    },
    components: {AddBlacklist},
    data() {
        return {
            titleModal: '',
            isEditModalField: false,
            isViewModalFileField: false,
            blacklistNam:'',
            blacklistId:'',
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
            subModal:{
                modalId:'',
                modalMsisdn:'',
                modalBlacklistId:this.blacklistId,
                modalBlacklistName:''
            },
            fields: [
            {
                key: "stt",
                label: "STT",
                sortable: true,
                thStyle: { width: "3%" },
            },
            {
                key: "id",
                label: "ID SĐT",
                sortable: true,
                thStyle: { width: "10%" },
            },
            {
                key: "msisdn",
                label: 'SĐT',
                sortable: true,
                thStyle: { width: "20%" },
            },
            {
                key: "userName",
                label: 'Tài khoản',
                sortable: true,
                thStyle: { width: "10%" },
            },
            {
                key: "createdDate",
                label: 'Thời gian tạo',
                sortable: true,
                thStyle: { width: "10%" },
            },
                {
                    key: "action",
                    label: 'Thao tác',
                    thStyle: { width: "10%"},
                    tdClass: 'text-center',
                }
        ],
            tableData: []

        }
    },
    middleware: "authentication",

    methods: {
        ...mapActions('setting/blacklist', {
            apiGetListSub: 'apiGetListSub',
            apiAddSub:'apiAddSub',
            apiGetSubById:'apiGetSubById',
            apiDeleteSub:'apiDeleteSub',
            apiUpdateBlacklistName:'apiUpdateBlacklistName'
        }),
        prepareView(id) {
            this.isEditModalField = true;
            this.isViewModalFileField = true;
            this.titleModal = 'Xem thông tin TB';
            this.$bvModal.show('modal-add-one-tb');
            let objInput ={contactId:id}
            this.apiGetSubById(objInput)
                .then(response => {
                    let data = response['data'];
                    this.subModal = data[0];
                    console.log('apiGetSubById', data);
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

        },
        prepareAddOne() {
            this.isEditModalField = false;
            this.isViewModalFileField = false;
            this.titleModal = 'Tải đơn liên hệ vào tập TB';
            this.$bvModal.show('modal-add-one-tb');
            this.subModal = {modalId:'',
                modalMsisdn:'',
                modalBlacklistId:this.blacklistId,
                modalBlacklistName:''}
        },
        prepareEditOne(id) {
            this.isEditModalField = false;
            this.isViewModalFileField = true;
            this.titleModal = 'Sửa thông tin TB';
            this.$bvModal.show('modal-add-one-tb');
            let objInput ={contactId:id}
            this.apiGetSubById(objInput)
                .then(response => {
                    let data = response['data'];
                    this.subModal = data[0];
                    console.log('apiGetSubById', data);
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

        },
        updateBlacklistName() {
            let objInput ={id:this.blacklistId,blacklistName:this.blacklistNam};
            console.log(objInput);
            this.apiUpdateBlacklistName(objInput)
                .then(response => {
                    console.log('apiUpdateBlacklistName', response);
                    if (response.err_code === 0) {
                        this.commonNotifyVue('Cập nhật tên tệp blacklist thành công','info')
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
        closeModalSub() {
            this.$bvModal.hide('modal-add-one-tb');
        },
        addEditOneSub() {
                this.apiAddSub(this.subModal)
                    .then(response => {
                        console.log('apiAddSub', response);
                        if (response.err_code === 0) {
                            this.searchSub();
                            this.$bvModal.hide('modal-add-one-tb');
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
        closeModalListSub() {
            this.$bvModal.hide('modal-add-file-blacklist');
        },
        goToPrev() {
            this.$router.go(-1);
        },
        deleteSub(id) {
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
                    if(result.value){
                        let objDel ={id:id};
                        this.apiDeleteSub(objDel)
                            .then(response => {
                                console.log('apiDeleteSub', response);
                                if (response.err_code === 0) {
                                    Swal.fire("", response.err_message, "success");
                                    this.searchSub();
                                } else {
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                            .finally(() => {
                                // this.commonLoadingPage(false);
                            });

                        if (result.value) {
                            Swal.fire("Deleted!", "Your file has been deleted.", "success");
                        }
                    }
            });

        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        searchSub(){
            let objInput={conditionSearch:this.conditionSearch,valueSearch:this.valueSearch,startDate:this.startDate,endDate:this.endDate,blacklistId:this.blacklistId};

            console.log('apiGetListSub', objInput);

            this.apiGetListSub(objInput)
                .then(response => {
                    let data = response['data'];
                    this.tableData = data;
                    console.log('apiGetListSub', data);
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

        },
        handleModalCall(){
            this.searchSub();
        }
    },
    created() {
        this.blacklistNam = this.$route.query.name;
        this.blacklistId = this.$route.query.id;
    },
    mounted() {
        this.searchSub();
    },
    computed:{
        rows() {
            return this.tableData.length;
        }
    }
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
                                <input type="text" v-model="blacklistNam" style="width: 200px">
                                <button title="Sửa tên tệp" @click="updateBlacklistName"
                                        class="btn btn-gray btn-block view-cart"
                                ><i class="uil uil-pen me-1"></i>
                                </button>
                            </div>
                            <div class="col-6 text-end">
                                <button type="button" class="btn btn-success" v-b-modal.modal-add-file-blacklist><i class="uil uil-plus me-1"></i> Thêm danh sách liên hệ vào tập TB</button>
                                <button type="button" class="btn btn-primary" @click="prepareAddOne"><i class="uil uil-arrow-circle-up ms-1"></i> Tải đơn liên hệ vào tập TB</button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">

                        <div class="row mb-3">
                            <div class="col-3">
                                <label>Điều kiện lọc</label>
                                <select v-model="conditionSearch" class="form-control">
                                    <option value=""></option>
                                    <option value="-1">Tất cả</option>
                                    <option value="ID">ID SĐT</option>
                                    <option value="SDT">Số điện thoại</option>
                                </select>
                            </div>
                            <div class="col-2">
                                <label>Giá trị tìm kiếm</label>
                                <div class="row">

                                    <input type="text" v-model="valueSearch" class="form-control"/>

                                </div>
                            </div>
                            <div class="col-3">
                                <label>Thời gian bắt đầu</label>
                                <input type="date" v-model="startDate" class="form-control"/>
                            </div>
                            <div class="col-4">
                                <label>Thời gian kết thúc</label>
                                <div class="row">
                                    <div class="col-8">

                                        <input type="date" v-model="endDate" class="form-control"/>
                                    </div>
                                    <div class="col-4">
                                        <button type="button" @click="searchSub" class="btn btn-primary d-block"><i class="uil uil-search me-2"></i> Tìm kiếm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <b-table striped bordered :items="tableData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                                <template v-slot:cell(action) = data>
                                    <button title="Xem TB" @click="prepareView(data.item.id)"
                                            class="btn btn-gray btn-block view-cart"
                                    ><i class="uil uil-eye me-1"></i>
                                    </button>

                                    <button title="Xóa TB" @click="deleteSub(data.item.id)"
                                            class="btn btn-gray btn-block view-cart"
                                    ><i class="uil uil-trash me-1"></i>
                                    </button>
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

        <b-modal id="modal-add-one-tb"
                 size="lg"
                 :title="titleModal"
                 title-class="font-18"
                 hide-footer>
            <div class="card-body">
                <div class="row mb-3">

                    <div class="col-12">
                        <label>Số điện thoại</label>
                        <input type="text" maxlength="15" v-model="subModal.modalMsisdn" :disabled="isEditModalField" class="form-control"/>
                    </div>
                </div>

                <div class="card-footer text-end">
                    <button type="button" class="btn btn-primary" @click="closeModalSub" v-show="!isEditModalField">Bỏ qua</button>
                    <button type="button" class="btn btn-success" @click="addEditOneSub" v-show="!isEditModalField"><i class="uil uil-save me-1"></i> Lưu lại</button>

                </div>
            </div>

        </b-modal>
        <add-blacklist @handleModalCall="handleModalCall" :actionType="2" :blacklistIdEdit="blacklistId"></add-blacklist>
    </div>
</template>
