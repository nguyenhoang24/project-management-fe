<script>
import {mapActions} from "vuex";
import Multiselect from "vue-multiselect";

import "vue-multiselect/dist/vue-multiselect.min.css";
import Swal from "sweetalert2";

export default {
    name: "StudentModal",
    props: {
        idUser: {
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
            objUser: {
                id: 0,
                username: "",
                password: "",
                email: "",
                status: "",
                createDate: "",
                role: {
                    id: "",
                    name: ""
                },
                roles: []
            },
            modalTitle: '',
            optionRole: [],
            objClass: []
        }
    },
    components: {
        Multiselect
    },
    updated() {

    },
    methods: {
        ...mapActions('admin/user', {
            apiGetUser: 'apiGetUser',
            apiSaveUser: 'apiSaveUser',
            apiUpdateUser: 'apiUpdateUser',
            apiDeleteUser: 'apiDeleteUser',
            apiGetRole: 'apiGetRole'
        }),
        resetForm() {
            this.objUser = {
                id: -1,
                username: "",
                password: "",
                email: "",
                status: "",
                roles: [],
                role: {
                    id: "",
                    name: ""
                }
            };

        },
        handleInitData() {
            this.$nextTick(() => {
                console.log('handleInitData', this.idUser);
                let objInput = {id: 0};
                this.apiGetRole().then(response => {
                    this.optionRole = response;
                })
                // alert(this.actionType);
                if (this.actionType === 1) {
                    this.modalTitle = 'Thêm tài khoản';
                    this.resetForm();
                } else if (this.actionType === 2 || this.actionType === 3) {
                    if (this.actionType === 2)
                        this.modalTitle = 'Sửa tài khoản';
                    else if (this.actionType === 3)
                        this.modalTitle = 'Xem thông tin tài khoản';
                    this.apiGetUser({
                        conditionSearch: 'ID',
                        valueSearch: this.idUser
                    }).then(response => {
                        this.objUser = response[0];
                        this.objUser.role = response[0].roles[0];
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
        addUser() {
            let optionEvent = '';
            let ids = [];
            if (this.checkDataInput()) {
                if (this.actionType === 2) {
                    console.log("before edit: ", this.objUser)
                    this.apiUpdateUser(this.objUser)
                        .then(response => {
                            this.$emit('handleGetUser');
                            this.$bvModal.hide('modal-add-event');
                        })
                        .catch(err => {
                            console.log(err);
                        })
                        .finally(() => {
                            // this.commonLoadingPage(false);
                        });
                }
                if (this.actionType === 1) {
                    console.log("role ", this.objUser.role)
                    this.objUser.roles.push(this.objUser.role);
                    this.apiSaveUser(this.objUser)
                        .then(response => {
                            this.$emit('handleGetUser');
                            Swal.fire("", "Lưu thành công", "success");

                            this.$bvModal.hide('modal-add-event');
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
            this.$bvModal.hide('modal-add-event');
        },
        checkDataInput() {
            if (this.objUser.username === null || this.objUser.username.trim() === '') {
                this.commonNotifyVue("Bạn phải nhập tên sinh viên", 'warn');
                return false;
            }

            if (this.objUser.email === null || this.objUser.email.trim() === '') {
                this.commonNotifyVue("Bạn phải nhập mã sinh viên", 'warn');
                return false;
            }

            return true;
        },

        onChangeProvince() {
            console.log('onChangeProvince', this.provinceOptionsSelected);
            let objInput = {provinces: this.provinceOptionsSelected};
            this.apiGetListDistrict(objInput)
                .then(response => {
                    let data = response['data'];
                    this.optionsDistrict = data;
                    console.log('apiGetListDistrict1', data);
                    if (response.err_code === 0) {
                    } else {
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
    <b-modal id="modal-add-event"
             size="lg" :title="modalTitle"
             title-class="font-18" hide-footer
             @show="handleInitData"
    >
        <div class="row pb-3">
            <div class="col-6">
                <label>Tên tài khoản</label>
                <input type="text" maxlength="200" v-model="objUser.username" :disabled="actionType===3" placeholder="Tên Tài Khoản" class="form-control form-control multiselect__tags"/>
            </div>
            <div class="col-6">
                <label>Mật khẩu</label>
                <input type="password" maxlength="200" v-model="objUser.password" :disabled="actionType===2 || actionType===3" placeholder="Mật khẩu" class="form-control form-control multiselect__tags"/>
            </div>
        </div>

        <div class="row pb-3">
            <div class="col-6">
                <label>Email</label>
                <input type="text" maxlength="200" v-model="objUser.email" :disabled="actionType===3" placeholder="Email" class="form-control form-control multiselect__tags"/>
            </div>
            <div class="col-6">
                <label>Quyền</label>
                <select v-model="objUser.role.id" :disabled="actionType===3" class="form-control">
                    <option v-for="option in optionRole" :value="option.id">
                        {{ option.name }}
                    </option>
                </select>
            </div>
        </div>
        <!-- end card-body -->
        <div class="text-end mt-4">
            <button type="button" class="btn btn-default" @click="closeModal">Bỏ qua</button>
            <button type="button" class="btn btn-primary px-4" @click="addUser">Lưu</button>
        </div>
    </b-modal>
</template>


