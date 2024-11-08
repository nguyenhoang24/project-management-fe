import {API_ROLE_MANAGE} from '@/api/admin/role';
import {CONSTANTS} from '@/utils/constant';
import {API_CAMPAIGN_MANAGE} from "@/api/campaign/manage";

const actions = {

    async apiGetListRole({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_ROLE_MANAGE.apiGetListRole}`, payload);

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

