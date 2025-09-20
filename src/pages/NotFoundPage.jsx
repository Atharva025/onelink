import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-parchment flex items-center justify-center px-4 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-16 w-6 h-6 bg-verdigris border border-ink shadow-sharp-sm rotate-45"></div>
                <div className="absolute top-40 right-20 w-4 h-4 bg-ink border border-charcoal shadow-sharp-sm"></div>
                <div className="absolute bottom-40 left-20 w-5 h-5 bg-sienna border border-ink shadow-sharp-sm rotate-45"></div>
                <div className="absolute bottom-20 right-16 w-3 h-3 bg-verdigris border border-ink shadow-sharp-sm"></div>
                <div className="absolute top-1/2 left-1/4 w-8 h-8 border-2 border-ink opacity-30 rotate-45"></div>
                <div className="absolute top-1/3 right-1/3 w-6 h-6 border-2 border-verdigris opacity-30"></div>
            </div>

            <div className="text-center max-w-2xl mx-auto relative z-10">
                {/* Large 404 with decorative elements */}
                <div className="mb-12 relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <div className="w-64 h-64 border-4 border-ink rotate-45"></div>
                    </div>
                    <h1 className="text-9xl md:text-[12rem] font-serif font-bold text-charcoal relative z-10 leading-none">
                        404
                    </h1>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-verdigris"></div>
                </div>

                {/* Main content card */}
                <div className="bg-parchment border-2 border-ink shadow-sharp p-12 relative overflow-hidden group hover:shadow-sharp-sm transition-all duration-150 ease-mechanical">
                    {/* Background accent */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-b-[40px] border-b-sienna opacity-20"></div>

                    <div className="w-16 h-16 bg-sienna border-2 border-ink shadow-sharp flex items-center justify-center mx-auto mb-8">
                        <span className="text-parchment font-serif font-bold text-2xl">!</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6 relative">
                        Page Not Found
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-sienna"></div>
                    </h2>

                    <p className="text-xl font-mono text-ink mb-10 max-w-lg mx-auto leading-relaxed">
                        The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                        <Link to="/" className="group">
                            <Button
                                size="large"
                                className="transform transition-all duration-150 ease-mechanical group-hover:scale-105"
                            >
                                🏠 Go Home
                            </Button>
                        </Link>

                        <Button
                            variant="outline"
                            size="large"
                            className="transform transition-all duration-150 ease-mechanical hover:scale-105"
                            onClick={() => window.history.back()}
                        >
                            ← Go Back
                        </Button>
                    </div>

                    <div className="flex items-center justify-center space-x-4 text-ink font-mono text-sm">
                        <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-verdigris rounded-full"></span>
                            <span>Need help?</span>
                        </div>
                        <span className="opacity-50">•</span>
                        <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-verdigris rounded-full"></span>
                            <span className="hover:text-verdigris transition-colors duration-150 cursor-pointer">Contact support</span>
                        </div>
                    </div>
                </div>

                {/* Footer message */}
                <div className="mt-12 text-center">
                    <div className="flex items-center justify-center space-x-4">
                        <div className="w-2 h-2 bg-verdigris rotate-45"></div>
                        <p className="font-mono text-ink">
                            © 2025 OneLink. Every link tells a story.
                        </p>
                        <div className="w-2 h-2 bg-verdigris rotate-45"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage