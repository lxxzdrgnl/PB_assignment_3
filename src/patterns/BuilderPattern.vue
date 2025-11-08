<template>
  <div class="pattern-container">
    <h1>Builder Pattern</h1>
    <p class="description">
      빌더 패턴은 복잡한 객체의 생성 과정과 표현 방법을 분리하여,
      동일한 생성 절차에서 서로 다른 표현 결과를 만들 수 있도록 하는 디자인 패턴입니다.
    </p>

    <div class="demo-section">
      <h2>A. Simple Builder (간단한 빌더)</h2>
      <p>단계별로 객체를 구성하여 복잡한 객체를 생성합니다.</p>

      <div class="code-block">
        <h3>📝 코드</h3>
        <pre><code>// Product - 생성할 복잡한 객체
class Computer {
  cpu?: string
  ram?: string
  storage?: string
  gpu?: string

  getSpecs(): string {
    return `CPU: ${this.cpu || 'None'}
RAM: ${this.ram || 'None'}
Storage: ${this.storage || 'None'}
GPU: ${this.gpu || 'None'}`
  }
}

// Builder - 객체 생성을 단계별로 처리
class ComputerBuilder {
  private computer: Computer

  constructor() {
    this.computer = new Computer()
  }

  setCPU(cpu: string): this {
    this.computer.cpu = cpu
    return this
  }

  setRAM(ram: string): this {
    this.computer.ram = ram
    return this
  }

  setStorage(storage: string): this {
    this.computer.storage = storage
    return this
  }

  setGPU(gpu: string): this {
    this.computer.gpu = gpu
    return this
  }

  build(): Computer {
    return this.computer
  }
}

