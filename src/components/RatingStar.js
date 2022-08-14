import {useContext, useState} from "react";
import AccountContext from "../service/accounts";
import {Box, Popover, Rating, Typography} from "@mui/material";

export const RatingStar = ({id, is_favourite, changeRating, subjectName}) => {
    const [loginSuggestionAnchor, setLoginSuggestionAnchor] = useState();
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
            <Typography sx={{p: 2}}>Войдите в профиль или зарегистрируйтесь, чтобы отмечать понравившиеся
                {subjectName}</Typography>
        </Popover>
    </Box>);
}

export default RatingStar;
