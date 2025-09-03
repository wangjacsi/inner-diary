# 내면 일기 (Inner Diary)

힘들고 지친 사람들이 위로받고 자신의 생각을 정리할 수 있는 감성적인 일기 앱

## 🌟 프로젝트 소개

내면 일기는 정서적 위로와 공감이 필요한 사용자들을 위한 글로벌 일기 앱입니다. 사용자들은 자신의 이야기를 안전하게 기록하고, 원한다면 다른 사람들과 공유하며 서로 위로와 응원을 나눌 수 있습니다.

### 주요 특징
- 📝 개인 일기 작성 및 관리
- 🌍 공개 일기를 통한 공감과 소통
- ❤️ 7가지 감정 이모티콘으로 공감 표현
- 🌐 다국어 지원 (한국어, 영어)
- 🔐 소셜 로그인 (Google, Apple, Kakao, Naver)
- 🎨 파스텔톤의 따뜻한 디자인

## 🛠 기술 스택

### Frontend
- React Native (Expo)
- React Navigation
- i18next (다국어 지원)
- React Native Reanimated

### Backend
- Supabase (PostgreSQL, Authentication, Realtime)
- Row Level Security (RLS)

## 🚀 시작하기

### 필수 요구사항
- Node.js (v18+)
- npm 또는 yarn
- Expo Go 앱 (모바일 테스트용)

### 설치 방법

1. 저장소 클론
```bash
git clone https://github.com/your-username/inner-diary.git
cd inner-diary
```

2. 패키지 설치
```bash
npm install
```

3. 환경 변수 설정
```bash
cp .env.example .env
```
`.env` 파일에 Supabase 정보 입력:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

4. Supabase 설정
   - [Supabase](https://supabase.com)에서 프로젝트 생성
   - `supabase/` 폴더의 SQL 파일들을 순서대로 실행
   - 자세한 설정은 `supabase/README.md` 참고

5. 앱 실행
```bash
npm start
```

## 📱 주요 기능

### 1. 나의 일기
- 개인 일기 작성, 수정, 삭제
- 공개/비공개 설정
- 날짜별 정렬

### 2. 우리의 일기
- 다른 사용자들의 공개 일기 열람
- 300자 미리보기
- 이모티콘 반응 남기기

### 3. 감정 표현
- ❤️ 사랑 (Love)
- 💪 응원 (Support)
- 🤝 공감 (Empathy)
- 😢 눈물 (Tears)
- 🌟 희망 (Hope)
- 🙏 기도 (Pray)
- 🕊️ 평화 (Peace)

## 📂 프로젝트 구조

```
inner-diary/
├── src/
│   ├── components/     # UI 컴포넌트
│   ├── screens/        # 화면 컴포넌트
│   ├── services/       # API 서비스
│   ├── utils/          # 유틸리티 함수
│   ├── hooks/          # 커스텀 훅
│   ├── i18n/           # 다국어 설정
│   └── styles/         # 스타일 정의
├── assets/             # 이미지, 폰트 등
├── supabase/          # 데이터베이스 스키마
└── docs/              # 문서
```

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면:
1. Fork 후 feature 브랜치 생성
2. 커밋 메시지는 명확하게 작성
3. Pull Request 생성

## 📄 라이선스

MIT License

## 👥 만든 사람

- 개발: Sean + Claude Code
- 디자인: 파스텔톤 감성 디자인

---

**내면 일기**와 함께 당신의 이야기를 들려주세요 💝