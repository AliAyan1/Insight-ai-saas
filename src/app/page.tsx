// File: app/page.tsx (CORRECTED VERSION)

"use client";

import { LandingHeader } from "@/app/components/landing/header"
import { LandingFooter } from "@/app/components/landing/footer"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileUp, Bot, ArrowRight, Sparkles, CheckCircle, BarChart, Shield, TrendingUp, Zap, Play } from "lucide-react";

export default function LandingPage() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-x-hidden">
      <LandingHeader />

      <main className="flex-grow">
        {/* === HERO SECTION === */}
        <section className="relative text-center py-16 sm:py-20 lg:py-32 xl:py-40 px-4 overflow-hidden">
          {/* Animated background with floating elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-purple-50/80">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-2xl animate-bounce"></div>
          </div>
          
          <div className="container mx-auto relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 rounded-full text-sm font-medium text-blue-700 mb-8 shadow-lg backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              AI-Powered Data Analysis Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter mb-6">
              From Raw Data to 
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                Actionable Insights
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-700 mt-2">
                in Seconds.
              </span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              InsightAI is your personal AI data analyst. Securely upload your business data and get back a 
              <span className="font-semibold text-gray-800"> comprehensive report</span> with quality checks, 
              key trends, and actionable suggestions—
              <span className="font-semibold text-blue-600"> no expertise required.</span>
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-lg font-bold py-4 px-8 rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 border-0">
                  <Zap className="w-5 h-5 mr-2" />
                  Get Your Free Analysis
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              {/* Demo button */}
             
            </div>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </section>

        {/* === FEATURES SECTION === */}
        <section id="features" className="py-16 sm:py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50/50 px-4 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>
          
          <div className="container mx-auto text-center relative z-10">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full text-sm font-medium text-blue-700 mb-6">
              <BarChart className="w-4 h-4 mr-2" />
              How It Works
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight text-gray-900 mb-6">
              Simple. Powerful. 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Intelligent.
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-16">
              Transform your data into insights with our streamlined three-step process designed for everyone.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-16">
              {/* Feature 1 */}
              <div className="group relative">
                <div className="flex flex-col items-center p-8 lg:p-10 border-2 border-gray-100 rounded-3xl bg-white hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
                  <div className="relative mb-8">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300 shadow-lg">
                      <FileUp className="h-10 w-10 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                    Upload Your CSV
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center">
                    Securely drag and drop or select your sales, marketing, or operational data file. We support various CSV formats.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative">
                <div className="flex flex-col items-center p-8 lg:p-10 border-2 border-gray-100 rounded-3xl bg-white hover:border-purple-200 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2">
                  <div className="relative mb-8">
                    <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl group-hover:from-purple-100 group-hover:to-purple-200 transition-all duration-300 shadow-lg">
                      <Bot className="h-10 w-10 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors">
                    AI Performs Analysis
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center">
                    Our advanced AI consultant checks for data quality, finds hidden patterns, and prepares a comprehensive report in seconds.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative">
                <div className="flex flex-col items-center p-8 lg:p-10 border-2 border-gray-100 rounded-3xl bg-white hover:border-green-200 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-2">
                  <div className="relative mb-8">
                    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl group-hover:from-green-100 group-hover:to-green-200 transition-all duration-300 shadow-lg">
                      <TrendingUp className="h-10 w-10 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors">
                    Receive Actionable Insights
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center">
                    Get a clear summary with visual charts and actionable recommendations you can implement immediately to grow your business.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional benefits */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4">
                <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-purple-600 mb-2">&lt;30s</div>
                <div className="text-sm text-gray-600">Processing Time</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
                <div className="text-sm text-gray-600">Files Analyzed</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-pink-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* === CALL TO ACTION SECTION === */}
        <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-400/15 rounded-full blur-2xl animate-bounce"></div>
          </div>

          <div className="container mx-auto py-20 lg:py-32 px-4 text-center relative z-10">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white mb-8">
              <Shield className="w-4 h-4 mr-2" />
              Trusted by thousands of businesses
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white mb-8">
              Ready to Unlock Your 
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Data's Potential?
              </span>
            </h2>

            <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-blue-100 max-w-4xl mx-auto mb-12">
              Stop guessing and start making data-driven decisions. Transform your raw data into powerful insights that drive real business growth. Your first analysis is completely free.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-white text-gray-900 text-lg font-bold py-6 px-10 rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/25">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Your Free Analysis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <div className="text-white/80 text-sm">
                <div className="flex items-center justify-center space-x-4">
                  <span>✓ No setup required</span>
                  <span>✓ Instant results</span>
                  <span>✓ Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Social proof */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-white text-sm">★★★★★ Rated 4.9/5 by users</div>
              <div className="text-white text-sm">🏆 #1 AI Analytics Tool 2024</div>
              <div className="text-white text-sm">🔒 SOC 2 Type II Certified</div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
      
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 group z-50"
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
    </div>
  );
}