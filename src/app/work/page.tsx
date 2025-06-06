'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
ChevronLeft, 
ChevronRight, 
ExternalLink, 
Github, 
Calendar,
Star,
GitFork,
Eye,
ArrowRight,
Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ProjectType {
  id: string;
  title: string;
  shortDescription: string;
  date: string;
  category: string;
  image: string;
  placeholder: string;
  liveUrl: string;
  githubUrl: string;
  technologies: string[];
  featured: boolean;
  overview: string;
  keyFeatures: string[];
  challenges: string;
  outcome: string;
  stats: {
    stars: number;
    forks: number;
    views: number;
  };
}

const projects: ProjectType[] = [
{
id: 'justicehub-ai',
title: 'JusticeHub AI – Legal Intelligence Platform',
shortDescription: 'AI-powered legal assistance platform for document analysis and lawyer consultation',
date: 'March 15, 2025',
category: 'Full Stack AI Web Application',
image: '/images/justicehub-preview.png',
// Fallback placeholder for missing images
placeholder: 'https://via.placeholder.com/800x450/8B5CF6/FFFFFF?text=JusticeHub+AI',
liveUrl: 'https://justicehubai.vercel.app/',
githubUrl: 'https://github.com/paras202/justicehub-ai',
technologies: [
'Next.js', 
'TypeScript', 
'Tailwind CSS', 
'FastAPI (Python)', 
'InstructorXL (Hugging Face)', 
'Clerk Authentication', 
'PostgreSQL (Neon DB)', 
'Drizzle ORM', 
'Google Gemini API', 
'LangChain', 
'PDFPlumber', 
'Vercel'
],
featured: true,
overview: 'JusticeHub AI is an AI-powered legal web platform that empowers individuals with legal knowledge and tools. It combines document analysis using NLP, an AI chatbot for Indian law queries, and a professional lawyer directory with chat features – offering an end-to-end legal support system for users.',
keyFeatures: [
'Know Your Rights Chatbot using Google Gemini API for Indian law queries',
'PDF-based Document Analyzer using InstructorXL model & PDFPlumber',
'Role-based secure user authentication with Clerk',
'PostgreSQL DB managed via Drizzle ORM (hosted on Neon)',
'Lawyer directory with specialization, ratings, pricing & consultation info',
'Mobile-friendly, responsive UI with Tailwind CSS and Next.js'
],
challenges: 'Integrating LLMs (Google Gemini & InstructorXL) and optimizing for both performance and user privacy presented challenges, especially with document parsing and vector search. Managing multi-role access and maintaining clean API structure across a Python backend and TypeScript frontend required strong modularity.',
outcome: 'JusticeHub AI is a successful demonstration of how modern AI and full-stack technologies can simplify legal access. It showcases advanced AI integrations, scalable frontend/backend architecture, and a practical application with real-world use in the legal domain.',
stats: {
stars: 24,
forks: 11,
views: 512
}
},
{
id: 'explore-ease',
title: 'Explore Ease - Travel & Tourism Platform',
shortDescription: 'Revolutionary travel planning and booking platform',
date: 'November 24, 2024',
category: 'Full Stack Web Application',
image: '/images/explore-ease-preview.png',
placeholder: 'https://via.placeholder.com/800x450/3B82F6/FFFFFF?text=Explore+Ease',
liveUrl: 'http://explorease-travel.vercel.app/',
githubUrl: 'https://github.com/paras202/explore-ease',
technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'Travel Advisor API', 'Leaflet Maps', 'Vercel'],
featured: true,
overview: 'Explore Ease is an innovative Travel and Tourism Web Application designed to revolutionize the way tourists explore, plan, and book their trips. This comprehensive platform provides a seamless user experience across all devices while offering a complete solution for modern travel needs.',
keyFeatures: [
    'Interactive Map Integration with Leaflet maps for visual location browsing',
    'Real-time Travel Data integration using Travel Advisor API',
    'Responsive Design with mobile-first approach',
    'Comprehensive Travel Planning and booking management',
    'Performance Optimization with Next.js server-side rendering'
],
challenges: 'Integrating multiple APIs while maintaining optimal performance required implementing efficient data fetching strategies and caching mechanisms. Ensuring responsive design across devices while maintaining rich map functionality presented unique technical challenges solved through careful component architecture.',
outcome: 'Successfully demonstrates practical application of modern web development technologies, providing users with an intuitive travel planning experience while showcasing proficiency in full-stack development and API integration.',
stats: {
    stars: 15,
    forks: 8,
    views: 234
}
},
{
id: 'weather-app',
title: 'Advanced Weather Application',
shortDescription: 'Real-time weather app with beautiful UI and PWA features',
date: 'October 15, 2024',
category: 'Progressive Web App',
image: '/images/weather-app-preview.png',
placeholder: 'https://via.placeholder.com/800x450/10B981/FFFFFF?text=Weather+App',
liveUrl: 'https://weather-app-1131.netlify.app/',
githubUrl: 'https://github.com/paras202/weather-app',
technologies: ['JavaScript', 'Weather API', 'Service Workers', 'CSS3', 'HTML5', 'Responsive Design'],
featured: true,
overview: 'A sophisticated weather application that provides real-time weather information with an intuitive user interface. Built as a Progressive Web App (PWA) for offline functionality and native app-like experience.',
keyFeatures: [
    'Real-time weather data from multiple APIs',
    'Location-based weather detection',
    '5-day weather forecast with detailed metrics',
    'PWA functionality for offline access',
    'Responsive design optimized for all devices',
    'Beautiful weather animations and transitions'
],
challenges: 'Handling multiple weather API integrations while ensuring data accuracy and implementing PWA features for offline functionality. Creating smooth animations that work across different devices while maintaining performance.',
outcome: 'Created a highly functional weather application that serves as a PWA with excellent user experience, demonstrating expertise in API integration and modern web technologies.',
stats: {
    stars: 12,
    forks: 6,
    views: 189
}
},
{
id: 'fit-suratgarh',
title: 'Fit Suratgarh - Fitness Center Website',
shortDescription: 'Modern fitness center website with membership management',
date: 'September 10, 2024',
category: 'Business Website',
image: '/images/fit-suratgarh-preview.png',
placeholder: 'https://via.placeholder.com/800x450/EF4444/FFFFFF?text=Fit+Suratgarh',
liveUrl: 'https://paras202.github.io/Fit_suratgarh/',
githubUrl: 'https://github.com/paras202/Fit_suratgarh',
technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'jQuery', 'Responsive Design'],
featured: false,
overview: 'A comprehensive fitness center website designed to attract and engage potential members while providing existing members with essential information about classes, trainers, and facilities.',
keyFeatures: [
    'Interactive class scheduling system',
    'Trainer profiles and specializations',
    'Membership plans and pricing display',
    'Contact forms and location integration',
    'Photo galleries of facilities and equipment',
    'Mobile-responsive design for all devices'
],
challenges: 'Creating an engaging visual design that motivates visitors while ensuring all information is easily accessible. Implementing interactive elements without compromising page load speed.',
outcome: 'Delivered a professional fitness center website that effectively showcases services and facilities, resulting in increased member inquiries and improved online presence.',
stats: {
    stars: 8,
    forks: 4,
    views: 156
}
}
]

