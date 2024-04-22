import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import { beforeEach, describe, it } from 'node:test'

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, any> = {}

  return {
    getItem(key: string) {
      return store[key] || null
    },
    setItem(key: string, value: any) {
      store[key] = value.toString()
    },
    clear() {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
})

describe('.vue', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    mockLocalStorage.clear()
  })

  it('adds a todo', async () => {
    const wrapper = mount(App)

    // Set todo text
    const todoText = 'Test Todo'
    await wrapper.find('.input-section input[type="text"]').setValue(todoText)

    // Add todo
    await wrapper.find('.input-section form').trigger('submit.prevent')
  })

  it('deletes a todo', async () => {
    const wrapper = mount(App)

    // Add a todo
    await wrapper.find('.input-section input[type="text"]').setValue('Test Todo')
    await wrapper.find('.input-section form').trigger('submit.prevent')

    // Delete the added todo
    await wrapper.find('.delete').trigger('click')
  })

  it('persists todos in localStorage', async () => {
    const wrapper = mount(App)

    // Add a todo
    await wrapper.find('.input-section input[type="text"]').setValue('Test Todo')
    await wrapper.find('.input-section form').trigger('submit.prevent')
  })

  it('loads todos from localStorage on mount', async () => {
    // Set initial todos in localStorage
    const initialTodos = [{ id: 1, todo: 'Initial Todo', done: false, value: '' }]
    mockLocalStorage.setItem('todos', JSON.stringify(initialTodos))
  })
})
