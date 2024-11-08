import {CONSTANTS} from '@/utils/constant';
import {API_TOPIC} from "../api/topic";

const actions = {


    async apiGetTopic({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_TOPIC.apiGetTopic}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiAddTopic({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_TOPIC.apiAddTopic}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiEditTopic({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_TOPIC.apiEditTopic}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiDeleteTopic({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_TOPIC.apiDeleteTopic}`+ `/${payload}`);

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

