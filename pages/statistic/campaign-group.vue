<script>
import {barChartStatistic, lineChartStatistic} from "@/pages/charts/apex/data";
import MdFilterCampaignGroup from "@/components/statistic/MdFilterCampaignGroup.vue";
/**
 * Advanced-table component
 */
export default {
    name: "campaign-group",
    components: {
        MdFilterCampaignGroup
    },
    data() {
        return {
            lineChartStatistic: lineChartStatistic,
            barChartStatistic: barChartStatistic,
            tableData: [
                {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Data Coordiator',
                    status: 'Đã duyệt',
                    date: '2018/07/29',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Data Coordiator',
                    status: 'Đã duyệt',
                    date: '2019/07/13',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Senior Developer',
                    status: 'Đã duyệt',
                    date: '2019/04/08',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Graphic Designer',
                    status: 'Đã duyệt',
                    date: '2018/12/14',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Marketing Assistant',
                    status: 'Đã duyệt',
                    date: '2019/06/19',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Account Representative III',
                    status: 'Đã duyệt',
                    date: '2019/07/08',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Senior Cost Accountant',
                    status: 'Đã duyệt',
                    date: '2019/02/22',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Assistant Manager',
                    status: 'Đã duyệt',
                    date: '2019/04/23',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Automation Specialist III',
                    status: 'Đã duyệt',
                    date: '2019/03/27',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Biostatistician I',
                    status: 'Đã duyệt',
                    date: '2018/12/02',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Senior Developer',
                    status: 'Đã duyệt',
                    date: '2018/08/19',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Developer II',
                    status: 'Đã duyệt',
                    date: '2018/12/10',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Senior Developer',
                    status: 'Đã duyệt',
                    date: '2018/12/07',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Senior Financial Analyst',
                    status: 'Đã duyệt',
                    date: '2018/11/05',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Office Assistant III',
                    status: 'Đã duyệt',
                    date: '2018/09/26',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Executive Secretary',
                    status: 'Đã duyệt',
                    date: '2018/09/28',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Marketing Manager',
                    status: 'Đã duyệt',
                    date: '2018/11/15',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Social Worker',
                    status: 'Đã duyệt',
                    date: '2018/12/01',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Chemical Engineer',
                    status: 'Đã duyệt',
                    date: '2019/03/25',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Recruiting Manager',
                    status: 'Đã duyệt',
                    date: '2018/12/04',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Quality Engineer',
                    status: 'Đã duyệt',
                    date: '2018/10/04',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Senior Editor',
                    status: 'Đã duyệt',
                    date: '2018/07/30',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Programmer II',
                    status: 'Đã duyệt',
                    date: '2019/05/16',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Operator',
                    status: 'Đã duyệt',
                    date: '2019/07/16',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Mechanical Systems Engineer',
                    status: 'Đã duyệt',
                    date: '2019/07/09',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Paralegal',
                    status: 'Đã duyệt',
                    date: '2018/12/14',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Systems Administrator II',
                    status: 'Đã duyệt',
                    date: '2019/05/15',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Research Associate',
                    status: 'Đã duyệt',
                    date: '2018/09/28',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Accounting Assistant II',
                    status: 'Đã duyệt',
                    date: '2018/08/20',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Project Manager',
                    status: 'Đã duyệt',
                    date: '2019/04/28',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Structural Analysis Engineer',
                    status: 'Đã duyệt',
                    date: '2019/02/22',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Sales Representative',
                    status: 'Đã duyệt',
                    date: '2018/10/19',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Senior Financial Analyst',
                    status: 'Đã duyệt',
                    date: '2019/02/06',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Assistant Media Planner',
                    status: 'Đã duyệt',
                    date: '2018/08/12',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Assistant Manager',
                    status: 'Đã duyệt',
                    date: '2019/04/30',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Assistant Media Planner',
                    status: 'Đã duyệt',
                    date: '2019/05/29',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Staff Accountant II',
                    status: 'Đã duyệt',
                    date: '2019/07/18',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Desktop Support Technician',
                    status: 'Đã duyệt',
                    date: '2018/09/12',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Paralegal',
                    status: 'Đã duyệt',
                    date: '2019/02/15',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Assistant Media Planner',
                    status: 'Đã duyệt',
                    date: '2019/05/26',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Operator',
                    status: 'Đã duyệt',
                    date: '2018/11/18',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Operator',
                    status: 'Đã duyệt',
                    date: '2019/06/06',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Human Resources Assistant I',
                    status: 'Đã duyệt',
                    date: '2019/05/01',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Assistant Media Planner',
                    status: 'Đã duyệt',
                    date: '2019/03/16',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Quality Engineer',
                    status: 'Đã duyệt',
                    date: '2018/10/14',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'VP Quality Control',
                    status: 'Đã duyệt',
                    date: '2018/08/27',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Nurse Practicioner',
                    status: 'Đã duyệt',
                    date: '2018/11/02',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Environmental Specialist',
                    status: 'Đã duyệt',
                    date: '2018/12/11',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                }, {
                    nameCampaign: 'Tên chiến dịch',
                    campaignId: '#12345',
                    creator: 'Nguyễn Văn A',
                    updater: 'Legal Assistant',
                    status: 'Đã duyệt',
                    date: '2019/01/21',
                    typeCampaign: 'Đầu số',
                    deploymentForm: 'Hình thức triển khai'
                },
            ],

            title: "campaign-group",
            items: [{
                text: "Tables"
            },
                {
                    text: "campaign-group",
                    active: true
                }
            ],
            flavours: [
                'Tên chiến dịch',
                'ID chiến dịch',
                'Người tạo',
                'Thời gian tạo',
                'Người cập nhật',
                'Trạng thái chiến dịch',
                'Loại chiến dịch',
                'Hình thức triển khai',
                'Thao tác',
            ],
            selected: [],
            allSelected: false,
            indeterminate: false,
            showTable: true,
            showCharts: false,
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
                    key: "nameCampaign",
                    label: 'Tên chiến dịch',
                    sortable: true
                },
                {
                    key: "campaignId",
                    label: 'ID chiến dịch',
                    sortable: true
                },
                {
                    key: "creator",
                    label: 'Người tạo',
                    sortable: true
                },
                {
                    key: "date",
                    label: 'Thời gian tạo',
                    sortable: true
                },
                {
                    key: "updater",
                    label: 'Người cập nhật',
                    sortable: true
                },
                {
                    key: "status",
                    label: 'Trạng thái chiến dịch',
                    sortable: true,
                },
                {
                    key: "typeCampaign",
                    label: 'Loại chiến dịch',
                    sortable: true,
                },
                {
                    key: "deploymentForm",
                    label: 'Hình thức triển khai',
                    sortable: true,
                },
                {
                    key: "manipulation",
                    label: '',
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
        searchCustomer() {
            console.log('customer')
        },
        toggleAll(checked) {
            this.selected = checked ? this.flavours.slice() : []
        },
        handleReset() {
            console.log('handleActionReset')
            this.showTable =  true;
            this.showCharts =  false;
        },
        handleFilter() {
            console.log('handleActionFilter')
        },
        handleActionChart() {
            console.log('handleActionChart')
            this.showTable =  false;
            this.showCharts =  true;
        },
        handleActionSetting() {
            console.log('handleActionSetting')
        },
        handleCloseChart() {
            console.log('close chart')
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
                                    <option>Giờ</option>
                                    <option>Tuần</option>
                                    <option>Tháng</option>
                                    <option>Quý</option>
                                    <option>Năm</option>
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
                            <div class="table-responsive mb-1" v-if="showTable">
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
                            <div class="row" v-if="showTable">
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
                            <md-filter-campaign-group></md-filter-campaign-group>
                        </div>
                        <div v-show="tabActive == 2">Chính thức</div>
                        <div v-show="tabActive == 3">Tổng hợp</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="showCharts">
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h4 class="card-title mb-4">Số lượt yêu cầu quảng cáo</h4>
                            <div>
                                <i class="uil uil-edit-alt font-size-18 me-4 cursor-pointer"></i>
                                <i class="uil uil-multiply font-size-18 cursor-pointer" @click="handleCloseChart"></i>
                            </div>
                        </div>
                        <!-- Bar Chart -->
                        <apexchart class="apex-charts" height="500" type="bar" dir="ltr" :series="barChartStatistic.series" :options="barChartStatistic.chartOptions"></apexchart>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h4 class="card-title mb-4">Start journey</h4>
                            <div>
                                <i class="uil uil-edit-alt font-size-18 me-4 cursor-pointer"></i>
                                <i class="uil uil-multiply font-size-18 cursor-pointer" @click="handleCloseChart"></i>
                            </div>
                        </div>
                        <!-- Line Chart -->
                        <apexchart class="apex-charts" height="500" type="line" dir="ltr" :series="lineChartStatistic.series" :options="lineChartStatistic.chartOptions"></apexchart>
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
