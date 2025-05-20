export type LoginDto = {
    email: string;
    password: string;
};

export type LoginResponse = {
    token: string;
    user: string;
};

export async function doLogin(dto: LoginDto) {
    console.log('doLogin', dto);
    return new Promise<LoginResponse>((resolve) => {
        setTimeout(() => {
            resolve({
                token: 'token123',
                user: 'user123'
            });
        }, 1000);
    });
}
