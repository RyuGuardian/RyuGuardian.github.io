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

export default {
  props: {
    msg: {
      type: String,
      default: 'This is Vue.'
    }
  }
};
</script>
