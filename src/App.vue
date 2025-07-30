<template>
  <el-container class="layout-container">
    <el-header>
      <div class="header-content">
        <a href="/" class="logo">
          <div class="logo-title-full hidden-xs-only">
            A<span class="sub">dvanced</span> R<span class="sub">endering &</span> C<span class="sub">omputation</span>
            Group
          </div>
          <div class="logo-title-short hidden-sm-and-up">
            ARC Group
          </div>
        </a>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" router>
          <el-menu-item class="navigator-item" index="/">Home</el-menu-item>
          <el-menu-item class="navigator-item" index="/publications">Publications</el-menu-item>
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
import 'element-plus/theme-chalk/display.css'

// Dark mode toggle (useDark automatically handles the toggle)
const isDark = useDark()

// Router active state
const route = useRoute()

// --- 2. CHANGE 'ref' TO 'computed' ---
// This will now automatically update whenever route.path changes
const activeIndex = computed(() => route.path)
</script>

<style scoped>
.logo {
  color: unset;
  background-color: unset;
  text-decoration: unset;
}

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
  font-family: 'Oswald', sans-serif;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-title-short {
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--el-text-color-primary);
}

.logo-title-full {
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--el-text-color-primary);
}

.logo-title-full .sub {
  font-weight: 400;
  color: var(--el-text-color-secondary);
}

.navigator-item {
  font-size: 1.3rem !important;
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
