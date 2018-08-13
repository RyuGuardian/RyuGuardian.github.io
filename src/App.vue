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
      @keydown.jump="jumpPlayer"
    />

    <Map ref="map"
      :terrain="terrainLines"
      :objects="mapObjects"
    >
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
    mapState('map', ['terrainLines', 'mapObjects']),
    mapGetters('map', ['getMapWidth']),
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
    mapGetters('player', [
      'getPlayerLeftX',
      'getPlayerRightX',
      'getPlayerTopY',
      'getPlayerBottomY'
    ])
  ),

  mounted: function() {
    // Create array of Block objects for passing to map
    if(!this.mapObjects.Block) {
      fetch('https://codepen.io/AustinAKing/public/feed')
        .then((res) => res.text())
        .then((str) => (new DOMParser()).parseFromString(str, 'text/xml'))
        .then((xmlDoc) => {
          // Add data to mapObjects to create blocks on map later
          Array.from(xmlDoc.getElementsByTagName('item')).forEach((item) => {
            let title = item.getElementsByTagName('title')[0].textContent;

            // Don't include lecture/demo exercises, my css reset, or in-work projects
            if((/lecture|demo|reset|\(in-work\)/i).test(title) === false) {
              let url = item.getElementsByTagName('link')[0].textContent;
              let id = url.split('/').slice(-1)[0];

              this.addMapObject({
                type: 'Block',
                data: {
                  id,
                  url,
                  title
                }
              });
            }
          });
        });
    }

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
    mapActions('map', ['addMapObject']),
    mapActions('player', ['movePlayerLeft', 'movePlayerRight', 'jumpPlayer', 'updatePlayer'])
  ),

  store
};

</script>
