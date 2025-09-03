export const EMOTIONS = {
  love: { emoji: "❤️", label: { ko: "사랑", en: "Love" } },
  support: { emoji: "💪", label: { ko: "응원", en: "Support" } },
  empathy: { emoji: "🤝", label: { ko: "공감", en: "Empathy" } },
  tears: { emoji: "😢", label: { ko: "눈물", en: "Tears" } },
  hope: { emoji: "🌟", label: { ko: "희망", en: "Hope" } },
  pray: { emoji: "🙏", label: { ko: "기도", en: "Pray" } },
  peace: { emoji: "🕊️", label: { ko: "평화", en: "Peace" } },
};

export const REPORT_TYPES = {
  spam: { label: { ko: "스팸", en: "Spam" } },
  inappropriate: { label: { ko: "부적절한 내용", en: "Inappropriate" } },
  offensive: { label: { ko: "공격적인 내용", en: "Offensive" } },
  false_info: { label: { ko: "허위 정보", en: "False Information" } },
  other: { label: { ko: "기타", en: "Other" } },
};

export const LANGUAGES = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

export const MAX_PREVIEW_LENGTH = 300;
export const REPORT_THRESHOLD = 5;