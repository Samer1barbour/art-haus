import { motion } from "framer-motion";
import { Package, Shield, Truck } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Premium Quality",
    description: "Each toy is crafted with the finest materials and attention to detail.",
  },
  {
    icon: Shield,
    title: "Authentic Pieces",
    description: "100% authentic designer toys with certificate of authenticity.",
  },
  {
    icon: Truck,
    title: "Lebanon Delivery",
    description: "Fast and reliable delivery across all Lebanese regions.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative bg-charcoal py-20 md:py-32">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-gold">
              About Art Haus
            </span>
            <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Where Art Meets Play
            </h2>
            <p className="mt-6 text-muted-foreground">
              Art Haus brings you the world's most sought-after designs and 
              collectibles. Based in Lebanon, we curate exclusive pieces that blend 
              artistic expression with playful design.
            </p>
            <p className="mt-4 text-muted-foreground">
              Whether you're a seasoned collector or just starting your journey, 
              our carefully selected collection offers something unique for everyone.
            </p>

            <div className="mt-8">
              <a href="#collection" className="btn-gold inline-flex">
                View Collection
              </a>
            </div>
          </motion.div>

          {/* Right Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex gap-5 rounded-2xl bg-charcoal-light p-6"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gold/10">
                  <feature.icon className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
