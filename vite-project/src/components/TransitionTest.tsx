import { Dispatch, useState, useTransition } from "react";

const fetchPost = async (id: string, delay = 2000) => {
    const response = await fetch(`https://dummyjson.com/posts/${id}?delay=${delay}`);
    const data = await response.json();
    return data;
};

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

const arr = ["10", "20", "30", "40", "50", "60", "70", "80", "90"];

export const TransitionTest = () => {
    const [count, setCount] = useState(0);
    const [posts, setPosts] = useState<Post[]>([]);
    return (
        <>
            <div className="grid grid-cols-3 mx-auto w-fit gap-2">
                {arr.map((_) => (
                    <Button key={_} setPosts={setPosts} id={_} />
                ))}
            </div>{" "}
            <button
                className="rounded-lg ring-2 ring-slate-500 bg-slate-600 px-3 py-1 text-white/80 my-2"
                onClick={() => setCount((p) => p + 1)}>
                increment {count}
            </button>
            <div>
                {posts.length > 0 &&
                    posts.map((post) => (
                        <div key={post.id}>
                            <p className="text-white"> {post.title}</p>
                        </div>
                    ))}
            </div>
        </>
    );
};

const Button = ({ id, setPosts }: { id: string; setPosts: Dispatch<React.SetStateAction<Post[]>> }) => {
    const [isPending, startTransition] = useTransition();
    return (
        <button
            className="h-10 px-3 py-1 w-fit bg-blue-500 text-white rounded-md"
            onClick={() =>
                startTransition(() => {
                    return new Promise<void>((resolve) => {
                        startTransition(async () => {
                            const res = await fetchPost(id);
                            setPosts((prev) => [...prev, res]);
                            resolve();
                        });
                    });
                })
            }>
            {isPending ? "Loading..." : "Fetch post : " + id}
        </button>
    );
};
