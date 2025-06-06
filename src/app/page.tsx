//homepag.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  ChevronDown, 
  Download, 
  ExternalLink, 
  Github, 
  Linkedin,
  Instagram, 
  Mail, 
  Phone,
  BicepsFlexed,
  CloudSun,
  Briefcase,
  FileText,
  Send,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import TypewriterEffect from '@/components/TypewriterEffect'
import LeetCodeIcon from '@/components/icons/LeetCodeIcon'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const projects = [
  {
    id: 'justice-hub',
    title: 'JusticeHubAI',
    description: 'It is an AI-powered legal assistance platform designed to access to legal knowledge and connect users with professional lawyers',
    icon: '⚖️',
    link: 'http://justicehubai.vercel.app/',
    tags: ['React', 'Next.js', 'Tailwindcss', 'UI/UX', 'Legal'],
    color: 'from-white-200 to-yellow-400'
  },
  {
    id: 'explore-ease',
    title: 'ExploreEase',
    description: 'A comprehensive travel platform for exploring destinations',
    icon: Briefcase,
    link: 'http://explorease-travel.vercel.app/',
    tags: ['React', 'Next.js', 'Travel', 'UI/UX'],
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 'blog-app',
    title: 'Blogs of Code',
    description: 'Blogging app to share your bites of code to the people.',
    icon: FileText,
    link: 'http://justicehubai.vercel.app/',
    tags: ['React', 'Tailwindcss', 'UI/UX', 'Blog', 'MERN'],
    color: 'from-green-400 to-purple-400'
  },
  {
    id: 'weather-app',
    title: 'Weather App',
    description: 'Real-time weather application with beautiful UI',
    icon: CloudSun,
    link: 'https://weather-app-1131.netlify.app/',
    tags: ['JavaScript', 'API', 'Responsive', 'PWA'],
    color: 'from-green-500 to-blue-500'
  },
  {
    id: 'fit-suratgarh',
    title: 'Fit Suratgarh',
    description: 'Fitness center website with modern design',
    icon: BicepsFlexed,
    link: 'https://paras202.github.io/Fit_suratgarh/',
    tags: ['HTML', 'CSS', 'JavaScript', 'Fitness'],
    color: 'from-orange-500 to-red-500'
  }
]

const skills = {
  frontend: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'jQuery', 'EJS', 'React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
  backend: ['Node.js', 'Express', 'Flask', 'Python', 'C++'],
  database: ['MySQL', 'Firebase', 'MongoDB', 'PostgreSQL']
}

function AnimatedSection({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block"
            >
              <Badge className="mb-4 text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                Paras Singla
              </Badge>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              I&apos;m{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                <TypewriterEffect 
                  words={['Designer', 'Traveller', 'Developer']}
                  className="inline"
                />
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
            >
              Experienced frontend developer with a passion for creating visually stunning
              and user-friendly websites.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full">
                <Link href="https://wa.me/919469527525">
                  Hire Me
                </Link>
              </Button>
              <Button variant="outline" asChild className="px-8 py-3 rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                <Link href="/files/Paras_Singla_cv.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex justify-center lg:justify-start space-x-6"
            >
              <Link href="https://leetcode.com/parasagarwal554/" className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <LeetCodeIcon className="h-5 w-5 text-yellow-600" />
              </Link>
              <Link href="https://www.linkedin.com/in/paras-singla-82617b259/" className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <Linkedin className="h-5 w-5 text-blue-600" />
              </Link>
              <Link href="https://github.com/paras202" className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <Github className="h-5 w-5 text-gray-900 dark:text-white" />
              </Link>
              <Link href="https://github.com/paras202" className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <Instagram className="h-5 w-5 text-pink-600" />
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl ring-4 ring-white dark:ring-gray-800 animate-img-float">
                <Image
                  src="/images/myimage.jpg"
                  alt="Paras Singla"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/20 to-blue-600/20 animate-float-glow"></div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <Link href="#about" className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            <span className="text-sm mb-2">Scroll Down</span>
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </Link>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              My introduction
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <Card className="h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    My Introduction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    I am a proficient full-stack developer with expertise in HTML, CSS, and JavaScript, 
                    as well as a range of cutting-edge frameworks and libraries, enabling me to create 
                    highly interactive and dynamic web applications. Additionally, my experience extends 
                    to working with content management systems (CMS) like WordPress, further bolstering 
                    my versatility and proficiency in web development.
                  </p>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
            
            <AnimatedSection>
              <div className="space-y-6">
                {Object.entries(skills).map(([category, skillList]) => (
                  <Card key={category} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border-0">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 text-purple-800 dark:text-purple-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Projects</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Check out some of my recent work
            </p>
          </AnimatedSection>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={fadeInUp}>
                <Card className="group h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${project.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {typeof project.icon === 'string' ? (
                        <span className="text-2xl">{project.icon}</span>
                      ) : (
                        <project.icon className="h-8 w-8 text-white" />
                      )}

                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/projects/${project.id}`}>
                          View Details
                        </Link>
                      </Button>
                      <Button asChild size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                        <Link href={project.link} target="_blank">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Live Demo
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Do you have a project in your mind? Contact me here
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <Card className="h-full bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center">
                    Find Me <ChevronDown className="ml-2 h-6 w-6 rotate-[-45deg]" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5" />
                    <span>pssingla224@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5" />
                    <span>+91 9469 527 525</span>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
            
            <AnimatedSection>
              <Card className="h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border-0">
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input placeholder="Name" className="bg-transparent border-2 border-gray-300 dark:border-gray-600 focus:border-purple-500" />
                      <Input placeholder="Email" type="email" className="bg-transparent border-2 border-gray-300 dark:border-gray-600 focus:border-purple-500" />
                    </div>
                    <Textarea placeholder="Message" rows={6} className="bg-transparent border-2 border-gray-300 dark:border-gray-600 focus:border-purple-500" />
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}