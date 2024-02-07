import { Button, Card, CardContent, Grid, Typography } from '@mui/joy'
import React from 'react'
import {FaFileExcel, FaTable} from "react-icons/fa"
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
  return (
    <div>
        <Typography level="h2">Home</Typography>

        <Grid container sx={{width:"100%"}} spacing={2} mt={2}>
            <Grid item xs={12} lg={3}>
                <Card>
                    <CardContent>
                        <Typography level="h4">Attenee List</Typography>
                        {/* <Button startDecorator={<FaFileExcel />}>Export</Button> */}
                        <Button startDecorator={<FaTable />} variant='outlined' onClick={()=>navigate("/attendees")}>View</Button>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} lg={3}>
                <Card>
                    <CardContent>
                        <Typography level="h4">Exhibitors' List</Typography>
                        {/* <Button startDecorator={<FaFileExcel />}>Export</Button> */}
                        <Button startDecorator={<FaTable />} variant='outlined' onClick={()=>navigate("/exhibitors")}>View</Button>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} lg={3}>
                <Card>
                    <CardContent>
                        <Typography level="h4">Sponsorship' List</Typography>
                        {/* <Button startDecorator={<FaFileExcel />}>Export</Button> */}
                        <Button startDecorator={<FaTable />} variant='outlined' onClick={()=>navigate("/sponsorships")}>View</Button>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} lg={3}>
                <Card>
                    <CardContent>
                        <Typography level="h4">Volunteer List</Typography>
                        {/* <Button startDecorator={<FaFileExcel />}>Export</Button> */}
                        <Button startDecorator={<FaTable />} variant='outlined' onClick={()=>navigate("/volunteers")}>View</Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </div>
  )
}

export default Home