const githubStats = {
totalRepos: 24,
totalStars: 89,
totalForks: 34,
contributions: 247,
languages: ['JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS', 'C++']
}

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

function AnimatedSection({ children, className = '' }: { children: React.ReactNode, className?: string }) {
return (
<motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
    className={className}
>
    {children}
</motion.div>
)
}

// Image component with fallback
function ProjectImage({ project, className = '' }: { project: ProjectType, className?: string }) {
const [imgError, setImgError] = useState(false)
const [imgLoaded, setImgLoaded] = useState(false)

return (
<div className={`relative ${className}`}>
    {!imgLoaded && (
    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 animate-pulse rounded-2xl" />
    )}
    <Image
    src={imgError ? project.placeholder : project.image}
    alt={project.title}
    fill
    className={`object-cover rounded-2xl transition-opacity duration-300 ${
        imgLoaded ? 'opacity-100' : 'opacity-0'
    }`}
    onError={() => setImgError(true)}
    onLoad={() => setImgLoaded(true)}
    />
</div>
)
}

function ProjectCarousel() {
const [currentProject, setCurrentProject] = useState(0)
const [isAutoPlaying, setIsAutoPlaying] = useState(true)

useEffect(() => {
if (isAutoPlaying) {
    const interval = setInterval(() => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
    }, 8000)
    return () => clearInterval(interval)
}
}, [isAutoPlaying])

