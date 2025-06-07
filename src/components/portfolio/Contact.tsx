import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import PortfolioManager from "@/lib/portfolio-manager";
import { PersonalInfo, SocialLinks } from "@/types/portfolio";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTheme } from "@/contexts/ThemeContext";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLinks | null>(null);
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );
  const { ref, isInView: isVisible } = useScrollAnimation();
  const { isDark } = useTheme();

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
    setSubmitStatus(null);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically send the form data to your backend
      console.log("Form submitted:", formData);

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialPlatforms = [
    {
      name: "GitHub",
      icon: Github,
      url: socialLinks?.github,
      color: isDark ? "hover:text-white" : "hover:text-gray-900",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: socialLinks?.linkedin,
      color: "hover:text-blue-500",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: socialLinks?.twitter,
      color: "hover:text-blue-400",
    },
  ];

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo?.email || "contact@example.com",
      href: `mailto:${personalInfo?.email}`,
      color: isDark ? "text-cyan-400" : "text-blue-600",
    },
    {
      icon: Phone,
      label: "Phone",
      value: personalInfo?.phone || "+1 (555) 123-4567",
      href: `tel:${personalInfo?.phone}`,
      color: isDark ? "text-green-400" : "text-green-600",
    },
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo?.location || "New Delhi, India",
      href: `https://maps.google.com/?q=${encodeURIComponent(personalInfo?.location || "New Delhi, India")}`,
      color: isDark ? "text-orange-400" : "text-orange-600",
    },
  ];

  return (
    <section
      id="contact"
      className={`min-h-screen py-20 relative overflow-hidden transition-all duration-500 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
      ref={ref}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Message Icons */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute transition-colors duration-500 ${
              isDark ? "text-cyan-400/5" : "text-blue-500/5"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${30 + Math.random() * 30}px`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <MessageCircle />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Get In{" "}
              <span
                className={`${
                  isDark
                    ? "bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                }`}
              >
                Touch
              </span>
            </h2>
            <p
              className={`text-xl max-w-2xl mx-auto transition-colors duration-500 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Have a project in mind? Let's discuss how we can work together
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={
                isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
              }
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact Methods */}
              <div
                className={`p-8 rounded-2xl border backdrop-blur-lg transition-all duration-500 ${
                  isDark
                    ? "bg-gray-800/50 border-gray-700/50"
                    : "bg-white/70 border-gray-200/50 shadow-lg"
                }`}
              >
                <h3
                  className={`text-2xl font-semibold mb-6 transition-colors duration-500 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Contact Information
                </h3>

                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <motion.a
                      key={method.label}
                      href={method.href}
                      target={
                        method.label === "Location" ? "_blank" : undefined
                      }
                      rel={
                        method.label === "Location"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:scale-105 group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isVisible
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: -20 }
                      }
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <div
                        className={`p-3 rounded-lg ${
                          isDark
                            ? "bg-gray-700/50 group-hover:bg-gray-600/50"
                            : "bg-gray-100 group-hover:bg-gray-200"
                        } transition-all duration-300`}
                      >
                        <method.icon
                          className={`${method.color} transition-colors duration-300`}
                          size={20}
                        />
                      </div>
                      <div>
                        <p
                          className={`font-medium transition-colors duration-500 ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {method.label}
                        </p>
                        <p
                          className={`transition-colors duration-500 ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {method.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div
                className={`p-8 rounded-2xl border backdrop-blur-lg transition-all duration-500 ${
                  isDark
                    ? "bg-gray-800/50 border-gray-700/50"
                    : "bg-white/70 border-gray-200/50 shadow-lg"
                }`}
              >
                <h3
                  className={`text-2xl font-semibold mb-6 transition-colors duration-500 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Connect With Me
                </h3>

                <div className="flex gap-4">
                  {socialPlatforms.map(
                    (platform, index) =>
                      platform.url && (
                        <motion.a
                          key={platform.name}
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group p-4 rounded-lg border transition-all duration-300 ${
                            isDark
                              ? "bg-gray-700/50 border-gray-600/50 hover:border-gray-500 text-gray-400"
                              : "bg-white border-gray-200 hover:border-gray-300 text-gray-600"
                          } ${platform.color}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={
                            isVisible
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0, y: 20 }
                          }
                          transition={{
                            duration: 0.6,
                            delay: 0.6 + index * 0.1,
                          }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <platform.icon size={24} />
                          <span className="sr-only">{platform.name}</span>
                        </motion.a>
                      ),
                  )}
                </div>

                <p
                  className={`text-sm mt-4 transition-colors duration-500 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Follow me on social media for updates and tech insights
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`p-8 rounded-2xl border backdrop-blur-lg transition-all duration-500 ${
                isDark
                  ? "bg-gray-800/50 border-gray-700/50"
                  : "bg-white/70 border-gray-200/50 shadow-lg"
              }`}
            >
              <h3
                className={`text-2xl font-semibold mb-6 transition-colors duration-500 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Send Me a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-500 ${
                        isDark
                          ? "bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-cyan-400"
                          : "bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                        isDark ? "focus:ring-cyan-400" : "focus:ring-blue-500"
                      }`}
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-500 ${
                        isDark
                          ? "bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-cyan-400"
                          : "bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                        isDark ? "focus:ring-cyan-400" : "focus:ring-blue-500"
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-500 ${
                      isDark
                        ? "bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-cyan-400"
                        : "bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                      isDark ? "focus:ring-cyan-400" : "focus:ring-blue-500"
                    }`}
                    placeholder="Project Discussion"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-500 resize-none ${
                      isDark
                        ? "bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-cyan-400"
                        : "bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                      isDark ? "focus:ring-cyan-400" : "focus:ring-blue-500"
                    }`}
                    placeholder="Tell me about your project or ideas..."
                  />
                </div>

                {/* Submit Status */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 p-3 rounded-lg ${
                      submitStatus === "success"
                        ? isDark
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-green-100 text-green-700 border border-green-300"
                        : isDark
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : "bg-red-100 text-red-700 border border-red-300"
                    }`}
                  >
                    {submitStatus === "success" ? (
                      <>
                        <CheckCircle size={20} />
                        <span>
                          Message sent successfully! I'll get back to you soon.
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={20} />
                        <span>Failed to send message. Please try again.</span>
                      </>
                    )}
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                    isSubmitting
                      ? isDark
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-cyan-400 to-green-400 text-black hover:shadow-lg hover:shadow-cyan-400/25"
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
