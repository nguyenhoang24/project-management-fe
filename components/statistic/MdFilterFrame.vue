<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
    name: "MdFilterFrame",
    components: {
        Multiselect
    },
    data() {
        return {
            checkAllTypeCampaign: false,
            checkAllGroupCampaign: false,
            checkAllStatusCampaign: false,
            checkAllOtherCampaign: false,
            checkAllAdv: false,
            checkAllKpi: false,
            checkAllSegment: false,
            checkAllArea: false,
            checkAllTag: false,
            campaignName: '',
            optionsTypeCampaign: [
                {
                    id: 1,
                    name: 'Batch campaign'
                },
                {
                    id: 2,
                    name: 'Event campaign'
                },
            ],
            optionsGroupCampaign: [
                {
                    id: 1,
                    name: 'Nhóm 1'
                },
                {
                    id: 2,
                    name: 'Nhóm 2'
                },
                {
                    id: 3,
                    name: 'Nhóm 3'
                },
            ],
            optionsStatusCampaign: [
                {
                    id: 1,
                    name: 'Đang chạy'
                },
                {
                    id: 2,
                    name: 'Hoàn thành'
                },
                {
                    id: 3,
                    name: 'Tạm dừng'
                },
            ],
            optionsOtherCampaign: [
                {
                    id: 1,
                    name: 'Trạng thái 1'
                },
                {
                    id: 2,
                    name: 'Trạng thái 2'
                },
                {
                    id: 3,
                    name: 'Trạng thái 3'
                },
            ],
            optionsAdv: [
                {
                    id: 1,
                    name: 'A-B'
                },
                {
                    id: 2,
                    name: '<A'
                },
                {
                    id: 3,
                    name: '>B'
                },
            ],
            optionsKpi: [
                {
                    id: 1,
                    name: '<A'
                },
                {
                    id: 2,
                    name: 'A-B'
                },
                {
                    id: 3,
                    name: '>B'
                },
            ],
            optionsSegment: [
                {
                    id: 1,
                    name: 'Phân khúc 1'
                },
                {
                    id: 2,
                    name: 'Phân khúc 2'
                },
                {
                    id: 3,
                    name: 'Phân khúc 3'
                },
            ],
            optionsArea: [
                {
                    id: 1,
                    name: 'Hà Nội'
                },
                {
                    id: 2,
                    name: 'Hà Nam'
                },
                {
                    id: 3,
                    name: 'Sóc Sơn'
                },
            ],
            optionsTag: [
                {
                    id: 1,
                    name: 'Loại 1'
                },
                {
                    id: 2,
                    name: 'Loại 2'
                },
                {
                    id: 3,
                    name: 'Loại 3'
                },
            ],
            groupCampaignSelected: [],
            groupStatusCampaignSelected: [],
            groupOtherCampaignSelected: [],
            groupTypeCampaignSelected: [],
            groupAdvSelected: [],
            groupKpiSelected: [],
            groupSegmentSelected: [],
            groupAreaSelected: [],
            groupTagSelected: [],
        }
    },
    methods: {
        handleOkFilter(evt) {
            evt.preventDefault();
        },
        handleResetForm(evt) {
            this.handleReset();
            evt.preventDefault();
        },
        initData() {
            this.handleReset();
        },
        handleReset() {
            this.checkAllTypeCampaign = false;
            this.checkAllGroupCampaign = false;
            this.checkAllStatusCampaign = false;
            this.checkAllOtherCampaign = false;
            this.checkAllAdv = false;
            this.checkAllKpi = false;
            this.checkAllSegment = false;
            this.checkAllArea = false;
            this.checkAllTag = false;
            this.groupAreaSelected = [];
            this.groupStatusCampaignSelected = [];
            this.groupCampaignSelected = [];
            this.groupOtherCampaignSelected = [];
            this.groupTypeCampaignSelected = [];
            this.groupAdvSelected = [];
            this.groupKpiSelected = [];
            this.groupSegmentSelected = [];
            this.groupTagSelected = [];
        },
        groupCheckAllAction() {
            if (this.checkAllTypeCampaign === false) {
                this.groupTypeCampaignSelected = this.optionsTypeCampaign;
            } else {
                this.groupTypeCampaignSelected = [];
            }
        },
        groupCheckTagAction() {
            if (this.checkAllTag === false) {
                this.groupTagSelected = this.optionsTag;
            } else {
                this.groupTagSelected = [];
            }
        },
        groupCheckCampaign() {
            if (this.checkAllGroupCampaign === false) {
                this.groupCampaignSelected = this.optionsGroupCampaign;
            } else {
                this.groupCampaignSelected = [];
            }
        },
        groupCheckStatusCampaign() {
            if (this.checkAllStatusCampaign === false) {
                this.groupStatusCampaignSelected = this.optionsStatusCampaign;
            } else {
                this.groupStatusCampaignSelected = [];
            }
        },
        groupCheckOtherCampaign() {
            if (this.checkAllOtherCampaign === false) {
                this.groupOtherCampaignSelected = this.optionsOtherCampaign;
            } else {
                this.groupOtherCampaignSelected = [];
            }
        },
        groupCheckAdv() {
            if (this.checkAllAdv === false) {
                this.groupAdvSelected = this.optionsAdv;
            } else {
                this.groupAdvSelected = [];
            }
        },
        groupCheckKpi() {
            if (this.checkAllKpi === false) {
                this.groupKpiSelected = this.optionsKpi;
            } else {
                this.groupKpiSelected = [];
            }
        },
        groupCheckSegment() {
            if (this.checkAllSegment === false) {
                this.groupSegmentSelected = this.optionsSegment;
            } else {
                this.groupSegmentSelected = [];
            }
        },
        checkAllAreaAction() {
            if (this.checkAllArea === false) {
                this.groupAreaSelected = this.optionsArea;
            } else {
                this.groupAreaSelected = [];
            }
        },
    },
}
</script>

