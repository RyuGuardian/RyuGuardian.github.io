// --APP
/*** STYLE ***/
<style lang="scss" scoped>

.app {
  height: 100%;
}

</style>

/*** HTML ***/
<template>
  <div class="app">
    <GlobalEvents
      @keydown.esc="pauseLoop"
      @keydown.left="movePlayerLeft"    @keyup.left="movePlayerRight"
      @keydown.right="movePlayerRight"  @keyup.right="movePlayerLeft"
    />

    <Map ref="map"
      :terrain="terrainLines">
      <Player ref="player"
        :width="width"
        :height="height"
        :position="position"
      />
    </Map>
  </div>
</template>

/*** SCRIPT ***/
<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import store from './vuex/store';

import Map from './components/map/Map.vue';
import Player from './components/player/Player.vue';

export default {
  components: {
    Map,
    Player
  },

  computed: Object.assign({},
    mapState(['gravity', 'isPaused']),
    mapState('map', ['terrainLines']),
    mapState('player', [
      'width',
      'height',
      'position',
      'movementDirection',
      'movementSpeed',
      'onGround',
      'jumpStrength',
      'fallSpeed'
    ]),
    mapGetters('player', ['getPlayerBottomY'])
  ),

  mounted: function() {
    this.$nextTick(function() {
      // Start loop
      this.startLoop(
        setInterval(() => {
          if(this.isPaused === false) {
            this.updatePlayer({ terrain: this.terrainLines });
          }
        }, 20)
      );
    });
  },

  methods: Object.assign({},
    mapActions(['startLoop', 'pauseLoop']),
    mapActions('player', ['movePlayerLeft', 'movePlayerRight', 'updatePlayerOnGround', 'updatePlayer'])
  ),

  store
};

</script>
