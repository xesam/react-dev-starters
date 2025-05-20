import { create } from 'zustand/react';
import { createJSONStorage, persist } from 'zustand/middleware';

export type State = {
    count: number;
    increment: () => void;
    decrement: () => void;
};

export const useAppStore = create<State>()(
    persist(
        (set) => ({
            count: 0,
            increment: () => set((state) => ({ count: state.count + 1 })),
            decrement: () => set((state) => ({ count: state.count - 1 }))
        }),
        {
            name: 'vite-tanstack/app',
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export type AuthState = {
    token: string | null;
    user: string | null;
    login: ({ token, user }: { token: string; user: string }) => Promise<void>;
    logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            login: async ({ token, user }) => {
                set(() => ({ token: token, user: user }));
            },
            logout: async () => {
                set(() => ({ token: null, user: null }));
            }
        }),
        {
            name: 'vite-tanstack/auth',
            storage: createJSONStorage(() => localStorage)
        }
    )
);
