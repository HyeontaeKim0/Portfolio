# Portfolio Website

Next.js로 구축된 현대적이고 완성도 높은 포트폴리오 웹사이트입니다.

## 🚀 주요 기능

- **반응형 디자인**: 모든 디바이스에서 완벽하게 작동하는 반응형 레이아웃
- **부드러운 애니메이션**: Framer Motion을 활용한 세련된 애니메이션 효과
- **현대적인 UI/UX**: Tailwind CSS로 구현된 아름다운 디자인
- **다크 테마**: 눈에 편안한 다크 테마 적용
- **섹션 구성**:
  - Hero: 소개 및 CTA 버튼
  - About: 자기소개 및 관심사
  - Projects: 프로젝트 포트폴리오
  - Skills: 기술 스택 및 숙련도
  - Contact: 연락처 및 문의 폼

## 🛠️ 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 📦 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 3. 프로덕션 빌드

```bash
npm run build
npm start
```

## 📁 프로젝트 구조

```
Portfolio/
├── app/
│   ├── globals.css       # 전역 스타일
│   ├── layout.tsx        # 루트 레이아웃
│   └── page.tsx          # 메인 페이지
├── components/
│   ├── Navbar.tsx        # 네비게이션 바
│   ├── Hero.tsx          # 히어로 섹션
│   ├── About.tsx         # 소개 섹션
│   ├── Projects.tsx      # 프로젝트 섹션
│   ├── Skills.tsx        # 기술 스택 섹션
│   ├── Contact.tsx       # 연락처 섹션
│   └── Footer.tsx        # 푸터
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🎨 커스터마이징

### 색상 변경

`tailwind.config.ts` 파일에서 색상 테마를 수정할 수 있습니다.

### 프로젝트 정보 수정

`components/Projects.tsx` 파일의 `projects` 배열을 수정하여 프로젝트 정보를 업데이트하세요.

### 기술 스택 수정

`components/Skills.tsx` 파일의 `skills` 배열을 수정하여 기술 스택을 업데이트하세요.

### 연락처 정보 수정

`components/Contact.tsx`와 `components/Footer.tsx` 파일에서 이메일과 소셜 미디어 링크를 수정하세요.

## 📝 라이선스

MIT License
