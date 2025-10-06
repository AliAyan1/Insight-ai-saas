// File: app/dashboard/page.tsx (FINAL, 100% WORKING VERSION)

"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  Upload, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  LogOut, 
  Sparkles, 
  Loader2,
  Download,
  Eye,
  Zap,
  Brain,
  Target
} from "lucide-react";
import { AiChart } from "@/app/components/chart"

// Define the structure of the AI's response
interface AnalysisResponse {
  report: string;
  chart: {
    type: 'bar' | 'line' | 'pie';
    data: { name: string; value: number }[];
  };
  correctedData: Record<string, any>[];
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    if (e.target.files && e.target.files.length > 0) { 
      setFile(e.target.files[0]); 
      setAnalysisResult(null); 
    } 
  };

  const handleDrop = (e: React.DragEvent) => { 
    e.preventDefault(); 
    setDragActive(false); 
    if (e.dataTransfer.files && e.dataTransfer.files[0]) { 
      const droppedFile = e.dataTransfer.files[0]; 
      if (droppedFile.type === "text/csv" || droppedFile.name.endsWith('.csv')) { 
        setFile(droppedFile); 
        setAnalysisResult(null); 
      } else { 
        toast.error("Please upload a CSV file only."); 
      } 
    } 
  };

  const handleDrag = (e: React.DragEvent) => { 
    e.preventDefault(); 
    e.stopPropagation(); 
    if (e.type === "dragenter" || e.type === "dragover") { 
      setDragActive(true); 
    } else if (e.type === "dragleave") { 
      setDragActive(false); 
    } 
  };

  const handleUploadAndAnalyze = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }
    setIsProcessing(true);
    setAnalysisResult(null);
    const toastId = toast.loading("Step 1: Uploading your file...");

    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const uploadResult = await uploadResponse.json();
      if (!uploadResponse.ok) throw new Error(uploadResult.message || "Upload failed.");
      
      toast.loading("Step 2: Performing AI analysis & data correction...", { id: toastId });

      const analysisResponse = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ records: uploadResult.data }),
      });

      const analysisData: AnalysisResponse = await analysisResponse.json();
      if (!analysisResponse.ok) throw new Error((analysisData as any).message || "AI analysis failed.");

      // YEH LINE SAB SE ZAROORI HAI: Data ko state mein save karna takeh UI update ho
      setAnalysisResult(analysisData);
      toast.success("Analysis complete!", { id: toastId });

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  if (status === "loading" || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="text-center space-y-4">
          <div className="relative">
            <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto" />
            <div className="absolute inset-0 h-12 w-12 bg-purple-600/20 rounded-full animate-ping mx-auto"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  InsightAI 
                </h1>
                <p className="text-xs text-gray-500">Intelligent Analytics</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-green-50 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">Online</span>
              </div>
              
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {session.user?.name?.split(' ')[0] || 'User'}
              </span>
              ! 👋
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Transform your data with AI-powered analytics and insights. Upload your CSV files and let our intelligent system do the magic.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          <div className="xl:col-span-2 space-y-8">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50/50 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500"></div>
              
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  <span>Upload & Analyze Data</span>
                </CardTitle>
                <CardDescription className="text-base">
                  Drop your CSV file here or click to browse. Our AI will automatically clean, analyze, and visualize your data.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div
                  onDrop={handleDrop} onDragOver={handleDrag} onDragEnter={handleDrag} onDragLeave={handleDrag}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02] ${dragActive ? 'border-purple-500 bg-purple-50 shadow-lg' : file ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50/50'}`}
                >
                  <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
                  <div className="space-y-4">
                    {file ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto"><FileText className="w-8 h-8 text-green-600" /></div>
                        <h3 className="text-lg font-semibold text-green-700">File Ready!</h3>
                        <p className="text-green-600 font-medium">{file.name}</p>
                        <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB • CSV File</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto"><Upload className="w-8 h-8 text-gray-400" /></div>
                        <h3 className="text-lg font-semibold text-gray-700">{dragActive ? "Drop your file here" : "Choose a CSV file"}</h3>
                        <p className="text-gray-500">Drag and drop your CSV file here, or click to browse</p>
                        <p className="text-xs text-gray-400">Maximum file size: 10MB</p>
                      </div>
                    )}
                  </div>
                </div>

                <Button onClick={handleUploadAndAnalyze} disabled={!file || isProcessing} className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50">
                  {isProcessing ? (<div className="flex items-center justify-center space-x-2"><Loader2 className="w-5 h-5 animate-spin" /><span>Analyzing Data...</span></div>) : (<div className="flex items-center justify-center space-x-2"><Zap className="w-5 h-5" /><span>Analyze with AI</span></div>)}
                </Button>
              </CardContent>
            </Card>

            {/* === YEH SECTION AB BILKUL THEEK NAZAR AAYEGA === */}
            {analysisResult && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-purple-50/30 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"><Sparkles className="w-5 h-5 text-white" /></div>
                      <span>AI Analysis & Insights</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center space-x-2"><BarChart3 className="w-5 h-5 text-blue-600" /><span>Smart Visualization</span></h3>
                      <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100"><AiChart type={analysisResult.chart.type} data={analysisResult.chart.data} /></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center space-x-2"><Eye className="w-5 h-5 text-purple-600" /><span>Generated Report</span></h3>
                      <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-headings:text-gray-700 prose-li:my-1 p-6 bg-white rounded-xl shadow-sm border border-gray-100" dangerouslySetInnerHTML={{ __html: analysisResult.report.replace(/### (.*?)\n/g, '<h4 class="text-purple-700 font-semibold">$1</h4>').replace(/- (.*?)\n/g, '<li>$1</li>') }} />
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/30 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg"><FileText className="w-5 h-5 text-white" /></div>
                      <span>Cleaned Data Preview</span>
                    </CardTitle>
                    <CardDescription className="flex items-center justify-between"><span>AI-corrected version of your dataset</span><Button variant="outline" size="sm" className="hidden sm:flex"><Download className="w-4 h-4 mr-2" />Export</Button></CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gradient-to-r from-gray-50 to-blue-50"><tr>{analysisResult.correctedData.length > 0 && Object.keys(analysisResult.correctedData[0]).map(header => (<th key={header} className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">{header}</th>))}</tr></thead>
                          <tbody className="divide-y divide-gray-100">{analysisResult.correctedData.slice(0, 10).map((row, rowIndex) => (<tr key={rowIndex} className="bg-white hover:bg-blue-50/50 transition-colors duration-150">{Object.values(row).map((cell, cellIndex) => (<td key={cellIndex} className="px-4 py-3 text-gray-700 whitespace-nowrap">{String(cell)}</td>))}</tr>))}</tbody>
                        </table>
                      </div>
                      {analysisResult.correctedData.length > 10 && (<div className="px-4 py-3 bg-gray-50 text-center text-sm text-gray-500">Showing 10 of {analysisResult.correctedData.length} rows</div>)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
          <div className="xl:col-span-1 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-purple-100 text-sm font-medium">Files Analyzed</p><p className="text-2xl font-bold">247</p></div><Target className="w-8 h-8 text-purple-200" /></div></CardContent></Card>
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-blue-100 text-sm font-medium">Data Points</p><p className="text-2xl font-bold">1.2M+</p></div><TrendingUp className="w-8 h-8 text-blue-200" /></div></CardContent></Card>
            </div>
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50"><CardHeader><CardTitle className="flex items-center space-x-2 text-lg"><Sparkles className="w-5 h-5 text-purple-600" /><span>AI Features</span></CardTitle></CardHeader><CardContent className="space-y-4"><div className="space-y-3"><div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50"><div className="w-2 h-2 bg-purple-500 rounded-full"></div><span className="text-sm font-medium text-purple-700">Smart Data Cleaning</span></div><div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50"><div className="w-2 h-2 bg-blue-500 rounded-full"></div><span className="text-sm font-medium text-blue-700">Automated Analysis</span></div><div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50"><div className="w-2 h-2 bg-green-500 rounded-full"></div><span className="text-sm font-medium text-green-700">Intelligent Insights</span></div><div className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50"><div className="w-2 h-2 bg-orange-500 rounded-full"></div><span className="text-sm font-medium text-orange-700">Visual Charts</span></div></div></CardContent></Card>
            <Card className="shadow-lg border-0 bg-gradient-to-br from-amber-50 to-orange-50"><CardHeader><CardTitle className="flex items-center space-x-2 text-lg text-amber-800"><div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center"><span className="text-xs text-white font-bold">!</span></div><span>Pro Tips</span></CardTitle></CardHeader><CardContent className="space-y-3 text-sm text-amber-700"><p>• Use column headers for better analysis</p><p>• Clean data gets better insights</p><p>• Try different CSV formats</p><p>• Export results for future use</p></CardContent></Card>
          </div>
        </div>
      </main>
    </div>
  );
}