// 사용 예제
const builder = new ComputerBuilder()
const computer = builder
  .setCPU('Intel i7')
  .setRAM('16GB')
  .setStorage('512GB SSD')
  .build()</code></pre>
      </div>

      <div class="interactive-demo">
        <h3>🖥️ 실제 컴퓨터 조립 시뮬레이션</h3>

        <div class="form-group">
          <label>CPU 선택</label>
          <select v-model="selectedCPU" class="input-field">
            <option value="">선택하세요</option>
            <option value="Intel i5-12400">Intel i5-12400</option>
            <option value="Intel i7-13700K">Intel i7-13700K</option>
            <option value="Intel i9-13900K">Intel i9-13900K</option>
            <option value="AMD Ryzen 5 7600X">AMD Ryzen 5 7600X</option>
            <option value="AMD Ryzen 9 7950X">AMD Ryzen 9 7950X</option>
          </select>
        </div>

        <div class="form-group">
          <label>RAM 선택</label>
          <select v-model="selectedRAM" class="input-field">
            <option value="">선택하세요</option>
            <option value="8GB DDR4">8GB DDR4</option>
            <option value="16GB DDR4">16GB DDR4</option>
            <option value="32GB DDR5">32GB DDR5</option>
            <option value="64GB DDR5">64GB DDR5</option>
          </select>
        </div>

        <div class="form-group">
          <label>Storage 선택</label>
          <select v-model="selectedStorage" class="input-field">
            <option value="">선택하세요</option>
            <option value="256GB SSD">256GB SSD</option>
            <option value="512GB NVMe">512GB NVMe</option>
            <option value="1TB NVMe">1TB NVMe</option>
            <option value="2TB NVMe">2TB NVMe</option>
          </select>
        </div>

        <div class="form-group">
          <label>GPU 선택 (선택사항)</label>
          <select v-model="selectedGPU" class="input-field">
            <option value="">없음</option>
            <option value="GTX 1660">GTX 1660</option>
            <option value="RTX 3060">RTX 3060</option>
            <option value="RTX 4070">RTX 4070</option>
            <option value="RTX 4090">RTX 4090</option>
          </select>
        </div>

        <button
          @click="buildComputer"
          class="test-btn"
          :disabled="!canBuildComputer"
        >
          컴퓨터 조립하기
        </button>
      </div>

      <div v-if="simpleResult" class="result">
        <h3>🚀 조립 결과</h3>
        <pre>{{ simpleResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>B. Fluent Interface Builder (유창한 인터페이스)</h2>
      <p>메서드 체이닝을 활용하여 가독성 높은 객체 생성 코드를 작성합니다.</p>

      <div class="code-block">
        <h3>📝 코드</h3>
        <pre><code>// Product - 사용자 프로필
class UserProfile {
  constructor(
    public name: string,
    public email: string,
    public age?: number,
    public bio?: string,
    public avatar?: string,
    public preferences?: object
  ) {}

  toString(): string {
    return `Name: ${this.name}
Email: ${this.email}
Age: ${this.age || 'Not specified'}
Bio: ${this.bio || 'No bio'}
Avatar: ${this.avatar || 'Default'}
Preferences: ${JSON.stringify(this.preferences || {})}`
  }
}

// Builder - Fluent Interface
class UserProfileBuilder {
  private name!: string
  private email!: string
  private age?: number
  private bio?: string
  private avatar?: string
  private preferences?: object

  setName(name: string): this {
    this.name = name
    return this
  }

  setEmail(email: string): this {
    this.email = email
    return this
  }

  setAge(age: number): this {
    this.age = age
    return this
  }

  setBio(bio: string): this {
    this.bio = bio
    return this
  }

  setAvatar(avatar: string): this {
    this.avatar = avatar
    return this
  }

  setPreferences(preferences: object): this {
    this.preferences = preferences
    return this
  }

  build(): UserProfile {
    return new UserProfile(
      this.name,
      this.email,
      this.age,
      this.bio,
      this.avatar,
      this.preferences
    )
  }
}

// 사용 예제
const profile = new UserProfileBuilder()
  .setName('김철수')
  .setEmail('chulsoo@example.com')
  .setAge(25)
  .setBio('소프트웨어 개발자입니다.')
  .setPreferences({ theme: 'dark', language: 'ko' })
  .build()</code></pre>
      </div>

      <div class="interactive-demo">
        <h3>👤 실제 프로필 생성 시뮬레이션</h3>

        <div class="form-group">
          <label>이름 (필수)</label>
          <input v-model="profileName" type="text" placeholder="이름을 입력하세요" class="input-field" />
        </div>

        <div class="form-group">
          <label>이메일 (필수)</label>
          <input v-model="profileEmail" type="email" placeholder="이메일을 입력하세요" class="input-field" />
        </div>

        <div class="form-group">
          <label>나이 (선택사항)</label>
          <input v-model.number="profileAge" type="number" placeholder="나이를 입력하세요" class="input-field" />
        </div>

        <div class="form-group">
          <label>자기소개 (선택사항)</label>
          <textarea v-model="profileBio" placeholder="자기소개를 입력하세요" class="input-field" rows="3"></textarea>
        </div>

        <div class="form-group">
          <label>아바타 선택 (선택사항)</label>
          <div class="avatar-selection">
            <button
              v-for="avatar in avatars"
              :key="avatar"
              @click="profileAvatar = avatar"
              :class="['avatar-btn', { active: profileAvatar === avatar }]"
            >
              {{ avatar }}
            </button>
          </div>
        </div>

        <div class="form-group">
          <label>테마 설정</label>
          <select v-model="profileTheme" class="input-field">
            <option value="light">라이트</option>
            <option value="dark">다크</option>
            <option value="auto">자동</option>
          </select>
        </div>

        <button
          @click="createProfile"
          class="test-btn"
          :disabled="!canCreateProfile"
        >
          프로필 생성
        </button>
      </div>

      <div v-if="fluentResult" class="result">
        <h3>🚀 생성 결과</h3>
        <pre>{{ fluentResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>C. Director Pattern (디렉터 패턴)</h2>
      <p>Director가 Builder를 사용하여 사전 정의된 구성으로 객체를 생성합니다.</p>

      <div class="code-block">
        <h3>📝 코드</h3>
        <pre><code>// Product - 식사
class Meal {
  items: string[] = []

  addItem(item: string): void {
    this.items.push(item)
  }

  showItems(): string {
    return this.items.join('\n')
  }

  getCost(): number {
    return this.items.length * 5000 // 간단한 가격 계산
  }
}

// Builder 인터페이스
interface MealBuilder {
  addBurger(): this
  addDrink(): this
  addSide(): this
  addDessert(): this
  build(): Meal
}

// Concrete Builder
class VegMealBuilder implements MealBuilder {
  private meal: Meal

  constructor() {
    this.meal = new Meal()
  }

  addBurger(): this {
    this.meal.addItem('🥗 채식 버거')
    return this
  }

  addDrink(): this {
    this.meal.addItem('🥤 오렌지 주스')
    return this
  }

  addSide(): this {
    this.meal.addItem('🍟 감자튀김')
    return this
  }

  addDessert(): this {
    this.meal.addItem('🍰 과일 샐러드')
    return this
  }

  build(): Meal {
    return this.meal
  }
}

class NonVegMealBuilder implements MealBuilder {
  private meal: Meal

  constructor() {
    this.meal = new Meal()
  }

  addBurger(): this {
    this.meal.addItem('🍔 치킨 버거')
    return this
  }

  addDrink(): this {
    this.meal.addItem('🥤 콜라')
    return this
  }

  addSide(): this {
    this.meal.addItem('🍗 치킨 너겟')
    return this
  }

  addDessert(): this {
    this.meal.addItem('🍦 아이스크림')
    return this
  }

  build(): Meal {
    return this.meal
  }
}

// Director - 사전 정의된 구성으로 객체 생성
class MealDirector {
  prepareBasicMeal(builder: MealBuilder): Meal {
    return builder
      .addBurger()
      .addDrink()
      .build()
  }

  prepareFullMeal(builder: MealBuilder): Meal {
    return builder
      .addBurger()
      .addDrink()
      .addSide()
      .addDessert()
      .build()
  }
}

// 사용 예제
const director = new MealDirector()
const vegBuilder = new VegMealBuilder()
const fullVegMeal = director.prepareFullMeal(vegBuilder)</code></pre>
      </div>

      <div class="interactive-demo">
        <h3>🍔 실제 식사 주문 시뮬레이션</h3>

        <div class="form-group">
          <label>식사 타입 선택</label>
          <div class="meal-type-selection">
            <button
              @click="mealType = 'veg'"
              :class="['meal-type-btn', { active: mealType === 'veg' }]"
            >
              🥗 채식
            </button>
            <button
              @click="mealType = 'nonveg'"
              :class="['meal-type-btn', { active: mealType === 'nonveg' }]"
            >
              🍔 일반
            </button>
          </div>
        </div>

        <div class="form-group">
          <label>세트 구성 선택</label>
          <div class="meal-size-selection">
            <button
              @click="mealSize = 'basic'"
              :class="['meal-size-btn', { active: mealSize === 'basic' }]"
            >
              기본 세트
              <span class="meal-description">(버거 + 음료)</span>
            </button>
            <button
              @click="mealSize = 'full'"
              :class="['meal-size-btn', { active: mealSize === 'full' }]"
            >
              풀 세트
              <span class="meal-description">(버거 + 음료 + 사이드 + 디저트)</span>
            </button>
          </div>
        </div>

        <button
          @click="orderMeal"
          class="test-btn"
          :disabled="!mealType || !mealSize"
        >
          주문하기
        </button>
      </div>

      <div v-if="directorResult" class="result">
        <h3>🚀 주문 결과</h3>
        <pre>{{ directorResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>D. Step Builder (단계별 빌더)</h2>
      <p>필수 매개변수를 단계별로 강제하여 유효한 객체만 생성되도록 보장합니다.</p>

      <div class="code-block">
        <h3>📝 코드</h3>
        <pre><code>// Product - HTTP 요청
class HttpRequest {
  constructor(
    public method: string,
    public url: string,
    public headers?: Record&lt;string, string&gt;,
    public body?: string
  ) {}

  toString(): string {
    return `${this.method} ${this.url}
Headers: ${JSON.stringify(this.headers || {})}
Body: ${this.body || 'None'}`
  }
}

// Step Builder 인터페이스들
interface IMethodStep {
  setMethod(method: string): IUrlStep
}

interface IUrlStep {
  setUrl(url: string): IOptionalStep
}

interface IOptionalStep {
  setHeaders(headers: Record&lt;string, string&gt;): this
  setBody(body: string): this
  build(): HttpRequest
}

// Step Builder 구현
class HttpRequestBuilder implements IMethodStep, IUrlStep, IOptionalStep {
  private method!: string
  private url!: string
  private headers?: Record&lt;string, string&gt;
  private body?: string

  static create(): IMethodStep {
    return new HttpRequestBuilder()
  }

  setMethod(method: string): IUrlStep {
    this.method = method
    return this
  }

  setUrl(url: string): IOptionalStep {
    this.url = url
    return this
  }

  setHeaders(headers: Record&lt;string, string&gt;): this {
    this.headers = headers
    return this
  }

  setBody(body: string): this {
    this.body = body
    return this
  }

  build(): HttpRequest {
    return new HttpRequest(this.method, this.url, this.headers, this.body)
  }
}

// 사용 예제 - 타입 안전하게 단계별로 생성
const request = HttpRequestBuilder.create()
  .setMethod('POST')              // 필수: method
  .setUrl('/api/users')           // 필수: url
  .setHeaders({ 'Content-Type': 'application/json' })  // 선택
  .setBody('{"name":"John"}')     // 선택
  .build()</code></pre>
      </div>

      <div class="interactive-demo">
        <h3>🌐 실제 HTTP 요청 생성 시뮬레이션</h3>

        <div class="form-group">
          <label>HTTP 메서드 (필수)</label>
          <select v-model="httpMethod" class="input-field">
            <option value="">선택하세요</option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>
        </div>

        <div class="form-group">
          <label>URL (필수)</label>
          <input v-model="httpUrl" type="text" placeholder="/api/users" class="input-field" />
        </div>

        <div class="form-group">
          <label>Authorization Token (선택사항)</label>
          <input v-model="httpToken" type="text" placeholder="Bearer token123" class="input-field" />
        </div>

        <div class="form-group" v-if="httpMethod === 'POST' || httpMethod === 'PUT' || httpMethod === 'PATCH'">
          <label>Request Body (선택사항)</label>
          <textarea v-model="httpBody" placeholder='{"name": "John", "age": 30}' class="input-field" rows="4"></textarea>
        </div>

        <button
          @click="createHttpRequest"
          class="test-btn"
          :disabled="!canCreateRequest"
        >
          요청 생성
        </button>
      </div>

      <div v-if="stepResult" class="result">
        <h3>🚀 생성 결과</h3>
        <pre>{{ stepResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>패턴의 장점</h2>
      <div class="benefits-list">
        <h3>✨ 주요 장점</h3>
        <ul>
          <li><strong>복잡도 감소:</strong> 복잡한 객체 생성 과정을 단계별로 분리</li>
          <li><strong>가독성 향상:</strong> Fluent Interface로 코드의 의도가 명확</li>
          <li><strong>불변성:</strong> 완전히 구성된 후 객체를 반환하여 안전성 보장</li>
          <li><strong>유연성:</strong> 같은 구성 과정으로 다른 표현 생성 가능</li>
          <li><strong>타입 안전:</strong> Step Builder로 필수 매개변수 강제</li>
        </ul>
      </div>

      <div class="code-block">
        <h3>📝 실무 활용 사례</h3>
        <pre><code>// 1. API 요청 빌더
class ApiRequestBuilder {
  method(m: string): this { /*...*/ }
  endpoint(e: string): this { /*...*/ }
  auth(token: string): this { /*...*/ }
  build(): Request { /*...*/ }
}

// 2. 이메일 빌더
class EmailBuilder {
  to(recipient: string): this { /*...*/ }
  subject(s: string): this { /*...*/ }
  body(b: string): this { /*...*/ }
  attach(file: File): this { /*...*/ }
  send(): Promise&lt;void&gt; { /*...*/ }
}

// 3. 쿼리 빌더 (SQL/NoSQL)
class QueryBuilder {
  select(...fields: string[]): this { /*...*/ }
  from(table: string): this { /*...*/ }
  where(condition: string): this { /*...*/ }
  orderBy(field: string): this { /*...*/ }
  execute(): Promise&lt;any[]&gt; { /*...*/ }
}

// 4. UI 컴포넌트 빌더
class DialogBuilder {
  title(t: string): this { /*...*/ }
  content(c: string): this { /*...*/ }
  addButton(label: string, onClick: Function): this { /*...*/ }
  show(): void { /*...*/ }
}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const simpleResult = ref<string>('')
const fluentResult = ref<string>('')
const directorResult = ref<string>('')
const stepResult = ref<string>('')

// Interactive Computer Builder (Section A)
const selectedCPU = ref<string>('')
const selectedRAM = ref<string>('')
const selectedStorage = ref<string>('')
const selectedGPU = ref<string>('')

const canBuildComputer = computed(() => {
  return selectedCPU.value.length > 0 &&
         selectedRAM.value.length > 0 &&
         selectedStorage.value.length > 0
})

// Interactive Profile Builder (Section B)
const profileName = ref<string>('')
const profileEmail = ref<string>('')
const profileAge = ref<number | null>(null)
const profileBio = ref<string>('')
const profileAvatar = ref<string>('')
const profileTheme = ref<string>('dark')

const avatars = ['👨‍💻', '👩‍💻', '🧑‍🎨', '👨‍🔬', '👩‍🏫', '🧑‍💼', '👨‍⚕️', '👩‍🚀']

const canCreateProfile = computed(() => {
  return profileName.value.trim().length > 0 &&
         profileEmail.value.trim().length > 0 &&
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileEmail.value)
})

// Interactive Meal Builder (Section C)
const mealType = ref<string>('')
const mealSize = ref<string>('')

// Interactive HTTP Request Builder (Section D)
const httpMethod = ref<string>('')
const httpUrl = ref<string>('')
const httpToken = ref<string>('')
const httpBody = ref<string>('')

const canCreateRequest = computed(() => {
  return httpMethod.value.length > 0 &&
         httpUrl.value.trim().length > 0
})

function buildComputer() {
  const builder = new ComputerBuilder()
    .setCPU(selectedCPU.value)
    .setRAM(selectedRAM.value)
    .setStorage(selectedStorage.value)

  if (selectedGPU.value) {
    builder.setGPU(selectedGPU.value)
  }

  const computer = builder.build()
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

  const result = `[${timestamp}] 컴퓨터 조립 완료

🖥️ 조립된 컴퓨터 사양:
${computer.getSpecs()}

✅ Builder 패턴을 사용하여 단계별로 컴퓨터를 조립했습니다!
✅ CPU, RAM, Storage는 필수 항목입니다.
✅ GPU는 선택 사항으로 유연하게 추가할 수 있습니다!`

  if (simpleResult.value) {
    simpleResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
  } else {
    simpleResult.value = result
  }
}

function createProfile() {
  const builder = new UserProfileBuilder()
    .setName(profileName.value)
    .setEmail(profileEmail.value)

  if (profileAge.value !== null && profileAge.value > 0) {
    builder.setAge(profileAge.value)
  }

  if (profileBio.value.trim()) {
    builder.setBio(profileBio.value)
  }

  if (profileAvatar.value) {
    builder.setAvatar(profileAvatar.value)
  }

  builder.setPreferences({ theme: profileTheme.value, language: 'ko' })

  const profile = builder.build()
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

  const result = `[${timestamp}] 프로필 생성 완료

👤 생성된 프로필:
${profile.toString()}

✅ Fluent Interface Builder로 프로필을 생성했습니다!
✅ 이름과 이메일은 필수, 나머지는 선택적으로 추가되었습니다!
✅ 메서드 체이닝으로 가독성 높은 코드를 작성했습니다!`

  if (fluentResult.value) {
    fluentResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
  } else {
    fluentResult.value = result
  }
}

function orderMeal() {
  const director = new MealDirector()
  let builder: MealBuilder

  if (mealType.value === 'veg') {
    builder = new VegMealBuilder()
  } else {
    builder = new NonVegMealBuilder()
  }

  const meal = mealSize.value === 'basic'
    ? director.prepareBasicMeal(builder)
    : director.prepareFullMeal(builder)

  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  const mealTypeName = mealType.value === 'veg' ? '채식' : '일반'
  const mealSizeName = mealSize.value === 'basic' ? '기본' : '풀'

  const result = `[${timestamp}] 주문 완료

🍽️ ${mealTypeName} ${mealSizeName} 세트:
${meal.showItems()}

💰 총 가격: ${meal.getCost()}원

✅ Director 패턴으로 사전 정의된 구성의 식사를 생성했습니다!
✅ 같은 구성 과정(basic/full)으로 다른 표현(채식/일반)을 만들었습니다!`

  if (directorResult.value) {
    directorResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
  } else {
    directorResult.value = result
  }
}

function createHttpRequest() {
  const builder = HttpRequestBuilder.create()
    .setMethod(httpMethod.value)
    .setUrl(httpUrl.value)

  const headers: Record<string, string> = {}

  if (httpToken.value.trim()) {
    headers['Authorization'] = httpToken.value
  }

  if (httpMethod.value === 'POST' || httpMethod.value === 'PUT' || httpMethod.value === 'PATCH') {
    headers['Content-Type'] = 'application/json'
  }

  if (Object.keys(headers).length > 0) {
    builder.setHeaders(headers)
  }

  if (httpBody.value.trim() && (httpMethod.value === 'POST' || httpMethod.value === 'PUT' || httpMethod.value === 'PATCH')) {
    builder.setBody(httpBody.value)
  }

  const request = builder.build()
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

  const result = `[${timestamp}] HTTP 요청 생성 완료

🌐 생성된 요청:
${request.toString()}

✅ Step Builder로 필수 매개변수(method, url)를 순서대로 강제했습니다!
✅ TypeScript 타입 시스템이 올바른 순서를 보장합니다!
✅ 선택적 매개변수(headers, body)는 자유롭게 추가했습니다!`

  if (stepResult.value) {
    stepResult.value += `\n\n${'='.repeat(60)}\n\n${result}`
  } else {
    stepResult.value = result
  }
}

// ============ A. Simple Builder ============

class Computer {
  cpu?: string
  ram?: string
  storage?: string
  gpu?: string

  getSpecs(): string {
    return `CPU: ${this.cpu || 'None'}
RAM: ${this.ram || 'None'}
Storage: ${this.storage || 'None'}
GPU: ${this.gpu || 'None'}`
  }
}

class ComputerBuilder {
  private computer: Computer

  constructor() {
    this.computer = new Computer()
  }

  setCPU(cpu: string): this {
    this.computer.cpu = cpu
    return this
  }

  setRAM(ram: string): this {
    this.computer.ram = ram
    return this
  }

  setStorage(storage: string): this {
    this.computer.storage = storage
    return this
  }

  setGPU(gpu: string): this {
    this.computer.gpu = gpu
    return this
  }

  build(): Computer {
    return this.computer
  }
}

// ============ B. Fluent Interface Builder ============

class UserProfile {
  constructor(
    public name: string,
    public email: string,
    public age?: number,
    public bio?: string,
    public avatar?: string,
    public preferences?: object
  ) {}

  toString(): string {
    return `Name: ${this.name}
Email: ${this.email}
Age: ${this.age || 'Not specified'}
Bio: ${this.bio || 'No bio'}
Avatar: ${this.avatar || 'Default'}
Preferences: ${JSON.stringify(this.preferences || {})}`
  }
}

class UserProfileBuilder {
  private name!: string
  private email!: string
  private age?: number
  private bio?: string
  private avatar?: string
  private preferences?: object

  setName(name: string): this {
    this.name = name
    return this
  }

  setEmail(email: string): this {
    this.email = email
    return this
  }

  setAge(age: number): this {
    this.age = age
    return this
  }

  setBio(bio: string): this {
    this.bio = bio
    return this
  }

  setAvatar(avatar: string): this {
    this.avatar = avatar
    return this
  }

  setPreferences(preferences: object): this {
    this.preferences = preferences
    return this
  }

  build(): UserProfile {
    return new UserProfile(
      this.name,
      this.email,
      this.age,
      this.bio,
      this.avatar,
      this.preferences
    )
  }
}

// ============ C. Director Pattern ============

class Meal {
  items: string[] = []

  addItem(item: string): void {
    this.items.push(item)
  }

  showItems(): string {
    return this.items.join('\n')
  }

  getCost(): number {
    return this.items.length * 5000
  }
}

interface MealBuilder {
  addBurger(): this
  addDrink(): this
  addSide(): this
  addDessert(): this
  build(): Meal
}

class VegMealBuilder implements MealBuilder {
  private meal: Meal

  constructor() {
    this.meal = new Meal()
  }

  addBurger(): this {
    this.meal.addItem('🥗 채식 버거')
    return this
  }

  addDrink(): this {
    this.meal.addItem('🥤 오렌지 주스')
    return this
  }

  addSide(): this {
    this.meal.addItem('🍟 감자튀김')
    return this
  }

  addDessert(): this {
    this.meal.addItem('🍰 과일 샐러드')
    return this
  }

  build(): Meal {
    return this.meal
  }
}

class NonVegMealBuilder implements MealBuilder {
  private meal: Meal

  constructor() {
    this.meal = new Meal()
  }

  addBurger(): this {
    this.meal.addItem('🍔 치킨 버거')
    return this
  }

  addDrink(): this {
    this.meal.addItem('🥤 콜라')
    return this
  }

  addSide(): this {
    this.meal.addItem('🍗 치킨 너겟')
    return this
  }

  addDessert(): this {
    this.meal.addItem('🍦 아이스크림')
    return this
  }

  build(): Meal {
    return this.meal
  }
}

class MealDirector {
  prepareBasicMeal(builder: MealBuilder): Meal {
    return builder
      .addBurger()
      .addDrink()
      .build()
  }

  prepareFullMeal(builder: MealBuilder): Meal {
    return builder
      .addBurger()
      .addDrink()
      .addSide()
      .addDessert()
      .build()
  }
}

// ============ D. Step Builder ============

class HttpRequest {
  constructor(
    public method: string,
    public url: string,
    public headers?: Record<string, string>,
    public body?: string
  ) {}

  toString(): string {
    return `${this.method} ${this.url}
Headers: ${JSON.stringify(this.headers || {})}
Body: ${this.body || 'None'}`
  }
}

interface IMethodStep {
  setMethod(method: string): IUrlStep
}

interface IUrlStep {
  setUrl(url: string): IOptionalStep
}

interface IOptionalStep {
  setHeaders(headers: Record<string, string>): this
  setBody(body: string): this
  build(): HttpRequest
}

class HttpRequestBuilder implements IMethodStep, IUrlStep, IOptionalStep {
  private method!: string
  private url!: string
  private headers?: Record<string, string>
  private body?: string

  static create(): IMethodStep {
    return new HttpRequestBuilder()
  }

  setMethod(method: string): IUrlStep {
    this.method = method
    return this
  }

  setUrl(url: string): IOptionalStep {
    this.url = url
    return this
  }

  setHeaders(headers: Record<string, string>): this {
    this.headers = headers
    return this
  }

  setBody(body: string): this {
    this.body = body
    return this
  }

  build(): HttpRequest {
    return new HttpRequest(this.method, this.url, this.headers, this.body)
  }
}
</script>

<style scoped>
/* BuilderPattern 전용 스타일이 필요한 경우 여기에 추가 */
/* 공통 스타일은 src/assets/main.css에서 전역으로 적용됨 */
</style>
