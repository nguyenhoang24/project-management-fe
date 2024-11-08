<script>
import Multiselect from 'vue-multiselect';
import "vue-multiselect/dist/vue-multiselect.min.css";
import Swal from "sweetalert2";
import {mapActions} from "vuex";

export default {
    name: "MdAddSegment",
    components: {
        Multiselect
    },
    props: {
        isEditModalField: {
            type: Boolean,
            default: false
        },
        titleModal: {
            type: String,
            default: 'Tạo Segment'
        },
        mainConditionType: {
            type: Number,
            default: -1
        },
        typeSegment: {
            type: Number,
            default: 1
        },
        idSegment: {
            type: Number,
            default: 0
        },
        idCityTele: {
            type: Number,
            default: 0
        },
        idCityInfo: {
            type: Number,
            default: 0
        },
        createSegmentWeb: {
            type: Object,
            default: null
        },
        andChecked: {
            type: Boolean,
            default: false
        },
        orChecked: {
            type: Boolean,
            default: false
        },
        filesValue: {
            type: Array,
            default: []
        },
        filesOptions: {
            type: Array,
            default: []
        },
        segmentsValue: {
            type: Array,
            default: []
        },
        segmentsOptions: {
            type: Array,
            default: []
        },
    },
    data() {
        return {
            objGetListSegment: {
                id: 0
            },
            objGetContact: {
                conditionSearch: "",
                valueSearch: ""
            },
            createSegment: {
                name: '',
                operator: '',
                subscribers: [],
                segment: [],
                arrayOption: [],
                note: '',
                type: -1
            },
            dataCities: [],
            dataDistrict: [],
            dataDistrictTele: [],
            checkInfoName: '',
            checkCondition: -1,
            checkConditionInfo: -1,
            checkConditionTele: -1,
            checkConditionHobby: -1,
            checkNullCity: -1,
            checkAddress: -1,
            checkNullCityTele: -1,
            checkAddressTele: -1,
            checkSegment: -1,
            submitted: false,
        }
    },
    directives: {
        'only-numeric': {
            bind(el, binding, vnode) {
                el.addEventListener('input', function () {
                    this.value = this.value.replace(/[^0-9]/g, '');
                });
            }
        },
    },
    mounted() {
        this.handleGetCities();
    },
    methods: {
        ...mapActions('contacts', {
            apiGetListSegment: 'apiGetListSegment',
            apiGetListContact: 'apiGetListContact',
            apiAddSegment: 'apiAddSegment',
            apiGetSegment: 'apiGetSegment',
            apiEditSegment: 'apiEditSegment',
            apiGetListCities: 'apiGetListCities',
            apiGetListDistrict: 'apiGetListDistrict',
            apiGetTotalContact: 'apiGetTotalContact',
        }),
        handleGetCities() {
            this.apiGetListCities()
                .then(response => {
                    if (response.err_code === 0) {
                        this.dataCities = response.data
                    }
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                })
        },
        handleGetDistrict(obj) {
            console.log(obj)
            this.apiGetListDistrict({
                citieId: obj.city
            }).then(response => {
                if (response.err_code === 0) {
                    obj.arrDistrict = response.data
                }
            }).catch(err => {
                console.log(err)
            }).finally(() => {
            })
        },
        handleGetDistrictTele(id) {
            this.apiGetListDistrict({
                citieId: id
            })
                .then(response => {
                    if (response.err_code === 0) {
                        this.dataDistrictTele = response.data
                    }
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                })
        },
        handleGetListSegment() {
            this.apiGetListSegment(this.objGetListSegment)
                .then(response => {
                    if (response.err_code === 0) {
                        this.segmentsOptions = response.data
                    }
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                })
        },
        handleGetListContact() {
            this.apiGetListContact(this.objGetContact)
                .then(response => {
                    if (response.err_code === 0) {
                        this.filesOptions = response.data;
                    }
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                })
        },
        addSegment() {
        },
        estimateDataSize() {
            if (this.filesValue.length === 0 && this.segmentsValue.length === 0) {
                Swal.fire('Số lượng tập thuê bao là 0')
                return;
            }
            this.apiGetTotalContact({
                contactGroup: this.filesValue.map(item => item.id).join(','),
                segments: this.segmentsValue.map(item => item.id).join(',')
            }).then(response => {
                if (response.err_code === 0) {
                    let totalContact = response.data.totalContact
                    Swal.fire(`Số lượng tập thuê bao là ${totalContact}`)
                } else {
                    this.commonWarningVue(response.err_message);
                }
            }).catch(err => {
                console.log(err)
            }).finally(() => {
            })
        },
        onChangeCustomPro(index, indexArr) {

            let obj = this.createSegmentWeb.arrayOption[indexArr].options.listConditions.at(index);
            obj.peopleTele = -1;
            obj.peopleInfo = -1;
            obj.peopleHobby = -1;
            obj.peopleSegment = -1;
            this.checkAddress = -1;
            this.checkAddressTele = -1;
            this.checkCondition = obj.customType;

            this.typeOperator = obj.conditionType;

            if (this.typeOperator === 1 && index > 0) {
                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createDemographicInfo.objFullName.fullName.operator = 'and';

                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createDemographicInfo.dob.operator = 'and';

                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createDemographicInfo.gender1.operator = 'and';

                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createDemographicInfo.address1.operator = 'and';

                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createdTelecomInfo.cardValue.operator = 'and';
                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createdTelecomInfo.addressFee.operator = 'and';
                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createdTelecomInfo.arpuObj.operator = 'and';
                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createdTelecomInfo.serviceObj.operator = 'and';
                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createdTelecomInfo.deviceObj.operator = 'and';
                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createdTelecomInfo.statusObj.operator = 'and';
                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createdTelecomInfo.subscriberDob.operator = 'and';
                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createdTelecomInfo.subType.operator = 'and';

                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createdCustomerSegment.textCustomer.operator = 'and';

                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createHobby.dataObj.operator = 'and';
                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createHobby.movieObj.operator = 'and';
                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createHobby.sportObj.operator = 'and';

            } else if (this.typeOperator === 2 && index > 0) {
                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createDemographicInfo.objFullName.fullName.operator = 'or';

                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createDemographicInfo.dob.operator = 'or';

                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createDemographicInfo.gender1.operator = 'or';

                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createDemographicInfo.address1.operator = 'or';

                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createdTelecomInfo.cardValue.operator = 'or';
                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createdTelecomInfo.addressFee.operator = 'or';
                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createdTelecomInfo.arpuObj.operator = 'or';
                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createdTelecomInfo.serviceObj.operator = 'or';
                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createdTelecomInfo.deviceObj.operator = 'or';
                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createdTelecomInfo.statusObj.operator = 'or';
                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createdTelecomInfo.subscriberDob.operator = 'or';
                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createdTelecomInfo.subType.operator = 'or';

                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createdCustomerSegment.textCustomer.operator = 'or';

                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createHobby.dataObj.operator = 'or';
                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createHobby.movieObj.operator = 'or';
                this.createSegmentWeb.arrayOption[indexArr].options.listConditions[index].createHobby.sportObj.operator = 'or';
            }
        },
        onChangeInfo(indexArr, index) {
            let obj = this.createSegmentWeb.arrayOption[indexArr].options.listConditions.at(index);
            console.log('obj: ', obj);

            this.checkConditionInfo = obj.peopleInfo;
        },
        onChangeTele(indexArr, index) {
            let obj = this.createSegmentWeb.arrayOption[indexArr].options.listConditions.at(index);

            this.checkConditionTele = obj.peopleTele;
        },
        onChangeHobby(indexArr, index) {
            let obj = this.createSegmentWeb.arrayOption[indexArr].options.listConditions.at(index);

            this.checkConditionHobby = obj.peopleHobby;
        },
        handleCondition(type) {
            if (type === 1) {
                this.mainConditionType = 1;
                this.createSegmentWeb.operator = 'and';
                this.disableAdd = false;
            } else {
                this.mainConditionType = 2;
                this.createSegmentWeb.operator = 'or';
                this.disableAdd = false;
            }
        },
        onChangeCities(obj, indexArr, index) {
            let objCon = this.createSegmentWeb.arrayOption[indexArr].options.listConditions.at(index);
            if (objCon.peopleInfo === 3) {

                if (objCon.createDemographicInfo.address1.address.city === -1) {
                    this.checkNullCity = -1;
                } else {
                    this.checkNullCity = 1;
                }
            } else if (objCon.peopleTele === 6) {
                if (objCon.createdTelecomInfo.addressFee.address_fee.city === -1) {
                    this.checkNullCityTele = -1;
                } else {
                    this.checkNullCityTele = 1;
                }
            }

            this.handleGetDistrict(obj);
        },
        onChangeSegment(event) {
            this.checkSegment = event.target.value;
        },
        addCondition(type, indexArr) {
            this.checkCondition = -1;
            this.checkConditionInfo = -1;
            this.checkConditionTele = -1;
            this.checkConditionHobby = -1;
            this.createSegmentWeb.arrayOption[indexArr].options.listConditions.push({
                conditionType: type,
                customType: -1,
                peopleInfo: -1,
                peopleTele: -1,
                peopleSegment: '',
                peopleHobby: -1,
                peopleOptionHobby: '',
                peopleInfoAgeTitle: -1,
                peopleInfoAgeValue: 0,
                peopleInfoSex: -1,
                peopleInfoName: -1,
                peopleTeleArpuTitle: -1,
                peopleTeleAgeTitle: -1,
                peopleTeleCardTitle: -1,
                peopleTeleDeviceTitle: -1,
                createDemographicInfo: {
                    objFullName: {
                        fullName: {
                            name: '',
                            type: 1,
                        },
                        operator: "",
                    },
                    dob: {
                        operator: "",
                        age: {
                            operator: "between",
                            from: '',
                            to: ''
                        },
                    },
                    address1: {
                        operator: '',
                        address: {
                            arrDistrict: [],
                            city: -1,
                            district: -1
                        },
                    },
                    gender1: {
                        operator: '',
                        gender: 0,
                    },
                },
                createdTelecomInfo: {
                    subType: {
                        operator: '',
                        subscriber_type: 1,
                    },
                    arpuObj: {
                        operator: '',
                        arpu: {
                            operator: "between",
                            from: '',
                            to: ''
                        },
                    },
                    statusObj: {
                        operator: '',
                        status: 1,
                    },
                    deviceObj: {
                        operator: '',
                        device: 0,
                    },
                    serviceObj: {
                        operator: '',
                        service: "",
                    },
                    addressFee: {
                        operator: '',
                        address_fee: {
                            arrDistrict: [],
                            city: -1,
                            district: -1
                        },
                    },
                    subscriberDob: {
                        operator: '',
                        subscriber_dob: {
                            operator: "between",
                            from: '',
                            to: ''
                        },
                    },
                    cardValue: {
                        operator: '',
                        card_value: {
                            operator: "between",
                            from: '',
                            to: ''
                        },
                    }
                },
                createdCustomerSegment: {
                    textCustomer: {
                        operator: '',
                        text_customer: '',
                    }
                },
                createHobby: {
                    sportObj: {
                        operator: "",
                        sport: "",
                    },
                    movieObj: {
                        operator: '',
                        movie: "",
                    },
                    dataObj: {
                        operator: '',
                        data: '',
                    }
                },
            });
        },
        addArrCondition(type) {
            this.checkCondition = -1;
            this.checkConditionInfo = -1;
            this.checkConditionTele = -1;
            this.checkConditionHobby = -1;
            this.createSegmentWeb.arrayOption.push({
                conditionArrType: type,
                options: {
                    listConditions: [
                        {
                            conditionType: 0,
                            customType: -1,
                            peopleInfo: -1,
                            peopleTele: -1,
                            peopleSegment: '',
                            peopleHobby: -1,
                            peopleOptionHobby: '',
                            peopleInfoAgeTitle: -1,
                            peopleInfoAgeValue: 0,
                            peopleInfoSex: -1,
                            peopleInfoName: -1,
                            peopleTeleArpuTitle: -1,
                            peopleTeleAgeTitle: -1,
                            peopleTeleCardTitle: -1,
                            peopleTeleDeviceTitle: -1,
                            createDemographicInfo: {
                                objFullName: {
                                    fullName: {
                                        name: '',
                                        type: 1,
                                    },
                                    operator: "",
                                },
                                dob: {
                                    operator: "",
                                    age: {
                                        operator: "between",
                                        from: '',
                                        to: ''
                                    },
                                },
                                address1: {
                                    operator: '',
                                    address: {
                                        arrDistrict: [],
                                        city: -1,
                                        district: -1
                                    },
                                },
                                gender1: {
                                    operator: '',
                                    gender: 0,
                                },
                            },
                            createdTelecomInfo: {
                                subType: {
                                    operator: '',
                                    subscriber_type: 1,
                                },
                                arpuObj: {
                                    operator: '',
                                    arpu: {
                                        operator: "between",
                                        from: '',
                                        to: ''
                                    },
                                },
                                statusObj: {
                                    operator: '',
                                    status: 1,
                                },
                                deviceObj: {
                                    operator: '',
                                    device: 0,
                                },
                                serviceObj: {
                                    operator: '',
                                    service: "",
                                },
                                addressFee: {
                                    operator: '',
                                    address_fee: {
                                        arrDistrict: [],
                                        city: -1,
                                        district: -1
                                    },
                                },
                                subscriberDob: {
                                    operator: '',
                                    subscriber_dob: {
                                        operator: "between",
                                        from: '',
                                        to: ''
                                    },
                                },
                                cardValue: {
                                    operator: '',
                                    card_value: {
                                        operator: "between",
                                        from: '',
                                        to: ''
                                    },
                                }
                            },
                            createdCustomerSegment: {
                                textCustomer: {
                                    operator: '',
                                    text_customer: '',
                                }
                            },
                            createHobby: {
                                sportObj: {
                                    operator: "",
                                    sport: "",
                                },
                                movieObj: {
                                    operator: '',
                                    movie: "",
                                },
                                dataObj: {
                                    operator: '',
                                    data: '',
                                }
                            },
                        }
                    ]
                }
            });
        },
        closeModalAddSegment() {
            this.resetModal();
            this.$bvModal.hide('modal-add-segment');
        },
        removeCondition(index, indexArr) {
            this.createSegmentWeb.arrayOption[indexArr].options.listConditions.splice(index, 1);
        },
        removeArrCondition(indexArr) {
            this.createSegmentWeb.arrayOption.splice(indexArr, 1);
        },
        openModal() {
            if (this.typeSegment === 1) {
                this.createSegment.name = '';
                this.createSegment.operator = '';
                this.createSegment.segment = [];
                this.createSegment.subscribers = [];
                this.createSegment.arrayOption = [];
                this.mainConditionType = -1;
                this.checkCondition = -1;
                this.checkConditionInfo = -1;
                this.checkConditionTele = -1;
                this.checkConditionHobby = -1;
                this.checkNullCity = -1;
                this.checkNullCityTele = -1;
                this.checkSegment = -1;
            } else {
                this.checkCondition = 1;
                this.checkConditionInfo = 1;
                this.checkConditionTele = 1;
                this.checkConditionHobby = 1;
                this.checkNullCity = 1;
                this.checkNullCityTele = 1;
                this.checkSegment = 1;
            }
        },
        resetModal() {
            this.createSegmentWeb.name = '';
            this.createSegmentWeb.segment = [];
            this.createSegmentWeb.subscribers = [];
            this.createSegmentWeb.operator = '';
            this.createSegmentWeb.arrayOption = [];
            this.createSegmentWeb.note = '';
            this.createSegment.name = '';
            this.createSegment.segment = [];
            this.createSegment.subscribers = [];
            this.createSegment.operator = '';
            this.createSegment.note = '';
            this.createSegment.arrayOption = [];
            this.andChecked = false;
            this.orChecked = false;
            this.mainConditionType = -1;
            this.checkCondition = -1;
            this.checkConditionInfo = -1;
            this.checkConditionTele = -1;
            this.checkConditionHobby = -1;
            this.checkNullCity = -1;
            this.checkNullCityTele = -1;
            this.checkSegment = -1;
        },
        formSubmit(e) {
            console.log('start')
            if (this.createSegmentWeb.name.trim() === '') {
                this.commonNotifyVue("Vui lòng nhập tên Segment", 'warn');
                return;
            }

            if (this.mainConditionType === 1 || this.mainConditionType === 2) {
                if (this.filesValue.length === 0) {
                    this.commonNotifyVue("Vui lòng chọn tập thuê bao", 'warn');
                    return;
                } else if (this.segmentsValue.length === 0) {
                    this.commonNotifyVue("Vui lòng chọn Segment", 'warn');
                    return;
                }
            }

            if (this.checkSegment === -1) {
                this.commonNotifyVue("Vui lòng chọn phân khúc Segment", 'warn');
                return;
            }
            if (this.checkCondition === -1) {
                this.commonNotifyVue("Vui lòng chọn thuộc tính khách hàng", 'warn');
                return;
            }
            // if (this.checkCondition === 1 && this.checkConditionInfo === -1) {
            //     this.commonNotifyVue("Thông tin nhân khẩu học không được để trống", 'warn');
            //     return;
            // }
            // if (this.checkCondition === 2 && this.checkConditionTele === -1) {
            //     this.commonNotifyVue("Thông tin hành vi viễn thông không được để trống", 'warn');
            //     return;
            // }
            // if (this.checkCondition === 4 && this.checkConditionHobby === -1) {
            //     this.commonNotifyVue("Hành vi, sở thích không được để trống", 'warn');
            //     return;
            // }
            // if (this.checkConditionInfo === 3 && this.checkNullCity === -1) {
            //     this.commonNotifyVue("Địa chỉ không được để trống", 'warn');
            //     return;
            // }
            // if (this.checkConditionTele === 6 && this.checkNullCityTele === -1) {
            //     this.commonNotifyVue("Địa chỉ không được để trống", 'warn');
            //     return;
            // }
            //
            // if ((parseInt(this.checkCondition) === 1 && parseInt(this.checkInfo) === -1) || (parseInt(this.checkInfo) !== -1 && (parseInt(this.checkConditionInfo) === -1) || this.checkConditionInfo === undefined)) {
            //     this.commonNotifyVue("Thông tin nhân khẩu học không được để trống", 'warn');
            //     return;
            // }
            // if ((parseInt(this.checkCondition) === 2 && parseInt(this.checkTele) === -1) || (parseInt(this.checkTele) !== -1 && (parseInt(this.checkConditionTele) === -1) || this.checkConditionTele === undefined)) {
            //     this.commonNotifyVue("Thông tin hành vi viễn thông không được để trống", 'warn');
            //     return;
            // }

            console.log('end');

            let isValid = true;

            console.log(isValid);

            console.log('Form submitted');

            this.createSegmentWeb.arrayOption.forEach(itemArr => {
                let objClone = Object.assign({}, {
                    operator: '',
                    options: {
                        demographic_info: [],
                        telecom_info: [],
                        customer_segment: [],
                        hobby: []
                    }
                });
                itemArr.options.listConditions.forEach(itemCon => {
                    if (itemArr.conditionArrType === 0) {
                        objClone.operator = ''
                        if (itemCon.peopleInfo === 1) {
                            objClone.options.demographic_info.push(itemCon.createDemographicInfo.objFullName)
                        } else if (itemCon.peopleInfo === 2) {
                            objClone.options.demographic_info.push(itemCon.createDemographicInfo.dob)
                        } else if (itemCon.peopleInfo === 3) {
                            objClone.options.demographic_info.push(itemCon.createDemographicInfo.address1)
                        } else if (itemCon.peopleInfo === 4) {
                            objClone.options.demographic_info.push(itemCon.createDemographicInfo.gender1)
                        } else if (itemCon.peopleTele === 1) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.subType)
                        } else if (itemCon.peopleTele === 2) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.arpuObj)
                        } else if (itemCon.peopleTele === 3) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.statusObj)
                        } else if (itemCon.peopleTele === 4) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.deviceObj)
                        } else if (itemCon.peopleTele === 5) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.serviceObj)
                        } else if (itemCon.peopleTele === 6) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.addressFee)
                        } else if (itemCon.peopleTele === 7) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.subscriberDob)
                        } else if (itemCon.peopleTele === 8) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.cardValue)
                        } else if (itemCon.customType === 3) {
                            objClone.options.customer_segment.push(itemCon.createdCustomerSegment.textCustomer)
                        } else if (itemCon.peopleHobby === 1) {
                            objClone.options.hobby.push(itemCon.createHobby.sportObj)
                        } else if (itemCon.peopleHobby === 2) {
                            objClone.options.hobby.push(itemCon.createHobby.movieObj)
                        } else if (itemCon.peopleHobby === 3) {
                            objClone.options.hobby.push(itemCon.createHobby.dataObj)
                        }
                    } else if (itemArr.conditionArrType === 1) {
                        objClone.operator = 'and';
                        if (itemCon.peopleInfo === 1) {
                            objClone.options.demographic_info.push(itemCon.createDemographicInfo.objFullName)
                        } else if (itemCon.peopleInfo === 2) {
                            objClone.options.demographic_info.push(itemCon.createDemographicInfo.dob)
                        } else if (itemCon.peopleInfo === 3) {
                            objClone.options.demographic_info.push(itemCon.createDemographicInfo.address1)
                        } else if (itemCon.peopleInfo === 4) {
                            objClone.options.demographic_info.push(itemCon.createDemographicInfo.gender1)
                        } else if (itemCon.peopleTele === 1) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.subType)
                        } else if (itemCon.peopleTele === 2) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.arpuObj)
                        } else if (itemCon.peopleTele === 3) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.statusObj)
                        } else if (itemCon.peopleTele === 4) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.deviceObj)
                        } else if (itemCon.peopleTele === 5) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.serviceObj)
                        } else if (itemCon.peopleTele === 6) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.addressFee)
                        } else if (itemCon.peopleTele === 7) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.subscriberDob)
                        } else if (itemCon.peopleTele === 8) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.cardValue)
                        } else if (itemCon.customType === 3) {
                            objClone.options.customer_segment.push(itemCon.createdCustomerSegment.textCustomer)
                        } else if (itemCon.peopleHobby === 1) {
                            objClone.options.hobby.push(itemCon.createHobby.sportObj)
                        } else if (itemCon.peopleHobby === 2) {
                            objClone.options.hobby.push(itemCon.createHobby.movieObj)
                        } else if (itemCon.peopleHobby === 3) {
                            objClone.options.hobby.push(itemCon.createHobby.dataObj)
                        }
                    } else if (itemArr.conditionArrType === 2) {
                        objClone.operator = 'or';
                        if (itemCon.peopleInfo === 1) {
                            objClone.options.demographic_info.push(itemCon.createDemographicInfo.objFullName)
                        } else if (itemCon.peopleInfo === 2) {
                            objClone.options.demographic_info.push(itemCon.createDemographicInfo.dob)
                        } else if (itemCon.peopleInfo === 3) {
                            objClone.options.demographic_info.push(itemCon.createDemographicInfo.address1)
                        } else if (itemCon.peopleInfo === 4) {
                            objClone.options.demographic_info.push(itemCon.createDemographicInfo.gender1)
                        } else if (itemCon.peopleTele === 1) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.subType)
                        } else if (itemCon.peopleTele === 2) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.arpuObj)
                        } else if (itemCon.peopleTele === 3) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.statusObj)
                        } else if (itemCon.peopleTele === 4) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.deviceObj)
                        } else if (itemCon.peopleTele === 5) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.serviceObj)
                        } else if (itemCon.peopleTele === 6) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.addressFee)
                        } else if (itemCon.peopleTele === 7) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.subscriberDob)
                        } else if (itemCon.peopleTele === 8) {
                            objClone.options.telecom_info.push(itemCon.createdTelecomInfo.cardValue)
                        } else if (itemCon.customType === 3) {
                            objClone.options.customer_segment.push(itemCon.createdCustomerSegment.textCustomer)
                        } else if (itemCon.peopleHobby === 1) {
                            objClone.options.hobby.push(itemCon.createHobby.sportObj)
                        } else if (itemCon.peopleHobby === 2) {
                            objClone.options.hobby.push(itemCon.createHobby.movieObj)
                        } else if (itemCon.peopleHobby === 3) {
                            objClone.options.hobby.push(itemCon.createHobby.dataObj)
                        }
                    }
                });
                this.createSegment.arrayOption.push(objClone);
            });

            let arrContactGroup = this.filesValue.map(item => item.id).join(',');
            let arrSegment = this.segmentsValue.map(item => item.id).join(',');
            this.createSegment.subscribers = this.filesValue.map(item => item.id);
            this.createSegment.segment = this.segmentsValue.map(item => item.id);
            this.createSegment.name = this.createSegmentWeb.name;
            this.createSegment.operator = this.createSegmentWeb.operator;
            this.createSegment.note = this.createSegmentWeb.note;
            this.createSegmentWeb.subscribers = this.filesValue.map(item => item.id);
            this.createSegmentWeb.segment = this.segmentsValue.map(item => item.id);

            let objRawData = {
                name: this.createSegmentWeb.name,
                contactGroup: arrContactGroup,
                segments: arrSegment,
                rawData: this.createSegment,
                rawDataView: this.createSegmentWeb
            }
            let objEditRawData = {
                id: this.idSegment,
                name: this.createSegmentWeb.name,
                contactGroup: arrContactGroup,
                segments: arrSegment,
                rawData: this.createSegment,
                rawDataView: this.createSegmentWeb
            }

            if (this.typeSegment === 1) {
                this.apiAddSegment(objRawData)
                    .then(response => {
                        console.log('apiAddSegment', typeof response);
                        if (response.err_code === 0) {
                            this.$bvModal.hide('modal-add-segment');
                            Swal.fire("", response.err_message, "success");
                            this.$emit('handleGetSegment');
                        } else {
                            Swal.fire("", response.err_message, "warning");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .finally(() => {
                        // this.commonLoadingPage(false);
                    });
            } else {
                console.log(this.idSegment)

                this.apiEditSegment(objEditRawData).then(response => {
                    console.log(response);
                    if (response.err_code === 0) {
                        this.$bvModal.hide('modal-add-segment');
                        Swal.fire("", response.err_message, "success");
                        this.$emit('handleGetSegment');
                    } else {
                        Swal.fire("", response.err_message, "warning");
                    }
                }).catch(err => {
                    console.log(err)
                }).finally(() => {
                    // this.commonLoadingPage(true);
                })
            }
        },
    },
}
</script>

