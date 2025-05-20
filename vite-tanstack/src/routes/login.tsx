import { createFileRoute, useRouter } from '@tanstack/react-router';
import { FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { doLogin } from '@/apis';
import { useState } from 'react';

const loginSearchScheme = z.object({
    redirect: z.string().optional()
});

export type LoginSearchType = z.infer<typeof loginSearchScheme>;

export const Route = createFileRoute('/login')({
    validateSearch: loginSearchScheme,
    component: RouteComponent
});

const loginSchema = z.object({
    email: z.string().email('email is required'),
    password: z.string().min(6, 'minLength is 6')
});

type LoginFormType = z.infer<typeof loginSchema>;

function RouteComponent() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: 'example@mail.com',
            password: '123456'
        }
    });
    const context = Route.useRouteContext();
    const search = Route.useSearch();
    const navigate = Route.useNavigate();
    const user = useAuthStore((state) => state.user);
    const login = useAuthStore((state) => state.login);
    const [isLoading, setIsLoading] = useState(false);
    const mutation = useMutation({
        mutationFn: (args: LoginFormType) => {
            return doLogin({
                email: args.email,
                password: args.password
            });
        },
        onMutate: async (variables) => {
            console.log('onMutate', variables);
            setIsLoading(true);
        },
        onSuccess: async (result) => {
            console.log('onSuccess', result);
            await login(result);
            await router.invalidate();
            await context.queryClient.invalidateQueries({ queryKey: ['xxx'] });
            setIsLoading(false);
            if (search.redirect) {
                await navigate({
                    to: search.redirect,
                    replace: true
                });
            } else {
                await navigate({
                    to: '/',
                    replace: true
                });
            }
        },
        onError: async (error) => {
            console.log('onError', error);
            setIsLoading(false);
        }
    });
    const onSubmit = async (formData: LoginFormType) => {
        console.log('Form submitted:', formData);
        await mutation.mutateAsync(formData);
    };
    const onError = (errors: FieldErrors<LoginFormType>) => {
        console.warn('Form validation failed:', errors);
    };
    return (
        <div className={'p-8 bg-gray-100 shadow'}>
            <div>Hello "/user/login.tsx"!, user is {user ?? 'null'}</div>
            <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit, onError)} className={'flex flex-col gap-4'}>
                <div>
                    <label htmlFor="email">
                        email: <input type="text" {...register('email')} className={'border p-2'} />
                    </label>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="password">
                        password: <input type="password" {...register('password')} className={'border p-2'} />
                    </label>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
                <div>
                    <button className={'border border-blue-600 rounded-md px-4 py-2'}>{isLoading ? 'loading' : 'Login'}</button>
                </div>
            </form>
        </div>
    );
}
