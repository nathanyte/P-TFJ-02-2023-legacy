<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
        <div>
          <div>
            <h3>Do you really want to logout</h3>
            <hr />
          </div>
        </div>
        <form @submit.prevent="onSubmit">
          <button type="submit" class="btn btn-primary">Yes, I do</button>
        </form>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import { defineComponent } from 'vue'
import userStore from '@/store/user'
import router from '@/router';

export default defineComponent({
  setup() {

    const onSubmit = () => {
      userStore.logout()
      router.push('/')
    }
    return { onSubmit }
  }

});
</script>