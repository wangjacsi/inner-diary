-- RLS (Row Level Security) 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE diaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Users 테이블 정책
-- 모든 사용자는 다른 사용자의 프로필을 볼 수 있음 (username 표시를 위해)
CREATE POLICY "Anyone can view user profiles" ON users
  FOR SELECT USING (true);

-- 사용자는 자신의 프로필만 업데이트할 수 있음
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- 새로운 사용자 생성은 인증된 사용자만 가능
CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid()::text = id::text);

-- Diaries 테이블 정책
-- 모든 사용자는 공개 일기를 읽을 수 있음 (신고 5건 미만)
CREATE POLICY "Anyone can view public diaries" ON diaries
  FOR SELECT USING (is_public = true AND report_count < 5);

-- 사용자는 자신의 모든 일기를 읽을 수 있음
CREATE POLICY "Users can view own diaries" ON diaries
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- 사용자는 자신의 일기만 생성할 수 있음
CREATE POLICY "Users can create own diaries" ON diaries
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- 사용자는 자신의 일기만 수정할 수 있음
CREATE POLICY "Users can update own diaries" ON diaries
  FOR UPDATE USING (auth.uid()::text = user_id::text);

-- 사용자는 자신의 일기만 삭제할 수 있음
CREATE POLICY "Users can delete own diaries" ON diaries
  FOR DELETE USING (auth.uid()::text = user_id::text);

-- Reactions 테이블 정책
-- 모든 사용자는 공개 일기의 반응을 볼 수 있음
CREATE POLICY "Anyone can view reactions on public diaries" ON reactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM diaries 
      WHERE diaries.id = reactions.diary_id 
      AND diaries.is_public = true 
      AND diaries.report_count < 5
    )
  );

-- 인증된 사용자는 공개 일기에 반응할 수 있음
CREATE POLICY "Authenticated users can react to public diaries" ON reactions
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM diaries 
      WHERE diaries.id = diary_id 
      AND diaries.is_public = true 
      AND diaries.report_count < 5
    )
  );

-- 사용자는 자신의 반응만 삭제할 수 있음
CREATE POLICY "Users can delete own reactions" ON reactions
  FOR DELETE USING (auth.uid()::text = user_id::text);

-- Reports 테이블 정책
-- 인증된 사용자만 신고할 수 있음
CREATE POLICY "Authenticated users can report public diaries" ON reports
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM diaries 
      WHERE diaries.id = diary_id 
      AND diaries.is_public = true
    )
  );

-- 사용자는 자신의 신고 내역을 볼 수 있음
CREATE POLICY "Users can view own reports" ON reports
  FOR SELECT USING (auth.uid()::text = reporter_id::text);