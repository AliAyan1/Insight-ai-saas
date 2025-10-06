// File: components/landing/Footer.tsx

import Link from "next/link";
import { Brain, Twitter, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react";

export function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  InsightAI
                </h2>
                <p className="text-xs text-gray-400">Intelligent Analytics</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-sm">
              Transform your data into actionable insights with our AI-powered analytics platform. 
              Built for modern businesses that value data-driven decisions.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://twitter.com" 
                className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link 
                href="https://linkedin.com" 
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link 
                href="https://github.com" 
                className="w-10 h-10 bg-gray-800 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="View our GitHub"
              >
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/integrations" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  What's New
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/docs" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <Link href="mailto:hello@insightai.com" className="hover:text-purple-400 transition-colors">
                    hello@insightai.com
                  </Link>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <Link href="tel:+1-555-123-4567" className="hover:text-blue-400 transition-colors">
                    +1 (555) 123-4567
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Office</p>
                  <p className="text-sm">San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-white mb-3">Stay Updated</h4>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <p>&copy; {currentYear} InsightAI Technologies. All rights reserved.</p>
              <div className="flex items-center space-x-1">
               
                <span className="text-red-400 animate-pulse"></span>
               
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link 
                href="/privacy" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link 
                href="/cookies" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 group"
        aria-label="Back to top"
      >
        <svg 
          className="w-5 h-5 text-white group-hover:translate-y-[-2px] transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
}