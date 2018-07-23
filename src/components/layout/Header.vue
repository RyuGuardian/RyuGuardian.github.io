<style lang="scss" scoped>
  header {
    h1 {
      color: black;
    }
  }
</style>

<template>
  <header>
    <h1>{{ message }}</h1>
  </header>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'This is Vue.'
    }
  }
};
</script>
