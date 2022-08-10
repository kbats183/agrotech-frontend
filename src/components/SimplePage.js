import {Typography} from "@mui/material";

const SimplePage = ({title, children, ...props}) => {
    return (<div {...props}>
        <Typography variant="h2" sx={{mb: 2}}>
            {title}
        </Typography>
        {children}
    </div>);
};

export default SimplePage;
