// @ts-types="@types/react"
// @ts-types="@types/react-dom"
// @ts-types="@types/node"
// @ts-types="@types/react-transition-group"
import { useActionState, useRef } from "react";
import { ButtonForm } from "./ButtonForm.tsx";

type User = {
    id?: number | string;
    username: string;
    age: number;
};

const getUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
};

const createUser = async (user: User) => {
    await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
};

export const FormActionTest = () => {
    const formref = useRef(null);
    const [users, action, isPending] = useActionState(
        async (oldState, payload) => {
            await createUser(payload);
            const users = await getUsers();
            return users;
        },
        [{}]
    );

    return (
        <>
            {isPending && <p>loading...</p>}
            <form
                ref={formref}
                action={action}
                className="flex flex-col gap-3 [&>input]:max-w-[25%] [&>input]:text-black justify-center items-center">
                <input type="text" id="username" name="username" placeholder="username" aria-label="username" />
                <input type="text" id="age" name="age" placeholder="age" aria-label="age" />
                <ButtonForm />
            </form>
            <div className="flex flex-col">
                {users.map((user) => (
                    <div key={user.username} className="flex gap-2">
                        <p> name : {user.username}</p>
                        <p> id : {user.id || 0}</p>
                        <p> age : {user.age}</p>
                    </div>
                ))}
            </div>
        </>
    );
};
