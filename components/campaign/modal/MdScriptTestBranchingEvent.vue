<script>
import {mapActions} from "vuex";

export default {
    name: "MdScriptTestBranchingEvent",
    props: {
        nodeId: {
            type: Number,
            default: 0
        },
        dataNodeModal: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            arroptionAndOr: [
                {value: 'AND', text: 'AND'},
                {value: 'OR', text: 'OR'}
            ],
            arrCityData: [],
            arrayGroupProp: [
                {
                    operator: '',
                    options: [
                        this.handlePropDefault('')
                    ]
                }
            ],
            formData: {
                id: 0,
                title: "Rẽ nhánh bằng sự kiện đầu vào",
                node_type: "EVENT_BRANCH",
                extra_info: {
                    raw_data: ""
                }
            },
        }
    },
    methods: {
        ...mapActions('contacts', {
            apiGetListCities: 'apiGetListCities',
            apiGetListDistrict: 'apiGetListDistrict'
        }),
        handleModalShow() {
            this.$nextTick(() => {
                this.handleGetCity();

                if (this.dataNodeModal) {
                    this.formData = this.dataNodeModal;
                }

                this.formData.id = this.nodeId;
                if (this.formData.extra_info.raw_data !== '') {
                    this.handleBuildDataView();
                }

                console.log('handleModalShow', this.nodeId);
                console.log('handleModalShow', this.dataNodeModal);
            });
        },
        handleModalHidden() {
            this.arrayGroupProp = [
                {
                    operator: '',
                    options: [
                        this.handlePropDefault('')
                    ]
                }
            ];

            this.formData = {
                id: 0,
                title: "Rẽ nhánh bằng sự kiện đầu vào",
                node_type: "EVENT_BRANCH",
                extra_info: {
                    raw_data: ""
                }
            };

            console.log('handleModalHidden');
        },
        handleGetCity() {
            this.apiGetListCities()
                .then(response => {
                    if (response.err_code === 0) {
                        this.arrCityData = response.data
                    }
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                })
        },
        handleGetDistrict(obj) {
            obj.district = -1;

            this.apiGetListDistrict({
                citieId: obj.city
            })
                .then(response => {
                    if (response.err_code === 0) {
                        obj.arr_district = response.data
                    }
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                });
        },
        handlePropDefault(type) {
            return Object.assign({}, {
                custom_type: -1,
                people_info: 1,
                people_tele: 1,
                people_option_hobby: 1,
                text_customer: '',
                people_info_obj: {
                    arr_district: [],
                    fullname_condition: 1,
                    fullname_text: "",
                    age_condition: "between",
                    age_from: 0,
                    age_to: 0,
                    city: -1,
                    district: -1,
                    sex: 0
                },
                people_tele_obj: {
                    arr_district: [],
                    sub_type: 1,
                    arpu_condition: "between",
                    arpu_from: 0,
                    arpu_to: 0,
                    status: 1,
                    device: 0,
                    service: "",
                    city: -1,
                    district: -1,
                    age_condition: "between",
                    age_from: 0,
                    age_to: 0,
                    card_condition: "between",
                    card_from: 0,
                    card_to: 0
                },
                people_option_hobby_obj: {
                    sport: "",
                    data: "",
                    movie: ""
                },
                operator: type
            });
        },
        handleAddGroupProp() {
            this.arrayGroupProp.push(
                {
                    operator: 'AND',
                    options: [
                        this.handlePropDefault('AND')
                    ]
                }
            );
        },
        handleAddProp(gIndex) {
            this.arrayGroupProp[gIndex]['options'].push(this.handlePropDefault('AND'));
        },
        handleBuildDataView() {
            let rawData = JSON.parse(this.formData.extra_info.raw_data);

            this.arrayGroupProp = [];

            for (let i = 0; i < rawData.length; i++) {
                let objObjGroup = {
                    stt: rawData[i].stt,
                    operator: rawData[i].operator,
                    options: []
                };

                this.arrayGroupProp.push(objObjGroup);
            }

            console.log('arrayGroupProp 1', this.arrayGroupProp);

            for (let i = 0; i < rawData.length; i++) {
                let objOneGroup = rawData[i];
                let options = objOneGroup.options;

                let demographic_info = options.demographic_info;
                let telecom_info = options.telecom_info;
                let customer_segment = options.customer_segment;
                let hobby = options.hobby;

                for (let j1 = 0; j1 < demographic_info.length; j1++) {
                    let objNew = this.handlePropDefault('');
                    let objPeople = demographic_info[j1];

                    objNew.custom_type = 1;
                    if (objPeople.hasOwnProperty('full_name')) {
                        objNew.people_info_obj.fullname_condition = objPeople.full_name.type;
                        objNew.people_info_obj.fullname_text = objPeople.full_name.name;
                        objNew.people_info = 1;
                    } else if (objPeople.hasOwnProperty('age')) {
                        objNew.people_info_obj.age_condition = objPeople.age.operator;
                        objNew.people_info_obj.age_from = objPeople.age.from;
                        objNew.people_info_obj.age_to = objPeople.age.to;
                        objNew.people_info = 2;
                    } else if (objPeople.hasOwnProperty('address')) {
                        objNew.people_info_obj.city = objPeople.address.city;
                        objNew.people_info_obj.district = objPeople.address.district;
                        objNew.people_info = 3;
                    } else if (objPeople.hasOwnProperty('gender')) {
                        objNew.people_info_obj.sex = objPeople.gender;
                        objNew.people_info = 4;
                    }

                    objNew.operator = objPeople.operator;
                    objNew.stt = objPeople.stt;

                    let objGroup = this.arrayGroupProp.find(x => x.stt === objPeople.group);
                    objGroup.options.push(objNew);
                }

                for (let j2 = 0; j2 < telecom_info.length; j2++) {
                    let objNew = this.handlePropDefault('');
                    let objTele = telecom_info[j2];

                    objNew.custom_type = 2;
                    if (objTele.hasOwnProperty('subscriber_type')) {
                        objNew.people_tele_obj.sub_type = objTele.subscriber_type;
                        objNew.people_tele = 1;
                    } else if (objTele.hasOwnProperty('arpu')) {
                        objNew.people_tele_obj.arpu_condition = objTele.arpu.operator;
                        objNew.people_tele_obj.arpu_from = objTele.arpu.from;
                        objNew.people_tele_obj.arpu_to = objTele.arpu.to;
                        objNew.people_tele = 2;
                    } else if (objTele.hasOwnProperty('status')) {
                        objNew.people_tele_obj.status = objTele.status;
                        objNew.people_tele = 3;
                    } else if (objTele.hasOwnProperty('device')) {
                        objNew.people_tele_obj.device = objTele.device;
                        objNew.people_tele = 4;
                    } else if (objTele.hasOwnProperty('service')) {
                        objNew.people_tele_obj.service = objTele.service;
                        objNew.people_tele = 5;
                    } else if (objTele.hasOwnProperty('address_fee')) {
                        objNew.people_tele_obj.city = objTele.address_fee.city;
                        objNew.people_tele_obj.district = objTele.address_fee.district;
                        objNew.people_tele = 6;
                    } else if (objTele.hasOwnProperty('subscriber_dob')) {
                        objNew.people_tele_obj.age_condition = objTele.subscriber_dob.operator;
                        objNew.people_tele_obj.age_from = objTele.subscriber_dob.from;
                        objNew.people_tele_obj.age_to = objTele.subscriber_dob.to;
                        objNew.people_tele = 7;
                    } else if (objTele.hasOwnProperty('card_value')) {
                        objNew.people_tele_obj.card_condition = objTele.card_value.operator;
                        objNew.people_tele_obj.card_from = objTele.card_value.from;
                        objNew.people_tele_obj.card_to = objTele.card_value.to;
                        objNew.people_tele = 8;
                    }

                    objNew.operator = objTele.operator;
                    objNew.stt = objTele.stt;

                    let objGroup = this.arrayGroupProp.find(x => x.stt === objTele.group);
                    objGroup.options.push(objNew);
                }

                for (let j3 = 0; j3 < customer_segment.length; j3++) {
                    let objNew = this.handlePropDefault('');
                    let objSegment = customer_segment[j3];

                    objNew.custom_type = 3;
                    objNew.text_customer = objSegment.text_customer;
                    objNew.operator = objSegment.operator;
                    objNew.stt = objSegment.stt;

                    let objGroup = this.arrayGroupProp.find(x => x.stt === objSegment.group);
                    objGroup.options.push(objNew);
                }

                for (let j4 = 0; j4 < hobby.length; j4++) {
                    let objNew = this.handlePropDefault('');
                    let objHobby = hobby[j4];

                    objNew.custom_type = 4;
                    if (objHobby.hasOwnProperty('sport')) {
                        objNew.people_option_hobby_obj.sport = objHobby.sport;
                        objNew.people_option_hobby = 1;
                    } else if (objHobby.hasOwnProperty('movie')) {
                        objNew.people_option_hobby_obj.movie = objHobby.movie;
                        objNew.people_option_hobby = 2;
                    } else if (objHobby.hasOwnProperty('data')) {
                        objNew.people_option_hobby_obj.data = objHobby.data;
                        objNew.people_option_hobby = 3;
                    }

                    objNew.operator = objHobby.operator;
                    objNew.stt = objHobby.stt;

                    let objGroup = this.arrayGroupProp.find(x => x.stt === objHobby.group);
                    objGroup.options.push(objNew);
                }
            }

            console.log('arrayGroupProp 2', this.arrayGroupProp);
        },

        handleModalOk(event) {
            // event.preventDefault();
            console.log('handleModalOk', this.formData);

            let dataBuildDone = [];
            for (let i = 0; i < this.arrayGroupProp.length; i++) {
                let objOneGroup = this.arrayGroupProp[i];
                let options = objOneGroup.options;

                let objOneGroupBuild = {
                    stt: i,
                    operator: objOneGroup.operator,
                    options: {
                        demographic_info: [],
                        telecom_info: [],
                        customer_segment: [],
                        hobby: []
                    }
                };

                for (let j = 0; j < options.length; j++) {
                    let objOne = options[j];
                    let objMini = {};

                    if (objOne.custom_type === 1) { // Thông tin nhân khẩu học
                        if (objOne.people_info === 1) {
                            objMini = {
                                full_name: {
                                    type: objOne.people_info_obj.fullname_condition,
                                    name: objOne.people_info_obj.fullname_text
                                }
                            };
                        } else if (objOne.people_info === 2) {
                            objMini = {
                                age: {
                                    operator: objOne.people_info_obj.age_condition,
                                    from: objOne.people_info_obj.age_from,
                                    to: objOne.people_info_obj.age_from
                                }
                            };
                        } else if (objOne.people_info === 3) {
                            objMini = {
                                address: {
                                    city: objOne.people_info_obj.city,
                                    district: objOne.people_info_obj.district
                                }
                            };
                        } else if (objOne.people_info === 4) {
                            objMini = {
                                gender: objOne.people_info_obj.sex
                            };
                        }

                        objMini.stt = j;
                        objMini.group = i;
                        objMini.operator = objOne.operator;

                        objOneGroupBuild.options.demographic_info.push(objMini);

                    } else if (objOne.custom_type === 2) { // Thông tin hành vi viễn thông
                        if (objOne.people_tele === 1) {
                            objMini = {
                                subscriber_type: objOne.people_tele_obj.sub_type
                            };
                        } else if (objOne.people_tele === 2) {
                            objMini = {
                                arpu: {
                                    operator: objOne.people_tele_obj.arpu_condition,
                                    from: objOne.people_tele_obj.arpu_from,
                                    to: objOne.people_tele_obj.arpu_to
                                }
                            };
                        } else if (objOne.people_tele === 3) {
                            objMini = {
                                status: objOne.people_tele_obj.status
                            };
                        } else if (objOne.people_tele === 4) {
                            objMini = {
                                device: objOne.people_tele_obj.device
                            };
                        } else if (objOne.people_tele === 5) {
                            objMini = {
                                service: objOne.people_tele_obj.service
                            };
                        } else if (objOne.people_tele === 6) {
                            objMini = {
                                address_fee: {
                                    city: objOne.people_tele_obj.city,
                                    district: objOne.people_tele_obj.district
                                },
                            };
                        } else if (objOne.people_tele === 7) {
                            objMini = {
                                subscriber_dob: {
                                    operator: objOne.people_tele_obj.age_condition,
                                    from: objOne.people_tele_obj.age_from,
                                    to: objOne.people_tele_obj.age_to
                                }
                            };
                        } else if (objOne.people_tele === 8) {
                            objMini = {
                                card_value: {
                                    operator: objOne.people_tele_obj.card_condition,
                                    from: objOne.people_tele_obj.card_from,
                                    to: objOne.people_tele_obj.card_to
                                }
                            };
                        }

                        objMini.stt = j;
                        objMini.group = i;
                        objMini.operator = objOne.operator;

                        objOneGroupBuild.options.telecom_info.push(objMini);

                    } else if (objOne.custom_type === 3) { // Phân khúc khách hàng
                        objMini = {
                            text_customer: objOne.text_customer
                        };

                        objMini.stt = j;
                        objMini.group = i;
                        objMini.operator = objOne.operator;

                        objOneGroupBuild.options.customer_segment.push(objMini);

                    } else if (objOne.custom_type === 4) { // Hành vi, sở thích
                        if (objOne.people_option_hobby === 1) {
                            objMini = {
                                sport: objOne.people_option_hobby_obj.sport
                            };
                        } else if (objOne.people_option_hobby === 2) {
                            objMini = {
                                movie: objOne.people_option_hobby_obj.movie
                            };
                        } else if (objOne.people_option_hobby === 3) {
                            objMini = {
                                data: objOne.people_option_hobby_obj.data
                            };
                        }

                        objMini.stt = j;
                        objMini.group = i;
                        objMini.operator = objOne.operator;

                        objOneGroupBuild.options.hobby.push(objMini);

                    }
                }

                dataBuildDone.push(objOneGroupBuild);
            }

            this.formData.extra_info.raw_data = JSON.stringify(dataBuildDone);

            console.log('raw_data: ', dataBuildDone);

            this.$emit('handleModalCallback', this.formData);
        },
    }
}
</script>

