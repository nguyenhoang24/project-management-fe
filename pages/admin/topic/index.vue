<script>

import {mapActions} from "vuex";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import TopicModal from "@/components/topic/TopicModal.vue";

export default {
    middleware: ['check-authen'],
    name: "topic",
    components: {
        Multiselect,
        TopicModal
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
                    label: "Tên chủ đề",
                    sortable: true,
                },
                {
                    key: "createdDate",
                    label: "Thời gian tạo",
                    sortable: true,
                },
                {
                    key: "createdBy",
                    label: "Người tạo",
                    sortable: true,
                },
                {
                    key: "action",
                    label: "Thao tác",
                    tdClass: 'text-center',
                },
            ],
            tableData: [],
            idTopic: 0,
            codeStudent: '',
            objTopic: {
                id: 0,
                name: ""
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
        this.handleGetTopic();

        // this.getStudentClass();
    },
    methods: {
        ...mapActions('topic', {
            apiGetTopic: 'apiGetTopic',
            apiEditTopic: 'apiEditTopic',
            apiDeleteTopic: 'apiDeleteTopic',
            apiAddTopic: 'apiAddTopic',
        }),
        closeModalListSub() {
            this.$bvModal.hide('modal-add-list-topic');
        },

        handleGetTopic() {
            this.apiGetTopic(this.objTopic)
                .then(response => {
                    this.tableData = response;
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
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
        viewTopic(id) {
            this.isEditModalField = true;
            this.disableAdd = true;
            this.titleModal = 'Xem Chi Tiết';
            this.typeSegment = 3;
            this.idTopic = parseInt(id);
            this.codeStudent = id;
            this.flagModal = !this.flagModal;

            this.apiGetTopic({
                conditionSearch: 'ID',
                valueSearch: id,
            }).then(response => {
                this.objGetStudent = response[0];

                this.modalActionType = 3;

                this.flagModal = !this.flagModal;
                this.$bvModal.show('modal-add-topic');

            }).catch(err => {
                console.log(err)
            }).finally(() => {
            })
        },
        showModalTopic() {
            this.idTopic = -1;
            this.modalActionType = 1;
            this.objTopic.name = "";
            this.flagModal = !this.flagModal;
            this.$bvModal.show('modal-add-topic');
        },
        editTopic(id) {
            this.isEditModalField = false;
            this.titleModal = 'Sửa thông tin';
            this.typeStudent = 2;
            this.objTopic.id = parseInt(id);
            this.idTopic = parseInt(id);

            this.apiGetTopic({
                valueSearch: '',
                conditionSearch: ''
            }).then(response => {
                console.log(response);
                this.objTopic.name = response.name;
                this.modalActionType = 2;

                this.$bvModal.show('modal-add-topic');

            }).catch(err => {
                console.log(err)
            }).finally(() => {
            })
        },
        deleteTopic(id) {
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
                    this.apiDeleteTopic(id).then(response => {
                        Swal.fire("", "Xoá thành công", "success");
                        this.handleGetTopic();


                    }).catch(err => {
                        console.log(err);
                    }).finally(() => {
                        // this.commonLoadingPage(false);
                    })
                } else {
                }
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
                        <button type="button" class="btn btn-success" @click="showModalTopic"><i class="uil uil-plus me-1"></i> Tạo mới chủ đề</button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <b-table striped bordered :items="tableData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                        <template v-slot:cell(index)="data">
                            {{ data.index + 1 }}
                        </template>
                        <template #cell(createdDate)="row">
                            {{ formatDate(new Date(row.value)) }}
                        </template>
                        <template v-slot:cell(action)=data>
                            <div class="row align-items-center">
                                <button title="Xem chi tiết"
                                        @click="viewTopic(data.item.id)"
                                        class="btn btn-gray btn-block view-cart col-auto"
                                ><i class="uil uil-eye me-1"></i>
                                </button>

                                <button title="Sửa chi tiết"
                                        @click="editTopic(data.item.id)"
                                        class="btn btn-gray btn-block view-cart col-auto"
                                ><i class="uil uil-pen me-1"></i>
                                </button>

                                <button title="Xóa chi tiết"
                                        @click="deleteTopic(data.item.id)"
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
            :idTopic="idTopic"
            :actionType="modalActionType"
            :flagModal="flagModal"
            @handleGetTopic="handleGetTopic"
        >
        </student-modal>

        <topic-modal
            :idTopic="idTopic"
            :codeStudent="codeStudent"
            :actionType="modalActionType"
            :flagModal="flagModal"
            @handleGetTopic="handleGetTopic"
        >
        </topic-modal>
    </div>

</template>


