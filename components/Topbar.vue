<script>
import {menuItems} from "./menu";
import {getAccessToken, getUserInfo} from '../utils/cookieAuthen';
import {mapActions} from "vuex";
import Swal from "sweetalert2";

/**
 * Topbar component
 */
export default {
    head() {
        return {
            title: this.menuGetNameActive()
        };
    },
    components: {
        'ckeditor-nuxt': () => {
            if (process.client) {
                return import('@blowstack/ckeditor-nuxt')
            }
        },

    },
    data() {
        return {
            titleModal: "Nội quy",
            menuItems: menuItems,
            languages: [{
                flag: require("~/assets/images/flags/us.jpg"),
                language: "en",
                title: "English",
            },
                {
                    flag: require("~/assets/images/flags/french.jpg"),
                    language: "fr",
                    title: "French",
                },
                {
                    flag: require("~/assets/images/flags/spain.jpg"),
                    language: "es",
                    title: "spanish",
                },
                {
                    flag: require("~/assets/images/flags/china.png"),
                    language: "zh",
                    title: "Chinese",
                },
                {
                    flag: require("~/assets/images/flags/arabic.png"),
                    language: "ar",
                    title: "Arabic",
                },
            ],
            current_language: this.$i18n.locale,
            text: null,
            flag: null,
            value: null,
            user: {
                id: -1,
                name: ""
            },
            showModal: false,
            eventModal: false,
            teacher: {
                id: -1,
                regulation: ""
            },
            editorConfig: {
                removePlugins: ['Title'],
                simpleUpload: {
                    uploadUrl: 'http://localhost:8088/file/upload',
                    headers: {
                        'Authorization': 'Bearer ' + getAccessToken()
                    },
                }
            },

            isEditModalField: false,
            userInfo: JSON.parse(getUserInfo())
        };
    },
    mounted() {
        this.value = this.languages.find((x) => x.language === this.$i18n.locale);
        this.text = this.value.title;
        this.flag = this.value.flag;
        this.handleInitUser();
    },
    methods: {
        ...mapActions('authen', {
            apiLogout: 'apiLogout'
        }),
        ...mapActions('admin/students', {
            apiGetStudent: 'apiGetStudent'
        }),
        ...mapActions('assign/assignment', {
            apiGetAssignment: 'apiGetAssignment'
        }),
        ...mapActions('admin/teachers', {
            apiGetTeacherById: 'apiGetTeacherById',
            apiAddRegulation: 'apiAddRegulation'
        }),
        /**
         * Toggle menu
         */
        handleInitUser() {
            if (JSON.parse(getUserInfo()).role === "ROLE_STUDENT") {
                this.apiGetStudent({
                    conditionSearch: "ID",
                    valueSearch: JSON.parse(getUserInfo()).studentId
                }).then(res => {

                    this.user.name = res[0].fullName
                })
            }
                    console.log(JSON.parse(getUserInfo()).teacherId)
            if (JSON.parse(getUserInfo()).role === "ROLE_TEACHER") {
                this.apiGetTeacherById({id: JSON.parse(getUserInfo()).teacherId}).then(res => {
                    this.user.name = res.fullName
                })
            }
        },
        menuGetNameActive() {
            let path = $nuxt.$route.path;
            let menuName = '';

            if (path === '' || path === '/') {
                menuName = 'Dashboard';
            } else if (path === '/customer') {
                menuName = 'Chăm sóc khách hàng';
            } else {
                for (let x = 0; x < this.menuItems.length; x++) {
                    // console.log("menu: ", menuItems[x])
                    let subItems = menuItems[x]['subItems'];
                    if (subItems) {
                        const objMenu = subItems.find(x => x.link === path);
                        if (objMenu) {
                            menuName = objMenu.label;
                            break;
                        }
                    } else {
                        if (menuItems[x].link === path) {
                            menuName = menuItems[x].label;
                            break;
                        }
                    }
                }
            }

            return menuName;
        },
        toggleMenu() {
            this.$parent.toggleMenu();
        },
        initFullScreen() {
            document.body.classList.toggle("fullscreen-enable");
            if (
                !document.fullscreenElement &&
                /* alternative standard method */
                !document.mozFullScreenElement &&
                !document.webkitFullscreenElement
            ) {
                // current working methods
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(
                        Element.ALLOW_KEYBOARD_INPUT
                    );
                }
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        },
        /**
         * Toggle rightsidebar
         */
        toggleRightSidebar() {
            this.$parent.toggleRightSidebar();
        },
        /**
         * Set languages
         */
        setLanguage(locale, country, flag) {
            this.$i18n.locale = locale;
            this.current_language = locale;
            this.text = country;
            this.flag = flag;
        },
        logoutUser() {
            if (process.env.auth === "firebase") {
                this.$store.dispatch("authen.js/logOut");
            } else if (process.env.auth === "fakebackend") {
                this.$store.dispatch("authfack/logout");
            }
            this.apiLogout();
            this.$router.push({
                path: "/account/login",
            });
        },
        editSubmit(e) {
            this.submit = true;
            this.event.recipient = this.studentMail[0].value;

            this.apiEditReminder(this.event).then(response => {
                Swal.fire("", "Sửa thành công", "success");
                this.handleInitData();
            }).catch(err => {
                console.log(err);
                Swal.fire("", "Sửa không thành công", "error");
            }).finally(() => {
                // this.commonLoadingPage(false);
            });


            this.successmsg();
            this.eventModal = false;


        },
        prepareAddOne() {
            this.isEditModalField = false;
            this.isViewModalFileField = false;
            this.titleModal = 'Nội quy';

            this.apiGetTeacherById({id: JSON.parse(getUserInfo()).teacherId}).then(res => {
                this.teacher.regulation = res.regulation
            })
            console.log("user: ", this.teacher)

            this.$bvModal.show('modal-add-rule');
        },
        closeModalSub() {
            this.$bvModal.hide('modal-add-rule');
        },
        addEditOneSub() {
            this.teacher.id = JSON.parse(getUserInfo()).teacherId;
            this.apiAddRegulation(this.teacher)
                .then(response => {
                    this.teacher.regulation = response;
                    this.$bvModal.hide('modal-add-rule');

                })
                .catch(err => {
                    console.log(err.message);

                })
                .finally(() => {
                    // this.commonLoadingPage(false);
                });


        },
    },
};
</script>

