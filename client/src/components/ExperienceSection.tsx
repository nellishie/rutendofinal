import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaCalendarAlt } from "react-icons/fa";

const experiences = [
  {
    organization: "IPSF – Public Health Committee",
    role: "Committee Member",
    period: "Oct 2025 – Present",
    description:
      "Contributing to global public health initiatives and policy development through the International Pharmaceutical Students' Federation.",
    color: "from-blue-500 to-cyan-500",
    borderColor: "border-blue-500",
  },
  {
    organization: "IPSF AfRO – Regional Relations Subcommittee",
    role: "Subcommittee Member",
    period: "Oct 2025 – Present",
    description:
      "Facilitating regional collaborations and strengthening pharmaceutical student networks across the African Region.",
    color: "from-purple-500 to-pink-500",
    borderColor: "border-purple-500",
  },
  {
    organization: "ZPSA – Zimbabwe Pharmaceutical Students' Association",
    role: "Public Relations Officer",
    period: "Aug 2025 – Present",
    description:
      "Leading communication strategies and managing public engagement to promote pharmaceutical education and advocacy in Zimbabwe.",
    color: "from-emerald-500 to-teal-500",
    borderColor: "border-emerald-500",
  },
  {
    organization: "Nexmed Pharmacy",
    role: "Student Intern",
    period: "Jul 2025 – Present",
    description:
      "Gaining hands-on experience in pharmaceutical care, medication dispensing, and patient counseling in a community pharmacy setting. Supervisor: Pharmacist Tanatswa (+263 78 206 5768).",
    color: "from-orange-500 to-amber-500",
    borderColor: "border-orange-500",
  },
  {
    organization: "The Stillwaters Mental Health Foundation",
    role: "Strategy Board Director",
    period: "Mar 2025 – Present",
    description:
      "Directing strategic initiatives to advance mental health awareness, reduce stigma, and improve access to mental health resources. Zimbabwe Coordinator: Stawelyn Musona (+263 78 634 3300) - Regional Relations Members In Association Coordinator.",
    color: "from-rose-500 to-pink-500",
    borderColor: "border-rose-500",
  },
  {
    organization: "13th IPSF AfPS",
    role: "Subcommittee Member",
    period: "May 2025 – Aug 2025",
    description:
      "Contributed to organizing and executing the African Pharmaceutical Symposium, fostering knowledge exchange among students across Africa.",
    color: "from-indigo-500 to-violet-500",
    borderColor: "border-indigo-500",
  },
];

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="experience" className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Animated gradient orbs - light mode only */}
      <motion.div
        className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full blur-3xl opacity-20 dark:opacity-0"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full blur-3xl opacity-20 dark:opacity-0"
        animate={{
          scale: [1, 1.4, 1],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 text-center bg-gradient-to-r from-primary via-blue-600 to-purple-600 dark:from-primary dark:via-primary dark:to-chart-2 bg-clip-text text-transparent"
        >
          Experience
        </motion.h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-card border rounded-xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              data-testid={`card-experience-${index}`}
            >
              {/* Gradient overlay on hover - light mode only */}
              <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-5 dark:opacity-0 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="flex items-start gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${exp.color} dark:bg-primary/10`}>
                    <FaCalendarAlt className="w-5 h-5 text-white dark:text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground" data-testid={`text-period-${index}`}>
                      {exp.period}
                    </p>
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold mb-2" data-testid={`text-organization-${index}`}>
                  {exp.organization}
                </h3>

                <p className={`text-base font-medium mb-3 bg-gradient-to-r ${exp.color} dark:from-primary dark:to-primary bg-clip-text text-transparent`} data-testid={`text-role-${index}`}>
                  {exp.role}
                </p>

                <p className="text-sm md:text-base leading-relaxed text-foreground/80" data-testid={`text-description-${index}`}>
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
