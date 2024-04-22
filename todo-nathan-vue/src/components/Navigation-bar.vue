<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Nathan</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div v-if="!userStore.getters.isLoggedIn" class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Login</router-link>
          </li>
        </ul>
      </div>
      <div v-else class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/todo">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/logout">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import userStore from '../store/user'; 

  export default defineComponent({
    setup() {
      onMounted(userStore.getUser)
      return { userStore }
    },
  })
</script>