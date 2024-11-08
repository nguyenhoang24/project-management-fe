// import { API_SESSION_MANAGE} from "@/api/teacher";
import {CONSTANTS} from '../../utils/constant';
import {API_SESSION_MANAGE} from "../../api/assign/session";

const actions = {

    async apiAddSession({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_SESSION_MANAGE.apiAddSession}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiImportSession({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_SESSION_MANAGE.apiImportSession}`, payload, {
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

    async apiGetSession({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_SESSION_MANAGE.apiGetSession}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetSessionClass({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_SESSION_MANAGE.apiGetSessionClass}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiChangeSessionStatus({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_SESSION_MANAGE.apiChangeSessionStatus}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiGetSessionById({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_SESSION_MANAGE.apiGetSessionById}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiEditSession({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_SESSION_MANAGE.apiEditSession}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiDeleteSession({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_SESSION_MANAGE.apiDeleteSession}`+`/${payload}`);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiSearchSession({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_SESSION_MANAGE.apiSearchSession}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },

    async apiCheckActiveSession({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_SESSION_MANAGE.apiCheckActiveSession}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiCheckSessionUpdate({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_SESSION_MANAGE.apiCheckSessionUpdate}`, payload);

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
            let {data} = await this.$axios.post(`${API_SESSION_MANAGE.apiGetTotalContact}`, payload);

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

