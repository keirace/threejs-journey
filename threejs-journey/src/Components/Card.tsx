import React from "react";
import { content } from "../assets/Content";
import CardLessons from "./CardLessons";

const Card: React.FC = () => {
    return (
        <div className="card grid md:grid-cols-2 min-w-3.5">
            {
                content.map((element, i) => (
                    <div key={i} className={`card rounded-2xl bg-gradient-to-tl from-indigo-950 from-50% to-lesson-${i + 1}/30 start p-8 m-5 shadow-lg hover:shadow-2xl hover:scale-105 transition-all shadow-black/20 border-white/10 border-solid border`}>
                        <h2 className="text-2xl mb-4 font-extrabold">{`0${i + 1} ` + element.title}</h2>
                        <ul className="border-y border-dashed divide-y divide-dashed divide-indigo-400/20 border-indigo-400/20">
                            {element.lessons.map(lesson => (
                                CardLessons({ chapter: i, title: lesson.title, url: lesson.url, lesson: lesson.lesson, className:`font-bold mr-3 text-lesson-${i + 1}` })
                            ))}
                        </ul>
                    </div>
                ))
            }
        </div>
    );
}
export default Card;