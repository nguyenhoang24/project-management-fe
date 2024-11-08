<!--<script>-->
<!--import {mapActions} from "vuex";-->
<!--import MdCampaignApproveInfo from '@/components/campaign/manage/modal/MdCampaignApproveInfo.vue';-->
<!--import MdCampaignApproveDataInput from '@/components/campaign/manage/modal/MdCampaignApproveDataInput.vue';-->

<!--export default {-->
<!--    data() {-->
<!--        return {-->
<!--            tableTemplate: {-->
<!--                data: [],-->
<!--                totalRows: 1,-->
<!--                currentPage: 1,-->
<!--                perPage: 10,-->
<!--                pageOptions: [10, 25, 50, 100],-->
<!--                filter: "",-->
<!--                fields: [-->
<!--                    {-->
<!--                        label: "STT",-->
<!--                        sortable: true-->
<!--                    },-->
<!--                    {-->
<!--                        key: 'campaignCode',-->
<!--                        label: "Mã chiến dịch",-->
<!--                        sortable: true-->
<!--                    },-->
<!--                    {-->
<!--                        key: 'name',-->
<!--                        label: "Tên chiến dịch",-->
<!--                        sortable: true-->
<!--                    },-->
<!--                    {-->
<!--                        key: 'managementUnit',-->
<!--                        label: "Đơn vị quản lý",-->
<!--                        sortable: true-->
<!--                    },-->
<!--                    {-->
<!--                        key: 'campaignStatusName',-->
<!--                        label: "Trạng thái",-->
<!--                        sortable: true-->
<!--                    },-->
<!--                    {-->
<!--                        key: 'numberBroad',-->
<!--                        label: "Số lượng phát",-->
<!--                        sortable: true-->
<!--                    },-->
<!--                    {-->
<!--                        key: 'numberTarget',-->
<!--                        label: "Mục tiêu",-->
<!--                        sortable: true-->
<!--                    },-->
<!--                    {-->
<!--                        key: 'startTime',-->
<!--                        label: "Thời gian bắt đầu",-->
<!--                        sortable: true-->
<!--                    },-->
<!--                    {-->
<!--                        key: 'endTime',-->
<!--                        label: "Thời gian kết thúc",-->
<!--                        sortable: true-->
<!--                    },-->
<!--                    {-->
<!--                        key: 'createdAt',-->
<!--                        label: "Ngày tạo",-->
<!--                        sortable: true-->
<!--                    },-->
<!--                    {-->
<!--                        key: 'campaignType',-->
<!--                        label: "Loại chiến dịch",-->
<!--                        sortable: false-->
<!--                    },-->
<!--                    {-->
<!--                        key: 'campaignRunType',-->
<!--                        label: "Hình thức chạy",-->
<!--                        sortable: false-->
<!--                    }-->
<!--                ],-->
<!--                rowSelected: null-->
<!--            },-->
<!--            items: [{-->
<!--                text: "Tables"-->
<!--            },-->
<!--                {-->
<!--                    text: "Advanced",-->
<!--                    active: true-->
<!--                }-->
<!--            ],-->
<!--            totalRows: 1,-->
<!--            currentPage: 1,-->
<!--            perPage: 10,-->
<!--            pageOptions: [10, 25, 50, 100],-->
<!--            filter: null,-->
<!--            filterOn: [],-->
<!--            sortBy: "age",-->
<!--            sortDesc: false,-->
<!--            searchOptionsStatus: [-->
<!--                {name: 'Đã duyệt', value: 'APPROVED'},-->
<!--                {name: 'Chưa duyệt', value: 'PENDING'},-->
<!--                {name: 'Đang chạy', value: 'ACTIVE'},-->
<!--                {name: 'Tạm dừng', value: 'STOP'},-->
<!--                {name: 'Draft', value: 'DRAFT'}],-->
<!--            searchOptionsStatusSelected: [],-->
<!--            searchOptionsGroup: [],-->
<!--            searchOptionsGroupSelected: [],-->
<!--            searchCampaignName: '',-->
<!--            searchCampaignTag: '',-->
<!--            searchCampaignCode: '',-->
<!--            searchRunTimeQc: '',-->
<!--            searchCreatedTimeQc: '',-->
<!--            filterOptionsChannelSelected: [],-->
<!--            filterOptionsChannels: [],-->
<!--            filterOptionsCampaignTypeSelected: [],-->
<!--            filterOptionsCampaignType: [-->
<!--                {campaignType: 'Batch Campaign'},-->
<!--                {campaignType: 'Event campaign'}-->
<!--            ],-->
<!--            filterOptionsCampaignTypeRunSelected: [],-->
<!--            filterOptionsCampaignTypeRun: [-->
<!--                {campaignRunType: 'Chiến dịch chạy nhiều ngày'},-->
<!--                {campaignRunType: 'Chiến dịch chạy nhiều ngày'},-->
<!--                {campaignRunType: 'Chạy liên tục'}-->
<!--            ],-->
<!--            filterOptionsCampaignTimeQC: [],-->
<!--            filterOptionsCampaignTimeQCSelected: [],-->
<!--            filterOptionsCampaignTimeCreate: [],-->
<!--            filterOptionsCampaignTimeCreateSelected: [],-->
<!--            filterOptionCampaignCodeSelected: [],-->
<!--            filterOptionCampaignCode: [],-->
<!--            filterOptionCampaignNameSelected: [],-->
<!--            filterOptionCampaignName: [],-->
<!--            filterOptionCampaignTagSelected: [],-->
<!--            filterOptionCampaignTag: [],-->
<!--            filterOptionCampaignCorpSelected: [],-->
<!--            filterOptionCampaignCorp: [],-->
<!--            filterTempRunDate: [],-->
<!--            filterTempCreateDate: [],-->
<!--            filterTempCorp: [],-->
<!--            filterTempType: [],-->
<!--            filterTempTypeRun: [],-->
<!--            filterTempTag: [],-->
<!--            filterTempChannel: [],-->
<!--            payloadSearch: {-->
<!--                name: '',-->
<!--                managementUnit: '',-->
<!--                timeAds: '',-->
<!--                timeCreate: '',-->
<!--                campaignStatus: '',-->
<!--                tag: '',-->
<!--                campaignCode: ''-->
<!--            },-->
<!--            filterResult: [],-->
<!--            campaignSelected: {},-->
<!--            isFilter: false-->
<!--        };-->
<!--    },-->
<!--    components: {-->
<!--        MdCampaignApproveInfo,-->
<!--        MdCampaignApproveDataInput-->
<!--    },-->
<!--    computed: {},-->
<!--    mounted() {-->
<!--        this.handleGetListChannel();-->
<!--        this.handleGetListGroup();-->
<!--        this.handleGetListCampaign();-->
<!--    },-->
<!--    methods: {-->
<!--        ...mapActions('campaign/manage', {-->
<!--            apiCopyCampaign: 'apiCopyCampaign',-->
<!--            apiDeleteCampaign: 'apiDeleteCampaign',-->
<!--            apiGetListCampaign: 'apiGetListCampaign',-->
<!--            apiCampaignActionStartStop: 'apiCampaignActionStartStop',-->
<!--            apiApproveCampaign: 'apiApproveCampaign'-->
<!--        }),-->
<!--        ...mapActions('admin/group', {-->
<!--            apiGetListGroup: 'apiGetListAgency'-->
<!--        }),-->
<!--        ...mapActions('setting/channel', {-->
<!--            apiGetListChannel: 'apiGetListChannel'-->
<!--        }),-->
<!--        handleGetListChannel() {-->
<!--            let payload = {status: 1};-->
<!--            this.apiGetListChannel(payload)-->
<!--                .then(response => {-->
<!--                    if (response['err_code'] === 0) {-->
<!--                        this.filterOptionsChannels = response['data'];-->
<!--                    } else {-->
<!--                        this.commonNotifyVue(response['err_message'], 'warn');-->
<!--                    }-->
<!--                })-->
<!--                .catch(err => {-->
<!--                    console.log(err);-->
<!--                })-->
<!--                .finally(() => {-->
<!--                    this.commonLoadingPage(false);-->
<!--                });-->
<!--        },-->
<!--        handleGetListGroup() {-->
<!--            let payload = {status: -1};-->
<!--            this.apiGetListGroup(payload)-->
<!--                .then(response => {-->
<!--                    console.log('init dữ liệu', response);-->
<!--                    if (response.err_code === 0) {-->
<!--                        let data = response['data'];-->
<!--                        this.searchOptionsGroup.push(...data);-->
<!--                    } else {-->
<!--                        this.commonNotifyVue(response['err_message'], 'warn');-->
<!--                    }-->
<!--                })-->
<!--                .catch(err => {-->
<!--                    console.log(err);-->
<!--                })-->
<!--                .finally(() => {-->
<!--                    this.commonLoadingPage(false);-->
<!--                });-->
<!--        },-->
<!--        handleGetListCampaign() {-->
<!--            let managementUnitValue = [];-->
<!--            for (let i = 0; i < this.searchOptionsGroupSelected.length; i++) {-->
<!--                let obj = this.searchOptionsGroupSelected[i];-->
<!--                if (obj.id !== '-1') {-->
<!--                    managementUnitValue.push(obj.id);-->
<!--                }-->
<!--            }-->

<!--            let statusTemp = '';-->
<!--            for (let i = 0; i < this.searchOptionsStatusSelected.length; i++) {-->
<!--                let obj = this.searchOptionsStatusSelected[i];-->
<!--                if (obj.value !== '-1') {-->
<!--                    statusTemp += ',' + obj.value;-->
<!--                }-->
<!--            }-->
<!--            let statuss = '';-->
<!--            if (statusTemp !== '')-->
<!--                statuss = '(' + statusTemp.substring(1) + ')';-->


<!--            this.payloadSearch = {-->
<!--                name: this.searchCampaignName,-->
<!--                managementUnit: managementUnitValue,-->
<!--                timeAdsFrom: this.searchRunTimeQc === '' ? "" : this.$moment(this.searchRunTimeQc[0], 'YYYY-MM-DD').format('YYYY-MM-DD'),-->
<!--                timeAdsTo: this.searchRunTimeQc === '' ? "" : this.$moment(this.searchRunTimeQc[1], 'YYYY-MM-DD').format('YYYY-MM-DD'),-->
<!--                timeCreateFrom: this.searchCreatedTimeQc === '' ? "" : this.$moment(this.searchCreatedTimeQc[0], 'YYYY-MM-DD').format('YYYY-MM-DD'),-->
<!--                timeCreateTo: this.searchCreatedTimeQc === '' ? "" : this.$moment(this.searchCreatedTimeQc[1], 'YYYY-MM-DD').format('YYYY-MM-DD'),-->
<!--                campaignStatus: statuss,-->
<!--                tag: this.searchCampaignTag,-->
<!--                campaignCode: this.searchCampaignCode-->
<!--            }-->

<!--            this.apiGetListCampaign(this.payloadSearch)-->
<!--                .then(response => {-->
<!--                    console.log('handleGetListCampaign: ', response);-->
<!--                    if (response.err_code === 0) {-->
<!--                        console.log('handleGetListCampaign: ', response.data);-->
<!--                        this.tableTemplate.data = response.data;-->
<!--                        this.tableTemplate.totalRows = this.tableTemplate.data.length;-->

<!--                        this.filterOptionCampaignName = response.data;-->
<!--                        this.filterOptionCampaignCode = response.data;-->
<!--                        this.filterTempTypeRun = response.data;-->
<!--                        this.filterTempType = response.data;-->
<!--                        this.filterTempTag = response.data;-->
<!--                        this.filterTempCorp = response.data;-->
<!--                        this.filterTempRunDate = response.data;-->
<!--                        this.filterTempCreateDate = response.data;-->
<!--                        this.filterTempChannel = response.data;-->

<!--                        this.filterOptionsCampaignTimeQC = response.data.filter(-->
<!--                            (value, index, self) => self.findIndex((m) => m.startTime === value.startTime) === index,-->
<!--                        );-->
<!--                        this.filterOptionsCampaignTimeCreate = response.data.filter(-->
<!--                            (value, index, self) => self.findIndex((m) => m.createdAt === value.createdAt) === index,-->
<!--                        );-->
<!--                        this.filterOptionCampaignTag = response.data.filter(-->
<!--                            (value, index, self) => self.findIndex((m) => m.tags === value.tags) === index,-->
<!--                        );-->
<!--                        this.filterOptionsCampaignType = response.data.filter(-->
<!--                            (value, index, self) => self.findIndex((m) => m.newsType === value.newsType) === index,-->
<!--                        );-->
<!--                        this.filterOptionsCampaignTypeRun = response.data.filter(-->
<!--                            (value, index, self) => self.findIndex((m) => m.campaignRunType === value.campaignRunType) === index,-->
<!--                        );-->
<!--                        this.filterOptionCampaignCorp = response.data.filter(-->
<!--                            (value, index, self) => self.findIndex((m) => m.managementUnit === value.managementUnit) === index,-->
<!--                        );-->
<!--                    }-->
<!--                })-->
<!--                .catch(err => {-->
<!--                    console.log(err);-->
<!--                })-->
<!--                .finally(() => {-->
<!--                    this.commonLoadingPage(false);-->
<!--                });-->
<!--        },-->
<!--        handleOnFiltered(items) {-->
<!--            this.tableTemplate.totalRows = items.length;-->
<!--            this.tableTemplate.currentPage = 1;-->
<!--        },-->
<!--        onchangeFilter(type) {-->
<!--            console.log('onchangeFilter=>tableData', this.tableTemplate.data);-->
<!--            let result;-->
<!--            this.filterResult = [];-->
<!--            if (type === 1) {-->
<!--                if (this.filterOptionCampaignCodeSelected.length > 0) {-->
<!--                    for (let i = 0; i < this.filterOptionCampaignCodeSelected.length; i++) {-->
<!--                        console.log('onchangeFilter=>filterOptionCampaignCode', this.filterOptionCampaignCodeSelected[i]);-->
<!--                        result = this.filterOptionCampaignCode.filter(campaign => campaign.campaignCode === this.filterOptionCampaignCodeSelected[i].campaignCode);-->
<!--                        this.filterResult.push(...result);-->
<!--                    }-->
<!--                    this.tableTemplate.data = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.id === value.id) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignName = this.filterResult;-->
<!--                    this.filterTempRunDate = this.filterResult;-->
<!--                    this.filterTempCreateDate = this.filterResult;-->
<!--                    this.filterTempTag = this.filterResult;-->
<!--                    this.filterTempCorp = this.filterResult;-->
<!--                    this.filterTempTypeRun = this.filterResult;-->
<!--                    this.filterTempType = this.filterResult;-->
<!--                    this.filterTempChannel = this.filterResult;-->

<!--                    this.filterOptionsCampaignTimeQC = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.startTime === value.startTime) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTimeCreate = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.createdAt === value.createdAt) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignTag = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.tags === value.tags) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignType = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.newsType === value.newsType) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTypeRun = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.campaignRunType === value.campaignRunType) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCorp = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.managementUnit === value.managementUnit) === index,-->
<!--                    );-->
<!--                } else {-->
<!--                    this.tableTemplate.data = this.filterOptionCampaignCode;-->
<!--                    this.filterOptionCampaignName = this.filterOptionCampaignCode;-->
<!--                    this.filterOptionsCampaignTimeQC = this.filterOptionCampaignCode.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.startTime === value.startTime) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTimeCreate = this.filterOptionCampaignCode.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.createdAt === value.createdAt) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignTag = this.filterOptionCampaignCode.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.tags === value.tags) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignType = this.filterOptionCampaignCode.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.newsType === value.newsType) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTypeRun = this.filterOptionCampaignCode.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.campaignRunType === value.campaignRunType) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCorp = this.filterOptionCampaignCode.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.managementUnit === value.managementUnit) === index,-->
<!--                    );-->
<!--                }-->

