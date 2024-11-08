<script>

import Vue from "vue";
import {getUserInfo} from "@/utils/cookieAuthen";

export default {
    data() {
        return {
            open: false,
            current: 0,
            user: JSON.parse(getUserInfo())
        }
    },
    props: {
        suggestions: {
            type: Array,
            required: true
        },

        selection: {
            type: String,
            required: true,
            twoWay: true
        }
    },

    computed: {
        matches() {
            return this.suggestions.filter((str) => {
                return String(str).indexOf(this.selection) >= 0;
            });
        },

        openSuggestion() {
            return this.selection !== "" &&
                this.matches.length !== 0 &&
                this.open === true;
        }
    },

    methods: {
        enter() {
            this.selection = this.matches[this.current];
            this.open = false;
            this.$emit('setStudentCode', this.selection);
        },

        up() {
            if (this.current > 0)
                this.current--;
        },

        down() {
            if (this.current < this.matches.length - 1)
                this.current++;
        },

        isActive(index) {
            return index === this.current;
        },

        change() {
            if (this.open === false) {
                this.open = true;
                this.current = 0;
            }
            this.$emit('setStudentCode', this.selection);
        },

        suggestionClick(index) {
            this.open = false;
            console.log(index)
            this.$emit('setStudentCode', index);
        },
        selectValue(value) {
            this.selectedValue = value;
        },
        handleClickOutside() {
            this.open = false;
        }
    }
}
Vue.directive('click-outside', {
    bind: function (element, binding, vnode) {
        element.clickOutsideEvent = function (event) {  //  check that click was outside the el and his children
            if (!(element === event.target || element.contains(event.target))) { // and if it did, call method provided in attribute value
                vnode.context[binding.expression](event);
                // binding.value(); run the arg
            }
        };
        document.body.addEventListener('click', element.clickOutsideEvent)
    },
    unbind: function (element) {
        document.body.removeEventListener('click', element.clickOutsideEvent)
    }
});

</script>

<template>
    <div style="position:relative" v-bind:class="{'open':openSuggestion}">
        <input class="form-control" type="text" v-model="selection" placeholder="Nhập mã sinh viên"
               @keydown.enter='enter'
               @keydown.down='down'
               @keydown.up='up'
               @input='change'
        />
        <ul class="dropdown-menu"  v-click-outside="handleClickOutside" v-show="open" style="display: block ;width:100%">
            <li v-for="suggestion in matches.slice(0,5)"
                v-bind:class="{'active': isActive($index)}"
                @click="suggestionClick(suggestion)"
            >
                {{ suggestion }}
            </li>
        </ul>

    </div>
</template>
<style>
li{
  cursor: pointer;
}
li.selected {
    background-color: yellow;
}

.hidden-value {
    visibility: hidden;
}
</style>
