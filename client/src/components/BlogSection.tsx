import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    title: "The Role of Pharmacists in Combating Antimicrobial Resistance",
    excerpt:
      "Exploring how community pharmacists can lead the fight against AMR through proper antibiotic stewardship, patient education, and collaboration with healthcare providers.",
    date: "October 2025",
    category: "AMR Awareness",
    readTime: "5 min read",
  },
  {
    title: "Breaking the Stigma: Mental Health in Pharmacy Practice",
    excerpt:
      "Addressing the importance of mental health awareness in healthcare settings and how pharmacists can support patients struggling with mental health challenges.",
    date: "September 2025",
    category: "Mental Health",
    readTime: "6 min read",
  },
  {
    title: "Public Health Leadership: Lessons from IPSF",
    excerpt:
      "Insights gained from serving on international pharmaceutical committees and how student leadership shapes the future of global health initiatives.",
    date: "August 2025",
    category: "Leadership",
    readTime: "4 min read",
  },
];

export function BlogSection() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="blog" className="py-16 md:py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Insights & Publications
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharing knowledge on pharmacy practice, public health, mental health advocacy, and
            antimicrobial resistance awareness.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-background rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
              data-testid={`card-blog-${index}`}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-primary">{post.category}</span>
                </div>

                <h3
                  className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors"
                  data-testid={`text-blog-title-${index}`}
                >
                  {post.title}
                </h3>

                <p className="text-sm md:text-base leading-relaxed text-foreground/80 mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:translate-x-1 transition-transform"
                    data-testid={`button-read-more-${index}`}
                  >
                    Read
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            More publications and insights coming soon as I continue my journey in pharmacy and
            public health advocacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
