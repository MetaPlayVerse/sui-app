import Header from "../components/Header";
import Navbar from "../components/navigation/navbar";

export default function MainLayout({ children }) {
	return (
		<div className="">
			<Header />
			{children}
		</div>
	);
}
