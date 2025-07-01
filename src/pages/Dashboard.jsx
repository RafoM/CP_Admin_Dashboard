import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const stats = [
  { title: 'Users', value: 125 },
  { title: 'Payments', value: '$5,300' },
  { title: 'Referrals', value: 34 },
];

const Dashboard = () => (
  <>
    <Typography variant="h4" gutterBottom>Dashboard</Typography>
    <Grid container spacing={2}>
      {stats.map(({ title, value }) => (
        <Grid item xs={12} md={4} key={title}>
          <Card>
            <CardContent>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="h4">{value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </>
);

export default Dashboard;
