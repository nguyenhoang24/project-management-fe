
<script>
import {mapActions} from "vuex";

export default {
    name: "CreateUserGroup",
    props: ['groupUserParentId'],
    data(){
        return{
            groupUserObj:{
                id:-1,
                name: '',
                description: '',
                type: -1,
                parent: 0
            },
            groupUserModalTitle:'Thêm mới nhóm người dùng'
        }
    },
    mounted() {
        this.resetData();
    },
    methods:{
        ...mapActions('admin/group', {
            apiAddGroup: 'apiAddGroup'
        }),
        addGroupUser(){
            this.groupUserObj.parent = this.groupUserParentId;
            console.log('addGroupUser',this.groupUserObj);
            if(this.checkDataInput()===true){
                this.apiAddGroup(this.groupUserObj)
                    .then(response => {
                        console.log('apiAddGroup', response);
                        if (response.err_code === 0) {
                            this.$emit('handleAfterAction');
                            this.$bvModal.hide('modal-add_user-group');
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
        checkInputData(){

            return true;
        },
        resetData(){
            this.groupUserObj={
                id:-1,
                name: '',
                description: '',
                type: -1,
                parent: 0
            }
        },
        closeModal(){
            this.$bvModal.hide('modal-add_user-group');
        },
        checkDataInput(){
            if (this.groupUserObj.name===null || this.groupUserObj.name.trim()===''){
                this.commonNotifyVue('Vui lòng nhập Tên nhóm ','warn');
                return false;
            }
            if (this.groupUserObj.type===-1){
                this.commonNotifyVue('Vui lòng chọn Loại nhóm ','warn');
                return false;
            }
            return true;
        }
    }
}
</script>

<style scoped>

</style>

<template>
    <b-modal id="modal-add_user-group" size="lg" :title="groupUserModalTitle" title-class="font-18" hide-footer>
        <div class="row pb-3">
            <div class="col-6">
                <label>Tên nhóm</label>
                <input type="text" maxlength="150" v-model="groupUserObj.name"  class="form-control form-control multiselect__tags"/>
            </div>
            <div class="col-6">
                <label>Loại nhóm</label>
                <select v-model="groupUserObj.type" class="form-control">
                    <option value="1">Admin Mobifone</option>
                    <option value="2">Agency</option>
                    <option value="3">Client</option>
                </select>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-12">
                <label>Mô tả</label>
                <input type="text" maxlength="150" v-model="groupUserObj.description"  class="form-control form-control multiselect__tags"/>
            </div>
        </div>
        <!-- end card-body -->
        <div class="text-end mt-4">
            <button type="button" class="btn btn-default" @click="closeModal">Bỏ qua</button>
            <button type="button" class="btn btn-primary px-4" @click="addGroupUser">Lưu</button>
        </div>
    </b-modal>
</template>