const nextProject = () => {
setCurrentProject((prev) => (prev + 1) % projects.length)
setIsAutoPlaying(false)
}

const prevProject = () => {
setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
setIsAutoPlaying(false)
}

const project = projects[currentProject]

return (
<div className="relative">
    <AnimatePresence mode="wait">
    <motion.div
        key={currentProject}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
    >
          {/* Project Image - Larger space */}
        <div className="relative group">
        <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900">
            <ProjectImage project={project} className="w-full h-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Floating stats overlay */}
        <div className="absolute bottom-6 left-6 flex items-center gap-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
            <div className="flex items-center text-sm font-medium">
            <Star className="h-4 w-4 mr-1 text-yellow-500" />
            {project.stats.stars}
            </div>
            <div className="flex items-center text-sm font-medium">
            <GitFork className="h-4 w-4 mr-1 text-blue-500" />
            {project.stats.forks}
            </div>
            <div className="flex items-center text-sm font-medium">
            <Eye className="h-4 w-4 mr-1 text-green-500" />
            {project.stats.views}
            </div>
        </div>
        </div>

        {/* Project Details */}
        <div className="space-y-6">
        <div>
            <Badge className="mb-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            {project.category}
            </Badge>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {project.title}
            </h3>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{project.date}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
            {project.overview}
            </p>
        </div>

        <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features</h4>
            <ul className="space-y-2">
            {project.keyFeatures.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start text-gray-600 dark:text-gray-300">
                <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <span className="leading-relaxed">{feature}</span>
                </li>
            ))}
            </ul>
        </div>

        <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 6).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
                {tech}
            </Badge>
            ))}
        </div>
        

        {/* <div className="flex items-center gap-4">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Star className="h-4 w-4 mr-1 text-yellow-500" />
            {project.stats.stars}
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <GitFork className="h-4 w-4 mr-1 text-blue-500" />
            {project.stats.forks}
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Eye className="h-4 w-4 mr-1 text-green-500" />
            {project.stats.views}
            </div>
        </div>
         */}

        <div className="flex gap-4">
            <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
            <Link href={project.liveUrl} target="_blank">
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Demo
            </Link>
            </Button>
            <Button asChild variant="outline">
            <Link href={project.githubUrl} target="_blank">
                <Github className="h-4 w-4 mr-2" />
                Source Code
            </Link>
            </Button>
            <Button variant="ghost" asChild>
            <Link href={`/projects/${project.id}`}>
                View Details
            </Link>
            </Button>
        </div>
        
        </div>
    </motion.div>
    </AnimatePresence>

    {/* Navigation */}
    <div className="flex items-center justify-between mt-8">
    <Button
        variant="outline"
        size="sm"
        onClick={prevProject}
        className="rounded-full p-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200 dark:border-purple-700"
    >
        <ChevronLeft className="h-5 w-5 text-purple-600 dark:text-purple-400" />
    </Button>

    <div className="flex gap-2">
        {projects.map((_, index) => (
        <button
            key={index}
            onClick={() => {
            setCurrentProject(index)
            setIsAutoPlaying(false)
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === currentProject
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 w-8'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
        />
        ))}
    </div>

    <Button
        variant="outline"
        size="sm"
        onClick={nextProject}
        className="rounded-full p-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200 dark:border-purple-700"
    >
        <ChevronRight className="h-5 w-5 text-purple-600 dark:text-purple-400" />
    </Button>
    </div>
{/* 
    <div className="mt-6 text-center">
    <span className="text-sm text-gray-500 dark:text-gray-400">
        {currentProject + 1} of {projects.length} Featured Projects
    </span>
    </div> */}
</div>
)
}