<!--            } else if (type === 2) {-->

<!--                this.filterResult = [];-->
<!--                if (this.filterOptionCampaignNameSelected.length > 0) {-->
<!--                    for (let i = 0; i < this.filterOptionCampaignNameSelected.length; i++) {-->

<!--                        result = this.filterOptionCampaignName.filter(campaign => campaign.name === this.filterOptionCampaignNameSelected[i].name);-->
<!--                        this.filterResult.push(...result);-->

<!--                    }-->
<!--                    console.log('onchangeFilter=>type 2', this.filterResult);-->
<!--                    this.tableTemplate.data = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.id === value.id) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCode = this.filterResult;-->
<!--                    this.filterTempRunDate = this.filterResult;-->
<!--                    this.filterTempCreateDate = this.filterResult;-->
<!--                    this.filterTempTag = this.filterResult;-->
<!--                    this.filterTempCorp = this.filterResult;-->
<!--                    this.filterTempTypeRun = this.filterResult;-->
<!--                    this.filterTempType = this.filterResult;-->
<!--                    this.filterTempChannel = this.filterResult;-->

<!--                    this.filterOptionsCampaignTimeQC = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.startTime === value.startTime) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTimeCreate = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.createdAt === value.createdAt) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignTag = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.tags === value.tags) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignType = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.newsType === value.newsType) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTypeRun = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.campaignRunType === value.campaignRunType) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCorp = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.managementUnit === value.managementUnit) === index,-->
<!--                    );-->
<!--                } else {-->
<!--                    this.tableTemplate.data = this.filterOptionCampaignName;-->
<!--                    this.filterOptionCampaignCode = this.filterOptionCampaignName;-->
<!--                    this.filterOptionsCampaignTimeQC = this.filterOptionCampaignName.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.startTime === value.startTime) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTimeCreate = this.filterOptionCampaignName.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.createdAt === value.createdAt) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignTag = this.filterOptionCampaignName.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.tags === value.tags) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignType = this.filterOptionCampaignName.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.newsType === value.newsType) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTypeRun = this.filterOptionCampaignName.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.campaignRunType === value.campaignRunType) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCorp = this.filterOptionCampaignName.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.managementUnit === value.managementUnit) === index,-->
<!--                    );-->
<!--                }-->

