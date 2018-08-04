/*** HTML ***/
<template>
  <GlobalEvents
    @keydown.move="movePlayer"
  />
</template>

/*** SCRIPT ***/
<script>
import Vue from 'vue';

import playerControls from './components/player/controls';

Vue.component(GlobalEvents);

Vue.config.keyCodes = Object.assign({}, playerControls);

export default {

}

</script>
