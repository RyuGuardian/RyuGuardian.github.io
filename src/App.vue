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

    <MsgDisplay ref="msg-display" :deactivate="deactivate"
      :message="message"
      :url="displayLink"
      :image="displayImageUrl"
      :active="activeUrl"
    />
  </div>
</template>

/*** SCRIPT ***/
<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import store from './vuex/store';

import Map from './components/map/Map.vue';
import Player from './components/player/Player.vue';
import MsgDisplay from './components/msg_display/MsgDisplay.vue';

export default {
  components: {
    Map,
    Player,
    MsgDisplay
  },

  computed: Object.assign({},
    mapState(['gravity', 'isPaused']),
    mapState('map', ['terrainLines', 'mapObjects']),
    mapGetters('map', ['getMapWidth', 'getObjectsNearPlayer']),
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
    ]),
    mapState('msgDisplay', ['message', 'displayLink', 'displayImageUrl', 'activeUrl'])
  ),

  mounted: function() {
    console.log('***MODE: ', process.env.MODE);

    // Create array of Block objects for passing to map
    if(!this.mapObjects.Block) {
      fetch('https://codepen.io/AustinAKing/public/feed')
        .then((res) => res.text())
        .then((str) => (new DOMParser()).parseFromString(str, 'text/xml'))
        .then((xmlDoc) => {
          var itemsArr = Array.from(xmlDoc.getElementsByTagName('item')).filter((item) => {
            // Don't include lecture/demo exercises, my css reset, or in-work projects
            return !((/lecture|reset|\(in-work\)/i).test(item.getElementsByTagName('title')[0].textContent));
          });

          var distanceBetween = Math.floor(this.getMapWidth / itemsArr.length);

          // Add data to mapObjects to create blocks on map later
          itemsArr.forEach((item, i) => {
            let title = item.getElementsByTagName('title')[0].textContent;
            let url = item.getElementsByTagName('link')[0].textContent;
            let id = url.split('/').slice(-1)[0];

            this.addMapObject({
              type: 'Block',
              details: {
                id: 'Block__' + id,
                width: 80,
                height: 80,
                position: { x: Math.floor((i + 0.5) * distanceBetween), y: 450 },
                visible: true,
                data: {
                  title,
                  url: url.replace('/pen/', '/details/')    // Included slashes in case 'pen' could be in slug
                    + '?preview_height=800',
                  imageUrl: url + '/image/small.png'
                }
              }
            });
          });
        });
      // End fetch promises
    }

    this.$nextTick(function() {
      if(!this.loop) {
        // Start loop
        this.startLoop(
          setInterval(() => {
            if(this.isPaused === false) {
              this.updatePlayer({ terrain: this.terrainLines, mObjects: this.getObjectsNearPlayer });
            }
          }, 20)
        );
      }
    });
  },

  methods: Object.assign({},
    mapActions(['startLoop', 'pauseLoop']),
    mapActions('map', ['addMapObject', 'activateObject']),
    mapActions('player', ['movePlayerLeft', 'movePlayerRight', 'jumpPlayer', 'updatePlayer']),
    mapActions('msgDisplay', ['changeMessage', 'openLink', 'deactivate'])
  ),

  store
};

</script>
