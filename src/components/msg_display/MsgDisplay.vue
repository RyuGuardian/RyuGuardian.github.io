/*** STYLE ***/
<style lang="scss" scoped>

.message-display {
  font-size: 2em;
  font-weight: bold;

  width: calc(96vw - 20px);
  min-width: 780px;
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
  align-content: center;

  /deep/ div {
    display: inherit;
  }

  /deep/ .message {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;

    h1, h2, h5, p {
      font-size: inherit;
    }

    .spacer {
      height: 0.75rem;
    }

    div {
      display: block;
      width: 100%;

      div {
        display: flex;
        justify-content: space-around;

        h5 {
          margin: 5px 0;
          color: blue;
        }
      }

      h1 {
        text-align: center;
        margin: 15px 0;
      }

      p {
        margin: 0;

        strong {
          color: red;
        }
      }
    }

    h2 {
      margin: auto;
      padding-right: 20px;
      padding-left: 20px;
    }

  }

  /deep/ .visual {
    flex: 1;

    iframe {
      width: 100%;
      height: 100%;
    }
  }
}

</style>

/*** HTML ***/
<template>
  <div class="message-display">
    <div v-if="htmlMessage" class="message" v-html="htmlMessage" />
    <div v-if="msgBoxResourceHtml" class="visual" v-html="msgBoxResourceHtml" />
  </div>
</template>

/*** SCRIPT ***/
<script>

export default {
  props: {
    htmlMessage: {
      type: String,
      default: ''
    },
    msgBoxResourceHtml: {
      type: String,
      default: ''
    }
  }
};

</script>
