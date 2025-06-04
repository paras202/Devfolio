'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Heart,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Code,
  ExternalLink,
  ArrowUp,
  Send
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/paras202',
    icon: Github,
    color: 'hover:text-gray-900 dark:hover:text-white'
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/paras-singla-82617b259/',
    icon: Linkedin,
    color: 'hover:text-blue-600'
  },
  {
    name: 'Email',
    href: 'mailto:pssingla224@gmail.com',
    icon: Mail,
    color: 'hover:text-red-500'
  }
]

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
]

const projects = [
  {
    name: 'ExploreEase',
    href: 'http://explorease-travel.vercel.app/',
    description: 'Travel platform'
  },
  {
    name: 'Weather App',
    href: 'https://weather-app-1131.netlify.app/',
    description: 'Real-time weather'
  },
  {
    name: 'Fit Suratgarh',
    href: 'https://paras202.github.io/Fit_suratgarh/',
    description: 'Fitness center'
  }
]

const skills = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB'
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-blue-50/50 to-indigo-50/50 dark:from-purple-900/10 dark:via-blue-900/10 dark:to-indigo-900/10"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-blob"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-blob animate-delay-150"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20 animate-blob animate-delay-300"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link 
              href="#home" 
              className="flex items-center space-x-2 text-2xl font-bold text-gray-900 dark:text-white mb-4 group"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all duration-300">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="gradient-text">Paras Singla</span>
            </Link>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Frontend developer passionate about creating beautiful, functional web experiences with modern technologies.
            </p>
            
            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.div
                  key={social.name}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 transition-all duration-300 hover:shadow-lg ${social.color}`}
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              Quick Links
              <div className="ml-2 w-8 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 flex items-center group"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <ArrowUp className="h-3 w-3 ml-1 rotate-45 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              Featured Projects
              <div className="ml-2 w-8 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              {projects.map((project, index) => (
                <motion.li 
                  key={project.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
                  >
                    <div className="text-gray-900 dark:text-white font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200 flex items-center">
                      {project.name}
                      <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {project.description}
                    </p>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              Get In Touch
              <div className="ml-2 w-8 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
            </h3>
            <div className="space-y-4">
              <motion.div 
                className="flex items-center space-x-3 group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors duration-200">
                  <Mail className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                </div>
                <Link
                  href="mailto:pssingla224@gmail.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 text-sm"
                >
                  pssingla224@gmail.com
                </Link>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3 group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors duration-200">
                  <Phone className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </div>
                <Link
                  href="tel:+919469527525"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  +91 9469 527 525
                </Link>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3 group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors duration-200">
                  <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400" />
                </div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  Rajasthan, India
                </span>
              </motion.div>
              
              {/* Quick Contact Button */}
              <motion.div 
                className="pt-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="#contact">
                  <Button className="w-full btn-gradient text-white font-medium">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              >
                <Heart className="h-4 w-4 text-red-500 fill-current" />
              </motion.div>
              <span>using Next.js & Tailwind CSS</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                © 2024 Paras Singla. All rights reserved.
              </p>
              
              {/* Scroll to top button */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}