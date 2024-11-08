<script>
import { mapState } from "vuex";

import Vertical from "./vertical";
import Horizontal from "./horizontal";

export default {
  components: {
    Vertical,
    Horizontal,
  },
  computed: mapState(["layout"]),
  mounted() {
    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
    document.body.classList.remove("authentication-bg");
  },
};
</script>

<template>
  <div>
      <notifications/>
    <!-- Begin page -->
    <Vertical
      v-if="layout.layoutType === 'vertical'"
      :layout="layout.layoutType"
    >
      <Nuxt />
    </Vertical>
    <!-- END layout-wrapper -->

    <Horizontal
      v-if="layout.layoutType === 'horizontal'"
      :layout="layout.layoutType"
    >
      <Nuxt />
    </Horizontal>
  </div>
</template>
