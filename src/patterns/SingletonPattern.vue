<template>
  <div class="pattern-container">
    <h1>Singleton Pattern</h1>
    <p class="description">
      싱글톤 패턴은 클래스의 인스턴스가 하나만 생성되도록 보장하고,
      어디서나 그 인스턴스에 접근할 수 있도록 하는 디자인 패턴입니다.
    </p>

    <div class="demo-section">
      <h2>A. Eager Initialization (즉시 초기화)</h2>
      <p>클래스가 로드될 때 즉시 인스턴스를 생성합니다.</p>

      <div class="code-block">
        <h3>📝 코드</h3>
        <pre><code>class EagerSingleton {
  private static readonly instance: EagerSingleton = new EagerSingleton()
  private constructor() {}

  public static getInstance(): EagerSingleton {
    return EagerSingleton.instance
  }

  public sayHello(): string {
    return '안녕하세요! 저는 싱글톤 인스턴스입니다 👋'
  }
}

const s1 = EagerSingleton.getInstance()
const s2 = EagerSingleton.getInstance()
console.log(s1 === s2) // true</code></pre>
      </div>

      <button @click="testEagerSingleton" class="test-btn">테스트 실행</button>
      <div v-if="eagerResult" class="result">
        <h3>🚀 실행 결과</h3>
        <pre>{{ eagerResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>B. Static Block Initialization (정적 블록)</h2>
      <p>정적 블록을 사용하여 예외 처리가 가능한 초기화를 수행합니다.</p>

      <div class="code-block">
        <h3>📝 코드</h3>
        <pre><code>class StaticBlockSingleton {
  private static instance: StaticBlockSingleton
  private constructor() {}

  static {
    try {
      StaticBlockSingleton.instance = new StaticBlockSingleton()
    } catch (error) {
      throw new Error('싱글톤 객체 생성 오류')
    }
  }

  public static getInstance(): StaticBlockSingleton {
    return StaticBlockSingleton.instance
  }

  public getInfo(): string {
    return '정적 블록으로 초기화된 싱글톤입니다 🔧'
  }
}

const s1 = StaticBlockSingleton.getInstance()
console.log(s1 === StaticBlockSingleton.getInstance()) // true</code></pre>
      </div>

      <button @click="testStaticBlockSingleton" class="test-btn">테스트 실행</button>
      <div v-if="staticBlockResult" class="result">
        <h3>🚀 실행 결과</h3>
        <pre>{{ staticBlockResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>C. Lazy Initialization (지연 초기화)</h2>
      <p>첫 번째 getInstance() 호출 시점에 인스턴스를 생성합니다.</p>

      <div class="code-block">
        <h3>📝 코드</h3>
        <pre><code>class LazySingleton {
  private static instance: LazySingleton | null = null
  private createdAt: Date

  private constructor() {
    this.createdAt = new Date()
  }

  public static getInstance(): LazySingleton {
    if (LazySingleton.instance === null) {
      LazySingleton.instance = new LazySingleton()
    }
    return LazySingleton.instance
  }

  public getCreatedTime(): string {
    return `인스턴스 생성 시간: ${this.createdAt.toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul' })}`
  }
}

const a = LazySingleton.getInstance()
const b = LazySingleton.getInstance()
console.log(a === b) // true</code></pre>
      </div>

      <button @click="testLazySingleton" class="test-btn">테스트 실행</button>
      <div v-if="lazyResult" class="result">
        <h3>🚀 실행 결과</h3>
        <pre>{{ lazyResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>D. Module-Based Pattern (모듈 기반)</h2>
      <p>모듈 캐싱을 활용하여 내보낸 인스턴스를 싱글톤으로 사용합니다.</p>

      <div class="code-block">
        <h3>📝 코드</h3>
        <pre><code>class Service {
  public ping(): string {
    return 'pong'
  }

  public getStatus(): string {
    return '모듈 기반 싱글톤 서비스 실행 중 ⚡'
  }
}

// 모듈 스코프에서 인스턴스를 생성하여 export
export const service = new Service()

// 모듈이 한 번만 로드되므로 자동으로 싱글톤</code></pre>
      </div>

      <button @click="testModuleSingleton" class="test-btn">테스트 실행</button>
      <div v-if="moduleResult" class="result">
        <h3>🚀 실행 결과</h3>
        <pre>{{ moduleResult }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const eagerResult = ref<string>('')
const staticBlockResult = ref<string>('')
const lazyResult = ref<string>('')
const moduleResult = ref<string>('')

// A. Eager Initialization
class EagerSingleton {
  private static readonly instance: EagerSingleton = new EagerSingleton()
  private constructor() {}
  public static getInstance(): EagerSingleton {
    return EagerSingleton.instance
  }
  public sayHello(): string {
    return '안녕하세요! 저는 싱글톤 인스턴스입니다 👋'
  }
}

function testEagerSingleton() {
  const s1 = EagerSingleton.getInstance()
  const s2 = EagerSingleton.getInstance()
  const message = s1.sayHello()
  const isSame = s1 === s2

  eagerResult.value = `${message}\n\n인스턴스 비교:\ns1 === s2: ${isSame}\n\n✅ 두 인스턴스가 ${isSame ? '동일합니다' : '다릅니다'}!`
}

// B. Static Block Initialization
class StaticBlockSingleton {
  private static instance: StaticBlockSingleton
  private constructor() {}

  static {
    try {
      StaticBlockSingleton.instance = new StaticBlockSingleton()
    } catch (error) {
      throw new Error('싱글톤 객체 생성 오류')
    }
  }

  public static getInstance(): StaticBlockSingleton {
    return StaticBlockSingleton.instance
  }

  public getInfo(): string {
    return '정적 블록으로 초기화된 싱글톤입니다 🔧'
  }
}

function testStaticBlockSingleton() {
  const s1 = StaticBlockSingleton.getInstance()
  const s2 = StaticBlockSingleton.getInstance()
  const message = s1.getInfo()
  const isSame = s1 === s2

  staticBlockResult.value = `${message}\n\n인스턴스 비교:\ns1 === s2: ${isSame}\n\n✅ 예외 처리가 가능한 초기화!`
}

// C. Lazy Initialization
class LazySingleton {
  private static instance: LazySingleton | null = null
  private createdAt: Date

  private constructor() {
    this.createdAt = new Date()
  }

  public static getInstance(): LazySingleton {
    if (LazySingleton.instance === null) {
      LazySingleton.instance = new LazySingleton()
    }
    return LazySingleton.instance
  }

  public getCreatedTime(): string {
    return `인스턴스 생성 시간: ${this.createdAt.toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul' })}`
  }
}

function testLazySingleton() {
  const beforeTime = new Date().toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul' })
  const s1 = LazySingleton.getInstance()
  const s2 = LazySingleton.getInstance()
  const isSame = s1 === s2

  lazyResult.value = `테스트 시작: ${beforeTime}\n${s1.getCreatedTime()}\n\n인스턴스 비교:\ns1 === s2: ${isSame}\n\n✅ 첫 호출 시점에 생성됩니다!`
}

// D. Module-Based Pattern
class Service {
  public ping(): string {
    return 'pong'
  }

  public getStatus(): string {
    return '모듈 기반 싱글톤 서비스 실행 중 ⚡'
  }
}

const serviceInstance = new Service()

function testModuleSingleton() {
  const response1 = serviceInstance.ping()
  const response2 = serviceInstance.ping()
  const status = serviceInstance.getStatus()

  moduleResult.value = `${status}\n\nping() 호출 결과:\n1차: ${response1}\n2차: ${response2}\n\n✅ 모듈 캐싱으로 자동 싱글톤!`
}
</script>

<style scoped>
/* SingletonPattern 전용 스타일이 필요한 경우 여기에 추가 */
/* 공통 스타일은 src/assets/main.css에서 전역으로 적용됨 */
</style>
