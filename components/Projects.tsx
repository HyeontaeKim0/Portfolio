"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ProjectDetail {
  title: string;
  items: string[];
}

interface ProjectTechnology {
  name: string;
  label: string;
}

interface ProjectTechnologyGroup {
  title: string;
  items: ProjectTechnology[];
}

interface Project {
  title: string;
  description: string;
  technologies?: ProjectTechnology[];
  /** 영역별 기술 스택. 지정 시 모달에서 Frontend/Backend 등으로 구분 표시 */
  technologyGroups?: ProjectTechnologyGroup[];
  details?: string;
  participants?: string;
  period?: string;
  detailSections?: ProjectDetail[];
  githubUrl?: string;
  liveUrl?: string;
  /** `/public` 기준 경로, 예: `/projects/wincl-monitoring.png` */
  coverImage?: string;
  /** 여러 장 표시 시 순서대로 모달에 노출. 미지정 시 `coverImage`만 사용 */
  screenshots?: string[];
  /** 멀티 스크린샷 배치. mobile=가로 스크롤·세로폰, desktop=가로 스크롤·와이드, vertical=세로 쌓기, split=1행 단독 + 2행 2열 */
  galleryLayout?: "mobile" | "desktop" | "vertical" | "split";
}

function getProjectThumbnail(project: Project): string | undefined {
  return project.coverImage ?? project.screenshots?.[0];
}

function getProjectGalleryImages(project: Project): string[] {
  if (project.screenshots?.length) return project.screenshots;
  if (project.coverImage) return [project.coverImage];
  return [];
}

function getProjectTechnologies(project: Project): ProjectTechnology[] {
  if (project.technologyGroups?.length) {
    return project.technologyGroups.flatMap((group) => group.items);
  }
  return project.technologies ?? [];
}

