let count = 0;

const Button = ({ children, add }: { children: string; add: number }) => {
    return (
        <button
            class="rounded-lg px-3 py-1 ring-1 ring-stone-500"
            hx-get={`/hx/counter/${add}`}
            hx-target="#counter"
            hx-swap="outerHTML">
            {children}
        </button>
    );
};

const Counter = ({ add }: { add: number }) => {
    count += add;
    return (
        <section id="counter">
            <h1>Counter</h1>
            <p class="font-bold">{count}</p>
            <Button add={1}>Increment</Button>
            <Button add={-1}>Decrement</Button>
        </section>
    );
};

export default Counter;
