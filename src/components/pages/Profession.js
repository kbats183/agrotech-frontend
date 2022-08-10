import SimplePage from "../SimplePage";
import {ProfessionCard} from "../ProfessionCard";
import {useParams} from "react-router-dom";
import {professions} from "./Professions";

export default function Profession() {
    let {id} = useParams();
    return (<SimplePage title="Професия">
        <ProfessionCard {...professions.find(profession => profession.id === id)}/>
    </SimplePage>);
}
