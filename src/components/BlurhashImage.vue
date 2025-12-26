<template>
  <div class="blurhash-wrapper" :style="wrapperStyle">
    <canvas ref="canvasRef" class="blurhash-canvas" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { decode } from 'blurhash'

interface Props {
  blurhash: string
  width?: number
  height?: number
  aspectRatio?: number // e.g., 4/3
}

const props = defineProps<Props>()

// Default to 4:3 placeholder if no explicit size provided
const targetWidth = computed(() => props.width ?? 32)
const targetHeight = computed(() => props.height ?? (props.aspectRatio ? Math.round(targetWidth.value / props.aspectRatio) : 24))

const canvasRef = ref<HTMLCanvasElement | null>(null)

const wrapperStyle = computed(() => {
  const ar = props.aspectRatio ?? targetWidth.value / targetHeight.value
  return {
    position: 'relative',
    width: '100%',
    // Maintain aspect ratio using padding-top trick
    paddingTop: `${100 / ar}%`,
    overflow: 'hidden',
    borderRadius: '8px',
    backgroundColor: 'var(--el-fill-color-light)'
  } as Record<string, string>
})

onMounted(() => {
  if (!canvasRef.value || !props.blurhash) return

  const canvas = canvasRef.value
  const w = targetWidth.value
  const h = targetHeight.value

  const pixels = decode(props.blurhash, w, h)
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const imageData = ctx.createImageData(w, h)
  imageData.data.set(pixels)
  ctx.putImageData(imageData, 0, 0)

  // Scale canvas to fill wrapper
  canvas.style.position = 'absolute'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
})
</script>

<style scoped>
.blurhash-wrapper {
  display: block;
}

.blurhash-canvas {
  filter: blur(0.5px);
  /* tiny blur for smoother upscale */
}
</style>
