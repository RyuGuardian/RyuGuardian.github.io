/*** STYLE ***/
<style lang="scss" scoped>

.display {
  width: calc(96vw - 20px);
  height: 30vh;

  position: fixed;
  left: 2vw;
  top: 20px;

  background-color: rgba(255, 255, 255, 0.5);
  border: 10px solid black;
  border-radius: 15px;

  padding: 5px;

  display: inline-flex;
  justify-content: space-between;

  h1 {
    margin: auto auto auto 0;
    padding-right: 20px;
  }

  a {
    border: 5px solid blue;
    border-radius: 10px;

    img {
      height: 100%;
    }
  }
}

</style>

/*** HTML ***/
<template>
  <div class="display">
    <h1 v-html="message" />
    <a  v-if="image"
      :href="url"
      target="external"
      @click="deactivate"
    >
      <img :src="image" alt="screenshot" title="Clicking will open project in another window/tab.">
    </a>
  </div>
</template>

/*** SCRIPT ***/
<script>

export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    active: {
      type: String,
      default: ''
    },
    deactivate: {
      type: Function,
      default: () => {}
    }
  },

  watch: {
    active: function(newurl, old) {
      this.$el.getElementsByTagName('a')[0].click();
    }
  }
};

</script>
