import {CONSTANTS} from '@/utils/constant';
import {API_NOTIFY} from "@/api/notify";

const actions = {


    async apiGetNotify({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_NOTIFY.apiGetNotify}` + `/${payload}`);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetNotifyDay({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_NOTIFY.apiGetNotifyDay}` + `/${payload}`);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetNotifyHour({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_NOTIFY.apiGetNotifyHour}` + `/${payload}`);

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

