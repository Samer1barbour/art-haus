const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <span className="text-gradient-gold text-xl font-bold tracking-tight">
              ART HAUS
            </span>
            <p className="mt-2 text-sm text-muted-foreground">
              Premium Designs  • Lebanon
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#collection" className="transition-colors hover:text-gold">
              Collection
            </a>
            <a href="#about" className="transition-colors hover:text-gold">
              About
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Art Haus. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
