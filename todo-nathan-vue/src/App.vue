<template>
    <NavigationBar />
    <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NavigationBar from './components/Navigation-bar.vue'

  export default {
    name: 'App',
    components: {
      NavigationBar,
    },
  }

</script>
