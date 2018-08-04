/*** STYLE ***/
<style lang="scss" scoped>

.app {
  background-color: lightblue;
}

</style>

/*** HTML ***/
<template>
  <div class="app">
    <GlobalEvents
      @keydown.left="movePlayerLeft"    @keyup.left="movePlayerRight"
      @keydown.right="movePlayerRight"  @keyup.right="movePlayerLeft"
    />
    <Header msg="Prop passed from App." />
    <Player ref="player" :position="getPlayerPosition" />
  </div>
</template>

/*** SCRIPT ***/
<script>
import { mapGetters, mapActions } from 'vuex';

import store from './vuex/store';

import Header from './components/layout/Header.vue';
import Player from './components/player/Player.vue';

export default {
  components: {
    Header,
    Player
  },
  computed: mapGetters('player', ['getPlayerPosition', 'getPlayerDirection', 'getPlayerSpeed']),
  mounted: function() {
    this.$nextTick(function() {
      // Start loop
      this.startLoop(
        setInterval(() => {
          this.updatePlayer();
        }, 20)
      );
    });
  },
  methods: Object.assign({},
    mapActions(['startLoop']),
    mapActions('player', ['updatePlayer', 'movePlayerLeft', 'movePlayerRight'])
  ),
  store
};

</script>
