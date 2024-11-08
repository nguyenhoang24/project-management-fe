<script>
import {mapActions} from "vuex";

export default {
    name: "CreateEditUser",
    props:['actionType','userEditId'],
    data() {
        return {
            titleModal: '',
            checkAllAuthen:false,
            listRoles:[
                {isSelected:true,roleName:'Admin',roleDesc:'Quyền admin'},
                {isSelected:false,roleName:'report',roleDesc:'Xem báo cáo'}
            ],
            listGroup:[],
            userObj:{
                id:-1,
                username:'',
                fullname:'',
                password:'',
                password2:'',
                phone:'',
                email:'',
                groupId:-1,
                roleOfUser:[]
            }
        }
    },
    methods:{
        ...mapActions('admin/group', {
            apiGetListGroup: 'apiGetListGroup'
        }),
        ...mapActions('admin/role', {
            apiGetListRole: 'apiGetListRole'
        }),
        closeModalAddUser() {
            this.$bvModal.hide('modal-add-user');
        },
        addUser() {

        },
        onchangeCheckAll(){

        },handleInitData() {
            this.apiGetListGroup({status:-1})
                .then(response => {
                    if (response.err_code === 0) {
                        let data = response['data'];
                        this.listGroup=data;
                        console.log('apiGetListGroup',data);
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

            this.apiGetListRole({status:-1})
                .then(response => {
                    if (response.err_code === 0) {
                        let data = response['data'];
                        this.listRoles=data;
                        console.log('apiGetListRole',data);
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
}
</script>

<style scoped>

</style>

<template>
    <b-modal id="modal-add-user" size="lg" :title="titleModal" @show="handleInitData" title-class="font-18" hide-footer>
        <div class="card">
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-6">
                        <label>Tên tài khoản</label>
                        <input type="text" v-model="userObj.username" :disabled="actionType===3" class="form-control"/>
                    </div>
                    <div class="col-6">
                        <label>Họ và tên</label>
                        <input v-model="userObj.fullname" :disabled="actionType===3" type="text" class="form-control"/>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-6">
                        <label>Mật khẩu</label>
                        <input v-model="userObj.password" type="password" :disabled="actionType===3" class="form-control"/>
                    </div>
                    <div class="col-6">
                        <label>Nhập lại mật khẩu</label>
                        <input v-model="userObj.password2" :disabled="actionType===3" type="password" class="form-control"/>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-6">
                        <label>Số điện thoại</label>
                        <input v-model="userObj.phone" type="text" :disabled="actionType===3" class="form-control"/>
                    </div>
                    <div class="col-6">
                        <label>Email</label>
                        <input v-model="userObj.email" :disabled="actionType===3" type="text" class="form-control"/>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-6">
                        <label>Nhóm người dùng</label>
                        <select v-model="userObj.groupId" :disabled="actionType===3" class="form-control">
                            <option v-for="group in listGroup" :value="group.id">{{group.name}}</option>
                        </select>
                    </div>

                </div>
                <div class="row mb-3">
                    <div class="table-responsive">
                        <table class="table table-striped mb-0">
                            <thead>
                            <tr>
                                <th><input class="form-check-input" @click="onchangeCheckAll" :disabled="actionType===3" v-model="checkAllAuthen" type="checkbox"/></th>
                                <th>Nhóm quyền</th>
                                <th>Mô tả</th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(role,index) in listRoles" :key="index">
                                <td><input class="form-check-input" :disabled="actionType===3" v-model="role.isSelected" type="checkbox"/></td>
                                <td><label>{{role.name}}</label></td>
                                <td><label>{{role.description}}</label></td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="card-footer text-end">
                <button type="button" class="btn btn-primary" @click="closeModalAddUser">Bỏ qua</button>
                <button type="button" class="btn btn-success" @click="addUser"><i class="uil uil-save me-1"></i> Lưu lại</button>

            </div>
        </div>
    </b-modal>
</template>


