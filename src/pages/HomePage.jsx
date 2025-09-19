import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button'
import { useAuth } from '../contexts/AuthContext'

const HomePage = () => {
    const { user } = useAuth()

    return (
        <div className="min-h-screen bg-parchment">
            {/* Header */}
            <header className="bg-parchment border-b border-ink shadow-sharp-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-verdigris border border-ink shadow-sharp-sm flex items-center justify-center mr-3">
                                <span className="text-parchment font-serif font-bold text-sm">OL</span>
                            </div>
                            <h1 className="text-xl font-serif font-bold text-charcoal">OneLink</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            {user ? (
                                <Link to="/admin">
                                    <Button>Dashboard</Button>
                                </Link>
                            ) : (
                                <Link to="/auth">
                                    <Button>Sign In</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-charcoal mb-6">
                        One Link.
                        <span className="text-verdigris"> All Your Content.</span>
                    </h1>

                    <p className="text-xl font-mono text-ink mb-8 max-w-2xl mx-auto leading-relaxed">
                        Create a beautiful, customizable page that houses all your links, content, and personality in one place.
                        Perfect for social media bios, business cards, and personal branding.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {user ? (
                            <Link to="/admin">
                                <Button size="large">
                                    Go to Your Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link to="/auth">
                                    <Button size="large">
                                        Get Started Free
                                    </Button>
                                </Link>
                                <Link to="/demo">
                                    <Button variant="outline" size="large">
                                        View Demo
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-verdigris border border-ink shadow-sharp flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🔗</span>
                        </div>
                        <h3 className="text-xl font-serif font-semibold text-charcoal mb-2">
                            All Your Links
                        </h3>
                        <p className="font-mono text-ink">
                            Organize all your important links in one beautiful, easy-to-navigate page.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-verdigris border border-ink shadow-sharp flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🎨</span>
                        </div>
                        <h3 className="text-xl font-serif font-semibold text-charcoal mb-2">
                            Custom Design
                        </h3>
                        <p className="font-mono text-ink">
                            Personalize your page with custom colors, themes, and layouts that match your brand.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-verdigris border border-ink shadow-sharp flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">📊</span>
                        </div>
                        <h3 className="text-xl font-serif font-semibold text-charcoal mb-2">
                            Rich Content
                        </h3>
                        <p className="font-mono text-ink">
                            Share videos, images, galleries, and more with embedded content blocks.
                        </p>
                    </div>
                </div>

                {/* Content Types Section */}
                <div className="mt-24">
                    <h2 className="text-3xl font-serif font-bold text-center text-charcoal mb-12">
                        Share More Than Just Links
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-parchment border border-ink shadow-sharp p-6">
                            <div className="text-3xl mb-3">🔗</div>
                            <h4 className="font-serif font-semibold text-charcoal mb-2">Link Blocks</h4>
                            <p className="font-mono text-ink text-sm">Direct visitors to your websites, social media, and important pages.</p>
                        </div>

                        <div className="bg-parchment border border-ink shadow-sharp p-6">
                            <div className="text-3xl mb-3">⭐</div>
                            <h4 className="font-serif font-semibold text-charcoal mb-2">Spotlight</h4>
                            <p className="font-mono text-ink text-sm">Feature your most important content with rich images and descriptions.</p>
                        </div>

                        <div className="bg-parchment border border-ink shadow-sharp p-6">
                            <div className="text-3xl mb-3">🖼️</div>
                            <h4 className="font-serif font-semibold text-charcoal mb-2">Image Gallery</h4>
                            <p className="font-mono text-ink text-sm">Showcase your work, memories, or products in beautiful galleries.</p>
                        </div>

                        <div className="bg-parchment border border-ink shadow-sharp p-6">
                            <div className="text-3xl mb-3">🎵</div>
                            <h4 className="font-serif font-semibold text-charcoal mb-2">Media Embeds</h4>
                            <p className="font-mono text-ink text-sm">Embed YouTube videos, Spotify playlists, and other rich media.</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-24 text-center bg-parchment border border-ink shadow-sharp p-12">
                    <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
                        Ready to Create Your OneLink?
                    </h2>
                    <p className="font-mono text-ink mb-8 max-w-md mx-auto">
                        Join thousands of creators, businesses, and influencers who use OneLink to share their world.
                    </p>

                    {user ? (
                        <Link to="/admin">
                            <Button size="large">
                                Go to Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <Link to="/auth">
                            <Button size="large">
                                Start Building for Free
                            </Button>
                        </Link>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-parchment border-t border-ink mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center font-mono text-ink">
                        <p>&copy; 2025 OneLink. Made with ❤️ for creators everywhere.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default HomePage