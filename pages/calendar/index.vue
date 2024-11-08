<script>
import Swal from "sweetalert2";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import listPlugin from "@fullcalendar/list";

import {categories} from "./data-calendar";
import {required} from "vuelidate/lib/validators";
import {mapActions} from "vuex";
import {getAccessToken, getUserInfo} from "../../utils/cookieAuthen";
import Multiselect from "vue-multiselect";

/**
 * Calendar component
 */


export default {
    components: {
        FullCalendar,
        Multiselect,
        'ckeditor-nuxt': () => {
            if (process.client) {
                return import('@blowstack/ckeditor-nuxt')
            }
        },
    },
    head() {
        return {
            title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
        };
    },
    computed: {
        calendarOptions() {
            return {
                headerToolbar: {
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                },
                plugins: [
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    bootstrapPlugin,
                    listPlugin,
                ],
                initialView: "dayGridMonth",
                themeSystem: "bootstrap",
                events: this.calendarEvents,
                editable: true,
                droppable: true,
                eventResizableFromStart: true,
                dateClick: this.dateClicked,
                eventClick: this.editEvent,
                eventsSet: this.handleEvents,
                weekends: true,
                selectable: true,
                selectMirror: true,
                dayMaxEvents: true,
                timezone: 'local'
            }
        }
    },
    data() {

        return {
            reminders: [],
            title: "Lịch",
            items: [{
                text: "Apps",
            },
                {
                    text: "Lịch",
                    active: true,
                },
            ],
            currentEvents: [],
            showModal: false,
            eventModal: false,
            categories: categories,
            submitted: false,
            submit: false,
            newEventData: {},
            edit: {},
            deleteId: {},
            event: {
                title: "",
                content: "",
                classNames: "",
                category: "",
                from: {
                    time: "",
                    date: ""
                },
                to: {
                    time: "",
                    date: ""
                },
                start: new Date(),
                end: new Date(),
                teacher: {
                    id: 0
                },
                session: {
                    id: 0
                },
                status: "",
                recipient: ""
            },
            editevent: {
                editTitle: "",
                editClassNames: "",
                category: "",
                editFrom: {
                    time: "",
                    date: ""
                },
                editTo: {
                    time: "",
                    date: ""
                },
                editStart: new Date(),
                editEnd: new Date(),
                editTeacher: {
                    id: 0
                },
                session: {
                    id: 0
                },
                status: "",
            },
            searchObj: {
                valueSearch: '',
                conditionSearch: ''
            },
            calendarEvents: [],
            studentOptions: [],
            allStudent: [],
            studentMail: [],
            user: JSON.parse(getUserInfo()),
            editorConfig: {
                removePlugins: ['Title'],
                simpleUpload: {
                    uploadUrl: 'http://localhost:8088/file/upload',
                    headers: {
                        'Authorization': 'Bearer ' + getAccessToken()
                    },
                }
            },
        };
    },
    validations: {
        event: {
            title: {
                required,
            },
            classNames: {
                required,
            },

        },
    },
    // middleware: "authentication",
    mounted() {
        this.handleInitData();
        this.handleGetStudent();
        if (JSON.parse(getUserInfo()).role === "ROLE_STUDENT") {
            this.getNotify();
        }
    },
    methods: {
        ...mapActions('reminder', {
            apiGetReminder: 'apiGetReminder',
            apiAddReminder: 'apiAddReminder',
            apiDeleteReminder: 'apiDeleteReminder',
            apiEditReminder: 'apiEditReminder'
        }),
        ...mapActions('teachers', {
            apiGetStudentByTeacher: 'apiGetStudentByTeacher'
        }),
        ...mapActions('email', {
            apiSendMail: 'apiSendMail'
        }),
        ...mapActions('notify', {
            apiGetNotify: 'apiGetNotify',
            apiGetNotifyDay: 'apiGetNotifyDay',
            apiGetNotifyHour: 'apiGetNotifyHour',
        }),
        /**
         * Modal form submit
         */
        getNotify() {
            this.apiGetNotify(JSON.parse(getUserInfo()).studentId)
                .then(res => {
                    if (res > 0) {
                        Swal.fire("Bạn có " + res + " thông báo mới", "Xem chi tiết trong lịch", "info");
                    }
                });
            this.apiGetNotifyDay(JSON.parse(getUserInfo()).studentId)
                .then(res => {
                    if (res > 0) {
                        Swal.fire("Thông báo", "Bạn có lịch hẹn vào ngày mai", "info");
                    }
                });
            this.apiGetNotifyHour(JSON.parse(getUserInfo()).studentId)
                .then(res => {
                    if (res > 0) {
                        Swal.fire("Thông báo", "Bạn có lịch hẹn vào 2 tiếng sắp tới", "warning");
                    }
                })
        },
        async handleGetStudent() {
            let students = [];
            try {
                students = await this.apiGetStudentByTeacher({id: JSON.parse(getUserInfo()).teacherId})
            } catch (err) {
                console.error(err);
            }
            for (let i = 0; i < students.length; i++) {
                let student = students[i];
                this.studentOptions.push({
                    name: student.code + " - " + student.fullName,
                    value: student.email
                })
                this.allStudent.push(student.email);
            }
            this.studentOptions.push({
                name: "Tất cả",
                value: this.allStudent.join(",")
            })
            this.studentOptions.reverse()
        },
        async handleInitData() {
            let userInfo = JSON.parse(getUserInfo());
            let reminder = [];
            this.commonLoadingPage(true);
            try {
                var d = new Date(Date.now());

                reminder = await this.apiGetReminder({
                    conditionSearch: "TEACHER",
                    valueSearch: userInfo.session + "," + userInfo.teacherId
                })
                for (var i = 0; i < reminder.length; i++) {
                    reminder[i].timeZome = "UTC";
                }
            } catch (err) {
                console.error(err);
            } finally {
                this.commonLoadingPage(false);
            }
            this.calendarEvents = reminder;
        },

        checkDataInput() {
            if (this.event.from.date === null || this.event.from.date.trim() === '') {
                this.commonNotifyVue("Bạn phải nhập ngày bắt đầu", 'warn');
                return false;
            }

            if (this.event.content === null || this.event.content.trim() === '') {
                this.commonNotifyVue("Bạn phải nhập nội dung", 'warn');
                return false;
            }

            if (this.event.from.time === null || this.event.from.time.trim() === '') {
                this.commonNotifyVue("Bạn phải nhập thời gian bắt đầu", 'warn');
                return false;
            }

            if (this.event.from.date === null || this.event.to.date.trim() === '') {
                this.commonNotifyVue("Bạn phải nhập thời gian kết thúc", 'warn');
                return false;
            }

            if (this.event.to.time === null || this.event.to.time.trim() === '') {
                this.commonNotifyVue("Bạn phải nhập thời gian kết thúc", 'warn');
                return false;
            }
            if (this.studentMail.length === 0) {
                this.commonNotifyVue("Bạn phải chọn sinh viên nhận mail", 'warn');
                return false;
            }

            return true;
        },
        // eslint-disable-next-line no-unused-vars
        handleSubmit(e) {
            this.submitted = true;

            // stop here if form is invalid
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            } else {
                if (this.checkDataInput()) {

                    const startDate = `${this.event.from.date}T${this.event.from.time}:00.000Z`;
                    const endDate = `${this.event.to.date}T${this.event.to.time}:00.000Z`;
                    let userInfo = JSON.parse(getUserInfo());
                    this.event.teacher.id = userInfo?.teacherId;

                    this.event.session.id = userInfo?.session;
                    this.event.start = new Date(startDate.toLocaleString('en-US', {timeZone: 'Asia/Bangkok'}));
                    this.event.end = new Date(endDate.toLocaleString('en-US', {timeZone: 'Asia/Bangkok'}));
                    this.event.status = this.event?.category;
                    this.event.recipient = this.studentMail[0].value;
                    this.commonLoadingPage(true);
                    this.apiSendMail({
                        recipient: [this.event.recipient],
                        msgBody: this.event.content,
                        subject: this.event.title
                    }).then(response => {
                        this.apiAddReminder(this.event)
                            .then(response => {
                                this.handleInitData()
                                this.successmsg();
                                this.showModal = false;
                                this.newEventData = {};
                            })
                            .catch(err => {
                                console.log(err);
                                this.handleInitData()
                                this.showModal = false;
                                this.errormsg();
                            })
                            .finally(() => {
                                // this.commonLoadingPage(false);
                            });
                    }).catch(err => {
                        this.handleInitData()
                        this.showModal = false;
                        this.errormsg();
                    }).finally(
                        () => this.commonLoadingPage(true)
                    )

                }

            }
            this.submitted = false;
        },
        // eslint-disable-next-line no-unused-vars
        hideModal(e) {
            this.submitted = false;
            this.showModal = false;
        },
        /**
         * Edit event modal submit
         */
        // eslint-disable-next-line no-unused-vars
        editSubmit(e) {
            if (this.checkDataInput()) {
                this.submit = true;
                this.event.start = `${this.event.from.date}T${this.event.from.time}:00.000Z`;
                this.event.end = `${this.event.to.date}T${this.event.to.time}:00.000Z`;
                this.event.recipient = this.studentMail[0].value;
                this.commonLoadingPage(true);
                this.apiEditReminder(this.event).then(response => {
                    Swal.fire("", "Sửa thành công", "success");
                    this.handleInitData();

                    this.apiSendMail({
                        recipient: [this.event.recipient],
                        msgBody: this.event.content,
                        subject: this.event.title
                    }).then(response => {

                    })
                        .catch(err => {
                            console.log(err);
                            Swal.fire("", "Sửa không thành công", "error");
                        })
                        .finally(() => {
                            // this.commonLoadingPage(false);
                        });
                }).catch(err => {
                    console.log(err);
                    this.handleInitData()
                    this.showModal = false;
                    this.errormsg();

                }).finally(() => {
                     this.commonLoadingPage(false);
                });


                this.eventModal = false;
            }

        },

        /**
         * Delete event
         */
        deleteEvent() {
            this.edit.remove();
            this.eventModal = false;
        },
        /**
         * Modal open for add event
         */
        dateClicked(info) {
            this.event.from.time = "";
            this.event.title = "";
            this.event.content = "";
            this.event.recipient = "";
            this.newEventData = info;
            this.event.from.date = this.newEventData.dateStr;
            this.event.to.time = "";
            this.event.to.date = "";
            this.studentMail = [];
            this.showModal = true;
        },
        /**
         * Modal open for edit event
         */
        editEvent(info) {

            this.edit = info.event;


            this.apiGetReminder({
                valueSearch: info.event._def.publicId,
                conditionSearch: "ID"
            })
                .then(response => {
                    this.studentMail = [];
                    this.event.title = response[0].title;
                    this.event.classNames = response[0].classNames;
                    this.event.content = response[0].content;
                    this.event.teacher.id = response[0].teacher.id;
                    this.event.session.id = response[0].session.id;
                    this.event.id = response[0].id;
                    const recipients = response[0].recipient.split(",");
                    console.log("studentMail: ", recipients)
                    for (let i = 0; i < this.studentOptions.length; i++) {
                        if (recipients.includes(this.studentOptions[i].value)) {
                            this.studentMail.push(this.studentOptions[i]);
                        }
                    }

                    let startDate = new Date(response[0].start);
                    let endDate = new Date(response[0].end);
                    let startMonth = startDate.getMonth() + 1; // getMonth() returns a zero-based index
                    let paddedStartMonth = startMonth.toString().padStart(2, '0');
                    let paddedStartDate = startDate.getDate().toString().padStart(2, '0');
                    let paddedStartHour = startDate.getHours().toString().padStart(2, '0');
                    let paddedStartMinutes = startDate.getMinutes().toString().padStart(2, '0');

                    let endMonth = endDate.getMonth() + 1; // getMonth() returns a zero-based index
                    let paddedEndMonth = endMonth.toString().padStart(2, '0');
                    let paddedEndDate = endDate.getDate().toString().padStart(2, '0');
                    let paddedEndHour = endDate.getHours().toString().padStart(2, '0');
                    let paddedEndMinutes = endDate.getMinutes().toString().padStart(2, '0');

                    this.event.from.date = startDate.getFullYear() + "-"
                        + paddedStartMonth + "-"
                        + paddedStartDate;
                    this.event.from.time = paddedStartHour + ":" + paddedStartMinutes;

                    this.event.to.date = endDate.getFullYear() + "-"
                        + paddedEndMonth + "-"
                        + paddedEndDate;
                    this.event.to.time = paddedEndHour + ":" + paddedEndMinutes;


                })
                .catch(err => {
                    this.handleInitData()
                    this.showModal = false;
                    this.errormsg();
                })

            console.log(this.event)


            this.eventModal = true;
        },

        closeModal() {
            this.eventModal = false;
        },

        confirm() {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to delete this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#f46a6a",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                console.log(result)
                if (result.value) {
                    this.apiDeleteReminder(this.event.id).then(response => {
                        Swal.fire("", "Xoá thành công", "success");
                        this.handleInitData();
                    }).catch(err => {
                        console.log(err);
                        Swal.fire("", "Xoá không thành công", "error");
                    }).finally(() => {
                        // this.commonLoadingPage(false);
                    });
                }
                this.eventModal = false;
            });
        },

        /**
         * Show list of events
         */
        handleEvents(events) {
            this.currentEvents = events;
        },

        handleEventsSet() {

        },
        /**
         * Show successfull Save Dialog
         */
        successmsg() {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Thông báo đã được tạo",
                showConfirmButton: false,
                timer: 1000,
            });
        },
        errormsg() {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Có lỗi khi gửi mail",
                showConfirmButton: false,
                timer: 1000,
            });
        },
    },


};
</script>

