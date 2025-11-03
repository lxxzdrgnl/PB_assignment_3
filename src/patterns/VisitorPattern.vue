<template>
  <div class="pattern-container">
    <h1>Visitor Pattern</h1>
    <p class="description">
      방문자 패턴은 객체 구조와 동작을 분리하는 행동 패턴입니다.
      데이터 형태와 처리 알고리즘을 독립적으로 관리하며, 기존 클래스 수정 없이 새로운 기능을 외부에서 확장할 수 있습니다.
    </p>

    <div class="demo-section">
      <h2>A. File System Visitor (파일 시스템)</h2>
      <p>파일과 폴더에 대해 크기 계산, 검색 등 다양한 연산을 수행합니다.</p>

      <div class="code-block">
        <h3>코드</h3>
        <pre><code>// Visitor 인터페이스
interface FileVisitor {
  visitFile(file: FileElement): void
  visitFolder(folder: FolderElement): void
}

// Element 인터페이스
interface FileSystemElement {
  accept(visitor: FileVisitor): void
}

// ConcreteElement - 파일
class FileElement implements FileSystemElement {
  constructor(public name: string, public size: number) {}

  accept(visitor: FileVisitor): void {
    visitor.visitFile(this)
  }
}

// ConcreteElement - 폴더
class FolderElement implements FileSystemElement {
  public children: FileSystemElement[] = []

  constructor(public name: string) {}

  add(element: FileSystemElement): void {
    this.children.push(element)
  }

  accept(visitor: FileVisitor): void {
    visitor.visitFolder(this)
    // 자식 요소들도 방문
    for (const child of this.children) {
      child.accept(visitor)
    }
  }
}

// ConcreteVisitor - 크기 계산기
class SizeCalculator implements FileVisitor {
  public totalSize: number = 0

  visitFile(file: FileElement): void {
    this.totalSize += file.size
  }

  visitFolder(folder: FolderElement): void {
    // 폴더 자체는 크기가 없음
  }
}

// ConcreteVisitor - 파일 검색기
class FileSearcher implements FileVisitor {
  public foundFiles: string[] = []

  constructor(private searchTerm: string) {}

  visitFile(file: FileElement): void {
    if (file.name.includes(this.searchTerm)) {
      this.foundFiles.push(file.name)
    }
  }

