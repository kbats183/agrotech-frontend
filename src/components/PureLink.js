import {Link} from "react-router-dom";

export const PureLink = ({to, children, ...props}) =>
    (<Link to={to} style={{...(props.style ?? {}), textDecoration: "none", color: "inherit"}}>{children}</Link>);
