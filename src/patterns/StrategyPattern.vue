<template>
  <div class="pattern-container">
    <h1>Strategy Pattern</h1>
    <p class="description">
      전략 패턴은 알고리즘군을 정의하고 각각을 캡슐화하여 교환해서 사용할 수 있도록 만드는 행위 패턴입니다.
      런타임에 알고리즘을 선택할 수 있어 유연한 설계가 가능합니다.
    </p>

    <div class="demo-section">
      <h2>A. Payment Strategy (결제 전략)</h2>
      <p>다양한 결제 방법을 전략으로 캡슐화하여 동적으로 선택할 수 있습니다.</p>

      <div class="code-block">
        <h3>📝 코드</h3>
        <pre><code>// Strategy - 결제 전략 인터페이스
interface PaymentStrategy {
  pay(amount: number): string
}

// Concrete Strategy 1 - 신용카드 결제
class CreditCardPayment implements PaymentStrategy {
  constructor(
    private cardNumber: string,
    private cardHolder: string
  ) {}

  pay(amount: number): string {
    return `신용카드로 ${amount}원 결제
카드번호: ${this.cardNumber}
소유자: ${this.cardHolder}`
  }
}

// Concrete Strategy 2 - PayPal 결제
class PayPalPayment implements PaymentStrategy {
  constructor(private email: string) {}

  pay(amount: number): string {
    return `PayPal로 ${amount}원 결제
계정: ${this.email}`
  }
}

// Concrete Strategy 3 - 비트코인 결제
class BitcoinPayment implements PaymentStrategy {
  constructor(private walletAddress: string) {}

  pay(amount: number): string {
    return `Bitcoin으로 ${amount}원 결제
지갑 주소: ${this.walletAddress}`
  }
}

// Context - 결제 처리기
class PaymentProcessor {
  private strategy?: PaymentStrategy

  setStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy
  }

  processPayment(amount: number): string {
    if (!this.strategy) {
      return '결제 방법이 선택되지 않았습니다.'
    }
    return this.strategy.pay(amount)
  }
}

// 사용 예제
const processor = new PaymentProcessor()

processor.setStrategy(new CreditCardPayment('1234-5678', '김철수'))
processor.processPayment(50000)

processor.setStrategy(new PayPalPayment('user@example.com'))
processor.processPayment(30000)</code></pre>
      </div>

      <div class="interactive-demo">
        <h3>💳 실제 결제 시뮬레이션</h3>

        <div class="form-group">
          <label>결제 금액 (원)</label>
          <input
            v-model.number="paymentAmount"
            type="number"
            placeholder="금액 입력"
            class="input-field"
            min="1000"
            step="1000"
          />
        </div>

        <div class="form-group">
          <label>결제 수단 선택</label>
          <div class="payment-methods">
            <button
              @click="selectPaymentMethod('credit')"
              :class="['payment-method-btn', { active: selectedMethod === 'credit' }]"
            >
              💳 신용카드
            </button>
            <button
              @click="selectPaymentMethod('paypal')"
              :class="['payment-method-btn', { active: selectedMethod === 'paypal' }]"
            >
              🅿️ PayPal
            </button>
            <button
              @click="selectPaymentMethod('bitcoin')"
              :class="['payment-method-btn', { active: selectedMethod === 'bitcoin' }]"
            >
              ₿ Bitcoin
            </button>
          </div>
        </div>

        <div v-if="selectedMethod === 'credit'" class="payment-details">
          <div class="form-group">
            <label>카드 번호</label>
            <input
              v-model="creditCardNumber"
              type="text"
              placeholder="1234-5678-9012-3456"
              class="input-field"
              maxlength="19"
            />
          </div>
          <div class="form-group">
            <label>카드 소유자</label>
            <input
              v-model="cardHolder"
              type="text"
              placeholder="홍길동"
              class="input-field"
            />
          </div>
        </div>

        <div v-if="selectedMethod === 'paypal'" class="payment-details">
          <div class="form-group">
            <label>PayPal 이메일</label>
            <input
              v-model="paypalEmail"
              type="email"
              placeholder="user@example.com"
              class="input-field"
            />
          </div>
        </div>

        <div v-if="selectedMethod === 'bitcoin'" class="payment-details">
          <div class="form-group">
            <label>Bitcoin 지갑 주소</label>
            <input
              v-model="bitcoinWallet"
              type="text"
              placeholder="1A2B3C4D5E6F7G8H9I0J"
              class="input-field"
            />
          </div>
        </div>

        <button
          @click="processInteractivePayment"
          class="test-btn"
          :disabled="!canProcessPayment"
        >
          {{ paymentAmount ? `${paymentAmount.toLocaleString()}원 결제하기` : '결제하기' }}
        </button>
      </div>

      <div v-if="paymentResult" class="result">
        <h3>🚀 결제 결과</h3>
        <pre>{{ paymentResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>B. Sorting Strategy (정렬 전략)</h2>
      <p>다양한 정렬 알고리즘을 전략으로 캡슐화하여 상황에 맞게 선택합니다.</p>

      <div class="code-block">
        <h3>📝 코드</h3>
        <pre><code>// Strategy - 정렬 전략 인터페이스
interface SortStrategy {
  sort(data: number[]): number[]
  getName(): string
}

// Concrete Strategy 1 - 버블 정렬
class BubbleSort implements SortStrategy {
  getName(): string {
    return 'Bubble Sort'
  }

  sort(data: number[]): number[] {
    const arr = [...data]
    const n = arr.length

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        }
      }
    }
    return arr
  }
}