<!--            } else if (type === 3) {-->

<!--                this.filterResult = [];-->
<!--                if (this.filterOptionCampaignTagSelected.length > 0) {-->
<!--                    for (let i = 0; i < this.filterOptionCampaignTagSelected.length; i++) {-->
<!--                        result = this.filterTempTag.filter(campaign => campaign.tags === this.filterOptionCampaignTagSelected[i].tags);-->
<!--                        this.filterResult.push(...result);-->
<!--                    }-->
<!--                    console.log('onchangeFilter=>type 2', this.filterResult);-->
<!--                    this.tableTemplate.data = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.id === value.id) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCode = this.filterResult;-->
<!--                    this.filterTempRunDate = this.filterResult;-->
<!--                    this.filterTempCreateDate = this.filterResult;-->
<!--                    this.filterTempCorp = this.filterResult;-->
<!--                    this.filterTempTypeRun = this.filterResult;-->
<!--                    this.filterTempType = this.filterResult;-->
<!--                    this.filterTempChannel = this.filterResult;-->

<!--                    this.filterOptionsCampaignTimeQC = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.startTime === value.startTime) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTimeCreate = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.createdAt === value.createdAt) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignType = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.newsType === value.newsType) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTypeRun = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.campaignRunType === value.campaignRunType) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCorp = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.managementUnit === value.managementUnit) === index,-->
<!--                    );-->
<!--                } else {-->
<!--                    this.tableTemplate.data = this.filterTempTag;-->
<!--                    this.filterOptionCampaignName = this.filterTempTag;-->
<!--                    this.filterOptionCampaignCode = this.filterTempTag;-->

<!--                    this.filterOptionsCampaignTimeQC = this.filterTempTag.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.startTime === value.startTime) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTimeCreate = this.filterTempTag.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.createdAt === value.createdAt) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignType = this.filterTempTag.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.newsType === value.newsType) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTypeRun = this.filterTempTag.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.campaignRunType === value.campaignRunType) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCorp = this.filterTempTag.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.managementUnit === value.managementUnit) === index,-->
<!--                    );-->

