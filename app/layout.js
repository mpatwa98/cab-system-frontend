import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { CabProvider } from "@/context/cabContext";
import { UserProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Cab Booking System",
	description: "Cab Booking System",
};

export default function RootLayout({ children }) {
	return (
		<UserProvider>
			<CabProvider>
				<html lang="en">
					<body className={inter.className}>
						<Header />
						{children}
					</body>
				</html>
			</CabProvider>
		</UserProvider>
	);
}
