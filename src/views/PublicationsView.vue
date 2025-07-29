<template>
  <div class="publications-container">
    <h1 class="page-title">Publications</h1>

    <div v-if="loading" class="loading-state">
      <el-skeleton :rows="5" animated />
    </div>

    <div v-if="error" class="error-state">
      <el-alert title="Failed to load publications." type="error" show-icon :closable="false">
        Please try refreshing the page.
      </el-alert>
    </div>

    <div v-if="!loading && !error" class="publications-list">
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
                  <el-button v-if="paper.links.project" type="primary" link @click="openLink(paper.links.project)">
                    Project
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
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { Link, Folder, CollectionTag } from '@element-plus/icons-vue'

// --- 1. TYPE DEFINITION ---
interface Publication {
  id: number;
  year: number;
  title: string;
  authors: string[];
  venue: string;
  teaserUrl: string;
  links: {
    paper?: string;
    project?: string;
    code?: string;
  };
}

// --- 2. STATE MANAGEMENT ---
const publications = ref<Publication[]>([]);
const loading = ref(true);
const error = ref(false);

// --- 3. DATA FETCHING ---
onMounted(async () => {
  try {
    // Axios fetches from the /public folder directly
    const response = await axios.get<Publication[]>('/data/publications.json');
    // Sort by year descending before storing
    publications.value = response.data.sort((a, b) => b.year - a.year);
  } catch (err) {
    console.error("Failed to fetch publications:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
});

// --- 4. DATA GROUPING (Computed Property) ---
const groupedPublications = computed(() => {
  if (!publications.value.length) return new Map();

  const groups = new Map<number, Publication[]>();
  for (const paper of publications.value) {
    if (!groups.has(paper.year)) {
      groups.set(paper.year, []);
    }
    groups.get(paper.year)?.push(paper);
  }
  return groups;
});


// --- 5. HELPER FUNCTIONS ---
// This function bolds the group leader's name
const formatAuthors = (authors: string[]): string => {
  return authors.map(author =>
    author === 'Wei Chen' ? `<strong>${author}</strong>` : author
  ).join(', ');
};

const openLink = (url: string) => {
  window.open(url, '_blank');
}
</script>

<style scoped>
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

/* This targets the bolded name from v-html */
.authors :deep(strong) {
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.venue {
  font-size: 0.95rem;
  color: var(--el-text-color-secondary);
  margin: 0 0 16px 0;
}

.venue em {
  font-style: italic;
}

.links .el-button {
  margin-right: 12px;
  font-size: 0.9rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .teaser-image {
    margin-bottom: 20px;
  }
}
</style>
