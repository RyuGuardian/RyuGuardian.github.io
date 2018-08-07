// --MAP
/*** STYLE ***/
<style lang="scss" scoped>

.map {
  background-color: skyblue;
  height: 100%;

  .terrain {
    width: 100%;
    height: 100%;
  }
}

</style>

/*** HTML ***/
<template>
  <div class="map">
    <svg class="terrain" :style="drawTerrain">
      <polygon class="ground" :points="drawTerrain" fill="brown" />
    </svg>
    <slot />
  </div>
</template>

/*** SCRIPT ***/
<script>

export default {
  props: {
    terrain: {
      type: Array,
      required: true
    }
  },

  computed: {
    drawTerrain: function() {
      let lastLine = this.terrain[this.terrain.length - 1];
      let lastPoint = lastLine[lastLine.length - 1];

      return this.terrain.reduce(
        (string, line) => {
          // Join points using commas, and add spaces between points and sets of points
          return string + line.map((point) => point.join(',')).join(' ') + ' ';
        }, '')
        + lastPoint[0] + ',' + window.innerHeight   // Bottom-right point
        + ' 0,' + window.innerHeight;               // Bottom-left point
    }
  }
};

</script>
