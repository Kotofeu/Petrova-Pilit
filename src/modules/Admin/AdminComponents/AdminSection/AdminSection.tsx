import React, { useRef } from 'react'
import Section from '../../../../components/Section/Section'

import classes from './AdminSection.module.scss'


interface IContent {
    title: string
    paragraph: string[]
}
const content: IContent[] = [
    {
        title: 'Основные настройки',
        paragraph: [
            'Социальные сети/адрес',
            'График работы',
            'Твои преимущества',
            'Ссылка на карту',
            'Видео как добраться',
        ]
    },
    {
        title: 'Главная страница',
        paragraph: [
            'Главный слайдер',
            'Услуги'
        ]
    },
    {
        title: 'Данные "Обо мне"',
        paragraph: [
            'Текст',
            'Фотографии мастерской',
        ]
    },
    {
        title: 'Блог',
        paragraph: [
            'Теги',
            'Блоги'
        ]
    }
]
export const AdminSection = () => {
    const sectionRefs = useRef<(HTMLDivElement | null)[][]>([]);

    const scrollToSection = (paragraph: number, subParagraph: number) => {
        const section = sectionRefs.current[paragraph][subParagraph];
        if (section) {
            const offset = 90;
            const top = section.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <Section className={classes.admin}>
            <div className={classes.admin__inner}>

            </div>
        </Section>
    )
}
