import { API_CONTACT} from "@/api/contact";
import {CONSTANTS} from '@/utils/constant';

const actions = {
    async apiGetListContact({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT.apiGetListContact}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetListSegment({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT.apiGetListSegment}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiAddSegment({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT.apiAddSegment}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetSegment({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT.apiGetSegment}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiEditSegment({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT.apiEditSegment}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiDeleteSegment({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT.apiDeleteSegment}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetListCities({commit, state}) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT.apiGetListCities}`);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetListDistrict({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT.apiGetListDistrict}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiCheckActiveSegment({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT.apiCheckActiveSegment}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiCheckSegmentUpdate({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT.apiCheckSegmentUpdate}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiGetTotalContact({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT.apiGetTotalContact}`, payload);

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

