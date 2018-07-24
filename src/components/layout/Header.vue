<style lang="scss" scoped>
  header {
    h1 {
      color: black;
    }
  }
</style>

<template>
  <header>
    <h1>{{ msg }}</h1>
  </header>
</template>

<script>
import store from '../../vuex/store';

export default {
  props: {
    message: {
      type: String,
      default: 'This is Vue.'
    }
  },
  store,
  computed: {
    msg() { return this.$store.state.msg; }
  }
};
</script>