// Concrete Strategy 2 - 퀵 정렬
class QuickSort implements SortStrategy {
  getName(): string {
    return 'Quick Sort'
  }

  sort(data: number[]): number[] {
    if (data.length <= 1) return data

    const pivot = data[Math.floor(data.length / 2)]
    const left = data.filter(x => x < pivot)
    const middle = data.filter(x => x === pivot)
    const right = data.filter(x => x > pivot)

    return [...this.sort(left), ...middle, ...this.sort(right)]
  }
}

// Concrete Strategy 3 - 병합 정렬
class MergeSort implements SortStrategy {
  getName(): string {
    return 'Merge Sort'
  }

  sort(data: number[]): number[] {
    if (data.length <= 1) return data

    const mid = Math.floor(data.length / 2)
    const left = this.sort(data.slice(0, mid))
    const right = this.sort(data.slice(mid))

    return this.merge(left, right)
  }

  private merge(left: number[], right: number[]): number[] {
    const result: number[] = []
    let i = 0, j = 0

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i++])
      } else {
        result.push(right[j++])
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j))
  }
}

// Context - 정렬 처리기
class Sorter {
  private strategy?: SortStrategy

  setStrategy(strategy: SortStrategy): void {
    this.strategy = strategy
  }

  sort(data: number[]): { sorted: number[]; algorithm: string } {
    if (!this.strategy) {
      return { sorted: data, algorithm: 'None' }
    }
    return {
      sorted: this.strategy.sort(data),
      algorithm: this.strategy.getName()
    }
  }
}</code></pre>
      </div>

      <div class="interactive-demo">
        <h3>🔢 실제 정렬 시뮬레이션</h3>

        <div class="form-group">
          <label>정렬할 숫자 입력 (쉼표로 구분)</label>
          <input
            v-model="sortInput"
            type="text"
            placeholder="예: 64, 34, 25, 12, 22, 11, 90"
            class="input-field"
          />
        </div>

        <div class="form-group">
          <label>정렬 알고리즘 선택</label>
          <div class="payment-methods">
            <button
              @click="selectedSortAlgorithm = 'bubble'"
              :class="['payment-method-btn', { active: selectedSortAlgorithm === 'bubble' }]"
            >
              🫧 Bubble Sort
            </button>
            <button
              @click="selectedSortAlgorithm = 'quick'"
              :class="['payment-method-btn', { active: selectedSortAlgorithm === 'quick' }]"
            >
              ⚡ Quick Sort
            </button>
            <button
              @click="selectedSortAlgorithm = 'merge'"
              :class="['payment-method-btn', { active: selectedSortAlgorithm === 'merge' }]"
            >
              🔀 Merge Sort
            </button>
          </div>
        </div>

        <button
          @click="processInteractiveSorting"
          class="test-btn"
          :disabled="!canSort"
        >
          정렬 실행
        </button>
      </div>

      <div v-if="sortingResult" class="result">
        <h3>🚀 정렬 결과</h3>
        <pre>{{ sortingResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>C. Compression Strategy (압축 전략)</h2>
      <p>파일 타입에 따라 적절한 압축 알고리즘을 선택합니다.</p>

      <div class="code-block">
        <h3>📝 코드</h3>
        <pre><code>// Strategy - 압축 전략 인터페이스
interface CompressionStrategy {
  compress(file: string): string
  decompress(file: string): string
  getFormat(): string
}

// Concrete Strategy 1 - ZIP 압축
class ZipCompression implements CompressionStrategy {
  getFormat(): string {
    return 'ZIP'
  }

  compress(file: string): string {
    return `[ZIP] ${file}를 압축했습니다.
압축률: 약 60%
호환성: 매우 높음`
  }

  decompress(file: string): string {
    return `[ZIP] ${file}를 압축 해제했습니다.`
  }
}

// Concrete Strategy 2 - RAR 압축
class RarCompression implements CompressionStrategy {
  getFormat(): string {
    return 'RAR'
  }

  compress(file: string): string {
    return `[RAR] ${file}를 압축했습니다.
압축률: 약 70%
호환성: 높음`
  }

  decompress(file: string): string {
    return `[RAR] ${file}를 압축 해제했습니다.`
  }
}

// Concrete Strategy 3 - 7Z 압축
class SevenZipCompression implements CompressionStrategy {
  getFormat(): string {
    return '7Z'
  }

  compress(file: string): string {
    return `[7Z] ${file}를 압축했습니다.
압축률: 약 80%
호환성: 보통`
  }

  decompress(file: string): string {
    return `[7Z] ${file}를 압축 해제했습니다.`
  }
}

// Context - 파일 압축기
class FileCompressor {
  private strategy?: CompressionStrategy

  setStrategy(strategy: CompressionStrategy): void {
    this.strategy = strategy
  }

  compressFile(file: string): string {
    if (!this.strategy) {
      return '압축 형식이 선택되지 않았습니다.'
    }
    return this.strategy.compress(file)
  }

  decompressFile(file: string): string {
    if (!this.strategy) {
      return '압축 형식이 선택되지 않았습니다.'
    }
    return this.strategy.decompress(file)
  }

  getFormat(): string {
    return this.strategy?.getFormat() || 'None'
  }
}</code></pre>
      </div>

      <div class="interactive-demo">
        <h3>📦 실제 파일 압축 시뮬레이션</h3>

        <div class="form-group">
          <label>파일명</label>
          <input
            v-model="fileName"
            type="text"
            placeholder="예: document.pdf"
            class="input-field"
          />
        </div>

        <div class="form-group">
          <label>압축 형식 선택</label>
          <div class="payment-methods">
            <button
              @click="selectedCompression = 'zip'"
              :class="['payment-method-btn', { active: selectedCompression === 'zip' }]"
            >
              📁 ZIP
            </button>
            <button
              @click="selectedCompression = 'rar'"
              :class="['payment-method-btn', { active: selectedCompression === 'rar' }]"
            >
              📦 RAR
            </button>
            <button
              @click="selectedCompression = '7z'"
              :class="['payment-method-btn', { active: selectedCompression === '7z' }]"
            >
              🗜️ 7Z
            </button>
          </div>
        </div>

        <button
          @click="processInteractiveCompression"
          class="test-btn"
          :disabled="!canCompress"
        >
          압축 실행
        </button>
      </div>

      <div v-if="compressionResult" class="result">
        <h3>🚀 압축 결과</h3>
        <pre>{{ compressionResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>D. Route Planning Strategy (경로 계획 전략)</h2>
      <p>이동 수단에 따라 최적의 경로 계산 알고리즘을 선택합니다.</p>

      <div class="code-block">
        <h3>📝 코드</h3>
        <pre><code>// Strategy - 경로 계획 전략 인터페이스
interface RouteStrategy {
  calculateRoute(start: string, end: string): string
  getMode(): string
}

// Concrete Strategy 1 - 자동차 경로
class CarRouteStrategy implements RouteStrategy {
  getMode(): string {
    return '자동차'
  }

  calculateRoute(start: string, end: string): string {
    return `🚗 자동차 경로: ${start} → ${end}
거리: 15.3 km
예상 시간: 25분
경로: 고속도로 이용
통행료: 2,500원`
  }
}

// Concrete Strategy 2 - 대중교통 경로
class PublicTransportStrategy implements RouteStrategy {
  getMode(): string {
    return '대중교통'
  }

  calculateRoute(start: string, end: string): string {
    return `🚇 대중교통 경로: ${start} → ${end}
환승: 1회 (지하철 2호선 → 버스 145번)
예상 시간: 40분
요금: 1,400원
도보 거리: 500m`
  }
}

// Concrete Strategy 3 - 도보 경로
class WalkingRouteStrategy implements RouteStrategy {
  getMode(): string {
    return '도보'
  }

  calculateRoute(start: string, end: string): string {
    return `🚶 도보 경로: ${start} → ${end}
거리: 2.8 km
예상 시간: 35분
칼로리 소모: 약 140 kcal
경로: 공원 길 추천`
  }
}

// Concrete Strategy 4 - 자전거 경로
class BicycleRouteStrategy implements RouteStrategy {
  getMode(): string {
    return '자전거'
  }

  calculateRoute(start: string, end: string): string {
    return `🚴 자전거 경로: ${start} → ${end}
거리: 3.5 km
예상 시간: 15분
칼로리 소모: 약 70 kcal
경로: 자전거 전용 도로 이용`
  }
}

// Context - 내비게이션 시스템
class NavigationSystem {
  private strategy?: RouteStrategy

  setStrategy(strategy: RouteStrategy): void {
    this.strategy = strategy
  }

  planRoute(start: string, end: string): string {
    if (!this.strategy) {
      return '이동 수단을 선택해주세요.'
    }
    return this.strategy.calculateRoute(start, end)
  }

  getMode(): string {
    return this.strategy?.getMode() || 'None'
  }
}</code></pre>
      </div>

      <div class="interactive-demo">
        <h3>🗺️ 실제 경로 계획 시뮬레이션</h3>

        <div class="form-group">
          <label>출발지</label>
          <input
            v-model="startLocation"
            type="text"
            placeholder="예: 강남역"
            class="input-field"
          />
        </div>

        <div class="form-group">
          <label>도착지</label>
          <input
            v-model="endLocation"
            type="text"
            placeholder="예: 홍대입구역"
            class="input-field"
          />
        </div>

        <div class="form-group">
          <label>이동 수단 선택</label>
          <div class="payment-methods">
            <button
              @click="selectedTransport = 'car'"
              :class="['payment-method-btn', { active: selectedTransport === 'car' }]"
            >
              🚗 자동차
            </button>
            <button
              @click="selectedTransport = 'public'"
              :class="['payment-method-btn', { active: selectedTransport === 'public' }]"
            >
              🚇 대중교통
            </button>
            <button
              @click="selectedTransport = 'walk'"
              :class="['payment-method-btn', { active: selectedTransport === 'walk' }]"
            >
              🚶 도보
            </button>
            <button
              @click="selectedTransport = 'bicycle'"
              :class="['payment-method-btn', { active: selectedTransport === 'bicycle' }]"
            >
              🚴 자전거
            </button>
          </div>
        </div>

        <button
          @click="processInteractiveRoute"
          class="test-btn"
          :disabled="!canCalculateRoute"
        >
          경로 탐색
        </button>
      </div>

      <div v-if="routeResult" class="result">
        <h3>🚀 경로 결과</h3>
        <pre>{{ routeResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>패턴의 장점</h2>
      <div class="benefits-list">
        <h3>✨ 주요 장점</h3>
        <ul>
          <li><strong>OCP 준수:</strong> 새로운 전략 추가 시 기존 코드 수정 불필요</li>
          <li><strong>런타임 선택:</strong> 실행 중에 알고리즘을 동적으로 변경 가능</li>
          <li><strong>코드 중복 제거:</strong> 알고리즘을 독립적인 클래스로 분리</li>
          <li><strong>단위 테스트:</strong> 각 전략을 독립적으로 테스트 가능</li>
          <li><strong>SRP 준수:</strong> 알고리즘의 세부 사항을 분리</li>
        </ul>
      </div>

      <div class="code-block">
        <h3>📝 실무 활용 사례</h3>
        <pre><code>// 1. 인증 전략
interface AuthStrategy {
  authenticate(credentials: Credentials): Promise&lt;User&gt;
}
class JWTAuth implements AuthStrategy { /*...*/ }
class OAuth2Auth implements AuthStrategy { /*...*/ }
class BasicAuth implements AuthStrategy { /*...*/ }

// 2. 캐싱 전략
interface CacheStrategy {
  get(key: string): any
  set(key: string, value: any): void
}
class MemoryCache implements CacheStrategy { /*...*/ }
class RedisCache implements CacheStrategy { /*...*/ }
class LocalStorageCache implements CacheStrategy { /*...*/ }

// 3. 할인 전략
interface DiscountStrategy {
  calculateDiscount(price: number): number
}
class SeasonalDiscount implements DiscountStrategy { /*...*/ }
class MembershipDiscount implements DiscountStrategy { /*...*/ }
class CouponDiscount implements DiscountStrategy { /*...*/ }

// 4. 로깅 전략
interface LogStrategy {
  log(message: string, level: LogLevel): void
}
class ConsoleLogger implements LogStrategy { /*...*/ }
class FileLogger implements LogStrategy { /*...*/ }
class RemoteLogger implements LogStrategy { /*...*/ }

// 5. 데이터 검증 전략
interface ValidationStrategy {
  validate(data: any): boolean
}
class EmailValidation implements ValidationStrategy { /*...*/ }
class PhoneValidation implements ValidationStrategy { /*...*/ }
class PasswordValidation implements ValidationStrategy { /*...*/ }</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const paymentResult = ref<string>('')
const sortingResult = ref<string>('')
const compressionResult = ref<string>('')
const routeResult = ref<string>('')

// Interactive Payment Demo
const paymentAmount = ref<number>(50000)
const selectedMethod = ref<string>('')
const creditCardNumber = ref<string>('')
const cardHolder = ref<string>('')
const paypalEmail = ref<string>('')
const bitcoinWallet = ref<string>('')

// Interactive Sorting Demo
const sortInput = ref<string>('64, 34, 25, 12, 22, 11, 90')
const selectedSortAlgorithm = ref<string>('')

// Interactive Compression Demo
const fileName = ref<string>('document.pdf')
const selectedCompression = ref<string>('')

// Interactive Route Demo
const startLocation = ref<string>('강남역')
const endLocation = ref<string>('홍대입구역')
const selectedTransport = ref<string>('')

const canProcessPayment = computed(() => {
  if (!paymentAmount.value || paymentAmount.value < 1000) return false
  if (!selectedMethod.value) return false

  if (selectedMethod.value === 'credit') {
    return creditCardNumber.value.length > 0 && cardHolder.value.length > 0
  } else if (selectedMethod.value === 'paypal') {
    return paypalEmail.value.length > 0
  } else if (selectedMethod.value === 'bitcoin') {
    return bitcoinWallet.value.length > 0
  }

  return false
})

const canSort = computed(() => {
  return sortInput.value.trim().length > 0 && selectedSortAlgorithm.value.length > 0
})

const canCompress = computed(() => {
  return fileName.value.trim().length > 0 && selectedCompression.value.length > 0
})

const canCalculateRoute = computed(() => {
  return startLocation.value.trim().length > 0 &&
         endLocation.value.trim().length > 0 &&
         selectedTransport.value.length > 0
})

function selectPaymentMethod(method: string) {
  selectedMethod.value = method
  // 결제 결과는 유지 (삭제하지 않음)
}

// ============ A. Payment Strategy ============

interface PaymentStrategy {
  pay(amount: number): string
}

class CreditCardPayment implements PaymentStrategy {
  constructor(
    private cardNumber: string,
    private cardHolder: string
  ) {}

  pay(amount: number): string {
    return `신용카드로 ${amount.toLocaleString()}원 결제
카드번호: ${this.cardNumber}
소유자: ${this.cardHolder}`
  }
}

class PayPalPayment implements PaymentStrategy {
  constructor(private email: string) {}

  pay(amount: number): string {
    return `PayPal로 ${amount.toLocaleString()}원 결제
계정: ${this.email}`
  }
}

class BitcoinPayment implements PaymentStrategy {
  constructor(private walletAddress: string) {}

  pay(amount: number): string {
    return `Bitcoin으로 ${amount.toLocaleString()}원 결제
지갑 주소: ${this.walletAddress}`
  }
}

class PaymentProcessor {
  private strategy?: PaymentStrategy

  setStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy
  }

  processPayment(amount: number): string {
    if (!this.strategy) {
      return '결제 방법이 선택되지 않았습니다.'
    }
    return this.strategy.pay(amount)
  }
}

function testPaymentStrategy() {
  const processor = new PaymentProcessor()
  const logs: string[] = []

  logs.push('💳 결제 처리 테스트\n')

  logs.push('--- 신용카드 결제 ---')
  processor.setStrategy(new CreditCardPayment('1234-5678-9012-3456', '김철수'))
  logs.push(processor.processPayment(50000))

  logs.push('\n--- PayPal 결제로 전략 변경 ---')
  processor.setStrategy(new PayPalPayment('user@example.com'))
  logs.push(processor.processPayment(30000))

  logs.push('\n--- Bitcoin 결제로 전략 변경 ---')
  processor.setStrategy(new BitcoinPayment('1A2B3C4D5E6F7G8H9I0J'))
  logs.push(processor.processPayment(100000))

  paymentResult.value = logs.join('\n') + '\n\n✅ 런타임에 결제 방법을 자유롭게 변경할 수 있습니다!'
}

function processInteractivePayment() {
  const processor = new PaymentProcessor()

  if (selectedMethod.value === 'credit') {
    processor.setStrategy(new CreditCardPayment(creditCardNumber.value, cardHolder.value))
  } else if (selectedMethod.value === 'paypal') {
    processor.setStrategy(new PayPalPayment(paypalEmail.value))
  } else if (selectedMethod.value === 'bitcoin') {
    processor.setStrategy(new BitcoinPayment(bitcoinWallet.value))
  }

  const result = processor.processPayment(paymentAmount.value)
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

  // 이전 결과가 있으면 구분선과 함께 추가
  if (paymentResult.value) {
    paymentResult.value += `\n\n${'='.repeat(60)}\n\n[${timestamp}] 결제 처리 완료\n\n${result}`
  } else {
    paymentResult.value = `[${timestamp}] 결제 처리 완료\n\n${result}\n\n✅ Strategy 패턴을 사용하여 런타임에 결제 방법을 동적으로 선택했습니다!`
  }
}

// ============ B. Sorting Strategy ============

interface SortStrategy {
  sort(data: number[]): number[]
  getName(): string
}

class BubbleSort implements SortStrategy {
  getName(): string {
    return 'Bubble Sort'
  }

  sort(data: number[]): number[] {
    const arr = [...data]
    const n = arr.length

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        }
      }
    }
    return arr
  }
}

class QuickSort implements SortStrategy {
  getName(): string {
    return 'Quick Sort'
  }

  sort(data: number[]): number[] {
    if (data.length <= 1) return data

    const pivot = data[Math.floor(data.length / 2)]
    const left = data.filter(x => x < pivot)
    const middle = data.filter(x => x === pivot)
    const right = data.filter(x => x > pivot)

    return [...this.sort(left), ...middle, ...this.sort(right)]
  }
}

class MergeSort implements SortStrategy {
  getName(): string {
    return 'Merge Sort'
  }

  sort(data: number[]): number[] {
    if (data.length <= 1) return data

    const mid = Math.floor(data.length / 2)
    const left = this.sort(data.slice(0, mid))
    const right = this.sort(data.slice(mid))

    return this.merge(left, right)
  }

  private merge(left: number[], right: number[]): number[] {
    const result: number[] = []
    let i = 0, j = 0

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i++])
      } else {
        result.push(right[j++])
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j))
  }
}

