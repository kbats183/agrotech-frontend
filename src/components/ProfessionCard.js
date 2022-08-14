import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {PureLink} from "./PureLink";
import {useMemo} from "react";
import RatingStar from "./RatingStar";

const examSubjects = ["Русский язык", "Математика профильная", "Физика", "Информатика", "Биология", "Химия", "География", "Обществознание"];
export const getExamSubjectsByMask = (mask) => {
    const subjects = [];
    let bit = 1;
    for (const examSubject of examSubjects) {
        if ((bit & mask) > 0) {
            subjects.push(examSubject);
        }
        bit *= 2;
    }
    return subjects;
}

const SHORT_DESCRIPTION_MAX_LENGTH = 350;
const cutBySuggestions = (text) => {
    const suggestions = text.split(".");
    let current_text = "";
    for (let suggestion of suggestions) {
        if (suggestion.length === 0) {
            continue;
        }
        if (!suggestion.endsWith(".")) {
            suggestion += ".";
        }
        if ((current_text + suggestion).length <= SHORT_DESCRIPTION_MAX_LENGTH) {
            current_text += suggestion;
        } else {
            break;
        }
    }
    if (current_text.length === 0 && suggestions.length > 0) {
        current_text = suggestions[0];
    }
    return current_text;
}

export const ProfessionSmallCard = ({
                                        id,
                                        image,
                                        name,
                                        description,
                                        short_description,
                                        is_favourite,
                                        changeRating,
                                        ...props
                                    }) => {
    return (<Card sx={{display: "flex", alignItems: "stretch", my: 1}} {...props}>
        <CardMedia sx={{width: 0.3, display: {xs: "none", sm: "block"}}} component="div" image={image}>
            <PureLink to={"/profession/" + id} style={{display: "flex", width: "100%", height: "100%"}}/>
        </CardMedia>
        <Box sx={{display: "flex", width: {xs: 1, sm: 0.7}, flexDirection: "column"}}>
            <CardContent sx={{pl: 2}}>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{mr: 1, width: 1}}>
                        <PureLink to={"/profession/" + id}>
                            <Typography gutterBottom variant="h6" sx={{mb: 0, textDecoration: "underline"}}>
                                {name}
                            </Typography>
                        </PureLink>
                        <PureLink to={"/studyPrograms/profession/" + id}>
                            <Typography gutterBottom variant="body2" sx={{mb: 0, textDecoration: "underline"}}>
                                Где учиться?
                            </Typography>
                        </PureLink>
                    </Box>
                    <RatingStar id={id} is_favourite={is_favourite} changeRating={changeRating}
                                subjectName="профессии"/>
                </Box>
                <Typography gutterBottom variant="caption">
                    {short_description ? short_description : cutBySuggestions(description)}
                </Typography>
            </CardContent>
        </Box>
    </Card>);
};

export const PartHeader = ({children}) =>
    (<Typography variant="h5" sx={{mt: 2}}>{children}</Typography>);

export const ListOrSimpleText = ({content}) => {
    const elements = Array.isArray(content) ? content : content.split("\n");
    if (elements.length === 1) {
        return (<Typography>{content}</Typography>);
    }
    return (<ul style={{marginTop: 0, marginBottom: 0}}>
        {elements.map((e, index) => <li key={index}>{e}</li>)}
    </ul>);
}

export const ProfessionInfo = ({
                                   id,
                                   name,
                                   description,
                                   tasks,
                                   required_skills,
                                   relevance,
                                   image,
                                   studyPrograms,
                                   is_favourite,
                                   changeRating
                               }) => {
    image = image ?? "https://www.sgau.ru/files/pages/42774/1578630426general_pages_10_january_2020_i42774_selskoxozyaistvennoe_predpr.jpg";

    const [examSubjects, universityWithPrograms] = useMemo(() => {
        const subjects = new Map();
        studyPrograms?.forEach(p => p.exams.forEach(m => getExamSubjectsByMask(m)
            .forEach(e => subjects.set(e, (subjects.get(e) ?? 0) + 1))));
        const university = new Map();
        studyPrograms?.map(p => p.university_name)?.forEach(e => university.set(e, (university.get(e) ?? 0) + 1));
        return [
            Array.from(subjects).sort(([, x], [, y]) => y - x).map(([x,]) => x),
            Array.from(university).sort(([, x], [, y]) => y - x).map(([x,]) => x),
        ];
    }, [studyPrograms]);

    return (<Box>
        <Box sx={{display: "flex", alignItems: "center", my: 1}}>
            <Typography gutterBottom variant="h4" sx={{
                mb: 0,
                display: "flex",
                width: "calc(100% - 40px)",
                flexDirection: "column"
            }}>{name}</Typography>
            <RatingStar id={id} is_favourite={is_favourite} changeRating={changeRating} subjectName="профессии"/>
        </Box>

        <Typography>
            {description}
        </Typography>

        {examSubjects?.length > 0 && <>
            <PartHeader>Предметы в школе, с которыми связана профессия</PartHeader>
            <ListOrSimpleText content={examSubjects}/>
        </>}

        {universityWithPrograms?.length > 0 && <>
            <PartHeader>Университеты, в которых можно получить такую специальность</PartHeader>
            <ListOrSimpleText content={universityWithPrograms}/>
        </>}

        <Box sx={{width: 1, my: 2, mt: 4}}>
            <img style={{width: "100%"}} src={image} alt={name}/>
        </Box>

        <PartHeader>Обязанности</PartHeader>
        <ListOrSimpleText content={tasks}/>

        <PartHeader>Необходимые навыки</PartHeader>
        <ListOrSimpleText content={required_skills}/>

        {relevance && <PartHeader>Востребованность</PartHeader>}
        {relevance && <ListOrSimpleText content={relevance}/>}
    </Box>);
}