<template>
    <b-modal id="modal-add-segment" size="xl" :title="titleModal" title-class="font-18" @show="openModal" @hidden="resetModal" hide-footer>
        <div class="card">
            <div class="card-body">

                <div class="row mb-3">
                    <div class="col-6">
                        <label>Tên Segment</label>
                        <input :disabled="isEditModalField" type="text" class="form-control" v-model="createSegmentWeb.name"/>
                    </div>
                    <div class="col-6">
                        <label>Phân khúc segment</label>
                        <select :disabled="isEditModalField" v-model="createSegmentWeb.type" class="form-select" @change="onChangeSegment">
                            <option :value="-1">Chọn thuộc tính</option>
                            <option :value="0">Phân khúc ít biến động</option>
                            <option :value="1">Phân khúc tổng hợp</option>
                        </select>
                    </div>
                </div>
                <div class="card">
                    <form class="needs-validation" @submit.prevent="formSubmit">
                        <div class="card-header">
                            <label>
                                Điều kiện kết hợp:
                            </label>
                            <div class="form-check form-check-inline">
                                <input :disabled="isEditModalField" class="form-check-input" name="conditionType" @click="handleCondition(1)" type="radio" id="conditionAnd" value="option1" :checked="andChecked">
                                <label class="form-check-label" for="conditionAnd">AND</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input :disabled="isEditModalField" class="form-check-input" name="conditionType" @click="handleCondition(2)" type="radio" id="conditionOr" value="option1" :checked="orChecked">
                                <label class="form-check-label" for="conditionOr">OR</label>
                            </div>
                        </div>
                        <div class="card-body">

                            <div class="row col-12 mb-3">
                                <div class="col-1">
                                </div>
                                <div class="col-11">
                                    <label>Tập thuê bao
                                    </label>
                                    <multiselect :disabled="isEditModalField" v-model="filesValue" :options="filesOptions" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn tập TB" label="name" track-by="name"
                                                 :preselect-first="false">

                                    </multiselect>
                                </div>
                            </div>
                            <div class="row col-12 mb-3">
                                <div class="col-1">
                                    <label v-if="mainConditionType===1">AND</label>
                                    <label v-if="mainConditionType===2">OR</label>
                                </div>
                                <div class="col-11">
                                    <label>Segment đã có
                                    </label>
                                    <multiselect :disabled="isEditModalField" v-model="segmentsValue" :options="segmentsOptions" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Chọn Segment" label="name" track-by="name"
                                                 :preselect-first="false">

                                    </multiselect>
                                </div>
                            </div>
                            <div class="row col-12 mb-3">
                                <div class="col-1">
                                    <label v-if="mainConditionType===1">AND</label>
                                    <label v-if="mainConditionType===2">OR</label>
                                </div>
                                <div class="col-11">
                                    <div class="card">
                                        <div class="card-header">
                                            <label>Thuộc tính KH
                                            </label>
                                        </div>
                                        <div class="card-body">
                                            <div v-for="(arrConditions,indexArr) in createSegmentWeb.arrayOption" :key="indexArr" class="mb-3" :class="indexArr>0 ? 'border-condition-1' : 'border-condition'">
                                                <label class="btnCondition" v-if="arrConditions.conditionArrType === 1">AND</label>
                                                <label class="btnCondition" v-if="arrConditions.conditionArrType === 2">OR</label>
                                                <i class="uil uil-multiply float-end font-size-18 cursor-pointer" v-if="indexArr>0" :class="isEditModalField ? 'd-none' : ''" @click="removeArrCondition(indexArr)"></i>
                                                <div v-for="(condition,index) in arrConditions.options.listConditions" :key="index" class="row mb-3" :class="indexArr>0 && index ===0 ? 'mgt-28' : ''">
                                                    <div class="col-1">
                                                        <label v-if="condition.conditionType===1">AND</label>
                                                        <label v-if="condition.conditionType===2">OR</label>
                                                    </div>
                                                    <!--                        <div class="col-2">-->
                                                    <!--                            <select :disabled="isEditModalField" class="form-select" v-model="condition.proType">-->
                                                    <!--                                <option value="-1">Chọn tiêu chí</option>-->
                                                    <!--                                <option value="1">Tập thuê bao</option>-->
                                                    <!--                                <option value="2">Tập Segment</option>-->
                                                    <!--                                <option value="3">Thuộc tính KH</option>-->
                                                    <!--                            </select>-->
                                                    <!--                        </div>-->
                                                    <div class="col-3">
                                                        <select :disabled="isEditModalField" v-model="condition.customType" @change="onChangeCustomPro(index,indexArr)" class="form-select">
                                                            <option :value="-1">Chọn thuộc tính</option>
                                                            <option :value="1">Thông tin nhân khẩu học</option>
                                                            <option :value="2">Thông tin hành vi viễn thông</option>
                                                            <option :value="3">Phân khúc khách hàng</option>
                                                            <option :value="4">Hành vi, sở thích</option>
                                                        </select>

                                                    </div>
                                                    <!-- condition cấp 1-->
                                                    <div class="col-3">
                                                        <select v-if="condition.customType===1" :disabled="isEditModalField" @change="onChangeInfo(indexArr,index)" v-model="condition.peopleInfo" class="form-select">
                                                            <option :value="-1" disabled>Chọn thuộc tính</option>
                                                            <option :value="1">Họ tên</option>
                                                            <option :value="2">Tuổi</option>
                                                            <option :value="3">Địa chỉ</option>
                                                            <option :value="4">Giới tính</option>
                                                        </select>
                                                        <select v-if="condition.customType===2" :disabled="isEditModalField" @change="onChangeTele(indexArr,index)" v-model="condition.peopleTele" class="form-select">
                                                            <option :value="-1" disabled>Chọn thuộc tính</option>
                                                            <option :value="1">Loại thuê bao</option>
                                                            <option :value="2">ARPU</option>
                                                            <option :value="3">Trạng thái</option>
                                                            <option :value="4">Thiết bị sử dụng</option>
                                                            <option :value="5">Dịch vụ đang sử dụng</option>
                                                            <option :value="6">Địa chỉ phát sinh cước</option>
                                                            <option :value="7">Tuổi thuê bao</option>
                                                            <option :value="8">Thẻ nạp mệnh giá</option>
                                                        </select>
                                                        <input v-if="condition.customType===3" :disabled="isEditModalField" type="text" v-model="condition.createdCustomerSegment.textCustomer.text_customer" class="form-control" required>
                                                        <select v-if="condition.customType===4" :disabled="isEditModalField" @change="onChangeHobby(indexArr,index)" v-model="condition.peopleHobby" class="form-select">
                                                            <option :value="-1">Chọn thuộc tính</option>
                                                            <option :value="1">Thể thao</option>
                                                            <option :value="2">Phim</option>
                                                            <option :value="3">Data</option>
                                                        </select>
                                                    </div>

                                                    <!-- condition cấp 2: customType = 1, DemographicInfo-->
                                                    <div class="col-4">
                                                        <template>
                                                            <div v-if="condition.peopleInfo===1" class="row mb-3">
                                                                <div class="col-6">
                                                                    <select :disabled="isEditModalField" v-model="condition.createDemographicInfo.objFullName.fullName.type" class="form-select">
                                                                        <option :value="1">Bắt đầu</option>
                                                                        <option :value="2">Kết thúc</option>
                                                                        <option :value="3">Chứa</option>
                                                                    </select>
                                                                </div>
                                                                <div class="col-6">
                                                                    <input :disabled="isEditModalField"
                                                                           type="text" class="form-control"
                                                                           v-model="condition.createDemographicInfo.objFullName.fullName.name"
                                                                           required
                                                                    >
                                                                </div>
                                                            </div>
                                                            <div v-if="condition.peopleInfo===2" class="row mb-3">
                                                                <div class="col-6">
                                                                    <select :disabled="isEditModalField" v-model="condition.createDemographicInfo.dob.age.operator" class="form-select">
                                                                        <option :value="'between'">Trong khoảng</option>
                                                                        <option :value="'>'">Lớn hơn</option>
                                                                        <option :value="'<'">Nhỏ hơn</option>
                                                                        <option :value="'='">Bằng</option>
                                                                    </select>
                                                                </div>
                                                                <div class="col-6">
                                                                    <input type="number" :disabled="isEditModalField" v-model="condition.createDemographicInfo.dob.age.from" class="form-control" id="only-numeric" required>
                                                                    <input type="number" v-if="condition.createDemographicInfo.dob.age.operator === 'between'" :disabled="isEditModalField" v-model="condition.createDemographicInfo.dob.age.to" id="only-numeric" class="form-control"
                                                                           required>
                                                                </div>
                                                            </div>

                                                            <div v-if="condition.peopleInfo===3" class="row mb-3">
                                                                <div class="col-6">
                                                                    <select :disabled="isEditModalField" @change="onChangeCities(condition.createDemographicInfo.address1.address, indexArr, index)" v-model="condition.createDemographicInfo.address1.address.city" class="form-select" required>
                                                                        <option :value="-1">Tỉnh/TP</option>
                                                                        <option v-for="city in dataCities" :value="city.id">
                                                                            {{ city.name }}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                                <div class="col-6">
                                                                    <select :disabled="isEditModalField" v-model="condition.createDemographicInfo.address1.address.district" class="form-select" required>
                                                                        <option :value="-1">Quận/Huyện</option>
                                                                        <option v-for="district in condition.createDemographicInfo.address1.address.arrDistrict" :value="district.id">
                                                                            {{ district.name }}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <select v-if="condition.peopleInfo===4" :disabled="isEditModalField" v-model="condition.createDemographicInfo.gender1.gender" class="form-select" required>
                                                                <option :value="0">Nam</option>
                                                                <option :value="1">Nữ</option>
                                                                <option :value="2">Không xác định</option>
                                                            </select>
                                                        </template>

                                                        <!-- condition cấp 2: customType = 1, TelecomInfo-->
                                                        <template>

                                                            <select v-if="condition.peopleTele===1" :disabled="isEditModalField" v-model="condition.createdTelecomInfo.subType.subscriber_type" class="form-select" required>
                                                                <option :value="1">Trả trước</option>
                                                                <option :value="2">Trả sau</option>
                                                            </select>

                                                            <div v-if="condition.peopleTele===2" class="row mb-3">
                                                                <div class="col-6">
                                                                    <select :disabled="isEditModalField" v-model="condition.createdTelecomInfo.arpuObj.arpu.operator" class="form-select">
                                                                        <option :value="'between'">Trong khoảng</option>
                                                                        <option :value="'>'">Lớn hơn</option>
                                                                        <option :value="'<'">Nhỏ hơn</option>
                                                                        <option :value="'='">Bằng</option>
                                                                    </select>
                                                                </div>
                                                                <div class="col-6">
                                                                    <input :disabled="isEditModalField" type="number" v-model="condition.createdTelecomInfo.arpuObj.arpu.from" class="form-control" required>
                                                                    <input v-if="condition.createdTelecomInfo.arpuObj.arpu.operator==='between'" :disabled="isEditModalField" type="number" v-model="condition.createdTelecomInfo.arpuObj.arpu.to" class="form-control" required>
                                                                </div>
                                                            </div>
                                                            <select :disabled="isEditModalField" v-model="condition.createdTelecomInfo.statusObj.status" v-if="condition.peopleTele===3" class="form-select" required>
                                                                <option :value="1">Hoạt động</option>
                                                                <option :value="2">Không hoạt động</option>
                                                            </select>
                                                            <select v-if="condition.peopleTele===4" :disabled="isEditModalField" v-model="condition.createdTelecomInfo.deviceObj.device" class="form-select" required>
                                                                <option disabled :value="-1">Chọn thiết bị</option>
                                                                <option :value="0">Smartphone</option>
                                                                <option :value="1">Feature phone</option>
                                                            </select>
                                                            <input v-if="condition.peopleTele===5" :disabled="isEditModalField" type="text" v-model="condition.createdTelecomInfo.serviceObj.service" class="form-control" required>
                                                            <div v-if="condition.peopleTele===6" class="row mb-3">
                                                                <div class="col-6">
                                                                    <select :disabled="isEditModalField" @change="onChangeCities(condition.createdTelecomInfo.addressFee.address_fee, indexArr, index)" v-model="condition.createdTelecomInfo.addressFee.address_fee.city" class="form-select" required>
                                                                        <option disabled :value="-1">Tỉnh/TP</option>
                                                                        <option v-for="city in dataCities" :value="city.id">
                                                                            {{ city.name }}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                                <div class="col-6">
                                                                    <select :disabled="isEditModalField" v-model="condition.createdTelecomInfo.addressFee.address_fee.district" class="form-select" required>
                                                                        <option disabled :value="-1">Quận/Huyện</option>
                                                                        <option v-for="district in condition.createdTelecomInfo.addressFee.address_fee.arrDistrict" :value="district.id">
                                                                            {{ district.name }}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div v-if="condition.peopleTele===7" class="row mb-3">
                                                                <div class="col-6">
                                                                    <select :disabled="isEditModalField" v-model="condition.createdTelecomInfo.subscriberDob.subscriber_dob.operator" class="form-select">
                                                                        <option :value="'between'">Trong khoảng</option>
                                                                        <option :value="'>'">Lớn hơn</option>
                                                                        <option :value="'<'">Nhỏ hơn</option>
                                                                        <option :value="'='">Bằng</option>
                                                                    </select>
                                                                </div>
                                                                <div class="col-6">
                                                                    <input :disabled="isEditModalField" type="number" v-model="condition.createdTelecomInfo.subscriberDob.subscriber_dob.from" class="form-control" required>
                                                                    <input v-if="condition.createdTelecomInfo.subscriberDob.subscriber_dob.operator==='between'" :disabled="isEditModalField" type="number" v-model="condition.createdTelecomInfo.subscriberDob.subscriber_dob.to"
                                                                           class="form-control" required>
                                                                </div>
                                                            </div>
                                                            <div v-if="condition.peopleTele===8" class="row mb-3">
                                                                <div class="col-6">
                                                                    <select :disabled="isEditModalField" v-model="condition.createdTelecomInfo.cardValue.card_value.operator" class="form-select">
                                                                        <option :value="'between'">Trong khoảng</option>
                                                                        <option :value="'>'">Lớn hơn</option>
                                                                        <option :value="'<'">Nhỏ hơn</option>
                                                                        <option :value="'='">Bằng</option>
                                                                    </select>
                                                                </div>
                                                                <div class="col-6">
                                                                    <input :disabled="isEditModalField" type="number" v-model="condition.createdTelecomInfo.cardValue.card_value.from" class="form-control" required>
                                                                    <input v-if="condition.createdTelecomInfo.cardValue.card_value.operator==='between'" :disabled="isEditModalField" type="number" v-model="condition.createdTelecomInfo.cardValue.card_value.to" class="form-control"
                                                                           required>
                                                                </div>
                                                            </div>
                                                        </template>

                                                        <!-- condition cấp 2: customType = 4, Hobby-->
                                                        <template>
                                                            <input v-if="condition.peopleHobby === 1" :disabled="isEditModalField" type="text" v-model="condition.createHobby.sportObj.sport" class="form-control" required>
                                                            <input v-if="condition.peopleHobby === 2" :disabled="isEditModalField" type="text" v-model="condition.createHobby.movieObj.movie" class="form-control" required>
                                                            <input v-if="condition.peopleHobby === 3" :disabled="isEditModalField" type="text" v-model="condition.createHobby.dataObj.data" class="form-control" required>
                                                        </template>
                                                    </div>
                                                    <div class="col-1" v-if="index>0">
                                                        <button class="btn btn-danger" :disabled="isEditModalField" @click="removeCondition(index, indexArr)">X</button>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12" style="padding-left: 45%">
                                                        <button type="button" :disabled="isEditModalField" class="btn btn-primary" @click="addCondition(1, indexArr)">AND</button>
                                                        <button type="button" :disabled="isEditModalField" class="btn btn-success" @click="addCondition(2, indexArr)">OR</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mb-2 mt-2">
                                                <div class="col-12" style="padding-left: 45%">
                                                    <button type="button" :disabled="isEditModalField" class="btn btn-primary" @click="addArrCondition(1)">AND</button>
                                                    <button type="button" :disabled="isEditModalField" class="btn btn-success" @click="addArrCondition(2)">OR</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-1"></div>
                                <div class="col-11">
                                    <label>Ghi chú</label>
                                    <input :disabled="isEditModalField" type="text" v-model="createSegmentWeb.note" class="form-control">
                                </div>
                            </div>

                        </div>
                        <div class="card-footer text-end">
                            <button type="button" class="btn btn-primary" @click="closeModalAddSegment">Bỏ qua</button>
                            <button :class="typeSegment===3 ? 'd-none' : ''" type="button" class="btn btn-primary" @click="estimateDataSize">Estimate data size</button>
                            <button :disabled="isEditModalField" type="submit" class="btn btn-success"><i class="uil uil-save me-1"></i> Lưu lại</button>
                            <!--                            @click="addSegment"-->
                        </div>
                    </form>
                </div>
            </div>
            <!-- end card-body -->
        </div>
    </b-modal>
</template>


<style scoped>
.multiselect__option--selected {
    background: beige;
    color: #35495e;
    font-weight: 700;
}

.border-condition {
    border: 1px solid #a19a9a;
    border-radius: 8px;
    padding: 12px;
}

.border-condition-1 {
    border: 1px solid #a19a9a;
    border-radius: 8px;
    padding: 0 12px 12px 12px;
    position: relative;
}

.btnCondition {
    background-color: #004390;
    padding: 8px;
    border-radius: 8px;
    color: #FCFCFC;
    font-weight: 600;
    position: absolute;
    top: -27px;
    left: -50px;
}

.mgt-28 {
    margin-top: 28px;
}
</style>
