import {Box, Card, CardContent, CardMedia, Rating, Typography} from "@mui/material";
import {PureLink} from "./PureLink";

export const ProfessionCard = ({id, image, name, description, ...props}) => {
    return (<Card sx={{display: "flex", alignItems: "center", my: 1}} {...props}>
        <CardMedia sx={{display: "flex", width: 0.3}} component="img"
                   image={image}/>
        <Box sx={{display: "flex", width: "calc(70% - 40px)", flexDirection: "column"}}>
            <CardContent sx={{pl: 2}}>
                <PureLink to={"/profession/" + id}><Typography gutterBottom variant="h6" sx={{mb: 0}}>{name}</Typography></PureLink>
                <Typography gutterBottom variant="caption">{description}</Typography>
            </CardContent>
        </Box>
        <Box sx={{display: "flex", width: 40, flexDirection: "column"}}>
            <Rating name="customized-10" defaultValue={0} max={1} />
        </Box>
    </Card>);
};
