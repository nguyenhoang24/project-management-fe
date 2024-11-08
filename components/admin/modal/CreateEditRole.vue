<script>
import {mapActions} from "vuex";

export default {
    name: "CreateEditRole",
    props:['actionType','roleEditId'],
    data() {
        return {
            titleModal: '',
            checkAllAuthen:false,
            roleObj:{
              id:-1,
              name:'',
              description:'',
                listPrivilege:[]
            },
            listAuthens:[
                {isSelected:true,authenName:'create_user',authenDesc:'Tạo người dùng'},
                {isSelected:false,authenName:'create_campaign',authenDesc:'Tạo chiến dịch'}
            ]
        }
    },methods: {
        ...mapActions('admin/role', {
            apiGetRoleById: 'apiGetRoleById',
            apiAddRole: 'apiAddRole',
            apiEditRole: 'apiEditRole',
            apiGetListPrivilege: 'apiGetListPrivilege'
        }),
        closeModalAddRoleGroup() {
            this.$bvModal.hide('modal-add-usergroup');
        },
        resetFormData(){
            this.roleObj={
                id:-1,
                name:'',
                description:'',
                listPrivilege:[]
            };
            this.checkAllAuthen=false;
        },
        addRoleGroup() {
            for (let i=0; i<this.listAuthens.length;i++){
                let obj = this.listAuthens[i];
                if(obj.isSelected){
                    this.roleObj.listPrivilege.push(obj);
                }

            }
            if(this.checkDataInput()===true){
                if(this.actionType===1){
                    console.log('addRoleGroup',this.roleObj);
                    this.apiAddRole(this.roleObj)
                        .then(response => {
                            if (response.err_code === 0) {
                                this.$emit('handleAfterAction');
                                this.$bvModal.hide('modal-add-usergroup');
                                this.commonNotifyVue('Thêm mới nhóm quyền thành công','info');
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
                }else if(this.actionType===2){
                    console.log('edtRoleGroup',this.roleObj);
                    this.apiEditRole(this.roleObj)
                        .then(response => {
                            if (response.err_code === 0) {
                                this.$emit('handleAfterAction');
                                this.$bvModal.hide('modal-add-usergroup');
                                this.commonNotifyVue('Thêm mới nhóm quyền thành công','info');
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
            }


        },handleInitData() {
            this.apiGetListPrivilege({id:-1})
                .then(response => {
                    if (response.err_code === 0) {
                        let data = response['data'];
                        this.listAuthens=data;
                        console.log('apiGetListPrivilege',data);
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
            this.$nextTick(() => {
                if(this.actionType===1){
                    this.resetFormData();
                    this.titleModal='Thêm nhóm quyền';
                }else if(this.actionType===2 || this.actionType===3){
                    let objInput={id:this.roleEditId};
                    if(this.actionType===2)
                        this.titleModal='Sửa nhóm quyền';
                    else if(this.actionType===3)
                        this.titleModal='Xem thông tin nhóm quyền';
                    this.apiGetRoleById(objInput)
                        .then(response => {
                            if (response.err_code === 0) {
                                let data = response['data'];
                                this.roleObj=data.roleInfo;
                                this.roleObj.listPrivilege=[];
                                let authenOfRole = data.listPrivilege;
                                console.log('apiGetRoleById',authenOfRole);
                                for (let i=0; i<this.listAuthens.length;i++){
                                    let obj = this.listAuthens[i];
                                    if(authenOfRole.some(authen => authen.id === obj.id)){
                                        console.log('check authen ok');
                                        obj.isSelected=true;
                                    }
                                }
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
            });
        },
        onchangeCheckAll(){

            for (let i=0; i<this.listAuthens.length;i++){
                let obj = this.listAuthens[i];
                if(!this.checkAllAuthen){
                    obj.isSelected=true;
                }else{
                    obj.isSelected=false;
                }
            }
        },
        checkDataInput(){
            if (this.roleObj.name===null || this.roleObj.name.trim()===''){
                this.commonNotifyVue('Vui lòng nhập Tên nhóm quyền','warn');
                return false;
            }
            if (this.roleObj.listPrivilege.length==0){
                this.commonNotifyVue('Bạn phải chọn quyền cho nhóm','warn');
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
    <b-modal id="modal-add-usergroup" size="lg" style="height: 350px"  :scrollable="true" :title="titleModal" title-class="font-18" @show="handleInitData" hide-footer>
        <div class="card">
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-6">
                        <label>Tên nhóm quyền</label>
                        <input type="text" :disabled="actionType===3" maxlength="50" v-model="roleObj.name" class="form-control"/>
                    </div>
                    <div class="col-6">
                        <label>Mô tả</label>
                        <input :disabled="actionType===3" maxlength="200" v-model="roleObj.description" type="text" class="form-control"/>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="table-responsive">
                        <table class="table table-striped mb-0">
                            <thead>
                            <tr>
                                <th><input class="form-check-input" @click="onchangeCheckAll" :disabled="actionType===3" v-model="checkAllAuthen" type="checkbox"/></th>
                                <th>Quyền</th>
                                <th>Mô tả</th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(authen,index) in listAuthens" :key="index">
                                <td><input class="form-check-input" :disabled="actionType===3" v-model="authen.isSelected" type="checkbox"/></td>
                                <td><label>{{authen.name}}</label></td>
                                <td><label>{{authen.description}}</label></td>


                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            <div class="card-footer text-end">
                <button type="button" class="btn btn-primary" @click="closeModalAddRoleGroup">Bỏ qua</button>
                <button type="button" class="btn btn-success" @click="addRoleGroup"><i class="uil uil-save me-1"></i> Lưu lại</button>

            </div>
        </div>
    </b-modal>
</template>