<!--                }-->

<!--            } else if (type === 4) {-->

<!--                this.filterResult = [];-->
<!--                console.log(this.filterOptionsCampaignTimeQCSelected);-->
<!--                if (this.filterOptionsCampaignTimeQCSelected.length > 0) {-->
<!--                    for (let i = 0; i < this.filterOptionsCampaignTimeQCSelected.length; i++) {-->

<!--                        result = this.filterTempRunDate.filter(campaign => campaign.startTime === this.filterOptionsCampaignTimeQCSelected[i].startTime);-->
<!--                        this.filterResult.push(...result);-->

<!--                    }-->
<!--                    console.log('onchangeFilter=>type 2', this.filterResult);-->
<!--                    this.tableTemplate.data = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.id === value.id) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCode = this.filterResult;-->
<!--                    this.filterTempCreateDate = this.filterResult;-->
<!--                    this.filterTempTag = this.filterResult;-->
<!--                    this.filterTempCorp = this.filterResult;-->
<!--                    this.filterTempTypeRun = this.filterResult;-->
<!--                    this.filterTempType = this.filterResult;-->
<!--                    this.filterTempChannel = this.filterResult;-->

<!--                    this.filterOptionsCampaignTimeCreate = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.createdAt === value.createdAt) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignTag = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.tags === value.tags) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignType = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.newsType === value.newsType) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTypeRun = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.campaignRunType === value.campaignRunType) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCorp = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.managementUnit === value.managementUnit) === index,-->
<!--                    );-->
<!--                } else {-->
<!--                    this.tableTemplate.data = this.filterTempRunDate;-->
<!--                    this.filterOptionCampaignCode = this.filterTempRunDate;-->
<!--                    this.filterOptionCampaignName = this.filterTempRunDate;-->

<!--                    this.filterOptionsCampaignTimeCreate = this.filterTempRunDate.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.createdAt === value.createdAt) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignTag = this.filterTempRunDate.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.tags === value.tags) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignType = this.filterTempRunDate.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.newsType === value.newsType) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTypeRun = this.filterTempRunDate.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.campaignRunType === value.campaignRunType) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCorp = this.filterTempRunDate.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.managementUnit === value.managementUnit) === index,-->
<!--                    );-->

<!--                }-->

<!--            } else if (type === 5) {-->

<!--                this.filterResult = [];-->
<!--                if (this.filterOptionsCampaignTimeCreateSelected.length > 0) {-->
<!--                    for (let i = 0; i < this.filterOptionsCampaignTimeCreateSelected.length; i++) {-->

<!--                        result = this.filterTempCreateDate.filter(campaign => campaign.createdAt === this.filterOptionsCampaignTimeCreateSelected[i].createdAt);-->
<!--                        this.filterResult.push(...result);-->

<!--                    }-->
<!--                    console.log('onchangeFilter=>type 2', this.filterResult);-->
<!--                    this.tableTemplate.data = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.id === value.id) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCode = this.filterResult;-->
<!--                    this.filterTempRunDate = this.filterResult;-->
<!--                    this.filterTempTag = this.filterResult;-->
<!--                    this.filterTempCorp = this.filterResult;-->
<!--                    this.filterTempTypeRun = this.filterResult;-->
<!--                    this.filterTempType = this.filterResult;-->
<!--                    this.filterTempChannel = this.filterResult;-->

<!--                    this.filterOptionsCampaignTimeQC = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.startTime === value.startTime) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignTag = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.tags === value.tags) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignType = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.newsType === value.newsType) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTypeRun = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.campaignRunType === value.campaignRunType) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCorp = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.managementUnit === value.managementUnit) === index,-->
<!--                    );-->
<!--                } else {-->
<!--                    this.tableTemplate.data = this.filterTempCreateDate;-->
<!--                    this.filterOptionCampaignName = this.filterTempCreateDate;-->

<!--                    this.filterOptionCampaignCode = this.filterTempCreateDate;-->
<!--                    this.filterOptionsCampaignTimeQC = this.filterTempCreateDate.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.startTime === value.startTime) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignTag = this.filterTempCreateDate.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.tags === value.tags) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignType = this.filterTempCreateDate.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.newsType === value.newsType) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTypeRun = this.filterTempCreateDate.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.campaignRunType === value.campaignRunType) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCorp = this.filterTempCreateDate.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.managementUnit === value.managementUnit) === index,-->
<!--                    );-->
<!--                }-->

<!--            } else if (type === 6) {-->

<!--                this.filterResult = [];-->
<!--                if (this.filterOptionsCampaignTypeSelected.length > 0) {-->
<!--                    for (let i = 0; i < this.filterOptionsCampaignTypeSelected.length; i++) {-->

<!--                        result = this.filterTempType.filter(campaign => campaign.newsType === this.filterOptionsCampaignTypeSelected[i].newsType);-->
<!--                        this.filterResult.push(...result);-->
<!--                    }-->
<!--                    this.tableTemplate.data = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.id === value.id) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCode = this.filterResult;-->
<!--                    this.filterTempRunDate = this.filterResult;-->
<!--                    this.filterTempCreateDate = this.filterResult;-->
<!--                    this.filterTempTag = this.filterResult;-->
<!--                    this.filterTempCorp = this.filterResult;-->
<!--                    this.filterTempTypeRun = this.filterResult;-->
<!--                    this.filterTempChannel = this.filterResult;-->

<!--                    this.filterOptionsCampaignTimeQC = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.startTime === value.startTime) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTimeCreate = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.createdAt === value.createdAt) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignTag = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.tags === value.tags) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTypeRun = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.newsType === value.newsType) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCorp = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.managementUnit === value.managementUnit) === index,-->
<!--                    );-->
<!--                } else {-->
<!--                    this.tableTemplate.data = this.filterTempType;-->
<!--                    this.filterOptionCampaignCode = this.filterTempType;-->
<!--                    this.filterOptionCampaignName = this.filterTempType;-->
<!--                    this.filterOptionsCampaignTimeQC = this.filterTempType.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.startTime === value.startTime) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTimeCreate = this.filterTempType.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.createdAt === value.createdAt) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignTag = this.filterTempType.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.tags === value.tags) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTypeRun = this.filterTempType.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.newsType === value.newsType) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCorp = this.filterTempType.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.managementUnit === value.managementUnit) === index,-->
<!--                    );-->