<template>
    <div>
        <PageHeader :title="title" :items="items"/>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="app-calendar">
                            <FullCalendar ref="fullCalendar" :options="calendarOptions" :eventsSet="handleEventsSet"></FullCalendar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal id="add-modal" v-model="showModal" title="Thêm sự kiện" title-class="text-black font-18" body-class="p-3" hide-footer>
            <form @submit.prevent="handleSubmit">
                <div class="row">
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="name">Tên sự kiện</label>
                            <input id="name" v-model="event.title" type="text" class="form-control" placeholder="Thêm tên sự kiện" :class="{ 'is-invalid': submitted && $v.event.title.$error }"/>
                            <div v-if="submitted && !$v.event.title.required" class="invalid-feedback">This value is required.</div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="content">Nội dung</label>
                            <client-only placeholder="Thêm nội dung" :hidden="user.role!=='ROLE_TEACHER'">
                                <ckeditor-nuxt id="content" v-model="event.content" :config="editorConfig"/>
                            </client-only>
                            <!--                            <textarea id="content" v-model="event.content" type="text" class="form-control" placeholder="Thêm nội dung" :class="{ 'is-invalid': submitted && $v.event.title.$error }"/>-->
                            <div v-if="submitted && !$v.event.title.required" class="invalid-feedback">This value is required.</div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-4">
                            <label class="control-label">Trạng thái</label>
                            <select v-model="event.classNames" class="form-control" name="classNames" :class="{ 'is-invalid': submitted && $v.event.classNames.errors }">
                                <option v-for="option in categories" :key="option.backgroundColor" :value="`${option.value}`">{{ option.name }}</option>
                            </select>
                            <div v-if="submitted && !$v.event.classNames.required" class="invalid-feedback">This value is required.</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-5 d-flex mb-3">
                            <label for="from-time" style="width: 80px">Từ</label>
                            <input id="from-time" v-model="event.from.time" type="time" class="form-control"/>
                        </div>
                        <div class="col-7  mb-3">
                            <input id="from-date" v-model="event.from.date" type="date" class="form-control"/>
                        </div>
                        <div v-if="submitted" class="invalid-feedback">This value is required.</div>
                    </div>

                    <div class="row">
                        <div class="col-5 d-flex  mb-3">
                            <label for="to-time" style="width: 80px">Đến</label>
                            <input id="to-time" v-model="event.to.time" type="time" class="form-control"/>
                        </div>
                        <div class="col-7">
                            <input id="to-date" v-model="event.to.date" type="date" class="form-control"/>
                        </div>
                        <div v-if="submitted" class="invalid-feedback">This value is required.</div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="mb-3">
                        <label>Sinh viên nhận mail</label>
                        <multiselect v-model="studentMail" :options="studentOptions" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn sinh viên" label="name" track-by="name" :preselect-first="true">

                        </multiselect>
                    </div>
                </div>
                <div class="text-right mt-5 " :hidden="user.role !== 'ROLE_TEACHER'" style="float: right">
                    <b-button variant="light" @click="hideModal">Đóng</b-button>
                    <b-button type="submit" variant="success" class="ml-1" >Tạo mới</b-button>
                </div>
            </form>
        </b-modal>

        <!-- Edit Modal -->
        <b-modal id="add-modal" v-model="eventModal" title="Edit Event" title-class="text-black font-18" hide-footer body-class="p-3">
            <form @submit.prevent="editSubmit">
                <div class="row">
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="name">Tên sự kiện</label>
                            <input id="name" v-model="event.title" type="text" class="form-control" placeholder="Insert Event name" :class="{ 'is-invalid': submitted && $v.event.title.$error }"/>
                            <div v-if="submitted && !$v.event.title.required" class="invalid-feedback">This value is required.</div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="content">Nội dung</label>
                            <client-only placeholder="Thêm nội dung" :hidden="user.role!=='ROLE_TEACHER'">
                                <ckeditor-nuxt v-model="event.content" :config="editorConfig"/>
                            </client-only>
                            <!--                            <textarea id="content" v-model="event.content" type="text" class="form-control" placeholder="Thêm nội dung" :class="{ 'is-invalid': submitted && $v.event.title.$error }"/>-->
                            <div v-if="submitted && !$v.event.title.required" class="invalid-feedback">This value is required.</div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label class="control-label">Trạng thái</label>
                            <select v-model="event.classNames" class="form-control" name="classNames" :class="{ 'is-invalid': submitted && $v.event.classNames.errors }">
                                <option v-for="option in categories" :key="option.backgroundColor" :value="`${option.value}`">{{ option.name }}</option>
                            </select>
                            <div v-if="submitted && !$v.event.classNames.required" class="invalid-feedback">This value is required.</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-5 d-flex mb-3">
                            <label for="from-time" style="width: 80px">Từ</label>
                            <input id="from-time" v-model="event.from.time" type="time" class="form-control"/>
                        </div>
                        <div class="col-7  mb-3">
                            <input id="from-date" v-model="event.from.date" type="date" class="form-control"/>
                        </div>
                        <div v-if="submitted" class="invalid-feedback">This value is required.</div>
                    </div>

                    <div class="row">
                        <div class="col-5 d-flex  mb-3">
                            <label for="to-time" style="width: 80px">Đến</label>
                            <input id="to-time" v-model="event.to.time" type="time" class="form-control"/>
                        </div>
                        <div class="col-7">
                            <input id="to-date" v-model="event.to.date" type="date" class="form-control"/>
                        </div>
                        <div v-if="submitted" class="invalid-feedback">This value is required.</div>
                    </div>
                </div>
                <label>Sinh viên nhận mail</label>
                <multiselect v-model="studentMail" :options="studentOptions" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn sinh viên" label="name" track-by="name" :preselect-first="true">

                </multiselect>

                <div class="text-right p-3" style="float: right" :hidden="this.user.role !== 'ROLE_TEACHER'">
                    <b-button variant="light" @click="closeModal">Đóng</b-button>
                    <b-button class="ml-1" variant="danger" @click="confirm">Xóa</b-button>
                    <b-button class="ml-1" variant="success" @click="editSubmit">Sửa</b-button>
                </div>
            </form>
        </b-modal>
    </div>
</template>
