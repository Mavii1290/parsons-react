import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { GymDesigner } from "../../GymDesigner/GymDesigner";
import styles from "./GymDesignerPage.module.css";

const GymDesignerPage = () => {
	return (
		<div className={styles.pageContainer}>
			<div className={styles.pageHeader}>
				<Link to="/" className={styles.backButton}>
					<FaArrowLeft /> Back to Home
				</Link>
				<div className={styles.pageTitle}>
					<h1>Gym Floor Designer</h1>
					<p>Create professional gym floor designs with our interactive tool</p>
				</div>
			</div>

			<div className={styles.designerWrapper}>
				<GymDesigner />
			</div>
		</div>
	);
};

export default GymDesignerPage;
