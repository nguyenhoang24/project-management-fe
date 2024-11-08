<script>
import {mapActions} from "vuex";
import Multiselect from "vue-multiselect";

import "vue-multiselect/dist/vue-multiselect.min.css";
import Swal from "sweetalert2";

export default {
    name: "StudentModal",
    props: {
        idTopic: {
            type: Number,
            default: 0
        },
        actionType: {
            type: Number,
            default: 0
        }
    },
    watch: {
        // 'flagModal'() {
        //     console.log('watch actionType', this.flagModal);
        //     this.handleInitData();
        // }
    },
    data() {
        return {
            objTopic: {
                id: -1,
                name: '',
            },
            modalTitle: '',
        }
    },
    components: {
        Multiselect
    },
    updated() {

    },
    methods: {
        ...mapActions('topic', {
            apiGetTopic: 'apiGetTopic',
            apiAddTopic: 'apiAddTopic',
            apiEditTopic: 'apiEditTopic'
        }),
        resetForm() {
            this.objTopic = {
                id: -1,
                name: ''
            };

        },
        handleInitData() {
            this.$nextTick(() => {
                let objInput = {id: 0};
                // alert(this.actionType);
                if (this.actionType === 1) {
                    this.modalTitle = 'Thêm chủ đề';
                    this.resetForm();
                } else if (this.actionType === 2 || this.actionType === 3) {
                    if (this.actionType === 2)
                        this.modalTitle = 'Sửa chủ đề';
                    else if (this.actionType === 3)
                        this.modalTitle = 'Xem thông tin chủ đề';
                    this.apiGetTopic({
                        conditionSearch: 'ID',
                        valueSearch: this.idTopic
                    }).then(response => {
                        this.objTopic = response[0];
                    })
                        .catch(err => {
                            console.log(err);
                        })
                        .finally(() => {
                            // this.commonLoadingPage(false);
                        });
                }
            });
        },
        addTopic() {
            let optionEvent = '';
            let ids = [];
            if (this.checkDataInput()) {
                if (this.actionType === 2) {
                    console.log("before edit: ", this.objTopic)
                    this.apiEditTopic(this.objTopic)
                        .then(response => {
                            this.$emit('handleGetTopic');
                            this.$bvModal.hide('modal-add-topic');
                        })
                        .catch(err => {
                            console.log(err);
                        })
                        .finally(() => {
                            // this.commonLoadingPage(false);
                        });
                }
                if (this.actionType === 1) {
                    this.apiAddTopic(this.objTopic)
                        .then(response => {
                            this.$emit('handleGetTopic');
                            Swal.fire("","Thêm thành công", "success");

                            this.$bvModal.hide('modal-add-topic');
                        })
                        .catch(err => {
                            console.log(err);
                        })
                        .finally(() => {
                            // this.commonLoadingPage(false);
                        });
                }
            }
        },
        closeModal() {
            this.$bvModal.hide('modal-add-topic');
        },
        checkDataInput() {
            if (this.objTopic.name === null || this.objTopic.name.trim() === '') {
                this.commonNotifyVue("Bạn phải nhập tên chủ đề", 'warn');
                return false;
            }

            return true;
        },
    }
}
</script>

<style scoped>

</style>

<template>
    <b-modal id="modal-add-topic"
             size="lg" :title="modalTitle"
             title-class="font-18" hide-footer
             @show="handleInitData"
    >
        <div class="row pb-3">
            <div >
                <label>Tên chủ đề</label>
                <input type="text" maxlength="200" v-model="objTopic.name" :disabled="actionType===3" placeholder="Tên chủ đề" class="form-control form-control multiselect__tags"/>
            </div>
        </div>
        <!-- end card-body -->
        <div class="text-end mt-4">
            <button type="button" class="btn btn-default" @click="closeModal">Bỏ qua</button>
            <button type="button" class="btn btn-primary px-4" @click="addTopic">Lưu</button>
        </div>
    </b-modal>
</template>


