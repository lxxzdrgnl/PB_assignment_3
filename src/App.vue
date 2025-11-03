<script setup lang="ts">
import { ref } from 'vue'
import SingletonPattern from './patterns/SingletonPattern.vue'
import FactoryPattern from './patterns/FactoryPattern.vue'
import AdapterPattern from './patterns/AdapterPattern.vue'
import DecoratorPattern from './patterns/DecoratorPattern.vue'
import ObserverPattern from './patterns/ObserverPattern.vue'
import VisitorPattern from './patterns/VisitorPattern.vue'

type PatternType = 'singleton' | 'factory' | 'adapter' | 'decorator' | 'observer' | 'visitor'

const currentPattern = ref<PatternType>('singleton')

const patterns = [
  { id: 'singleton' as PatternType, name: 'Singleton', icon: '🔒', disabled: false },
  { id: 'factory' as PatternType, name: 'Factory', icon: '🏭', disabled: false },
  { id: 'adapter' as PatternType, name: 'Adapter', icon: '🔌', disabled: false },
  { id: 'decorator' as PatternType, name: 'Decorator', icon: '🎨', disabled: false },
  { id: 'observer' as PatternType, name: 'Observer', icon: '👁️', disabled: false },
  { id: 'visitor' as PatternType, name: 'Visitor', icon: '🚶', disabled: false }
]
</script>

<template>
  <div class="app-container">
    <header>
      <h1>Design Patterns Demo</h1>
      <p class="subtitle">Vue 3 + TypeScript Implementation</p>
    </header>

    <nav class="pattern-nav">
      <button
        v-for="pattern in patterns"
        :key="pattern.id"
        @click="!pattern.disabled && (currentPattern = pattern.id)"
        :class="{ active: currentPattern === pattern.id, disabled: pattern.disabled }"
        :disabled="pattern.disabled"
        class="pattern-btn"
      >
        <span class="icon">{{ pattern.icon }}</span>
        <span class="name">{{ pattern.name }}</span>
      </button>
    </nav>

    <main>
      <SingletonPattern v-if="currentPattern === 'singleton'" />
      <FactoryPattern v-else-if="currentPattern === 'factory'" />
      <AdapterPattern v-else-if="currentPattern === 'adapter'" />
      <DecoratorPattern v-else-if="currentPattern === 'decorator'" />
      <ObserverPattern v-else-if="currentPattern === 'observer'" />
      <VisitorPattern v-else-if="currentPattern === 'visitor'" />
    </main>
  </div>
</template>
