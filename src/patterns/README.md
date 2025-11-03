# 디자인 패턴 컴포넌트 가이드

## 새로운 패턴 추가 방법

### 1. 패턴 컴포넌트 생성
`src/patterns/` 폴더에 새로운 `.vue` 파일을 생성합니다.

예: `ObserverPattern.vue`

### 2. 기본 템플릿 구조

```vue
<template>
  <div class="pattern-container">
    <h1>패턴 이름</h1>
    <p class="description">
      패턴에 대한 간단한 설명
    </p>

    <div class="demo-section">
      <h2>섹션 제목</h2>
      <p>섹션 설명</p>

      <div class="code-block">
        <h3>📝 코드</h3>
        <pre><code>// 여기에 코드 예제</code></pre>
      </div>

      <button @click="runDemo" class="test-btn">테스트 실행</button>
      <div v-if="result" class="result">
        <h3>🚀 실행 결과</h3>
        <pre>{{ result }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const result = ref<string>('')

function runDemo() {
  result.value = '실행 결과'
}
</script>

<style scoped>
/* 이 패턴만의 고유한 스타일이 필요한 경우 여기에 추가 */
/* 공통 스타일은 src/assets/main.css에서 전역으로 적용됨 */
</style>
```

### 3. App.vue에 등록

`src/App.vue`에서 새 패턴을 import하고 등록합니다:

```vue
<script setup lang="ts">
import ObserverPattern from './patterns/ObserverPattern.vue'

const patterns = [
  { id: 'singleton' as PatternType, name: 'Singleton', icon: '🔒' },
  { id: 'factory' as PatternType, name: 'Factory', icon: '🏭' },
  { id: 'observer' as PatternType, name: 'Observer', icon: '👁️', disabled: false }, // disabled 제거
  // ...
]
</script>

<template>
  <!-- ... -->
  <main>
    <SingletonPattern v-if="currentPattern === 'singleton'" />
    <FactoryPattern v-else-if="currentPattern === 'factory'" />
    <ObserverPattern v-else-if="currentPattern === 'observer'" />
    <!-- ... -->
  </main>
</template>
```

## 사용 가능한 CSS 클래스

공통 스타일 파일(`src/styles/pattern-common.css`)에서 제공하는 클래스:

### 레이아웃
- `.pattern-container`: 메인 컨테이너

### 텍스트
- `h1`: 패턴 제목 (파란색 그라데이션)
- `.description`: 패턴 설명

### 섹션
- `.demo-section`: 데모 섹션 컨테이너
- `.demo-section h2`: 섹션 제목
- `.demo-section p`: 섹션 설명

### 코드 블록
- `.code-block`: 코드 블록 컨테이너 (다크 테마)
- `.code-block h3`: 코드 블록 제목
- `.code-block pre code`: 코드 내용

### 버튼
- `.test-btn`: 테스트 실행 버튼 (파란색 그라데이션)

### 결과
- `.result`: 실행 결과 컨테이너
- `.result h3`: 결과 제목
- `.result pre`: 결과 내용

### 추가 컴포넌트
- `.benefits-list`: 장점 목록 컨테이너
- `.benefits-list h3`: 목록 제목
- `.benefits-list ul`: 리스트
- `.benefits-list li`: 리스트 아이템

## 스타일 커스터마이징

각 패턴 컴포넌트에서 고유한 스타일이 필요한 경우:

```vue
<style scoped>
/* 고유 스타일 추가 */
.custom-element {
  /* 스타일 정의 */
}

/* 공통 스타일 오버라이드 (필요한 경우) */
h1 {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
```

> **참고**: 모든 공통 스타일은 `src/assets/main.css`에서 전역으로 적용되므로, 별도로 import할 필요가 없습니다.

## 파일 구조

```
src/
├── patterns/
│   ├── SingletonPattern.vue      # 싱글톤 패턴
│   ├── FactoryPattern.vue        # 팩토리 메서드 패턴
│   ├── ObserverPattern.vue       # 옵저버 패턴 (예시)
│   └── README.md                 # 이 파일
├── assets/
│   └── main.css                  # 전역 스타일 (공통 패턴 스타일 포함)
└── App.vue                       # 메인 앱
```

## 장점

### ✅ 일관성
- 모든 패턴이 동일한 디자인 시스템 사용
- 사용자 경험 통일

### ✅ 유지보수성
- 공통 스타일은 `main.css` 한 파일에서 관리
- 디자인 변경 시 한 곳만 수정하면 모든 패턴에 자동 반영

### ✅ 효율성
- 중복 코드 완전 제거
- 새 패턴 추가 시 빠른 개발 (CSS 작성 불필요)
- 번들 크기 최소화 (전역 스타일 한 번만 로드)

### ✅ 확장성
- 패턴별 고유 스타일 추가 가능
- 필요시 공통 스타일 오버라이드 가능
- import 구문 불필요로 단순한 구조 유지
