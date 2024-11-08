<script>
import MdFilterFrame from "@/components/statistic/MdFilterFrame.vue";

/**
 * Advanced-table component
 */
export default {
    name: "frame",
    components: {MdFilterFrame},
    data() {
        return {
            tableData: [
                {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/07/29',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/07/13',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/04/08',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/12/14',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/06/19',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/07/08',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/02/22',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/04/23',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/03/27',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/12/02',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/08/19',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/12/10',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/12/07',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/11/05',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/09/26',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/09/28',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/11/15',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/12/01',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/03/25',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/12/04',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/10/04',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/07/30',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/05/16',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/07/16',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/07/09',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/12/14',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/05/15',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/09/28',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/08/20',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/04/28',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/02/22',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/10/19',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/02/06',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/08/12',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/04/30',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/05/29',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/07/18',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/09/12',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/02/15',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/05/26',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/11/18',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/06/06',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/05/01',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/03/16',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/10/14',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/08/27',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/11/02',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2018/12/11',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                }, {
                    numberOfRequests: '123',
                    numberOfAds: '345',
                    numberOfInteractions: '345,231',
                    numberOfConversions: '2,341',
                    interactionRate: '70%',
                    date: '2019/01/21',
                    conversionRate: '20%',
                    numberRefuse: '124',
                    rejectionRate: '10%',
                },
            ],

            title: "frame",
            items: [{
                text: "Tables"
            },
                {
                    text: "frame",
                    active: true
                }
            ],
            flavours: [
                'Thời gian',
                'Số lượt yêu cầu',
                'Số lượt quảng cáo',
                'Số lượt tương tác',
                'Số lượt chuyển đổi',
                'Tỷ lệ tương tác',
                'Tỷ lệ chuyển đổi',
                'Số lượng từ chối quảng cáo',
                'Tỷ lệ từ chối quảng cáo',
            ],
            selected: [],
            allSelected: false,
            indeterminate: false,
            tabActive: 1,
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
                    key: "date",
                    label: 'Thời gian',
                    sortable: true
                },
                {
                    key: "numberOfRequests",
                    label: 'Số lượt yêu cầu',
                    sortable: true
                },
                {
                    key: "numberOfAds",
                    label: 'Số lượt quảng cáo',
                    sortable: true
                },
                {
                    key: "numberOfInteractions",
                    label: 'Số lượt tương tác',
                    sortable: true
                },
                {
                    key: "numberOfConversions",
                    label: 'Số lượt chuyển đổi',
                    sortable: true
                },
                {
                    key: "interactionRate",
                    label: 'Tỷ lệ tương tác',
                    sortable: true,
                },
                {
                    key: "conversionRate",
                    label: 'Tỷ lệ chuyển đổi',
                    sortable: true,
                },
                {
                    key: "numberRefuse",
                    label: 'Số lượng từ chối quảng cáo',
                    sortable: true,
                },
                {
                    key: "rejectionRate",
                    label: 'Tỷ lệ từ chối quảng cáo',
                    sortable: true,
                },

            ]
        };
    },
    computed: {
        /**
         * Total no. of records
         */
        rows() {
            return this.tableData.length;
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.items.length;
    },
    methods: {
        /**
         * Search the table data with search input
         */
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        handleOkFilter(evt) {
            evt.preventDefault();
        },
        handleResetForm(evt) {
            evt.preventDefault();
        },
        searchCustomer() {
            console.log('customer')
        },
        toggleAll(checked) {
            this.selected = checked ? this.flavours.slice() : []
        },
        handleReset() {
            console.log('handleActionReset')
        },
        handleFilter() {
            console.log('handleActionFilter')
        },
        handleActionChart() {
            console.log('handleActionChart')
        },
        handleActionSetting() {
            console.log('handle setting')
        }
    },
    middleware: "authentication"
};
</script>

