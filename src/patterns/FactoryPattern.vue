<template>
  <div class="pattern-container">
    <h1>Factory Method Pattern</h1>
    <p class="description">
      객체 생성 로직을 서브클래스에 위임하여, 상위 클래스는 인터페이스만 정의하고
      실제 생성은 하위 클래스가 결정하도록 하는 디자인 패턴입니다.
    </p>

    <div class="demo-section">
      <h2>전체 패턴 구조</h2>
      <p>Product 인터페이스와 Creator 추상 클래스를 통해 객체 생성을 캡슐화합니다.</p>

      <div class="code-block">
        <h3>📝 코드 구조</h3>
        <pre><code>// 1. Product 인터페이스 (버튼의 공통 인터페이스)
interface Button {
  render(): void
  onClick(): void
}

// 2. 구체적인 Product 클래스들
class WindowsButton implements Button {
  render(): void {
    console.log("윈도우 스타일 버튼 렌더링")
  }
  onClick(): void {
    console.log("윈도우 버튼 클릭 이벤트 처리")
  }
}

class MacButton implements Button {
  render(): void {
    console.log("맥 스타일 버튼 렌더링")
  }
  onClick(): void {
    console.log("맥 버튼 클릭 이벤트 처리")
  }
}

// 3. Creator 추상 클래스 (팩토리 메서드 정의)
abstract class Dialog {
  // 팩토리 메서드 - 하위 클래스가 구현
  abstract createButton(): Button

  // 비즈니스 로직 - 팩토리 메서드를 사용
  renderDialog(): void {
    const button = this.createButton()
    button.render()
    button.onClick()
  }
}

// 4. 구체적인 Creator 클래스들
class WindowsDialog extends Dialog {
  createButton(): Button {
    return new WindowsButton()  // Windows용 버튼 생성
  }
}

