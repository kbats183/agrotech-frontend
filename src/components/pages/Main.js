import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import SimplePage from "../SimplePage";

export default function Main() {
    return (<SimplePage>
        <Timeline position="alternate">
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    Школьник старших класссов
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot/>
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent>Развивай свои навыки и способности</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    Выпускник школы
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot/>
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent>Выбери подходящую профессию</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                    Студент
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot/>
                </TimelineSeparator>
                <TimelineContent>Учись и проходи практику у потенциальных работодателей</TimelineContent>
            </TimelineItem>
        </Timeline>
    </SimplePage>);
}