class Sorter {
  private strategy?: SortStrategy

  setStrategy(strategy: SortStrategy): void {
    this.strategy = strategy
  }

  sort(data: number[]): { sorted: number[]; algorithm: string } {
    if (!this.strategy) {
      return { sorted: data, algorithm: 'None' }
    }
    return {
      sorted: this.strategy.sort(data),
      algorithm: this.strategy.getName()
    }
  }
}

function testSortingStrategy() {
  const sorter = new Sorter()
  const testData = [64, 34, 25, 12, 22, 11, 90]
  const logs: string[] = []

  logs.push('🔢 정렬 알고리즘 테스트\n')
  logs.push(`원본 데이터: [${testData.join(', ')}]\n`)

  logs.push('--- Bubble Sort 전략 ---')
  sorter.setStrategy(new BubbleSort())
  const result1 = sorter.sort(testData)
  logs.push(`알고리즘: ${result1.algorithm}`)
  logs.push(`정렬 결과: [${result1.sorted.join(', ')}]`)

  logs.push('\n--- Quick Sort 전략으로 변경 ---')
  sorter.setStrategy(new QuickSort())
  const result2 = sorter.sort(testData)
  logs.push(`알고리즘: ${result2.algorithm}`)
  logs.push(`정렬 결과: [${result2.sorted.join(', ')}]`)

  logs.push('\n--- Merge Sort 전략으로 변경 ---')
  sorter.setStrategy(new MergeSort())
  const result3 = sorter.sort(testData)
  logs.push(`알고리즘: ${result3.algorithm}`)
  logs.push(`정렬 결과: [${result3.sorted.join(', ')}]`)

  sortingResult.value = logs.join('\n') + '\n\n✅ 동일한 데이터를 다양한 알고리즘으로 정렬할 수 있습니다!'
}

