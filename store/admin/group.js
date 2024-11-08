import {API_GROUP_MANAGE} from '@/api/admin/group';
import {CONSTANTS} from '@/utils/constant';

const actions = {

    async apiGetListGroup({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_GROUP_MANAGE.apiGetListGroup}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiGetListAgency({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_GROUP_MANAGE.apiGetListAgency}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiGetListGroupQuantities({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_GROUP_MANAGE.apiGetListGroupQuantities}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiAddGroup({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_GROUP_MANAGE.apiAddGroup}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiEditGroup({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_GROUP_MANAGE.apiEditGroup}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiDeleteGroup({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_GROUP_MANAGE.apiDeleteGroup}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiDeleteGroupQuantity({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_GROUP_MANAGE.apiDeleteGroupQuantity}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiAddGroupQuantity({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_GROUP_MANAGE.apiAddGroupQuantity}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiEditGroupQuantity({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_GROUP_MANAGE.apiEditGroupQuantity}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiGetGroupQuantityById({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_GROUP_MANAGE.apiGetGroupQuantityById}`, payload);

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

