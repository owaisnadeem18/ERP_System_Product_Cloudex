export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Official Brand Gradient
  const brandGradient = "linear-gradient(45deg, #0C6263 0%, #0C925E 100%)";

  return (
    <footer 
      style={{ background: brandGradient }}
      className="w-full py-8 mt-auto border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          
          {/* Main Credits with Cloudex Branding */}
          <div className="flex items-center gap-2 text-white/90 font-medium tracking-wide">
            <span>Made with</span>
            <span className="text-red-400 animate-pulse text-xl">❤️</span>
            <span>by</span>
            <span className="font-extrabold text-white tracking-tight text-lg group cursor-pointer">
              CLOUDEX<span className="text-[#0C925E] group-hover:text-white transition-colors">.</span>
            </span>
          </div>

          <div className="w-32 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>

          {/* Copyright & Technical Details */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-bold">
            <span className="text-white/60">© {currentYear} CLOUDEX SOLUTIONS</span>
            
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-white/10 rounded border border-white/10 text-white/80">
                v1.0.4
              </span>
            </div>
            
            <span className="text-white/60">All Rights Reserved</span>
          </div>
          
        </div>
      </div>
    </footer>
  );
}