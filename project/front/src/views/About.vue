<template>
  <div id="app">
    <ol>
      <li v-for="msg in ch1">{{ msg.message }}</li>
    </ol>
    <button v-on:click="push">push</button>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      ch1: this.$pnGetMessage('ch1', this.receptor),
    }
  },
  methods: {
    receptor(msg) {
      msg.message = `sent - ${msg.message}`;
    },
    push() {
      this.$pnPublish({ channel: 'ch1', message: Date.now() }, (status, response) => console.log(status, response));
    },
  },
  mounted() {
    this.$pnSubscribe({ channels: ['ch1', 'ch2'], withPresence: true });
  },
};
</script>
