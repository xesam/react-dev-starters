import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { Route as RouteType } from '@tanstack/react-router';
import { useAppStore } from '@/store';
import './index.css';

export const Route = createFileRoute('/')({
    component: RouteComponent
});

function ParentRouteView({ routes }: { routes: RouteType[] }) {
    return (
        <>
            {routes.map((route: RouteType) => (
                <RouteView key={route.id} route={route} />
            ))}
        </>
    );
}

function RouteView({ route }: { route: RouteType }) {
    if (route.children) {
        return (
            <>
                <p>{route.id}</p>
                <div style={{ paddingLeft: '2em' }}>
                    <ParentRouteView routes={route.children as RouteType[]} />
                </div>
            </>
        );
    }
    return (
        <Link to={route.to.toString()} className="[&.active]:font-bold">
            <li className="py-0.5 text-blue-500 underline hover:text-xl">{route.to}</li>
        </Link>
    );
}

function RouteNavigation() {
    const router = useRouter();
    return (
        <div className={'fixed top-2 left-2 bottom-2 min-w-[12em] bg-gray-100 px-4 py-2'}>
            <h3 className="text-base">routes:</h3>
            <ul>{Array.isArray(router.routeTree.children) && router.routeTree.children.map((route: RouteType) => <RouteView key={route.id} route={route} />)}</ul>
        </div>
    );
}

function App() {
    const count = useAppStore((state) => state.count);
    const increment = useAppStore((state) => state.increment);
    const decrement = useAppStore((state) => state.decrement);
    return (
        <div className="flex">
            <RouteNavigation />
            <div className="flex-1 flex flex-col items-center card text-center gap-4">
                <div>Hello "/index.tsx"!</div>
                <div className={'text-left'}>
                    current env is: <pre>{JSON.stringify(import.meta.env, null, 4)}</pre>
                </div>
                <h3 className="text-2xl font-bold">count is {count}</h3>
                <div className={'flex gap-4'}>
                    <button className="button" onClick={() => increment()}>
                        increment
                    </button>
                    <button className="button" onClick={() => decrement()}>
                        decrement
                    </button>
                </div>
            </div>
        </div>
    );
}

function RouteComponent() {
    return <App />;
}
