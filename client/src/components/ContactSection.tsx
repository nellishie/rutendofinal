import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { SiWhatsapp, SiLinkedin } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setIsSuccess(true);
      form.reset();
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setTimeout(() => setIsSuccess(false), 5000);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    sendMessageMutation.mutate(data);
  };

  const contactInfo = [
    {
      name: "Email",
      value: "michellechingamuka@gmail.com",
      href: "mailto:michellechingamuka@gmail.com",
      icon: Mail,
    },
    {
      name: "WhatsApp",
      value: "+263 78 000 7325",
      href: "https://wa.me/263780007325",
      icon: SiWhatsapp,
    },
    {
      name: "LinkedIn",
      value: "Connect with me",
      href: "https://www.linkedin.com/in/rutendo-chingamuka-583165357",
      icon: SiLinkedin,
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-center"
        >
          Get In Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base md:text-lg text-center text-primary-foreground/90 mb-12 max-w-2xl mx-auto"
        >
          Have a question or want to collaborate? Feel free to reach out. I'd love to hear from
          you!
        </motion.p>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.name}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm hover-elevate transition-all duration-300"
                  data-testid={`link-contact-${info.name.toLowerCase()}`}
                >
                  <div className="p-3 rounded-lg bg-primary-foreground/20">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{info.name}</p>
                    <p className="text-primary-foreground/90">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 p-6 rounded-xl bg-primary-foreground/10 backdrop-blur-sm"
            >
              <p className="text-base leading-relaxed">
                I'm always open to discussing new opportunities, collaborations in public health,
                mental health advocacy, or pharmaceutical research. Let's connect and make a
                difference together!
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-background text-foreground rounded-2xl shadow-2xl p-8"
          >
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-chart-3 mb-4" />
                <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                <p className="text-muted-foreground text-center">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your full name"
                            {...field}
                            className="border-2 border-input focus:border-primary transition-colors"
                            data-testid="input-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            {...field}
                            className="border-2 border-input focus:border-primary transition-colors"
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message..."
                            {...field}
                            className="min-h-32 border-2 border-input focus:border-primary transition-colors resize-none"
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={sendMessageMutation.isPending}
                    data-testid="button-send"
                  >
                    {sendMessageMutation.isPending ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="mr-2"
                        >
                          <AlertCircle className="w-5 h-5" />
                        </motion.div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
