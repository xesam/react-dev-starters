import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import DefaultNotFoundComponent from '@/404';
import DefaultErrorComponent from '@/50x';
import './global.css';
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
    routeTree,
    defaultNotFoundComponent: DefaultNotFoundComponent,
    defaultErrorComponent: DefaultErrorComponent,
    context: {
        queryClient
    }
}); //Using File-Based Route Generation

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </StrictMode>
    );
} else {
    console.log('Root element already exists');
}
