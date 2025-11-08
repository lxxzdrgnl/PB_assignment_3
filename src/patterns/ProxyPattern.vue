<template>
  <div class="pattern-container">
    <h1>Proxy Pattern</h1>
    <p class="description">
      프록시 패턴은 다른 객체에 대한 대리자(Proxy)를 제공하여 접근을 제어하는 구조 패턴입니다.
      실제 객체를 대신하여 접근 제어, 지연 로딩, 로깅, 캐싱 등의 부가 기능을 제공합니다.
    </p>

    <div class="demo-section">
      <h2>A. Virtual Proxy (가상 프록시)</h2>
      <p>무거운 객체의 생성을 실제 필요한 시점까지 지연시켜 성능을 최적화합니다.</p>

      <div class="code-block">
        <h3>📝 코드</h3>
        <pre><code>// Subject - 공통 인터페이스
interface Image {
  display(): string
}

// RealSubject - 실제 객체 (무거운 리소스)
class RealImage implements Image {
  private filename: string

  constructor(filename: string) {
    this.filename = filename
    this.loadFromDisk() // 생성 시 즉시 로드 (비용이 큼)
  }

  private loadFromDisk(): void {
    console.log(`디스크에서 이미지 로딩: ${this.filename}`)
  }

  display(): string {
    return `이미지 표시: ${this.filename}`
  }
}

// Proxy - 대리자 (지연 로딩)
class ImageProxy implements Image {
  private realImage: RealImage | null = null
  private filename: string

  constructor(filename: string) {
    this.filename = filename
    // 실제 이미지는 아직 로드하지 않음
  }

  display(): string {
    if (this.realImage === null) {
      // 실제 필요한 시점에 로드
      this.realImage = new RealImage(this.filename)
    }
    return this.realImage.display()
  }
}

// 사용 예제
const image1 = new ImageProxy('photo1.jpg')
// 아직 이미지가 로드되지 않음

