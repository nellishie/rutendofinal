import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

export function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:bg-primary/5 relative overflow-hidden">
      {/* Floating colored circles - light mode only */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full blur-3xl opacity-20 dark:opacity-0"
        animate={{
          x: [0, 100, 0],
          y: [0, 80, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full blur-3xl opacity-20 dark:opacity-0"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 text-center bg-gradient-to-r from-orange-600 via-rose-600 to-pink-600 dark:from-primary dark:via-primary dark:to-chart-2 bg-clip-text text-transparent"
        >
          Education
        </motion.h2>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="bg-background rounded-2xl shadow-xl p-8 md:p-12 border-2 border-gradient-to-r from-orange-400 to-rose-400 dark:border-primary/20 relative overflow-hidden"
          data-testid="card-education"
        >
          {/* Animated gradient border effect - light mode only */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-rose-200 to-pink-200 dark:from-transparent dark:via-transparent dark:to-transparent opacity-10 dark:opacity-0" />
          
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
                className="p-6 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 dark:bg-primary/10"
              >
                <GraduationCap className="w-12 h-12 md:w-16 md:h-16 text-white dark:text-primary" />
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
                <div className="relative z-10 p-3 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 dark:bg-primary/10">
                  <Calendar className="w-6 h-6 text-white dark:text-primary" />
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
                <div className="relative z-10 p-3 rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 dark:bg-primary/10">
                  <MapPin className="w-6 h-6 text-white dark:text-primary" />
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
      </div>
    </section>
  );
}
