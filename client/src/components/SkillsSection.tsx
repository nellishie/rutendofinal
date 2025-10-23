import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  MessageSquare,
  Users,
  BookOpen,
  Lightbulb,
  Zap,
  Calendar,
  UserCheck,
  Mic,
  Monitor,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const skills = [
  { name: "Communication", icon: MessageSquare },
  { name: "Leadership", icon: Users },
  { name: "Teaching", icon: BookOpen },
  { name: "Problem Solving", icon: Lightbulb },
  { name: "Proactivity", icon: Zap },
  { name: "Organization Skills", icon: Calendar },
  { name: "Teamwork & Collaboration", icon: UserCheck },
  { name: "Public Speaking", icon: Mic },
  { name: "Digital Literacy", icon: Monitor },
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
    <section id="skills" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 text-center"
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
                className="w-full justify-start gap-3 p-4 md:p-6 text-base md:text-lg font-medium bg-card border hover-elevate transition-all duration-300 cursor-default"
              >
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <skill.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <span className="text-foreground">{skill.name}</span>
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
