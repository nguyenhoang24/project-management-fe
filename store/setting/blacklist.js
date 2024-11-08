import {API_BLACKLIST_MANAGE} from '@/api/setting/blacklist';
import {CONSTANTS} from '@/utils/constant';
import {API_CAMPAIGN_MANAGE} from "@/api/campaign/manage";

const actions = {
    async apiGetListBlacklist({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_BLACKLIST_MANAGE.apiGetListBlacklist}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiAddBlacklist({commit, state}, payload) {
        try {
            let { data } = await this.$axios.post(`${API_BLACKLIST_MANAGE.apiAddBlacklist}`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiUpdateBlacklistName({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_BLACKLIST_MANAGE.apiUpdateBlacklistName}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiEditBlacklist({commit, state}, payload) {
        try {
            let { data } = await this.$axios.post(`${API_BLACKLIST_MANAGE.apiEditBlacklist}`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiGetListSub({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_BLACKLIST_MANAGE.apiGetListSub}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiAddSub({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_BLACKLIST_MANAGE.apiAddSub}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiDeleteBlacklist({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_BLACKLIST_MANAGE.apiDeleteBlacklist}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiDeleteSub({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_BLACKLIST_MANAGE.apiDeleteSub}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiChangeBlacklistStatus({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_BLACKLIST_MANAGE.apiChangeBlacklistStatus}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiGetSubById({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_BLACKLIST_MANAGE.apiGetSubById}`, payload);

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

