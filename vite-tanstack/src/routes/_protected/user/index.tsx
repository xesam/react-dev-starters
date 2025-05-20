import { createFileRoute } from '@tanstack/react-router';
import { useAuthStore } from '@/store';

export const Route = createFileRoute('/_protected/user/')({
    component: RouteComponent
});

function RouteComponent() {
    const user = useAuthStore((state) => state.user);
    return <div>Hello "/user/index.tsx"!, user is {user ?? 'null'}</div>;
}
