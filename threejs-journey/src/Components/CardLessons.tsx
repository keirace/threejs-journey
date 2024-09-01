import React from "react";

type Props = {
    chapter: number,
    lesson: number,
    title: string;
    url: string,
    className: string
};

const CardLessons: React.FC<Props> = (props: Props) => {
    
    return (
        <li key={props.lesson} className="text-left p-3 hover:bg-gradient-to-r from-transparent via-indigo-900/50 via-10% to-transparent">
            <a className={`hover:text-white ${props.url === "" ? "pointer-events-none text-gray-400" : ''}`} href={props.url} target="_blank">
                <span className={props.className}>{props.lesson}</span> {props.title}
            </a>
        </li>
    )
}

export default CardLessons;