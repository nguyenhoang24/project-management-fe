<script>
    import {required, email} from "vuelidate/lib/validators";

    /**
     * Login component
     */
    export default {
        head() {
            return {
                title: `Login | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`
            };
        },
        layout: "auth",
        data() {
            return {
                email: "admin@themesbrand.com",
                password: "123456",
                submitted: false,
                authError: null,
                tryingToLogIn: false,
                isAuthError: false
            };
        },
        validations: {
            email: {
                required,
                email
            },
            password: {
                required
            }
        },
        computed: {
            notification() {
                return this.$store ? this.$store.state.notification : null;
            },
            notificationAutoCloseDuration() {
                return this.$store && this.$store.state.notification ? 5 : 0;
            }
        },
        methods: {
            // Try to log the user in with the username
            // and password they provided.
            tryToLogIn() {
                this.submitted = true;
                // stop here if form is invalid
                this.$v.$touch();

                // if (this.$v.$invalid) {
                //     return;
                // } else {
                //     if (process.env.auth === "firebase") {
                //         this.tryingToLogIn = true;
                //         // Reset the authError if it existed.
                //         this.authError = null;
                //         return (
                //             this.$store
                //                 .dispatch("auth/logIn", {
                //                     email: this.email,
                //                     password: this.password
                //                 })
                //                 // eslint-disable-next-line no-unused-vars
                //                 .then(token => {
                //                     this.tryingToLogIn = false;
                //                     this.isAuthError = false;
                //                     // Redirect to the originally requested page, or to the home page
                //                     this.$router.push(
                //                         this.$route.query.redirectFrom || {
                //                             path: "/"
                //                         }
                //                     );
                //                 })
                //                 .catch(error => {
                //                     this.tryingToLogIn = false;
                //                     this.authError = error ? error : "";
                //                     this.isAuthError = true;
                //                 })
                //         );
                //     } else if (process.env.auth === "fakebackend") {
                //         const {email, password} = this;
                //         if (email && password) {
                //             this.$store.dispatch("authfack/login", {
                //                 email,
                //                 password
                //             });
                //         }
                //     }
                // }
            }
        }
    };
</script>
<template>
    <div>
        <div class="account-pages">
            <div class="container d-flex flex-column min-vh-100 min-vw-100">
                <div class="row d-flex flex-grow-1 justify-content-center align-items-center">
                    <div class="col-md-7 col-lg-5 col-xl-5 col-xxl-3">
                        <div class="card">
                            <div class="card-title p-4 bg-info">
                                <h5 class="text-white text-center mb-0">ĐĂNG NHẬP</h5>
                            </div>
                            <div class="card-body p-4">
                                <div class="p-2">
                                    <b-alert
                                        v-model="isAuthError"
                                        variant="danger"
                                        class="mt-3"
                                        dismissible
                                    >{{ authError }}
                                    </b-alert>
                                    <div
                                        v-if="notification.message"
                                        :class="'alert ' + notification.type"
                                    >
                                        {{ notification.message }}
                                    </div>
                                    <b-form @submit.prevent="tryToLogIn">
                                        <b-form-group
                                            label="Tài khoản"
                                            class="mb-3"
                                        >
                                            <b-form-input
                                                v-model="email"
                                                type="text"
                                                placeholder="Nhập tài khoản"
                                                :class="{ 'is-invalid': submitted && $v.email.$error }"
                                            ></b-form-input>
                                            <div
                                                v-if="submitted && $v.email.$error"
                                                class="invalid-feedback"
                                            >
                                                <span v-if="!$v.email.required">Email is required.</span>
                                                <span v-if="!$v.email.email">Please enter valid email.</span>
                                            </div>
                                        </b-form-group>
                                        <b-form-group id="input-group-2" class="mb-3">
                                            <div class="float-end">
                                                <nuxt-link
                                                    to="/account/forgot-password"
                                                    class="text-muted"
                                                >Bạn quên mật khẩu?
                                                </nuxt-link>
                                            </div>
                                            <label>Mật khẩu</label>
                                            <b-form-input
                                                v-model="password"
                                                type="password"
                                                placeholder="Nhập mật khẩu"
                                                :class="{'is-invalid': submitted && $v.password.$error}"
                                            ></b-form-input>
                                            <div
                                                v-if="submitted && !$v.password.required"
                                                class="invalid-feedback"
                                            >
                                                Password is required.
                                            </div>
                                        </b-form-group>
                                        <div class="form-check">
                                            <input
                                                type="checkbox"
                                                class="form-check-input"
                                                id="auth-remember-check"
                                            />
                                            <label class="form-check-label" for="auth-remember-check"
                                            >Ghi nhớ tài khoản</label>
                                        </div>
                                        <div class="mt-3 text-end">
                                            <b-button type="submit" variant="primary" class="w-sm"
                                            >Đăng nhập
                                            </b-button>
                                        </div>
                                    </b-form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end row -->
            </div>
            <!-- end container -->
        </div>
    </div>
</template>