<template>
    <b-modal
        id="modal-filter"
        title="Lọc"
        title-class="font-18"
        ok-title-html="Đồng ý"
        cancel-title-html="Làm lại"
        cancel-variant="outline-secondary"
        :scrollable="true"
        @ok="handleOkFilter"
        @cancel="handleResetForm"
        @show="initData"
    >
        <div class="row">
            <div class="col-12 mb-3">
                <label class="me-1">Loại chiến dịch:</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="checkAllTypeCampaign" @click="groupCheckAllAction" type="checkbox" value="option1">
                    <label class="form-check-label" for="inlineMonday">Tất cả</label>
                </div>
                <multiselect v-model="groupTypeCampaignSelected" :options="optionsTypeCampaign" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn phân khúc đối tượng" label="name" track-by="name">

                </multiselect>
            </div>
            <div class="col-12 mb-3">
                <label>Tên chiến dịch</label>
                <input type="text" v-model="campaignName" class="form-control" placeholder="Tên, mã chiến dịch">
            </div>
            <div class="col-12 mb-3">
                <label class="me-1">Tag chiến dịch:</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="checkAllTag" @click="groupCheckTagAction" type="checkbox" value="option2">
                    <label class="form-check-label" for="inlineMonday">Tất cả</label>
                </div>
                <multiselect v-model="groupTagSelected" :options="optionsTag" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn phân khúc đối tượng" label="name" track-by="name">

                </multiselect>
            </div>
            <div class="col-12 mb-3">
                <label class="me-1">Nhóm chiến dịch:</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="checkAllGroupCampaign" @click="groupCheckCampaign" type="checkbox" value="option3">
                    <label class="form-check-label" for="inlineMonday">Tất cả</label>
                </div>
                <multiselect v-model="groupCampaignSelected" :options="optionsGroupCampaign" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn khu vực địa lý" label="name" track-by="name">

                </multiselect>
            </div>
            <div class="col-12 mb-3">
                <label class="me-1">Trạng thái chiến dịch:</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="checkAllStatusCampaign" @click="groupCheckStatusCampaign" type="checkbox" value="option4">
                    <label class="form-check-label" for="inlineMonday">Tất cả</label>
                </div>
                <multiselect v-model="groupStatusCampaignSelected" :options="optionsStatusCampaign" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn khu vực địa lý" label="name" track-by="name">

                </multiselect>
            </div>
            <div class="col-12 mb-3">
                <label class="me-1">Loại hình chiến dịch:</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="checkAllOtherCampaign" @click="groupCheckOtherCampaign" type="checkbox" value="option5">
                    <label class="form-check-label" for="inlineMonday">Tất cả</label>
                </div>
                <multiselect v-model="groupOtherCampaignSelected" :options="optionsOtherCampaign" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn khu vực địa lý" label="name" track-by="name">

                </multiselect>
            </div>
            <div class="col-12 mb-3">
                <label class="me-1">Sản lượng quảng cáo:</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="checkAllAdv" @click="groupCheckAdv" type="checkbox" value="option6">
                    <label class="form-check-label" for="inlineMonday">Tất cả</label>
                </div>
                <multiselect v-model="groupAdvSelected" :options="optionsAdv" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn khu vực địa lý" label="name" track-by="name">

                </multiselect>
            </div>
            <div class="col-12 mb-3">
                <label class="me-1">Chỉ số KPI:</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="checkAllKpi" @click="groupCheckKpi" type="checkbox" value="option7">
                    <label class="form-check-label" for="inlineMonday">Tất cả</label>
                </div>
                <multiselect v-model="groupKpiSelected" :options="optionsKpi" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn khu vực địa lý" label="name" track-by="name">

                </multiselect>
            </div>
            <div class="col-12 mb-3">
                <label class="me-1">Phân khúc đối tượng:</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="checkAllSegment" @click="groupCheckSegment" type="checkbox" value="option8">
                    <label class="form-check-label" for="inlineMonday">Tất cả</label>
                </div>
                <multiselect v-model="groupSegmentSelected" :options="optionsSegment" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn khu vực địa lý" label="name" track-by="name">

                </multiselect>
            </div>
            <div class="col-12">
                <label class="me-1">Theo khu vực địa lý:</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="checkAllArea" @click="checkAllAreaAction" type="checkbox" value="option9">
                    <label class="form-check-label" for="inlineMonday">Tất cả</label>
                </div>
                <multiselect v-model="groupAreaSelected" :options="optionsArea" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn khu vực địa lý" label="name" track-by="name">

                </multiselect>
            </div>
        </div>
    </b-modal>
</template>

<style scoped>

</style>
