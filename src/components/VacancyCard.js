import {Box, Card, CardContent, CardMedia, Link, Typography} from "@mui/material";
import {getRegionByID} from "../service/regions";

export const VacancyCard = ({
                                id,
                                name,
                                area,
                                employer,
                                employer_url,
                                employer_image,
                                responsibility,
                                url,
                                is_favourite,
                                changeRating,
                                ...props
                            }) => {
    name = name ?? "Агроном по агрохимии";
    area = area ?? "Москва";
    url = url ?? "https://hh.ru/employer/1197490";
    employer = employer ?? "Агрокомплекс Иванисово";
    employer_url = employer_url ?? "https://hh.ru/employer/1197490";
    employer_image = employer_image ?? "https://hhcdn.ru/employer-logo-original/647019.jpg"
    responsibility = responsibility ?? "Все виды работ на объектах по уходу за плодовыми, хвойными, декоративно-лиственными, кустарниковыми и цветочными насаждениями. Посадка и пересадка растений."
    return (<Card sx={{display: "flex", my: 1, alignItems: "stretch"}} {...props}>
        <CardMedia sx={{width: 0.3, display: {xs: "none", sm: "block"}, minHeight: 150}} component="div" image={employer_image}>
            <Link href={url} color="inherit" style={{display: "flex", width: "100%", height: "100%"}}/>
        </CardMedia>
        <Box sx={{display: "flex", width: {xs: 1, sm: 0.7}, flexDirection: "column"}}>
            <CardContent sx={{pl: 2}}>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <Link href={url} color="inherit">
                        <Typography gutterBottom variant="h6" sx={{mb: 0, textDecoration: "underline"}}>
                            {name}
                        </Typography>
                    </Link>
                    {/*<RatingStar id={id} is_favourite={is_favourite} changeRating={changeRating}/>*/}
                </Box>

                <Box>
                    <Link href={employer_url} color="inherit">
                        <Typography gutterBottom variant="body1" sx={{mb: 0, textDecoration: "underline"}}
                                    component={"span"}>
                            {employer}
                        </Typography>
                    </Link>
                    {getRegionByID(area) !== undefined && " · " + getRegionByID(area)}
                </Box>

                <Typography gutterBottom variant="title" sx={{mb: 0}}>
                    {responsibility}
                </Typography>
            </CardContent>
        </Box>
    </Card>);
};
