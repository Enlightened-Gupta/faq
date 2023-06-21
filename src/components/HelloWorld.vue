<template>
  <div class="hello">
    <faq-model></faq-model>
    <faq-list></faq-list>
  </div>
</template>

<script>
import FaqList from './FaqList.vue'
import FaqModel from './FaqModel.vue'
export default {
  components: { FaqModel, FaqList },
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
