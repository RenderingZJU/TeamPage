<template>
  <div class="home-container">
    <!-- Section 1: Introduction -->
    <section class="intro-section">
      <p>
        The <strong>Advanced Rendering and Creativity (ARC) Group</strong> is a research group in the State Key Lab of
        CAD&CG at Zhejiang University, currently led by Prof. <a href="http://www.cad.zju.edu.cn/home/huo/">Yuchi
          Huo</a>.
        It is originated from <strong>ZJU Rendering Group</strong> led by Prof. <a
          href="http://www.cad.zju.edu.cn/home/rwang/">Rui Wang</a>.
      </p>
      <p>
        We develop <em>rendering algorithms</em> that simulate light to produce realistic images of virtual worlds, as
        well
        as <em>inverse rendering algorithms</em> that reconstruct 3D scenes from images. Our goal is to build a
        comprehensive
        architecture for the next-generation AI-native graphics pipeline. We disseminate our work through open-source
        projects,
        top-tier publications, and industrial applications.
      </p>
    </section>

    <!-- Section 2: Topics / Research Areas -->
    <section class="topics-section">
      <h2 class="section-title">Topics</h2>
      <el-row :gutter="30">
        <el-col v-for="topic in topics" :key="topic.title" :xs="24" :sm="12" :md="8">
          <el-card shadow="hover" class="topic-card">
            <div class="topic-image-container">
              <el-image v-for="(img, index) in topic.images" :key="index" :src="img" fit="cover" class="topic-image"
                lazy>
                <template #placeholder>
                  <BlurhashImage v-if="topicBlurhashesMap[img]" :blurhash="topicBlurhashesMap[img]"
                    :aspectRatio="16 / 9" />
                  <div v-else class="image-slot">Loading...</div>
                </template>
              </el-image>
            </div>
            <div class="topic-content">
              <h3 class="topic-title">{{ topic.title }}</h3>
              <p>{{ topic.description }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </section>
    <!-- Sections 3: News & Contacts -->
    <section class="news-contacts-section">
      <el-row :gutter="40">
        <!-- News Column -->
        <el-col :xs="24" :md="12">
          <h2 class="section-title">News</h2>
          <div class="news-list">
            <div v-for="(item, index) in newsItems" :key="index" class="news-item">
              <div>
                <p class="news-date">{{ item.date }}</p>
                <p class="news-description" v-html="item.description"></p>
              </div>
            </div>
          </div>
        </el-col>

        <!-- Contacts Column -->
        <el-col :xs="24" :md="12">
          <h2 class="section-title">Contacts</h2>
          <div class="contacts-list">
            <div v-for="(contact, index) in contacts" :key="index" class="contact-item">
              <div class="contact-details">
                <p v-if="contact.email" class="contact-email">
                  <strong>Email:</strong> <a :href="'mailto:' + contact.email">{{ contact.email }}</a>
                </p>
                <p v-if="contact.office" class="contact-office">
                  <strong>Office:</strong> {{ contact.office }}
                </p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BlurhashImage from '@/components/BlurhashImage.vue'
import topicBlurhashes from '@/assets/topic-blurhashes.json'
const topicBlurhashesMap: Record<string, string> = topicBlurhashes as Record<string, string>

const topics = ref([
  {
    title: 'Global & Neural Rendering',
    description: 'We develop algorithms that simulate light transport in complex scenes, including global illumination and neural rendering techniques that leverage deep learning for enhanced realism.',
    images: ['/topic-teasers/dualband.webp']
  },
  {
    title: 'High-performance Rendering',
    description: 'We create high-performance rendering algorithms that optimize the rendering process for real-time applications, including ray tracing and rasterization techniques.',
    images: ['/topic-teasers/streaming.webp']
  },
  {
    title: 'Generative & Inverse Rendering',
    description: 'We focus on generative models for rendering and inverse rendering techniques that reconstruct 3D scenes from images, enabling applications in computer vision and graphics.',
    images: ['/topic-teasers/icn.webp']
  }
]);

const newsItems = ref([
  {
    date: '25 June 2025',
    description: 'Two new papers accepted at <strong>ICCV 2025</strong>.'
  },
  {
    date: '23 May 2025',
    description: 'Three new papers accepted at <strong>SIGGRAPH 2025</strong>.'
  },
  {
    date: '12 March 2025',
    description: 'One paper accepted at <strong>Transactions on Graphics</strong>.'
  }
]);

const contacts = ref([
  {
    email: 'arc.rendering.group@gmail.com',
    office: 'Meng Minwei Building, Zijingang Campus, Zhejiang University'
  }
]);
</script>

<style scoped>
strong {
  font-weight: 600;
}

.group-image {
  width: 100%;
  height: 700px;
  object-fit: cover;
  border-radius: 8px;
}

.home-container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 20px;
}

/* --- Section Title General Style --- */
.section-title {
  font-family: "Oswald", sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--el-border-color-light);
  color: var(--el-text-color-primary);
}

/* --- Intro Section --- */
.intro-section {
  margin-bottom: 30px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--el-text-color-primary);
}

.intro-section p {
  margin-bottom: 1em;
}

/* --- Topics Section --- */
.topics-section {
  margin-bottom: 20px;
}

.topic-card {
  margin-bottom: 30px;
  border: none;
  --el-card-padding: 0;
  /* Remove default card padding */
}

.topic-image-container {
  display: flex;
  gap: 4px;
  /* A small gap between images if there are two */
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

/* --- News & Contacts Section --- */
.news-contacts-section {
  margin-bottom: 20px;
}

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
  flex-shrink: 0;
  /* Prevent image from shrinking */
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

/* --- Contacts Section --- */
.contact-item {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.contact-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.contact-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin: 0 0 5px 0;
}

.contact-title {
  font-size: 0.9rem;
  color: var(--el-text-color-regular);
  margin: 0 0 15px 0;
  font-style: italic;
}

.contact-details p {
  font-size: 1.1rem;
  line-height: 1.5;
  color: var(--el-text-color-regular);
  margin: 0 0 5px 0;
}

.contact-details a {
  color: var(--el-color-primary);
  text-decoration: none;
  transition: opacity 0.3s;
}

.contact-details a:hover {
  opacity: 0.8;
}

/* --- Responsive Adjustments --- */
@media (max-width: 768px) {
  .news-item {
    flex-direction: column;
    /* Stack image on top of text on mobile */
    align-items: flex-start;
  }

  .news-contacts-section .el-col {
    margin-bottom: 40px;
  }

  .news-contacts-section .el-col:last-child {
    margin-bottom: 0;
  }
}
</style>
