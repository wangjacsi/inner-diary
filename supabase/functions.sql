-- 신고 수 증가 함수
CREATE OR REPLACE FUNCTION increment_report_count(diary_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE diaries
  SET report_count = report_count + 1
  WHERE id = diary_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 반응 통계를 위한 뷰
CREATE OR REPLACE VIEW diary_reaction_stats AS
SELECT 
  diary_id,
  emoji_type,
  COUNT(*) as count
FROM reactions
GROUP BY diary_id, emoji_type;