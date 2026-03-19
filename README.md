# Unboxers Assignment Mock Exam

## Web App Run

```bash
pnpm install
pnpm dev
```

- 웹앱 주소: `http://localhost:5173`

## 피그마 대비 변경 사항

제공된 피그마 디자인과 다르게 개발한 사항입니다.

### 가이드

- 객관식·주관식 마킹 안내 스텝 끝에 완료 스텝 추가: 흐름이 더 자연스럽다고 판단
- 타이머 스텝의 포인트 글자색을 다른 스텝들과 동일하게 통일

### 시험

- 화면 밖 또는 다른 창으로 이탈 시 경고문 삽입
- OMR 카드 스캔 문구 및 디자인 변경

### OMR

- 하단 타이밍 마크 삭제: 디자인적 요소 외 실용적 의미가 없다고 판단, 개발 시간 단축을 위해 제거
- 성명·학교·좌석 번호를 입력 필드(input)로 변경
- 주관식 답안 row 클릭 시 active 디자인 수정

### 키패드

- 도움말 디자인 변경: 이전 버전의 완성도 부족을 개선

### 서버

- 스키마 `Exam.description` → `Exam.subject` 이름 변경: 실제로 쓰이지 않는 필드이며 현재 `subject`가 필요하기에 변경
- `GET /api/exams` 응답에 객관식·주관식 문제 수 추가
- `POST /api/exams/submit` 요청에서 객관식 답안을 여러 개 받을 수 있도록 수정: 가이드 상 복수 선택이 가능하기에 반영

## 알려진 버그

- **주관식 입력값 유효성 미검증**: `.` 등 숫자로 파싱되지 않는 값을 입력한 채 제출하면 `null`이 서버로 전송되어 서버가 요청을 거부, 시험 결과가 저장되지 않음 (미수정)
- **SVG 에셋 초기 로드 깜빡임**: SVG를 URL로 import해 `<img>`로 렌더링하기 때문에 브라우저가 페이지 렌더 후 별도 요청으로 SVG를 가져와 첫 렌더 시 잠깐 빈 화면이 보임. `?react`로 인라인 컴포넌트화하면 해결되나 미수정 (미수정)

---

## 과제 개요

이번 과제는 베이스 수학학원에서 약 **18-27인치의 터치스크린**을 이용해 시험을 응시하는 **모의고사 웹앱**을 만드는 과제입니다. 모의고사는 학생들이 지면에 문제를 풀고 답안을 앱으로 마킹하여 채점과 결과 확인, 이후 복습까지 온라인으로 진행되는 방식입니다.

