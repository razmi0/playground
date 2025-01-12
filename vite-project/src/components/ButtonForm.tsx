import { useFormStatus } from "react-dom";

export const ButtonForm = () => {
    const { pending } = useFormStatus();
    return (
        <button disabled={pending} className="disabled:bg-red-400">
            {pending ? "Saving..." : "Save"}
        </button>
    );
};
