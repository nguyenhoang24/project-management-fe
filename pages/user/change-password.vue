<script>
import {mapActions} from "vuex";
import Swal from "sweetalert2";

export default {
    name: "user-history",
    data() {
        return {
            objUser: {
                oldPassword: "",
                newPassword: ""
            },
            confirmPassword: ""
        }
    },
    methods: {
        ...mapActions('admin/user', {
            apiChangePassword: 'apiChangePassword'
        }),
        changePassword() {
            if(this.confirmPassword === this.objUser.newPassword) {
                this.apiChangePassword(this.objUser)
                    .then(response => {
                        if(response) {
                            Swal.fire("", "Đổi mật khẩu thành công", "success");
                        } else {
                            Swal.fire("", "Mật khẩu hiện tại không đúng", "error");
                        }
                    })
            } else {
                Swal.fire("", "Mật khẩu không trùng khớp", "error");
            }

        }
    },
}
</script>

<style scoped>

</style>

<template>
    <div class="container">

        <div class="row align-items-center justify-content-center mt-5">
            <div class="col-md-8 col-lg-6 col-xl-5">
                <div class="card">

                    <div class="card-body p-4">

                        <div class="text-center mt-2">
                            <h5 class="text-primary">Đổi mật khẩu</h5>
                        </div>
                        <div class="p-2 mt-4">


                            <div class="mb-3">
                                <label class="form-label" for="useremail">Mật khẩu hiện tại</label>
                                <input v-model="objUser.oldPassword" type="password" class="form-control" id="useremail" placeholder="Nhập mật khẩu hiện tại">
                            </div>

                            <div class="mb-3">
                                <label class="form-label" for="username">Mật khẩu mới</label>
                                <input v-model="objUser.newPassword" type="password" class="form-control" id="username" placeholder="Nhập mật khẩu mới">
                            </div>

                            <div class="mb-3">
                                <label class="form-label" for="userpassword">Nhập lại mật khẩu</label>
                                <input v-model="confirmPassword" type="password" class="form-control" id="userpassword" placeholder="Nhập lại mật khẩu">
                            </div>

                            <div class="mt-3 text-end">
                                <button class="btn btn-primary w-sm waves-effect waves-light" type="submit" @click="changePassword">Đổi mật khẩu</button>
                            </div>

                        </div>

                    </div>
                </div>


            </div>
        </div>
        <!-- end row -->
    </div>
</template>
