import { RegisterModal } from "./components/MultiPurpose/Modals/RegisterModal";
import { LoginModal } from "./components/MultiPurpose/Modals/LoginModal";
import { Navbar } from "./components/Navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import { ToasterProvider } from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import { ClientOnly } from "./components/ClientOnly";
import RentModal from "./components/MultiPurpose/Modals/RentModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Markee",
  description: "New life to start...",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RentModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>

        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
