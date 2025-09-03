import { supabase } from './supabase';

export const databaseService = {
  // 일기 관련 함수들
  diaries: {
    // 일기 목록 가져오기
    async getList(isPublic = false, userId = null) {
      try {
        let query = supabase
          .from('diaries')
          .select(`
            *,
            users(username),
            reactions(emoji_type, user_id)
          `)
          .order('created_at', { ascending: false });

        if (isPublic) {
          query = query
            .eq('is_public', true)
            .lt('report_count', 5);
        } else if (userId) {
          query = query.eq('user_id', userId);
        }

        const { data, error } = await query;
        if (error) throw error;
        
        return { success: true, data };
      } catch (error) {
        console.error('Get diaries error:', error);
        return { success: false, error: error.message };
      }
    },

    // 일기 상세 가져오기
    async getDetail(diaryId) {
      try {
        const { data, error } = await supabase
          .from('diaries')
          .select(`
            *,
            users(username),
            reactions(emoji_type, user_id)
          `)
          .eq('id', diaryId)
          .single();

        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        console.error('Get diary detail error:', error);
        return { success: false, error: error.message };
      }
    },

    // 일기 생성
    async create(diaryData) {
      try {
        const { data, error } = await supabase
          .from('diaries')
          .insert(diaryData)
          .select()
          .single();

        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        console.error('Create diary error:', error);
        return { success: false, error: error.message };
      }
    },

    // 일기 수정
    async update(diaryId, updates) {
      try {
        const { data, error } = await supabase
          .from('diaries')
          .update(updates)
          .eq('id', diaryId)
          .select()
          .single();

        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        console.error('Update diary error:', error);
        return { success: false, error: error.message };
      }
    },

    // 일기 삭제
    async delete(diaryId) {
      try {
        const { error } = await supabase
          .from('diaries')
          .delete()
          .eq('id', diaryId);

        if (error) throw error;
        return { success: true };
      } catch (error) {
        console.error('Delete diary error:', error);
        return { success: false, error: error.message };
      }
    },
  },

  // 반응 관련 함수들
  reactions: {
    // 반응 추가
    async add(diaryId, userId, emojiType) {
      try {
        const { data, error } = await supabase
          .from('reactions')
          .insert({
            diary_id: diaryId,
            user_id: userId,
            emoji_type: emojiType,
          })
          .select()
          .single();

        if (error) throw error;
        return { success: true, data };
      } catch (error) {
        console.error('Add reaction error:', error);
        return { success: false, error: error.message };
      }
    },

    // 반응 삭제
    async remove(diaryId, userId, emojiType) {
      try {
        const { error } = await supabase
          .from('reactions')
          .delete()
          .match({
            diary_id: diaryId,
            user_id: userId,
            emoji_type: emojiType,
          });

        if (error) throw error;
        return { success: true };
      } catch (error) {
        console.error('Remove reaction error:', error);
        return { success: false, error: error.message };
      }
    },

    // 특정 일기의 반응 카운트 가져오기
    async getCounts(diaryId) {
      try {
        const { data, error } = await supabase
          .from('reactions')
          .select('emoji_type')
          .eq('diary_id', diaryId);

        if (error) throw error;

        // 이모지 타입별로 카운트
        const counts = data.reduce((acc, reaction) => {
          acc[reaction.emoji_type] = (acc[reaction.emoji_type] || 0) + 1;
          return acc;
        }, {});

        return { success: true, data: counts };
      } catch (error) {
        console.error('Get reaction counts error:', error);
        return { success: false, error: error.message };
      }
    },
  },

  // 신고 관련 함수들
  reports: {
    // 신고하기
    async create(diaryId, reporterId, reportType, description = '') {
      try {
        const { data, error } = await supabase
          .from('reports')
          .insert({
            diary_id: diaryId,
            reporter_id: reporterId,
            report_type: reportType,
            description,
          })
          .select()
          .single();

        if (error) throw error;

        // 신고 수 업데이트
        await supabase.rpc('increment_report_count', { diary_id: diaryId });

        return { success: true, data };
      } catch (error) {
        console.error('Create report error:', error);
        return { success: false, error: error.message };
      }
    },
  },
};