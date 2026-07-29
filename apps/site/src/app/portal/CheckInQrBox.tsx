"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "react-qr-code";

import AddToGoogleWallet from "@/assets/images/add-to-google-wallet.svg";
import slidePeter from "@/assets/images/slide_peter.svg";
import axiosInstance from "@/lib/utils/axiosInstance";

import styles from "./PortalDashboard.module.scss";

type CheckInQrBoxProps = {
	uid: string;
};

interface WalletPassResponse {
	save_url?: string;
}

export default function CheckInQrBox({ uid }: CheckInQrBoxProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

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
		<section className={styles.checkInHero}>
			<div className={styles.checkInMedia}>
				<div className={styles.checkInQrColumn}>
					<QRCode
						value={uid}
						className={styles.heroQrCode}
						title="Check-in QR code"
					/>
					<button
						type="button"
						className={styles.walletButton}
						onClick={handleAddToWallet}
						disabled={isLoading}
						aria-label="Add to Google Wallet"
					>
						<Image
							src={AddToGoogleWallet}
							alt="Add to Google Wallet"
							className={styles.walletImage}
							priority
						/>
					</button>
				</div>
				<Image src={slidePeter} alt="" className={styles.checkInPeter} />
			</div>
			<p className={styles.checkInInstruction}>
				Use this QR code to check-in with our staff
			</p>
			{isLoading && (
				<p className={styles.walletStatus} role="status">
					Opening Google Wallet...
				</p>
			)}
			{error && (
				<p className={styles.walletError} role="alert">
					{error}
				</p>
			)}
		</section>
	);
}
