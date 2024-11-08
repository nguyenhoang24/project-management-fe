import {API_CHANNEL_MANAGE} from '@/api/setting/channle';
import {CONSTANTS} from '@/utils/constant';
import {API_CAMPAIGN_MANAGE} from "@/api/campaign/manage";

const actions = {

    async apiGetListChannel({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CHANNEL_MANAGE.apiGetListChannel}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiAddChannel({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CHANNEL_MANAGE.apiAddChannel}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiEditChannel({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CHANNEL_MANAGE.apiEditChannel}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiDeleteChannel({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CHANNEL_MANAGE.apiDeleteChannel}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiGetChannelById({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CHANNEL_MANAGE.apiGetChannelById}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    }
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

