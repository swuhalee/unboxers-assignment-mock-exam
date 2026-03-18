import { memo } from 'react';
import logo from '@/assets/logo.svg';
import textLogo from '@/assets/text_logo.svg';

const OMRBranding = memo(() => (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4">
        <img src={logo} alt="베이스 수학학원 로고" className="w-16 h-16" />
        <img src={textLogo} alt="베이스 수학학원" className="w-32" />
        <div className="flex flex-col items-center gap-0.5 mt-2">
            <p className="text-[22px] font-bold text-omr-num text-center leading-tight whitespace-nowrap">학생답안 입력용</p>
            <p className="text-[22px] font-bold text-omr-num text-center leading-tight whitespace-nowrap">OMR 카드</p>
        </div>
        <div className="flex flex-col items-center gap-3 mt-2">
            <p className="text-[13px] text-omr-num text-center leading-snug whitespace-nowrap">
                객관식 답안은 터치해서 칠하고, 주관식<br />답안은 터치한 뒤 키패드로 입력해요.
            </p>
            <p className="text-[13px] text-omr-num text-center leading-snug whitespace-nowrap">
                답안을 작성하지 않고 제출하면 별도의 경<br />고 없이 오답으로 처리되니 주의하세요.
            </p>
        </div>
    </div>
));

export default OMRBranding;
