import { FC, useEffect } from 'react';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import vConsole from 'vconsole';
import type { RouterContext } from '@/types.ts';

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RouteComponent
});

const Devtool: FC = () => {
    useEffect(() => {
        if (import.meta.env.DEV) {
            new vConsole();
        }
    }, []);
    if (!import.meta.env.DEV) {
        return null;
    }
    console.log('env', import.meta.env);
    return (
        <>
            <TanStackRouterDevtools />
        </>
    );
};

function RouteComponent() {
    return (
        <>
            <Outlet />
            <Devtool />
        </>
    );
}
