<template>
  <div class="home-container">
    <!-- Section 1: Introduction -->
    <section class="intro-section">
      <p>
        The <strong>Advanced Rendering and Computation(ARC) Group</strong> is a research group in the State Key Lab of
        CAD&CG at Zhejiang University that focuses on developing cutting-edge algorithms for rendering and computation.
      </p>
      <p>
        We develop <em>rendering algorithms</em> that simulate light to create realistic images of virtual worlds, along
        with <em>inverse rendering algorithms</em> that go the opposite way and reconstruct 3D worlds from images. We
        disseminate our work through open source projects and top-tier publications.
      </p>
    </section>

    <!-- Section 2: Topics / Research Areas -->
    <section class="topics-section">
      <h2 class="section-title">Topics</h2>
      <el-row :gutter="30">
        <el-col v-for="topic in topics" :key="topic.title" :xs="24" :sm="12" :md="8">
          <el-card shadow="hover" class="topic-card">
            <div class="topic-image-container">
              <el-image
                v-for="(img, index) in topic.images"
                :key="index"
                :src="img"
                fit="cover"
                class="topic-image"
                lazy
              />
            </div>
            <div class="topic-content">
              <h3 class="topic-title">{{ topic.title }}</h3>
              <p>{{ topic.description }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </section>

    <!-- Section 3: News -->
    <section class="news-section">
      <h2 class="section-title">News</h2>
      <div class="news-list">
        <div v-for="item in newsItems" :key="item.date" class="news-item">
          <!-- <el-image :src="item.imageUrl" class="news-image" fit="cover" lazy /> -->
          <div class="news-content">
            <p class="news-date">{{ item.date }}</p>
            <p class="news-description" v-html="item.description"></p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const topics = ref([
  {
    title: 'Global & Neural Rendering',
    description: 'We develop algorithms that simulate light transport in complex scenes, including global illumination and neural rendering techniques that leverage deep learning for enhanced realism.',
    images: ['/images/home/topic-diff-render-1.jpg', '/images/home/topic-diff-render-2.jpg']
  },
  {
    title: 'High-performance Rendering',
    description: 'We create high-performance rendering algorithms that optimize the rendering process for real-time applications, including ray tracing and rasterization techniques.',
    images: ['/images/home/topic-realism-1.jpg', '/images/home/topic-realism-2.jpg']
  },
  {
    title: 'Generative & Inverse Rendering',
    description: 'We focus on generative models for rendering and inverse rendering techniques that reconstruct 3D scenes from images, enabling applications in computer vision and graphics.',
    images: ['/images/home/topic-compiler.jpg']
  }
]);

const newsItems = ref([
  {
    date: '28 July 2024',
    description: 'Two new papers accepted at <strong>CVPR 2024</strong>!',
    // imageUrl: '/images/home/news-1.jpg'
  },
  {
    date: '25 November 2023',
    description: 'Three new papers accepted at <strong>SIGGRAPH Asia 2023</strong>!',
    // imageUrl: '/images/home/news-2.jpg'
  }
]);
</script>

<style scoped>
strong {
  font-weight: 600;
}

.home-container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 20px;
}

/* --- Section Title General Style --- */
.section-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--el-border-color-light);
  color: var(--el-text-color-primary);
}

/* --- Intro Section --- */
.intro-section {
  margin-bottom: 60px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--el-text-color-primary);
}

.intro-section p {
  margin-bottom: 1em;
}

/* --- Topics Section --- */
.topics-section {
  margin-bottom: 60px;
}

.topic-card {
  margin-bottom: 30px;
  border: none;
  --el-card-padding: 0; /* Remove default card padding */
}

.topic-image-container {
  display: flex;
  gap: 4px; /* A small gap between images if there are two */
}

.topic-image {
  width: 100%;
  height: 180px;
  display: block;
}

.topic-content {
  padding: 20px;
}

.topic-title {
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--el-text-color-regular);
  margin: 0 0 15px 0;
}

.topic-content p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--el-text-color-primary);
}

/* --- News Section --- */
.news-item {
  display: flex;
  align-items: flex-start;
  gap: 25px;
  margin-bottom: 30px;
}

.news-image {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  flex-shrink: 0; /* Prevent image from shrinking */
  border: 1px solid var(--el-border-color-lighter);
}

.news-date {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--el-text-color-primary);
  margin: 0 0 8px 0;
}

.news-description {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--el-text-color-regular);
}

/* Allow links inside v-html to be styled */
.news-description :deep(a) {
  font-weight: 600;
  color: var(--el-color-primary);
  text-decoration: none;
  transition: opacity 0.3s;
}

.news-description :deep(a:hover) {
  opacity: 0.8;
}


/* --- Responsive Adjustments --- */
@media (max-width: 768px) {
  .news-item {
    flex-direction: column; /* Stack image on top of text on mobile */
    align-items: flex-start;
  }
}
</style>
