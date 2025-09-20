import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button'
import { useAuth } from '../contexts/AuthContext'

const HomePage = () => {
    const { user } = useAuth()

    return (
        <div className="min-h-screen bg-parchment relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 w-4 h-4 bg-verdigris border border-ink shadow-sharp-sm rotate-45 transform"></div>
                <div className="absolute top-40 right-20 w-6 h-6 bg-ink border border-charcoal shadow-sharp-sm"></div>
                <div className="absolute top-96 left-1/4 w-3 h-3 bg-sienna border border-ink shadow-sharp-sm rotate-45"></div>
                <div className="absolute bottom-96 right-1/3 w-5 h-5 bg-verdigris border border-ink shadow-sharp-sm"></div>
                <div className="absolute bottom-40 left-16 w-4 h-4 bg-ink border border-charcoal shadow-sharp-sm rotate-45"></div>
            </div>

            {/* Header */}
            <header className="bg-parchment border-b border-ink shadow-sharp-sm relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center group">
                            <div className="w-10 h-10 bg-verdigris border border-ink shadow-sharp-sm flex items-center justify-center mr-4 transition-all duration-150 ease-mechanical group-hover:shadow-sharp">
                                <span className="text-parchment font-serif font-bold text-lg">OL</span>
                            </div>
                            <h1 className="text-2xl font-serif font-bold text-charcoal">OneLink</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            {user ? (
                                <Link to="/admin" className="transition-transform duration-150 ease-mechanical hover:scale-105">
                                    <Button>Dashboard</Button>
                                </Link>
                            ) : (
                                <Link to="/auth" className="transition-transform duration-150 ease-mechanical hover:scale-105">
                                    <Button>Sign In</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="text-center relative">
                    {/* Background accent for hero text */}
                    <div className="absolute inset-0 flex justify-center items-center opacity-5">
                        <div className="w-96 h-96 border-4 border-verdigris rotate-45 transform"></div>
                    </div>

                    <div className="relative z-10">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-charcoal mb-8 leading-tight">
                            One Link.
                            <br />
                            <span className="text-verdigris relative">
                                All Your Content.
                                <div className="absolute -bottom-2 left-0 w-full h-1 bg-verdigris opacity-30 transform -rotate-1"></div>
                            </span>
                        </h1>

                        <div className="max-w-3xl mx-auto mb-12">
                            <p className="text-xl md:text-2xl font-mono text-ink leading-relaxed">
                                Create a beautiful, customizable page that houses all your links, content, and personality in one place.
                            </p>
                            <p className="text-lg font-mono text-ink opacity-80 mt-4">
                                Perfect for social media bios, business cards, and personal branding.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            {user ? (
                                <Link to="/admin" className="group">
                                    <Button size="large" className="transform transition-all duration-150 ease-mechanical group-hover:scale-105">
                                        Go to Your Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link to="/auth" className="group">
                                        <Button size="large" className="transform transition-all duration-150 ease-mechanical group-hover:scale-105">
                                            Get Started Free
                                        </Button>
                                    </Link>
                                    <Link to="/demo" className="group">
                                        <Button
                                            variant="outline"
                                            size="large"
                                            className="transform transition-all duration-150 ease-mechanical group-hover:scale-105"
                                        >
                                            👀 See Examples
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>

                        {!user && (
                            <div className="mt-6 flex items-center space-x-2 text-ink font-mono text-sm">
                                <span className="w-2 h-2 bg-verdigris rounded-full"></span>
                                <span>No credit card required</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-32 relative">
                    <div className="absolute inset-0 flex justify-center items-center opacity-5">
                        <div className="grid grid-cols-3 gap-8">
                            <div className="w-8 h-8 border-2 border-ink"></div>
                            <div className="w-8 h-8 border-2 border-verdigris rotate-45"></div>
                            <div className="w-8 h-8 border-2 border-sienna"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                        <div className="text-center group cursor-default">
                            <div className="w-20 h-20 bg-verdigris border-2 border-ink shadow-sharp flex items-center justify-center mx-auto mb-6 transition-all duration-150 ease-mechanical group-hover:shadow-sharp-sm group-hover:translate-x-1 group-hover:translate-y-1 relative overflow-hidden">
                                <span className="text-3xl relative z-10">🔗</span>
                                <div className="absolute inset-0 bg-ink opacity-0 group-hover:opacity-10 transition-opacity duration-150"></div>
                            </div>
                            <h3 className="text-2xl font-serif font-semibold text-charcoal mb-4 group-hover:text-verdigris transition-colors duration-150">
                                All Your Links
                            </h3>
                            <p className="font-mono text-ink text-lg leading-relaxed">
                                Organize all your important links in one beautiful, easy-to-navigate page.
                            </p>
                        </div>

                        <div className="text-center group cursor-default">
                            <div className="w-20 h-20 bg-verdigris border-2 border-ink shadow-sharp flex items-center justify-center mx-auto mb-6 transition-all duration-150 ease-mechanical group-hover:shadow-sharp-sm group-hover:translate-x-1 group-hover:translate-y-1 relative overflow-hidden">
                                <span className="text-3xl relative z-10">🎨</span>
                                <div className="absolute inset-0 bg-ink opacity-0 group-hover:opacity-10 transition-opacity duration-150"></div>
                            </div>
                            <h3 className="text-2xl font-serif font-semibold text-charcoal mb-4 group-hover:text-verdigris transition-colors duration-150">
                                Custom Design
                            </h3>
                            <p className="font-mono text-ink text-lg leading-relaxed">
                                Personalize your page with custom colors, themes, and layouts that match your brand.
                            </p>
                        </div>

                        <div className="text-center group cursor-default">
                            <div className="w-20 h-20 bg-verdigris border-2 border-ink shadow-sharp flex items-center justify-center mx-auto mb-6 transition-all duration-150 ease-mechanical group-hover:shadow-sharp-sm group-hover:translate-x-1 group-hover:translate-y-1 relative overflow-hidden">
                                <span className="text-3xl relative z-10">📊</span>
                                <div className="absolute inset-0 bg-ink opacity-0 group-hover:opacity-10 transition-opacity duration-150"></div>
                            </div>
                            <h3 className="text-2xl font-serif font-semibold text-charcoal mb-4 group-hover:text-verdigris transition-colors duration-150">
                                Rich Content
                            </h3>
                            <p className="font-mono text-ink text-lg leading-relaxed">
                                Share videos, images, galleries, and more with embedded content blocks.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Demo Showcase Section */}
                <div className="mt-32 relative">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6 relative inline-block">
                            See OneLink in Action
                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-verdigris"></div>
                        </h2>
                        <p className="font-mono text-ink text-lg max-w-2xl mx-auto leading-relaxed">
                            Explore real examples from creators, businesses, and influencers
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        <div className="bg-parchment border-2 border-ink shadow-sharp p-6 group hover:shadow-sharp-sm hover:translate-x-1 hover:translate-y-1 transition-all duration-150 ease-mechanical cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-verdigris opacity-20"></div>
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-150">🎨</div>
                            <h4 className="font-serif font-semibold text-charcoal mb-2 text-lg group-hover:text-verdigris transition-colors duration-150">Digital Artist</h4>
                            <p className="font-mono text-ink text-sm leading-relaxed">Portfolio, social links, and latest artwork showcase</p>
                        </div>

                        <div className="bg-parchment border-2 border-ink shadow-sharp p-6 group hover:shadow-sharp-sm hover:translate-x-1 hover:translate-y-1 transition-all duration-150 ease-mechanical cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-sienna opacity-20"></div>
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-150">💼</div>
                            <h4 className="font-serif font-semibold text-charcoal mb-2 text-lg group-hover:text-verdigris transition-colors duration-150">Tech Business</h4>
                            <p className="font-mono text-ink text-sm leading-relaxed">Services, team info, and consultation booking</p>
                        </div>

                        <div className="bg-parchment border-2 border-ink shadow-sharp p-6 group hover:shadow-sharp-sm hover:translate-x-1 hover:translate-y-1 transition-all duration-150 ease-mechanical cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-verdigris opacity-20"></div>
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-150">✨</div>
                            <h4 className="font-serif font-semibold text-charcoal mb-2 text-lg group-hover:text-verdigris transition-colors duration-150">Lifestyle Blogger</h4>
                            <p className="font-mono text-ink text-sm leading-relaxed">Social media, blog posts, and affiliate links</p>
                        </div>

                        <div className="bg-parchment border-2 border-ink shadow-sharp p-6 group hover:shadow-sharp-sm hover:translate-x-1 hover:translate-y-1 transition-all duration-150 ease-mechanical cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-sienna opacity-20"></div>
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-150">🎵</div>
                            <h4 className="font-serif font-semibold text-charcoal mb-2 text-lg group-hover:text-verdigris transition-colors duration-150">Music Producer</h4>
                            <p className="font-mono text-ink text-sm leading-relaxed">Music streaming, collaboration requests, studio content</p>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link to="/demo" className="group">
                            <Button
                                size="large"
                                variant="outline"
                                className="transform transition-all duration-150 ease-mechanical group-hover:scale-105"
                            >
                                👀 Explore All Demo Profiles
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Content Types Section */}
                <div className="mt-32 relative">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6 relative inline-block">
                            Share More Than Just Links
                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-verdigris"></div>
                        </h2>
                        <p className="font-mono text-ink text-lg max-w-2xl mx-auto leading-relaxed">
                            Create rich, engaging experiences with our versatile content blocks
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-parchment border-2 border-ink shadow-sharp p-8 group hover:shadow-sharp-sm hover:translate-x-1 hover:translate-y-1 transition-all duration-150 ease-mechanical cursor-default relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-verdigris opacity-20"></div>
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-150">🔗</div>
                            <h4 className="font-serif font-semibold text-charcoal mb-3 text-xl group-hover:text-verdigris transition-colors duration-150">Link Blocks</h4>
                            <p className="font-mono text-ink leading-relaxed">Direct visitors to your websites, social media, and important pages.</p>
                        </div>

                        <div className="bg-parchment border-2 border-ink shadow-sharp p-8 group hover:shadow-sharp-sm hover:translate-x-1 hover:translate-y-1 transition-all duration-150 ease-mechanical cursor-default relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-sienna opacity-20"></div>
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-150">⭐</div>
                            <h4 className="font-serif font-semibold text-charcoal mb-3 text-xl group-hover:text-verdigris transition-colors duration-150">Spotlight</h4>
                            <p className="font-mono text-ink leading-relaxed">Feature your most important content with rich images and descriptions.</p>
                        </div>

                        <div className="bg-parchment border-2 border-ink shadow-sharp p-8 group hover:shadow-sharp-sm hover:translate-x-1 hover:translate-y-1 transition-all duration-150 ease-mechanical cursor-default relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-verdigris opacity-20"></div>
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-150">🖼️</div>
                            <h4 className="font-serif font-semibold text-charcoal mb-3 text-xl group-hover:text-verdigris transition-colors duration-150">Image Gallery</h4>
                            <p className="font-mono text-ink leading-relaxed">Showcase your work, memories, or products in beautiful galleries.</p>
                        </div>

                        <div className="bg-parchment border-2 border-ink shadow-sharp p-8 group hover:shadow-sharp-sm hover:translate-x-1 hover:translate-y-1 transition-all duration-150 ease-mechanical cursor-default relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-sienna opacity-20"></div>
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-150">🎵</div>
                            <h4 className="font-serif font-semibold text-charcoal mb-3 text-xl group-hover:text-verdigris transition-colors duration-150">Media Embeds</h4>
                            <p className="font-mono text-ink leading-relaxed">Embed YouTube videos, Spotify playlists, and other rich media.</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-32 relative">
                    <div className="bg-parchment border-2 border-ink shadow-sharp p-16 relative overflow-hidden group hover:shadow-sharp-sm transition-all duration-300 ease-mechanical">
                        {/* Background decorative elements */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-4 left-4 w-12 h-12 border-2 border-verdigris rotate-45"></div>
                            <div className="absolute top-4 right-4 w-8 h-8 bg-ink"></div>
                            <div className="absolute bottom-4 left-4 w-6 h-6 bg-sienna rotate-45"></div>
                            <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-charcoal"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-verdigris rotate-45 opacity-30"></div>
                        </div>

                        <div className="text-center relative z-10">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6 relative">
                                Ready to Create Your OneLink?
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-verdigris"></div>
                            </h2>
                            <p className="font-mono text-ink mb-10 max-w-lg mx-auto text-lg leading-relaxed">
                                Join thousands of creators, businesses, and influencers who use OneLink to share their world.
                            </p>

                            <div className="flex flex-col items-center space-y-6">
                                {user ? (
                                    <Link to="/admin" className="group">
                                        <Button size="large" className="transform transition-all duration-150 ease-mechanical group-hover:scale-105 text-lg px-8 py-4">
                                            Go to Dashboard
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link to="/auth" className="group">
                                        <Button size="large" className="transform transition-all duration-150 ease-mechanical group-hover:scale-105 text-lg px-8 py-4">
                                            Start Building for Free
                                        </Button>
                                    </Link>
                                )}

                                <div className="flex items-center space-x-6 text-ink font-mono text-sm">
                                    <div className="flex items-center space-x-2">
                                        <span className="w-2 h-2 bg-verdigris rounded-full"></span>
                                        <span>Free forever</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="w-2 h-2 bg-verdigris rounded-full"></span>
                                        <span>No setup fees</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="w-2 h-2 bg-verdigris rounded-full"></span>
                                        <span>Cancel anytime</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-parchment border-t-2 border-ink mt-32 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-verdigris via-ink to-sienna opacity-30"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center relative">
                        <div className="flex justify-center items-center mb-6">
                            <div className="w-8 h-8 bg-verdigris border border-ink shadow-sharp-sm flex items-center justify-center mr-3">
                                <span className="text-parchment font-serif font-bold text-sm">OL</span>
                            </div>
                            <span className="font-serif font-bold text-charcoal text-lg">OneLink</span>
                        </div>
                        <p className="font-mono text-ink text-lg mb-4">
                            &copy; 2025 OneLink. Made with <span className="text-sienna">❤️</span> for creators everywhere.
                        </p>
                        <div className="flex justify-center space-x-4 text-ink font-mono text-sm">
                            <span className="hover:text-verdigris transition-colors duration-150 cursor-pointer">Privacy</span>
                            <span className="text-ink opacity-50">•</span>
                            <span className="hover:text-verdigris transition-colors duration-150 cursor-pointer">Terms</span>
                            <span className="text-ink opacity-50">•</span>
                            <span className="hover:text-verdigris transition-colors duration-150 cursor-pointer">Support</span>
                        </div>

                        {/* Decorative footer elements */}
                        <div className="absolute -top-4 left-1/4 w-2 h-2 bg-verdigris rotate-45"></div>
                        <div className="absolute -top-4 right-1/4 w-2 h-2 bg-sienna rotate-45"></div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default HomePage