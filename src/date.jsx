import { useEffect, useReducer, useState } from "react";
import Todo from "./todo.jsx";
import { useTodoContext } from "./todoContext.jsx";

export default function Date() {

    const { Date_, time } = useTodoContext();
    return (
        <>
        <div>
            <p>{Date_.day}/{Date_.month}/{Date_.year}</p>
            <p>{time.hours}:{time.minutes}:{time.seconds}</p>
        </div>
        </>

    );




}