  visitFolder(folder: FolderElement): void {
    // 폴더 이름은 검색하지 않음
  }
}</code></pre>
      </div>

      <button @click="testFileSystemVisitor" class="test-btn">테스트 실행</button>
      <div v-if="fileSystemResult" class="result">
        <h3>실행 결과</h3>
        <pre>{{ fileSystemResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>B. Shape Visitor (도형 계산)</h2>
      <p>다양한 도형에 대해 면적 계산, 그리기, 내보내기 등의 연산을 수행합니다.</p>

      <div class="code-block">
        <h3>코드</h3>
        <pre><code>// Visitor 인터페이스
interface ShapeVisitor {
  visitCircle(circle: Circle): void
  visitRectangle(rectangle: Rectangle): void
  visitTriangle(triangle: Triangle): void
}

// Element 인터페이스
interface Shape {
  accept(visitor: ShapeVisitor): void
}

// ConcreteElements
class Circle implements Shape {
  constructor(public radius: number) {}

  accept(visitor: ShapeVisitor): void {
    visitor.visitCircle(this)
  }
}

class Rectangle implements Shape {
  constructor(public width: number, public height: number) {}

  accept(visitor: ShapeVisitor): void {
    visitor.visitRectangle(this)
  }
}

class Triangle implements Shape {
  constructor(public base: number, public height: number) {}

  accept(visitor: ShapeVisitor): void {
    visitor.visitTriangle(this)
  }
}

// ConcreteVisitor - 면적 계산기
class AreaCalculator implements ShapeVisitor {
  public totalArea: number = 0

  visitCircle(circle: Circle): void {
    this.totalArea += Math.PI * circle.radius ** 2
  }

  visitRectangle(rectangle: Rectangle): void {
    this.totalArea += rectangle.width * rectangle.height
  }

  visitTriangle(triangle: Triangle): void {
    this.totalArea += (triangle.base * triangle.height) / 2
  }
}

// ConcreteVisitor - 둘레 계산기
class PerimeterCalculator implements ShapeVisitor {
  public totalPerimeter: number = 0

  visitCircle(circle: Circle): void {
    this.totalPerimeter += 2 * Math.PI * circle.radius
  }

  visitRectangle(rectangle: Rectangle): void {
    this.totalPerimeter += 2 * (rectangle.width + rectangle.height)
  }

  visitTriangle(triangle: Triangle): void {
    // 직각삼각형 가정
    const hypotenuse = Math.sqrt(
      triangle.base ** 2 + triangle.height ** 2
    )
    this.totalPerimeter += triangle.base + triangle.height + hypotenuse
  }
}</code></pre>
      </div>

      <button @click="testShapeVisitor" class="test-btn">테스트 실행</button>
      <div v-if="shapeResult" class="result">
        <h3>실행 결과</h3>
        <pre>{{ shapeResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>C. Shopping Cart Visitor (장바구니)</h2>
      <p>장바구니의 상품들에 대해 가격 계산, 할인 적용, 세금 계산을 수행합니다.</p>

      <div class="code-block">
        <h3>코드</h3>
        <pre><code>// Visitor 인터페이스
interface ItemVisitor {
  visitBook(book: Book): void
  visitElectronics(electronics: Electronics): void
  visitFood(food: Food): void
}

// Element 인터페이스
interface Item {
  accept(visitor: ItemVisitor): void
}

// ConcreteElements
class Book implements Item {
  constructor(public title: string, public price: number) {}

  accept(visitor: ItemVisitor): void {
    visitor.visitBook(this)
  }
}

class Electronics implements Item {
  constructor(public name: string, public price: number) {}

  accept(visitor: ItemVisitor): void {
    visitor.visitElectronics(this)
  }
}

class Food implements Item {
  constructor(public name: string, public price: number) {}

  accept(visitor: ItemVisitor): void {
    visitor.visitFood(this)
  }
}

// ConcreteVisitor - 가격 계산기 (할인 적용)
class PriceCalculator implements ItemVisitor {
  public total: number = 0

  visitBook(book: Book): void {
    // 책은 10% 할인
    this.total += book.price * 0.9
  }

  visitElectronics(electronics: Electronics): void {
    // 전자제품은 할인 없음
    this.total += electronics.price
  }

  visitFood(food: Food): void {
    // 식품은 5% 할인
    this.total += food.price * 0.95
  }
}

// ConcreteVisitor - 세금 계산기
class TaxCalculator implements ItemVisitor {
  public totalTax: number = 0

  visitBook(book: Book): void {
    // 책은 면세
    this.totalTax += 0
  }

  visitElectronics(electronics: Electronics): void {
    // 전자제품은 10% 세금
    this.totalTax += electronics.price * 0.1
  }

  visitFood(food: Food): void {
    // 식품은 5% 세금
    this.totalTax += food.price * 0.05
  }
}</code></pre>
      </div>

      <button @click="testShoppingCartVisitor" class="test-btn">테스트 실행</button>
      <div v-if="cartResult" class="result">
        <h3>실행 결과</h3>
        <pre>{{ cartResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>D. Employee Visitor (직원 급여 계산)</h2>
      <p>다양한 직급의 직원에 대해 급여, 보너스, 연차를 계산합니다.</p>

      <div class="code-block">
        <h3>코드</h3>
        <pre><code>// Visitor 인터페이스
interface EmployeeVisitor {
  visitManager(manager: Manager): void
  visitDeveloper(developer: Developer): void
  visitIntern(intern: Intern): void
}

// Element 인터페이스
interface Employee {
  accept(visitor: EmployeeVisitor): void
}

// ConcreteElements
class Manager implements Employee {
  constructor(public name: string, public baseSalary: number) {}

  accept(visitor: EmployeeVisitor): void {
    visitor.visitManager(this)
  }
}

class Developer implements Employee {
  constructor(public name: string, public baseSalary: number) {}

  accept(visitor: EmployeeVisitor): void {
    visitor.visitDeveloper(this)
  }
}

class Intern implements Employee {
  constructor(public name: string, public baseSalary: number) {}

  accept(visitor: EmployeeVisitor): void {
    visitor.visitIntern(this)
  }
}

// ConcreteVisitor - 급여 계산기
class SalaryCalculator implements EmployeeVisitor {
  public totalSalary: number = 0

  visitManager(manager: Manager): void {
    // 매니저는 기본급 + 50% 보너스
    this.totalSalary += manager.baseSalary * 1.5
  }

  visitDeveloper(developer: Developer): void {
    // 개발자는 기본급 + 20% 보너스
    this.totalSalary += developer.baseSalary * 1.2
  }

  visitIntern(intern: Intern): void {
    // 인턴은 기본급만
    this.totalSalary += intern.baseSalary
  }
}

// ConcreteVisitor - 연차 계산기
class VacationCalculator implements EmployeeVisitor {
  public totalDays: number = 0

  visitManager(manager: Manager): void {
    this.totalDays += 20 // 매니저는 20일
  }

  visitDeveloper(developer: Developer): void {
    this.totalDays += 15 // 개발자는 15일
  }

  visitIntern(intern: Intern): void {
    this.totalDays += 10 // 인턴은 10일
  }
}</code></pre>
      </div>

      <button @click="testEmployeeVisitor" class="test-btn">테스트 실행</button>
      <div v-if="employeeResult" class="result">
        <h3>실행 결과</h3>
        <pre>{{ employeeResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h2>패턴의 장점</h2>
      <div class="benefits-list">
        <h3>주요 장점</h3>
        <ul>
          <li><strong>OCP 준수:</strong> 새 연산 추가 시 기존 클래스 수정 불필요</li>
          <li><strong>SRP 준수:</strong> 각 Visitor가 단일 연산만 담당</li>
          <li><strong>관련 동작 집중:</strong> 비슷한 연산들을 한 곳에 모음</li>
          <li><strong>이중 디스패치:</strong> 런타임에 정확한 메서드 호출</li>
          <li><strong>쉬운 확장:</strong> 새로운 Visitor만 추가하면 됨</li>
        </ul>
      </div>

      <div class="benefits-list">
        <h3>단점</h3>
        <ul>
          <li><strong>Element 추가 어려움:</strong> 새 Element 타입 추가 시 모든 Visitor 수정 필요</li>
          <li><strong>캡슐화 위반:</strong> Visitor가 Element의 내부 상태에 접근</li>
        </ul>
      </div>

      <div class="code-block">
        <h3>실무 활용 사례</h3>
        <pre><code>// 1. 컴파일러 AST(추상 구문 트리) 처리
class TypeChecker implements ASTVisitor {
  visitFunctionNode(node: FunctionNode): void { }
  visitVariableNode(node: VariableNode): void { }
}

// 2. DOM 탐색 및 조작
class DOMTraverser implements NodeVisitor {
  visitElement(element: Element): void { }
  visitTextNode(text: Text): void { }
}

// 3. JSON/XML 변환
class XMLExporter implements DataVisitor {
  visitObject(obj: ObjectNode): string { }
  visitArray(arr: ArrayNode): string { }
}

// 4. 보고서 생성
class ReportGenerator implements EntityVisitor {
  visitCustomer(customer: Customer): void { }
  visitOrder(order: Order): void { }
}

// 5. 게임 엔티티 처리
class RenderVisitor implements EntityVisitor {
  visitPlayer(player: Player): void { }
  visitEnemy(enemy: Enemy): void { }
}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileSystemResult = ref<string>('')
const shapeResult = ref<string>('')
const cartResult = ref<string>('')
const employeeResult = ref<string>('')

// ============ A. File System Visitor ============

interface FileVisitor {
  visitFile(file: FileElement): void
  visitFolder(folder: FolderElement): void
}

interface FileSystemElement {
  accept(visitor: FileVisitor): void
}

class FileElement implements FileSystemElement {
  constructor(public name: string, public size: number) {}

  accept(visitor: FileVisitor): void {
    visitor.visitFile(this)
  }
}

class FolderElement implements FileSystemElement {
  public children: FileSystemElement[] = []

  constructor(public name: string) {}

  add(element: FileSystemElement): void {
    this.children.push(element)
  }

  accept(visitor: FileVisitor): void {
    visitor.visitFolder(this)
    for (const child of this.children) {
      child.accept(visitor)
    }
  }
}

class SizeCalculator implements FileVisitor {
  public totalSize: number = 0

  visitFile(file: FileElement): void {
    this.totalSize += file.size
  }

  visitFolder(folder: FolderElement): void {
    // 폴더 자체는 크기가 없음
  }
}

class FileSearcher implements FileVisitor {
  public foundFiles: string[] = []

  constructor(private searchTerm: string) {}

  visitFile(file: FileElement): void {
    if (file.name.includes(this.searchTerm)) {
      this.foundFiles.push(file.name)
    }
  }

  visitFolder(folder: FolderElement): void {
    // 폴더 이름은 검색하지 않음
  }
}

function testFileSystemVisitor() {
  // 파일 시스템 구조 생성
  const root = new FolderElement('root')
  const documents = new FolderElement('documents')
  const pictures = new FolderElement('pictures')

  documents.add(new FileElement('report.pdf', 1500))
  documents.add(new FileElement('presentation.pptx', 3000))
  pictures.add(new FileElement('photo1.jpg', 2000))
  pictures.add(new FileElement('photo2.jpg', 2500))

  root.add(documents)
  root.add(pictures)
  root.add(new FileElement('readme.txt', 500))

  const logs: string[] = []
  logs.push('=== 파일 시스템 구조 ===')
  logs.push('root/')
  logs.push('  documents/')
  logs.push('    report.pdf (1500KB)')
  logs.push('    presentation.pptx (3000KB)')
  logs.push('  pictures/')
  logs.push('    photo1.jpg (2000KB)')
  logs.push('    photo2.jpg (2500KB)')
  logs.push('  readme.txt (500KB)')
  logs.push('')

  // Visitor 1: 전체 크기 계산
  const sizeCalc = new SizeCalculator()
  root.accept(sizeCalc)
  logs.push(`=== Visitor 1: 크기 계산 ===`)
  logs.push(`전체 크기: ${sizeCalc.totalSize}KB`)
  logs.push('')

  // Visitor 2: 파일 검색 (.jpg)
  const searcher1 = new FileSearcher('.jpg')
  root.accept(searcher1)
  logs.push(`=== Visitor 2: '.jpg' 파일 검색 ===`)
  logs.push(`찾은 파일: ${searcher1.foundFiles.join(', ')}`)
  logs.push('')

  // Visitor 3: 파일 검색 (photo)
  const searcher2 = new FileSearcher('photo')
  root.accept(searcher2)
  logs.push(`=== Visitor 3: 'photo' 포함 파일 검색 ===`)
  logs.push(`찾은 파일: ${searcher2.foundFiles.join(', ')}`)
  logs.push('')

  logs.push('기존 클래스 수정 없이 새로운 연산을 추가했습니다!')

  fileSystemResult.value = logs.join('\n')
}

// ============ B. Shape Visitor ============

interface ShapeVisitor {
  visitCircle(circle: Circle): void
  visitRectangle(rectangle: Rectangle): void
  visitTriangle(triangle: Triangle): void
}

interface Shape {
  accept(visitor: ShapeVisitor): void
}

class Circle implements Shape {
  constructor(public radius: number) {}

  accept(visitor: ShapeVisitor): void {
    visitor.visitCircle(this)
  }
}

class Rectangle implements Shape {
  constructor(public width: number, public height: number) {}

  accept(visitor: ShapeVisitor): void {
    visitor.visitRectangle(this)
  }
}

class Triangle implements Shape {
  constructor(public base: number, public height: number) {}

  accept(visitor: ShapeVisitor): void {
    visitor.visitTriangle(this)
  }
}

class AreaCalculator implements ShapeVisitor {
  public totalArea: number = 0

  visitCircle(circle: Circle): void {
    this.totalArea += Math.PI * circle.radius ** 2
  }

  visitRectangle(rectangle: Rectangle): void {
    this.totalArea += rectangle.width * rectangle.height
  }

  visitTriangle(triangle: Triangle): void {
    this.totalArea += (triangle.base * triangle.height) / 2
  }
}

class PerimeterCalculator implements ShapeVisitor {
  public totalPerimeter: number = 0

  visitCircle(circle: Circle): void {
    this.totalPerimeter += 2 * Math.PI * circle.radius
  }

  visitRectangle(rectangle: Rectangle): void {
    this.totalPerimeter += 2 * (rectangle.width + rectangle.height)
  }

  visitTriangle(triangle: Triangle): void {
    const hypotenuse = Math.sqrt(triangle.base ** 2 + triangle.height ** 2)
    this.totalPerimeter += triangle.base + triangle.height + hypotenuse
  }
}

function testShapeVisitor() {
  const shapes: Shape[] = [
    new Circle(5),
    new Rectangle(10, 20),
    new Triangle(8, 6)
  ]

  const logs: string[] = []
  logs.push('=== 도형 목록 ===')
  logs.push('1. 원 (반지름: 5)')
  logs.push('2. 직사각형 (가로: 10, 세로: 20)')
  logs.push('3. 삼각형 (밑변: 8, 높이: 6)')
  logs.push('')

  // Visitor 1: 면적 계산
  const areaCalc = new AreaCalculator()
  for (const shape of shapes) {
    shape.accept(areaCalc)
  }
  logs.push(`=== Visitor 1: 면적 계산 ===`)
  logs.push(`전체 면적: ${areaCalc.totalArea.toFixed(2)}`)
  logs.push('')

  // Visitor 2: 둘레 계산
  const perimCalc = new PerimeterCalculator()
  for (const shape of shapes) {
    shape.accept(perimCalc)
  }
  logs.push(`=== Visitor 2: 둘레 계산 ===`)
  logs.push(`전체 둘레: ${perimCalc.totalPerimeter.toFixed(2)}`)
  logs.push('')

  logs.push('Shape 클래스들을 수정하지 않고 새로운 계산을 추가했습니다!')

  shapeResult.value = logs.join('\n')
}

// ============ C. Shopping Cart Visitor ============

interface ItemVisitor {
  visitBook(book: Book): void
  visitElectronics(electronics: Electronics): void
  visitFood(food: Food): void
}

interface Item {
  accept(visitor: ItemVisitor): void
}

class Book implements Item {
  constructor(public title: string, public price: number) {}

  accept(visitor: ItemVisitor): void {
    visitor.visitBook(this)
  }
}

class Electronics implements Item {
  constructor(public name: string, public price: number) {}

  accept(visitor: ItemVisitor): void {
    visitor.visitElectronics(this)
  }
}

class Food implements Item {
  constructor(public name: string, public price: number) {}

  accept(visitor: ItemVisitor): void {
    visitor.visitFood(this)
  }
}

class PriceCalculator implements ItemVisitor {
  public total: number = 0

  visitBook(book: Book): void {
    this.total += book.price * 0.9 // 10% 할인
  }

  visitElectronics(electronics: Electronics): void {
    this.total += electronics.price // 할인 없음
  }

  visitFood(food: Food): void {
    this.total += food.price * 0.95 // 5% 할인
  }
}

class TaxCalculator implements ItemVisitor {
  public totalTax: number = 0

  visitBook(book: Book): void {
    this.totalTax += 0 // 면세
  }

  visitElectronics(electronics: Electronics): void {
    this.totalTax += electronics.price * 0.1 // 10% 세금
  }

  visitFood(food: Food): void {
    this.totalTax += food.price * 0.05 // 5% 세금
  }
}

function testShoppingCartVisitor() {
  const cart: Item[] = [
    new Book('디자인 패턴', 30000),
    new Electronics('노트북', 1500000),
    new Food('사과', 5000)
  ]

  const logs: string[] = []
  logs.push('=== 장바구니 상품 ===')
  logs.push('1. 디자인 패턴 (책) - 30,000원')
  logs.push('2. 노트북 (전자제품) - 1,500,000원')
  logs.push('3. 사과 (식품) - 5,000원')
  logs.push('')

  // Visitor 1: 할인 가격 계산
  const priceCalc = new PriceCalculator()
  for (const item of cart) {
    item.accept(priceCalc)
  }
  logs.push(`=== Visitor 1: 할인 적용 가격 ===`)
  logs.push(`책: 10% 할인`)
  logs.push(`전자제품: 할인 없음`)
  logs.push(`식품: 5% 할인`)
  logs.push(`최종 금액: ${priceCalc.total.toLocaleString()}원`)
  logs.push('')

  // Visitor 2: 세금 계산
  const taxCalc = new TaxCalculator()
  for (const item of cart) {
    item.accept(taxCalc)
  }
  logs.push(`=== Visitor 2: 세금 계산 ===`)
  logs.push(`책: 면세`)
  logs.push(`전자제품: 10% 세금`)
  logs.push(`식품: 5% 세금`)
  logs.push(`총 세금: ${taxCalc.totalTax.toLocaleString()}원`)
  logs.push('')

  logs.push(`총 결제 금액: ${(priceCalc.total + taxCalc.totalTax).toLocaleString()}원`)
  logs.push('')
  logs.push('상품 클래스 수정 없이 다양한 계산을 추가했습니다!')

  cartResult.value = logs.join('\n')
}

// ============ D. Employee Visitor ============

interface EmployeeVisitor {
  visitManager(manager: Manager): void
  visitDeveloper(developer: Developer): void
  visitIntern(intern: Intern): void
}

interface Employee {
  accept(visitor: EmployeeVisitor): void
}

class Manager implements Employee {
  constructor(public name: string, public baseSalary: number) {}

  accept(visitor: EmployeeVisitor): void {
    visitor.visitManager(this)
  }
}

class Developer implements Employee {
  constructor(public name: string, public baseSalary: number) {}

  accept(visitor: EmployeeVisitor): void {
    visitor.visitDeveloper(this)
  }
}

class Intern implements Employee {
  constructor(public name: string, public baseSalary: number) {}

  accept(visitor: EmployeeVisitor): void {
    visitor.visitIntern(this)
  }
}

class SalaryCalculator implements EmployeeVisitor {
  public totalSalary: number = 0

  visitManager(manager: Manager): void {
    this.totalSalary += manager.baseSalary * 1.5 // 50% 보너스
  }

  visitDeveloper(developer: Developer): void {
    this.totalSalary += developer.baseSalary * 1.2 // 20% 보너스
  }

  visitIntern(intern: Intern): void {
    this.totalSalary += intern.baseSalary // 보너스 없음
  }
}

class VacationCalculator implements EmployeeVisitor {
  public totalDays: number = 0

  visitManager(manager: Manager): void {
    this.totalDays += 20
  }

  visitDeveloper(developer: Developer): void {
    this.totalDays += 15
  }

  visitIntern(intern: Intern): void {
    this.totalDays += 10
  }
}

function testEmployeeVisitor() {
  const employees: Employee[] = [
    new Manager('김매니저', 5000000),
    new Developer('이개발', 4000000),
    new Developer('박개발', 4200000),
    new Intern('최인턴', 2000000)
  ]

  const logs: string[] = []
  logs.push('=== 직원 목록 ===')
  logs.push('1. 김매니저 (매니저) - 기본급 5,000,000원')
  logs.push('2. 이개발 (개발자) - 기본급 4,000,000원')
  logs.push('3. 박개발 (개발자) - 기본급 4,200,000원')
  logs.push('4. 최인턴 (인턴) - 기본급 2,000,000원')
  logs.push('')

  // Visitor 1: 급여 계산
  const salaryCalc = new SalaryCalculator()
  for (const employee of employees) {
    employee.accept(salaryCalc)
  }
  logs.push(`=== Visitor 1: 급여 계산 (보너스 포함) ===`)
  logs.push(`매니저: 기본급 + 50% 보너스`)
  logs.push(`개발자: 기본급 + 20% 보너스`)
  logs.push(`인턴: 기본급만`)
  logs.push(`총 급여: ${salaryCalc.totalSalary.toLocaleString()}원`)
  logs.push('')

  // Visitor 2: 연차 계산
  const vacationCalc = new VacationCalculator()
  for (const employee of employees) {
    employee.accept(vacationCalc)
  }
  logs.push(`=== Visitor 2: 연차 일수 계산 ===`)
  logs.push(`매니저: 20일`)
  logs.push(`개발자: 15일`)
  logs.push(`인턴: 10일`)
  logs.push(`총 연차: ${vacationCalc.totalDays}일`)
  logs.push('')

  logs.push('Employee 클래스 수정 없이 새로운 계산을 추가했습니다!')

  employeeResult.value = logs.join('\n')
}
</script>

<style scoped>
/* VisitorPattern 전용 스타일이 필요한 경우 여기에 추가 */
/* 공통 스타일은 src/assets/main.css에서 전역으로 적용됨 */
</style>
