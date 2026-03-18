export const SPECIAL_KEYS = ['.', '/', '-'] as const;

export const NUMBER_KEYS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
] as const;

export const HINT_TEXT = '숫자만 입력 · 단위 제외 · 분수는 -3/2';

export const FEATURE_CHIPS = [
    { label: '소수점', symbol: '.' },
    { label: '분수', symbol: '/' },
    { label: '음수', symbol: '-' },
] as const;

export const INPUT_EXAMPLES = [
    { description: '제3사분면', input: '3' },
    { description: '3,700만원', input: '37000000' },
    { description: '마이너스 2/3', input: '-2/3' },
    { description: '95%', input: '95' },
] as const;
