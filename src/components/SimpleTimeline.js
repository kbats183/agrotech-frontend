import TimelineItem from "@mui/lab/TimelineItem";
import {TimelineOppositeContent} from "@mui/lab";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import Timeline from "@mui/lab/Timeline";

const SimpleTimeline = ({withIcon, elements}) =>
    (<Timeline position="right" style={{marginTop: 0}}>
        {elements.map((el, index) => <TimelineItem key={index}>
            <TimelineOppositeContent style={{flex: 0, padding: 0}}/>
            <TimelineSeparator>
                <TimelineDot children={withIcon ? el.icon : undefined} color="primary" variant="outlined"/>
                {index + 1 < elements.length && <TimelineConnector sx={{ bgcolor: 'primary.main' }} />}
            </TimelineSeparator>
            <TimelineContent sx={withIcon ? { py: '18px', px: 2 } : undefined}>
                {!withIcon && el}
                {withIcon && el.text}
            </TimelineContent>
        </TimelineItem>)}
    </Timeline>);

export default SimpleTimeline;