<!--                }-->
<!--            } else if (type === 7) {-->

<!--                this.filterResult = [];-->
<!--                if (this.filterOptionsCampaignTypeRunSelected.length > 0) {-->
<!--                    for (let i = 0; i < this.filterOptionsCampaignTypeRunSelected.length; i++) {-->

<!--                        result = this.filterTempTypeRun.filter(campaign => campaign.campaignRunType === this.filterOptionsCampaignTypeRunSelected[i].campaignRunType);-->
<!--                        this.filterResult.push(...result);-->

<!--                    }-->
<!--                    console.log('onchangeFilter=>type 2', this.filterResult);-->
<!--                    this.tableTemplate.data = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.id === value.id) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCode = this.filterResult;-->
<!--                    this.filterTempRunDate = this.filterResult;-->
<!--                    this.filterTempCreateDate = this.filterResult;-->
<!--                    this.filterTempTag = this.filterResult;-->
<!--                    this.filterTempCorp = this.filterResult;-->
<!--                    this.filterTempType = this.filterResult;-->
<!--                    this.filterTempChannel = this.filterResult;-->

<!--                    this.filterOptionsCampaignTimeQC = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.startTime === value.startTime) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTimeCreate = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.createdAt === value.createdAt) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignTag = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.tags === value.tags) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignType = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.newsType === value.newsType) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCorp = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.managementUnit === value.managementUnit) === index,-->
<!--                    );-->
<!--                } else {-->
<!--                    this.tableTemplate.data = this.filterTempTypeRun;-->
<!--                    this.filterOptionCampaignCode = this.filterTempTypeRun;-->
<!--                    this.filterOptionCampaignName = this.filterTempTypeRun;-->
<!--                    this.filterOptionsCampaignTimeQC = this.filterTempTypeRun.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.startTime === value.startTime) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTimeCreate = this.filterTempTypeRun.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.createdAt === value.createdAt) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignTag = this.filterTempTypeRun.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.tags === value.tags) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignType = this.filterTempTypeRun.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.newsType === value.newsType) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCorp = this.filterTempTypeRun.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.managementUnit === value.managementUnit) === index,-->
<!--                    );-->
<!--                }-->
<!--            } else if (type === 8) {-->

<!--                this.filterResult = [];-->
<!--                if (this.filterOptionCampaignCorpSelected.length > 0) {-->
<!--                    for (let i = 0; i < this.filterOptionCampaignCorpSelected.length; i++) {-->

<!--                        result = this.filterTempCorp.filter(campaign => campaign.managementUnit === this.filterOptionCampaignCorpSelected[i].managementUnit);-->
<!--                        this.filterResult.push(...result);-->

<!--                    }-->
<!--                    console.log('onchangeFilter=>type 2', this.filterResult);-->
<!--                    this.tableTemplate.data = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.id === value.id) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCode = this.filterResult;-->
<!--                    this.filterTempRunDate = this.filterResult;-->
<!--                    this.filterTempCreateDate = this.filterResult;-->
<!--                    this.filterTempTag = this.filterResult;-->
<!--                    this.filterTempTypeRun = this.filterResult;-->
<!--                    this.filterTempType = this.filterResult;-->
<!--                    this.filterTempChannel = this.filterResult;-->


<!--                    this.filterOptionsCampaignTimeQC = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.startTime === value.startTime) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTimeCreate = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.createdAt === value.createdAt) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignTag = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.tags === value.tags) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignType = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.newsType === value.newsType) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTypeRun = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.campaignRunType === value.campaignRunType) === index,-->
<!--                    );-->

<!--                } else {-->
<!--                    this.tableTemplate.data = this.filterTempCorp;-->
<!--                    this.filterOptionCampaignCode = this.filterTempCorp;-->
<!--                    this.filterOptionCampaignName = this.filterTempCorp;-->
<!--                    this.filterOptionsCampaignTimeQC = this.filterTempCorp.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.startTime === value.startTime) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTimeCreate = this.filterTempCorp.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.createdAt === value.createdAt) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignTag = this.filterTempCorp.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.tags === value.tags) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignType = this.filterTempCorp.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.newsType === value.newsType) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTypeRun = this.filterTempCorp.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.campaignRunType === value.campaignRunType) === index,-->
<!--                    );-->
<!--                }-->
<!--            } else if (type === 9) {-->

<!--                this.filterResult = [];-->
<!--                if (this.filterOptionsChannelSelected.length > 0) {-->
<!--                    for (let i = 0; i < this.filterOptionsChannelSelected.length; i++) {-->

<!--                        result = this.filterTempChannel.filter(campaign => (campaign.channel.some(cl => cl === this.filterOptionsChannelSelected[i].id)));-->
<!--                        this.filterResult.push(...result);-->

<!--                    }-->
<!--                    console.log('onchangeFilter=>type 2', this.filterResult);-->
<!--                    this.tableTemplate.data = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.id === value.id) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCode = this.filterResult;-->
<!--                    this.filterTempRunDate = this.filterResult;-->
<!--                    this.filterTempCreateDate = this.filterResult;-->
<!--                    this.filterTempTag = this.filterResult;-->
<!--                    this.filterTempTypeRun = this.filterResult;-->
<!--                    this.filterTempType = this.filterResult;-->
<!--                    this.filterTempCorp = this.filterResult;-->

<!--                    this.filterOptionsCampaignTimeQC = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.startTime === value.startTime) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTimeCreate = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.createdAt === value.createdAt) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignTag = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.tags === value.tags) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignType = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.newsType === value.newsType) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTypeRun = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.campaignRunType === value.campaignRunType) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCorp = this.filterResult.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.managementUnit === value.managementUnit) === index,-->
<!--                    );-->
<!--                } else {-->
<!--                    this.tableTemplate.data = this.filterTempChannel;-->
<!--                    this.filterOptionCampaignCode = this.filterTempChannel;-->
<!--                    this.filterOptionCampaignName = this.filterTempChannel;-->

<!--                    this.filterOptionsCampaignTimeQC = this.filterTempChannel.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.startTime === value.startTime) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTimeCreate = this.filterTempChannel.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.createdAt === value.createdAt) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignTag = this.filterTempChannel.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.tags === value.tags) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignType = this.filterTempChannel.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.newsType === value.newsType) === index,-->
<!--                    );-->
<!--                    this.filterOptionsCampaignTypeRun = this.filterTempChannel.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.campaignRunType === value.campaignRunType) === index,-->
<!--                    );-->
<!--                    this.filterOptionCampaignCorp = this.filterTempChannel.filter(-->
<!--                        (value, index, self) => self.findIndex((m) => m.managementUnit === value.managementUnit) === index,-->
<!--                    );-->
<!--                }-->
<!--            }-->

