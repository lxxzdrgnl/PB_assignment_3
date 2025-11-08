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

      <div class="interactive-demo">
        <h3>🔒 실제 인스턴스 생성 시뮬레이션</h3>

        <div class="form-group">
          <label>인스턴스 요청 횟수</label>
          <input v-model.number="eagerRequestCount" type="number" min="1" max="10" placeholder="1-10" class="input-field" />
        </div>

        <button
          @click="requestEagerInstances"
          class="test-btn"
          :disabled="!eagerRequestCount || eagerRequestCount < 1"
        >
          인스턴스 요청
        </button>
      </div>

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

      <div class="interactive-demo">
        <h3>🔧 실제 설정 관리 시뮬레이션</h3>

        <div class="form-group">
          <label>애플리케이션 이름</label>
          <input v-model="appName" type="text" placeholder="앱 이름 입력" class="input-field" />
        </div>

        <div class="form-group">
          <label>버전</label>
          <input v-model="appVersion" type="text" placeholder="예: 1.0.0" class="input-field" />
        </div>

        <div class="form-group">
          <label>환경</label>
          <select v-model="appEnvironment" class="input-field">
            <option value="">선택하세요</option>
            <option value="development">Development</option>
            <option value="staging">Staging</option>
            <option value="production">Production</option>
          </select>
        </div>

        <button
          @click="saveConfig"
          class="test-btn"
          :disabled="!appName || !appVersion || !appEnvironment"
        >
          설정 저장
        </button>

        <button
          @click="loadConfig"
          class="test-btn"
          style="margin-left: 0.5rem"
        >
          설정 불러오기
        </button>
      </div>

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

      <div class="interactive-demo">
        <h3>📊 실제 데이터베이스 연결 시뮬레이션</h3>

        <div class="form-group">
          <label>데이터베이스 타입</label>
          <select v-model="dbType" class="input-field">
            <option value="">선택하세요</option>
            <option value="MySQL">MySQL</option>
            <option value="PostgreSQL">PostgreSQL</option>
            <option value="MongoDB">MongoDB</option>
            <option value="Redis">Redis</option>
          </select>
        </div>

        <div class="form-group">
          <label>호스트</label>
          <input v-model="dbHost" type="text" placeholder="예: localhost:3306" class="input-field" />
        </div>

        <button
          @click="connectDatabase"
          class="test-btn"
          :disabled="!dbType || !dbHost"
        >
          DB 연결 (지연 초기화)
        </button>

        <button
          v-if="lazyDbConnected"
          @click="queryDatabase"
          class="test-btn"
          style="margin-left: 0.5rem"
        >
          쿼리 실행
        </button>
      </div>

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

      <div class="interactive-demo">
        <h3>⚡ 실제 로거 서비스 시뮬레이션</h3>

        <div class="form-group">
          <label>로그 레벨</label>
          <select v-model="logLevel" class="input-field">
            <option value="">선택하세요</option>
            <option value="DEBUG">DEBUG</option>
            <option value="INFO">INFO</option>
            <option value="WARN">WARN</option>
            <option value="ERROR">ERROR</option>
          </select>
        </div>

        <div class="form-group">
          <label>로그 메시지</label>
          <input v-model="logMessage" type="text" placeholder="로그 메시지 입력" class="input-field" />
        </div>

        <button
          @click="writeLog"
          class="test-btn"
          :disabled="!logLevel || !logMessage"
        >
          로그 작성
        </button>

        <button
          @click="viewLogs"
          class="test-btn"
          style="margin-left: 0.5rem"
        >
          로그 보기
        </button>

        <button
          @click="clearLogs"
          class="test-btn"
          style="margin-left: 0.5rem"
        >
          로그 초기화
        </button>
      </div>

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

// ============ Interactive Functions ============

// Interactive variables (Section A - Eager)
const eagerRequestCount = ref<number | null>(null)

// Interactive variables (Section B - Static Block)
const appName = ref<string>('')
const appVersion = ref<string>('')
const appEnvironment = ref<string>('')

