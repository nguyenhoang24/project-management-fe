import {API_EVENT_MANAGE} from '@/api/setting/event';
import {CONSTANTS} from '@/utils/constant';
import {API_CAMPAIGN_MANAGE} from "@/api/campaign/manage";

const actions = {

    async apiGetListEvent({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_EVENT_MANAGE.apiGetListEvent}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiAddEvent({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_EVENT_MANAGE.apiAddEvent}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiEditEvent({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_EVENT_MANAGE.apiEditEvent}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiDeleteEvent({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_EVENT_MANAGE.apiDeleteEvent}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiChangeEventStatus({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_EVENT_MANAGE.apiChangeEventStatus}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiGetEventById({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_EVENT_MANAGE.apiGetEventById}`, payload);

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

