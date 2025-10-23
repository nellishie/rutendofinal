import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar } from "lucide-react";

const experiences = [
  {
    organization: "IPSF – Public Health Committee",
    role: "Committee Member",
    period: "Oct 2025 – Present",
    description:
      "Contributing to global public health initiatives and policy development through the International Pharmaceutical Students' Federation.",
  },
  {
    organization: "IPSF AfRO – Regional Relations Subcommittee",
    role: "Subcommittee Member",
    period: "Oct 2025 – Present",
    description:
      "Facilitating regional collaborations and strengthening pharmaceutical student networks across the African Region.",
  },
  {
    organization: "ZPSA – Zimbabwe Pharmaceutical Students' Association",
    role: "Public Relations Officer",
    period: "Aug 2025 – Present",
    description:
      "Leading communication strategies and managing public engagement to promote pharmaceutical education and advocacy in Zimbabwe.",
  },
  {
    organization: "Nexmed Pharmacy",
    role: "Student Intern",
    period: "Jul 2025 – Present",
    description:
      "Gaining hands-on experience in pharmaceutical care, medication dispensing, and patient counseling in a community pharmacy setting.",
  },
  {
    organization: "The Stillwaters Mental Health Foundation",
    role: "Strategy Board Director",
    period: "Mar 2025 – Present",
    description:
      "Directing strategic initiatives to advance mental health awareness, reduce stigma, and improve access to mental health resources.",
  },
  {
    organization: "13th IPSF AfPS",
    role: "Subcommittee Member",
    period: "May 2025 – Aug 2025",
    description:
      "Contributed to organizing and executing the African Pharmaceutical Symposium, fostering knowledge exchange among students across Africa.",
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
    <section id="experience" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 text-center"
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
              className="bg-card border-l-4 border-primary rounded-xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
              data-testid={`card-experience-${index}`}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Calendar className="w-5 h-5 text-primary" />
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

              <p className="text-base font-medium text-primary mb-3" data-testid={`text-role-${index}`}>
                {exp.role}
              </p>

              <p className="text-sm md:text-base leading-relaxed text-foreground/80" data-testid={`text-description-${index}`}>
                {exp.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
