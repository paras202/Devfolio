'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Home,
  User,
  Briefcase,
  Mail,
  Code,
  CloudRain,
  PenTool,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// Navigation items with both pages and sections
type NavItem = {
  name: string
  href: string
  icon: React.ElementType
  type: 'page' | 'section'
  sections?: {
    name: string
    href: string
    icon: React.ElementType
  }[]
}

const navigationItems: NavItem[] = [
  { 
    name: 'Home', 
    href: '/', 
    icon: Home, 
    type: 'page',
    sections: [
      { name: 'About', href: '#about', icon: User },
      { name: 'Projects', href: '#projects', icon: Briefcase },
      { name: 'Contact', href: '#contact', icon: Mail },
    ]
  },
  { name: 'Work', href: '/work', icon: Briefcase, type: 'page' },
  { name: 'Weather', href: '/weather', icon: CloudRain, type: 'page' },
  { name: 'About', href: '/about', icon: User, type: 'page' },
  { name: 'Blog', href: '/blog', icon: PenTool, type: 'page' },
]


export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showHomeDropdown, setShowHomeDropdown] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if we're on home page
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Only track sections if we're on the home page
      if (isHomePage) {
        const sections = ['home', 'about', 'projects', 'contact']
        const current = sections.find(section => {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            return rect.top <= 100 && rect.bottom >= 100
          }
          return false
        })
        
        if (current) {
          setActiveSection(current)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setShowHomeDropdown(false)
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleNavClick = (href: string, type: 'page' | 'section') => {
    if (type === 'page') {
      // Navigate to page
      router.push(href)
    } else {
      // Handle section navigation
      if (pathname !== '/') {
        // If not on home page, navigate to home first then scroll
        router.push(`/${href}`)
      } else {
        // Already on home page, just scroll
        const element = document.getElementById(href.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
    closeMobileMenu()
  }

  const isActiveItem = (item: NavItem) => {
    if (item.type === 'page') {
      if (item.href === '/') {
        return pathname === '/'
      }
      return pathname.startsWith(item.href)
    }
    return false
  }

  const isActiveSectionItem = (href: string) => {
    return isHomePage && activeSection === href.substring(1)
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20' 
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/" 
                className="flex items-center space-x-2 text-2xl font-bold text-gray-900 dark:text-white"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <span className="gradient-text">Paras</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative">
                  {/* Main Navigation Item */}
                  {item.name === 'Home' ? (
                    <div 
                      className="relative"
                      onMouseEnter={() => setShowHomeDropdown(true)}
                      onMouseLeave={() => setShowHomeDropdown(false)}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                          isActiveItem(item)
                            ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                            : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                        <ChevronDown className="h-3 w-3" />
                      </Link>
                      
                      {/* Home Dropdown */}
                      <AnimatePresence>
                        {showHomeDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2"
                          >
                            {item.sections?.map((section) => (
                              <button
                                key={section.name}
                                onClick={() => handleNavClick(section.href, 'section')}
                                className={`w-full flex items-center space-x-2 px-4 py-2 text-sm transition-colors duration-200 ${
                                  isActiveSectionItem(section.href)
                                    ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                              >
                                <section.icon className="h-4 w-4" />
                                <span>{section.name}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                        isActiveItem(item)
                          ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700" />
                )}
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={closeMobileMenu}
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-white dark:bg-gray-900 shadow-xl md:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <Link 
                    href="/" 
                    className="flex items-center space-x-2 text-xl font-bold"
                    onClick={closeMobileMenu}
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <Code className="h-4 w-4 text-white" />
                    </div>
                    <span className="gradient-text">Paras Singla</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeMobileMenu}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 py-6">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Main Item */}
                      <div className="mb-2">
                        {item.name === 'Home' ? (
                          <div>
                            <button
                              onClick={() => setShowHomeDropdown(!showHomeDropdown)}
                              className={`w-full flex items-center justify-between px-6 py-4 text-base font-medium transition-colors duration-200 ${
                                isActiveItem(item)
                                  ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                                  : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <item.icon className="h-5 w-5" />
                                <span>{item.name}</span>
                              </div>
                              <ChevronDown className={`h-4 w-4 transform transition-transform ${showHomeDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {/* Home Sections */}
                            <AnimatePresence>
                              {showHomeDropdown && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="bg-gray-50 dark:bg-gray-800/50 ml-6 mr-2 rounded-lg overflow-hidden"
                                >
                                  {item.sections?.map((section) => (
                                    <button
                                      key={section.name}
                                      onClick={() => handleNavClick(section.href, 'section')}
                                      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm transition-colors duration-200 ${
                                        isActiveSectionItem(section.href)
                                          ? 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30'
                                          : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                      }`}
                                    >
                                      <section.icon className="h-4 w-4" />
                                      <span>{section.name}</span>
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={closeMobileMenu}
                            className={`flex items-center space-x-3 px-6 py-4 text-base font-medium transition-colors duration-200 ${
                              isActiveItem(item)
                                ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-r-2 border-purple-600'
                                : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.name}</span>
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center space-x-4">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link href="https://wa.me/919469527525">
                        Hire Me
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link href="/files/Paras_Singla_cv.pdf" download>
                        Download CV
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}