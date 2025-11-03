import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Highlight.js 설정
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/atom-one-dark.css'

// 언어 등록
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('javascript', javascript)

const app = createApp(App)

// Vue 앱 마운트
app.mount('#app')

// 코드 하이라이팅 적용 (DOM 업데이트 감지)
const observer = new MutationObserver(() => {
  document.querySelectorAll('pre code').forEach((block) => {
    if (!block.classList.contains('hljs')) {
      hljs.highlightElement(block as HTMLElement)
    }
  })
})

// 앱이 마운트된 후 관찰 시작
setTimeout(() => {
  const appElement = document.querySelector('#app')
  if (appElement) {
    observer.observe(appElement, {
      childList: true,
      subtree: true
    })

    // 초기 하이라이팅
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement)
    })
  }
}, 100)
