// --APP
/*** STYLE ***/
<style lang="scss" scoped>

.app {
  height: 100%;
}

</style>

/*** HTML ***/
<template>
  <div class="app" :style="{ width: getMapWidth + 'px' }">
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

    <MsgDisplay ref="msg-display"
      :html-message="htmlMessage"
      :msg-box-resource-html="msgBoxResourceHtml"
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
    mapState(['gravity', 'isPaused', 'logos']),
    mapState('map', ['terrainLines', 'mapObjects']),
    mapGetters('map', ['getMapLeftAndRight', 'getMapWidth', 'getActivatedObjects', 'getObjectsNearPlayer']),
    mapState('viewport', ['viewPosition', 'viewDimensions']),
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
    mapState('msgDisplay', ['htmlMessage', 'msgBoxResourceHtml'])
  ),

  mounted: function() {
    // Create array of Block objects for passing to map
    if(!this.mapObjects.Block) {
      fetch('https://codepen.io/AustinAKing/public/feed')
        .then((res) => res.text())
        .then((str) => (new DOMParser()).parseFromString(str, 'text/xml'))
        .then((xmlDoc) => {
          var type = 'Block';
          var itemsArr = Array.from(xmlDoc.getElementsByTagName('item')).filter((item) => {
            // Don't include lecture/demo exercises, my css reset, or in-work projects
            return !((/lecture|reset|\(in-work\)/i).test(item.getElementsByTagName('title')[0].textContent));
          });

          var distanceBetween = Math.floor(this.getMapWidth / itemsArr.length);

          // Add data to mapObjects to create blocks on map later
          itemsArr.forEach((item, i) => {
            let title = item.getElementsByTagName('title')[0].textContent;
            let url = item.getElementsByTagName('link')[0].textContent;
            let id = url.split('/').slice(-1)[0];   // ID = SLUG
            url = url.replace('/pen/', '/details/') + '?preview_height=600';   // Included replacing slashes in case "pen" could be in slug

            this.addMapObject({
              type,
              details: {
                id: `${type}__${id}`,
                width: 80,
                height: 80,
                position: { x: Math.floor((i + 0.5) * distanceBetween), y: 450 },
                visible: true,
                activated: false,
                data: {
                  title,
                  url,
                  resourceHtml:
                  `<iframe
                    scrolling="no"
                    title="${title}"
                    src="//codepen.io/AustinAKing/embed/${id}/?theme-id=0&default-tab=result&embed-version=2"
                    frameborder="no"
                    allowtransparency="true"
                    allowfullscreen="true"
                    style="width: 100%;"
                  >
                    (Pen failed to load.)
                    <a href="${url}">
                      See the Pen on CodePen.
                    </a>
                  </iframe>`,
                  hostLogo: this.logos.codepen
                }
              }
            });
          });
        });
      // End fetch promises
    }

    if(this.viewDimensions.width !== window.innerWidth
      || this.viewDimensions.height !== window.innerHeight
    ) {
      this.transformViewport({ width: window.innerWidth, height: window.innerHeight });
    }

    this.$nextTick(function() {
      if(!this.loop) {
        // Start loop
        this.startLoop(
          setInterval(() => {
            if(this.isPaused === false) {
              this.updatePlayer({ terrain: this.terrainLines, mObjects: this.getObjectsNearPlayer });
              this.updateViewport();
              window.scroll(this.viewPosition.x, this.viewPosition.y);
            }
          }, 20)
        );
      }
    });
  },

  methods: Object.assign({},
    mapActions(['startLoop', 'pauseLoop']),
    mapActions('map', ['addMapObject', 'activateObject']),
    mapActions('viewport', ['moveViewport', 'updateViewport', 'transformViewport']),
    mapActions('player', ['movePlayerLeft', 'movePlayerRight', 'jumpPlayer', 'updatePlayer']),
    mapActions('msgDisplay', ['changeMessage'])
  ),

  store
};

</script>
