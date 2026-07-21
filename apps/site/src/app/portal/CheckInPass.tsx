"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "react-qr-code";

import axiosInstance from "@/lib/utils/axiosInstance";
import AddToGoogleWallet from "@/assets/images/add-to-google-wallet.svg";

import styles from "./CheckInPass.module.scss";

type CheckInPassProps = {
	uid: string;
};

interface WalletPassResponse {
	save_url?: string;
}

export default function CheckInPass({ uid }: CheckInPassProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// If the user navigates back from the Google Wallet save flow, the page
	// can be restored from the browser's back/forward cache with isLoading
	// still true (since we never reset it before the redirect). Reset it so
	// the button isn't stuck disabled.
	useEffect(() => {
		const handlePageShow = (event: PageTransitionEvent) => {
			if (event.persisted) {
				setIsLoading(false);
			}
		};

		window.addEventListener("pageshow", handlePageShow);
		return () => window.removeEventListener("pageshow", handlePageShow);
	}, []);

	const handleAddToWallet = async () => {
		setError(null);
		setIsLoading(true);

		try {
			const { data } = await axiosInstance.get<WalletPassResponse>(
				"/api/user/wallet/pass",
			);

			if (!data.save_url) {
				throw new Error("Missing save_url in response");
			}

			window.location.href = data.save_url;
		} catch (err) {
			console.error("Failed to create Google Wallet pass", err);
			setError(
				"Couldn't create your Google Wallet pass. Please try again later.",
			);
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>Check-In QR Code</h2>
			<div className={styles.qrWrapper}>
				<QRCode
					value={uid}
					className={styles.qrCode}
					title="Check-in QR code"
				/>
			</div>
			<button
				type="button"
				className={styles.walletButton}
				onClick={handleAddToWallet}
				disabled={isLoading}
				aria-label="Add to Google Wallet"
			>
				<Image src={AddToGoogleWallet} alt="Add to Google Wallet" priority />
			</button>
			{isLoading && (
				<p className={styles.status} role="status">
					Opening Google Wallet...
				</p>
			)}
			{error && (
				<p className={styles.error} role="alert">
					{error}
				</p>
			)}
		</div>
	);
}
