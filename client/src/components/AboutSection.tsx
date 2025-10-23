import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, GraduationCap, Briefcase } from "lucide-react";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-card">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 text-center"
          >
            About Me
          </motion.h2>

          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-base md:text-lg leading-relaxed text-foreground/90 mb-6">
              I am a dedicated pharmacy student at the University of Zimbabwe with a deep
              commitment to improving healthcare outcomes through evidence-based practice and
              community engagement. My journey in pharmacy has been enriched by diverse
              leadership roles and a passion for addressing critical health challenges.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-foreground/90">
              Beyond my academic pursuits, I am deeply invested in mental health advocacy and
              antimicrobial resistance (AMR) awareness. Through my work with various
              organizations, I strive to create meaningful impact in public health and empower
              communities with knowledge and resources for better health outcomes.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            <div className="flex items-start gap-4 p-6 rounded-xl bg-background border hover-elevate transition-all duration-300">
              <div className="p-3 rounded-lg bg-primary/10">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-sm text-muted-foreground">Harare, Zimbabwe</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-xl bg-background border hover-elevate transition-all duration-300">
              <div className="p-3 rounded-lg bg-primary/10">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Education</h3>
                <p className="text-sm text-muted-foreground">
                  Bachelor of Pharmacy
                  <br />
                  University of Zimbabwe
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-xl bg-background border hover-elevate transition-all duration-300">
              <div className="p-3 rounded-lg bg-primary/10">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Current Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Public Health & Mental Health Advocacy
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