// Config manager singleton
class ConfigManager {
  private static instance: ConfigManager
  private config: { name: string; version: string; environment: string } | null = null

  private constructor() {}

  static {
    try {
      ConfigManager.instance = new ConfigManager()
    } catch (error) {
      throw new Error('ConfigManager 생성 오류')
    }
  }

  public static getInstance(): ConfigManager {
    return ConfigManager.instance
  }

  public setConfig(name: string, version: string, environment: string): void {
    this.config = { name, version, environment }
  }

  public getConfig(): { name: string; version: string; environment: string } | null {
    return this.config
  }
}

// Interactive variables (Section C - Lazy)
const dbType = ref<string>('')
const dbHost = ref<string>('')
const lazyDbConnected = ref<boolean>(false)

// Database connection singleton (Lazy)
class DatabaseConnection {
  private static instance: DatabaseConnection | null = null
  private connected: boolean = false
  private createdAt: Date
  private dbType: string = ''
  private host: string = ''

  private constructor() {
    this.createdAt = new Date()
  }

  public static getInstance(): DatabaseConnection {
    if (DatabaseConnection.instance === null) {
      DatabaseConnection.instance = new DatabaseConnection()
    }
    return DatabaseConnection.instance
  }

  public connect(type: string, host: string): void {
    this.dbType = type
    this.host = host
    this.connected = true
  }

  public isConnected(): boolean {
    return this.connected
  }

  public getConnectionInfo(): string {
    return `DB: ${this.dbType}, Host: ${this.host}, 생성: ${this.createdAt.toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul' })}`
  }

  public query(sql: string): string {
    if (!this.connected) {
      throw new Error('데이터베이스에 연결되지 않았습니다')
    }
    return `쿼리 실행: ${sql}\n결과: [{ id: 1, name: 'User1' }, { id: 2, name: 'User2' }]`
  }
}

// Interactive variables (Section D - Module)
const logLevel = ref<string>('')
const logMessage = ref<string>('')

// Logger service singleton (Module-based)
class LoggerService {
  private logs: string[] = []

  public log(level: string, message: string): void {
    const timestamp = new Date().toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul' })
    this.logs.push(`[${timestamp}] [${level}] ${message}`)
  }

  public getLogs(): string[] {
    return [...this.logs]
  }

  public clearLogs(): void {
    this.logs = []
  }
}

const loggerService = new LoggerService()

// Section A - Eager Interactive Functions
function requestEagerInstances() {
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  const instances: EagerSingleton[] = []

  for (let i = 0; i < eagerRequestCount.value!; i++) {
    instances.push(EagerSingleton.getInstance())
  }

  let allSame = true
  for (let i = 1; i < instances.length; i++) {
    if (instances[0] !== instances[i]) {
      allSame = false
      break
    }
  }

  const result = `[${timestamp}] ${eagerRequestCount.value}번의 인스턴스 요청

📋 요청 결과:
${instances.map((_, i) => `${i + 1}번째 요청: ${instances[0]?.sayHello()}`).join('\n')}

🔍 인스턴스 비교:
${instances.map((_, i) => i > 0 ? `instance[0] === instance[${i}]: ${instances[0] === instances[i]}` : '').filter(Boolean).join('\n')}

✅ 모든 인스턴스가 ${allSame ? '동일합니다' : '다릅니다'}!
💡 Eager Initialization은 클래스 로드 시점에 인스턴스를 생성합니다!
💡 ${eagerRequestCount.value}번 요청했지만 실제로는 1개의 인스턴스만 생성되었습니다!`

  if (eagerResult.value) {
    eagerResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
  } else {
    eagerResult.value = result
  }
}

// Section B - Static Block Interactive Functions
function saveConfig() {
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  const config = ConfigManager.getInstance()
  config.setConfig(appName.value, appVersion.value, appEnvironment.value)

  const result = `[${timestamp}] 설정 저장 완료

📝 저장된 설정:
- 애플리케이션: ${appName.value}
- 버전: ${appVersion.value}
- 환경: ${appEnvironment.value}

✅ ConfigManager 싱글톤에 설정이 저장되었습니다!
💡 정적 블록으로 초기화되어 예외 처리가 가능합니다!`

  if (staticBlockResult.value) {
    staticBlockResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
  } else {
    staticBlockResult.value = result
  }
}

