import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, GraduationCap, Briefcase, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-card relative overflow-hidden">
      {/* Colorful animated background shapes - light mode only */}
      <motion.div
        className="absolute top-20 -left-20 w-72 h-72 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full blur-3xl opacity-30 dark:opacity-0"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full blur-3xl opacity-30 dark:opacity-0"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full blur-3xl opacity-20 dark:opacity-0"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 text-center bg-gradient-to-r from-primary via-purple-600 to-pink-600 dark:from-primary dark:via-primary dark:to-chart-2 bg-clip-text text-transparent"
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
            className="flex justify-center mt-8 mb-12"
          >
            <Button
              size="lg"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/api/download-cv';
                link.download = 'Rutendo_Chingamuka_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="gap-2"
              data-testid="button-download-cv"
            >
              <Download className="w-5 h-5" />
              Download CV
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            <motion.div 
              className="flex items-start gap-4 p-6 rounded-xl bg-background border hover-elevate transition-all duration-300 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent dark:from-transparent" />
              <div className="relative z-10 p-3 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 dark:bg-primary/10">
                <MapPin className="w-6 h-6 text-white dark:text-primary" />
              </div>
              <div className="relative z-10">
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-sm text-muted-foreground">Harare, Zimbabwe</p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start gap-4 p-6 rounded-xl bg-background border hover-elevate transition-all duration-300 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent dark:from-transparent" />
              <div className="relative z-10 p-3 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 dark:bg-primary/10">
                <GraduationCap className="w-6 h-6 text-white dark:text-primary" />
              </div>
              <div className="relative z-10">
                <h3 className="font-semibold mb-1">Education</h3>
                <p className="text-sm text-muted-foreground">
                  Bachelor of Pharmacy
                  <br />
                  University of Zimbabwe
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start gap-4 p-6 rounded-xl bg-background border hover-elevate transition-all duration-300 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent dark:from-transparent" />
              <div className="relative z-10 p-3 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 dark:bg-primary/10">
                <Briefcase className="w-6 h-6 text-white dark:text-primary" />
              </div>
              <div className="relative z-10">
                <h3 className="font-semibold mb-1">Current Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Public Health & Mental Health Advocacy
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
