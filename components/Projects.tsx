"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

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
  /** 회사 프로젝트 / 개인 프로젝트 구분 배지 */
  kind?: "company" | "personal";
  /** 핵심 성과 (카드에는 첫 번째만, 모달에는 최대 3개 강조) */
  highlights?: string[];
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

function isVideo(src: string): boolean {
  return /\.(mp4|webm)$/i.test(src);
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
    kind: "company",
    highlights: [
      "Pro 플랜 대시보드 4종 주도 개발",
      "제품·고객사 배출량 관리 + 2초 자동 저장",
      "한국어·영어·태국어 다국어 적용",
    ],
    description:
      "기업 탄소배출량 관리 SaaS — Pro 플랜 대시보드 4종과 제품·고객사 배출량 관리 화면 주도 개발",
    technologies: [
      { name: "React.js", label: "React 18" },
      { name: "Vite", label: "Vite" },
      { name: "JavaScript", label: "JavaScript" },
      { name: "tailwind css", label: "Tailwind CSS" },
      { name: "TanStack Query", label: "TanStack Query" },
      { name: "Zustand", label: "Zustand" },
      { name: "Chart.js", label: "Chart.js" },
      { name: "Radix UI", label: "shadcn/ui (Radix UI)" },
      { name: "i18next", label: "i18next" },
    ],
    participants: "FE 2 · BE 1 · 디자이너 1 · 기획 1",
    details:
      "기업의 Scope 1·2·3 탄소배출량을 입력·관리·모니터링하는 B2B SaaS입니다. Pro 플랜의 사업장·법인·Scope 3·법인 전체 대시보드와 제품·고객사 배출량 관리 화면을 주도해 개발했고, 데이터 간편 산정 화면, 플랜별 접근 제어 UI, 한국어·영어·태국어 다국어 적용을 맡았습니다.",
    coverImage: "/projects/wincl-monitoring-dashboard-poster.jpg",
    screenshots: ["/projects/wincl-monitoring-dashboard.mp4"],
    detailSections: [
      {
        title: "Pro 플랜 대시보드 4종 개발",
        items: [
          "사업장·법인·Scope 3 법인·법인 전체 대시보드의 차트 대부분을 Chart.js로 직접 구현 (대시보드 차트 파일의 약 2/3 담당)",
          "배출량 추이, 인벤토리별 배출량 Top 10(월/연 전환), 전년 대비 증감률, 탄소집약도, 동종업종·대표기업 벤치마크",
          "감축 목표 화면에 1.5도 시나리오 기준 목표 대비 실적 차트 구현",
          "천 단위 콤마·소수점 셋째 자리 반올림, 0값 제외, 지수 표기 등 배출량 수치 표기 규칙 통일",
        ],
      },
      {
        title: "제품·고객사 배출량 관리 (Scope 3)",
        items: [
          "제품 등록(LCA 제품 검색 연동), 상세·수정·삭제·변경 이력, 제품 매핑 요청 화면 개발",
          "고객사 실적 관리: 기존·직접 등록 고객사 구분, 법인사업자 조회 API로 고객사 추가, 카테고리별(폐기물·프랜차이즈·투자 등) 입력 테이블",
          "입력이 2초간 멈추면 자동 저장되도록 구현해 저장 누락 방지",
          "배출 데이터별 증빙자료 업로드·조회 API 연동",
          "비대해진 화면 컴포넌트를 테이블·모달 컴포넌트와 포매터·헬퍼 유틸로 분리",
        ],
      },
      {
        title: "데이터 간편 산정 화면",
        items: [
          "데이터 간편 산정(간편 계산기) 화면 개발",
          "같은 연료의 중복 입력 방지 및 안내 문구 추가",
          "EEIO 기반 배출량 추정 화면 UI 개선",
        ],
      },
      {
        title: "플랜별 접근 제어 UI",
        items: [
          "Essential·Plus·Trial 플랜 권한에 따라 대시보드·Scope 3 화면을 블러 처리하고 업그레이드 안내 표시",
        ],
      },
      {
        title: "다국어 및 공통 UI",
        items: [
          "대시보드·캘린더·테이블·결제 페이지 등에 한국어·영어·태국어 적용 확대, 첫 진입 시 브라우저 언어를 감지해 전역 언어 설정",
          "shadcn/ui 기반 사이드바·드롭다운·시트·테이블 컴포넌트 도입 및 커스터마이징, 대시보드 사이드바 간소화와 Scope별 탭 메뉴 구성",
          "Prettier 포맷터 도입",
        ],
      },
    ],
  },
  {
    title: "WinCL GovFund",
    kind: "company",
    highlights: [
      "AI 프로토타입 → 유료 SaaS 런칭",
      "필터 URL 동기화 · 레이스 컨디션 해결",
      "단위 테스트 33개 · 구독·계정 플로우 개발",
    ],
    description:
      "중소기업용 정부지원사업 통합 대시보드 SaaS — AI로 만든 프로토타입을 실서비스로 안정화하고 유료 SaaS로 런칭",
    technologies: [
      { name: "React.js", label: "React 19" },
      { name: "typescript", label: "TypeScript" },
      { name: "Vite", label: "Vite" },
      { name: "tailwind css", label: "Tailwind CSS 4" },
      { name: "React Router", label: "React Router 7" },
      { name: "Recharts", label: "Recharts" },
      { name: "react-joyride", label: "react-joyride" },
      { name: "Vitest", label: "Vitest" },
    ],
    participants: "FE 1(본인) · BE·LLM 1 · 기획 1(AI 기반 프로토타입 제작)",
    details:
      "중소기업이 정부지원사업·보조금 정보를 한곳에서 보고 과제·일정까지 관리하는 SaaS입니다. 기획자가 AI로 만든 20개 이상 페이지 규모의 프로토타입에 합류해 타입 정리, 상태 구조 재설계, 테스트 작성을 거쳐 유료 SaaS로 런칭했고, 구독·계정·알림 설정 등 결제와 계정 관련 화면 흐름을 맡았습니다.",
    liveUrl: "https://www.govfund.io",
    coverImage: "/projects/wincl-govfund-overview-poster.jpg",
    screenshots: ["/projects/wincl-govfund-overview.mp4"],
    detailSections: [
      {
        title: "바이브코딩 프로토타입의 실서비스 안정화",
        items: [
          "AI 생성 프로토타입의 타입 정의를 도메인별로 분리하고 공통 컴포넌트를 추출",
          "회원가입 에러 바운더리 추가, 전체 새로고침을 일으키던 a 태그를 React Router Link로 교체",
          "화면마다 하드코딩되어 서로 달랐던 사업 건수·예산 수치를 실제 데이터 기준으로 통일",
        ],
      },
      {
        title: "지원사업 목록 필터 상태 재설계",
        items: [
          "문제: useMemo 안에서 setState를 호출해 페이지 초기화가 불안정하고, 필터가 URL에 반영되지 않아 새로고침·공유 시 상태가 사라짐",
          "해결: 필터의 기준을 URL 쿼리로 옮기고 페이지 초기화는 useEffect로 분리. 열람 제한 확인 API는 요청 순번(ref)을 비교해 늦게 도착한 응답을 버려 레이스 컨디션 차단",
          "결과: 공유·뒤로가기·새로고침 시에도 같은 필터 화면이 그대로 복원됨",
        ],
      },
      {
        title: "공고 데이터 품질 개선 및 단위 테스트",
        items: [
          "주소·기관명 문자열로 17개 시도를 판별하는 정규식 기반 지역 추론 로직 설계, 지역 필터를 걸어도 전국 단위 사업은 유지",
          "신청 URL을 개별 공고와 목록 페이지로 분류하는 로직, 기업마당 유령 공고·마감 공고 필터 구현",
          "Vitest로 지역 추론·URL 분류·마감일 계산 단위 테스트 33개 작성",
        ],
      },
      {
        title: "공고 데이터 수집 방식 개선",
        items: [
          "문제: 기존 HTML 파싱 방식은 사이트 구조가 바뀌면 수집이 깨지고 누락이 생기는 한계가 있음",
          "해결: 기업마당·NTIS·지방보조금의 공식 API를 신청해 수집 스크립트를 공식 API 연동 방식으로 전환",
        ],
      },
      {
        title: "구독·결제·계정",
        items: [
          "정기결제 기반 구독 해지·재개·무료 플랜 즉시 전환 플로우, 구독 변경 이력, 결제 내역(카드 뒷번호 표시) 개발",
          "회원 탈퇴 플로우(확인 모달, 완료 후 이동) 개발",
          "비밀번호 재설정 화면을 임시 비밀번호 방식에서 인증번호 확인 후 새 비밀번호 설정 흐름으로 개편",
          "카카오·네이버 소셜 로그인 연동, 플랜별 기능 제한(열람 횟수·과제 수) 적용",
        ],
      },
      {
        title: "알림 설정",
        items: [
          "텔레그램·카카오 알림톡 채널 설정과 알림 범위·마감 기준·빈도 설정 화면 개발 및 API 연동",
        ],
      },
      {
        title: "펀딩맵 시각화 가독성 개선",
        items: [
          "Canvas 2D 네트워크 뷰에서 겹쳐 읽기 힘들던 예산 라벨을 호버 시 HTML 패널로 옮기고, 건수 배지는 호버·선택한 노드에만 표시. 모바일 레이아웃 재구성",
        ],
      },
      {
        title: "온보딩 및 로딩 경험",
        items: [
          "라우트별 lazy 로딩으로 생기는 로딩 공백을 대시보드·테이블·카드·기본 4종 Skeleton으로 나눠 처리",
          "react-joyride로 주요 화면별 가이드 투어를 구성하고, MutationObserver로 상세 패널이 열리는 시점에 맞춰 2차 투어 연결",
        ],
      },
    ],
  },
  {
    title: "KBW 탄소배출 계산기 (Emission Calculator)",
    kind: "company",
    highlights: [
      "7가지 교통수단 배출량 계산",
      "5단계 설문 플로우",
      "한국어·영어 다국어",
    ],
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
    kind: "personal",
    highlights: [
      "익명 커뮤니티 MVP 배포",
      "3단계 중첩 댓글 · 트랜잭션 좋아요",
      "NextAuth v5 Google 로그인",
    ],
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
    title: "나의 포트폴리오 사이트",
    kind: "personal",
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

const FILTERS = [
  { value: "all", label: "All" },
  { value: "company", label: "Work" },
  { value: "personal", label: "Side" },
] as const;

function KindBadge({ kind }: { kind?: Project["kind"] }) {
  if (!kind) return null;
  const isCompany = kind === "company";
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
        isCompany
          ? "bg-blue-600 text-white"
          : "bg-emerald-100 text-emerald-700"
      }`}
    >
      {isCompany ? "회사" : "개인"}
    </span>
  );
}

const STEP_LABELS: Record<string, string> = {
  "문제": "bg-rose-100 text-rose-700",
  "해결": "bg-blue-100 text-blue-700",
  "결과": "bg-emerald-100 text-emerald-700",
};

function DetailItem({ text }: { text: string }) {
  const m = text.match(/^(문제|해결|결과)\s*:\s*(.*)$/);
  if (m) {
    return (
      <li className="flex gap-2 leading-relaxed text-gray-700">
        <span
          className={`mt-0.5 h-fit shrink-0 rounded px-1.5 py-0.5 text-[11px] font-bold ${STEP_LABELS[m[1]]}`}
        >
          {m[1]}
        </span>
        <span>{m[2]}</span>
      </li>
    );
  }
  return (
    <li className="flex gap-2 leading-relaxed text-gray-700">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
      <span>{text}</span>
    </li>
  );
}

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

  const [filter, setFilter] = useState<"all" | "company" | "personal">(
    "all",
  );
  const selectedProjectData =
    selectedProject !== null ? projects[selectedProject] : null;
  const selectedProjectGallery = selectedProjectData
    ? getProjectGalleryImages(selectedProjectData)
    : [];

  return (
    <>
      <section
        id="projects"
        className="py-28 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              index="02"
              title="Projects"
              subtitle="카드에 마우스를 올리면 시연 영상이, 누르면 문제·해결·결과가 열립니다."
            />
          </motion.div>

          {/* 필터 */}
          <div className="mb-10 grid grid-cols-3 border-y border-gray-900/15 font-display text-sm font-medium uppercase tracking-wide">
            {FILTERS.map((f, i) => (
              <button
                key={f.value}
                type="button"
                aria-pressed={filter === f.value}
                onClick={() => setFilter(f.value)}
                className={`flex items-center justify-between px-4 py-3 text-left transition-colors ${i > 0 ? "border-l border-gray-900/15" : ""} ${filter === f.value ? "text-gray-900" : "text-gray-400 hover:text-gray-700"}`}
              >
                {f.label}
                <span
                  className={`size-3 rounded-sm border ${filter === f.value ? "border-blue-600 bg-blue-600" : "border-gray-400"}`}
                />
              </button>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, index) => {
              if (filter !== "all" && project.kind !== filter) return null;
              const thumbnail = getProjectThumbnail(project);
              const previewVideo = project.screenshots?.find(isVideo);
              const projectTechnologies = getProjectTechnologies(project);
              const keyHighlight = project.highlights?.[0];
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                  }
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border border-gray-900/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-600"
                  onClick={() => setSelectedProject(index)}
                  onMouseEnter={(e) => {
                    const v = e.currentTarget.querySelector("video");
                    if (v) v.play().catch(() => {});
                  }}
                  onMouseLeave={(e) => {
                    const v = e.currentTarget.querySelector("video");
                    if (v) {
                      v.pause();
                      v.currentTime = 0;
                    }
                  }}
                >
                  {/* 썸네일 */}
                  <div className="relative aspect-video shrink-0 overflow-hidden bg-blue-50">
                    {previewVideo ? (
                      <video
                        src={previewVideo}
                        poster={thumbnail}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={`${project.title} 미리보기 영상`}
                      />
                    ) : thumbnail ? (
                      <Image
                        src={thumbnail}
                        alt={`${project.title} 서비스 화면`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold text-blue-200">
                          {project.title.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    {previewVideo && (
                      <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white transition-opacity group-hover:opacity-0">
                        ▶ 시연 영상
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <KindBadge kind={project.kind} />
                      <h3 className="truncate font-display text-xl font-bold uppercase tracking-tight text-gray-900 transition-colors group-hover:text-blue-600">
                        {project.title}
                      </h3>
                    </div>
                    <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-600">
                      {project.description}
                    </p>
                    {keyHighlight && (
                      <p className="mb-4 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                        {keyHighlight}
                      </p>
                    )}

                    <div className="mt-auto flex flex-wrap gap-1.5">
                      {projectTechnologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech.name}
                          className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-600"
                        >
                          {tech.label}
                        </span>
                      ))}
                      {projectTechnologies.length > 3 && (
                        <span className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-600">
                          +{projectTechnologies.length - 3}
                        </span>
                      )}
                    </div>
                    <span className="mt-4 border-t border-gray-100 pt-3 text-sm font-medium text-gray-500 transition-colors group-hover:text-blue-600">
                      상세 보기 →
                    </span>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setSelectedProject(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <div
                className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl isolate"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 헤더 */}
                <div className="flex shrink-0 items-start justify-between gap-4 border-b border-gray-200 bg-white px-6 py-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <KindBadge kind={selectedProjectData.kind} />
                      <h2 className="truncate text-2xl font-bold text-gray-800">
                        {selectedProjectData.title}
                      </h2>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedProjectData.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="shrink-0 rounded-full p-2 transition-colors hover:bg-gray-100"
                    aria-label="닫기"
                  >
                    <X size={24} className="text-gray-600" />
                  </button>
                </div>

                {/* 본문 */}
                <div className="min-h-0 flex-1 overflow-y-auto">
                  <div className="space-y-8 p-6">
                  {selectedProjectGallery.length > 0 && (
                    <div>
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
                            if (isVideo(src)) {
                              return (
                                <video
                                  key={src}
                                  src={src}
                                  poster={selectedProjectData!.coverImage}
                                  className="w-full h-auto rounded-xl border border-gray-200 bg-white shadow-sm"
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  controls
                                  aria-label={`${selectedProjectData!.title} 시연 영상 ${shotIndex + 1}`}
                                />
                              );
                            }
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
                                {isVideo(src) ? (
                                  <video
                                    src={src}
                                    poster={selectedProjectData!.coverImage}
                                    className="absolute inset-0 h-full w-full object-contain bg-white"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    aria-label={`${selectedProjectData!.title} 시연 영상 ${shotIndex + 1}`}
                                  />
                                ) : (
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
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}


                    {/* 핵심 성과 */}
                    {!!selectedProjectData.highlights?.length && (
                      <div className="grid gap-3 sm:grid-cols-3">
                        {selectedProjectData.highlights.slice(0, 3).map((h, i) => (
                          <div
                            key={h}
                            className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-4"
                          >
                            <p className="mb-1 text-xs font-semibold text-blue-500">
                              핵심 성과 {i + 1}
                            </p>
                            <p className="font-bold leading-snug text-gray-800">
                              {h}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 설명 + 요약 정보 */}
                    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                      <div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-800">
                          프로젝트 설명
                        </h3>
                        <p className="leading-relaxed text-gray-700">
                          {selectedProjectData.details ||
                            selectedProjectData.description}
                        </p>
                      </div>

                      <aside className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm">
                        {selectedProjectData.participants && (
                          <div>
                            <p className="mb-1 text-xs font-semibold text-gray-500">
                              참여 인원
                            </p>
                            <p className="text-gray-800">
                              {selectedProjectData.participants}
                            </p>
                          </div>
                        )}
                        {selectedProjectData.period && (
                          <div>
                            <p className="mb-1 text-xs font-semibold text-gray-500">
                              기간
                            </p>
                            <p className="text-gray-800">
                              {selectedProjectData.period}
                            </p>
                          </div>
                        )}
                        {(selectedProjectData.liveUrl ||
                          selectedProjectData.githubUrl) && (
                          <div>
                            <p className="mb-1 text-xs font-semibold text-gray-500">
                              링크
                            </p>
                            <div className="flex flex-col gap-1">
                              {selectedProjectData.liveUrl && (
                                <a
                                  href={selectedProjectData.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="break-all text-blue-600 hover:underline"
                                >
                                  서비스 바로가기 ↗
                                </a>
                              )}
                              {selectedProjectData.githubUrl && (
                                <a
                                  href={selectedProjectData.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="break-all text-blue-600 hover:underline"
                                >
                                  GitHub ↗
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                        <div>
                          <p className="mb-2 text-xs font-semibold text-gray-500">
                            기술 스택
                          </p>
                          {selectedProjectData.technologyGroups?.length ? (
                            <div className="space-y-2">
                              {selectedProjectData.technologyGroups.map(
                                (group) => (
                                  <div key={group.title}>
                                    <p className="mb-1 text-[11px] text-gray-400">
                                      {group.title}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {group.items.map((tech) => (
                                        <span
                                          key={`${group.title}-${tech.name}`}
                                          className="rounded border border-gray-200 bg-white px-2 py-0.5 text-xs text-gray-700"
                                        >
                                          {tech.label}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-1.5">
                              {getProjectTechnologies(selectedProjectData).map(
                                (tech) => (
                                  <span
                                    key={tech.name}
                                    className="rounded border border-gray-200 bg-white px-2 py-0.5 text-xs text-gray-700"
                                  >
                                    {tech.label}
                                  </span>
                                ),
                              )}
                            </div>
                          )}
                        </div>
                      </aside>
                    </div>

                    {/* 상세 내용 */}
                    {selectedProjectData.detailSections && (
                      <div>
                        <h3 className="mb-4 text-lg font-semibold text-gray-800">
                          주요 업무
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          {selectedProjectData.detailSections.map(
                            (section, index) => (
                              <div
                                key={section.title}
                                className="rounded-xl border border-gray-200 p-5 transition-colors hover:border-blue-200"
                              >
                                <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-800">
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                                    {index + 1}
                                  </span>
                                  {section.title}
                                </h4>
                                <ul className="space-y-2 text-sm">
                                  {section.items.map((item) => (
                                    <DetailItem key={item} text={item} />
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
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
