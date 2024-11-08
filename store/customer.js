import { API_CUSTOMER} from "@/api/customer";
import {CONSTANTS} from '@/utils/constant';

const actions = {
    async apiGetCustomer({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CUSTOMER.apiGetCustomer}`, payload);

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

