import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

export function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-16 md:py-24 lg:py-32 bg-primary/5">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 text-center"
        >
          Education
        </motion.h2>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="bg-background rounded-2xl shadow-xl p-8 md:p-12 border-2 border-primary/20"
          data-testid="card-education"
        >
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
              className="p-6 rounded-full bg-primary/10"
            >
              <GraduationCap className="w-12 h-12 md:w-16 md:h-16 text-primary" />
            </motion.div>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-center mb-2" data-testid="text-degree">
            Bachelor of Pharmacy (BPharm)
          </h3>

          <p className="text-xl md:text-2xl text-center text-primary font-semibold mb-8" data-testid="text-university">
            University of Zimbabwe
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-card">
              <div className="p-3 rounded-lg bg-primary/10">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Duration</p>
                <p className="text-base font-semibold" data-testid="text-duration">
                  Aug 2024 – Aug 2028
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-card">
              <div className="p-3 rounded-lg bg-primary/10">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Location</p>
                <p className="text-base font-semibold" data-testid="text-location">
                  Harare, Zimbabwe
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-base md:text-lg leading-relaxed text-foreground/90 text-center">
              Comprehensive pharmaceutical education covering drug development, clinical pharmacy,
              pharmacology, and public health, preparing for a career dedicated to improving
              healthcare outcomes and advancing pharmaceutical sciences.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
