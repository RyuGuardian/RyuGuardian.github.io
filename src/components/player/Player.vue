// --PLAYER
/*** STYLE ***/
<style lang="scss" scoped>

.player {
  display: inline-block;
  position: absolute;
  background-color: green;
}

</style>

/*** HTML ***/
<template>
  <div
    class="player"
    :style="[dimensionsAsStyleObj, positionAsStyleObj]"
  />
</template>

/*** SCRIPT ***/
<script>

export default {
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    position: {
      type: Object,
      required: true
    }
  },

  computed: {
    dimensionsAsStyleObj: function() {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      };
    },
    positionAsStyleObj: function() {
      return {
        left: (this.position.x - (this.width / 2)) + 'px',
        top: (this.position.y - (this.height / 2)) + 'px'
      };
    }
  }
};

</script>