function processInteractiveSorting() {
  const numbers = sortInput.value.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n))
  const sorter = new Sorter()

  if (selectedSortAlgorithm.value === 'bubble') {
    sorter.setStrategy(new BubbleSort())
  } else if (selectedSortAlgorithm.value === 'quick') {
    sorter.setStrategy(new QuickSort())
  } else if (selectedSortAlgorithm.value === 'merge') {
    sorter.setStrategy(new MergeSort())
  }

  const result = sorter.sort(numbers)
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

  if (sortingResult.value) {
    sortingResult.value += `\n\n${'='.repeat(60)}\n\n[${timestamp}] 정렬 실행\n\n원본: [${numbers.join(', ')}]\n알고리즘: ${result.algorithm}\n결과: [${result.sorted.join(', ')}]`
  } else {
    sortingResult.value = `[${timestamp}] 정렬 실행\n\n원본: [${numbers.join(', ')}]\n알고리즘: ${result.algorithm}\n결과: [${result.sorted.join(', ')}]\n\n✅ Strategy 패턴으로 정렬 알고리즘을 동적으로 선택했습니다!`
  }
}

// ============ C. Compression Strategy ============

interface CompressionStrategy {
  compress(file: string): string
  decompress(file: string): string
  getFormat(): string
}

class ZipCompression implements CompressionStrategy {
  getFormat(): string {
    return 'ZIP'
  }

