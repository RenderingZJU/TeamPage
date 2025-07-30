<template>
  <div class="publications-container">
    <div class="page-header">
      <h1 class="page-title">Publications</h1>
    </div>

    <div class="publications-list">
      <section v-for="[year, papers] in groupedPublications" :key="year" class="year-section">
        <el-divider>
          <h2 class="year-header">{{ year }}</h2>
        </el-divider>

        <el-card v-for="paper in papers" :key="paper.id" class="publication-card" shadow="hover">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="8" :md="6">
              <el-image :src="paper.teaserUrl" fit="cover" class="teaser-image" lazy>
                <template #placeholder>
                  <div class="image-slot">Loading...</div>
                </template>
              </el-image>
            </el-col>

            <el-col :xs="24" :sm="16" :md="18">
              <div class="paper-details">
                <h3 class="paper-title">{{ paper.title }}</h3>

                <p class="authors" v-html="formatAuthors(paper.authors)"></p>
                <p class="venue">
                  <em>{{ paper.venue }}</em>
                </p>

                <div class="links">
                  <a v-if="paper.links.paper" :href="paper.links.paper" target="_blank" class="link-pill">
                    <font-awesome-icon :icon="faFilePdf" /> Paper
                  </a>
                  <a v-if="paper.links.project" :href="paper.links.project" target="_blank" class="link-pill">
                    <font-awesome-icon :icon="faGlobe" /> Project
                  </a>
                  <a v-if="paper.links.code" :href="paper.links.code" target="_blank" class="link-pill">
                    <font-awesome-icon :icon="faGithub" /> Code
                  </a>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import publicationsData from '@/assets/publications.json'

// --- Import FontAwesome Icons ---
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFilePdf, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

// --- Type Definition and Data Processing (remains the same) ---
type Publication = (typeof publicationsData)[number];
const publications: Publication[] = [...publicationsData].sort((a, b) => b.year - a.year || b.id - a.id);

const groupedPublications = computed(() => {
  const groups = new Map<number, Publication[]>();
  for (const paper of publications) {
    if (!groups.has(paper.year)) {
      groups.set(paper.year, []);
    }
    groups.get(paper.year)?.push(paper);
  }
  return groups;
});

const formatAuthors = (authors: string[]): string => {
  // Example of highlighting a specific author
  return authors.map(author =>
    author === 'Wei Chen' ? `<strong>${author}</strong>` : author
  ).join(', ');
};
</script>

<style scoped>
.publications-container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 15px;
}

.page-header {
  text-align: left;
  margin-bottom: 30px;
}

.page-title {
  font-size: 2.2rem;
  font-weight: 500;
  font-family: 'Oswald', sans-serif;
  color: var(--el-text-color-primary);
  margin-bottom: 10px;
}

.page-subtitle {
  font-size: 1.1rem;
  color: var(--el-text-color-secondary);
}


.el-divider .year-header {
  font-size: 1.6rem;
  font-weight: 300;
  font-family: "Oswald", sans-serif;
  color: var(--el-text-color-secondary);
}

.publication-card {
  margin-bottom: 7px;
  border: none;
  transition: box-shadow 0.3s, border-color 0.3s;
}

.publication-card:hover {
  border-color: var(--el-color-primary-light-5);
}

.teaser-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 8px;
  background-color: var(--el-fill-color-light);
}

.paper-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.paper-title {
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--el-text-color-primary);
  margin: 0;
}

.paper-title-link {
  text-decoration: none;
  transition: color 0.3s;
}
.paper-title-link:hover .paper-title {
  color: var(--el-color-primary);
}

.authors {
  font-size: 1rem;
  color: var(--el-text-color-regular);
  line-height: 1.6;
}
.authors :deep(strong) {
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.venue {
  font-size: 1rem;
  color: var(--el-text-color-secondary);
}
.venue em {
  font-style: normal;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.link-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 6px; /* Pill shape */
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
  border: 1px solid var(--el-color-primary-light-8);
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
}

.link-pill:hover {
  background-color: var(--el-color-primary);
  color: #fff;
}

@media (max-width: 768px) {
  .teaser-image {
    margin-bottom: 20px;
  }
  .paper-title {
    font-size: 1.15rem;
  }
}
</style>
