<template>
  <div id="app">
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>
<script>
import "./assets/styles/test.css";
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import Todo from "./components/todo.vue";
export default {
  components: {
    Header,
    Footer,
    Todo,
  },
};
</script>
