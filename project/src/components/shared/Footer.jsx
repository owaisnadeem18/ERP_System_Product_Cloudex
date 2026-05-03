export default function Footer() {
  // Automatically gets the current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-tborder-gray-100 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          
          {/* Main Text with Heart Animation */}
          <p className="text-gray-500 text-sm font-medium flex items-center gap-2 tracking-wide">
            Made with 
            <span className="text-red-500 animate-pulse text-lg">❤️</span> 
            by 
            <span className="text-blue-600 font-bold hover:text-blue-700 transition-colors cursor-pointer">
              Cloudex
            </span>
          </p>

          {/* Dynamic Year Branding */}
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold">
            <span>© {currentYear} All Rights Reserved</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>v1.0.4</span>
          </div>
          
        </div>
      </div>
    </footer>
  );
}