<!--        },-->
<!--        handleActionSelectRow(items) {-->
<!--            console.log('handleActionSelectRow', items);-->
<!--            this.tableTemplate.rowSelected = items[0];-->
<!--        },-->
<!--        handleActionDelete() {-->
<!--            if (!this.tableTemplate.rowSelected) {-->
<!--                this.commonConfirmWarning("Bạn phải chọn 1 chiến dịch trong danh sách");-->
<!--                return;-->
<!--            }-->

<!--            this.commonConfirm(`Chắc chắn xóa chiến dịch '${this.tableTemplate.rowSelected.name}' ?`, () => {-->
<!--                this.commonLoadingPage(true);-->
<!--                this.apiDeleteCampaign({id: this.tableTemplate.rowSelected.id})-->
<!--                    .then(response => {-->
<!--                        console.log('handleActionApprove', response);-->
<!--                        if (response["err_code"] === 0) {-->
<!--                            this.commonConfirmOK(response["err_message"]);-->
<!--                            this.handleGetListCampaign();-->
<!--                        } else {-->
<!--                            this.commonConfirmError(response["err_message"]);-->
<!--                        }-->
<!--                    })-->
<!--                    .catch(err => {-->
<!--                        console.log(err);-->
<!--                    })-->
<!--                    .finally(() => {-->
<!--                        this.commonLoadingPage(false);-->
<!--                    });-->
<!--            });-->
<!--        },-->
<!--        handleActionApprove() {-->
<!--            if (!this.tableTemplate.rowSelected) {-->
<!--                this.commonConfirmWarning("Bạn phải chọn 1 chiến dịch trong danh sách");-->
<!--                return;-->
<!--            }-->

<!--            this.$bvModal.show("MdCampaignApproveInfo");-->
<!--        },-->
<!--        handleActionCopyCampaign() {-->
<!--            if (!this.tableTemplate.rowSelected) {-->
<!--                this.commonConfirmWarning("Bạn phải chọn 1 chiến dịch trong danh sách");-->
<!--                return;-->
<!--            }-->

<!--            this.commonConfirm(`Chắc chắn copy chiến dịch '${this.tableTemplate.rowSelected.name}' ?`, () => {-->
<!--                this.commonLoadingPage(true);-->
<!--                this.apiCopyCampaign({id: this.tableTemplate.rowSelected.id})-->
<!--                    .then(response => {-->
<!--                        if (response["err_code"] === 0) {-->
<!--                            this.commonConfirmOK(response["err_message"]);-->
<!--                            this.handleGetListCampaign();-->
<!--                        } else {-->
<!--                            this.commonConfirmError(response["err_message"]);-->
<!--                        }-->
<!--                    })-->
<!--                    .catch(err => {-->
<!--                        console.log(err);-->
<!--                    })-->
<!--                    .finally(() => {-->
<!--                        this.commonLoadingPage(false);-->
<!--                    });-->
<!--            });-->
<!--        },-->
<!--        handleActionStartStop(action) {-->
<!--            if (!this.tableTemplate.rowSelected) {-->
<!--                this.commonConfirmWarning("Bạn phải chọn 1 chiến dịch trong danh sách");-->
<!--                return;-->
<!--            }-->

<!--            let textView = `Bạn muốn dừng chiến dịch '${this.tableTemplate.rowSelected.name}' ?`;-->
<!--            if (action === 2) {-->
<!--                textView = `Bạn muốn tạm dừng chiến dịch '${this.tableTemplate.rowSelected.name}' ?`;-->
<!--            } else if (action === 3) {-->
<!--                textView = `Bạn muốn dừng khẩn cấp chiến dịch '${this.tableTemplate.rowSelected.name}' ?`;-->
<!--            } else if (action === 4) {-->
<!--                textView = `Bạn muốn tiếp tục chạy chiến dịch '${this.tableTemplate.rowSelected.name}' ?`;-->
<!--            }-->

<!--            let payload = {-->
<!--                id: this.tableTemplate.rowSelected.id,-->
<!--                type: action-->
<!--            };-->

<!--            this.commonConfirm(textView, () => {-->
<!--                this.commonLoadingPage(true);-->
<!--                this.apiCampaignActionStartStop(payload)-->
<!--                    .then(response => {-->
<!--                        if (response["err_code"] === 0) {-->
<!--                            this.commonConfirmOK(response["err_message"]);-->
<!--                            this.handleGetListCampaign();-->
<!--                        } else {-->
<!--                            this.commonConfirmError(response["err_message"]);-->
<!--                        }-->
<!--                    })-->
<!--                    .catch(err => {-->
<!--                        console.log(err);-->
<!--                    })-->
<!--                    .finally(() => {-->
<!--                        this.commonLoadingPage(false);-->
<!--                    });-->
<!--            });-->
<!--        }-->
<!--    }-->
<!--}-->
<!--</script>-->
<!--<style>-->
<!--</style>-->
<!--<template>-->
<!--    <div>-->
<!--        <div class="row">-->
<!--            <div class="col-12">-->
<!--                <div class="card">-->
<!--                    <div class="card-body pt-1">-->
<!--                        <div class="row">-->
<!--                            <div class="col">-->
<!--                                <label class="col-form-label">Mã chiến dịch</label>-->
<!--                                <input type="text" v-model="searchCampaignCode" class="form-control"/>-->
<!--                            </div>-->
<!--                            <div class="col">-->
<!--                                <label class="col-form-label">Tên chiến dịch</label>-->
<!--                                <input type="text" v-model="searchCampaignName" class="form-control"/>-->
<!--                            </div>-->
<!--                            <div class="col">-->
<!--                                <label class="col-form-label">Tag chiến dịch</label>-->
<!--                                <input type="text" v-model="searchCampaignTag" class="form-control"/>-->
<!--                            </div>-->
<!--                            <div class="col">-->
<!--                                <label class="col-form-label">Đơn vị quản lý</label>-->
<!--                                <multiselect-->
<!--                                    v-model="searchOptionsGroupSelected"-->
<!--                                    :options="searchOptionsGroup"-->
<!--                                    :multiple="true"-->
<!--                                    :close-on-select="false"-->
<!--                                    :clear-on-select="false"-->
<!--                                    :preserve-search="true"-->
<!--                                    placeholder="Chọn đơn vị quản lý"-->
<!--                                    label="name"-->
<!--                                    track-by="name"-->
<!--                                    :limit="1"-->
<!--                                />-->
<!--                            </div>-->
<!--                            <div class="col">-->
<!--                                <label class="col-form-label">Thời gian bắt đầu</label>-->
<!--                                <date-picker-->
<!--                                    calendar-width="500px"-->
<!--                                    v-model="searchRunTimeQc"-->
<!--                                    range-->
<!--                                    append-to-body-->
<!--                                    lang="en"-->
<!--                                    confirm-->
<!--                                />-->
<!--                            </div>-->
<!--                            <div class="col">-->
<!--                                <label class="col-form-label">Thời gian tạo</label>-->
<!--                                <date-picker-->
<!--                                    calendar-width="500px"-->
<!--                                    v-model="searchCreatedTimeQc"-->
<!--                                    range-->
<!--                                    append-to-body-->
<!--                                    lang="en"-->
<!--                                    confirm>-->
<!--                                </date-picker>-->
<!--                            </div>-->
<!--                            <div class="col">-->
<!--                                <label class="col-form-label">Trạng thái</label>-->
<!--                                <multiselect v-model="searchOptionsStatusSelected" :options="searchOptionsStatus" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn trạng thái" label="name" track-by="name">-->
<!--                                </multiselect>-->
<!--                            </div>-->
<!--                            <div class="col-2 text-end">-->
<!--                                <label class="d-block col-form-label">&nbsp;</label>-->
<!--                                <button type="button" class="btn btn-primary" @click="handleGetListCampaign">-->
<!--                                    <i class="uil uil-search me-1"></i> Tìm kiếm-->
<!--                                </button>-->
<!--                                <button type="button" class="btn btn-outline-primary" @click="isFilter = !isFilter">-->
<!--                                    <i class="uil uil-filter me-1"></i> Lọc-->
<!--                                </button>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div v-show="isFilter">-->
<!--                            <div class="row">-->
<!--                                <div class="col-12">-->
<!--                                    <hr class="mb-0"/>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <div class="row">-->
<!--                                <div class="col-2">-->
<!--                                    <label class="col-form-label">Mã chiến dịch</label>-->
<!--                                    <multiselect :select-label="'Select'" @input="onchangeFilter(1)" v-model="filterOptionCampaignCodeSelected" :options="filterOptionCampaignCode" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" label="campaignCode"-->
<!--                                                 track-by="campaignCode">-->

