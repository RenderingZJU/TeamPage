<template>
  <el-container class="layout-container">
    <el-header>
      <div class="header-content">
        <div class="logo-title">
          ZJU Render
        </div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" router>
          <el-menu-item index="/">Home</el-menu-item>
          <el-menu-item index="/publications">Publications</el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
// --- 1. IMPORT 'computed' ---
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useDark } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'

// Dark mode toggle (useDark automatically handles the toggle)
const isDark = useDark()

// Router active state
const route = useRoute()

// --- 2. CHANGE 'ref' TO 'computed' ---
// This will now automatically update whenever route.path changes
const activeIndex = computed(() => route.path)
</script>

<style scoped>
/* Your existing styles are perfect and don't need changes */
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.el-header {
  border-bottom: 1px solid var(--el-border-color);
  height: 60px;
  display: flex;
  align-items: center;
}

.header-content {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--el-text-color-primary);
}

.el-menu-demo {
  flex-grow: 1;
  justify-content: flex-end;
  border-bottom: none;
  background-color: transparent;
}

.dark-mode-switch {
  margin-left: 20px;
  display: flex;
  align-items: center;
}

.el-main {
  padding: 40px 20px;
}
</style>
