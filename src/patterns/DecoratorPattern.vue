<template>
  <div class="pattern-container">
    <h1>Decorator Pattern</h1>
    <p class="description">
      데코레이터 패턴은 객체에 새로운 기능을 동적으로 추가하는 구조 패턴입니다.
      상속 대신 기존 객체를 감싸는 방식으로 기능을 확장하며, 필요한 기능만 블록처럼 조합할 수 있습니다.
    </p>

    <div class="demo-section">
      <h2>A. Notifier Decorator (알림 시스템)</h2>
      <p>기본 알림에 이메일, SMS, Slack 등의 기능을 동적으로 추가합니다.</p>

      <div class="code-block">
        <h3>코드</h3>
        <pre><code>// Component 인터페이스
interface Notifier {
  send(message: string): string
}

// ConcreteComponent - 기본 구현
class BaseNotifier implements Notifier {
  send(message: string): string {
    return `[기본 알림] ${message}`
  }
}

// Decorator 추상 클래스
abstract class NotifierDecorator implements Notifier {
  constructor(protected wrappee: Notifier) {}

  send(message: string): string {
    return this.wrappee.send(message)
  }
}

// ConcreteDecorator - 이메일 기능 추가
class EmailNotifier extends NotifierDecorator {
  send(message: string): string {
    return super.send(message) + '\n[이메일 발송] ' + message
  }
}

// ConcreteDecorator - SMS 기능 추가
class SmsNotifier extends NotifierDecorator {
  send(message: string): string {
    return super.send(message) + '\n[SMS 발송] ' + message
  }
}

// ConcreteDecorator - Slack 기능 추가
class SlackNotifier extends NotifierDecorator {
  send(message: string): string {
    return super.send(message) + '\n[Slack 발송] ' + message
  }
}</code></pre>
      </div>

      <button @click="testNotifierDecorator" class="test-btn">테스트 실행</button>
      <div v-if="notifierResult" class="result">
        <h3>실행 결과</h3>
        <pre>{{ notifierResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>B. Coffee Decorator (커피 주문 시스템)</h2>
      <p>기본 커피에 우유, 시럽, 휘핑크림 등의 토핑을 추가하여 가격을 계산합니다.</p>

      <div class="code-block">
        <h3>코드</h3>
        <pre><code>// Component 인터페이스
interface Coffee {
  getDescription(): string
  getCost(): number
}

// ConcreteComponent
class SimpleCoffee implements Coffee {
  getDescription(): string {
    return '기본 커피'
  }
  getCost(): number {
    return 2000
  }
}

// Decorator
abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}

  getDescription(): string {
    return this.coffee.getDescription()
  }

  getCost(): number {
    return this.coffee.getCost()
  }
}

// ConcreteDecorators
class MilkDecorator extends CoffeeDecorator {
  getDescription(): string {
    return this.coffee.getDescription() + ', 우유'
  }
  getCost(): number {
    return this.coffee.getCost() + 500
  }
}

class CaramelDecorator extends CoffeeDecorator {
  getDescription(): string {
    return this.coffee.getDescription() + ', 카라멜 시럽'
  }
  getCost(): number {
    return this.coffee.getCost() + 700
  }
}

