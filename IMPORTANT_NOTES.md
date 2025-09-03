# 중요 사항 및 테스트 안내

## 🚨 OAuth 로그인 설정 필수

현재 앱은 소셜 로그인만 지원하도록 구현되어 있습니다. 
테스트하기 전에 Supabase Dashboard에서 최소 하나의 OAuth 제공자를 설정해야 합니다.

### 빠른 테스트를 위한 Google OAuth 설정:

1. **Google Cloud Console**
   - https://console.cloud.google.com 접속
   - 새 프로젝트 생성 또는 기존 프로젝트 사용
   - "APIs & Services" > "Credentials" 이동
   - "Create Credentials" > "OAuth client ID"
   - Application type: "Web application"
   - Authorized redirect URIs에 추가:
     ```
     https://pjnkbtdlzcwsdifflcta.supabase.co/auth/v1/callback
     ```

2. **Supabase Dashboard**
   - Authentication > Providers
   - Google 활성화
   - Client ID와 Client Secret 입력

## 🧪 앱 실행 및 테스트

```bash
# 개발 서버 시작
npm start

# Expo Go 앱에서 QR 코드 스캔
```

## ⚠️ 주의사항

1. **OAuth 리다이렉트**: 모바일에서 OAuth 로그인 시 브라우저가 열립니다
2. **개발 환경**: Expo Go에서는 일부 OAuth 기능이 제한될 수 있습니다
3. **첫 로그인**: 로그인 후 자동으로 users 테이블에 프로필이 생성됩니다

## 📱 현재 구현된 기능

### ✅ 완료
- 언어 선택 (한국어/영어)
- 소셜 로그인 화면
- 인증 Context 및 상태 관리
- 하단 탭 네비게이션
- 로그아웃 기능 (후원하기 화면)

### 🔜 다음 단계 (Day 2)
- 일기 작성/편집
- 일기 목록 표시
- 이모티콘 반응
- 신고 기능

## 🐛 알려진 문제

1. **OAuth 브라우저 리다이렉트**: 로그인 후 수동으로 앱으로 돌아와야 할 수 있습니다
2. **Expo Go 제한사항**: 프로덕션 빌드에서는 더 나은 OAuth 경험을 제공합니다