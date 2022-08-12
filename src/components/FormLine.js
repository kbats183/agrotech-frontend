import {Box} from "@mui/material";
import PropTypes from "prop-types";

const FormLine = ({children, ...props}) =>
    (<Box sx={{maxWidth: 500, my: 2, ...props}}>
        {children}
    </Box>);
FormLine.propTypes = {
    children: PropTypes.node
};

export default FormLine;
