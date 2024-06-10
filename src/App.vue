<template>
  <div id="app" class="container">
    <h1>Daftar Tugas</h1>
    <div class="input-group">
      <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Tambahkan tugas baru" class="input"/>
      <button @click="addTodo" class="add-button">Tambah</button>
    </div>
    <ul class="todo-list">
      <li v-for="(todo, index) in todos" :key="index" class="todo-item">
        <input type="checkbox" :checked="todo.completed" @change="toggleTodo(index)" class="checkbox"/>
        <span :class="{ completed: todo.completed }" class="todo-text">{{ todo.text }}</span>
        <button @click="removeTodo(index)" class="delete-button">Hapus</button>
      </li>
    </ul>
    <p class="task-stats">Total Tugas: {{ totalTodos }}</p>
    <p class="task-stats">Tugas Selesai: {{ completedTodos }}</p>
    <p class="task-stats">Tugas Belum Selesai: {{ incompleteTodos }}</p>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useTodoStore } from './stores/todoStore'

export default {
  setup() {
    const newTodo = ref('')
    const todoStore = useTodoStore()

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todoStore.addTodo(newTodo.value)
        newTodo.value = ''
      }
    }

    const removeTodo = (index) => {
      todoStore.removeTodo(index)
    }

    const toggleTodo = (index) => {
      todoStore.toggleTodo(index)
    }

    const todos = computed(() => todoStore.todos)
    const incompleteTodos = computed(() => todoStore.incompleteTodos)
    const totalTodos = computed(() => todoStore.totalTodos)
    const completedTodos = computed(() => todoStore.completedTodos)

    return {
      newTodo,
      todos,
      addTodo,
      removeTodo,
      toggleTodo,
      incompleteTodos,
      totalTodos,
      completedTodos
    }
  }
}
</script>

<style>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f952;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

.input-group {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.input {
  flex: 1;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.add-button {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #8c98b8;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.add-button:hover {
  background-color: #828fb1;
}

.todo-list {
  list-style: none;
  padding: 0;
  max-height: 200px; /* Adjust height to fit approximately 5 items */
  overflow-y: auto; /* Add vertical scroll */
  border: 1px solid #ccc; /* Optional: Add border to visually indicate the scroll area */
  border-radius: 4px;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.todo-item:last-child {
  border-bottom: none;
}

.checkbox {
  margin-right: 10px;
}

.todo-text {
  flex: 1;
  font-size: 16px;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.delete-button {
  padding: 5px 10px;
  background-color: #81c0ce;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.delete-button:hover {
  background-color:#70b1bf;
}

.task-stats {
  text-align: center;
  margin-top: 10px;
  font-size: 18px;
  color: #333;
}
</style>
