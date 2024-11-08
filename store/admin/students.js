// import { API_STUDENT_MANAGE} from "@/api/teacher";
import {CONSTANTS} from '@/utils/constant';
import {API_STUDENT_MANAGE} from "../../api/admin/student";

const actions = {

    async apiAddStudent({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_STUDENT_MANAGE.apiAddStudent}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiImportStudent({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_STUDENT_MANAGE.apiImportStudent}`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetStudent({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_STUDENT_MANAGE.apiGetStudent}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetStudentClass({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_STUDENT_MANAGE.apiGetStudentClass}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetCourse({commit, state}) {
        try {
            let {data} = await this.$axios.get(`${API_STUDENT_MANAGE.apiGetCourse}`);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiEditStudent({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_STUDENT_MANAGE.apiEditStudent}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiDeleteStudent({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_STUDENT_MANAGE.apiDeleteStudent}`+`/${parseInt(payload)}`);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiSearchStudent({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_STUDENT_MANAGE.apiSearchStudent}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetListDistrict({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_STUDENT_MANAGE.apiGetListDistrict}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiCheckActiveStudent({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_STUDENT_MANAGE.apiCheckActiveStudent}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiCheckStudentUpdate({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_STUDENT_MANAGE.apiCheckStudentUpdate}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiGetTotalContact({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_STUDENT_MANAGE.apiGetTotalContact}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
};

const state = () => ({});
const getters = {};
const mutations = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

