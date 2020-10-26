<template>
  <div>
    <transition
      mode="out-in"
      :duration="{ enter: 400, leave: 400 }"
      leave-active-class="animated zoomOut"
      enter-active-class="animated fadeIn"
    >
      <template v-if="$route.name === 'dealer'">
        <template>
          <todo-list></todo-list>
        </template>
      </template>
      <template v-else>
        <router-view></router-view>
      </template>
    </transition>
  </div>
</template>
<script>
import todoList from './list';

export default {
  components: {
    todoList,
  },
  props: {},
  data() {
    return {};
  },
  computed: {
  },
  async mounted() {},
  methods: {},
};
</script>
<style lang="scss"></style>
