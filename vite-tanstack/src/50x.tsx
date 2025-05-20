export default function Error(props: unknown) {
    if (import.meta.env.DEV) {
        console.log('src/50x.tsx', props);
    }
    return (
        <div>
            <p>50x error(src/50x.tsx)<span className={'text-blue-500'}>Go Home</span></p>
        </div>
    );
}
