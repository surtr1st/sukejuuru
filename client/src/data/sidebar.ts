import type { TSidebarItems } from '@/types';
import ClockIcon from '@/components/icons/24x24/ClockIcon.vue';
import BookOpenIcon from '@/components/icons/24x24/BookOpenIcon.vue';
import CubeIcon from '@/components/icons/24x24/CubeIcon.vue';
import ShieldExclaimationIcon from '@/components/icons/24x24/ShieldExclaimationIcon.vue';
import ArrowsRightLeftIcon from '@/components/icons/24x24/ArrowsRightLeftIcon.vue';
import TagIcon from '@/components/icons/24x24/TagIcon.vue';
import UserCircleIcon from '@/components/icons/24x24/UserCircleIcon.vue';
import SunIcon from '@/components/icons/24x24/SunIcon.vue';
import MoonIcon from '@/components/icons/24x24/MoonIcon.vue';
import { computed, type ComputedRef } from 'vue';
import { useTheme } from '@/composables';

const { togglePreference, preference } = useTheme();

const keys = ['utility', 'statistic', 'manage', 'user'] as const;
export const sidebarItems: ComputedRef<TSidebarItems<typeof keys>> = computed(() => {
    return {
        utility: [
            {
                label: 'Track',
                icon: ClockIcon,
                route: '/track',
            },
        ],
        statistic: [
            {
                label: 'Learning',
                icon: BookOpenIcon,
                route: '/learning',
            },
        ],
        manage: [
            {
                label: 'Node',
                icon: CubeIcon,
                route: '/node',
            },
            {
                label: 'Penalties',
                icon: ShieldExclaimationIcon,
                route: '/penalties',
            },
            {
                label: 'Labels',
                icon: TagIcon,
                route: '/labels',
            },
        ],
        user: [
            {
                label: 'Profile',
                icon: UserCircleIcon,
                route: '/profile',
            },
            {
                label: 'Switch Profile',
                icon: ArrowsRightLeftIcon,
                action: () => {},
            },
            {
                label: 'Theme',
                icon: preference.value === 'dark' ? SunIcon : MoonIcon,
                action: () => togglePreference(),
            },
        ],
    };
});
