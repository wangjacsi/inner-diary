-- 사용자 테이블
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  provider VARCHAR(20) CHECK (provider IN ('google', 'apple', 'naver', 'kakao')),
  username VARCHAR(100),
  language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 일기 테이블
CREATE TABLE diaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  content TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  language VARCHAR(10),
  report_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 이모티콘 반응 테이블
CREATE TABLE reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  diary_id UUID NOT NULL REFERENCES diaries(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  emoji_type VARCHAR(20) CHECK (emoji_type IN ('love', 'support', 'empathy', 'tears', 'hope', 'pray', 'peace')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(diary_id, user_id, emoji_type)
);

-- 신고 테이블
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  diary_id UUID NOT NULL REFERENCES diaries(id) ON DELETE CASCADE,
  reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  report_type VARCHAR(30) CHECK (report_type IN ('spam', 'inappropriate', 'offensive', 'false_info', 'other')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(diary_id, reporter_id)
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX idx_diaries_user_id ON diaries(user_id);
CREATE INDEX idx_diaries_is_public ON diaries(is_public);
CREATE INDEX idx_diaries_report_count ON diaries(report_count);
CREATE INDEX idx_diaries_created_at ON diaries(created_at DESC);
CREATE INDEX idx_reactions_diary_id ON reactions(diary_id);
CREATE INDEX idx_reactions_user_id ON reactions(user_id);
CREATE INDEX idx_reports_diary_id ON reports(diary_id);
CREATE INDEX idx_reports_reporter_id ON reports(reporter_id);

-- updated_at 자동 업데이트를 위한 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_diaries_updated_at BEFORE UPDATE ON diaries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();