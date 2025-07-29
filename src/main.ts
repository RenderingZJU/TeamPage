import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// Import Element Plus Dark Mode CSS
import 'element-plus/theme-chalk/dark/css-vars.css'
// Import all Element Plus icons
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import './assets/main.css'

const app = createApp(App)

// Register all icons globally
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(ElementPlus)

app.mount('#app')
