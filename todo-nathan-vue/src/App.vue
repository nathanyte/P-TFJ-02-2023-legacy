<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { TodoProps } from './types/mainType'
// ref - for state management
// onMounted - to execute a command once the page starts
// computed - for mathematical computing
// watch - an observable which watches for page changes

const todos = ref<TodoProps[]>([])
const text = ref('')

function generateId(): number {
  return Number(Math.random().toString(36).substr(2, 9))
}

function addTodo() {
  if (text.value.trim() === '') {
    return
  }

  todos.value.unshift({
    todo: text.value,
    done: false,
    value: '',
    id: generateId()
  })

  text.value = ''
}

function deleteTodo(todo: TodoProps) {
  todos.value = todos.value.filter((x: TodoProps) => x !== todo)
}

watch(
  todos,
  (newTodoValue) => {
    localStorage.setItem('todos', JSON.stringify(newTodoValue))
  },
  { deep: true }
)

onMounted(() => {
  const storedTodos = localStorage.getItem('todos')
  if (typeof storedTodos === 'string') {
    todos.value = JSON.parse(storedTodos)
  }
})
</script>

<template>
  <main class="app">
    <section class="greeting">
      <h3 class="title">ToDo Application from Nathan</h3>
    </section>
    <div class="input-section">
      <section class="create-todo">
        <form @submit.prevent="addTodo">
          <h3>What do you plan on doing?</h3>
          <input type="text" placeholder="e.g. email your boss" v-model="text" />
          <input type="submit" value="Add todo" />
        </form>
      </section>
    </div>
    <div class="todo-section">
      <section class="todo-list">
        <h2 v-show="todos.length === 0">No Todos Added Yet</h2>
        <div class="list">
          <div :key="todo.id" v-for="todo in todos" :class="`todo-item ${todo.done && 'done'}`">
            <label>
              <input type="checkbox" v-model="todo.done" />
            </label>
            <div class="todo-content">
              <input type="text" v-model="todo.todo" />
            </div>
            <div class="actions">
              <button class="delete" @click="deleteTodo(todo)">Delete</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
