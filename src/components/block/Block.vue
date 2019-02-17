/*** STYLE ***/
<style lang="scss" scoped>

.block {
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  background-color: brown;

  a {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    text-decoration: none;
  }

  img {
    width: 100%;
    height: 100%;
  }

  div {
    display: flex;
    align-content: center;

    height: 50%;

    color: white;
    background-color: black;
    border-radius: 5px;

    h5 {
      display: flex;
      font-size: 2.25rem;

      margin: 0 .25rem;
    }
  }
}

</style>

/*** HTML ***/
<template v-if="hasDimensions">
  <div class="block" :style="[dimensionsAsStyleObj, positionAsStyleObj]" >
    <a :href="data.url" target="external">
      <img v-if="data.hostLogo" :src="data.hostLogo" alt="Site Logo">
      <div v-else>
        <h5>{{ data.blockText }}</h5>
      </div>
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
