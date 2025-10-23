import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Moyo",
    role: "Clinical Pharmacy Supervisor",
    organization: "Nexmed Pharmacy",
    content:
      "Rutendo has demonstrated exceptional dedication and professionalism during her internship. Her commitment to patient care and eagerness to learn make her stand out among her peers.",
    rating: 5,
  },
  {
    name: "Prof. Tendai Mutasa",
    role: "Lecturer in Pharmaceutical Sciences",
    organization: "University of Zimbabwe",
    content:
      "As a student, Rutendo consistently shows remarkable understanding of complex pharmaceutical concepts. Her leadership in student organizations demonstrates her potential to make significant contributions to the field.",
    rating: 5,
  },
  {
    name: "Michael Ncube",
    role: "Executive Director",
    organization: "The Stillwaters Mental Health Foundation",
    content:
      "Rutendo's strategic insights and passion for mental health advocacy have been invaluable to our board. She brings fresh perspectives and genuine commitment to reducing mental health stigma.",
    rating: 5,
  },
];

export function TestimonialsSection() {
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Recommendations
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            What colleagues and mentors say about working with me.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="bg-card rounded-xl shadow-lg p-6 md:p-8 relative overflow-hidden"
              data-testid={`card-testimonial-${index}`}
            >
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-16 h-16 text-primary" />
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-base leading-relaxed text-foreground/90 mb-6 relative z-10">
                "{testimonial.content}"
              </p>

              <div className="pt-4 border-t">
                <p className="font-semibold text-lg" data-testid={`text-name-${index}`}>
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground" data-testid={`text-role-${index}`}>
                  {testimonial.role}
                </p>
                <p className="text-sm text-primary font-medium">
                  {testimonial.organization}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center p-8 rounded-xl bg-card border"
        >
          <p className="text-base md:text-lg text-foreground/80">
            These testimonials reflect collaborative experiences and professional relationships built
            through dedication to excellence in pharmacy practice and public health advocacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