<!--                                    </multiselect>-->
<!--                                </div>-->
<!--                                <div class="col-2">-->
<!--                                    <label class="col-form-label">Tên chiến dịch</label>-->
<!--                                    <multiselect :select-label="'Select'" @input="onchangeFilter(2)" v-model="filterOptionCampaignNameSelected" :options="filterOptionCampaignName" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" label="name" track-by="name">-->

<!--                                    </multiselect>-->
<!--                                </div>-->
<!--                                <div class="col-2">-->
<!--                                    <label class="col-form-label">Tag chiến dịch</label>-->
<!--                                    <multiselect :select-label="'Select'" @input="onchangeFilter(3)" v-model="filterOptionCampaignTagSelected" :options="filterOptionCampaignTag" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" label="tags" track-by="tags">-->

<!--                                    </multiselect>-->
<!--                                </div>-->
<!--                                <div class="col-2">-->
<!--                                    <label class="col-form-label">Đơn vị quản lý</label>-->
<!--                                    <multiselect :select-label="'Select'" @input="onchangeFilter(8)" v-model="filterOptionCampaignCorpSelected" :options="filterOptionCampaignCorp" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" label="managementUnit"-->
<!--                                                 track-by="managementUnit">-->
<!--                                    </multiselect>-->
<!--                                </div>-->
<!--                                <div class="col">-->
<!--                                    <label class="col-form-label">Kênh</label>-->
<!--                                    <multiselect :select-label="'Select'" @input="onchangeFilter(9)" v-model="filterOptionsChannelSelected" :options="filterOptionsChannels" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" label="name" track-by="name">-->

<!--                                    </multiselect>-->
<!--                                </div>-->

<!--                            </div>-->
<!--                            <div class="row">-->
<!--                                <div class="col-2">-->
<!--                                    <label class="col-form-label">Thời gian bắt đầu</label>-->
<!--                                    <multiselect :select-label="'Select'" @input="onchangeFilter(4)" v-model="filterOptionsCampaignTimeQCSelected" :options="filterOptionsCampaignTimeQC" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" label="startTime"-->
<!--                                                 track-by="startTime">-->

<!--                                    </multiselect>-->
<!--                                </div>-->
<!--                                <div class="col-2">-->
<!--                                    <label class="col-form-label">Thời gian tạo</label>-->
<!--                                    <multiselect :select-label="'Select'" @input="onchangeFilter(5)" v-model="filterOptionsCampaignTimeCreateSelected" :options="filterOptionsCampaignTimeCreate" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true"-->
<!--                                                 label="createdAt"-->
<!--                                                 track-by="createdAt">-->

<!--                                    </multiselect>-->
<!--                                </div>-->
<!--                                <div class="col-2">-->
<!--                                    <label class="col-form-label">Loại truyền thông</label>-->
<!--                                    <multiselect :select-label="'Select'" @input="onchangeFilter(6)" v-model="filterOptionsCampaignTypeSelected" :options="filterOptionsCampaignType" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" label="newsType"-->
<!--                                                 track-by="newsType">-->

<!--                                    </multiselect>-->
<!--                                </div>-->
<!--                                <div class="col">-->
<!--                                    <label class="col-form-label">Hình thức chiến dịch</label>-->
<!--                                    <multiselect :select-label="'Select'" @input="onchangeFilter(7)" v-model="filterOptionsCampaignTypeRunSelected" :options="filterOptionsCampaignTypeRun" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true"-->
<!--                                                 label="campaignRunType"-->
<!--                                                 track-by="campaignRunType">-->

