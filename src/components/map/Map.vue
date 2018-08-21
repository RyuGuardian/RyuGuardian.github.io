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
    <svg class="terrain">
      <polygon class="ground" :points="stringifyTerrainPointsForPolygon" fill="darkgoldenrod" />
    </svg>

    <component :is="obj.name" v-for="obj in mapObjectsAsArray" :key="obj.id"
      :id="obj.id"
      :width="obj.width"
      :height="obj.height"
      :position="obj.position"
      :visible="obj.visible"
      :activated="obj.activated"
      :data="obj.data"
    />

    <slot />  <!-- Default slot is for player -->
  </div>
</template>

/*** SCRIPT ***/
<script>
import Block from '../block/Block.vue';

export default {
  components: {
    Block
  },

  props: {
    terrain: {
      type: Array,
      required: true
    },
    objects: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    stringifyTerrainPointsForPolygon: function() {
      var lastLine = this.terrain[this.terrain.length - 1];
      var lastPoint = lastLine[lastLine.length - 1];

      return this.terrain.reduce(
        (string, line) => {
          // Join points using commas, and add spaces between points and sets of points
          return string + line.map((point) => point.join(',')).join(' ') + ' ';
        }, '')
        + lastPoint[0] + ',' + window.innerHeight   // Bottom-right point
        + ' 0,' + window.innerHeight;               // Bottom-left point
    },
    mapObjectsAsArray: function() {
      var componentArr = [];
      var componentTypes = Object.keys(this.objects);

      if(componentTypes.length) {
        componentTypes.forEach((type) => {            // Iterate through types via key
          let distanceBetween = Math.floor(this.$store.getters['map/getMapWidth'] / this.objects[type].length);

          // Give objects needed props and add to array
          this.objects[type].forEach((mObj, i) => {   // Iterate through individual objects of type
            componentArr.push({
              // Each mObj needs and should have: type, id, width, height, position, visible
              name: type,
              id: mObj.id || (i + Math.floor(Math.random() * 10000).toFixed()),
              width: (mObj.width > 0) ? mObj.width : 50,
              height: (mObj.height > 0) ? mObj.height : 50,
              position: (mObj.position && mObj.position.x !== undefined && mObj.position.y !== undefined) ?
                mObj.position : { x: mObj.position.x || Math.floor((i + 0.5) * distanceBetween), y: mObj.position.y || 350 },
              visible: mObj.visible !== undefined ? mObj.visible : true,
              activated: mObj.activated !== undefined ? mObj.activated : null,
              data: mObj.data !== undefined ? mObj.data : null
            });
          });
        });
      }

      return componentArr;
    }
  }
};

</script>
