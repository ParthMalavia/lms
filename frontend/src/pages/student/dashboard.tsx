import { Grid, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import DashboardCard from "../../components/dashboardcard";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HttpService from "../../service/Https-services";
import AuthContext, { ContextType } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/constants";
import { CourseType } from "../../utils/types";


function DashboardPage() {
	const [courses, setCourses] = useState<CourseType[] | null>(null);
	const { token }: ContextType = useContext(AuthContext) as ContextType;

	async function getStudentCourses() {
		return fetch(`${BASE_URL}student/view_contents`, {
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
	}

	useEffect(() => {
		getStudentCourses()
			.then((res) => res.json())
			.then((data) => setCourses(data));
	}, [])

	return (
		<>
			<Helmet>
				<title>Go-Canvas</title>
			</Helmet>
			{/* Dashboardpage-Start */}
			<div className="wrapper">
				<div
					className="overlay"
					onClick={(e) => document.body.classList.toggle("sidebar-open")}
				></div>
				<div
					className="search-overlay"
					onClick={(e) => document.body.classList.toggle("search-open")}
				></div>
				<Header></Header>
				<div className="main-background"></div>
				<main className="dashnoard-content">
					<div className="sidebar">
						<Sidebar></Sidebar>
					</div>
					<div className="main-content">
						<div className="main-title">
							<h5>Dashboard</h5>
							<h6>Go-Canvas</h6>
						</div>
						<Grid container spacing={3} className="grid-sections">
							<Grid
								item
								md={12}
								lg={12}
								spacing={3}
								container
								className="grid-section-1"
							>
								{courses && courses?.map((course) => (
												<Grid item sm={12} md={4} lg={4} className="courses-grid">
													<DashboardCard course={course}></DashboardCard>
												</Grid>

											))}
							</Grid>
						</Grid>
						<div className="dashboard-dropdown">
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1-content"
									id="panel1-header"
								>
									Previous Semesters
								</AccordionSummary>
								<AccordionDetails>
									<Grid container spacing={3} className="grid-sections">
										<Grid
											item
											md={12}
											lg={12}
											spacing={3}
											container
											className="grid-section-1"
										>
											{/* TODO: Add endpoint to prev year cources and add here as prev implementation */}
											<Grid item sm={12} md={4} lg={4} className="courses-grid">
												<DashboardCard course={{Courseid: "ID1", Coursename: "C1"}}></DashboardCard>
											</Grid>
										</Grid>
									</Grid>
								</AccordionDetails>
							</Accordion>
						</div>
					</div>
				</main>
			</div>
			{/* Dashboardpage-End */}
		</>
	);
}

export default DashboardPage;
