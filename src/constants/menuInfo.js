import {
  BsCalendar2WeekFill,
  BsFillChatDotsFill,
  BsFillCloudsFill,
  BsGearFill,
} from "react-icons/bs";
import { FaHome } from "react-icons/fa";

const menuInfo = [
  {
    src: <BsGearFill />,
    name: "preference"
  },
  {
    src: <BsFillCloudsFill />,
    name: "weather"
  },
  {
    src: <FaHome />,
    name: "main"
  },
  {
    src: <BsFillChatDotsFill />,
    name: "chat"
  },
  {
    src: <BsCalendar2WeekFill />,
    name: "calendar"
  }
];

export default menuInfo;
