# 📊 Univer Office Studio (Excel & Word Web Suite)

> **차세대 오픈소스 웹 오피스 엔진 Univer 1.1 기반의 스프레드시트(Excel) 및 문서 편집기(Word) 웹 애플리케이션**

[![Univer](https://img.shields.io/badge/Univer-1.1.0-107C41?logo=microsoft-excel&logoColor=white)](https://univer.ai)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

---

## 🌟 주요 핵심 기능

### 1. 📊 Univer Sheets (Microsoft Excel 1:1 클론)
- **강력한 수식 엔진**: `SUM`, `AVERAGE`, `IF`, 사칙연산(`=D5*F5`), 다중 범위 연산 지원
- **실전 건설/엔지니어링 템플릿**:
  - `동탄 트램 가시설 공사비 원가집계표` (H-Pile, 토류판, 버팀보, 띠장, 그라운드앵커 단가 및 수식 내장)
  - `소방/지하시설 안전 리스크 점검 체크리스트` (가시설 흙막이, 포소화설비 등)
- **셀 서식 & 스타일**: 볼드, 이탤릭, 글자색, 배경색, 테두리, 셀 병합, 숫자/통화 서식
- **다중 시트(Multi-sheet)**: 하단 시트 탭 추가, 이름 변경, 순서 이동

### 2. 📑 Univer Docs (Microsoft Word 1:1 클론)
- 캔버스 기반 고성능 리치 텍스트 에디터
- 단락 스타일, 제목 계층, 머리말/꼬리말 및 문서 서식

### 3. 🇰🇷 100% 한글 로케일 (Korean Locale) 완벽 지원
- `@univerjs/preset-sheets-core/locales/ko-KR` 및 `@univerjs/preset-docs-core/locales/ko-KR` 연동으로 모든 메뉴와 툴팁이 자연스러운 한국어로 출력

---

## 🚀 빠른 시작 (Getting Started)

### 요구 사양
- Node.js 18.0 이상

### 로컬 실행
```bash
cd univer_web_office
npm install
npm run dev -- --host 127.0.0.1 --port 5174
```
브라우저에서 `http://127.0.0.1:5174/` 로 접속하시면 됩니다.