<!--                                    </multiselect>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--        &lt;!&ndash; Table data &ndash;&gt;-->
<!--        <div class="row">-->
<!--            <div class="col-12">-->
<!--                <div class="card">-->
<!--                    <div class="card-body">-->
<!--                        &lt;!&ndash; Table action button &ndash;&gt;-->
<!--                        <div class="row mb-3">-->
<!--                            <div class="col-3 text-start">-->
<!--                                <input type="text" class="form-control" placeholder="Tìm kiếm nhanh..." v-model="tableTemplate.filter"/>-->
<!--                            </div>-->
<!--                            <div class="col-9 text-end">-->
<!--                                <NuxtLink-->
<!--                                    class="btn btn-outline-dark"-->
<!--                                    to="/campaign/manage/data"-->
<!--                                >-->
<!--                                    <i class="uil uil-plus-square me-1"></i> Thêm mới-->
<!--                                </NuxtLink>-->
<!--                                <button-->
<!--                                    type="button" class="btn btn-outline-dark"-->
<!--                                    @click="handleActionCopyCampaign"-->
<!--                                    v-show="tableTemplate.rowSelected"-->
<!--                                >-->
<!--                                    <i class="uil uil-file-copy-alt me-1"></i> Copy-->
<!--                                </button>-->
<!--                                <NuxtLink-->
<!--                                    class="btn btn-outline-info"-->
<!--                                     :class="{'disabled': !tableTemplate.rowSelected}"-->
<!--                                    :to="`/campaign/manage/data?key=view-${tableTemplate.rowSelected ? tableTemplate.rowSelected.id: 0}-1`"-->
<!--                                >-->
<!--                                    <i class="uil uil-eye me-1"></i> Xem-->
<!--                                </NuxtLink>-->
<!--                                <NuxtLink-->
<!--                                    class="btn btn-outline-info"-->
<!--                                    :class="{'disabled': !tableTemplate.rowSelected}"-->
<!--                                    :to="`/campaign/manage/data?key=script-${tableTemplate.rowSelected ? tableTemplate.rowSelected.id: 0}-2`"-->
<!--                                >-->
<!--                                    <i class="uil uil-bright me-1"></i> Kịch bản-->
<!--                                </NuxtLink>-->
<!--                                <NuxtLink-->
<!--                                    class="btn btn-outline-warning"-->
<!--                                    v-show="tableTemplate.rowSelected && tableTemplate.rowSelected['campaignStatus'] === 'PENDING'"-->
<!--                                    :to="`/campaign/manage/data?key=edit-${tableTemplate.rowSelected ? tableTemplate.rowSelected.id: 0}-1`"-->
<!--                                >-->
<!--                                    <i class="uil uil-pen me-1"></i> Sửa-->
<!--                                </NuxtLink>-->
<!--                                <button-->
<!--                                    type="button" class="btn btn-outline-danger"-->
<!--                                    @click="handleActionDelete"-->
<!--                                    v-show="tableTemplate.rowSelected && tableTemplate.rowSelected['campaignStatus'] === 'PENDING'"-->
<!--                                >-->
<!--                                    <i class="uil uil-trash me-1"></i> Xóa-->
<!--                                </button>-->
<!--                                <button-->
<!--                                    type="button" class="btn btn-outline-success"-->
<!--                                    @click="handleActionApprove"-->
<!--                                    v-show="tableTemplate.rowSelected && ['PENDING', 'END_TESTING'].includes(tableTemplate.rowSelected['campaignStatus'])"-->
<!--                                >-->
<!--                                    <i class="uil uil-check-square me-1"></i> Phê duyệt-->
<!--                                </button>-->
<!--                                <button-->
<!--                                    type="button" class="btn btn-outline-warning"-->
<!--                                    @click="handleActionStartStop(1)"-->
<!--                                    v-show="tableTemplate.rowSelected && tableTemplate.rowSelected['campaignStatus'] === 'ACTIVE'"-->
<!--                                >-->
<!--                                    <i class="uil uil-stop-circle me-1"></i> Dừng-->
<!--                                </button>-->
<!--                                <button-->
<!--                                    type="button" class="btn btn-outline-danger"-->
<!--                                    @click="handleActionStartStop(2)"-->
<!--                                    v-show="tableTemplate.rowSelected && tableTemplate.rowSelected['campaignStatus'] === 'ACTIVE'"-->
<!--                                >-->
<!--                                    <i class="uil uil-stop-circle me-1"></i> Tạm dừng-->
<!--                                </button>-->
<!--                                <button-->
<!--                                    type="button" class="btn btn-outline-danger"-->
<!--                                    @click="handleActionStartStop(3)"-->
<!--                                    v-show="tableTemplate.rowSelected && tableTemplate.rowSelected['campaignStatus'] === 'ACTIVE'"-->
<!--                                >-->
<!--                                    <i class="uil uil-stop-circle me-1"></i> Tạm dừng khẩn cấp-->
<!--                                </button>-->
<!--                                <button-->
<!--                                    type="button" class="btn btn-outline-success"-->
<!--                                    @click="handleActionStartStop(4)"-->
<!--                                    v-show="tableTemplate.rowSelected && (tableTemplate.rowSelected['campaignStatus'] === 'STOP' || tableTemplate.rowSelected['campaignStatus'] === 'EMERGENCY_STOP')"-->
<!--                                >-->
<!--                                    <i class="uil uil-play-circle me-1"></i> Tiếp tục-->
<!--                                </button>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        &lt;!&ndash; Table data &ndash;&gt;-->
<!--                        <div class="row">-->
<!--                            <div class="col-12 table-responsive">-->
<!--                                <b-table-->
<!--                                    selectable hover bordered-->
<!--                                    head-row-variant="light"-->
<!--                                    select-mode="single"-->
<!--                                    selected-variant="info"-->
<!--                                    :items="tableTemplate.data"-->
<!--                                    :fields="tableTemplate.fields"-->
<!--                                    :per-page="tableTemplate.perPage"-->
<!--                                    :current-page="tableTemplate.currentPage"-->
<!--                                    :filter="tableTemplate.filter"-->
<!--                                    @row-selected="handleActionSelectRow"-->
<!--                                    @filtered="handleOnFiltered"-->
<!--                                />-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        &lt;!&ndash; Table pagination &ndash;&gt;-->
<!--                        <div class="row">-->
<!--                            <div class="col-6">-->
<!--                                <label class="align-items-center">-->
<!--                                    Hiển thị&nbsp;&nbsp;-->
<!--                                    <b-form-select v-model="tableTemplate.perPage" :options="tableTemplate.pageOptions"/>-->
<!--                                    &nbsp;&nbsp;dòng-->
<!--                                </label>-->
<!--                            </div>-->
<!--                            <div class="col-6">-->
<!--                                <b-pagination-->
<!--                                    class="mb-0" align="right"-->
<!--                                    v-model="tableTemplate.currentPage"-->
<!--                                    :total-rows="tableTemplate.totalRows"-->
<!--                                    :per-page="tableTemplate.perPage"-->
<!--                                />-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <md-campaign-approve-info :campaign-info="tableTemplate.rowSelected"/>-->
<!--        <md-campaign-approve-data-input :campaign-info="tableTemplate.rowSelected"/>-->
<!--    </div>-->
<!--</template>-->