export default function WorkPage() {
return (
<div className="min-h-screen pt-20">
    {/* Hero Section */}
    <section className="py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
        >
            <Badge className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2">
            Portfolio Showcase
            </Badge>
        </motion.div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Work</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of projects that showcase my expertise in modern web development, 
            from concept to deployment. Each project represents a unique challenge and learning experience.
        </p>
        </AnimatedSection>

        {/* GitHub Stats */}
        <AnimatedSection className="mb-30">
        <Card className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-xl border-0">
            <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center text-2xl font-bold text-gray-900 dark:text-white">
                <Github className="h-6 w-6 mr-2" />
                GitHub Activity
            </CardTitle>
            <CardDescription>
                My development journey in numbers
            </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {githubStats.totalRepos}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Repositories</div>
                </div>
                <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                    {githubStats.totalStars}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Stars Received</div>
                </div>
                <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {githubStats.totalForks}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Forks</div>
                </div>
                <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {githubStats.contributions}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Contributions</div>
                </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-center text-sm font-medium text-gray-900 dark:text-white mb-4">
                Primary Technologies
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                {githubStats.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-xs">
                    {lang}
                    </Badge>
                ))}
                </div>
            </div>
            </CardContent>
        </Card>
        </AnimatedSection>

        {/* Featured Projects Carousel */}
        <AnimatedSection className="mb-30">
        <div className="text-center mb-12 ">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Detailed case studies of my most impactful projects, showcasing problem-solving approach and technical expertise.
            </p>
        </div>
        <ProjectCarousel />
        </AnimatedSection>

        {/* All Projects Grid */}
        <AnimatedSection>
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">All Projects</h2>
            <p className="text-gray-600 dark:text-gray-300">
            Complete overview of my development portfolio
            </p>
        </div>
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
                <CardHeader>
                    <div className="aspect-video rounded-lg overflow-hidden mb-4 relative">
                    <ProjectImage project={project} className="w-full h-full" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                        {project.category}
                    </Badge>
                    {project.featured && (
                        <Badge className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        Featured
                        </Badge>
                    )}
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                    {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300 line-clamp-3">
                    {project.shortDescription}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                        {project.stats.stars}
                        </div>
                        <div className="flex items-center">
                        <GitFork className="h-3 w-3 mr-1 text-blue-500" />
                        {project.stats.forks}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {project.date.split(' ').slice(0, 2).join(' ')}
                    </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                        </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3}
                        </Badge>
                    )}
                    </div>
                    <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                        <Link href={project.liveUrl} target="_blank">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Live
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="flex-1">
                        <Link href={project.githubUrl} target="_blank">
                        <Github className="h-3 w-3 mr-1" />
                        Code
                        </Link>
                    </Button>
                    </div>
                </CardContent>
                </Card>
            </motion.div>
            ))}
        </motion.div>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection className="mt-20 text-center">
        <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-2xl border-0">
            <CardContent className="p-12">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
                Let&apos;s collaborate to bring your ideas to life with cutting-edge web technologies 
                and exceptional user experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Link href="https://wa.me/919469527525">
                    <Users className="h-5 w-5 mr-2" />
                    Let&apos;s Collaborate
                </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="#contact">
                    View All Projects
                </Link>
                </Button>
            </div>
            </CardContent>
        </Card>
        </AnimatedSection>
    </div>
    </section>
</div>
)
}