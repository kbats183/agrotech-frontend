import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {PureLink} from "./PureLink";
import {getExamSubjectsByMask, ListOrSimpleText, PartHeader} from "./ProfessionCard";
import RatingStar from "./RatingStar";

export const StudyProgramCard = ({
                                     id,
                                     university_id,
                                     university_name,
                                     university_image,
                                     specialisation_name,
                                     exams,
                                     is_favourite,
                                     changeRating,
                                     ...props
                                 }) => {
    return (<Card sx={{display: "flex", my: 1, alignItems: "stretch"}} {...props}>
        <CardMedia sx={{width: 0.3, display: {xs: "none", sm: "block"}}} component="div" image={university_image}>
            <PureLink to={"/studyPrograms/" + id} style={{display: "flex", width: "100%", height: "100%"}}/>
        </CardMedia>
        <Box sx={{display: "flex", width: {xs: 1, sm: 0.7}, flexDirection: "column"}}>
            <CardContent sx={{pl: 2}}>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <Box sx={{mr: 1, width: 1}}>
                        <PureLink to={"/studyPrograms/" + id}>
                            <Typography gutterBottom variant="h6" sx={{mb: 0, textDecoration: "underline"}}>
                                {specialisation_name}
                            </Typography>
                        </PureLink>
                        <PureLink to={"/university/" + university_id}>
                            <Typography gutterBottom variant="body1" sx={{mb: 0, textDecoration: "underline"}}>
                                {university_name}
                            </Typography>
                        </PureLink>

                    </Box>
                    <RatingStar id={id} is_favourite={is_favourite} changeRating={changeRating} subjectName="программы"/>
                </Box>
                <Typography gutterBottom variant="body2" sx={{mt: 1}}>
                    Возможные наборы экзаменов:<br/>
                    {exams.map((e, index) => (<>
                        {getExamSubjectsByMask(e).join(" + ")}
                        {index + 1 < exams.length && <br/>}
                    </>))}
                </Typography>
            </CardContent>
        </Box>
    </Card>);
};

export const StudyProgramInfo = ({
                                     id,
                                     university_id,
                                     university_name,
                                     university_address,
                                     university_image,
                                     specialisation_name,
                                     specialisation_description,
                                     specialisation_disciplines,
                                     exams,
                                     score_budget,
                                     score_contract,
                                     contract_amount,
                                     is_favourite,
                                     changeRating,
                                     ...props
                                 }) => {
    return (<Box>
        <Box sx={{display: "flex", alignItems: "center", my: 1}}>
            <Typography gutterBottom variant="h5" sx={{
                mb: 0,
                display: "flex",
                width: "calc(100% - 40px)",
                flexDirection: "column"
            }}>{specialisation_name}</Typography>
            <RatingStar id={id} is_favourite={is_favourite} changeRating={changeRating} subjectName="программы"/>
        </Box>

        <Typography>{specialisation_description}</Typography>

        <Card sx={{display: "flex", alignItems: "center", my: 2, mb: 3}} {...props}>
            <PureLink to={"/profession/" + id} style={{display: "flex", width: "30%"}}>
                <CardMedia sx={{width: 1}} component="img" image={university_image}/>
            </PureLink>
            <Box sx={{display: "flex", width: 0.7, flexDirection: "column"}}>
                <CardContent sx={{pl: 2}}>
                    <PureLink to={"/university/" + university_id}>
                        <Typography gutterBottom variant="h6"
                                    sx={{mb: 0, textDecoration: "underline"}}>{university_name}</Typography>
                    </PureLink>
                    <Typography gutterBottom variant="caption">
                        {university_address}
                    </Typography>
                </CardContent>
            </Box>
        </Card>

        <PartHeader>Обязанности</PartHeader>
        <ListOrSimpleText content={specialisation_disciplines}/>

        <PartHeader>Условия поступления</PartHeader>
        <Typography>
            Минимальный балл ЕГЭ для поступления на бюджет: {score_budget}<br/>
            Минимальный балл ЕГЭ для поступления на котракт: {score_contract}<br/>
            Стоимость контрактного обучения: {score_contract}<br/>
        </Typography>
        <Typography sx={{mt: 1}}>
            Возможные наборы экзаменов:<br/>
            {exams.map((e, index) => (<Typography component="span" key={index}>
                {getExamSubjectsByMask(e).join(" + ")}
                {index + 1 < exams.length && <br/>}
            </Typography>))}
        </Typography>
    </Box>);
};
