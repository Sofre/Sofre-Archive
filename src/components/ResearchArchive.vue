<script setup lang="ts">
import SectionHeader from './SectionHeader.vue'
</script>

<template>
  <section id="research" class="research section reveal" aria-labelledby="research-title">
    <SectionHeader
      overline="RESEARCH ARCHIVE"
      title="THE FORBIDDEN RESEARCH ARCHIVE"
      subtitle="Comparative analysis of modern detection systems for intelligent transportation applications."
    />

    <article class="research__publication" aria-labelledby="research-title">
      <div class="research__publication-header">
        <p class="research__label">RESEARCH</p>
        <a class="research__link" href="https://www.researchgate.net" target="_blank" rel="noreferrer noopener">ResearchGate — View Publication</a>
      </div>

      <h3 id="research-title">Comparative Analysis of CNN-Based and Hybrid Transformer-Based Object Detection for Vehicle Detection in Intelligent Transportation Systems</h3>

      <div class="research__body">
        <ul class="research__list">
          <li>Conducted comparative research on CNN-based YOLOv8, transformer-based DETR, and hybrid RF-DETR architectures for vehicle detection in Intelligent Transportation Systems.</li>
          <li>Evaluated the models using the UA-DETRAC benchmark dataset under varying traffic conditions, object scales, and occlusions.</li>
          <li>Analyzed the trade-offs between detection accuracy and computational efficiency for real-time vehicle detection applications.</li>
          <li>Investigated the impact of CNN-based feature extraction and Transformer-based contextual modeling on object detection performance.</li>
          <li>Contributed to research on selecting suitable deep learning architectures for real-time and resource-constrained Intelligent Transportation Systems.</li>
          <li>Published and presented at CIIT 2026 (23rd International Conference on Informatics and Information Technologies).</li>
        </ul>
      </div>
    </article>
  </section>
</template>
