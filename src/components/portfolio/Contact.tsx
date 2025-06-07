import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import PortfolioManager from "@/lib/portfolio-manager";
import { PersonalInfo, SocialLinks } from "@/types/portfolio";

const Contact: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLinks | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const manager = PortfolioManager.getInstance();
    setPersonalInfo(manager.getPersonalInfo());
    setSocialLinks(manager.getSocialLinks());

    const handleDataUpdate = () => {
      setPersonalInfo(manager.getPersonalInfo());
      setSocialLinks(manager.getSocialLinks());
    };

    window.addEventListener("portfolioDataUpdated", handleDataUpdate);
    return () =>
      window.removeEventListener("portfolioDataUpdated", handleDataUpdate);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate form submission - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For demo purposes, we'll just show success
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialIcons = [
    {
      Icon: Github,
      url: socialLinks?.github,
      label: "GitHub",
      color: "hover:text-gray-300",
    },
    {
      Icon: Linkedin,
      url: socialLinks?.linkedin,
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      Icon: Twitter,
      url: socialLinks?.twitter,
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      Icon: Instagram,
      url: socialLinks?.instagram,
      label: "Instagram",
      color: "hover:text-pink-400",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2300d4ff" fill-opacity="0.3"%3E%3Cpath d="M50 50c13.807 0 25-11.193 25-25S63.807 0 50 0 25 11.193 25 25s11.193 25 25 25zm0 25c13.807 0 25-11.193 25-25S63.807 50 50 50s-25 11.193-25 25 11.193 25 25 25z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] bg-repeat'
          }
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Get In </span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Let's connect and discuss opportunities, collaborations, or just
              have a chat
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mt-6" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Let's Connect
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  I'm always interested in hearing about new opportunities,
                  interesting projects, or just connecting with fellow
                  developers. Feel free to reach out!
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {personalInfo?.email && (
                  <motion.a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center space-x-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg flex items-center justify-center">
                      <Mail className="text-black" size={20} />
                    </div>
                    <div>
                      <div className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                        Email
                      </div>
                      <div className="text-gray-400">{personalInfo.email}</div>
                    </div>
                  </motion.a>
                )}

                {personalInfo?.phone && (
                  <motion.a
                    href={`tel:${personalInfo.phone}`}
                    className="flex items-center space-x-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-green-400/50 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg flex items-center justify-center">
                      <Phone className="text-black" size={20} />
                    </div>
                    <div>
                      <div className="text-white font-medium group-hover:text-green-400 transition-colors">
                        Phone
                      </div>
                      <div className="text-gray-400">{personalInfo.phone}</div>
                    </div>
                  </motion.a>
                )}

                {personalInfo?.location && (
                  <motion.div
                    className="flex items-center space-x-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                      <MapPin className="text-black" size={20} />
                    </div>
                    <div>
                      <div className="text-white font-medium">Location</div>
                      <div className="text-gray-400">
                        {personalInfo.location}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  Follow Me
                </h4>
                <div className="flex space-x-4">
                  {socialIcons.map(
                    ({ Icon, url, label, color }) =>
                      url && (
                        <motion.a
                          key={label}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-3 bg-gray-800/50 rounded-lg text-gray-400 ${color} border border-gray-700/50 hover:border-current transition-all duration-300`}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon size={20} />
                          <span className="sr-only">{label}</span>
                        </motion.a>
                      ),
                  )}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 transition-colors resize-none"
                      placeholder="Tell me more about your project or inquiry..."
                    />
                  </div>

                  {/* Submit Status */}
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-400/20 border border-green-400/30 rounded-lg text-green-400 text-sm"
                    >
                      Thank you for your message! I'll get back to you soon.
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-400/20 border border-red-400/30 rounded-lg text-red-400 text-sm"
                    >
                      Sorry, there was an error sending your message. Please try
                      again.
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-400/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <div className="bg-gradient-to-r from-cyan-400/10 to-purple-400/10 border border-cyan-400/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Start a Project?
              </h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                I'm currently available for freelance work, internships, and
                collaborative projects. Let's bring your ideas to life!
              </p>
              <motion.a
                href={`mailto:${personalInfo?.email}`}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                <span>Let's Talk</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
