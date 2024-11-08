import {API_RULE_MANAGE} from '@/api/setting/rule';
import {CONSTANTS} from '@/utils/constant';
import {API_CAMPAIGN_MANAGE} from "@/api/campaign/manage";

const actions = {

    async apiGetListRule({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_RULE_MANAGE.apiGetListRule}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiUpdateRule({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_RULE_MANAGE.apiUpdateRule}`, payload);

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