<style scoped>
</style>

<template>
    <b-modal
        id="MdScriptTestBranchingEvent"
        title="Rẽ nhánh bằng sự kiện đầu vào"
        size="xl"
        @show="handleModalShow"
        @hidden="handleModalHidden"
        @ok="handleModalOk"
    >
        <div class="row">
            <div class="col-12">
                <label class="col-form-label pt-0">Đặt tên cho bước thực hiện</label>
                <input type="text" class="form-control" v-model="formData.title"/>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <label class="col-form-label">Thuộc tính khách hàng</label>
            </div>
            <template v-for="(objGroup, iG) in arrayGroupProp">
                <div class="col-12 mt-2" v-if="iG > 0">
                    <b-form-group>
                        <b-form-radio-group
                            :options="arroptionAndOr"
                            button-variant="outline-success"
                            size="sm"
                            class="check-group mt-2"
                            buttons
                            v-model="objGroup.operator"
                        ></b-form-radio-group>
                    </b-form-group>
                </div>
                <div class="col-12" :key="iG">
                    <fieldset class="border border-light bg-light rounded-3 p-3 mt-2">
                        <template v-for="(objProp, iP) in objGroup['options']">
                            <div :key="iP" class="row mb-2">
                                <div class="col-1 text-center">
                                    <b-form-group v-if="iP > 0">
                                        <b-form-radio-group
                                            :options="arroptionAndOr"
                                            button-variant="outline-primary"
                                            size="sm"
                                            class="check-group"
                                            buttons
                                            v-model="objProp.operator"
                                        ></b-form-radio-group>
                                    </b-form-group>
                                </div>
                                <div class="col d-inline-flex">
                                    <!--cung cap 1-->
                                    <select v-model="objProp.custom_type" class="form-select me-2">
                                        <option :value="-1">Chọn thuộc tính</option>
                                        <option :value="1">Thông tin nhân khẩu học</option>
                                        <option :value="2">Thông tin hành vi viễn thông</option>
                                        <option :value="3">Phân khúc khách hàng</option>
                                        <option :value="4">Hành vi, sở thích</option>
                                    </select>
                                    <select v-if="objProp.custom_type === 1" v-model="objProp.people_info" class="form-select me-2">
                                        <option :value="1">Họ tên</option>
                                        <option :value="2">Tuổi</option>
                                        <option :value="3">Địa chỉ</option>
                                        <option :value="4">Giới tính</option>
                                    </select>
                                    <select v-if="objProp.custom_type === 2" v-model="objProp.people_tele" class="form-select me-2">
                                        <option :value="1">Loại thuê bao</option>
                                        <option :value="2">ARPU</option>
                                        <option :value="3">Trạng thái</option>
                                        <option :value="4">Thiết bị sử dụng</option>
                                        <option :value="5">Dịch vụ đang sử dụng</option>
                                        <option :value="6">Địa chỉ phát sinh cước</option>
                                        <option :value="7">Tuổi thuê bao</option>
                                        <option :value="8">Thẻ nạp mệnh giá</option>
                                    </select>
                                    <input v-if="objProp.custom_type === 3" v-model="objProp.text_customer" type="text" class="form-control me-2"/>
                                    <select v-if="objProp.custom_type === 4" v-model="objProp.people_option_hobby" class="form-select me-2">
                                        <option :value="1">Thể thao</option>
                                        <option :value="2">Phim</option>
                                        <option :value="3">Data</option>
                                    </select>
                                    <template v-if="objProp.custom_type === 1">
                                        <!-- custom_type === 1, di sau cap 2 ho ten-->
                                        <select v-if="objProp.people_info === 1" v-model="objProp.people_info_obj.fullname_condition" class="form-select me-2">
                                            <option :value="1">Bắt đầu</option>
                                            <option :value="2">Kết thúc</option>
                                            <option :value="3">Chứa</option>
                                        </select>
                                        <!-- custom_type === 1, di sau cap 3 ho ten-->
                                        <input v-if="objProp.people_info === 1" v-model="objProp.people_info_obj.fullname_text" type="text" class="form-control me-2"/>
                                        <!--custom_type === 1, di sau cap 2 tuoi-->
                                        <select v-if="objProp.people_info === 2" v-model="objProp.people_info_obj.age_condition" class="form-select me-2">
                                            <option :value="'between'">Trong khoảng</option>
                                            <option :value="'>'">Lớn hơn</option>
                                            <option :value="'<'">Nhỏ hơn</option>
                                            <option :value="'='">Bằng</option>
                                        </select>
                                        <!-- custom_type === 1, di sau cap 3 tuoi-->
                                        <template v-if="objProp.people_info === 2">
                                            <input v-model="objProp.people_info_obj.age_from" type="text" class="form-control me-2"/>
                                            <input v-if="objProp.people_info_obj.age_condition === 'between'" v-model="objProp.people_info_obj.age_to" type="text" class="form-control me-2"/>
                                        </template>
                                        <!--custom_type === 1, di sau cap 2 dia chi-->
                                        <select v-if="objProp.people_info === 3" v-model="objProp.people_info_obj.city" @change="handleGetDistrict(objProp.people_info_obj)" class="form-select me-2">
                                            <option :value="-1">Tỉnh/TP</option>
                                            <option v-for="(city, index) in arrCityData" :value="city.id" :key="index">
                                                {{ city.name }}
                                            </option>
                                        </select>
                                        <select v-if="objProp.people_info === 3" v-model="objProp.people_info_obj.district" class="form-select me-2">
                                            <option :value="-1">Quận/Huyện</option>
                                            <option v-for="(district, index) in objProp.people_info_obj.arr_district" :value="district.id" :key="index">
                                                {{ district.name }}
                                            </option>
                                        </select>
                                        <!--custom_type === 1, di sau cap 2 gioi tinh-->
                                        <select v-if="objProp.people_info === 4" v-model="objProp.people_info_obj.sex" class="form-select me-2">
                                            <option :value="0">Nam</option>
                                            <option :value="1">Nữ</option>
                                            <option :value="2">Không xác định</option>
                                        </select>
                                    </template>
                                    <template v-if="objProp.custom_type === 2">
                                        <!--custom_type === 2, di sau cap 2 loai thue bao-->
                                        <select v-if="objProp.people_tele === 1" v-model="objProp.people_tele_obj.sub_type" class="form-select me-2">
                                            <option :value="1">Trả trước</option>
                                            <option :value="2">Trả sau</option>
                                        </select>
                                        <!--custom_type === 2, di sau cap 2 ARPU-->
                                        <select v-if="objProp.people_tele === 2" v-model="objProp.people_tele_obj.arpu_condition" class="form-select me-2">
                                            <option :value="'between'">Trong khoảng</option>
                                            <option :value="'>'">Lớn hơn</option>
                                            <option :value="'<'">Nhỏ hơn</option>
                                            <option :value="'='">Bằng</option>
                                        </select>
                                        <!-- custom_type === 2, di sau cap 3 ARPU-->
                                        <template v-if="objProp.people_tele === 2">
                                            <input v-model="objProp.people_tele_obj.arpu_from" type="text" class="form-control me-2"/>
                                            <input v-if="objProp.people_tele_obj.arpu_condition === 'between'" v-model="objProp.people_tele_obj.arpu_to" type="text" class="form-control me-2"/>
                                        </template>
                                        <!--custom_type === 2, di sau cap 2 trang thai-->
                                        <select v-if="objProp.people_tele === 3" v-model="objProp.people_tele_obj.status" class="form-select me-2">
                                            <option :value="1">Hoạt động</option>
                                            <option :value="2">Không hoạt động</option>
                                        </select>
                                        <!--custom_type === 2, di sau cap 2 thiet bi su dung-->
                                        <select v-if="objProp.people_tele === 4" v-model="objProp.people_tele_obj.device" class="form-select me-2">
                                            <option :value="0">Smartphone</option>
                                            <option :value="1">Feature phone</option>
                                        </select>
                                        <!--custom_type === 2, di sau cap 2 dich vu dang su dung-->
                                        <input v-if="objProp.people_tele === 5" v-model="objProp.people_tele_obj.service" type="text" class="form-control me-2"/>
                                        <!--custom_type === 2, di sau cap 2 dia chi phat sinh cuoc-->
                                        <select v-if="objProp.people_tele === 6" v-model="objProp.people_tele_obj.city" @change="handleGetDistrict(objProp.people_tele_obj)" class="form-select me-2">
                                            <option :value="-1">Tỉnh/TP</option>
                                            <option v-for="(city, index) in arrCityData" :value="city.id" :key="index">
                                                {{ city.name }}
                                            </option>
                                        </select>
                                        <select v-if="objProp.people_tele === 6" v-model="objProp.people_tele_obj.district" class="form-select me-2">
                                            <option :value="-1">Quận/Huyện</option>
                                            <option v-for="(district, index) in objProp.people_tele_obj.arr_district" :value="district.id" :key="index">
                                                {{ district.name }}
                                            </option>
                                        </select>
                                        <!--custom_type === 2, di sau cap 2 tuoi thue bao-->
                                        <select v-if="objProp.people_tele === 7" v-model="objProp.people_tele_obj.age_condition" class="form-select me-2">
                                            <option :value="'between'">Trong khoảng</option>
                                            <option :value="'>'">Lớn hơn</option>
                                            <option :value="'<'">Nhỏ hơn</option>
                                            <option :value="'='">Bằng</option>
                                        </select>
                                        <!-- custom_type === 2, di sau cap 3 ARPU-->
                                        <template v-if="objProp.people_tele === 7">
                                            <input v-model="objProp.people_tele_obj.age_from" type="text" class="form-control me-2"/>
                                            <input v-if="objProp.people_tele_obj.age_condition === 'between'" v-model="objProp.people_tele_obj.age_to" type="text" class="form-control me-2"/>
                                        </template>
                                        <!--custom_type === 2, di sau cap 2 the nap menh gia-->
                                        <select v-if="objProp.people_tele === 8" v-model="objProp.people_tele_obj.card_condition" class="form-select me-2">
                                            <option :value="'between'">Trong khoảng</option>
                                            <option :value="'>'">Lớn hơn</option>
                                            <option :value="'<'">Nhỏ hơn</option>
                                            <option :value="'='">Bằng</option>
                                        </select>
                                        <template v-if="objProp.people_tele === 8">
                                            <input v-model="objProp.people_tele_obj.card_from" type="text" class="form-control me-2"/>
                                            <input v-if="objProp.people_tele_obj.card_condition === 'between'" v-model="objProp.people_tele_obj.card_to" type="text" class="form-control me-2"/>
                                        </template>
                                    </template>
                                    <template v-if="objProp.custom_type === 4">
                                        <!--custom_type === 4, di sau cap 2 the thao-->
                                        <input v-if="objProp.people_option_hobby === 1" v-model="objProp.people_option_hobby_obj.sport" type="text" class="form-control me-2"/>
                                        <!--custom_type === 4, di sau cap 2 phim-->
                                        <input v-if="objProp.people_option_hobby === 2" v-model="objProp.people_option_hobby_obj.movie" type="text" class="form-control me-2"/>
                                        <!--custom_type === 4, di sau cap 2 data-->
                                        <input v-if="objProp.people_option_hobby === 3" v-model="objProp.people_option_hobby_obj.data" type="text" class="form-control me-2"/>
                                    </template>
                                </div>
                                <div class="col-auto text-end">
                                    <button type="button" class="btn btn-outline-danger" @click="handleAddProp(iG)" :disabled="iP === 0">
                                        <i class="uil uil-minus"></i>
                                    </button>
                                    <button type="button" class="btn btn-outline-primary" @click="handleAddProp(iG)">
                                        <i class="uil uil-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </template>
                    </fieldset>
                </div>
            </template>
            <div class="row">
                <div class="col-12 pt-3">
                    <button
                        type="button"
                        class="btn btn-sm btn-outline-primary"
                        @click="handleAddGroupProp"
                    >
                        <i class="uil uil-plus me-2"></i> Thêm nhóm thuộc tính
                    </button>
                </div>
            </div>
        </div>
    </b-modal>
</template>
