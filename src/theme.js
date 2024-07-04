import { createTheme } from "@mui/material";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import HistoryIcon from '@mui/icons-material/History';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  colors: {
    primary: "#2196F3",
    secondry:'#bcdefb',
    pendingColor: "#a0f7a6",
    approveColor:'#3ee89b',
    rejectColor:'#f99f3e',
    typeColor:'#9aef94',
    red:'#f96461'
 },
  icons: {
    pendingLeaves: <PendingActionsIcon />,
    leaveHistory: <HistoryIcon />,
    availableLeaveCount: <EventAvailableIcon />,
    totalLeaveCount: <FormatListNumberedIcon />,
    user: <PersonIcon />,
    users: <GroupIcon />,
    leaveType: <CategoryIcon />,
  },
});

export default theme;