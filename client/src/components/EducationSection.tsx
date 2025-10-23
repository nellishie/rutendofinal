import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaGraduationCap, FaTrophy, FaFlask, FaCalculator, FaAtom } from "react-icons/fa";
import uzLogo from "@assets/image_1761229326818.png";
import pharmacyBg from "@assets/image_1761231725576.png";

export function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${pharmacyBg})` }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 text-center text-white drop-shadow-lg"
        >
          Education
        </motion.h2>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 border border-white/50 dark:border-primary/20 relative overflow-hidden"
          data-testid="card-education"
        >
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-8">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="p-4 rounded-2xl bg-white dark:bg-card shadow-lg"
              >
                <img 
                  src={uzLogo} 
                  alt="University of Zimbabwe" 
                  className="w-24 h-24 md:w-32 md:h-32 object-contain"
                />
              </motion.div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-center mb-2" data-testid="text-degree">
              Bachelor of Pharmacy (BPharm)
            </h3>

            <p className="text-xl md:text-2xl text-center text-primary font-semibold mb-8" data-testid="text-university">
              University of Zimbabwe
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                className="flex items-center gap-4 p-4 rounded-xl bg-card relative overflow-hidden"
                whileHover={{ scale: 1.03 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent dark:from-transparent" />
                <div className="relative z-10 p-3 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 dark:bg-primary/10 shadow-lg">
                  <FaCalendarAlt className="w-6 h-6 text-white dark:text-primary" />
                </div>
                <div className="relative z-10">
                  <p className="text-sm text-muted-foreground font-medium">Duration</p>
                  <p className="text-base font-semibold" data-testid="text-duration">
                    Aug 2024 – Aug 2028
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-4 p-4 rounded-xl bg-card relative overflow-hidden"
                whileHover={{ scale: 1.03 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-transparent dark:from-transparent" />
                <div className="relative z-10 p-3 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 dark:bg-primary/10 shadow-lg">
                  <FaMapMarkerAlt className="w-6 h-6 text-white dark:text-primary" />
                </div>
                <div className="relative z-10">
                  <p className="text-sm text-muted-foreground font-medium">Location</p>
                  <p className="text-base font-semibold" data-testid="text-location">
                    Harare, Zimbabwe
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-orange-50 to-rose-50 dark:bg-primary/5 border-2 border-orange-200 dark:border-primary/10">
              <p className="text-base md:text-lg leading-relaxed text-foreground/90 text-center">
                Comprehensive pharmaceutical education covering drug development, clinical pharmacy,
                pharmacology, and public health, preparing for a career dedicated to improving
                healthcare outcomes and advancing pharmaceutical sciences.
              </p>
            </div>
          </div>
        </motion.div>

        {/* High School Education */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 border border-white/50 dark:border-primary/20 relative overflow-hidden"
          data-testid="card-high-school"
        >
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="p-4 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 dark:bg-primary/10 shadow-lg"
              >
                <FaTrophy className="w-10 h-10 md:w-12 md:h-12 text-white dark:text-primary" />
              </motion.div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-center mb-2" data-testid="text-high-school-level">
              Advanced Level (A-Level)
            </h3>

            <p className="text-lg md:text-xl text-center text-primary font-semibold mb-2" data-testid="text-high-school">
              Mutoko High School
            </p>

            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 dark:bg-primary/20">
                <p className="text-sm md:text-base font-bold text-white dark:text-primary" data-testid="text-points">
                  15 Points
                </p>
              </div>
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 dark:bg-primary/20">
                <p className="text-sm md:text-base font-bold text-white dark:text-primary" data-testid="text-grade">
                  A+ Student
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:bg-primary/5 border-2 border-blue-200 dark:border-primary/10">
              <p className="text-base md:text-lg text-center font-semibold mb-2 text-foreground">
                Major Subjects
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-card border-2 border-blue-300 dark:border-primary/20">
                  <FaCalculator className="w-4 h-4 text-blue-500" />
                  <p className="text-sm md:text-base font-medium">Mathematics</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-card border-2 border-indigo-300 dark:border-primary/20">
                  <FaAtom className="w-4 h-4 text-indigo-500" />
                  <p className="text-sm md:text-base font-medium">Physics</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-card border-2 border-purple-300 dark:border-primary/20">
                  <FaFlask className="w-4 h-4 text-purple-500" />
                  <p className="text-sm md:text-base font-medium">Chemistry</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
