# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성
1. [Supabase](https://supabase.com)에 로그인
2. "New Project" 클릭
3. 프로젝트 이름: "inner-diary"
4. 데이터베이스 비밀번호 설정
5. 지역 선택 (가까운 지역 선택)

## 2. 데이터베이스 설정
1. Supabase Dashboard에서 SQL Editor 열기
2. 다음 순서대로 SQL 파일 실행:
   - `schema.sql` - 테이블 생성
   - `functions.sql` - 함수 생성
   - `rls_policies.sql` - RLS 정책 설정

## 3. 인증 설정
1. Authentication > Providers 이동
2. 다음 제공자 활성화:
   - Google (모든 사용자)
   - Apple (모든 사용자)
   - Kakao (한국 사용자)
   - Naver (한국 사용자)

### Google OAuth 설정
1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. OAuth 2.0 클라이언트 ID 생성
3. 승인된 리디렉션 URI: `https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback`

### Apple OAuth 설정
1. Apple Developer 계정 필요
2. Services ID 생성
3. Return URLs: `https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback`

### Kakao OAuth 설정
1. [Kakao Developers](https://developers.kakao.com) 접속
2. 애플리케이션 생성
3. Redirect URI: `https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback`

### Naver OAuth 설정
1. [Naver Developers](https://developers.naver.com) 접속
2. 애플리케이션 등록
3. Callback URL: `https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback`

## 4. 환경 변수 설정
1. Supabase Dashboard > Settings > API
2. 다음 값들을 복사:
   - Project URL → `EXPO_PUBLIC_SUPABASE_URL`
   - anon/public key → `EXPO_PUBLIC_SUPABASE_ANON_KEY`
3. `.env` 파일 생성 (`.env.example` 참고)

## 5. Storage 설정 (선택사항)
향후 이미지 업로드 기능 추가 시:
1. Storage > New bucket
2. Bucket 이름: "diary-images"
3. Public bucket 설정

## 6. Edge Functions (선택사항)
향후 번역 기능 추가 시 사용 가능