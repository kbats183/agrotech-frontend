import SimplePage from "../SimplePage";
import {ProfessionCard} from "../ProfessionCard";

export const professions = [
    {id: "1", name: "Агроном", description: "Cпециалист, который работает с растениями. Основная цель его работы – получение максимально возможного урожая при минимальных ресурсных затратах.", image: "https://www.sgau.ru/files/pages/42774/1578630426general_pages_10_january_2020_i42774_selskoxozyaistvennoe_predpr.jpg"},
    {id: "2", name: "Птицевод", description: "Птицевод обладает знаниями по успешному разведению птиц, обеспечивает получение здорового поголовья, разрабатывает рацион кормления, проводит необходимые санитарные мероприятия, обеспечивает нормальные условия содержания и размножения птичьего поголовья.", image: "https://ecochicken.ru/files/news/40/post_5d44984ce2b95.jpg"},
    {id: "3", name: "Тракторист", description: "Оператор тяжелой техники, трактора, который воздействует на его рабочие органы, управляет его движением и различным навесным оборудованием. Тракторист может работать на колесной и гусеничной техникой.", image: "https://rabotavidan.com/media/com_mtree/images/listings/o/23.jpg"},
];

export default function Professions() {
    return (<SimplePage title="Каталог профессий">
        {professions.map(profession => <ProfessionCard key={profession.id} {...profession}/>)}
    </SimplePage>);
}