class WhippedCreamDecorator extends CoffeeDecorator {
  getDescription(): string {
    return this.coffee.getDescription() + ', 휘핑크림'
  }
  getCost(): number {
    return this.coffee.getCost() + 800
  }
}</code></pre>
      </div>

      <button @click="testCoffeeDecorator" class="test-btn">테스트 실행</button>
      <div v-if="coffeeResult" class="result">
        <h3>실행 결과</h3>
        <pre>{{ coffeeResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>C. Data Stream Decorator (파일 처리)</h2>
      <p>기본 파일 스트림에 압축, 암호화 기능을 동적으로 추가합니다.</p>

      <div class="code-block">
        <h3>코드</h3>
        <pre><code>// Component
interface DataStream {
  writeData(data: string): string
  readData(): string
}

// ConcreteComponent
class FileStream implements DataStream {
  private data: string = ''

  writeData(data: string): string {
    this.data = data
    return `파일에 저장: ${data}`
  }

  readData(): string {
    return this.data
  }
}

// Decorator
abstract class StreamDecorator implements DataStream {
  constructor(protected stream: DataStream) {}

  writeData(data: string): string {
    return this.stream.writeData(data)
  }

  readData(): string {
    return this.stream.readData()
  }
}

// ConcreteDecorators
class CompressionDecorator extends StreamDecorator {
  writeData(data: string): string {
    const compressed = `압축됨[${data}]`
    return `[압축 적용] ${this.stream.writeData(compressed)}`
  }

  readData(): string {
    const data = this.stream.readData()
    return data.replace('압축됨[', '').replace(']', '')
  }
}

class EncryptionDecorator extends StreamDecorator {
  writeData(data: string): string {
    const encrypted = btoa(data) // Base64 인코딩
    return `[암호화 적용] ${this.stream.writeData(encrypted)}`
  }

  readData(): string {
    const data = this.stream.readData()
    try {
      return atob(data) // Base64 디코딩
    } catch {
      return data
    }
  }
}</code></pre>
      </div>

      <button @click="testStreamDecorator" class="test-btn">테스트 실행</button>
      <div v-if="streamResult" class="result">
        <h3>실행 결과</h3>
        <pre>{{ streamResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>D. UI Component Decorator (React HOC 스타일)</h2>
      <p>기본 UI 컴포넌트에 로딩, 에러 처리, 로깅 기능을 추가합니다.</p>

      <div class="code-block">
        <h3>코드</h3>
        <pre><code>// Component
interface UIComponent {
  render(): string
}

// ConcreteComponent
class Button implements UIComponent {
  constructor(private label: string) {}

  render(): string {
    return `&lt;button&gt;${this.label}&lt;/button&gt;`
  }
}

// Decorators
class LoadingDecorator implements UIComponent {
  constructor(private component: UIComponent, private isLoading: boolean) {}

  render(): string {
    if (this.isLoading) {
      return '&lt;div&gt;로딩 중...&lt;/div&gt;'
    }
    return this.component.render()
  }
}

class ErrorBoundaryDecorator implements UIComponent {
  constructor(private component: UIComponent, private hasError: boolean) {}

  render(): string {
    if (this.hasError) {
      return '&lt;div class="error"&gt;오류가 발생했습니다&lt;/div&gt;'
    }
    return this.component.render()
  }
}

class LoggingDecorator implements UIComponent {
  constructor(private component: UIComponent) {}

  render(): string {
    const result = this.component.render()
    console.log(`[렌더링 로그] ${result}`)
    return result
  }
}</code></pre>
      </div>

      <button @click="testUIDecorator" class="test-btn">테스트 실행</button>
      <div v-if="uiResult" class="result">
        <h3>실행 결과</h3>
        <pre>{{ uiResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>패턴의 장점</h2>
      <div class="benefits-list">
        <h3>주요 장점</h3>
        <ul>
          <li><strong>유연한 기능 확장:</strong> 런타임에 선택적으로 기능 적용</li>
          <li><strong>클래스 폭발 방지:</strong> 모든 조합을 위한 서브클래스 불필요</li>
          <li><strong>OCP 준수:</strong> 기존 코드 수정 없이 새 기능 추가</li>
          <li><strong>SRP 준수:</strong> 각 데코레이터가 단일 책임만 가짐</li>
          <li><strong>조합 가능:</strong> 여러 데코레이터를 자유롭게 조합</li>
        </ul>
      </div>

      <div class="code-block">
        <h3>실무 활용 사례</h3>
        <pre><code>// 1. React Higher-Order Components (HOC)
const withAuth = (Component) => (props) => {
  return isAuthenticated ? &lt;Component {...props} /&gt; : &lt;Login /&gt;
}

// 2. Express 미들웨어
app.use(logger)
app.use(authenticate)
app.use(rateLimit)

// 3. Java I/O Streams
new BufferedReader(new FileReader("file.txt"))
new GZIPInputStream(new FileInputStream("file.gz"))

// 4. 데코레이터 패턴 조합 예시
let notifier = new BaseNotifier()
notifier = new EmailNotifier(notifier)
notifier = new SmsNotifier(notifier)
notifier = new SlackNotifier(notifier)
// 기본 + 이메일 + SMS + Slack 모두 실행</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const notifierResult = ref<string>('')
const coffeeResult = ref<string>('')
const streamResult = ref<string>('')
const uiResult = ref<string>('')

// ============ A. Notifier Decorator ============

interface Notifier {
  send(message: string): string
}

class BaseNotifier implements Notifier {
  send(message: string): string {
    return `[기본 알림] ${message}`
  }
}

abstract class NotifierDecorator implements Notifier {
  constructor(protected wrappee: Notifier) {}

  send(message: string): string {
    return this.wrappee.send(message)
  }
}

class EmailNotifier extends NotifierDecorator {
  send(message: string): string {
    return super.send(message) + '\n[이메일 발송] ' + message
  }
}

class SmsNotifier extends NotifierDecorator {
  send(message: string): string {
    return super.send(message) + '\n[SMS 발송] ' + message
  }
}

class SlackNotifier extends NotifierDecorator {
  send(message: string): string {
    return super.send(message) + '\n[Slack 발송] ' + message
  }
}

function testNotifierDecorator() {
  const message = '긴급 알림: 서버 점검 예정'

  // 테스트 1: 기본 알림만
  let notifier1: Notifier = new BaseNotifier()
  const result1 = notifier1.send(message)

  // 테스트 2: 기본 + 이메일
  let notifier2: Notifier = new BaseNotifier()
  notifier2 = new EmailNotifier(notifier2)
  const result2 = notifier2.send(message)

  // 테스트 3: 기본 + 이메일 + SMS
  let notifier3: Notifier = new BaseNotifier()
  notifier3 = new EmailNotifier(notifier3)
  notifier3 = new SmsNotifier(notifier3)
  const result3 = notifier3.send(message)

  // 테스트 4: 모든 알림 (기본 + 이메일 + SMS + Slack)
  let notifier4: Notifier = new BaseNotifier()
  notifier4 = new EmailNotifier(notifier4)
  notifier4 = new SmsNotifier(notifier4)
  notifier4 = new SlackNotifier(notifier4)
  const result4 = notifier4.send(message)

  notifierResult.value = `알림 시스템 테스트\n\n테스트 1 - 기본 알림만:\n${result1}\n\n테스트 2 - 기본 + 이메일:\n${result2}\n\n테스트 3 - 기본 + 이메일 + SMS:\n${result3}\n\n테스트 4 - 모든 알림:\n${result4}\n\n동적으로 기능을 조합할 수 있습니다!`
}

// ============ B. Coffee Decorator ============

interface Coffee {
  getDescription(): string
  getCost(): number
}

class SimpleCoffee implements Coffee {
  getDescription(): string {
    return '기본 커피'
  }
  getCost(): number {
    return 2000
  }
}

abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}

  getDescription(): string {
    return this.coffee.getDescription()
  }

  getCost(): number {
    return this.coffee.getCost()
  }
}

class MilkDecorator extends CoffeeDecorator {
  getDescription(): string {
    return this.coffee.getDescription() + ', 우유'
  }
  getCost(): number {
    return this.coffee.getCost() + 500
  }
}

class CaramelDecorator extends CoffeeDecorator {
  getDescription(): string {
    return this.coffee.getDescription() + ', 카라멜 시럽'
  }
  getCost(): number {
    return this.coffee.getCost() + 700
  }
}

class WhippedCreamDecorator extends CoffeeDecorator {
  getDescription(): string {
    return this.coffee.getDescription() + ', 휘핑크림'
  }
  getCost(): number {
    return this.coffee.getCost() + 800
  }
}

function testCoffeeDecorator() {
  // 테스트 1: 기본 커피
  let coffee1: Coffee = new SimpleCoffee()
  const desc1 = coffee1.getDescription()
  const cost1 = coffee1.getCost()

  // 테스트 2: 카페라떼 (커피 + 우유)
  let coffee2: Coffee = new SimpleCoffee()
  coffee2 = new MilkDecorator(coffee2)
  const desc2 = coffee2.getDescription()
  const cost2 = coffee2.getCost()

  // 테스트 3: 카라멜 마끼아또 (커피 + 우유 + 카라멜)
  let coffee3: Coffee = new SimpleCoffee()
  coffee3 = new MilkDecorator(coffee3)
  coffee3 = new CaramelDecorator(coffee3)
  const desc3 = coffee3.getDescription()
  const cost3 = coffee3.getCost()

  // 테스트 4: 프리미엄 커피 (모든 토핑)
  let coffee4: Coffee = new SimpleCoffee()
  coffee4 = new MilkDecorator(coffee4)
  coffee4 = new CaramelDecorator(coffee4)
  coffee4 = new WhippedCreamDecorator(coffee4)
  const desc4 = coffee4.getDescription()
  const cost4 = coffee4.getCost()

  coffeeResult.value = `커피 주문 시스템 테스트\n\n주문 1:\n${desc1}\n가격: ${cost1}원\n\n주문 2:\n${desc2}\n가격: ${cost2}원\n\n주문 3:\n${desc3}\n가격: ${cost3}원\n\n주문 4:\n${desc4}\n가격: ${cost4}원\n\n각 토핑을 조합하여 가격이 계산됩니다!`
}

// ============ C. Data Stream Decorator ============

interface DataStream {
  writeData(data: string): string
  readData(): string
}

class FileStream implements DataStream {
  private data: string = ''

  writeData(data: string): string {
    this.data = data
    return `파일에 저장: ${data}`
  }

  readData(): string {
    return this.data
  }
}

abstract class StreamDecorator implements DataStream {
  constructor(protected stream: DataStream) {}

  writeData(data: string): string {
    return this.stream.writeData(data)
  }

  readData(): string {
    return this.stream.readData()
  }
}

class CompressionDecorator extends StreamDecorator {
  writeData(data: string): string {
    const compressed = `압축됨[${data}]`
    return `[압축 적용] ${this.stream.writeData(compressed)}`
  }

  readData(): string {
    const data = this.stream.readData()
    return data.replace('압축됨[', '').replace(']', '')
  }
}

class EncryptionDecorator extends StreamDecorator {
  writeData(data: string): string {
    const encrypted = btoa(data)
    return `[암호화 적용] ${this.stream.writeData(encrypted)}`
  }

  readData(): string {
    const data = this.stream.readData()
    try {
      return atob(data)
    } catch {
      return data
    }
  }
}

function testStreamDecorator() {
  const originalData = 'Sensitive User Data'

  // 테스트 1: 기본 파일 스트림
  let stream1: DataStream = new FileStream()
  const write1 = stream1.writeData(originalData)
  const read1 = stream1.readData()

  // 테스트 2: 압축 적용
  let stream2: DataStream = new FileStream()
  stream2 = new CompressionDecorator(stream2)
  const write2 = stream2.writeData(originalData)
  const read2 = stream2.readData()

  // 테스트 3: 암호화 적용
  let stream3: DataStream = new FileStream()
  stream3 = new EncryptionDecorator(stream3)
  const write3 = stream3.writeData(originalData)
  const read3 = stream3.readData()

  // 테스트 4: 압축 + 암호화 (다중 데코레이터)
  let stream4: DataStream = new FileStream()
  stream4 = new CompressionDecorator(stream4)
  stream4 = new EncryptionDecorator(stream4)
  const write4 = stream4.writeData(originalData)
  const read4 = stream4.readData()

  streamResult.value = `파일 스트림 처리 테스트\n원본 데이터: "${originalData}"\n\n테스트 1 - 기본 스트림:\n쓰기: ${write1}\n읽기: ${read1}\n\n테스트 2 - 압축:\n쓰기: ${write2}\n읽기: ${read2}\n\n테스트 3 - 암호화:\n쓰기: ${write3}\n읽기: ${read3}\n\n테스트 4 - 압축 + 암호화:\n쓰기: ${write4}\n읽기: ${read4}\n\n여러 처리를 조합할 수 있습니다!`
}

// ============ D. UI Component Decorator ============

interface UIComponent {
  render(): string
}

class Button implements UIComponent {
  constructor(private label: string) {}

  render(): string {
    return `<button>${this.label}</button>`
  }
}

class LoadingDecorator implements UIComponent {
  constructor(private component: UIComponent, private isLoading: boolean) {}

  render(): string {
    if (this.isLoading) {
      return '<div>로딩 중...</div>'
    }
    return this.component.render()
  }
}

class ErrorBoundaryDecorator implements UIComponent {
  constructor(private component: UIComponent, private hasError: boolean) {}

  render(): string {
    if (this.hasError) {
      return '<div class="error">오류가 발생했습니다</div>'
    }
    return this.component.render()
  }
}

class LoggingDecorator implements UIComponent {
  constructor(private component: UIComponent) {}

  render(): string {
    const result = this.component.render()
    console.log(`[렌더링 로그] ${result}`)
    return result
  }
}

function testUIDecorator() {
  // 테스트 1: 기본 버튼
  let button1: UIComponent = new Button('클릭하세요')
  const result1 = button1.render()

  // 테스트 2: 로딩 상태 (false)
  let button2: UIComponent = new Button('제출')
  button2 = new LoadingDecorator(button2, false)
  const result2 = button2.render()

  // 테스트 3: 로딩 상태 (true)
  let button3: UIComponent = new Button('제출')
  button3 = new LoadingDecorator(button3, true)
  const result3 = button3.render()

  // 테스트 4: 에러 상태
  let button4: UIComponent = new Button('저장')
  button4 = new ErrorBoundaryDecorator(button4, true)
  const result4 = button4.render()

  // 테스트 5: 로깅 + 에러 경계 (정상)
  let button5: UIComponent = new Button('삭제')
  button5 = new ErrorBoundaryDecorator(button5, false)
  button5 = new LoggingDecorator(button5)
  const result5 = button5.render()

  uiResult.value = `UI 컴포넌트 데코레이터 테스트\n\n테스트 1 - 기본 버튼:\n${result1}\n\n테스트 2 - 로딩 false:\n${result2}\n\n테스트 3 - 로딩 true:\n${result3}\n\n테스트 4 - 에러 상태:\n${result4}\n\n테스트 5 - 다중 데코레이터 (로깅 + 에러경계):\n${result5}\n(콘솔에서 로그 확인)\n\nReact HOC와 유사한 패턴입니다!`
}
</script>

<style scoped>
/* DecoratorPattern 전용 스타일이 필요한 경우 여기에 추가 */
/* 공통 스타일은 src/assets/main.css에서 전역으로 적용됨 */
</style>
