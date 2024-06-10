// src/stores/todoStore.js
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: []
  }),
  actions: {
    addTodo(todo) {
      this.todos.push({ text: todo, completed: false })
    },
    removeTodo(index) {
      this.todos.splice(index, 1)
    },
    toggleTodo(index) {
      this.todos[index].completed = !this.todos[index].completed
    }
  },
  getters: {
    incompleteTodos: (state) => {
      return state.todos.filter(todo => !todo.completed).length
    },
    totalTodos: (state) => {
      return state.todos.length
    },
    completedTodos: (state) => {
      return state.todos.filter(todo => todo.completed).length
    }
  }
})
