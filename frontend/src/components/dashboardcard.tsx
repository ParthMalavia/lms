import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { CourseType } from '../utils/types';

export default function DashboardCard({ course }: { course: CourseType }) {
	return (
		<Card sx={{ maxWidth: 345 }} className='course-card'>
			<CardActionArea>
				<CardContent component={Link} to="/test">
					<Typography gutterBottom variant="h6" component="div">
						{course.Courseid}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{course.Coursename}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary" component={Link} to="/test">
					View Content
				</Button>
			</CardActions>
		</Card>
	);
}