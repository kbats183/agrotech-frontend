import {Box, Card, CardContent, CardMedia, Popover, Rating, Typography} from "@mui/material";
import {PureLink} from "./PureLink";
import AccountContext from "../service/accounts";
import {useContext, useState} from "react";

const RatingStar = ({id, is_favourite, changeRating}) => {
    const [loginSuggestionAnchor,setLoginSuggestionAnchor] = useState();
    const loginSuggestionId = loginSuggestionAnchor ? 'login-suggestion-popover' : undefined;
    const account = useContext(AccountContext);
    const onChangeRating = (e, newValue) => {
        if (account.account === undefined) {
            setLoginSuggestionAnchor(e.target);
            return;
        }
        changeRating(id, newValue);
    };
    return (<Box sx={{display: "flex", width: 40, flexDirection: "column"}}>
        <Rating value={is_favourite ? 1 : 0} max={1} onChange={onChangeRating} aria-describedby={loginSuggestionId}/>
        <Popover
            id={loginSuggestionId}
            open={Boolean(loginSuggestionAnchor)}
            anchorEl={loginSuggestionAnchor}
            onClose={() => setLoginSuggestionAnchor(undefined)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        >
            <Typography sx={{ p: 2 }}>Войдите в профиль или зарегистрируйтесь, чтобы отмечать понравившиеся професии</Typography>
        </Popover>
    </Box>);
}


const SHORT_DESCRIPTION_MAX_LENGTH = 320;
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
    return (<Card sx={{display: "flex", alignItems: "center", my: 1}} {...props}>
        <PureLink to={"/profession/" + id} style={{display: "flex", width: "30%"}}>
            <CardMedia sx={{width: 1}} component="img" image={image}/>
        </PureLink>
        <Box sx={{display: "flex", width: "calc(70% - 40px)", flexDirection: "column"}}>
            <CardContent sx={{pl: 2}}>
                <PureLink to={"/profession/" + id}><Typography gutterBottom variant="h6"
                                                               sx={{mb: 0}}>{name}</Typography></PureLink>
                <Typography gutterBottom variant="caption">
                    {short_description ? short_description : cutBySuggestions(description)}
                </Typography>
            </CardContent>
        </Box>
        <RatingStar id={id} is_favourite={is_favourite} changeRating={changeRating}/>
    </Card>);
};

const PartHeader = ({children}) =>
    (<Typography variant="h5" sx={{mt: 2}}>{children}</Typography>);

const ListOrSimpleText = ({content}) => {
    const elements = content.split("\n");
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
                                   is_favourite,
                                   changeRating
                               }) => {
    image = image ?? "https://www.sgau.ru/files/pages/42774/1578630426general_pages_10_january_2020_i42774_selskoxozyaistvennoe_predpr.jpg";
    return (<Box>
        <Box sx={{display: "flex", alignItems: "center", my: 1}}>
            {/*<Box sx={{}}>*/}
            <Typography gutterBottom variant="h3" sx={{
                mb: 0,
                display: "flex",
                width: "calc(100% - 40px)",
                flexDirection: "column"
            }}>{name}</Typography>
            <RatingStar id={id} is_favourite={is_favourite} changeRating={changeRating}/>
        </Box>

        <Typography>
            {description}
        </Typography>

        <Box sx={{width: 1, my: 1}}>
            <img style={{width: "100%"}} src={image}/>
        </Box>

        <PartHeader>Обязанности</PartHeader>
        <ListOrSimpleText content={tasks}/>

        <PartHeader>Необходимые навыки</PartHeader>
        <ListOrSimpleText content={required_skills}/>

        {relevance && <PartHeader>Востребованность</PartHeader>}
        {relevance && <ListOrSimpleText content={relevance}/>}
    </Box>);
}
