import {API_CONTACT_MANAGE} from '@/api/contact/contact';
import {CONSTANTS} from '@/utils/constant';
import {API_CAMPAIGN_MANAGE} from "@/api/campaign/manage";

const actions = {
    async apiGetListContactGroup({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT_MANAGE.apiGetListContactGroup}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },async apiGetListProvince({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT_MANAGE.apiGetProvince}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },async apiGetListDistrict({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT_MANAGE.apiGetDistrict}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiAddContactGroup({commit, state}, payload) {
        try {
            let { data } = await this.$axios.post(`${API_CONTACT_MANAGE.apiAddContactGroup}`, payload, {
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
    async apiEditContactGroup({commit, state}, payload) {
        try {
            let { data } = await this.$axios.post(`${API_CONTACT_MANAGE.apiEditContactGroup}`, payload, {
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
    async apiGetListContact({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT_MANAGE.apiGetListContact}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiAddContact({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT_MANAGE.apiAddContact}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiEditContact({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT_MANAGE.apiEditContact}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiDeleteContactGroup({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT_MANAGE.apiDeleteContactGroup}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiDeleteContact({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT_MANAGE.apiDeleteContact}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiChangeContactGroupStatus({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT_MANAGE.apiChangeContactGroupStatus}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiUpdateContactGroupName({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT_MANAGE.apiUpdateContactGroupName}`, payload);

            if (data.code === CONSTANTS.SUCCESS) {
            }

            return data;

        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    async apiGetContactById({commit, state}, payload) {
        try {
            let {data} = await this.$axios.post(`${API_CONTACT_MANAGE.apiGetContactById}`, payload);

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

