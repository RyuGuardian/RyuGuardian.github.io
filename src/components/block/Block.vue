/*** STYLE ***/
<style lang="scss" scoped>

.block {
  display: inline-block;
  position: absolute;
  background-color: brown;
}

</style>

/*** HTML ***/
<template v-if="hasDimensions">
  <div class="block" :style="[dimensionsAsStyleObj, positionAsStyleObj]" ><slot /></div>
</template>

/*** SCRIPT ***/
<script>

export default {
  props: {
    id: { type: String, required: true },
    width: { type: Number, default: 80 },
    height: { type: Number, default: 80 },
    position: { type: Object, required: true },
    visible: { type: Boolean, default: true },
    data: { type: Object, default: null }
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
  },

  methods: {
    hasDimensions: function() {
      return (
        this.position.x !== null
        && this.position.y !== null
        && this.width > 0
        && this.height > 0
      );
    }
  }
};

</script>
