import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useAuthStore } from '@/store';

export const Route = createFileRoute('/_protected')({
    beforeLoad: async ({ location }) => {
        const user = useAuthStore.getState().user;
        if (!user) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href
                }
            });
        }
    },
    component: RouteComponent
});

function RouteComponent() {
    return <Outlet />;
}
