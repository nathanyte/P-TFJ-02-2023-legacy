<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
        <div>
          <div>
            <h3>Login</h3>
            <hr />
          </div>
        </div>
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input v-model="form.email" type="text" class="form-control">
          </div>
          <div class="form-group mb-4">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input v-model="form.password" type="password" class="form-control">
          </div>
          <div class="test-danger my-2">{{ userStore.state.error }}</div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import { defineComponent, reactive } from 'vue'
import userStore from '@/store/user'

export default defineComponent({
  setup() {
    const form = reactive({
      email: '',
      password: ''
    })

    const onSubmit = () => {
      userStore.login(form.email, form.password)
      form.email = ''
      form.password = ''
    }
    console.log(form)
    return { form, onSubmit, userStore}
  }

});
</script>