  compress(file: string): string {
    return `[ZIP] ${file}를 압축했습니다.
압축률: 약 60%
호환성: 매우 높음`
  }

  decompress(file: string): string {
    return `[ZIP] ${file}를 압축 해제했습니다.`
  }
}

class RarCompression implements CompressionStrategy {
  getFormat(): string {
    return 'RAR'
  }

  compress(file: string): string {
    return `[RAR] ${file}를 압축했습니다.
압축률: 약 70%
호환성: 높음`
  }

  decompress(file: string): string {
    return `[RAR] ${file}를 압축 해제했습니다.`
  }
}

class SevenZipCompression implements CompressionStrategy {
  getFormat(): string {
    return '7Z'
  }

  compress(file: string): string {
    return `[7Z] ${file}를 압축했습니다.
압축률: 약 80%
호환성: 보통`
  }

  decompress(file: string): string {
    return `[7Z] ${file}를 압축 해제했습니다.`
  }
}

class FileCompressor {
  private strategy?: CompressionStrategy

  setStrategy(strategy: CompressionStrategy): void {
    this.strategy = strategy
  }

  compressFile(file: string): string {
    if (!this.strategy) {
      return '압축 형식이 선택되지 않았습니다.'
    }
    return this.strategy.compress(file)
  }

  decompressFile(file: string): string {
    if (!this.strategy) {
      return '압축 형식이 선택되지 않았습니다.'
    }
    return this.strategy.decompress(file)
  }