현재 사용 중인 웹앱 일부는 [베이스 수학학원 데모](https://edu.basemath.co.kr/demo/exam) 에서 확인할 수 있습니다.

![2026년 3월 1일 공통수학1 진단고사 응시 현장](./img.jpg)
_2026년 3월 1일 공통수학1 진단고사 응시 현장_

## 기능 명세

모의고사 앱은 크게 세 단계로 구성됩니다.

1. 튜토리얼: 시험 응시에 대한 정보와 OMR 카드 작성 방법을 안내합니다.
2. 답안지 마킹: 시험 답안을 OMR 카드에 입력하고, 남은 시간 등을 표시합니다.
3. 채점 및 결과 확인: 답안을 제출하고 결과를 확인합니다.

## 과제 진행 방식

- 공유받은 Figma 디자인 파일을 참고해 모의고사 응시 웹앱을 자유롭게 개발합니다.
- Figma에 포함되지 않은 디테일은 구현자가 판단해 결정합니다.
- 필요하다면 [베이스 수학학원 데모](https://edu.basemath.co.kr/demo/exam)를 참고해도 됩니다.
- 과제 제출 방식은 자유입니다.

## 사용하는 기술

- 프론트엔드는 [React + Vite](https://vite.dev/guide/) 템플릿 기준입니다.
- 패키지 관리는 [pnpm](https://pnpm.io/)을 사용합니다.
- 스타일링은 [Tailwind CSS v4](https://tailwindcss.com/)를 사용합니다.
- 데이터 관리는 [TanStack Query](https://tanstack.com/query/latest)를 사용합니다.
- 그 외 스택은 자유롭게 선택할 수 있습니다.

## 서버 개요

과제용 모의고사 서버입니다. 현재 구성은 `Fastify + Prisma + SQLite`이며, API는 시험 조회와 시험 제출/채점 두 개만 제공합니다.

## 실행 방법

```bash
pnpm install
pnpm db:generate
pnpm db:push
pnpm db:seed
pnpm dev
```

- 서버 주소: `http://localhost:3001`
- Swagger UI: `http://localhost:3001/swagger`
- 환경 변수 파일: `apps/server/.env`

## API

### `GET /api/exams`

시험 기본 정보를 조회합니다.

#### Response

```json
{
  "message": "Exam retrieved successfully",
  "data": {
    "title": "모의고사 응시 테스트",
    "description": "모의고사 웹앱 과제용으로 구성한 시험입니다.",
    "supervisorName": "배이수",
    "totalQuestions": 25,
    "totalScore": 100
  }
}
```

### `POST /api/exams/submit`

학생 정보와 답안을 제출하면 서버가 채점 후 결과를 반환합니다.

#### Request

```json
{
  "name": "홍길동",
  "school": "베이스고",
  "grade": 1,
  "studentNumber": 12,
  "seatNumber": 3,
  "answers": []
}
```

#### Request Field

- `name`: 학생 이름
- `school`: 학교명
- `grade`: 학년
- `studentNumber`: 번호
- `seatNumber`: 좌석 번호
- `answers`: 빈 배열도 허용하며, 아무 답안도 제출하지 않으면 전체 문항이 `unanswered`로 채점됨
- `answers[].answerType`: `objective` 또는 `subjective`
- `answers[].number`: 문항 번호
- `answers[].answer`: 제출 답안

#### Response

```json
{
  "message": "Exam submitted successfully",
  "data": {
    "title": "모의고사 응시 테스트",
    "score": 5,
    "correctCount": 2,
    "wrongCount": 0,
    "unansweredCount": 23,
    "results": [
      {
        "answerType": "objective",
        "number": 1,
        "result": "correct"
      },
      {
        "answerType": "subjective",
        "number": 1,
        "result": "correct"
      }
    ]
  }
}
```

#### Response Field

- `score`: 획득 점수
- `correctCount`: 정답 개수
- `wrongCount`: 오답 개수
- `unansweredCount`: 미응답 개수
- `results[].answerType`: `objective` 또는 `subjective`
- `results[].number`: 문항 번호
- `results[].result`: `correct`, `wrong`, `unanswered`

## Seed 정답표

### 객관식

| 번호 | 정답 | 배점 |
| --- | --- | --- |
| 1 | 3 | 2 |
| 2 | 3 | 2 |
| 3 | 4 | 2.5 |
| 4 | 5 | 2.5 |
| 5 | 3 | 2.5 |
| 6 | 5 | 2.5 |
| 7 | 5 | 3 |
| 8 | 2 | 3 |
| 9 | 3 | 3.5 |
| 10 | 4 | 3.5 |
| 11 | 5 | 4 |
| 12 | 5 | 4 |
| 13 | 2 | 4.5 |
| 14 | 4 | 5.5 |

### 주관식

| 번호 | 정답 | 배점 |
| --- | --- | --- |
| 1 | 6 | 3 |
| 2 | 2 | 4 |
| 3 | 21 | 4 |
| 4 | 32 | 4 |
| 5 | 2 | 4 |
| 6 | 9 | 4.5 |
| 7 | 24 | 4.5 |
| 8 | 11 | 5 |
| 9 | 12 | 6 |
| 10 | 1 | 8 |
| 11 | 104 | 8 |
