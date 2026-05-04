import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function AdminLayout({ children }) {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Navbar /> 
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
        
    </div>
      <Footer />
    </>
  );
}