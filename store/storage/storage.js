// import {CONSTANTS} from '@/utils/constant';
import {API_STORAGE} from "../../api/storage/storage";

const actions = {


    async apiUploadFile({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_STORAGE.apiUploadFile}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiDeleteFile({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_STORAGE.apiDeleteFile}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiDownloadFile({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_STORAGE.apiDownloadFile}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetTeacherById({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_STORAGE.apiGetTeacherById}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiEditTeacher({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_STORAGE.apiEditTeacher}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiDeleteTeacher({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_STORAGE.apiDeleteTeacher}`+`/${parseInt(payload)}`);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiSearchTeacher({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_STORAGE.apiSearchTeacher}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetBySession({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_STORAGE.apiGetBySession}`, payload);

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

