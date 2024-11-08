import {API_CAMPAIGN_MANAGE} from '@/api/campaign/manage';
import {CONSTANTS} from '@/utils/constant';

const actions = {
    async apiAddCampaign({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CAMPAIGN_MANAGE.apiAddCampaign}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiEditCamp({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CAMPAIGN_MANAGE.apiEditCamp}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiGetListCampaign({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CAMPAIGN_MANAGE.apiGetListCampaign}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiCampaignActive({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CAMPAIGN_MANAGE.apiCampaignActive}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiStartCampaign({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CAMPAIGN_MANAGE.apiStartCampaign}`, payload);

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

