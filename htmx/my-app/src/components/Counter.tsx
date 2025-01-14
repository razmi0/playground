let count = 0;

const Button = ({
    children,
    add,
    hxPath,
    target,
}: {
    children: string;
    add: number;
    hxPath: string;
    target: string;
}) => {
    return (
        <button
            class="rounded-lg px-3 py-1 ring-1 ring-stone-500"
            hx-trigger="click"
            hx-get={`${hxPath}/${add}`}
            hx-target={target}
            hx-swap="outerHTML">
            {children}
        </button>
    );
};

const Counter = ({ add, hxPath, id }: { add?: number; hxPath: string; id: string }) => {
    count += add || 0;
    return (
        <section id={id}>
            <div class="flex flex-row justify-between items-center mb-2">
                <h3>Counter</h3>
                <span class="font-bold">{count}</span>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <Button hxPath={hxPath} target={`section#${id}`} add={1}>
                    Increment
                </Button>
                <Button hxPath={hxPath} target={`section#${id}`} add={-1}>
                    Decrement
                </Button>
            </div>
        </section>
    );
};

export default Counter;
