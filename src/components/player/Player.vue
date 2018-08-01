/*** STYLE ***/
<style lang="scss" scoped>

.player {
  display: inline-block;
  position: absolute;

  background-color: green;
  width: 100px;
  height: 100px;
}

</style>

/*** HTML ***/
<template>
  <div
    class="player"
    :style="positionAsStyleObj"
  />
</template>

/*** SCRIPT ***/
<script>

export default {
  props: {
    position: {
      type: Array,
      required: true
    }
  },
  computed: {
    positionAsStyleObj: function() {
      return {
        left: this.position[0] + 'px',
        top: this.position[1] + 'px'
      };
    }
  }
};

</script>