function loadConfig() {
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  const config = ConfigManager.getInstance()
  const loadedConfig = config.getConfig()

  const result = `[${timestamp}] 설정 불러오기

${loadedConfig ?
  `📋 불러온 설정:\n- 애플리케이션: ${loadedConfig.name}\n- 버전: ${loadedConfig.version}\n- 환경: ${loadedConfig.environment}\n\n✅ 동일한 싱글톤 인스턴스에서 설정을 불러왔습니다!` :
  '⚠️ 저장된 설정이 없습니다.\n👉 먼저 설정을 저장하세요!'}`

  if (staticBlockResult.value) {
    staticBlockResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
  } else {
    staticBlockResult.value = result
  }
}

// Section C - Lazy Interactive Functions
function connectDatabase() {
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

  const db = DatabaseConnection.getInstance()
  db.connect(dbType.value, dbHost.value)
  lazyDbConnected.value = true

  const result = `[${timestamp}] 데이터베이스 연결 요청

🔌 연결 정보:
${db.getConnectionInfo()}

✅ 데이터베이스 연결 성공!
💡 Lazy Initialization: 첫 번째 getInstance() 호출 시점에 인스턴스가 생성되었습니다!
💡 연결이 필요한 시점까지 리소스 생성을 지연시켜 메모리를 절약합니다!`

  if (lazyResult.value) {
    lazyResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
  } else {
    lazyResult.value = result
  }
}

function queryDatabase() {
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  const db = DatabaseConnection.getInstance()

  try {
    const queryResult = db.query('SELECT * FROM users')

    const result = `[${timestamp}] 쿼리 실행

📊 ${queryResult}

✅ 동일한 싱글톤 연결을 재사용했습니다!
💡 매번 새로운 연결을 생성하지 않아 성능이 향상됩니다!`

    if (lazyResult.value) {
      lazyResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
    } else {
      lazyResult.value = result
    }
  } catch (error: any) {
    const result = `[${timestamp}] 쿼리 실행 실패\n\n❌ ${error.message}`

    if (lazyResult.value) {
      lazyResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
    } else {
      lazyResult.value = result
    }
  }
}

// Section D - Module Interactive Functions
function writeLog() {
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  loggerService.log(logLevel.value, logMessage.value)

  const result = `[${timestamp}] 로그 작성 완료

📝 작성된 로그:
레벨: ${logLevel.value}
메시지: ${logMessage.value}

✅ 싱글톤 로거 서비스에 로그가 기록되었습니다!
💡 모듈 스코프에서 생성된 인스턴스는 자동으로 싱글톤입니다!`

  if (moduleResult.value) {
    moduleResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
  } else {
    moduleResult.value = result
  }

  logMessage.value = ''
}

function viewLogs() {
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  const logs = loggerService.getLogs()

  const result = `[${timestamp}] 로그 조회

${logs.length > 0 ?
  `📋 기록된 로그 (총 ${logs.length}개):\n\n${logs.join('\n')}\n\n✅ 동일한 싱글톤 인스턴스에서 로그를 조회했습니다!` :
  '📋 기록된 로그가 없습니다.\n👉 먼저 로그를 작성하세요!'}`

  if (moduleResult.value) {
    moduleResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
  } else {
    moduleResult.value = result
  }
}

function clearLogs() {
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  loggerService.clearLogs()

  const result = `[${timestamp}] 로그 초기화 완료

✅ 모든 로그가 삭제되었습니다!
💡 싱글톤 인스턴스는 그대로 유지되며, 로그만 초기화되었습니다!`

  if (moduleResult.value) {
    moduleResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
  } else {
    moduleResult.value = result
  }
}
</script>

<style scoped>
/* SingletonPattern 전용 스타일이 필요한 경우 여기에 추가 */
/* 공통 스타일은 src/assets/main.css에서 전역으로 적용됨 */
</style>