  getFormat(): string {
    return this.strategy?.getFormat() || 'None'
  }
}

function testCompressionStrategy() {
  const compressor = new FileCompressor()
  const logs: string[] = []

  logs.push('📦 파일 압축 테스트\n')

  logs.push('--- ZIP 압축 전략 ---')
  compressor.setStrategy(new ZipCompression())
  logs.push(`형식: ${compressor.getFormat()}`)
  logs.push(compressor.compressFile('document.pdf'))

  logs.push('\n--- RAR 압축 전략으로 변경 ---')
  compressor.setStrategy(new RarCompression())
  logs.push(`형식: ${compressor.getFormat()}`)
  logs.push(compressor.compressFile('photos.jpg'))

  logs.push('\n--- 7Z 압축 전략으로 변경 ---')
  compressor.setStrategy(new SevenZipCompression())
  logs.push(`형식: ${compressor.getFormat()}`)
  logs.push(compressor.compressFile('archive.tar'))

  logs.push('\n--- 압축 해제 테스트 ---')
  logs.push(compressor.decompressFile('archive.7z'))

  compressionResult.value = logs.join('\n') + '\n\n✅ 파일 타입에 따라 최적의 압축 알고리즘을 선택할 수 있습니다!'
}

function processInteractiveCompression() {
  const compressor = new FileCompressor()

  if (selectedCompression.value === 'zip') {
    compressor.setStrategy(new ZipCompression())
  } else if (selectedCompression.value === 'rar') {
    compressor.setStrategy(new RarCompression())
  } else if (selectedCompression.value === '7z') {
    compressor.setStrategy(new SevenZipCompression())
  }

  const result = compressor.compressFile(fileName.value)
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

  if (compressionResult.value) {
    compressionResult.value += `\n\n${'='.repeat(60)}\n\n[${timestamp}] 압축 실행\n\n${result}`
  } else {
    compressionResult.value = `[${timestamp}] 압축 실행\n\n${result}\n\n✅ Strategy 패턴으로 압축 형식을 동적으로 선택했습니다!`
  }
}

