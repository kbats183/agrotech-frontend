import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {PureLink} from "./PureLink";
// import {useMemo} from "@types/react";
// import {getExamSubjectsByMask, ListOrSimpleText, PartHeader, RatingStar} from "./ProfessionCard";
// import {getExamSubjectsByMask, ListOrSimpleText, PartHeader, RatingStar} from "./ProfessionCard";

export const UniversityCard = ({
                                   id,
                                   name,
                                   address,
                                   image,
                                   is_favourite,
                                   changeRating,
                                   ...props
                               }) => {
    return (<Card sx={{display: "flex", my: 1, alignItems: "stretch"}} {...props}>
        <CardMedia sx={{width: 0.3, display: {xs: "none", sm: "block"}}} component="div" image={image}>
            <PureLink to={"/university/" + id} style={{display: "flex", width: "100%", height: "100%"}}/>
        </CardMedia>
        <Box sx={{display: "flex", width: {xs: 1, sm: 0.7}, flexDirection: "column"}}>
            <CardContent sx={{pl: 2}}>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <PureLink to={"/university/" + id}>
                        <Typography gutterBottom variant="h6" sx={{mb: 0, textDecoration: "underline"}}>
                            {name}
                        </Typography>
                    </PureLink>
                    {/*<RatingStar id={id} is_favourite={is_favourite} changeRating={changeRating}/>*/}
                </Box>

                <Typography gutterBottom variant="body1" sx={{mb: 0, textDecoration: "underline"}}>
                    {address}
                </Typography>
            </CardContent>
        </Box>
    </Card>);
};

export const UniversityInfo = ({name, address, image}) => {
    image = image ?? "https://www.sgau.ru/files/pages/42774/1578630426general_pages_10_january_2020_i42774_selskoxozyaistvennoe_predpr.jpg";

    return (<Box>
        <Box sx={{display: "flex", alignItems: "center", my: 1}}>
            <Typography gutterBottom variant="h4" sx={{
                mb: 0,
                display: "flex",
                width: 1,
                flexDirection: "column"
            }}>{name}</Typography>
            {/*<RatingStar id={id} is_favourite={is_favourite} changeRating={changeRating}/>*/}
        </Box>

        <Typography>
            {address}
        </Typography>

        <Box sx={{width: 1, my: 2, mt: 4}}>
            <img style={{width: "100%"}} src={image} alt={name}/>
        </Box>
    </Box>);
}
