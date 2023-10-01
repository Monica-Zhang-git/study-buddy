import * as React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import SchoolIcon from "@mui/icons-material/School";
import { blue } from "@mui/material/colors";

const tags = [
  {
    _id: "650ce2cd5d0a9f860bed72a8",
    courseNo: "COMPSCI 732",
    courseName: "Software Tools and Techniques",
    desc: "State-of-the-art software development, particularly in teams, requires the use of advanced tools to deliver high quality software across the many platforms that we encounter today.  It is characterized by a wide variety of techniques ranging from the formal to the informal, from automated to manual operations, and covering programs as well as data. In industry there is an increasing demand to apply recent research into software development tools. This course has a lecture component and a group project component which work together to give a broad picture of current software development and data management tool research. The group projects are often exploring a novel take on interesting problems and offer both an authentic application of software development practices and an opportunity to deliver an exciting result.",
    __v: 0,
  },
  {
    _id: "650ceb1fb9c4c592b39561f0",
    courseNo: "COMPSCI 711",
    courseName: "Parallel and Distributed Computing",
    desc: "Computer architectures and languages for exploring parallelism, conceptual models of parallelism, principles for programming in a parallel environment, different models to achieve interprocess communication, concurrency control, distributed algorithms and fault tolerance.",
    __v: 0,
  },
  {
    _id: "650ceb1fb9c4c592b39561f1",
    courseNo: "COMPSCI 705",
    courseName: "Advanced Topics in Human Computer Interaction",
    desc: "Human aspects of computer systems, relevant to commercial solution development and computer science research. Sample topics: advanced evaluation methods; support of pen and touch-based interaction; trends with domain specific user interface design, such as interfaces for enterprise systems. Recommended preparation: COMPSCI 345 or SOFTENG 350.",
    __v: 0,
  },
  {
    _id: "650ceb1fb9c4c592b39561f2",
    courseNo: "COMPSCI 715",
    courseName: "Advanced Computer Graphics",
    desc: "An advanced look at current research issues in computer graphics. Typical topics include: ray-tracing acceleration methods; radiosity; subdivision surfaces; physically-based modelling; animation; image-based lighting and rendering; non-photorealistic rendering; advanced texturing. The precise content may vary from year to year. Consult the department for details. Recommended preparation: COMPSCI 373 or equivalent, and 15 points at Stage II in Mathematics.",
    __v: 0,
  },
  {
    _id: "650ceb1fb9c4c592b39561f3",
    courseNo: "COMPSCI 717",
    courseName: "Fundamentals of Algorithmics",
    desc: "Fundamental techniques are covered for the design of algorithms such as greedy algorithms, divide-and-conquer, and dynamic programming. Data structures are explored that help implement algorithms. Essential tools are taught for analysing algorithms, for example worst- and average-case analyses of space and time. Recommended preparation: 15 points from COMPSCI 120 or equivalent and 15 points from COMPSCI 130 or equivalent",
    __v: 0,
  },
  {
    _id: "650ceb1fb9c4c592b39561f4",
    courseNo: "COMPSCI 718",
    courseName: "Programming for Industry",
    desc: "An examination of object-oriented programming and design. Key principles of object-oriented programming: typing, encapsulation, inheritance, polymorphism and composition. Fundamental object-oriented modelling and design techniques. Students will develop application software of reasonable complexity that draws on object-oriented language features, and contemporary APIs, frameworks and tools.",
    __v: 0,
  },
  {
    _id: "650ceb1fb9c4c592b39561f5",
    courseNo: "COMPSCI 719",
    courseName: "Programming with Web Technologies",
    desc: "An examination of developing web-based applications. Client-side technologies: HTML, CSS and Javascript. Server-side technologies to support dynamic Web pages and data access. Fundamental relational database concepts and design techniques. Principles of Web-application design. HCI considerations and mobile clients. Students will build a Web-based application that dynamically generates content involving relational database access.",
    __v: 0,
  },
  {
    _id: "650ceb1fb9c4c592b39561f6",
    courseNo: "COMPSCI 726",
    courseName: "Network Defence and Countermeasures",
    desc: "Focuses on the use and deployment of protective systems used in securing internal and external networks. Examines in detail the widely used protocols including SSL, IPSec, DNSSEC as well as covers infrastructure platform protocols including wireless security (IEEE 802.11). Explores current research and developments in the area of network defence and countermeasures. Recommended preparation: COMPSCI 314, 315",
    __v: 0,
  },
  {
    _id: "650ceb1fb9c4c592b39561f7",
    courseNo: "COMPSCI 747",
    courseName: "Computing Education",
    desc: "An overview of topics related to the use of technology in education and how people learn computer science concepts. Topics include research methodologies used in computer science education, how novices learn to program, and how technology can engage students in active learning, facilitate collaboration and enhance traditional educational practice. Recommended preparation: 30 points at Stage III in Computer Science.",
    __v: 0,
  },
];

export default function SimpleDialog(props) {
  const { onClose, selectedTags, open } = props;

  const handleClose = () => {
    onClose(selectedTags);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add Tags</DialogTitle>
      <List sx={{ pt: 0 }}>
        {tags.map((tag) => (
          <ListItem disableGutters key={tag._id}>
            <ListItemButton onClick={() => handleListItemClick(tag.courseNo)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "rgba(128, 149, 255, 0.25)", color: "#8095ff" }}>
                  <SchoolIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={tag.courseNo} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}