// ============ D. Route Planning Strategy ============

interface RouteStrategy {
  calculateRoute(start: string, end: string): string
  getMode(): string
}

class CarRouteStrategy implements RouteStrategy {
  getMode(): string {
    return '자동차'
  }

  calculateRoute(start: string, end: string): string {
    return `🚗 자동차 경로: ${start} → ${end}
거리: 15.3 km
예상 시간: 25분
경로: 고속도로 이용
통행료: 2,500원`
  }
}

class PublicTransportStrategy implements RouteStrategy {
  getMode(): string {
    return '대중교통'
  }

  calculateRoute(start: string, end: string): string {
    return `🚇 대중교통 경로: ${start} → ${end}
환승: 1회 (지하철 2호선 → 버스 145번)
예상 시간: 40분
요금: 1,400원
도보 거리: 500m`
  }
}

class WalkingRouteStrategy implements RouteStrategy {
  getMode(): string {
    return '도보'
  }

  calculateRoute(start: string, end: string): string {
    return `🚶 도보 경로: ${start} → ${end}
거리: 2.8 km
예상 시간: 35분
칼로리 소모: 약 140 kcal
경로: 공원 길 추천`
  }
}

class BicycleRouteStrategy implements RouteStrategy {
  getMode(): string {
    return '자전거'
  }