const result = image1.display()
// 이 시점에 실제 이미지가 로드됨</code></pre>
      </div>

      <div class="interactive-demo">
        <h3>🖼️ 실제 이미지 로딩 시뮬레이션</h3>

        <div class="form-group">
          <label>이미지 파일 선택</label>
          <select v-model="selectedImageFile" class="input-field">
            <option value="">선택하세요</option>
            <option value="vacation-photo.jpg">vacation-photo.jpg (5MB)</option>
            <option value="concert-video.mp4">concert-video.mp4 (150MB)</option>
            <option value="presentation.pdf">presentation.pdf (25MB)</option>
            <option value="profile-pic.png">profile-pic.png (2MB)</option>
          </select>
        </div>

        <div class="form-group">
          <label>로딩 방식 선택</label>
          <div class="loading-type-selection">
            <button
              @click="loadingType = 'immediate'"
              :class="['loading-type-btn', { active: loadingType === 'immediate' }]"
            >
              즉시 로딩
              <span class="loading-description">(객체 생성 시 바로 로드)</span>
            </button>
            <button
              @click="loadingType = 'proxy'"
              :class="['loading-type-btn', { active: loadingType === 'proxy' }]"
            >
              지연 로딩 (Proxy)
              <span class="loading-description">(실제 사용 시점에 로드)</span>
            </button>
          </div>
        </div>

        <button
          @click="loadImage"
          class="test-btn"
          :disabled="!selectedImageFile || !loadingType"
        >
          이미지 로드
        </button>

        <button
          v-if="imageLoaded"
          @click="displayImage"
          class="test-btn"
          style="margin-left: 0.5rem"
        >
          이미지 표시
        </button>
      </div>

      <div v-if="virtualResult" class="result">
        <h3>🚀 실행 결과</h3>
        <pre>{{ virtualResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>B. Protection Proxy (보호 프록시)</h2>
      <p>접근 권한을 확인하여 허가된 사용자만 실제 객체에 접근할 수 있도록 제어합니다.</p>

      <div class="code-block">
        <h3>📝 코드</h3>
        <pre><code>// Subject - 공통 인터페이스
interface Document {
  read(): string
  write(content: string): string
}

// RealSubject - 실제 문서
class SecretDocument implements Document {
  private content: string = '기밀 정보: 프로젝트 X의 상세 계획'

  read(): string {
    return this.content
  }

  write(content: string): string {
    this.content = content
    return '문서가 수정되었습니다.'
  }
}

// Proxy - 접근 제어
class DocumentProxy implements Document {
  private document: SecretDocument
  private userRole: string

  constructor(userRole: string) {
    this.document = new SecretDocument()
    this.userRole = userRole
  }

  read(): string {
    if (this.userRole === 'ADMIN' || this.userRole === 'USER') {
      return `✅ 읽기 권한 확인됨\n${this.document.read()}`
    }
    return '❌ 접근 거부: 읽기 권한이 없습니다.'
  }

  write(content: string): string {
    if (this.userRole === 'ADMIN') {
      const result = this.document.write(content)
      return `✅ 쓰기 권한 확인됨\n${result}`
    }
    return '❌ 접근 거부: 쓰기 권한이 없습니다.'
  }
}

// 사용 예제
const adminDoc = new DocumentProxy('ADMIN')
adminDoc.read()   // 허용
adminDoc.write('새로운 내용')  // 허용

const userDoc = new DocumentProxy('USER')
userDoc.read()    // 허용
userDoc.write('수정 시도')  // 거부

const guestDoc = new DocumentProxy('GUEST')
guestDoc.read()   // 거부</code></pre>
      </div>

      <div class="interactive-demo">
        <h3>🔐 실제 문서 접근 제어 시뮬레이션</h3>

        <div class="form-group">
          <label>사용자 역할 선택</label>
          <select v-model="userRole" class="input-field">
            <option value="">선택하세요</option>
            <option value="ADMIN">관리자 (ADMIN)</option>
            <option value="USER">일반 사용자 (USER)</option>
            <option value="GUEST">게스트 (GUEST)</option>
          </select>
        </div>

        <div class="form-group">
          <label>수행할 작업 선택</label>
          <div class="action-selection">
            <button
              @click="documentAction = 'read'"
              :class="['action-btn', { active: documentAction === 'read' }]"
            >
              📖 읽기
            </button>
            <button
              @click="documentAction = 'write'"
              :class="['action-btn', { active: documentAction === 'write' }]"
            >
              ✍️ 쓰기
            </button>
          </div>
        </div>

        <div class="form-group" v-if="documentAction === 'write'">
          <label>새로운 내용 입력</label>
          <textarea v-model="newContent" placeholder="문서에 쓸 내용을 입력하세요" class="input-field" rows="3"></textarea>
        </div>

        <button
          @click="accessDocument"
          class="test-btn"
          :disabled="!userRole || !documentAction"
        >
          문서 접근
        </button>
      </div>

      <div v-if="protectionResult" class="result">
        <h3>🚀 실행 결과</h3>
        <pre>{{ protectionResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>C. Caching Proxy (캐싱 프록시)</h2>
      <p>이전 요청의 결과를 캐싱하여 동일한 요청에 대해 빠르게 응답합니다.</p>

      <div class="code-block">
        <h3>📝 코드</h3>
        <pre><code>// Subject - 공통 인터페이스
interface DataService {
  fetchData(id: string): string
}

// RealSubject - 실제 데이터 서비스 (느린 작업)
class DatabaseService implements DataService {
  fetchData(id: string): string {
    // 실제로는 DB 쿼리나 API 호출 등 시간이 걸리는 작업
    return `데이터베이스에서 가져온 데이터 [ID: ${id}]`
  }
}

// Proxy - 캐싱 기능 추가
class CachedDataService implements DataService {
  private service: DatabaseService
  private cache: Map&lt;string, { data: string; timestamp: number }&gt;
  private cacheTimeout: number = 5000 // 5초

  constructor() {
    this.service = new DatabaseService()
    this.cache = new Map()
  }

  fetchData(id: string): string {
    const cached = this.cache.get(id)
    const now = Date.now()

    // 캐시가 있고 유효한 경우
    if (cached && (now - cached.timestamp) < this.cacheTimeout) {
      return `[캐시에서 반환] ${cached.data}`
    }

    // 캐시가 없거나 만료된 경우
    const data = this.service.fetchData(id)
    this.cache.set(id, { data, timestamp: now })
    return `[새로 조회] ${data}`
  }

  clearCache(): void {
    this.cache.clear()
  }

  getCacheInfo(): string {
    return `캐시 크기: ${this.cache.size}개`
  }
}

// 사용 예제
const dataService = new CachedDataService()
dataService.fetchData('user-123')  // DB에서 조회
dataService.fetchData('user-123')  // 캐시에서 반환
dataService.fetchData('user-456')  // DB에서 조회</code></pre>
      </div>

      <div class="interactive-demo">
        <h3>💾 실제 데이터 캐싱 시뮬레이션</h3>

        <div class="form-group">
          <label>조회할 데이터 ID</label>
          <input v-model="dataId" type="text" placeholder="예: user-123" class="input-field" />
        </div>

        <div class="form-group">
          <label>조회 방식 선택</label>
          <div class="fetch-type-selection">
            <button
              @click="useCaching = false"
              :class="['fetch-type-btn', { active: useCaching === false }]"
            >
              직접 조회
              <span class="fetch-description">(매번 DB 접근)</span>
            </button>
            <button
              @click="useCaching = true"
              :class="['fetch-type-btn', { active: useCaching === true }]"
            >
              캐싱 사용
              <span class="fetch-description">(첫 조회 후 캐시)</span>
            </button>
          </div>
        </div>

        <button
          @click="fetchData"
          class="test-btn"
          :disabled="!dataId.trim() || useCaching === null"
        >
          데이터 조회
        </button>

        <button
          v-if="useCaching"
          @click="clearCache"
          class="test-btn"
          style="margin-left: 0.5rem"
        >
          캐시 초기화
        </button>
      </div>

      <div v-if="cachingResult" class="result">
        <h3>🚀 실행 결과</h3>
        <pre>{{ cachingResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>D. Logging Proxy (로깅 프록시)</h2>
      <p>실제 객체의 메서드 호출을 가로채서 로깅 기능을 추가합니다.</p>

      <div class="code-block">
        <h3>📝 코드</h3>
        <pre><code>// Subject - 공통 인터페이스
interface Calculator {
  add(a: number, b: number): number
  subtract(a: number, b: number): number
  multiply(a: number, b: number): number
  divide(a: number, b: number): number
}

// RealSubject - 실제 계산기
class RealCalculator implements Calculator {
  add(a: number, b: number): number {
    return a + b
  }

  subtract(a: number, b: number): number {
    return a - b
  }

  multiply(a: number, b: number): number {
    return a * b
  }

  divide(a: number, b: number): number {
    if (b === 0) throw new Error('0으로 나눌 수 없습니다')
    return a / b
  }
}

// Proxy - 로깅 기능 추가
class LoggingCalculator implements Calculator {
  private calculator: RealCalculator
  private logs: string[] = []

  constructor() {
    this.calculator = new RealCalculator()
  }

  private log(operation: string, params: any[], result: any): void {
    const timestamp = new Date().toLocaleTimeString('ko-KR')
    this.logs.push(`[${timestamp}] ${operation}(${params.join(', ')}) = ${result}`)
  }

  add(a: number, b: number): number {
    const result = this.calculator.add(a, b)
    this.log('add', [a, b], result)
    return result
  }

  subtract(a: number, b: number): number {
    const result = this.calculator.subtract(a, b)
    this.log('subtract', [a, b], result)
    return result
  }

  multiply(a: number, b: number): number {
    const result = this.calculator.multiply(a, b)
    this.log('multiply', [a, b], result)
    return result
  }

  divide(a: number, b: number): number {
    try {
      const result = this.calculator.divide(a, b)
      this.log('divide', [a, b], result)
      return result
    } catch (error: any) {
      this.log('divide', [a, b], `ERROR: ${error.message}`)
      throw error
    }
  }

  getLogs(): string[] {
    return [...this.logs]
  }

  clearLogs(): void {
    this.logs = []
  }
}

// 사용 예제
const calc = new LoggingCalculator()
calc.add(10, 5)
calc.multiply(3, 4)
calc.divide(20, 4)
console.log(calc.getLogs())</code></pre>
      </div>

      <div class="interactive-demo">
        <h3>📊 실제 계산기 로깅 시뮬레이션</h3>

        <div class="form-group">
          <label>계산 연산 선택</label>
          <select v-model="calcOperation" class="input-field">
            <option value="">선택하세요</option>
            <option value="add">덧셈 (+)</option>
            <option value="subtract">뺄셈 (-)</option>
            <option value="multiply">곱셈 (×)</option>
            <option value="divide">나눗셈 (÷)</option>
          </select>
        </div>

        <div class="form-group">
          <label>첫 번째 숫자</label>
          <input v-model.number="num1" type="number" placeholder="숫자 입력" class="input-field" />
        </div>

        <div class="form-group">
          <label>두 번째 숫자</label>
          <input v-model.number="num2" type="number" placeholder="숫자 입력" class="input-field" />
        </div>

        <button
          @click="performCalculation"
          class="test-btn"
          :disabled="!calcOperation || num1 === null || num2 === null"
        >
          계산 실행
        </button>

        <button
          @click="viewLogs"
          class="test-btn"
          style="margin-left: 0.5rem"
        >
          로그 보기
        </button>

        <button
          @click="clearCalculatorLogs"
          class="test-btn"
          style="margin-left: 0.5rem"
        >
          로그 초기화
        </button>
      </div>

      <div v-if="loggingResult" class="result">
        <h3>🚀 실행 결과</h3>
        <pre>{{ loggingResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>패턴의 장점</h2>
      <div class="benefits-list">
        <h3>✨ 주요 장점</h3>
        <ul>
          <li><strong>OCP 준수:</strong> 기존 코드 수정 없이 기능 추가</li>
          <li><strong>SRP 준수:</strong> 접근 제어, 캐싱 등의 책임을 분리</li>
          <li><strong>성능 최적화:</strong> 지연 로딩과 캐싱으로 효율 향상</li>
          <li><strong>보안 강화:</strong> 접근 제어로 민감한 리소스 보호</li>
          <li><strong>투명성:</strong> 클라이언트는 프록시 사용 여부를 모름</li>
        </ul>
      </div>

      <div class="code-block">
        <h3>📝 실무 활용 사례</h3>
        <pre><code>// 1. API 요청 프록시 (캐싱 + 로깅)
class ApiProxy implements ApiClient {
  private client: RealApiClient
  private cache: Map&lt;string, any&gt;

  async get(url: string): Promise&lt;any&gt; {
    if (this.cache.has(url)) {
      return this.cache.get(url)
    }
    const data = await this.client.get(url)
    this.cache.set(url, data)
    return data
  }
}

// 2. 데이터베이스 연결 프록시 (풀링)
class DbConnectionProxy implements DbConnection {
  private pool: ConnectionPool
  private connection?: RealConnection

  query(sql: string): Promise&lt;any&gt; {
    this.connection = this.pool.acquire()
    const result = this.connection.query(sql)
    this.pool.release(this.connection)
    return result
  }
}

// 3. 이미지 로더 프록시 (지연 로딩)
class ImageLoaderProxy {
  private image?: HTMLImageElement

  load(): HTMLImageElement {
    if (!this.image) {
      this.image = new Image()
      this.image.src = this.url
    }
    return this.image
  }
}

// 4. 인증 프록시
class AuthenticatedServiceProxy {
  private service: Service
  private auth: AuthService

  execute(request: Request): Response {
    if (!this.auth.isAuthenticated()) {
      throw new Error('인증 필요')
    }
    return this.service.execute(request)
  }
}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const virtualResult = ref<string>('')
const protectionResult = ref<string>('')
const cachingResult = ref<string>('')
const loggingResult = ref<string>('')

// ============ A. Virtual Proxy ============

interface Image {
  display(): string
}

class RealImage implements Image {
  private filename: string
  private loadTime: string

  constructor(filename: string) {
    this.filename = filename
    this.loadTime = new Date().toLocaleTimeString('ko-KR')
    this.loadFromDisk()
  }

  private loadFromDisk(): void {
    // 실제로는 시간이 걸리는 작업
  }

  display(): string {
    return `이미지 표시: ${this.filename} (로드 시간: ${this.loadTime})`
  }
}

class ImageProxy implements Image {
  private realImage: RealImage | null = null
  private filename: string

  constructor(filename: string) {
    this.filename = filename
  }

  display(): string {
    if (this.realImage === null) {
      this.realImage = new RealImage(this.filename)
    }
    return this.realImage.display()
  }
}

function testVirtualProxy() {
  const logs: string[] = []
  const createTime = new Date().toLocaleTimeString('ko-KR')

  logs.push(`[${createTime}] ImageProxy 생성 - 아직 실제 이미지는 로드되지 않음`)

  const image1 = new ImageProxy('vacation.jpg')
  new ImageProxy('family.jpg')
  new ImageProxy('pets.jpg')

  logs.push('\n📸 프록시 객체 3개 생성 완료 (실제 이미지는 로드 안됨)')
  logs.push('\n--- 사용자가 첫 번째 이미지를 클릭 ---\n')

  const displayTime = new Date().toLocaleTimeString('ko-KR')
  logs.push(`[${displayTime}] ${image1.display()}`)
  logs.push('\n✅ 이 시점에 vacation.jpg가 실제로 로드됨!')
  logs.push('\n--- 다시 같은 이미지 표시 ---\n')

  const redisplayTime = new Date().toLocaleTimeString('ko-KR')
  logs.push(`[${redisplayTime}] ${image1.display()}`)
  logs.push('\n✅ 이미 로드된 이미지 재사용 (재로딩 없음)')

  virtualResult.value = logs.join('\n') + '\n\n💡 Virtual Proxy는 무거운 리소스의 생성을 실제 필요할 때까지 지연시킵니다!'
}

// ============ B. Protection Proxy ============

interface Document {
  read(): string
  write(content: string): string
}

class SecretDocument implements Document {
  private content: string = '기밀 정보: 프로젝트 X의 상세 계획 및 예산'

  read(): string {
    return this.content
  }

  write(content: string): string {
    this.content = content
    return '문서가 수정되었습니다.'
  }
}

class DocumentProxy implements Document {
  private document: SecretDocument
  private userRole: string

  constructor(userRole: string) {
    this.document = new SecretDocument()
    this.userRole = userRole
  }

  read(): string {
    if (this.userRole === 'ADMIN' || this.userRole === 'USER') {
      return `✅ 읽기 권한 확인됨 (역할: ${this.userRole})\n${this.document.read()}`
    }
    return `❌ 접근 거부: 읽기 권한이 없습니다 (역할: ${this.userRole})`
  }

  write(content: string): string {
    if (this.userRole === 'ADMIN') {
      const result = this.document.write(content)
      return `✅ 쓰기 권한 확인됨 (역할: ${this.userRole})\n${result}`
    }
    return `❌ 접근 거부: 쓰기 권한이 없습니다 (역할: ${this.userRole})`
  }
}

function testProtectionProxy() {
  const logs: string[] = []

  logs.push('👨‍💼 ADMIN 사용자 테스트:')
  const adminDoc = new DocumentProxy('ADMIN')
  logs.push(adminDoc.read())
  logs.push('\n--- ADMIN이 문서 수정 시도 ---')
  logs.push(adminDoc.write('수정된 내용: 프로젝트 Y로 변경'))

  logs.push('\n\n👤 USER 사용자 테스트:')
  const userDoc = new DocumentProxy('USER')
  logs.push(userDoc.read())
  logs.push('\n--- USER가 문서 수정 시도 ---')
  logs.push(userDoc.write('수정 시도'))

  logs.push('\n\n👥 GUEST 사용자 테스트:')
  const guestDoc = new DocumentProxy('GUEST')
  logs.push('--- GUEST가 문서 읽기 시도 ---')
  logs.push(guestDoc.read())
  logs.push('\n--- GUEST가 문서 수정 시도 ---')
  logs.push(guestDoc.write('수정 시도'))

  protectionResult.value = logs.join('\n') + '\n\n💡 Protection Proxy는 역할 기반으로 접근을 제어합니다!'
}

// ============ C. Caching Proxy ============

interface DataService {
  fetchData(id: string): string
}

class DatabaseService implements DataService {
  fetchData(id: string): string {
    return `데이터베이스에서 가져온 데이터 [ID: ${id}]`
  }
}

class CachedDataService implements DataService {
  private service: DatabaseService
  private cache: Map<string, { data: string; timestamp: number }>
  private cacheTimeout: number = 5000

  constructor() {
    this.service = new DatabaseService()
    this.cache = new Map()
  }

  fetchData(id: string): string {
    const cached = this.cache.get(id)
    const now = Date.now()

    if (cached && (now - cached.timestamp) < this.cacheTimeout) {
      return `[캐시에서 반환] ${cached.data} (캐시 생성: ${new Date(cached.timestamp).toLocaleTimeString('ko-KR')})`
    }

    const data = this.service.fetchData(id)
    this.cache.set(id, { data, timestamp: now })
    return `[새로 조회] ${data}`
  }

  clearCache(): void {
    this.cache.clear()
  }

  getCacheInfo(): string {
    return `캐시 크기: ${this.cache.size}개`
  }
}

function testCachingProxy() {
  const logs: string[] = []
  const service = new CachedDataService()

  logs.push('📊 데이터 조회 테스트:\n')

  logs.push('1차 조회 (user-123):')
  logs.push(service.fetchData('user-123'))

  logs.push('\n2차 조회 (user-123) - 동일 ID:')
  logs.push(service.fetchData('user-123'))

  logs.push('\n1차 조회 (user-456):')
  logs.push(service.fetchData('user-456'))

  logs.push('\n3차 조회 (user-123) - 여전히 캐시 유효:')
  logs.push(service.fetchData('user-123'))

  logs.push('\n1차 조회 (product-789):')
  logs.push(service.fetchData('product-789'))

  logs.push(`\n${service.getCacheInfo()}`)

  logs.push('\n--- 캐시 삭제 ---')
  service.clearCache()
  logs.push(service.getCacheInfo())

  logs.push('\n4차 조회 (user-123) - 캐시 삭제 후:')
  logs.push(service.fetchData('user-123'))

  cachingResult.value = logs.join('\n') + '\n\n💡 Caching Proxy는 반복적인 요청의 결과를 캐싱하여 성능을 향상시킵니다!'
}

// ============ D. Logging Proxy ============

interface Calculator {
  add(a: number, b: number): number
  subtract(a: number, b: number): number
  multiply(a: number, b: number): number
  divide(a: number, b: number): number
}

class RealCalculator implements Calculator {
  add(a: number, b: number): number {
    return a + b
  }

  subtract(a: number, b: number): number {
    return a - b
  }

  multiply(a: number, b: number): number {
    return a * b
  }

  divide(a: number, b: number): number {
    if (b === 0) throw new Error('0으로 나눌 수 없습니다')
    return a / b
  }
}

class LoggingCalculator implements Calculator {
  private calculator: RealCalculator
  private logs: string[] = []

  constructor() {
    this.calculator = new RealCalculator()
  }

  private log(operation: string, params: any[], result: any): void {
    const timestamp = new Date().toLocaleTimeString('ko-KR')
    this.logs.push(`[${timestamp}] ${operation}(${params.join(', ')}) = ${result}`)
  }

  add(a: number, b: number): number {
    const result = this.calculator.add(a, b)
    this.log('add', [a, b], result)
    return result
  }

  subtract(a: number, b: number): number {
    const result = this.calculator.subtract(a, b)
    this.log('subtract', [a, b], result)
    return result
  }

  multiply(a: number, b: number): number {
    const result = this.calculator.multiply(a, b)
    this.log('multiply', [a, b], result)
    return result
  }

  divide(a: number, b: number): number {
    try {
      const result = this.calculator.divide(a, b)
      this.log('divide', [a, b], result)
      return result
    } catch (error: any) {
      this.log('divide', [a, b], `ERROR: ${error.message}`)
      throw error
    }
  }

  getLogs(): string[] {
    return [...this.logs]
  }

  clearLogs(): void {
    this.logs = []
  }
}

function testLoggingProxy() {
  const calc = new LoggingCalculator()

  const logs: string[] = []
  logs.push('🧮 계산기 연산 테스트:\n')

  const r1 = calc.add(10, 5)
  logs.push(`10 + 5 = ${r1}`)

  const r2 = calc.subtract(20, 8)
  logs.push(`20 - 8 = ${r2}`)

  const r3 = calc.multiply(3, 7)
  logs.push(`3 × 7 = ${r3}`)

  const r4 = calc.divide(100, 4)
  logs.push(`100 ÷ 4 = ${r4}`)

  logs.push('\n--- 0으로 나누기 시도 ---')
  try {
    calc.divide(10, 0)
  } catch (error: any) {
    logs.push(`에러 발생: ${error.message}`)
  }

  logs.push('\n📋 모든 연산 로그:\n')
  logs.push(calc.getLogs().join('\n'))

  loggingResult.value = logs.join('\n') + '\n\n💡 Logging Proxy는 모든 메서드 호출을 자동으로 기록합니다!'
}

// ============ Interactive Functions ============

// Interactive variables (Section A - Virtual Proxy)
const selectedImageFile = ref<string>('')
const loadingType = ref<string>('')
const imageLoaded = ref<boolean>(false)
let currentImageProxy: ImageProxy | RealImage | null = null

// Interactive variables (Section B - Protection Proxy)
const userRole = ref<string>('')
const documentAction = ref<string>('')
const newContent = ref<string>('')

// Interactive variables (Section C - Caching Proxy)
const dataId = ref<string>('')
const useCaching = ref<boolean | null>(null)
const cacheStore = new Map<string, string>()

// Interactive variables (Section D - Logging Proxy)
const calcOperation = ref<string>('')
const num1 = ref<number | null>(null)
const num2 = ref<number | null>(null)
let loggingCalculator: LoggingCalculator | null = null

// Section A - Virtual Proxy Interactive Functions
function loadImage() {
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

  if (loadingType.value === 'immediate') {
    currentImageProxy = new RealImage(selectedImageFile.value)
    imageLoaded.value = true

    const result = `[${timestamp}] 즉시 로딩 방식 선택

📂 ${selectedImageFile.value} 로딩 중...
✅ 이미지가 즉시 메모리에 로드되었습니다!

⚠️ 단점: 사용하지 않더라도 메모리를 차지합니다.`

    if (virtualResult.value) {
      virtualResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
    } else {
      virtualResult.value = result
    }
  } else {
    currentImageProxy = new ImageProxy(selectedImageFile.value)
    imageLoaded.value = true

    const result = `[${timestamp}] 지연 로딩 (Proxy) 방식 선택

🔄 ImageProxy 객체가 생성되었습니다.
💡 실제 이미지는 아직 로드되지 않았습니다!

✅ 장점: 메모리를 절약하고, 실제 필요할 때만 로드합니다.
👉 '이미지 표시' 버튼을 클릭하면 실제로 로드됩니다!`

    if (virtualResult.value) {
      virtualResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
    } else {
      virtualResult.value = result
    }
  }
}

function displayImage() {
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

  if (currentImageProxy) {
    const displayResult = currentImageProxy.display()
    const result = `[${timestamp}] 이미지 표시 요청

${displayResult}

${loadingType.value === 'proxy' ?
  '✅ 이 시점에 실제 이미지가 메모리에 로드되었습니다!\n💡 Virtual Proxy 패턴으로 지연 로딩을 구현했습니다!' :
  '✅ 이미 로드된 이미지를 표시합니다!'}`

    if (virtualResult.value) {
      virtualResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
    } else {
      virtualResult.value = result
    }
  }
}

// Section B - Protection Proxy Interactive Functions
function accessDocument() {
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  const proxy = new DocumentProxy(userRole.value)

  let result = `[${timestamp}] 문서 접근 시도\n\n사용자 역할: ${userRole.value}\n작업: ${documentAction.value === 'read' ? '읽기' : '쓰기'}\n\n`

  try {
    if (documentAction.value === 'read') {
      const content = proxy.read()
      result += `✅ 접근 허용!\n\n문서 내용:\n${content}\n\n💡 Protection Proxy가 ${userRole.value} 역할의 읽기 권한을 확인했습니다!`
    } else {
      const writeResult = proxy.write(newContent.value || '새로운 내용')
      result += `${writeResult}\n\n${writeResult.includes('거부') ?
        `❌ ${userRole.value} 역할은 쓰기 권한이 없습니다!\n💡 Protection Proxy가 권한을 확인하고 접근을 차단했습니다!` :
        `✅ 문서가 수정되었습니다!\n💡 Protection Proxy가 ${userRole.value} 역할의 쓰기 권한을 확인했습니다!`}`
    }
  } catch (error: any) {
    result += `❌ 오류 발생: ${error.message}`
  }

  if (protectionResult.value) {
    protectionResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
  } else {
    protectionResult.value = result
  }
}

// Section C - Caching Proxy Interactive Functions
function fetchData() {
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

  let result = `[${timestamp}] 데이터 조회 시작\n\nID: ${dataId.value}\n조회 방식: ${useCaching.value ? '캐싱 사용' : '직접 조회'}\n\n`

  if (useCaching.value) {
    if (cacheStore.has(dataId.value)) {
      const cachedData = cacheStore.get(dataId.value)
      result += `⚡ 캐시에서 데이터 반환!\n\n데이터: ${cachedData}\n\n✅ DB 접근 없이 즉시 응답했습니다!\n💡 Caching Proxy가 이전 결과를 재사용했습니다!`
    } else {
      const data = `사용자 정보: ${dataId.value} (이름: 홍길동, 나이: 25)`
      cacheStore.set(dataId.value, data)
      result += `🗄️ 데이터베이스에서 조회...\n\n데이터: ${data}\n\n✅ 데이터를 캐시에 저장했습니다!\n💡 다음 조회 시 캐시에서 즉시 반환됩니다!`
    }
  } else {
    const data = `사용자 정보: ${dataId.value} (이름: 홍길동, 나이: 25)`
    result += `🗄️ 데이터베이스에서 직접 조회...\n\n데이터: ${data}\n\n⚠️ 매번 DB에 접근하여 성능이 저하될 수 있습니다!`
  }

  if (cachingResult.value) {
    cachingResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
  } else {
    cachingResult.value = result
  }
}

function clearCache() {
  cacheStore.clear()
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

  const result = `[${timestamp}] 캐시 초기화 완료\n\n✅ 모든 캐시 데이터가 삭제되었습니다!\n💡 다음 조회 시 DB에서 새로 가져옵니다.`

  if (cachingResult.value) {
    cachingResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
  } else {
    cachingResult.value = result
  }
}

// Section D - Logging Proxy Interactive Functions
function performCalculation() {
  if (!loggingCalculator) {
    loggingCalculator = new LoggingCalculator()
  }

  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  let result = `[${timestamp}] 계산 실행\n\n`

  try {
    let calcResult: number = 0
    let operation = ''

    switch (calcOperation.value) {
      case 'add':
        calcResult = loggingCalculator.add(num1.value!, num2.value!)
        operation = `${num1.value} + ${num2.value} = ${calcResult}`
        break
      case 'subtract':
        calcResult = loggingCalculator.subtract(num1.value!, num2.value!)
        operation = `${num1.value} - ${num2.value} = ${calcResult}`
        break
      case 'multiply':
        calcResult = loggingCalculator.multiply(num1.value!, num2.value!)
        operation = `${num1.value} × ${num2.value} = ${calcResult}`
        break
      case 'divide':
        calcResult = loggingCalculator.divide(num1.value!, num2.value!)
        operation = `${num1.value} ÷ ${num2.value} = ${calcResult}`
        break
    }

    result += `${operation}\n\n✅ 계산이 완료되었습니다!\n💡 Logging Proxy가 연산을 기록했습니다!\n👉 '로그 보기' 버튼을 클릭하여 확인하세요.`
  } catch (error: any) {
    result += `❌ 오류 발생: ${error.message}\n\n💡 오류도 로그에 기록됩니다!`
  }

  if (loggingResult.value) {
    loggingResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
  } else {
    loggingResult.value = result
  }
}

function viewLogs() {
  if (!loggingCalculator) {
    loggingCalculator = new LoggingCalculator()
  }

  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  const logs = loggingCalculator.getLogs()

  const result = `[${timestamp}] 로그 조회\n\n${logs.length > 0 ?
    `📋 기록된 연산 로그:\n\n${logs.join('\n')}\n\n✅ 총 ${logs.length}개의 연산이 기록되었습니다!\n💡 Logging Proxy가 모든 연산을 자동으로 기록했습니다!` :
    '📋 아직 기록된 연산이 없습니다.\n👉 계산을 실행하면 자동으로 로그가 기록됩니다!'}`

  if (loggingResult.value) {
    loggingResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
  } else {
    loggingResult.value = result
  }
}

function clearCalculatorLogs() {
  if (!loggingCalculator) {
    loggingCalculator = new LoggingCalculator()
  }

  loggingCalculator.clearLogs()
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

  const result = `[${timestamp}] 로그 초기화 완료\n\n✅ 모든 연산 로그가 삭제되었습니다!`

  if (loggingResult.value) {
    loggingResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
  } else {
    loggingResult.value = result
  }
}
</script>

<style scoped>
/* ProxyPattern 전용 스타일이 필요한 경우 여기에 추가 */
/* 공통 스타일은 src/assets/main.css에서 전역으로 적용됨 */
</style>
