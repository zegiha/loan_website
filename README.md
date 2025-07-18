# 대출센터

![](https://private-user-images.githubusercontent.com/118225985/467877363-ebc2e93b-d00d-466f-961f-822cb21de719.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTI4MTc3MzEsIm5iZiI6MTc1MjgxNzQzMSwicGF0aCI6Ii8xMTgyMjU5ODUvNDY3ODc3MzYzLWViYzJlOTNiLWQwMGQtNDY2Zi05NjFmLTgyMmNiMjFkZTcxOS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNzE4JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDcxOFQwNTQzNTFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT03ZThlZjhiYWQ1YTE5MTdhNWY2NTkzZjhjZjVjN2NkYTkwNzg0N2NiZGQ3NWRiNTJjMTk2MGVkYjEzMzY0M2ZkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.RDsCQxynPSiLxGiY05jDG9SNRKlH2M2t3kI_iTzywl8)

대부 중개 업체 광고 플랫폼  
일반 사용자와 대부 중개 업체가 이용하는 웹사이트입니다.

## 기술 스택

- **Framework**: Next.js 15.2.1
- **Language**: TypeScript
- **Styling**: SCSS, CSS Modules
- **State Management**: Zustand
- **HTTP Client**: Axios, TanStack Query
- **UI Components**: Swiper, Material Symbols
- **Authentication**: reCAPTCHA v3
- **Date Handling**: Luxon
- **Animation**: Lottie

## 설치 및 실행

### 설치
```bash
yarn install
```

### 개발 서버 실행
```bash
yarn dev
```
개발 모드로 실행하며, [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### 빌드
```bash
yarn build
```
프로덕션용 빌드 파일을 생성합니다.

### 프로덕션 서버 실행
```bash
yarn start
```

### 코드 검사
```bash
yarn lint
```

## 프로젝트 구조

```
├── app/                    # Next.js App Router 페이지
├── components/             # 재사용 가능한 UI 컴포넌트
│   ├── atoms/             # 기본 컴포넌트 (아이콘, 레이아웃, 타이포그래피)
│   ├── molecules/         # 복합 컴포넌트 (입력폼, 모달, 테이블 등)
│   └── organisms/         # 복잡한 컴포넌트 (섹션, 레이아웃)
├── entities/              # API 타입 정의
├── features/              # 페이지별 기능 모듈
├── shared/                # 공통 유틸리티, 상수, 타입
├── public/                # 정적 파일
└── middleware.ts          # Next.js 미들웨어
```

## 주요 페이지

- `/` - 메인 페이지
- `/loan/location` - 지역별 업체 검색
- `/loan/product` - 상품별 업체 검색
- `/loan/certified` - 인증업체 조회
- `/post/list` - 실시간 대출 문의
- `/my/ads` - 내 광고 관리
- `/customer` - 고객센터

## 환경 변수

프로젝트 실행을 위해 다음 환경 변수들이 필요합니다:

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_LENDERS_API_URL=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
```

## 배포

이 프로젝트는 Docker를 사용하여 배포할 수 있습니다.

```bash
docker build -t loan-center .
docker run -p 3000:3000 loan-center
```