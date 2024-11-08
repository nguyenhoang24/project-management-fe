
<script>

import {mapActions} from "vuex";
import EventModal from "../../components/setting/EventModal";
import Swal from "sweetalert2";

export default {
    name: "event",
    components: {
        EventModal
    },
    mounted() {
        this.searchEvent();
    },
    data() {
        return {
            fields: [
                {
                    key: "index",
                    label: "STT",
                    sortable: true,
                    thStyle: {width: "3%"},
                },
                {
                    key: "name",
                    label: "Tên Event",
                    sortable: true,
                    thStyle: {width: "20%"},
                },
                {
                    key: "createdBy",
                    label: 'Tài khoản',
                    sortable: true,
                    thStyle: {width: "20%"},
                },
                {
                    key: "status",
                    label: 'Trạng thái',
                    sortable: true,
                    thStyle: {width: "10%"},
                },
                {
                    key: "dataSource",
                    label: 'Nguồn sự kiện',
                    sortable: true,
                    thStyle: {width: "20%"},
                },
                {
                    key: "dataType",
                    label: 'Loại dữ liệu',
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
            modalActionType:-1,
            eventEditId:-1,
            flagModal: false
        }
    },
    computed: {
        /**
         * Total no. of records
         */
        rows() {
            return this.tableData.length;
        }
    },
    methods: {
        ...mapActions('setting/event', {
            apiGetListEvent: 'apiGetListEvent',
            apiDeleteEvent: 'apiDeleteEvent',
            apiChangeEventStatus: 'apiChangeEventStatus'
        }),
        handleDelete(val) {
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
                        let objDel ={id:val};
                        this.apiDeleteEvent(objDel)
                            .then(response => {
                                console.log('apiDeleteEvent', response);
                                if (response.err_code === 0) {
                                    Swal.fire("", response.err_message, "success");
                                    this.searchEvent();
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
        showModalEvent(){
            this.eventEditId=-1;
            this.modalActionType=1;

            this.flagModal = !this.flagModal;
            this.$bvModal.show('modal-add-event');
        },
        searchEvent(){
            let objInput= {status: -1};
            this.apiGetListEvent(objInput)
                .then(response => {
                    console.log('init dữ liệu', response);

                    if (response.err_code === 0) {
                        let data = response['data'];
                        this.tableData = data;
                        console.log('init dữ liệu', data);
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
        hanleAfterAction(){
            this.searchEvent()
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        changeEventStatus(id,oldStatus){
            let status=-1;
            if(oldStatus==='Active')
                status =0;
            if(oldStatus==='Inactive')
                status=1;
            let objInput ={id:id,status:status};
            this.apiChangeEventStatus (objInput)
                .then(response => {
                    console.log('apiChangeEventStatus', response);
                    if (response.err_code === 0) {
                        Swal.fire("", response.err_message, "success");
                        this.searchEvent();
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
        prepareEditEvent(id){
            this.eventEditId=id;
            this.modalActionType=2;

            this.flagModal = !this.flagModal;
            this.$bvModal.show('modal-add-event');
        },
        prepareViewEvent(id){
            this.eventEditId=id;
            this.modalActionType=3;

            this.flagModal = !this.flagModal;
            this.$bvModal.show('modal-add-event');
        }
    }
}
</script>

<style scoped>

</style>

<template>
    <div>
        <!-- Search -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row text-end">
                            <div class="col-12 col-sm-12">
                                <b-button v-b-modal.modal-add-event variant="outline-primary" @click="showModalEvent" class="ms-2"><i class="uil uil-plus me-2"></i> Thêm định nghĩa Event</b-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Table data -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <!-- Table -->
                        <div class="table-responsive mb-1">
                            <b-table striped bordered :items="tableData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                                <template v-slot:cell(index)="data">
                                    {{ data.index + 1 }}
                                </template>
                                <template v-slot:cell(action)=data>
                                    <ul class="list-inline mb-0">
                                        <a title="Xem Event"
                                                    @click="prepareViewEvent(data.item.id)"
                                                   class="text-secondary p-2"
                                        ><i class="uil uil-eye font-size-18"></i>
                                        </a>
                                        <a title="Sửa Event"
                                                   @click="prepareEditEvent(data.item.id)"
                                                   class="text-secondary pe-2"
                                        ><i class="uil uil-pen font-size-18"></i>
                                        </a>
                                        <li class="list-inline-item">
                                            <a
                                                @click="handleDelete(data.item.id)"
                                                class="text-secondary"
                                                v-b-tooltip.hover
                                                title="Xóa Event"
                                            >
                                                <i class="uil uil-trash-alt font-size-18"></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" @click="changeEventStatus(data.item.id,data.item.status)" type="checkbox" id="flexSwitchCheckChecked" v-model="data.item.status==='Active'">
                                                <label class="form-check-label" for="flexSwitchCheckChecked"></label>
                                            </div>
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
            </div>
        </div>
        <event-modal @hanleAfterAction="hanleAfterAction" :flagModal="flagModal" :actionType="modalActionType" :eventEditId="eventEditId"></event-modal>
    </div>
</template>


