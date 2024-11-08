

<script>
import {mapActions} from "vuex";
import Swal from "sweetalert2";

export default {
    name: "GroupQuantitiesList",
    props:['groupId'],
    watch: {
        'groupId'() {
            this.searchQuantity();
        }
    },
    methods:{
        ...mapActions('admin/group', {
            apiGetListGroupQuantities: 'apiGetListGroupQuantities',
            apiGetGroupQuantityById: 'apiGetGroupQuantityById',
            apiAddGroupQuantity: 'apiAddGroupQuantity',
            apiEditGroupQuantity: 'apiEditGroupQuantity',
            apiDeleteGroupQuantity: 'apiDeleteGroupQuantity'
        }),
        searchQuantity(){
            let objInput = {group_id:this.groupId,start_date:this.searchQuantityStartDate,end_date:this.searchQuantityEndDate};
            console.log('searchQuantity',objInput);
            this.apiGetListGroupQuantities(objInput)
            .then(response => {
                if (response.err_code === 0) {
                    let data = response['data'];
                    console.log('getListGroupQuantities', data);
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
            this.resetAddData();
            this.actionType =1;
            this.groupQuantityModalTitle='Thêm mới sản lượng';
            this.$bvModal.show('modal-add_group-quantity');
        },
        onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        prepareEditGroupQuantity(id){
            this.actionType =2;
            this.groupQuantityModalTitle='Sửa sản lượng';

            this.apiGetGroupQuantityById({id:id})
                .then(response => {

                    if (response.err_code === 0) {
                        let data = response['data'];
                        this.groupQuantityObj = data[0];
                        console.log('apiGetGroupQuantityById', this.groupQuantityObj);
                        this.$bvModal.show('modal-add_group-quantity');
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
        deleteGroupQuantity(id){

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
                    this.apiDeleteGroupQuantity(objDel)
                        .then(response => {
                            console.log('apiDeleteGroupQuantity', response);
                            if (response.err_code === 0) {
                                this.searchQuantity();
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
                    if (result.value) {
                        Swal.fire("Deleted!", "Your file has been deleted.", "success");
                    }
                }

            });
        },
        closeModal(){
            this.$bvModal.hide('modal-add_group-quantity');
        },
        updateGroupQuantity(){
            if(this.actionType===1){
                this.groupQuantityObj.groupId = this.groupId;
                this.apiAddGroupQuantity(this.groupQuantityObj)
                    .then(response => {
                        console.log('apiAddGroupQuantity', response);
                        if (response.err_code === 0) {
                            this.$bvModal.hide('modal-add_group-quantity');
                            this.searchQuantity();
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
            }else if(this.actionType===2){
                this.apiEditGroupQuantity(this.groupQuantityObj)
                    .then(response => {
                        console.log('apiEditGroupQuantity', response);
                        if (response.err_code === 0) {
                            this.$bvModal.hide('modal-add_group-quantity');
                            this.searchQuantity();
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
        resetAddData(){
            this.groupQuantityObj={
                    id:-1,
                    zaloQuantities:0,
                    smsQuantities:0,
                    ussdQuantities:0,
                    otherQuantities:0
            }
        }
    },
    data: function () {
        return {

            searchQuantityStartDate:'',
            searchQuantityEndDate:'',
            fields: [
                {
                    key: "index",
                    label: "STT",
                    sortable: true,
                    thStyle: {width: "3%"},
                },
                {
                    key: "createDate",
                    label: "Ngày tạo",
                    sortable: true,
                    thStyle: {width: "12%"},
                },
                {
                    key: "smsQuantities",
                    label: "Sản lượng SMS",
                    sortable: true,
                    thStyle: {width: "10%"},
                },
                {
                    key: "ussdQuantities",
                    label: 'Sản lượng USSD',
                    sortable: true,
                    thStyle: {width: "10%"},
                },
                {
                    key: "zaloQuantities",
                    label: 'Sản lượng ZALO',
                    sortable: true,
                    thStyle: {width: "10%"},
                },
                {
                    key: "otherQuantities",
                    label: 'Sản lượng khác',
                    sortable: true,
                    thStyle: {width: "10%"},
                },
                {
                    key: "createdBy",
                    label: 'Người tạo',
                    sortable: true,
                    thStyle: {width: "10%"},
                },
                {
                    key: "updateDate",
                    label: 'Ngày cập nhật',
                    sortable: true,
                    thStyle: {width: "12%"},
                },
                {
                    key: "action",
                    label: 'Thao tác',
                    thStyle: {width: "6%"},
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
            groupQuantityModalTitle:'',
            actionType:-1,
            groupQuantityObj:{
                id:-1,
                zaloQuantities:0,
                smsQuantities:0,
                ussdQuantities:0,
                otherQuantities:0
            }
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
        <div class="row mb-3">
            <div class="col-3">
                <label>Từ ngày</label>
                <input type="date" v-model="searchQuantityStartDate" class="form-control"/>
            </div>
            <div class="col-9">
                <label>Đến ngày</label>
                <div class="row">
                    <div class="col-4">
                        <input type="date" v-model="searchQuantityEndDate" class="form-control"/>
                    </div>
                    <div class="col-2">
                        <button type="button" @click="searchQuantity" class="btn btn-primary d-block"><i class="uil uil-search me-2"></i> Tìm kiếm</button>
                    </div>
                    <div class="col-3">
                        <button type="button" class="btn btn-primary" @click="prepareAddQuantity"><i class="uil uil-plus me-2"></i> Cấp sản lượng</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="table-responsive mb-1">
            <b-table striped bordered :items="tableData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                <template v-slot:cell(index)="data">
                    {{ data.index + 1 }}
                </template>
                <template v-slot:cell(action)=data>
                    <ul class="list-inline mb-0">
                        <a title="Sửa sản lượng"
                           @click="prepareEditGroupQuantity(data.item.id)"
                           class="text-secondary pe-2"
                        ><i class="uil uil-pen font-size-18"></i>
                        </a>
                        <li class="list-inline-item">
                            <a
                                @click="deleteGroupQuantity(data.item.id)"
                                class="text-secondary"
                                v-b-tooltip.hover
                                title="Xóa sản lượng"
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
        <b-modal id="modal-add_group-quantity" size="lg" :title="groupQuantityModalTitle" title-class="font-18" hide-footer>
            <div class="row pb-3">
                <div class="col-6">
                    <label>Sản lượng SMS</label>
                    <input type="text" maxlength="150" v-model="groupQuantityObj.smsQuantities"  class="form-control"/>
                    <label>Sản lượng USSD</label>
                    <input type="text" maxlength="150" v-model="groupQuantityObj.ussdQuantities"  class="form-control"/>
                </div>
                <div class="col-6">
                    <label>Sản lượng Zalo</label>
                    <input type="text" maxlength="150" v-model="groupQuantityObj.zaloQuantities"  class="form-control"/>
                    <label>Sản lượng khác</label>
                    <input type="text" maxlength="150" v-model="groupQuantityObj.otherQuantities"  class="form-control"/>
                </div>
            </div>

            <!-- end card-body -->
            <div class="text-end mt-4">
                <button type="button" class="btn btn-default" @click="closeModal">Bỏ qua</button>
                <button type="button" class="btn btn-primary px-4" @click="updateGroupQuantity">Lưu</button>
            </div>
        </b-modal>
    </div>
</template>