  calculateRoute(start: string, end: string): string {
    return `🚴 자전거 경로: ${start} → ${end}
거리: 3.5 km
예상 시간: 15분
칼로리 소모: 약 70 kcal
경로: 자전거 전용 도로 이용`
  }
}

class NavigationSystem {
  private strategy?: RouteStrategy

  setStrategy(strategy: RouteStrategy): void {
    this.strategy = strategy
  }

  planRoute(start: string, end: string): string {
    if (!this.strategy) {
      return '이동 수단을 선택해주세요.'
    }
    return this.strategy.calculateRoute(start, end)
  }

  getMode(): string {
    return this.strategy?.getMode() || 'None'
  }
}

function testRouteStrategy() {
  const nav = new NavigationSystem()
  const start = '강남역'
  const end = '홍대입구역'
  const logs: string[] = []

  logs.push(`🗺️ 경로 계획 테스트: ${start} → ${end}\n`)

  logs.push('--- 자동차 경로 ---')
  nav.setStrategy(new CarRouteStrategy())
  logs.push(nav.planRoute(start, end))

  logs.push('\n--- 대중교통 경로로 변경 ---')
  nav.setStrategy(new PublicTransportStrategy())
  logs.push(nav.planRoute(start, end))

  logs.push('\n--- 도보 경로로 변경 ---')
  nav.setStrategy(new WalkingRouteStrategy())
  logs.push(nav.planRoute(start, end))

  logs.push('\n--- 자전거 경로로 변경 ---')
  nav.setStrategy(new BicycleRouteStrategy())
  logs.push(nav.planRoute(start, end))

  routeResult.value = logs.join('\n') + '\n\n✅ 이동 수단에 따라 최적의 경로 계산 알고리즘을 선택합니다!'
}

function processInteractiveRoute() {
  const nav = new NavigationSystem()

  if (selectedTransport.value === 'car') {
    nav.setStrategy(new CarRouteStrategy())
  } else if (selectedTransport.value === 'public') {
    nav.setStrategy(new PublicTransportStrategy())
  } else if (selectedTransport.value === 'walk') {
    nav.setStrategy(new WalkingRouteStrategy())
  } else if (selectedTransport.value === 'bicycle') {
    nav.setStrategy(new BicycleRouteStrategy())
  }

  const result = nav.planRoute(startLocation.value, endLocation.value)
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

  if (routeResult.value) {
    routeResult.value += `\n\n${'='.repeat(60)}\n\n[${timestamp}] 경로 탐색\n\n${result}`
  } else {
    routeResult.value = `[${timestamp}] 경로 탐색\n\n${result}\n\n✅ Strategy 패턴으로 이동 수단을 동적으로 선택했습니다!`
  }
}
</script>

<style scoped>
/* StrategyPattern 전용 스타일이 필요한 경우 여기에 추가 */
/* 공통 스타일은 src/assets/main.css에서 전역으로 적용됨 */
</style>
