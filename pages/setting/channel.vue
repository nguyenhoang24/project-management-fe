
<script>

import {mapActions} from "vuex";
import ChannelModal from "../../components/setting/ChannelModal";
import Swal from "sweetalert2";

export default {
    name: "event",
    components: {
        ChannelModal
    },
    mounted() {
        this.searchChannel();
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
                    label: "Tên kênh",
                    sortable: true,
                    thStyle: {width: "20%"},
                },
                {
                    key: "channelGroup",
                    label: "Nhóm kênh",
                    sortable: true,
                    thStyle: {width: "20%"},
                },
                {
                    key: "prefixBrand",
                    label: 'Đầu số QC/ Brandname QC',
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
            channelModalActionType:-1,
            channelEditId:-1,
            channelFlagModal: false
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
        ...mapActions('setting/channel', {
            apiGetListChannel: 'apiGetListChannel',
            apiDeleteChannel: 'apiDeleteChannel'
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
                        this.apiDeleteChannel(objDel)
                            .then(response => {
                                console.log('apiDeleteChannel', response);
                                if (response.err_code === 0) {
                                    Swal.fire("", response.err_message, "success");
                                    this.searchChannel();
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
        showModalChannel(){
            this.channelEditId=-1;
            this.channelModalActionType=1;
            this.channelFlagModal = !this.channelFlagModal;
            this.$bvModal.show('modal-add-channel');
        },
        searchChannel(){
            let objInput= {status: -1};
            this.apiGetListChannel(objInput)
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
        handleAfterAction(){
            this.searchChannel();
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
            this.channelEditId=id;
            this.channelModalActionType=2;

            this.channelFlagModal = !this.channelFlagModal;
            this.$bvModal.show('modal-add-channel');
        },
        prepareViewEvent(id){
            this.channelEditId=id;
            this.channelModalActionType=3;

            this.channelFlagModal = !this.channelFlagModal;
            this.$bvModal.show('modal-add-channel');
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
                                <b-button v-b-modal.modal-add-event variant="outline-primary" @click="showModalChannel" class="ms-2"><i class="uil uil-plus me-2"></i> Thêm kênh</b-button>
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
                                        <a title="Xem kênh"
                                                    @click="prepareViewEvent(data.item.id)"
                                                   class="text-secondary p-2"
                                        ><i class="uil uil-eye font-size-18"></i>
                                        </a>
                                        <a title="Sửa kênh"
                                                   @click="prepareEditEvent(data.item.id)"
                                                   class="text-secondary pe-2"
                                        ><i class="uil uil-pen font-size-18"></i>
                                        </a>
                                        <li class="list-inline-item">
                                            <a
                                                @click="handleDelete(data.item.id)"
                                                class="text-secondary"
                                                v-b-tooltip.hover
                                                title="Xóa kênh"
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
            </div>
        </div>
        <channel-modal @handleAfterAction="handleAfterAction" :channelFlagModal="channelFlagModal" :channelActionType="channelModalActionType" :channelEditId="channelEditId"></channel-modal>
    </div>
</template>


