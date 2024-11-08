import Vue from 'vue';
import swal from 'sweetalert2';

Vue.mixin({
    data() {
        return {
            glbPageIsLoading: false,
            glbLoginUsername: ''
        };
    },
    methods: {
        commonNotifyVue(message, type) {
            if (message === '') {
                return;
            }
            // alert(message);
            this.$notify({
                text: message,
                type: type // info | warn | danger | success | primary
            });
        },
        commonConfirmVue(title, message, btnTextConfirm, btnTextCancel, callbackYes, callbackNo) {
            if (message === undefined) {
                message = this.$t('err_sys_busy');
            }

            swal.fire({
                title: title,
                html: message,
                icon: '',
                showCancelButton: true,
                customClass: {
                    confirmButton: 'btn btn-sm btn-danger rounded-4 mr-2',
                    cancelButton: 'btn btn-sm btn-outline-secondary rounded-4'
                },
                confirmButtonText: btnTextConfirm,
                cancelButtonText: btnTextCancel,
                buttonsStyling: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false
            }).then((result) => {
                if (result.isConfirmed) {
                    callbackYes();
                } else {
                    callbackNo();
                }
            }).catch(swal.noop);
        },
        commonNotifyConfirmOKVue(title, message, callbackYes) {
            if (message === undefined) {
                message = this.$t('err_sys_busy');
            }

            swal.fire({
                title: title,
                html: message,
                icon: 'success',
                showCloseButton: false,
                showCancelButton: false,
                customClass: {
                    confirmButton: 'btn btn-success mr-2',
                    cancelButton: 'btn btn-danger'
                },
                confirmButtonText: 'OK',
                buttonsStyling: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false
            }).then((result) => {
                if (result.isConfirmed) {
                    callbackYes();
                }
            }).catch(swal.noop);
        },
        commonConfirmOKVue(message, callbackYes, callbackNo) {
            if (message === undefined) {
                message = this.$t('err_sys_busy');
            }

            swal.fire({
                title: '',
                html: message,
                icon: 'success',
                showCloseButton: true,
                showCancelButton: false,
                customClass: {
                    confirmButton: 'btn btn-success mr-2',
                    cancelButton: 'btn btn-danger'
                },
                confirmButtonText: 'OK',
                buttonsStyling: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false
            }).then((result) => {
                if (result.isConfirmed) {
                    callbackYes();
                } else {
                    callbackNo();
                }
            }).catch(swal.noop);
        },
        commonConfirmOKWarningVue(message, callbackYes, callbackNo) {
            if (message === undefined) {
                message = this.$t('err_sys_busy');
            }

            swal.fire({
                title: '',
                html: message,
                icon: 'question',
                showCloseButton: true,
                showCancelButton: false,
                customClass: {
                    confirmButton: 'btn btn-success mr-2',
                    cancelButton: 'btn btn-danger'
                },
                confirmButtonText: 'OK',
                buttonsStyling: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false
            }).then((result) => {
                if (result.isConfirmed) {
                    callbackYes();
                } else {
                    callbackNo();
                }
            }).catch(swal.noop);
        },
        commonConfirmOKWarningOneVue(message, callbackYes) {
            if (message === undefined) {
                message = this.$t('err_sys_busy');
            }

            swal.fire({
                title: '',
                html: message,
                icon: 'warning',
                showCloseButton: false,
                showCancelButton: false,
                customClass: {
                    confirmButton: 'btn btn-sm btn-danger rounded-4 mr-2',
                    cancelButton: 'btn btn-sm btn-outline-secondary rounded-4'
                },
                confirmButtonText: 'Đồng ý',
                buttonsStyling: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false
            }).then((result) => {
                if (result.isConfirmed) {
                    callbackYes();
                }
            }).catch(swal.noop);
        },
        commonConfirmInputVue(title, message, btnTextConfirm, btnTextCancel, callbackYes, callbackNo, preConfirm) {
            if (message === undefined) {
                message = this.$t('err_sys_busy');
            }

            swal.fire({
                title: title,
                html: message,
                icon: '',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                customClass: {
                    confirmButton: 'btn btn-sm btn-danger rounded-4 mr-2',
                    cancelButton: 'btn btn-sm btn-outline-secondary rounded-4'
                },
                confirmButtonText: btnTextConfirm,
                cancelButtonText: btnTextCancel,
                buttonsStyling: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                preConfirm: preConfirm
            }).then((result) => {
                if (result.isConfirmed) {
                    callbackYes(result);
                } else {
                    callbackNo();
                }
            }).catch(swal.noop);
        },
        commonConfirmInputPackVue(title, callbackYes, callbackNo) {
            if (message === undefined) {
                message = this.$t('err_sys_busy');
            }

            swal.fire({
                title: title,
                icon: '',
                html: `<div class="form-group pt-3 pb-3"><input placeholder="Nhập SĐT đăng kí" id="glbCommonSwalInputConfirm1991" type="text" class="form-control" /></div>`,
                showCancelButton: true,
                customClass: {
                    confirmButton: 'btn btn-sm btn-danger rounded-4 mr-2',
                    cancelButton: 'btn btn-sm btn-outline-secondary rounded-4'
                },
                confirmButtonText: 'Đồng ý',
                cancelButtonText: 'Hủy bỏ',
                buttonsStyling: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false
            }).then((result) => {
                if (result.isConfirmed) {
                    callbackYes();
                } else {
                    callbackNo();
                }
            }).catch(swal.noop);
        },
        commonConfirmPasswordVue(message, callbackYes, callbackNo) {
            if (message === undefined) {
                message = this.$t('err_sys_busy');
            }

            swal.fire({
                title: message,
                html: `<div class="form-group pt-3 pb-3"><input id="glbCommonSwalPasswordConfirm1991" type="password" class="form-control" /></div>`,
                showCancelButton: true,
                customClass: {
                    confirmButton: 'btn btn-success mr-2',
                    cancelButton: 'btn btn-danger'
                },
                confirmButtonText: 'OK',
                cancelButtonText: 'CANCEL',
                buttonsStyling: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false
            }).then((result) => {
                if (result.isConfirmed) {
                    callbackYes();
                } else {
                    callbackNo();
                }
            }).catch(swal.noop);
        },
        commonErrorVue(message) {
            if (message === '') {
                return;
            } else if (message === undefined) {
                message = this.$t('err_sys_busy');
            }

            swal.fire({
                title: '',
                html: message,
                icon: 'error',
                showCancelButton: false,
                customClass: {
                    confirmButton: 'btn btn-sm btn-danger rounded-4 mr-2',
                    cancelButton: 'btn btn-sm btn-outline-secondary rounded-4'
                },
                confirmButtonText: 'Bỏ qua',
                buttonsStyling: false,
                allowOutsideClick: true,
                backdrop: true,
                allowEscapeKey: true,
                allowEnterKey: true
            }).then().catch(swal.noop);
        },
        commonInfoVue(message) {
            if (message === '') {
                return;
            } else if (message === undefined) {
                message = this.$t('err_sys_busy');
            }

            swal.fire({
                title: '',
                html: message,
                icon: 'success',
                showCancelButton: false,
                customClass: {
                    confirmButton: 'btn btn-sm btn-danger rounded-4 mr-2',
                    cancelButton: 'btn btn-sm btn-danger rounded-4'
                },
                confirmButtonText: 'Bỏ qua',
                buttonsStyling: false,
                allowOutsideClick: true,
                backdrop: true,
                allowEscapeKey: true,
                allowEnterKey: true
            }).then().catch(swal.noop);
        },
        commonWarningVue(message) {
            if (message === '') {
                return;
            } else if (message === undefined) {
                message = this.$t('err_sys_busy');
            }

            swal.fire({
                title: '',
                html: message,
                icon: 'warning',
                showCancelButton: false,
                customClass: {
                    confirmButton: 'btn btn-sm btn-danger rounded-4 mr-2',
                    cancelButton: 'btn btn-sm btn-danger'
                },
                confirmButtonText: 'Bỏ qua',
                buttonsStyling: false,
                allowOutsideClick: true,
                backdrop: true,
                allowEscapeKey: true,
                allowEnterKey: true
            }).then().catch(swal.noop);
        },
        commonReadFileCSV(e, arrayData) {
            let dataFileReaderCSV = [];

            let promiseReader = new Promise(async (resolve) => {

                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) {
                    return;
                }

                let file = e.target.files[0];

                let extension = file.name.split('.').pop().toLowerCase();
                if (extension === 'csv') {
                    let reader = new FileReader();

                    reader.onload = function(e) {
                        let data = e.target.result;
                        if (data !== null && data !== undefined && data.trim() !== '') {
                            let arrayAll = data.split('\n');
                            for (let k = 0; k < arrayAll.length; k++) {
                                let strRowOne = arrayAll[k];
                                if (strRowOne == null || strRowOne.trim().length === 1 || strRowOne.trim().length === 0) {
                                    continue;
                                }

                                strRowOne = strRowOne.replace(/[\r]/g, '').replace(/[\n]/g, '').replace(/"/g, '');
                                let oneArr = strRowOne.split(',');
                                if (oneArr.length > 0) {
                                    dataFileReaderCSV.push(oneArr);
                                }
                            }
                        }
                        resolve('complete');
                    };

                    reader.readAsText(file, 'Shift_JIS');
                }
            });

            promiseReader.then(data => {
                arrayData(dataFileReaderCSV);
            });
        },
        commonExportFileCSV(fileName, arrTitle, customEx, arrayObj) {
            if (arrayObj.length > 0) {
                let arrayDataObjConvert = [];

                for (let k = 0; k < arrayObj.length; k++) {
                    let objOne = arrayObj[k];

                    let rowTitleName = '';
                    let rowTitle = '';
                    let rowData = '';

                    if (customEx !== null) {
                        for (let ch = 0; ch < customEx.length; ch++) {
                            for (let [key, value] of Object.entries(objOne)) {
                                if (customEx[ch] === key) {
                                    if (value === true) {
                                        value = 1;
                                    } else if (value === false) {
                                        value = 0;
                                    } else if (value === null) {
                                        value = '';
                                    } else if (isNaN(value) === true) {
                                        value = '"' + value + '"';
                                    }

                                    rowData += value + ',';
                                    rowTitle += key + ',';

                                    if (arrTitle !== null) {
                                        rowTitleName += arrTitle[ch] + ',';
                                    }
                                }
                            }
                        }
                    } else {
                        for (let [key, value] of Object.entries(objOne)) {
                            if (value === true) {
                                value = 1;
                            } else if (value === false) {
                                value = 0;
                            } else if (value === null) {
                                value = '';
                            } else if (isNaN(value) === true) {
                                value = '"' + value + '"';
                            }

                            rowData += value + ',';
                            rowTitle += key + ',';
                        }
                    }

                    if (k === 0 && arrTitle === null) {
                        arrayDataObjConvert.push(rowTitle);
                    } else if (k === 0 && arrTitle !== null) {
                        arrayDataObjConvert.push(rowTitleName);
                    }

                    arrayDataObjConvert.push(rowData);
                }

                let csvFile = arrayDataObjConvert.join('\n').replace(/(^\[)|(]$)/mg, '');
                if (fileName === null || fileName.trim() === '') {
                    fileName = 'export_data';
                }

                let filename = fileName + '.csv';
                let blob = new Blob(['\uFEFF' + csvFile], { type: 'text/csv;charset=utf-8;' });

                if (navigator.msSaveBlob) { // IE 10+
                    navigator.msSaveBlob(blob, filename);
                } else {
                    let link = document.createElement('a');
                    if (link.download !== undefined) {
                        let url = URL.createObjectURL(blob);

                        link.setAttribute('href', url);
                        link.setAttribute('download', filename);
                        link.style.visibility = 'hidden';

                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }
            }
        },
        commonArrGroupByKey(key_group, key_children, arrObj) {
            let arrayGroupFinal = [];

            if (key_group === null || key_group === undefined || arrObj === null || arrObj === undefined || arrObj.length === 0) {
                arrayGroupFinal = [];
            } else {
                let groups = {};
                for (let i = 0; i < arrObj.length; i++) {
                    let groupIdBy = arrObj[i][key_group];

                    if (!groups[groupIdBy]) {
                        groups[groupIdBy] = [];
                    }

                    groups[groupIdBy].push(arrObj[i]);
                }

                arrayGroupFinal = [];
                for (let groupId in groups) {
                    let objFinal = {};

                    objFinal[key_group] = groupId;
                    objFinal[key_children] = groups[groupId];

                    arrayGroupFinal.push(objFinal);
                }

                arrayGroupFinal.sort(function(a, b) {
                    return (b.groupOrderById) - (a.groupOrderById);
                });
            }

            return arrayGroupFinal;
        },
        commonFormatNumberToHHMMSS(sec_num) {
            sec_num = parseInt(sec_num);

            let hours = Math.floor(sec_num / 3600);
            let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            let seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours < 10) {
                hours = '0' + hours;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }

            return hours + ':' + minutes + ':' + seconds;
        },
        commonFormatStrToDate(str_date, opt) {
            let str = '';
            if (str_date !== undefined && str_date !== '') {
                if (opt === 1) {
                    str = this.$moment(str_date, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');
                } else if (opt === 2) {
                    str = this.$moment(str_date, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD');
                } else if (opt === 3) {
                    str = this.$moment(str_date, 'YYYY-MM-DD HH:mm').format('HH:mm');
                } else if (opt === 4) {
                    str = this.$moment(str_date, 'YYYY-MM-DD HH:mm').format('HH');
                } else if (opt === 5) {
                    str = this.$moment(str_date, 'YYYY-MM-DD HH:mm').format('mm');
                }
            }

            return str;
        },
        commonNullToStringStr(val) {
            let value = '';
            if (val !== null && val !== undefined) {
                value = val.trim();
            }

            return value;
        },
        commonNullToStringStrSlice(val, number) {
            let value = '';
            if (val !== null && val !== undefined) {
                value = val.trim();

                if (value.length > number) {
                    value = value.slice(0, number) + '...';
                }
            }

            return value;
        },
        commonGroupByKeyArray(arr, key_group) {
            let objGroup = {};

            try {
                objGroup = arr.reduce((r, a) => {
                    r[a[key_group]] = [...r[a[key_group]] || [], a];
                    return r;
                }, {});

            } catch (err) {
                console.log('[commonGroupByKeyArray]', err);
            }

            return objGroup;
        },
        commonGetUniqueListBy(arr, key) {
            return [...new Map(arr.map(item => [item[key], item])).values()];
        },
        commonCheckPhoneNumber(phoneNumber) {
            return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(phoneNumber);
        },
        deserializePhoneNumber(phoneString, haveExt) {
            if (haveExt) {
                return {
                    area_code: phoneString.split(')')[0].replace('(', ''),
                    first_numbers: phoneString.split(')')[1].split('-')[0],
                    second_numbers: phoneString.split(')')[1].split('-')[1].split('EXT')[0],
                    extension: phoneString.split(')')[1].split('-')[1].split('EXT')[1]
                };
            } else {
                return {
                    area_code: phoneString.split(')')[0].replace('(', ''),
                    first_numbers: phoneString.split(')')[1].split('-')[0],
                    second_numbers: phoneString.split(')')[1].split('-')[1].split('EXT')[0]
                };
            }
        },
        validateDate(date_string) {
            if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(date_string)) {
                return false;
            }

            // Parse the date parts to integers
            let parts = date_string.split('-');
            let year = parseInt(parts[0], 10);
            let month = parseInt(parts[1], 10);
            let day = parseInt(parts[2], 10);

            // Check the ranges of month and year
            if (year < 1753 || year > 9998 || month === 0 || month > 12) {
                return false;
            }

            let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            // Adjust for leap years
            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                monthLength[1] = 29;
            }

            // Check the range of the day
            return !(day < 0 && day >= monthLength[month - 1]);
        },
        commonImageToBase64(file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
            };
            reader.onerror = function(error) {
                console.log('Error: ', error);
            };
        },
        commonCheckGroupMenuAccess(arrObj, groupPath) {
            let flagCheck = false;

            if (arrObj !== null && arrObj.length > 0) {
                let objMenuAccess = arrObj.find(x => x.group_path === groupPath);
                if (objMenuAccess !== undefined && objMenuAccess !== null) {
                    flagCheck = true;
                }
            }

            return flagCheck;
        },
        commonCheckPathMenuAccess(arrObj, fullPath) {
            let flagCheck = false;

            if (arrObj !== null && arrObj.length > 0) {
                let objMenuAccess = arrObj.find(x => x.full_path === fullPath);
                if (objMenuAccess !== undefined && objMenuAccess !== null) {
                    flagCheck = true;
                }
            }

            return flagCheck;
        },
        commonGetGroupMenuAccess(arrObj, groupPath) {
            let arrGroupMenuAccess = [];

            if (arrObj !== null && arrObj.length > 0) {
                arrGroupMenuAccess = arrObj.filter(word => word.group_path === groupPath);
            }

            return arrGroupMenuAccess;
        },
        commonGetObjMenuAccess(arrObj) {
            let objMenuAccess = {};
            let pathUrl = this.$route.path;
            console.log('$route.path: ', pathUrl);
            console.log('$nuxt.$route.path: ', this.$nuxt.$route.path);
            console.log('$nuxt.$route.name: ', this.$nuxt.$route.name);

            if (arrObj !== null && arrObj.length > 0) {
                objMenuAccess = arrObj.find(obj => {
                    return pathUrl.includes(obj.full_path);
                });
            }

            return objMenuAccess;
        },
        commonGetArrActionAccess(menuPageAction, arrObj) {
            let arrActionAccess = [];
            let pathUrl = this.$route.path;
            if (menuPageAction !== null) {
                let arrId = menuPageAction.split(',').map(Number);
                arrId = arrId.filter((v, i, a) => a.indexOf(v) === i);

                if (arrObj !== null && arrObj.length > 0) {
                    arrActionAccess = arrObj.filter(function(x) {
                        return (pathUrl.includes(x.full_path)) && (arrId.includes(x.action_id));
                    });
                }
            }

            return arrActionAccess;
        },
        commonCheckObjNull(obj) {
            return obj === null || obj === undefined;
        },
        commonCheckObjEmpty(obj) {
            return obj !== null && obj !== undefined && Object.keys(obj).length === 0;
        },
        commonFormatNumberView(number) {
            if (!number) {
                number = 0;
            }

            // Nine Zeroes for Billions
            return Math.abs(Number(number)) >= 1.0e+9
                ? (Math.abs(Number(number)) / 1.0e+9).toFixed(2) + 'B'
                // Six Zeroes for Millions
                : Math.abs(Number(number)) >= 1.0e+6
                    ? (Math.abs(Number(number)) / 1.0e+6).toFixed(2) + 'M'
                    // Three Zeroes for Thousands
                    : Math.abs(Number(number)) >= 1.0e+3
                        ? (Math.abs(Number(number)) / 1.0e+3).toFixed(2) + 'K'
                        : Math.abs(Number(number));
        },
        commonFormatCurrencyVnd(price) {
            if (!price) {
                price = 0;
            }

            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        },
        commonLoadingPage(flag) {
            this.$nextTick(() => {
                if (flag) {
                    this.$nuxt.$loading.start();
                } else {
                    this.$nuxt.$loading.finish();
                }
            });
        }
    }
});