class MacDialog extends Dialog {
  createButton(): Button {
    return new MacButton()  // Mac용 버튼 생성
  }
}</code></pre>
      </div>

      <button @click="showStructure" class="test-btn">패턴 구조 확인</button>
      <div v-if="structureResult" class="result">
        <h3>🚀 패턴 구조 설명</h3>
        <pre>{{ structureResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>Windows Dialog 실행</h2>
      <p>Windows 환경에서 버튼을 생성하는 Dialog입니다.</p>

      <div class="code-block">
        <h3>📝 클라이언트 코드</h3>
        <pre><code>function clientApp(osType: string) {
  let dialog: Dialog

  if (osType === "Windows") {
    dialog = new WindowsDialog()  // Windows용 Dialog
  } else {
    dialog = new MacDialog()
  }

  dialog.renderDialog()  // 버튼 생성 및 렌더링
}

// Windows Dialog 실행
clientApp("Windows")</code></pre>
      </div>

      <button @click="runWindowsDialog" class="test-btn">Windows Dialog 실행</button>

      <div v-if="windowsButton" class="button-demo">
        <h3>🎨 생성된 버튼</h3>
        <button
          class="os-button windows-button"
          @click="windowsButton.onClick()"
        >
          {{ windowsButton.label }}
        </button>
      </div>

      <div v-if="windowsResult" class="result">
        <h3>🚀 실행 결과</h3>
        <pre>{{ windowsResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>Mac Dialog 실행</h2>
      <p>Mac 환경에서 버튼을 생성하는 Dialog입니다.</p>

      <div class="code-block">
        <h3>📝 클라이언트 코드</h3>
        <pre><code>function clientApp(osType: string) {
  let dialog: Dialog

  if (osType === "Windows") {
    dialog = new WindowsDialog()
  } else {
    dialog = new MacDialog()  // Mac용 Dialog
  }

  dialog.renderDialog()  // 버튼 생성 및 렌더링
}

// Mac Dialog 실행
clientApp("Mac")</code></pre>
      </div>

      <button @click="runMacDialog" class="test-btn">Mac Dialog 실행</button>

      <div v-if="macButton" class="button-demo">
        <h3>🎨 생성된 버튼</h3>
        <button
          class="os-button mac-button"
          @click="macButton.onClick()"
        >
          {{ macButton.label }}
        </button>
      </div>

      <div v-if="macResult" class="result">
        <h3>🚀 실행 결과</h3>
        <pre>{{ macResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>패턴의 장점</h2>
      <p>Factory Method Pattern을 사용하면 다음과 같은 이점을 얻을 수 있습니다.</p>

      <div class="code-block">
        <h3>📝 확장 예제 - Linux 버튼 추가</h3>
        <pre><code>// 새로운 Product 추가 - 기존 코드 수정 없음!
class LinuxButton implements Button {
  render(): void {
    console.log("리눅스 스타일 버튼 렌더링")
  }
  onClick(): void {
    console.log("리눅스 버튼 클릭 이벤트 처리")
  }
}

// 새로운 Creator 추가 - 기존 코드 수정 없음!
class LinuxDialog extends Dialog {
  createButton(): Button {
    return new LinuxButton()
  }
}

// 클라이언트 코드도 동일한 방식으로 사용 가능
const dialog = new LinuxDialog()
dialog.renderDialog()</code></pre>
      </div>

      <button @click="runLinuxDialog" class="test-btn">Linux Dialog 실행</button>

      <div v-if="linuxButton" class="button-demo">
        <h3>🎨 생성된 버튼</h3>
        <button
          class="os-button linux-button"
          @click="linuxButton.onClick()"
        >
          {{ linuxButton.label }}
        </button>
      </div>

      <div v-if="linuxResult" class="result">
        <h3>🚀 실행 결과</h3>
        <pre>{{ linuxResult }}</pre>
      </div>

      <div class="benefits-list">
        <h3>✨ 주요 장점</h3>
        <ul>
          <li><strong>OCP 준수:</strong> 새로운 제품 추가 시 기존 코드 수정 불필요</li>
          <li><strong>DIP 준수:</strong> 상위 모듈이 인터페이스에만 의존</li>
          <li><strong>코드 재사용:</strong> 공통 로직은 Creator에서 재사용</li>
          <li><strong>유지보수성:</strong> 생성 로직이 한 곳에 집중</li>
          <li><strong>테스트 용이:</strong> Mock 객체 주입이 쉬움</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const structureResult = ref<string>('')
const windowsResult = ref<string>('')
const macResult = ref<string>('')
const linuxResult = ref<string>('')

const windowsButton = ref<{ label: string; onClick: () => void } | null>(null)
const macButton = ref<{ label: string; onClick: () => void } | null>(null)
const linuxButton = ref<{ label: string; onClick: () => void } | null>(null)

// 1. Product 인터페이스 (버튼의 공통 인터페이스)
interface Button {
  render(): string
  onClick(): string
}

// 2. 구체적인 Product 클래스들
class WindowsButton implements Button {
  render(): string {
    return "윈도우 스타일 버튼 렌더링"
  }
  onClick(): string {
    return "윈도우 버튼 클릭 이벤트 처리"
  }
}

class MacButton implements Button {
  render(): string {
    return "맥 스타일 버튼 렌더링"
  }
  onClick(): string {
    return "맥 버튼 클릭 이벤트 처리"
  }
}

class LinuxButton implements Button {
  render(): string {
    return "리눅스 스타일 버튼 렌더링"
  }
  onClick(): string {
    return "리눅스 버튼 클릭 이벤트 처리"
  }
}

// 3. Creator 추상 클래스 (팩토리 메서드 정의)
abstract class Dialog {
  // 팩토리 메서드 - 하위 클래스가 구현
  abstract createButton(): Button

  // 비즈니스 로직 - 팩토리 메서드를 사용
  renderDialog(): string[] {
    const logs: string[] = []
    const button = this.createButton()

    logs.push(`📍 팩토리 메서드 호출: createButton()`)
    logs.push(`🔧 생성된 버튼: ${button.constructor.name}`)
    logs.push(``)
    logs.push(button.render())
    logs.push(button.onClick())

    return logs
  }
}

// 4. 구체적인 Creator 클래스들
class WindowsDialog extends Dialog {
  createButton(): Button {
    return new WindowsButton()
  }
}

class MacDialog extends Dialog {
  createButton(): Button {
    return new MacButton()
  }
}

class LinuxDialog extends Dialog {
  createButton(): Button {
    return new LinuxButton()
  }
}

// 5. 클라이언트 코드
function clientApp(osType: 'Windows' | 'Mac' | 'Linux'): string[] {
  let dialog: Dialog

  if (osType === 'Windows') {
    dialog = new WindowsDialog()
  } else if (osType === 'Mac') {
    dialog = new MacDialog()
  } else {
    dialog = new LinuxDialog()
  }

  return dialog.renderDialog()
}

function showStructure() {
  structureResult.value = `패턴 구조 설명:

1️⃣ Product (Button 인터페이스)
   - 생성될 객체들의 공통 인터페이스
   - render(), onClick() 메서드 정의

2️⃣ ConcreteProduct (WindowsButton, MacButton, LinuxButton)
   - Product 인터페이스를 구현하는 구체적인 클래스
   - 각 OS에 맞는 버튼 동작 구현

3️⃣ Creator (Dialog 추상 클래스)
   - createButton(): 팩토리 메서드 (abstract)
   - renderDialog(): 비즈니스 로직 (팩토리 메서드 사용)

4️⃣ ConcreteCreator (WindowsDialog, MacDialog, LinuxDialog)
   - createButton()을 구체적으로 구현
   - 어떤 Product를 생성할지 결정

✅ 핵심: Creator는 Product의 생성 방법을 모르고,
        하위 클래스가 실제 생성을 담당합니다!`
}

function runWindowsDialog() {
  const logs = clientApp('Windows')
  windowsResult.value = `클라이언트: clientApp("Windows") 호출\n\n` + logs.join('\n')

  const button = new WindowsButton()
  windowsButton.value = {
    label: 'Windows Button',
    onClick: () => {
      windowsResult.value += `\n\n🎨 버튼 클릭: ${button.onClick()}`
    },
  }
}

function runMacDialog() {
  const logs = clientApp('Mac')
  macResult.value = `클라이언트: clientApp("Mac") 호출\n\n` + logs.join('\n')

  const button = new MacButton()
  macButton.value = {
    label: 'Mac Button',
    onClick: () => {
      macResult.value += `\n\n🎨 버튼 클릭: ${button.onClick()}`
    },
  }
}

function runLinuxDialog() {
  const logs = clientApp('Linux')
  linuxResult.value = `클라이언트: clientApp("Linux") 호출\n\n✨ 새로운 제품이 추가되었지만 기존 코드는 수정되지 않았습니다!\n\n` + logs.join('\n')

  const button = new LinuxButton()
  linuxButton.value = {
    label: 'Linux Button',
    onClick: () => {
      linuxResult.value += `\n\n🎨 버튼 클릭: ${button.onClick()}`
    },
  }
}
</script>

<style scoped>
/* FactoryPattern 전용 스타일이 필요한 경우 여기에 추가 */
/* 공통 스타일은 src/assets/main.css에서 전역으로 적용됨 */
</style>
