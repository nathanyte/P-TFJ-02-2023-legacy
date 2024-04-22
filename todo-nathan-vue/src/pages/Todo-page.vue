<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { TodoProps } from '../types/mainType'

const todos = ref<TodoProps[]>([])
const text = ref('')

let id = 0

function addTodo() {
  if (text.value.trim() === '') {
    return
  }

  todos.value.unshift({
    todo: text.value,
    done: false,
    id: id
  })

  text.value = ''
  id++
}

function deleteTodo(todo: TodoProps) {
  const index = todos.value.findIndex(item => item.id === todo.id);
  if (index !== -1) {
    todos.value.splice(index, 1);
  }
}

watch(
  todos,
  (todosValue) => {
    localStorage.setItem('todos', JSON.stringify(todosValue))
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
  <div class="app">
    <section class="greeting">
      <h3 class="title">ToDo Application from Nathan</h3>
    </section>
    <div class="input-section">
      <section class="create-todo">
        <form @submit.prevent="addTodo">
          <h3>What do you plan on doing?</h3>
          <div class="todo-input">
            <input type="text" placeholder="e.g. hire Nathan :)" v-model="text" />
          </div>
          <div class="add-button">
            <input type="submit" value="Add todo" />
          </div>
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
  </div>
    <div class="effect-app">
  </div>
</template>

<style scoped>

.title {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  margin-bottom: 3rem;
}

.todo-input {
  display: flex;
  width: 100%;
  justify-content: center;
}

.add-button {
  display: flex;
  justify-content: center;
}

.app {
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'montserrat', sans-serif;
}

.effect-app {
  position: absolute;
  display: flex;
  background-color: aquamarine; /* Flash color */
  opacity: 0;
  animation: thunderAnim 0.5s linear forwards;
}

@keyframes thunderAnim {
    0% {
      opacity: 1;
      transform: translateY(-100%);
    }
    100% {
      opacity: 0;
      transform: translateY(100%);
    }
  }

input:not([type='radio']):not([type='checkbox']),
button {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  cursor: initial;
}

form {
  justify-items: center;
}

h3 {
  color: black;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
}

h4 {
  color: black;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.input-section {
  display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.create-todo {
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
  justify-content: center;
  align-items: center;
}

.create-todo input[type='text'] {
  font-size: 1.125rem;
  padding: 1rem 1.5rem;
  background-color: whitesmoke;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  margin-top: 1rem;
}


input[type='checkbox'] {
  margin-top: 8px;
  height: 25px;
  width: 25px;
}

input:checked ~ .bubble::after {
  width: 10px;
  height: 10px;
  opacity: 1;
}


.create-todo input[type='submit'] {
  font-size: 1.125rem;
  padding: 1rem 3rem;
  color: #fff;
  background-color: rgb(35, 82, 35);
  border-radius: 0.5rem;
  cursor: pointer;
}

.todo-list .todo-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #0a0f29;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
  margin-bottom: 1rem;
}

.todo-item label {
  margin-right: 1rem;
  cursor: pointer;
}

.todo-item .todo-content input {
  color: white;
  font-size: 1.125rem;
}

.todo-item .actions button {
  padding: 0.5rem;
  border-radius: 0.25rem;
  color: #fff;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.todo-item .actions button:hover {
  opacity: 0.75;
}

.todo-item .actions .edit {
  margin-right: 0.5rem;
  background-color: var(--primary);
}

.todo-item .actions .delete {
  background-color: var(--danger);
}

.todo-item.done .todo-content input {
  text-decoration: line-through;
  color: rgba(165, 165, 165, 0.752);
}

.input-section {
  justify-content: center;
  display: flex;
  align-items: center;
}

</style>
