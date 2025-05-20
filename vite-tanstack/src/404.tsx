import { Link } from '@tanstack/react-router';

export default function NotFound() {
    return (
        <div>
            <p>
                404 Not Found(src/404.tsx){' '}
                <Link to="/">
                    <span className={'text-blue-500'}>Go Home</span>
                </Link>
            </p>
        </div>
    );
}
