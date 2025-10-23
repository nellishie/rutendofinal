import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  FaComments,
  FaUsers,
  FaBook,
  FaLightbulb,
  FaBolt,
  FaCalendarAlt,
  FaUserCheck,
  FaMicrophone,
  FaDesktop,
} from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

const skills = [
  { name: "Communication", icon: FaComments, color: "from-blue-500 to-cyan-500" },
  { name: "Leadership", icon: FaUsers, color: "from-purple-500 to-pink-500" },
  { name: "Teaching", icon: FaBook, color: "from-emerald-500 to-teal-500" },
  { name: "Problem Solving", icon: FaLightbulb, color: "from-amber-500 to-orange-500" },
  { name: "Proactivity", icon: FaBolt, color: "from-rose-500 to-pink-500" },
  { name: "Organization Skills", icon: FaCalendarAlt, color: "from-indigo-500 to-violet-500" },
  { name: "Teamwork & Collaboration", icon: FaUserCheck, color: "from-green-500 to-emerald-500" },
  { name: "Public Speaking", icon: FaMicrophone, color: "from-fuchsia-500 to-pink-500" },
  { name: "Digital Literacy", icon: FaDesktop, color: "from-sky-500 to-blue-500" },
];

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Colorful animated gradient shapes - light mode only */}
      <motion.div
        className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full blur-3xl opacity-20 dark:opacity-0"
        animate={{
          y: [0, -80, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-br from-cyan-300 to-blue-300 rounded-full blur-3xl opacity-20 dark:opacity-0"
        animate={{
          y: [0, 80, 0],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 text-center bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 dark:from-primary dark:via-primary dark:to-chart-2 bg-clip-text text-transparent"
        >
          Skills & Competencies
        </motion.h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={skillVariants}
              whileHover={{ scale: 1.05 }}
              className="group"
              data-testid={`skill-${index}`}
            >
              <Badge
                variant="secondary"
                className="w-full justify-start gap-3 p-4 md:p-6 text-base md:text-lg font-medium bg-card border hover-elevate transition-all duration-300 cursor-default relative overflow-hidden"
              >
                {/* Gradient overlay on hover - light mode only */}
                <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-10 dark:opacity-0 transition-opacity duration-300`} />
                <div className={`relative z-10 p-2 rounded-lg bg-gradient-to-br ${skill.color} dark:bg-primary/10 group-hover:scale-110 transition-transform duration-300`}>
                  <skill.icon className="w-5 h-5 md:w-6 md:h-6 text-white dark:text-primary" />
                </div>
                <span className="relative z-10 text-foreground">{skill.name}</span>
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 p-8 rounded-2xl bg-card border text-center"
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-4">Technical Proficiencies</h3>
          <p className="text-base md:text-lg text-foreground/80">
            Microsoft Office Suite (Word, Excel, PowerPoint) | DispenseWare Pharmacy Management
            System | Data Analysis & Presentation | Research & Documentation
          </p>
        </motion.div>
      </div>
    </section>
  );
}
