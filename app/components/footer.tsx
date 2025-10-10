"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Youtube,
  Github,
  Linkedin,
  Mail,
  ArrowUp,
} from "lucide-react";

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://web.facebook.com/profile.php?id=61560555868956",
    color: "hover:text-blue-500",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/matt.hmd28/",
    color: "hover:text-pink-500",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://www.youtube.com/@hammad_matt",
    color: "hover:text-red-500",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/hmad28",
    color: "hover:text-gray-400",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/hmatt28/",
    color: "hover:text-blue-400",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:email1.hammad@gmail.com",
    color: "hover:text-yellow-400",
  },
];

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "My Works", href: "#portfolio" },
  { name: "Skills", href: "#skill" },
  { name: "About Me", href: "#about" },
  { name: "Contact Me", href: "#contact" },
];

const services = [
  { name: "Web Development" },
  { name: "Graphic Design" },
  { name: "Video Editing" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
      >
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative inline-block"
            >
              <div className="absolute inset-0 bg-gradient-to-r  rounded-lg blur-xl opacity-30" />
              <Image
                src="/images/logo2.png"
                alt="logo hammad"
                width={250}
                height={60}
                className="relative"
              />
            </motion.div>

            <p className="mt-6 max-w-md text-gray-400 leading-relaxed">
              Hi, I'm{" "}
              <span className="text-amber-400 font-semibold">Hammad</span> (aka
              Matt, Muhammad). Web fullstack developer, video editor, graphic
              designer, and lifelong student. Passionate about creating amazing
              digital experiences.
            </p>

            {/* Social Links */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Connect With Me
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-gray-400 ${social.color} transition-all duration-300 hover:bg-white/10 hover:border-white/20 group`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-amber-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-amber-400 group-hover:w-4 transition-all duration-300" />
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                Services
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <motion.li
                    key={service.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href="#"
                      className="text-gray-400 hover:text-amber-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      {service.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                Get In Touch
              </h3>
              <div className="space-y-4">
                <motion.a
                  href="mailto:email1.hammad@gmail.com"
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-amber-400/50 transition-all duration-300 group"
                >
                  <Mail className="w-5 h-5 text-amber-400 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      Email
                    </p>
                    <p className="text-sm text-gray-300 group-hover:text-amber-400 transition-colors">
                      email1.hammad@gmail.com
                    </p>
                  </div>
                </motion.a>

                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="w-5 h-5 mt-0.5">
                    <svg
                      className="w-full h-full text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      Location
                    </p>
                    <p className="text-sm text-gray-300">Jakarta, Indonesia</p>
                  </div>
                </motion.div>

                <motion.p className="text-xs text-gray-500 italic pt-2">
                  Available for freelance projects and collaborations
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="my-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-gray-400 flex items-center gap-2">
            Copyright © 2025.
            <span className="text-amber-400 font-semibold">Hammad</span>
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-gray-600">•</span>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-amber-400 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 rounded-full shadow-lg hover:shadow-xl hover:shadow-amber-400/50 transition-all duration-300 z-40 group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
      </motion.button>
    </footer>
  );
}
