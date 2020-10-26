<template>
  <el-table :data="tableList" :style="mySyle">
    <column-plus
      v-for="(item, key) in propList"
      v-bind="item"
      :key="key"
    ></column-plus>
  </el-table>
</template>
<script>
import columnPlus from './column-plus';
export default {
  name: 'a-table',
  props: {
    propList: {
      type: Array,
      default: () => [],
    },
    tableList: {
      type: Array,
      default: () => [],
    },
    mySyle: {
      type: Object,
      default: () => ({
        width: '100%',
      }),
    },
  },
  components: {
    columnPlus,
  },
};
</script>
