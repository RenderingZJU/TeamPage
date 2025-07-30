<template>
  <div class="publications-container">
    <h1 class="page-title">Publications</h1>

    <!-- No need for loading/error states anymore, the data is available instantly! -->
    <div class="publications-list">
      <section v-for="[year, papers] in groupedPublications" :key="year" class="year-section">
        <el-divider>
          <h2 class="year-header">{{ year }}</h2>
        </el-divider>

        <div v-for="paper in papers" :key="paper.id" class="publication-item">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="6" :md="5">
              <el-image :src="paper.teaserUrl" fit="cover" class="teaser-image" lazy>
                <template #placeholder>
                  <div class="image-slot">Loading...</div>
                </template>
              </el-image>
            </el-col>
            <el-col :xs="24" :sm="18" :md="19">
              <div class="paper-details">
                <h3 class="paper-title">{{ paper.title }}</h3>
                <p class="authors" v-html="formatAuthors(paper.authors)"></p>
                <p class="venue">
                  Accepted by <em>{{ paper.venue }}</em>
                </p>
                <div class="links">
                  <el-button v-if="paper.links.paper" type="primary" link :icon="Link" @click="openLink(paper.links.paper)">
                    Paper
                  </el-button>
                  <el-button v-if="paper.links.project" type="primary" link :icon="Folder" @click="openLink(paper.links.project)">
                    Project
                  </el-button>
                  <el-button v-if="paper.links.code" type="primary" link :icon="CollectionTag" @click="openLink(paper.links.code)">
                    Code
                  </el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
// --- 1. Import the JSON data directly as a module ---
// Vite will handle this import at build time.
// I'm using an alias `@` which typically points to `/src`
import publicationsData from "@/assets/publications.json"
import { Link, Folder, CollectionTag } from '@element-plus/icons-vue'

// --- 2. (Optional but Recommended) Infer the type automatically ---
// This is a powerful TypeScript trick. It creates a `Publication` type
// based on the actual structure of an element in your JSON array.
type Publication = (typeof publicationsData)[number];

// --- 3. The data is now a simple, static constant ---
// We sort it once to ensure it's in the correct order.
const publications: Publication[] = [...publicationsData].sort((a, b) => b.year - a.year || b.id - a.id);

// --- 4. The computed property works exactly as before ---
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


// --- Helper functions remain the same ---
const formatAuthors = (authors: string[]): string => {
  return authors.join(', ');
};

const openLink = (url: string) => {
  // Use a non-null assertion because v-if already checks for existence
  window.open(url!, '_blank');
}
</script>

<style scoped>
/* Your existing styles are perfect and don't need changes */
.publications-container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
  color: var(--el-text-color-primary);
}

.year-section {
  margin-bottom: 40px;
}

.el-divider .year-header {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--el-text-color-secondary);
}

.publication-item {
  margin-bottom: 40px;
}

.teaser-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 8px;
  border: 1px solid var(--el-border-color);
  background-color: var(--el-fill-color-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-slot {
  color: var(--el-text-color-placeholder);
}

.paper-details {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.paper-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--el-text-color-primary);
}

.authors {
  font-size: 0.95rem;
  color: var(--el-text-color-regular);
  margin: 0 0 8px 0;
  line-height: 1.5;
}

.authors :deep(strong) {
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.venue {
  font-size: 0.95rem;
  color: var(--el-text-color-regular);
  margin: 0 0 16px 0;
}

.venue em {
  font-style: italic;
}

.links .el-button {
  margin-right: 12px;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .teaser-image {
    margin-bottom: 20px;
  }
}
</style>
