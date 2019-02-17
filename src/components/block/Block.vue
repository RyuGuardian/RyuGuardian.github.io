/*** STYLE ***/
<style lang="scss" scoped>

.block {
  display: inline-block;
  position: absolute;
  background-color: brown;

  img {
    width: 100%;
    height: 100%;
  }
}

</style>

/*** HTML ***/
<template v-if="hasDimensions">
  <div class="block" :style="[dimensionsAsStyleObj, positionAsStyleObj]" >
    <a :href="data.url" target="external">
      <img :src="data.hostLogo" alt="CodePen Logo">
    </a>
  </div>
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
    activated: { type: Boolean, default: false },
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

  watch: {
    activated: function(newVal) {
      if(newVal === true) {
        this.$el.getElementsByTagName('a')[0].click();
      }
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
