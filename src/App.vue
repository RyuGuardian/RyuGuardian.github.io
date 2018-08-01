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
      @keydown.move="movePlayer"
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
  computed: mapGetters('player', ['getPlayerPosition']),
  methods: mapActions('player', ['movePlayer']),
  store
};

</script>