<template>
    <div>
        <!-- Search -->
        <!--        <div class="row">-->
        <!--            <div class="col-12">-->
        <!--                <div class="card">-->
        <!--                    <div class="card-body">-->
        <!--                        <div class="row">-->
        <!--                            <div class="col-3">-->
        <!--                                <label>Thuê bao</label>-->
        <!--                                <input type="text" class="form-control form-control-sm" placeholder="Nhập SĐT"/>-->
        <!--                            </div>-->
        <!--                            <div class="col-3">-->
        <!--                                <label>Date Range</label>-->
        <!--                                <br />-->
        <!--                                <date-picker-->
        <!--                                    v-model="daterange"-->
        <!--                                    range-->
        <!--                                    append-to-body-->
        <!--                                    lang="vi"-->
        <!--                                    confirm-->
        <!--                                    placeholder="Từ ngày - đến ngày"-->
        <!--                                ></date-picker>-->
        <!--                            </div>-->
        <!--                            <div class="col-3">-->
        <!--                                <label>Kênh truyền thông</label>-->
        <!--                                <select class="form-select form-select-sm">-->
        <!--                                    <option>Chọn</option>-->
        <!--                                    <option>Large select</option>-->
        <!--                                    <option>Small select</option>-->
        <!--                                </select>-->
        <!--                            </div>-->
        <!--                            <div class="col-2">-->
        <!--                                <label>&ensp;</label>-->
        <!--                                <button type="button" class="btn btn-sm btn-primary d-block"><i class="uil uil-search me-2"></i> Tìm kiếm</button>-->
        <!--                            </div>-->
        <!--                        </div>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->
        <!-- Table data -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row mb-4">
                            <div class="col">
                                <label>Tên chiến dịch</label>
                                <input type="number" class="form-control" placeholder="Tên, mã chiến dịch"/>
                            </div>
                            <div class="col">
                                <label>Từ ngày</label>
                                <input type="date" value="" class="form-control"/>
                            </div>
                            <div class="col">
                                <label>Đến ngày</label>
                                <input type="date" value="" class="form-control"/>
                            </div>
                            <div class="col">
                                <label>Thời gian báo cáo</label>
                                <select class="form-select">
                                    <option>Chọn</option>
                                    <option>Hôm nay</option>
                                    <option>Hôm qua</option>
                                    <option>Tuần này</option>
                                    <option>Tuần trước</option>
                                    <option>Tháng này</option>
                                    <option>Tháng trước</option>
                                    <option>Năm nay</option>
                                </select>
                            </div>
                            <div class="col">
                                <label>&ensp;</label>
                                <button @click="searchCustomer" type="button" class="btn btn-primary d-block"><i class="uil uil-search me-2"></i> Tìm kiếm</button>
                            </div>
                        </div>
                        <div class="row mb-1 align-items-center">
                            <div class="col-6">
                                <span class="tab-active cursor-pointer p-1" @click="tabActive = 1" :class="tabActive == 1 ? 'border-active text-active' : ''">Thử nghiệm</span>
                                <span class="tab-active cursor-pointer p-1" @click="tabActive = 2" :class="tabActive == 2 ? 'border-active text-active' : ''">Chính thức</span>
                                <span class="tab-active cursor-pointer p-1" @click="tabActive = 3" :class="tabActive == 3 ? 'border-active text-active' : ''">Tổng hợp</span>
                            </div>
                            <div class="col-6 text-end">
                                <b-dropdown variant="outline-secondary" ref="dropdown" menu-class="custom-dropdown" toggle-class="test-toggle">
                                    <template v-slot:button-content>
                                        Thiết lập cột
                                        <i class="mdi mdi-chevron-down"></i>
                                    </template>
                                    <b-form-checkbox
                                        v-model="allSelected"
                                        :indeterminate="indeterminate"
                                        aria-describedby="flavours"
                                        aria-controls="flavours"
                                        @change="toggleAll"
                                    >
                                        Tất cả
                                    </b-form-checkbox>
                                    <b-form-checkbox-group
                                        id="flavors"
                                        v-model="selected"
                                        :options="flavours"
                                        aria-describedby="flavours"
                                        name="flavors"
                                        class="ml-4 custom-check-group"
                                        aria-label="Individual flavours"
                                        stacked
                                    ></b-form-checkbox-group>
                                    <b-button @click="handleActionSetting" variant="primary" class="w-100">Áp dụng</b-button>
                                </b-dropdown>
                                <button @click="handleFilter" type="button" class="btn btn-outline-secondary pe-lg-4 ps-lg-4" v-b-modal.modal-filter>
                                    <i class="uil uil-filter mr-2"></i> Lọc
                                </button>
                                <button @click="handleReset" type="button" class="btn btn-outline-secondary pe-lg-4 ps-lg-4">
                                    <i class="uil uil-history mr-2"></i> Trở về mặc định
                                </button>
                            </div>
                        </div>
                        <!-- Table -->
                        <div v-show="tabActive == 1">
                            <div class="table-responsive mb-1">
                                <b-table hover bordered :items="tableData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                                    <template v-slot:cell(status)="data">
                                        <div
                                            class="badge badge-pill bg-soft-success font-size-12"
                                            :class="{
                                                  'bg-soft-danger': data.item.status === 'Chargeback',
                                                  'bg-soft-warning': data.item.status === 'unpaid',
                                            }"
                                        >
                                            {{ data.item.status }}
                                        </div>
                                    </template>
                                    <template v-slot:cell(manipulation)>
                                        <div>
                                            <i @click="handleActionChart" class="uil uil-chart-bar font-size-18 cursor-pointer"></i>
                                            <i class="uil uil-file-download-alt font-size-18"></i>
                                        </div>
                                    </template>
                                </b-table>
                            </div>
                            <div class="row">
                                <div class="col-6 d-inline-flex">
                                    <label class="d-inline-flex align-items-center mb-0 pb-0">
                                        <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>
                                        Chiến dịch/Trang
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
                            <md-filter-frame></md-filter-frame>
                        </div>
                        <div v-show="tabActive == 2">Chính thức</div>
                        <div v-show="tabActive == 3">Tổng hợp</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/*.custom-select {*/
/*    border-radius: 1.25rem;*/
/*    padding: 0.5rem;*/
/*    margin-right: 0.5rem;*/
/*}*/

/*.form-control-sm {*/
/*    padding: 0.5rem;*/
/*}*/

/*.form-select-sm {*/
/*    padding: 0.5rem;*/
/*}*/

/*.btn-sm {*/
/*    padding: 0.5rem 1rem;*/
/*}*/

.tab-active {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #808191;
}

.text-active {
    color: #004390 !important;
}
.border-active {
    border-bottom: 1px solid #004390;
}
</style>
