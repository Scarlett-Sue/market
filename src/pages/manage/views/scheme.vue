<template>
  <div class="scheme">
    <transition
      mode="out-in"
      :duration="{ enter: 400, leave: 400 }"
      leave-active-class="animated zoomOut"
      enter-active-class="animated fadeIn"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss"></style>
