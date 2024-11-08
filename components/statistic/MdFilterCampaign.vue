<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
    name: "MdFilterCampaign",
    components: {
        Multiselect
    },
    data() {
        return {
            groupAllCheck: false,
            checkAllArea: false,
            optionsGroupObject: [
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
            optionAreaSelected: [],
            optionsGroupSelected: [],
        }
    },
    methods: {
        initData() {
            this.resetModal();
        },
        handleOkFilter(evt) {
            evt.preventDefault();
        },
        handleResetForm(evt) {
            this.resetModal();
            evt.preventDefault();
        },
        groupCheckAllAction() {
            if (this.groupAllCheck === false) {
                this.optionsGroupSelected = this.optionsGroupObject;
            } else {
                this.optionsGroupSelected = [];
            }
        },
        checkAllAreaAction() {
            if (this.checkAllArea === false) {
                this.optionAreaSelected = this.optionsArea;
            } else {
                this.optionAreaSelected = [];
            }
        },
        resetModal() {
            this.checkAllArea = false;
            this.groupAllCheck = false;
            this.optionsGroupSelected = [];
            this.optionAreaSelected = [];
        }
    }
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
                <label class="me-1">Theo phân khúc đối tượng:</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="groupAllCheck" @click="groupCheckAllAction" type="checkbox" value="option1">
                    <label class="form-check-label" for="inlineMonday">Tất cả</label>
                </div>
                <multiselect v-model="optionsGroupSelected" :options="optionsGroupObject" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn phân khúc đối tượng" label="name" track-by="name">

                </multiselect>
            </div>
            <div class="col-12">
                <label class="me-1">Theo khu vực địa lý:</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="checkAllArea" @click="checkAllAreaAction" type="checkbox" value="option2">
                    <label class="form-check-label" for="inlineMonday">Tất cả</label>
                </div>
                <multiselect v-model="optionAreaSelected" :options="optionsArea" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn khu vực địa lý" label="name" track-by="name">

                </multiselect>
            </div>
        </div>
    </b-modal>
</template>

<style scoped>

</style>