<style>

</style>
<template>
    <header id="page-topbar">
        <div class="navbar-header">
            <div class="d-flex">
                <!-- LOGO -->
                <div class="navbar-brand-box">
                    <nuxt-link to="/" class="logo logo-dark">
                    <span class="logo-sm" @click="toggleMenu">
                        <img src="~/assets/images/logo-sm.png" alt height="22"/>
                    </span>
                        <span class="logo-lg" @click="toggleMenu">
                        <img src="~/assets/images/logo-dark.png" alt height="20"/>
                    </span>
                    </nuxt-link>

                    <nuxt-link to="/" class="logo logo-light">
                    <span class="logo-sm" @click="toggleMenu">
                        <img src="~/assets/images/logo-sm.png" alt height="22"/>
                    </span>
                        <span class="logo-lg" @click="toggleMenu">
                        <img src="~/assets/images/logo-light.png" alt height="20"/>
                    </span>
                    </nuxt-link>
                </div>
                <h4 class="px-3 mb-0">{{ menuGetNameActive() }}</h4>
                <div class="px-3" :hidden="userInfo.role === 'ROLE_ADMIN'">
                    <button type="button" class="btn btn-primary d-block" @click="prepareAddOne"> Nội quy</button>
                </div>
                <!--            <button @click="toggleMenu" type="button" class="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn" id="vertical-menu-btn">-->
                <!--                <i class="fa fa-fw fa-bars"></i>-->
                <!--            </button>-->

                <!-- App Search-->
                <!--            <form class="app-search d-none d-lg-block">-->
                <!--                <div class="position-relative">-->
                <!--                    <input type="text" class="form-control" :placeholder="$t('navbar.search.text')" />-->
                <!--                    <span class="uil-search"></span>-->
                <!--                </div>-->
                <!--            </form>-->
            </div>

            <div class="d-flex">


                <b-dropdown class="d-inline-block" toggle-class="header-item" right variant="white" menu-class="dropdown-menu-end">
                    <template v-slot:button-content>
                        <img class="rounded-circle header-profile-user" src="~/assets/images/users/avatar-7.jpg" alt="Header Avatar"/>
                        <span class="d-none d-xl-inline-block ms-1 fw-medium font-size-15">{{ user.name !== "" ? user.name : "ADMIN" }}</span>
                        <i class="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
                    </template>

                    <!-- item-->
                    <a class="dropdown-item" href="/profile">
                        <i class="uil uil-user-circle font-size-18 align-middle text-muted me-1"></i>
                        <span class="align-middle">Tài khoản</span>
                    </a>
                    <a class="dropdown-item" href="/user/change-password">
                        <i class="uil uil-wallet font-size-18 align-middle me-1 text-muted"></i>
                        <span class="align-middle">Đổi mật khẩu</span>
                    </a>
                    <a class="dropdown-item" @click="logoutUser" href="javascript: void(0);">
                        <i class="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"></i>
                        <span class="align-middle">Đăng xuất</span>
                    </a>
                </b-dropdown>

                <!--            <div class="dropdown d-inline-block">-->
                <!--                <button type="button" class="btn header-item noti-icon right-bar-toggle toggle-right" @click="toggleRightSidebar">-->
                <!--                    <i class="uil-cog toggle-right"></i>-->
                <!--                </button>-->
                <!--            </div>-->
            </div>
        </div>
        <b-modal id="modal-add-rule"
                 size="lg"
                 :title="titleModal"
                 title-class="font-18"
                 hide-footer>
            <div class="card-body">
                <div class="row mb-3" :hidden="userInfo.role==='ROLE_STUDENT'">
                    <div class="col-12">
                        <label>Nội dung</label>
                        <client-only  id="ckeditor" placeholder="Thêm nội quy" :hidden="user.role!=='ROLE_ADMIN'">
                            <ckeditor-nuxt v-model="teacher.regulation" :config="editorConfig"/>
                        </client-only>
                    </div>
                </div>
                <div class="row mb-3" :hidden="userInfo.role==='ROLE_TEACHER'">
                    <div class="col-12">
                        <label>Nội dung</label>
                        <span v-html="teacher.regulation"></span>
                    </div>
                </div>

                <div class="card-footer text-end" :hidden="userInfo.role !== 'ROLE_TEACHER'">
                    <button type="button" class="btn btn-primary" @click="closeModalSub" v-show="!isEditModalField">Bỏ qua</button>
                    <button type="button" class="btn btn-success" @click="addEditOneSub" v-show="!isEditModalField"><i class="uil uil-save me-1"></i> Lưu lại</button>

                </div>
            </div>

        </b-modal>
    </header>
</template>
