import { motion } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import { SiWhatsapp, SiLinkedin } from "react-icons/si";
import { Button } from "@/components/ui/button";
import profileImage from "@assets/WhatsApp Image 2025-10-21 at 17.20.26_6418fda9_1761222541311.jpg";

export function HeroSection() {
  const socialLinks = [
    {
      name: "Email",
      href: "mailto:michellechingamuka@gmail.com",
      icon: Mail,
      color: "bg-primary hover:bg-primary/90",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/263780007325",
      icon: SiWhatsapp,
      color: "bg-[#25D366] hover:bg-[#25D366]/90",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/rutendo-chingamuka-583165357",
      icon: SiLinkedin,
      color: "bg-[#0A66C2] hover:bg-[#0A66C2]/90",
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-card to-background pt-16"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-start order-1 lg:order-1"
          >
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(20, 184, 166, 0.4)",
                    "0 0 0 20px rgba(20, 184, 166, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="rounded-3xl"
              >
                <img
                  src={profileImage}
                  alt="Rutendo Chingamuka"
                  className="w-64 md:w-80 lg:w-96 h-auto rounded-3xl shadow-xl border-4 border-background"
                  data-testid="img-profile"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left order-2 lg:order-2"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6"
            >
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Rutendo Chingamuka
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8"
              data-testid="text-title"
            >
              Pharmacy Student | Mental Health Advocate | AMR Enthusiast
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base md:text-lg leading-relaxed text-foreground/80 mb-8 md:mb-10 max-w-2xl mx-auto lg:mx-0"
              data-testid="text-summary"
            >
              Passionate pharmacy student dedicated to advancing public health, mental health
              awareness, and antimicrobial resistance initiatives through leadership and
              community engagement.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12"
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`${link.color} text-white p-3 rounded-full shadow-lg transition-all duration-300`}
                  data-testid={`button-social-${link.name.toLowerCase()}`}
                  aria-label={link.name}
                >
                  <link.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button
                onClick={() => {
                  document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
                }}
                variant="outline"
                size="lg"
                className="group"
                data-testid="button-learn-more"
              >
                Learn More
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
