import React from 'react';

export const Arrow = (props: { color: string }) => {
    return (
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path d="M1 1L7 7L13 1" stroke={props.color} strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    );
};

export const Liked = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 17.925" fill="none">
            <path
                d="M9.29334 2.42109L10 3.12684L10.7067 2.42109C12.6039 0.526302 15.6804 0.526302 17.5776 2.42109C19.4741 4.31518 19.4741 7.38556 17.5776 9.27964L10 16.8476L2.42238 9.27964C0.525872 7.38556 0.525872 4.31518 2.42238 2.42109C4.3196 0.526302 7.39613 0.526302 9.29334 2.42109Z"
                strokeWidth="2"/>
        </svg>
    );
};

export const Search = () => {
    return (
        <>
            <svg width="20" height="20" viewBox="-2 0 20 20" fill="none">
                <path
                    d="M17.0014 9.00071C17.0014 13.4194 13.4194 17.0014 9.00071 17.0014C4.58204 17.0014 1 13.4194 1 9.00071C1 4.58204 4.58204 1 9.00071 1C13.4194 1 17.0014 4.58204 17.0014 9.00071Z"
                    strokeWidth="2"/>
            </svg>
            <svg width="20" height="20" viewBox="0 -14 20 20" fill="none">
                <path d="M1 5L5 1" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        </>
    );
};

export const Plus = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 1V10M10 10V19M10 10H1M10 10H19" strokeWidth="2"
                  strokeLinecap="round"/>
        </svg>
    );
};

export const Exit = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                stroke="#C9CED6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 17L21 12L16 7" stroke="#C9CED6" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M21 12H9" stroke="#C9CED6" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    );
};

export const Edit = () => {
    return (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M17.2071 6.25174C17.9814 5.47745 18.1599 4.49514 17.9806 3.59852C17.8083 2.73683 17.312 1.94242 16.7071 1.33753C16.1023 0.73264 15.3078 0.236395 14.4462 0.0640563C13.5495 -0.115268 12.5672 0.0632375 11.7929 0.837529L2.29293 10.3375C2.18315 10.4473 2.10044 10.5811 2.05135 10.7284L0.0513546 16.7284C-0.068425 17.0877 0.025098 17.4839 0.292932 17.7517C0.560764 18.0196 0.956931 18.1131 1.31627 17.9933L7.31627 15.9933C7.46355 15.9442 7.59737 15.8615 7.70715 15.7517L17.2071 6.25174ZM13.2071 2.25174C13.4329 2.02603 13.7005 1.95454 14.0539 2.02522C14.4422 2.10288 14.8978 2.35664 15.2929 2.75174C15.688 3.14685 15.9418 3.60245 16.0195 3.99075C16.0901 4.34414 16.0186 4.61182 15.7929 4.83753L15 5.63043L12.4143 3.04464L13.2071 2.25174ZM11 4.45885L3.87407 11.5848L2.58118 15.4635L6.45986 14.1706L13.5858 7.04464L11 4.45885Z"
                  fill="#000000"/>
        </svg>
    );
};

export const Close = () => {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L7 7M7 7L13 13M7 7L13 1M7 7L1 13" stroke="#000000" strokeWidth="2"
                  strokeLinecap="round"/>
        </svg>
    );
};

export const Open = () => {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9ZM18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM10 6C10 5.44772 9.55228 5 9 5C8.44772 5 8 5.44772 8 6V8H6C5.44772 8 5 8.44772 5 9C5 9.55228 5.44772 10 6 10H8V12C8 12.5523 8.44772 13 9 13C9.55228 13 10 12.5523 10 12V10H12C12.5523 10 13 9.55228 13 9C13 8.44772 12.5523 8 12 8H10V6Z"
                  fill="#000000"/>
        </svg>
    );
};

export const Delete = () => {
    return (
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M6.44152 0C5.15023 0 4.00381 0.82629 3.59547 2.05132L3.27924 3H2H1C0.447715 3 0 3.44772 0 4C0 4.55228 0.447715 5 1 5V17C1 17.5523 1.44772 18 2 18H12C12.5523 18 13 17.5523 13 17V5C13.5523 5 14 4.55228 14 4C14 3.44772 13.5523 3 13 3H12H10.7208L10.4045 2.05132C9.99619 0.82629 8.84977 0 7.55848 0H6.44152ZM11 5H10H4H3V16H11V5ZM8.61257 3L8.50716 2.68377C8.37105 2.27543 7.98891 2 7.55848 2H6.44152C6.01109 2 5.62895 2.27543 5.49284 2.68377L5.38743 3H8.61257Z"
                  fill="#000000"/>
        </svg>
    );
};

export const Back = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 16 12" fill="none">
            <path d="M15 6H1M1 6L6.25 1M1 6L6.25 11" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    );
};
