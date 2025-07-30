<template>
  <div class="home-container">
    <el-row :gutter="40">
      <!-- Left Column -->
      <el-col :xs="24" :sm="24" :md="8">
        <div class="left-panel">
          <el-avatar :size="150" src="/logo.svg" style="color: var(--el-color-primary)" />

          <h1 class="team-name">ZJU Render</h1>
          <p class="team-description">Graphics and Rendering Group</p>
          <p class="team-affiliation">
            State Key Lab of CAD&CG, Zhejiang University
          </p>

          <!-- === ICON SECTION UPDATED === -->
          <div class="social-links">
            <a href="mailto:contact@zjurender.com" title="Email">
              <font-awesome-icon :icon="faEnvelope" />
            </a>
            <a href="#" target="_blank" title="Google Scholar">
              <font-awesome-icon :icon="faGraduationCap" />
            </a>
            <a href="#" target="_blank" title="GitHub">
              <font-awesome-icon :icon="faGithub" />
            </a>
          </div>
          <!-- === END OF UPDATE === -->

          <el-divider />

          <h2 class="interests-title">Research Topics</h2>
          <div class="interests-tags">
            <el-tag type="primary" effect="light" size="large" round>Real-time Rendering</el-tag>
            <el-tag type="primary" effect="light" size="large" round>Neural Rendering</el-tag>
            <el-tag type="primary" effect="light" size="large" round>Computational Photography</el-tag>
            <el-tag type="primary" effect="light" size="large" round>Geometry Processing</el-tag>
          </div>
        </div>
      </el-col>

      <!-- Right Column -->
      <el-col :xs="24" :sm="24" :md="16">
        <div class="right-panel">
          <h1 class="main-title">ZJU Render Group</h1>
          <p>
            The ZJU Render Group, part of the State Key Lab of CAD&CG at Zhejiang University, was founded to push the
            boundaries of computer graphics and rendering technologies. Our academic leader is Professor Wei Chen.
          </p>
          <p>
            Our group focuses on the research of <strong>REAL-TIME RENDERING</strong> and <strong>NEURAL
              RENDERING</strong>. The research direction mainly includes: physically-based rendering, differentiable
            rendering, 3D reconstruction, and applications in virtual and augmented reality. Our group members have
            published numerous papers at top-tier conferences and journals, including ACM SIGGRAPH, EUROGRAPHICS, and
            IEEE TVCG.
          </p>
          <p>
            The team works extensively with leading industry partners and research institutions both at home and abroad.
            Our collaborations span across companies like Tencent, Alibaba, and NVIDIA, as well as universities such as
            Stanford University, ETH Zurich, and the University of California, Berkeley.
          </p>
          <p>
            We have developed several open-source projects and contributed to major industry standards. Our goal is to
            bridge the gap between academic research and practical applications, creating next-generation visual
            experiences that are more realistic, immersive, and interactive.
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// === ICONS IMPORTED HERE ===
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEnvelope, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
</script>

<style scoped>
.home-container {
  max-width: 1280px;
  margin: 0 auto;
}

.left-panel {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.team-name {
  font-size: 2rem;
  font-weight: 700;
  margin: 10px 0 0 0;
  color: var(--el-text-color-primary);
}

.team-description {
  font-size: 1.1rem;
  color: var(--el-text-color-secondary);
  margin: 0;
}

.team-affiliation {
  font-size: 1rem;
  color: var(--el-text-color-secondary);
}

.social-links {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.social-links a {
  /* This styling will apply to the Font Awesome icons automatically */
  font-size: 24px;
  color: var(--el-text-color-regular);
  text-decoration: none;
  transition: color 0.3s;
}

.social-links a:hover {
  color: var(--el-color-primary);
}

.interests-title {
  font-size: 1.5rem;
  margin-top: 10px;
  margin-bottom: 15px;
  font-weight: 500;
}

.interests-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.right-panel {
  line-height: 1.8;
}

.right-panel .main-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 25px;
  color: var(--el-text-color-primary);
  border-bottom: 2px solid var(--el-color-primary);
  padding-bottom: 10px;
  display: inline-block;
}

.right-panel p {
  font-size: 1rem;
  margin-bottom: 20px;
  color: var(--el-text-color-primary);
}

/* Responsive adjustments for smaller screens */
@media (max-width: 992px) {
  .left-panel {
    margin-bottom: 40px;
  }
}
</style>
