# To-Do 메모 앱
이 프로젝트는 웹 개발 입문자가 바이브 코딩 기법으로 기본적인 CRUD(Create, Read, Update, Delete) 기능을 이해하고, 브라우저의 localStorage API를 활용한 데이터 저장 방법을 학습할 수 있도록 설계됐습니다.

HTML, CSS, JavaScript만으로 구현한 간단한 To-Do 메모 앱입니다.

## 기술 스택

- **HTML5** – 시맨틱 마크업, 폼 요소
- **CSS3** – CSS 변수, Flexbox, 미디어 쿼리
- **JavaScript (Vanilla)** – DOM API, `localStorage`, 이벤트 리스너

## 프로젝트 구조

```
vibe-1103-acorn02-todo-memo/
├── index.html   # 앱 구조 및 마크업
├── style.css    # 스타일 및 반응형
├── script.js    # 비즈니스 로직 및 저장소 연동
└── README.md    # 프로젝트 설명 (본 문서)
```

## 구현 기능

| 기능 | 설명 |
|------|------|
| 메모 추가 | 입력 필드에 텍스트 입력 후 **추가** 버튼 또는 **Enter** 키로 목록에 추가 |
| 메모 삭제 | 각 항목의 **삭제** 버튼으로 해당 메모만 제거 |
| 유형 분류 | 메모 추가 시 유형(업무/개인/학습/기타)을 선택해 시각적으로 구분 |
| 데이터 유지 | `localStorage`에 저장하여 새로고침 후에도 목록 유지 |

## 기술적 구현 내용

### 1. 데이터 저장 (localStorage)

- **저장 키**: `todo-memos`
- **형식**: JSON 배열. 각 항목은 `{ id: string, text: string, type: 'work' | 'personal' | 'study' | 'other' }` 구조.
- **ID 생성**: `Date.now().toString()`으로 고유 ID 부여.
- **읽기/쓰기**: `localStorage.getItem()` / `localStorage.setItem()`으로 직렬화·역직렬화.

```js
// 읽기
const data = localStorage.getItem(STORAGE_KEY);
const memos = data ? JSON.parse(data) : [];

// 쓰기
localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
```

### 2. DOM 조작 (JavaScript)

- **요소 참조**: `getElementById`로 입력, 유형 선택 셀렉트 박스, 버튼, 목록, 개수 표시 영역 참조.
- **동적 생성**: `createElement`로 `<li>`, `<div>`, `<span>`, `<button>` 생성 후 `appendChild`로 목록에 추가.
- **목록 갱신**: `memoList.innerHTML = ''` 후 `getMemos()` 결과를 바탕으로 `renderList()`로 다시 그리기.
- **빈 상태**: 메모가 없을 때 안내 문구만 표시하도록 분기 처리.

### 3. 이벤트 처리

- **추가**: `addBtn` 클릭 이벤트, `memoInput`의 `keydown`에서 `Enter` 시 `addMemo()` 호출. 이때 선택된 유형 값(`work` / `personal` / `study` / `other`)도 함께 저장.
- **삭제**: 각 항목의 삭제 버튼에 `removeMemo(id)`를 연결해 해당 ID만 제외 후 저장·다시 렌더링.

### 4. CSS 및 반응형

- **CSS 변수**: `:root`에 색상·배경·테두리 등을 변수로 정의해 유지보수와 테마 변경이 쉽도록 구성.
- **레이아웃**: 메인 영역은 `max-width: 520px`로 제한, Flexbox로 입력 영역·항목 정렬.
- **반응형**: `@media (max-width: 480px)`에서 패딩 축소, 입력 영역을 세로 배치(`flex-direction: column`), 추가 버튼 전체 너비 등으로 모바일 대응.
- **접근성·UX**: `:focus` 스타일, 버튼 `:active` 시 살짝 축소, 항목 추가 시 `fadeIn` 애니메이션 적용.

### 5. 입력 제한

- HTML `input`에 `maxlength="200"`으로 최대 200자 제한.
- `trim()`으로 앞뒤 공백 제거 후, 빈 문자열이면 추가하지 않음.

## 실행 방법

1. 프로젝트 폴더에서 `index.html`을 브라우저로 열기.
2. 또는 로컬 서버를 띄운 뒤 해당 주소로 접속 (예: Live Server, `npx serve` 등).

별도 빌드나 패키지 설치 없이 HTML/CSS/JS만으로 동작합니다.
