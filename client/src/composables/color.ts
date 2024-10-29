import type { TColorVariant } from '@/types';

export function getBackgroundColor(color: TColorVariant | string, opacity = false) {
    switch (color) {
        case 'secondary':
            return `${opacity ? 'bg-secondary/15' : 'bg-secondary'}`;
        case 'frost':
            return `${opacity ? 'bg-frost/15' + opacity : 'bg-frost'} text-neutral`;
        case 'neutral':
            return `${opacity ? 'bg-neutral/15' + opacity : 'bg-neutral'}`;
        case 'slate':
            return `${opacity ? 'bg-slate/15' + opacity : 'bg-slate'}`;
        case 'midnight':
            return `${opacity ? 'bg-midnight/15' + opacity : 'bg-midnight'}`;
        case 'shadow':
            return `${opacity ? 'bg-shadow/15' + opacity : 'bg-shadow'}`;
        case 'rose':
            return `${opacity ? 'bg-rose/15' + opacity : 'bg-rose'}`;
        case 'amber':
            return `${opacity ? 'bg-amber/15' : 'bg-amber'}`;
        case 'mint':
            return `${opacity ? 'bg-mint/15' : 'bg-mint'}`;
        case 'skyblue':
            return `${opacity ? 'bg-skyblue/15' : 'bg-skyblue'}`;
        case 'sunset':
            return `${opacity ? 'bg-sunset/15' : 'bg-sunset'}`;
        case 'blush':
            return `${opacity ? 'bg-blush/15' : 'bg-blush'}`;
        default:
            return `${opacity ? 'bg-primary/15' : 'bg-primary'}`;
    }
}

export function getHoverColor(color: TColorVariant | string) {
    switch (color) {
        case 'secondary':
            return 'hover:bg-secondary/50';
        case 'frost':
            return 'hover:bg-frost/50';
        case 'neutral':
            return 'hover:bg-neutral/50';
        case 'slate':
            return 'hover:bg-slate/50';
        case 'midnight':
            return 'hover:bg-midnight/50';
        case 'shadow':
            return 'hover:bg-shadow/50';
        case 'rose':
            return 'hover:bg-rose/50';
        case 'amber':
            return 'hover:bg-amber/50';
        case 'mint':
            return 'hover:bg-mint/50';
        case 'skyblue':
            return 'hover:bg-skyblue/50';
        case 'sunset':
            return 'hover:bg-sunset/50';
        case 'blush':
            return 'hover:bg-blush/50';
        default:
            return 'hover:bg-primary/50';
    }
}

export function getBorderColor(color: TColorVariant | string) {
    switch (color) {
        case 'secondary':
            return 'border border-secondary';
        case 'frost':
            return 'border border-frost';
        case 'neutral':
            return 'border border-neutral';
        case 'slate':
            return 'border border-slate';
        case 'midnight':
            return 'border border-midnight';
        case 'shadow':
            return 'border border-shadow';
        case 'rose':
            return 'border border-rose';
        case 'amber':
            return 'border border-amber';
        case 'mint':
            return 'border border-mint';
        case 'skyblue':
            return 'border border-skyblue';
        case 'sunset':
            return 'border border-sunset';
        case 'blush':
            return 'border border-blush';
        default:
            return 'border border-primary';
    }
}

export function getTextColor(color: TColorVariant | string) {
    switch (color) {
        case 'secondary':
            return 'text-secondary';
        case 'frost':
            return 'text-frost';
        case 'neutral':
            return 'text-neutral';
        case 'slate':
            return 'text-slate';
        case 'midnight':
            return 'text-midnight';
        case 'shadow':
            return 'text-shadow';
        case 'rose':
            return 'text-rose';
        case 'amber':
            return 'text-amber';
        case 'mint':
            return 'text-mint';
        case 'skyblue':
            return 'text-skyblue';
        case 'sunset':
            return 'text-sunset';
        case 'blush':
            return 'text-blush';
        default:
            return 'text-primary';
    }
}
