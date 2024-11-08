import {CONSTANTS} from '@/utils/constant';
import {API_EMAIL} from "@/api/email";

const actions = {


    async apiSendMail({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_EMAIL.apiSendMail}`, payload);

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