const projects: Project[] = [
  {
    title: "WinCL Monitoring",
    description:
      "기업용 탄소·ESG 모니터링 SaaS 프론트엔드 — 대시보드·데이터 입력·결제·공급망 도메인 주도 구축",
    technologies: [
      { name: "React.js", label: "React" },
      { name: "typescript", label: "TypeScript" },
      { name: "Vite", label: "Vite" },
      { name: "TanStack Query", label: "TanStack Query" },
      { name: "Zustand", label: "Zustand" },
      { name: "Chart.js", label: "Chart.js" },
      { name: "Recharts", label: "Recharts" },
      { name: "Radix UI", label: "Radix UI" },
      { name: "tailwind css", label: "Tailwind CSS" },
      { name: "i18next", label: "i18next" },
      { name: "Axios", label: "Axios" },
    ],
    participants: "2명 (FE 2) 1명 (BE 1)",
    details:
      "탄소배출량·ESG 모니터링 SaaS의 프론트엔드를 담당했습니다. 플랜·권한 기반 라우팅, Essential/Pro 차별 대시보드, 배출량 E2E, PAYCO 정기결제, 공급망 관리, 3계층 디자인 시스템, 다국어·AI·온보딩까지 설계·구현했습니다.",
    liveUrl: "https://monitoring.wincl.io/",
    coverImage: "/projects/wincl-monitoring.png",
    detailSections: [
      {
        title: "라우팅·데이터 레이어",
        items: [
          "withAuth / allowedPlans(essential·pro) / allowedRoles / wrapWithLayout로 100+ 라우트를 선언형 단일 테이블에 통합, 로그인·구독·역할 3-factor 가드와 자동 리다이렉트",
          "라우트 정의와 Layout 래핑 분리로 신규 페이지는 import + 메타 한 줄로 반영",
          "TanStack Query 도메인 API 모듈 20+ 분리, Axios 인스턴스 다중화(인증·업로드·다운로드·일반)로 캐시 키 충돌 제거·토큰 갱신 격리",
        ],
      },
      {
        title: "대시보드·시각화·성능",
        items: [
          "Scope 1·2·3을 사업장/법인/법인통합 관점으로 Essential·Pro 차별 대시보드 구현",
          "Chart.js·Recharts로 Bar·Donut·Line·Top10·Treemap 등 10종+ 커스텀 차트, Zustand로 기간·조직 등 다중 필터 공유",
          "Google Maps + MarkerClusterer, react-window 가상 스크롤·메모이제이션으로 대량 마커·테이블·초기 렌더 안정화",
        ],
      },
      {
        title: "배출량 플로우·결제·공급망",
        items: [
          "시설 등록 → 감축 목표 → 입력 → 검증 → 배출 할당 → 매핑·고객사까지 E2E, Excel 업·다운 공통화, jsPDF 리포트",
          "PAYCO 정기결제·수단 변경·갱신 및 리다이렉트 3종, 실패·만료·미결제 모달 분기",
          "협력사 ID 기반 동적 라우팅(SCM ↔ ManageClient ↔ Partner/Client), DirectCustomer·매핑·초대 메일",
        ],
      },
      {
        title: "디자인 시스템·품질·배포",
        items: [
          "ui(Radix) → common → 도메인 3계층, CVA + tailwind-merge + clsx로 variant API, Pagination·Select·TableSelect·DateSelect 등 공용화",
          "ESLint(Airbnb·hooks·a11y·tailwind·import-sort) + Prettier, Husky + lint-staged, MR 리뷰로 포맷 논의 최소화",
          "vite-plugin-html로 빌드 타임·캐시 버스트·GTag·MS Clarity 주입, Firebase Hosting 이원화 배포",
        ],
      },
      // {
      //   title: "i18n·AI·온보딩",
      //   items: [
      //     "i18next 기반 한국어·영어·태국어 및 언어 감지",
      //     "WinCL AI·EEIO 연동·useAiHook 기반 배출량 자동 산정 UI, Pro 플랜 신규 유저 대상 10단계 온보딩 튜토리얼",
      //   ],
      // },
      // {
      //   title: "성과",
      //   items: [
      //     "100+ 라우트를 선언형 메타데이터 단일 테이블로 통합 — 플랜·권한 정책 변경 시 한 곳 수정만으로 전 페이지에 반영되어 정책 변경 대응 공수 대폭 단축",
      //     "TanStack Query를 도메인별 API 모듈 20+개로 분리하고 Axios를 인증·업로드·다운로드·일반으로 다중화 — 캐시 키 충돌 제거, 토큰 갱신 로직을 인증 인스턴스에만 격리해 네트워크 레이어 유지보수성 확보",
      //     "도메인 단위 Zustand 슬라이스 약 30개로 전역 상태를 기능별 격리 — 리렌더 범위 최소화 및 스토어 의존성 가시화",
      //     "공용 컴포넌트 3계층(ui → common → 도메인) 재정비 — 신규 페이지 퍼블리싱 공수 체감 약 30% 단축, 디자인 시스템 변경 시 파급 범위 최소화",
      //     "Husky + lint-staged + GitLab MR 기반 코드 리뷰 정착 — 머지 전 포맷 관련 리뷰 코멘트를 사실상 0건으로 줄여 리뷰어가 비즈니스 로직에 집중할 수 있는 환경 구성",
      //     "차트·지도·테이블 등에 가상 스크롤·마커 클러스터링·메모이제이션 적용 — 대시보드 초기 렌더링 성능 안정화",
      //     "다국어(한·영·태) 대응과 온보딩 튜토리얼 구현 — 해외 고객 유입 및 Pro 플랜 신규 가입 전환율 상승에 기여",
      //   ],
      // },
    ],
  },
  {
    title: "WinCL GovFund",
    description:
      "중소기업용 정부지원·보조금·인증 정보 통합 SaaS — 공고·캘린더·지도·프로젝트·예산·경비·문서·리포트·구독까지 한 화면에서 관리",
    technologies: [
      { name: "React.js", label: "React 19" },
      { name: "typescript", label: "TypeScript" },
      { name: "Vite", label: "Vite 6" },
      { name: "tailwind css", label: "Tailwind CSS 4" },
      { name: "React Router", label: "React Router 7" },
      { name: "Recharts", label: "Recharts" },
      { name: "pdfjs-dist", label: "PDF.js" },
      { name: "xlsx", label: "SheetJS (xlsx)" },
      { name: "react-joyride", label: "react-joyride" },
      { name: "ESLint", label: "ESLint" },
      { name: "Vitest", label: "Vitest" },
      { name: "Azure", label: "Azure SWA / Functions" },
      { name: "GitHub Actions", label: "GitHub Actions" },
    ],
    participants: "1명 (FE 2) 1명 (BE 1)",
    details:
      "GovFund는 한국 중소기업이 정부지원사업·보조금·인증 등 지원 정보를 한곳에서 보고, 일정·내 프로젝트·경비·문서·리포트까지 관리할 수 있게 만든 웹 기반 통합 대시보드(SaaS)입니다. 공고 탐색, 캘린더, 지도형 뷰, 프로젝트·예산 플래너, 문서 생성, 뉴스·공지, 설정·구독·문의 등 B2B 업무 도구에 가까운 화면을 갖추고 있으며, 실서비스는 Azure Static Web Apps에 배포됩니다.",
    liveUrl: "https://www.govfund.io",
    coverImage: "/projects/wincl-govfund.png",
    detailSections: [
      {
        title: "라우팅·성능",
        items: [
          "로그인·랜딩은 즉시 로드하고, 대시보드·프로그램·캘린더·프로젝트 매니저 등 대부분 페이지는 React.lazy + Suspense로 코드 스플리팅해 초기 번들을 축소",
        ],
      },
      {
        title: "인증·레이아웃",
        items: [
          "RequireAuth로 비로그인 사용자를 로그인으로 유도, 공통 Layout 아래에서 앱 본문 구성",
          "인증·테마 등 전역 관심사는 Context API로 관리",
        ],
      },
      {
        title: "데이터·시각화·문서",
        items: [
          "대시보드·인사이트·리포트 등에서 Recharts로 지표·추이 표현",
          "PDF.js(pdfjs-dist)로 PDF 처리, SheetJS(xlsx)로 스프레드시트 기반 워크플로(경비·데이터 리포트 등) 지원",
          "react-joyride로 온보딩, API 연동 맥락에서 bcryptjs·JWT 활용",
        ],
      },
      {
        title: "제품 기능 범위(프론트)",
        items: [
          "프로그램 목록·매칭, 캘린더, 펀딩 맵, 내 프로젝트·과제, 보조금·인증, 예산 플래너, 경비·문서 생성, 데이터 리포트, 뉴스·공지·가이드, 설정·프로필·요금제·문의·약관 등 다수 화면·폼을 라우트 단위로 관리",
        ],
      },
      // {
      //   title: "품질·백엔드·운영",
      //   items: [
      //     "ESLint·Vitest로 품질 도구 구성",
      //     "백엔드는 Azure Functions v4(Node), Upstash Redis, GitHub Actions CI/CD",
      //     "dev / prod 브랜치별 배포(dev.govfund.io, www.govfund.io), README 기준 Node 20+, 로컬은 Vite와 Azure Functions Core Tools 병행 실행",
      //   ],
      // },
    ],
  },
  {
    title: "KBW 탄소배출 계산기 (Emission Calculator)",
    description:
      "탄소배출량 계산 웹 애플리케이션 프론트엔드 전담 — 교통·숙박 기반 산출, 5단계 설문, 다국어·반응형 UI",
    technologies: [
      { name: "Next.js", label: "Next.js 13.5.6" },
      { name: "React.js", label: "React 18" },
      { name: "typescript", label: "TypeScript" },
      { name: "tailwind css", label: "Tailwind CSS" },
      { name: "CSS Modules", label: "CSS Modules" },
      { name: "Zustand", label: "Zustand" },
      { name: "i18next", label: "i18next" },
      { name: "Radix UI", label: "Radix UI" },
      { name: "ESLint", label: "ESLint" },
    ],
    details:
      "탄소배출량 계산 웹 애플리케이션을 프론트엔드에서 전담 개발하고 사용자 인터페이스를 설계했습니다. 교통수단별 계수·멀티스텝 설문·Zustand 전역 상태·i18next 다국어·Radix UI 접근성 컴포넌트·반응형 UX까지 일관되게 구현했습니다.",
    participants: "1명 (FE 1)",
    screenshots: [
      "/projects/kbw-emission-landing.png",
      "/projects/kbw-emission-result.png",
    ],

    detailSections: [
      {
        title: "탄소배출량 계산 시스템",
        items: [
          "교통수단별 탄소배출 계수 적용 및 계산 알고리즘 구현",
          "비행기, KTX, 자동차, 택시, 버스, 지하철, 도보 등 7가지 교통수단 지원",
          "공항 간 거리 계산 및 숙박 일수 기반 탄소배출량 산출",
        ],
      },
      {
        title: "단계별 설문·상태 관리",
        items: [
          "사용자 정보 입력부터 최종 결과까지 5단계 진행 방식 구현",
          "진행률 표시 바를 통한 사용자 진행 상황 파악",
          "Zustand를 활용한 전역 상태 관리 및 데이터 플로우 설계",
        ],
      },
      {
        title: "사용자 인터페이스",
        items: [
          "Tailwind CSS와 CSS Modules를 조합한 모던한 UI 디자인",
          "Radix UI 기반 접근성을 고려한 Select, Slider 컴포넌트 구현",
          "모바일 친화적인 반응형 웹 디자인 및 사용자 경험 최적화",
        ],
      },
      {
        title: "다국어 지원",
        items: [
          "i18next를 활용한 한국어/영어 다국어 지원",
          "언어별 동적 텍스트 변경 및 지역화 구현",
          "사용자 언어 선택에 따른 실시간 인터페이스 전환",
        ],
      },
      {
        title: "데이터 처리·결과 시각화",
        items: [
          "사용자 입력 데이터 검증 및 저장 시스템",
          "최종 탄소배출량 계산 결과의 직관적 표시",
          "로딩 애니메이션 및 결과 표시 효과를 통한 사용자 경험 향상",
        ],
      },
      {
        title: "품질·아키텍처",
        items: [
          "TypeScript를 통한 타입 안정성 확보",
          "Next.js App Router를 활용한 효율적인 페이지 라우팅",
          "ESLint를 통한 코드 품질 관리 및 유지보수성 향상",
        ],
      },
    ],
  },
  {
    title: "SOOM",
    description: "라이프스테이지 기반 익명 커뮤니티 플랫폼",
    technologyGroups: [
      {
        title: "Frontend",
        items: [
          { name: "Next.js", label: "Next.js 16 (App Router)" },
          { name: "React.js", label: "React 19" },
          { name: "typescript", label: "TypeScript" },
          { name: "tailwind css", label: "Tailwind CSS 4" },
          { name: "HeroUI", label: "HeroUI" },
          { name: "lucide-react", label: "lucide-react" },
          { name: "Geist", label: "Geist" },
        ],
      },
      {
        title: "Backend",
        items: [
          { name: "Route Handlers", label: "Route Handlers" },
          {
            name: "Server Actions",
            label: "Server Components / Server Actions",
          },
        ],
      },
      {
        title: "Database",
        items: [
          { name: "PostgreSQL", label: "PostgreSQL 16" },
          { name: "Prisma", label: "Prisma ORM" },
        ],
      },
      {
        title: "인증",
        items: [
          { name: "NextAuth", label: "NextAuth v5 (Auth.js)" },
          { name: "Google OAuth", label: "Google OAuth 2.0" },
          { name: "JWT", label: "JWT 세션" },
        ],
      },
      {
        title: "인프라",
        items: [
          { name: "Docker", label: "Docker Compose (로컬 DB)" },
          { name: "Vercel", label: "Vercel" },
        ],
      },
      {
        title: "기타",
        items: [{ name: "ESLint", label: "ESLint" }],
      },
    ],
    details:
      " 20~30대들이 익명으로 고민을 나누고 정보를 공유하는 커뮤니티를 먼저 만드는 것을 목표로 합니다. 현재 MVP는 익명 게시판을 중심으로 구현되어 있습니다. 카테고리별 글 목록, 중첩 댓글, 좋아요, 조회수 추적, Google 로그인, 마이페이지(내 글·댓글·좋아요)까지 동작합니다. 커뮤니티에서 쌓인 신뢰와 사용자 이해를 바탕으로, 이후 단계에서 오프라인 모임 기능을 추가해 온라인 공감을 실제 만남으로 이어가는 구조를 지향합니다.",
    participants: "1명 (개인 프로젝트 · 기획·설계·프론트엔드 전반)",
    screenshots: [
      "/projects/soom-logo.png",
      "/projects/soom-board.png",
      "/projects/soom-mypage.png",
    ],
    liveUrl: "https://soom-psi.vercel.app/",
    galleryLayout: "split",
    detailSections: [
      {
        title: "익명 커뮤니티 게시판",
        items: [
          "카테고리(공지, 자유, 질문, 후기, 정보)별 게시글 목록·필터링",
          "작성자 익명 닉네임 시스템 (지나가는 숨숨 XXXX — userId 해시 기반)",
          "게시글·댓글 CRUD, 최대 3 depth 중첩 댓글",
          "게시글·댓글 좋아요 토글 (트랜잭션 기반 동시성 처리)",
          "조회수 추적 — 쿠키 기반 익명 viewer ID + 로그인 사용자 중복 방지",
          "비로그인 사용자도 게시글 열람 가능, 작성·수정은 로그인 필요",
        ],
      },
      // {
      //   title: "모임 기능",
      //   items: [
      //     "18개 카테고리(등산, 독서, 러닝, 쿠킹, 여행 등) 모임 목록",
      //     "카테고리·태그 필터, 모임 카드 UI(이미지, 일정, 장소, 가격, 호스트 정보)",
      //     "4단계 위저드 모임 생성 플로우 (기본정보 → 일정 → 참가조건 → 미리보기)",
      //   ],
      // },
      {
        title: "인증·마이페이지",
        items: [
          "Google SSO 로그인 (NextAuth + Prisma Adapter)",
          "미들웨어 기반 라우트 보호 (public/private 분기)",
          "마이페이지: 내가 쓴 글 / 내 댓글 / 좋아요한 글 탭",
        ],
      },
      {
        title: "UI/UX",
        items: [
          "모바일 퍼스트 설계 (하단 탭 네비게이션)",
          "웜 베이지(#FBF7F3) + 오렌지(#d97b2c) 브랜드 컬러",
          "데스크탑 사이드바 / 모바일 가로 스크롤 필터 대응",
        ],
      },
      {
        title: "아키텍처",
        items: [
          "Client (RSC + Client Components) → API Route Handlers / Server Actions → Service Layer (boardService, meetingService, profileService) → Prisma ORM → PostgreSQL",
          "App Router 기반 Server/Client Component 분리",
          "Service Layer 패턴으로 비즈니스 로직과 API·페이지 계층 분리",
          "타입 정의(lib/types/), 유틸리티(lib/utils/) 모듈화",
          "Prisma 싱글톤, $transaction 기반 좋아요·조회수 동시성 처리",
        ],
      },
      {
        title: "주요 기술적 성과",
        items: [
          "NextAuth v5 + Edge 미들웨어 호환 JWT 세션 구성",
          "self-relation 기반 중첩 댓글 스키마 설계 및 enrichment 로직 구현",
          "쿠키 + DB 기반 조회수 중복 제거 시스템",
          "익명 닉네임 생성·표시 일관성 유지",
          "8회 Prisma 마이그레이션을 통한 점진적 스키마 확장",
        ],
      },
    ],
  },
  {
    title: "F1(포뮬러원) 대시보드",
    description:
      "레이스 일정·결과·챔피언십 순위·뉴스·드라이버 정보를 한 화면에서 보는 대시보드형 웹앱 — 진행형 개인 프로젝트",
    technologies: [
      { name: "Next.js", label: "Next.js 14 (App Router)" },
      { name: "typescript", label: "TypeScript" },
      { name: "React.js", label: "React 18" },
      { name: "tailwind css", label: "Tailwind CSS" },
      { name: "Recharts", label: "Recharts" },
      { name: "lucide-react", label: "Lucide React" },
      { name: "react-icons", label: "react-icons" },
      { name: "rss-parser", label: "rss-parser" },
      { name: "ESLint", label: "ESLint (eslint-config-next)" },
    ],
    details:
      "포뮬러1 레이스 일정, 최근 경기 결과, 챔피언십 순위(드라이버·컨스트럭터), 최신 뉴스, 드라이버 정보를 한 곳에서 볼 수 있는 대시보드형 웹 애플리케이션입니다. 사용자가 여러 페이지를 헤매지 않고 시즌 흐름을 빠르게 파악하도록 하는 것을 목표로 하며, 현재도 기능을 보강·개선 중인 진행형 프로젝트입니다.",
    participants: "1명 (개인 프로젝트 · 기획·설계·프론트엔드 전반)",
    screenshots: [
      "/projects/f1-dashboard-brand.png",
      "/projects/f1-dashboard-home.png",
    ],
    liveUrl: "https://formula1-dashboard.vercel.app/",
    galleryLayout: "vertical",
    detailSections: [
      {
        title: "레이스·시즌 정보",
        items: [
          "다가오는 레이스 일정, 서킷·국가 플래그 등 시각 요소와 함께 일정 정보를 제공",
          "최근 레이스 결과를 테이블·탭 등으로 확인할 수 있도록 구성",
        ],
      },
      {
        title: "순위·드라이버",
        items: [
          "드라이버·컨스트럭터 챔피언십 순위를 표시",
          "홈에는 포디움·드라이버 카드 슬라이더 등 몰입감 있는 섹션을 두어 시즌 하이라이트를 강조",
        ],
      },
      {
        title: "뉴스",
        items: [
          "RSS를 활용해 F1 관련 최신 소식을 대시보드 내에서 확인할 수 있게 구성",
        ],
      },
      {
        title: "아키텍처·코드 구조",
        items: [
          "App Router 기준으로 app/ 라우팅과 components/ 단위 모듈(네비게이션, 레이스 일정·결과, 순위, 뉴스, 드라이버 등)로 역할을 나누어 유지보수와 확장이 쉬운 형태를 지향",
        ],
      },
      {
        title: "향후 계획 (README 기준)",
        items: [
          "다크 모드, 커뮤니티, 위젯 형태 개발 등 기능을 단계적으로 추가할 예정",
        ],
      },
    ],
  },
  {
    title: "나의 포트폴리오 사이트",
    description: "Next.js App router 활용하여 웹사이트 개발",
    technologies: [
      { name: "React.js", label: "React.js" },
      { name: "typescript", label: "typescript" },
      { name: "Next.js", label: "Next.js" },
      { name: "tailwind css", label: "tailwind css" },
      { name: "Figma", label: "Figma" },
    ],
    details:
      "프로젝트 데이터를 분리하여 관리하며 빌드 시점에 렌더링하는 SSG 웹 제작",
    participants: "1명",
    period: "2024.01 ~ 2024.02",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // 모달이 열렸을 때 body 스크롤 방지
  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const selectedProjectData =
    selectedProject !== null ? projects[selectedProject] : null;
  const selectedProjectGallery = selectedProjectData
    ? getProjectGalleryImages(selectedProjectData)
    : [];

  return (
    <>
      <section
        id="projects"
        className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-600">
              프로젝트 상세
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
              주요 프로젝트의 세부 사항 입니다.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const thumbnail = getProjectThumbnail(project);
              const projectTechnologies = getProjectTechnologies(project);
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                  }
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-500 transition-all duration-300 flex flex-col cursor-pointer shadow-sm"
                  onClick={() => setSelectedProject(index)}
                >
                  {/* 프로젝트 커버 / 이니셜 */}
                  <div className="relative h-40 bg-blue-50 overflow-hidden shrink-0">
                    {thumbnail ? (
                      <Image
                        src={thumbnail}
                        alt={`${project.title} 서비스 화면`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-blue-200">
                          {project.title.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm flex-1">
                      {project.description}
                    </p>

                    {/* 기술 스택 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {projectTechnologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech.name}
                          className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-gray-700 text-xs"
                        >
                          {tech.label}
                        </span>
                      ))}
                      {projectTechnologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-gray-700 text-xs">
                          +{projectTechnologies.length - 3}
                        </span>
                      )}
                    </div>
                    {/* 참여 인원 */}
                    {/* {project.participants && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 ">
                          참여 인원
                        </h3>
                        <p className="text-gray-600">{project.participants}</p>
                      </div>
                    )} */}
                    {/* 상세 정보 버튼 */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(index);
                      }}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors mt-auto pt-4 border-t border-gray-200"
                    >
                      <span>주요 업무 내용 보기</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 모달 */}
      <AnimatePresence>
        {selectedProjectData && (
          <>
            {/* 배경 오버레이 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setSelectedProject(null)}
            />

            {/* 모달 컨텐츠 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl isolate">
                {/* 모달 헤더 — 스크롤 영역 밖에 두어 본문 이미지와 겹치지 않음 */}
                <div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedProjectData.title}
                  </h2>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="닫기"
                  >
                    <X size={24} className="text-gray-600" />
                  </button>
                </div>

                {/* 모달 바디 — 여기만 스크롤 */}
                <div className="min-h-0 flex-1 overflow-y-auto p-6 space-y-6">
                  {/* 프로젝트 설명 */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      프로젝트 설명
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedProjectData.details ||
                        selectedProjectData.description}
                    </p>
                  </div>

                  {selectedProjectGallery.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        스크린샷
                      </h3>
                      {selectedProjectData.galleryLayout === "split" &&
                      selectedProjectGallery.length >= 3 ? (
                        <div className="flex flex-col gap-4">
                          <div className="relative mx-auto w-full max-w-xs aspect-square rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                            <Image
                              src={selectedProjectGallery[0]}
                              alt={`${selectedProjectData.title} 로고`}
                              fill
                              className="object-contain p-6"
                              sizes="(max-width: 896px) 50vw, 320px"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            {selectedProjectGallery.slice(1, 3).map((src) => (
                              <div
                                key={src}
                                className="relative w-full aspect-[9/17] rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shadow-sm"
                              >
                                <Image
                                  src={src}
                                  alt={`${selectedProjectData.title} 서비스 화면`}
                                  fill
                                  className="object-cover object-top"
                                  sizes="(max-width: 896px) 45vw, 280px"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div
                          className={
                            selectedProjectGallery.length > 1
                              ? selectedProjectData.galleryLayout === "vertical"
                                ? "flex flex-col gap-4"
                                : "flex flex-row gap-4 overflow-x-auto pb-2 pt-1 snap-x snap-mandatory [-webkit-overflow-scrolling:touch] md:justify-center"
                              : "flex flex-col gap-4"
                          }
                        >
                          {selectedProjectGallery.map((src, shotIndex) => {
                            const isMulti = selectedProjectGallery.length > 1;
                            const layout =
                              selectedProjectData.galleryLayout ?? "mobile";
                            const isDesktopGallery =
                              isMulti && layout === "desktop";
                            const isVerticalStack =
                              isMulti && layout === "vertical";
                            return (
                              <div
                                key={src}
                                className={
                                  isVerticalStack
                                    ? "relative w-full aspect-video max-h-[min(420px,55vh)] rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shadow-sm"
                                    : isMulti
                                      ? isDesktopGallery
                                        ? "relative shrink-0 w-[min(92vw,560px)] aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shadow-sm snap-start"
                                        : "relative shrink-0 w-[clamp(168px,38vw,260px)] aspect-[9/17] rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shadow-sm snap-start"
                                      : "relative w-full aspect-video max-h-[min(420px,55vh)] rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
                                }
                              >
                                <Image
                                  src={src}
                                  alt={`${selectedProjectData!.title} 서비스 화면 ${shotIndex + 1}`}
                                  fill
                                  className={
                                    isDesktopGallery || isVerticalStack
                                      ? "object-cover object-center"
                                      : "object-cover object-top"
                                  }
                                  sizes={
                                    isVerticalStack || !isMulti
                                      ? "(max-width: 896px) 100vw, 896px"
                                      : isDesktopGallery
                                        ? "(max-width: 768px) 92vw, 560px"
                                        : "(max-width: 640px) 38vw, 260px"
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {(selectedProjectData.liveUrl ||
                    selectedProjectData.githubUrl) && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        링크
                      </h3>
                      <ul className="space-y-2 text-gray-600">
                        {selectedProjectData.liveUrl && (
                          <li>
                            <span className="text-gray-500 mr-2">서비스</span>
                            <a
                              href={selectedProjectData.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline break-all"
                            >
                              {selectedProjectData.liveUrl}
                            </a>
                          </li>
                        )}
                        {selectedProjectData.githubUrl && (
                          <li>
                            <span className="text-gray-500 mr-2">GitHub</span>
                            <a
                              href={selectedProjectData.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline break-all"
                            >
                              {selectedProjectData.githubUrl}
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* 기술 스택 */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      기술 스택
                    </h3>
                    {selectedProjectData.technologyGroups?.length ? (
                      <div className="space-y-4">
                        {selectedProjectData.technologyGroups.map((group) => (
                          <div key={group.title}>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">
                              {group.title}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {group.items.map((tech) => (
                                <span
                                  key={`${group.title}-${tech.name}`}
                                  className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-gray-700 text-sm"
                                >
                                  {tech.label}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {getProjectTechnologies(selectedProjectData).map(
                          (tech) => (
                            <span
                              key={tech.name}
                              className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-gray-700 text-sm"
                            >
                              {tech.label}
                            </span>
                          ),
                        )}
                      </div>
                    )}
                  </div>

                  {/* 참여인원 및 기간 */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedProjectData.participants && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-5">
                          참여인원
                        </h3>
                        <p className="text-gray-600">
                          {selectedProjectData.participants}
                        </p>
                      </div>
                    )}
                    {selectedProjectData.period && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          기간
                        </h3>
                        <p className="text-gray-600">
                          {selectedProjectData.period}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 상세 내용 */}
                  {selectedProjectData.detailSections && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-5">
                        상세 내용
                      </h3>
                      <div className="space-y-6">
                        {selectedProjectData.detailSections.map(
                          (section, index) => (
                            <div key={index}>
                              <h4 className="text-base font-medium text-gray-800 mb-3">
                                {index + 1}. {section.title}
                              </h4>
                              <ul className="space-y-2 ml-4">
                                {section.items.map((item, itemIndex) => (
                                  <li
                                    key={itemIndex}
                                    className="text-gray-600 leading-relaxed list-disc"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
