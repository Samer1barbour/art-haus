import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 right-0 top-0 z-40 bg-background/80 backdrop-blur-lg"
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-gradient-gold text-xl font-bold tracking-tight md:text-2xl">
            ART HAUS
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#collection"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
          >
            Collection
          </a>
          <a
            href="#about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
          >
            About
          </a>
        </nav>

        {/* Contact Button - Desktop */}
        <a
          href="#collection"
          className="hidden md:inline-flex btn-gold-outline px-6 py-2 text-sm"
        >
          Shop Now
        </a>
      </div>
    </motion.header>
  );
};

export default Header;
