import {API_USER_MANAGE} from '@/api/admin/user';
import {CONSTANTS} from '@/utils/constant';

const actions = {

    async apiGetUser({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_USER_MANAGE.apiGetUser}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiChangePassword({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_USER_MANAGE.apiChangePassword}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiSaveUser({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_USER_MANAGE.apiSaveUser}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiUpdateUser({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_USER_MANAGE.apiUpdateUser}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiDeleteUser({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_USER_MANAGE.apiDeleteUser}`+ `/${payload}`);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiGetRole({commit, state}) {
        try {
            let {data} = await this.$axios.get(`${API_USER_MANAGE.apiGetRole}`);

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

