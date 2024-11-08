import {API_CAMPAIGN_SCRIPT} from '@/api/campaign/script';
import {CONSTANTS} from '@/utils/constant';

const actions = {
    async apiAddWorkflowCamp({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CAMPAIGN_SCRIPT.apiAddWorkflowCamp}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiEditWorkflowCamp({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CAMPAIGN_SCRIPT.apiEditWorkflowCamp}`, payload);

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

