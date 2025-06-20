import React from "react";
import { Card, Avatar, Typography, Box, Grid, CircularProgress, Divider, Chip, Badge } from "@mui/material";
import { GoVerified } from "react-icons/go";
import { useSelector } from "react-redux";
import { SiReaddotcv } from "react-icons/si";
import { SpaceIcon } from "lucide-react";
import { MdLockReset } from "react-icons/md";
const Dashboard = () => {
  const user=useSelector((state)=>state.user.user)
  const stats=[
    {
      Icon:GoVerified,
      text:"email verified",
      color:"text-green-600",
    },
    {
      Icon:SiReaddotcv,
      text:"cv/resume submitted",
      color:"text-grey-600"
    },
    {
      Icon:MdLockReset,
      text:"password reset 2nd feb",
      cololr:"text-grey-600" 
    }
  ]
  console.log("hii")
  return (
    <Box sx={{ padding: 3, display: "flex", gap: 3 }} className="h-full w-full "
    style={{
      
    }}>
      {/* Left Profile Section */}
      <Card sx={{ width: 300, padding: 2 }}>
        <Avatar sx={{ width: 80, height: 80, margin: "auto" }} />
        <Typography variant="h6" align="center">{user.fullName}</Typography>

        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" className="text-center">Stats</Typography>
         <div className="flex-col">
          {/* break---- */}
          {

            stats.map(({Icon,text,color})=><span className="flex gap-4">
          <Icon className={`${color}`}/>
          <span>
            {text}
          </span>
          </span>)
          }
          {/* break--- */}
         </div>
        <Divider sx={{ my: 2 }} />
      </Card>

      {/* Main Stats Section */}
      <Box sx={{ flex: 1 }}>
        <Card sx={{ padding: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <CircularProgress variant="determinate" value={1} size={80} thickness={5} />
            <Typography align="center">1 / 3449 Solved</Typography>
          </Box>
          <Box>
            <Typography>Easy: 1/856</Typography>
            <Typography>Medium: 0/1795</Typography>
            <Typography>Hard: 0/798</Typography>
          </Box>
        </Card>
        <Card sx={{ padding: 3, mt: 2 }}>
          <Typography variant="h6">0 submissions in the past year</Typography>
        </Card>
        <Card sx={{ padding: 3, mt: 2 }}>
          <Typography variant="h6">Recent AC</Typography>
          <Typography>Linked List Cycle (11 years ago)</Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
