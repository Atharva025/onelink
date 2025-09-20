import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button'
import LinkBlock from '../components/blocks/LinkBlock'
import SpotlightBlock from '../components/blocks/SpotlightBlock'
import GalleryBlock from '../components/blocks/GalleryBlock'
import EmbedBlock from '../components/blocks/EmbedBlock'

const DemoPage = () => {
    const [selectedDemo, setSelectedDemo] = useState('creator')

    const demoProfiles = {
        creator: {
            profile: {
                full_name: "Alex Creative",
                bio: "Digital artist & content creator sharing my journey through art, design, and creative adventures.",
                avatar_url: "/src/components/demoImages/alex/alex.jpg",
                status_message: "Currently working on my new art series ✨"
            },
            blocks: [
                {
                    id: '1',
                    type: 'spotlight',
                    title: "Latest Art Collection: Digital Dreams",
                    description: "Explore my newest collection of digital artwork that blends reality with imagination. Each piece tells a story of our digital age.",
                    image: "/src/components/demoImages/alex/latestArtCollection.avif",
                    link: "#",
                    buttonText: "View Collection"
                },
                {
                    id: '2',
                    type: 'link',
                    title: "🎨 My Art Portfolio",
                    url: "#",
                    description: "Browse through my complete portfolio"
                },
                {
                    id: '3',
                    type: 'link',
                    title: "📺 YouTube Channel",
                    url: "#",
                    description: "Art tutorials and creative process videos"
                },
                {
                    id: '4',
                    type: 'gallery',
                    title: "Behind the Scenes",
                    images: [
                        { url: "/src/components/demoImages/alex/behindTheScenes1.avif", alt: "Artist workspace with paints and canvas" },
                        { url: "/src/components/demoImages/alex/behindTheScenes2.avif", alt: "Creative process with art supplies" },
                        { url: "/src/components/demoImages/alex/behindTheScenes3.avif", alt: "Painting in progress on easel" },
                        { url: "/src/components/demoImages/alex/behindTheScenes4.avif", alt: "Digital art setup with tablet and stylus" }
                    ]
                },
                {
                    id: '5',
                    type: 'link',
                    title: "🛍️ Art Prints Shop",
                    url: "#",
                    description: "Purchase prints of my artwork"
                },
                {
                    id: '6',
                    type: 'embed',
                    title: "Latest YouTube Video",
                    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                    description: "Watch my latest art tutorial"
                }
            ]
        },
        business: {
            profile: {
                full_name: "TechFlow Solutions",
                bio: "We help businesses streamline their workflows with cutting-edge technology solutions. From startups to enterprises.",
                avatar_url: "/src/components/demoImages/techflow/techflowLogo.avif",
                status_message: "Now offering free consultations! 🚀"
            },
            blocks: [
                {
                    id: '1',
                    type: 'spotlight',
                    title: "Free Business Automation Consultation",
                    description: "Book a 30-minute call to discover how we can automate your business processes and save you hours every week.",
                    image: "/src/components/demoImages/techflow/techflowAutomation.avif",
                    link: "#",
                    buttonText: "Book Free Call"
                },
                {
                    id: '2',
                    type: 'link',
                    title: "📞 Schedule a Meeting",
                    url: "#",
                    description: "Book a consultation with our team"
                },
                {
                    id: '3',
                    type: 'link',
                    title: "📈 Our Services",
                    url: "#",
                    description: "Explore our automation solutions"
                },
                {
                    id: '4',
                    type: 'link',
                    title: "💼 Case Studies",
                    url: "#",
                    description: "See how we've helped other businesses"
                },
                {
                    id: '5',
                    type: 'gallery',
                    title: "Our Team",
                    images: [
                        { url: "/src/components/demoImages/techflow/team1.avif", alt: "Team collaboration in modern office" },
                        { url: "/src/components/demoImages/techflow/team2.avif", alt: "Professional team member at work" },
                        { url: "/src/components/demoImages/techflow/team3.avif", alt: "Business team meeting discussion" },
                        { url: "/src/components/demoImages/techflow/team4.avif", alt: "Team leader presenting to colleagues" }
                    ]
                },
                {
                    id: '6',
                    type: 'link',
                    title: "📧 Contact Us",
                    url: "#",
                    description: "Get in touch for custom solutions"
                }
            ]
        },
        influencer: {
            profile: {
                full_name: "Maya Lifestyle",
                bio: "Lifestyle blogger sharing fashion, travel, and wellness tips. Living my best life and inspiring others to do the same! ✨",
                avatar_url: "/src/components/demoImages/lifestyle_blogger/maya_profile.avif",
                status_message: "Just got back from Bali! New content coming soon 🌴"
            },
            blocks: [
                {
                    id: '1',
                    type: 'spotlight',
                    title: "My Bali Travel Guide",
                    description: "Everything you need to know for the perfect Bali trip - from hidden gems to the best local food spots!",
                    image: "/src/components/demoImages/lifestyle_blogger/bali_guide.avif",
                    link: "#",
                    buttonText: "Read Guide"
                },
                {
                    id: '2',
                    type: 'link',
                    title: "📸 Instagram",
                    url: "#",
                    description: "Daily lifestyle and fashion content"
                },
                {
                    id: '3',
                    type: 'link',
                    title: "🎵 TikTok",
                    url: "#",
                    description: "Fun lifestyle and travel videos"
                },
                {
                    id: '4',
                    type: 'embed',
                    title: "Bali Vlog",
                    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                    description: "My latest travel vlog from Bali"
                },
                {
                    id: '5',
                    type: 'gallery',
                    title: "Latest Photos",
                    images: [
                        { url: "/src/components/demoImages/lifestyle_blogger/gallery1.avif", alt: "Beautiful mountain landscape view" },
                        { url: "/src/components/demoImages/lifestyle_blogger/gallery2.avif", alt: "Scenic mountain peak adventure" },
                        { url: "/src/components/demoImages/lifestyle_blogger/gallery3.avif", alt: "Travel lifestyle photography" },
                        { url: "/src/components/demoImages/lifestyle_blogger/gallery4.avif", alt: "Tropical beach paradise scene" }
                    ]
                },
                {
                    id: '6',
                    type: 'link',
                    title: "🛍️ My Amazon Favorites",
                    url: "#",
                    description: "Products I love and recommend"
                },
                {
                    id: '7',
                    type: 'link',
                    title: "📝 Blog",
                    url: "#",
                    description: "In-depth lifestyle articles"
                }
            ]
        },
        musician: {
            profile: {
                full_name: "Sound Wave Studios",
                bio: "Independent musician and producer creating ambient electronic music. Available for collaborations and custom compositions.",
                avatar_url: "/src/components/demoImages/music_producer/music_producer_profile.avif",
                status_message: "New album 'Digital Horizons' dropping next month! 🎵"
            },
            blocks: [
                {
                    id: '1',
                    type: 'spotlight',
                    title: "New Album: Digital Horizons",
                    description: "My latest collection of ambient electronic tracks exploring the intersection of technology and nature. Pre-order now!",
                    image: "/src/components/demoImages/music_producer/album.avif",
                    link: "#",
                    buttonText: "Pre-order Now"
                },
                {
                    id: '2',
                    type: 'link',
                    title: "🎵 Spotify",
                    url: "#",
                    description: "Stream my music on Spotify"
                },
                {
                    id: '3',
                    type: 'link',
                    title: "🍎 Apple Music",
                    url: "#",
                    description: "Listen on Apple Music"
                },
                {
                    id: '4',
                    type: 'embed',
                    title: "Latest Track",
                    embedUrl: "https://www.youtube.com/embed/Ks-_Mh1QhMc",
                    description: "Listen to my newest single"
                },
                {
                    id: '5',
                    type: 'link',
                    title: "🎹 Collaboration Inquiry",
                    url: "#",
                    description: "Interested in working together?"
                },
                {
                    id: '6',
                    type: 'gallery',
                    title: "Studio Sessions",
                    images: [
                        { url: "/src/components/demoImages/music_producer/gallery1.avif", alt: "Professional music studio setup" },
                        { url: "/src/components/demoImages/music_producer/gallery2.avif", alt: "Recording equipment and instruments" },
                        { url: "/src/components/demoImages/music_producer/gallery3.avif", alt: "Mixing board in recording studio" },
                        { url: "/src/components/demoImages/music_producer/gallery4.avif", alt: "Music production workspace" }
                    ]
                }
            ]
        }
    }

    const demoTabs = [
        { id: 'creator', label: 'Digital Artist', icon: '🎨' },
        { id: 'business', label: 'Tech Business', icon: '💼' },
        { id: 'influencer', label: 'Lifestyle Blogger', icon: '✨' },
        { id: 'musician', label: 'Music Producer', icon: '🎵' }
    ]

    const currentProfile = demoProfiles[selectedDemo]

    const renderBlock = (block, index) => {
        const blockProps = {
            key: `${block.type}-${index}`,
            ...block
        }

        switch (block.type) {
            case 'link':
                return <LinkBlock {...blockProps} />
            case 'spotlight':
                return <SpotlightBlock {...blockProps} />
            case 'gallery':
                return <GalleryBlock {...blockProps} />
            case 'embed':
                return <EmbedBlock {...blockProps} />
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-parchment relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-4 h-4 bg-verdigris border border-ink shadow-sharp-sm rotate-45"></div>
                <div className="absolute top-40 right-20 w-6 h-6 bg-ink border border-charcoal shadow-sharp-sm"></div>
                <div className="absolute bottom-40 left-20 w-5 h-5 bg-sienna border border-ink shadow-sharp-sm rotate-45"></div>
                <div className="absolute bottom-20 right-16 w-3 h-3 bg-verdigris border border-ink shadow-sharp-sm"></div>
            </div>

            {/* Header */}
            <header className="bg-parchment border-b-2 border-ink shadow-sharp relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <Link to="/" className="flex items-center group">
                            <div className="w-10 h-10 bg-verdigris border border-ink shadow-sharp-sm flex items-center justify-center mr-4 transition-all duration-150 ease-mechanical group-hover:shadow-sharp">
                                <span className="text-parchment font-serif font-bold text-lg">OL</span>
                            </div>
                            <h1 className="text-2xl font-serif font-bold text-charcoal">OneLink</h1>
                        </Link>

                        <div className="flex items-center space-x-4">
                            <Link to="/" className="transition-transform duration-150 ease-mechanical hover:scale-105">
                                <Button variant="outline">← Back to Home</Button>
                            </Link>
                            <Link to="/auth" className="transition-transform duration-150 ease-mechanical hover:scale-105">
                                <Button>Create Yours</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                {/* Demo Introduction */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-charcoal mb-6 relative">
                        See OneLink in Action
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-verdigris"></div>
                    </h1>
                    <p className="text-xl font-mono text-ink max-w-3xl mx-auto leading-relaxed mb-8">
                        Explore real examples of how different creators, businesses, and influencers use OneLink 
                        to showcase their content and connect with their audience.
                    </p>
                    <div className="inline-flex items-center space-x-2 bg-verdigris bg-opacity-10 border border-verdigris px-4 py-2">
                        <div className="w-2 h-2 bg-verdigris rounded-full animate-pulse"></div>
                        <span className="font-mono text-ink">All examples use real OneLink features</span>
                    </div>
                </div>

                {/* Demo Selection Tabs */}
                <div className="bg-parchment border-2 border-ink shadow-sharp mb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-b-[40px] border-b-verdigris opacity-10"></div>
                    
                    <div className="border-b-2 border-ink bg-parchment relative">
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-verdigris via-ink to-sienna opacity-20"></div>
                        <nav className="flex flex-wrap justify-center gap-4 p-6">
                            {demoTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedDemo(tab.id)}
                                    className={`px-6 py-3 border-2 font-mono font-medium text-lg transition-all duration-150 ease-mechanical group ${
                                        selectedDemo === tab.id
                                            ? 'border-verdigris bg-verdigris text-parchment shadow-sharp-sm'
                                            : 'border-ink text-charcoal hover:border-verdigris hover:text-verdigris hover:scale-105'
                                    }`}
                                >
                                    <span className="mr-3 text-xl group-hover:scale-110 transition-transform duration-150">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Demo Profile Display */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Profile Preview */}
                    <div className="lg:col-span-8">
                        <div className="max-w-2xl mx-auto">
                            {/* Profile Header */}
                            <div className="text-center mb-12 bg-parchment border-2 border-ink shadow-sharp p-12 relative overflow-hidden group hover:shadow-sharp-sm transition-all duration-150 ease-mechanical">
                                <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-b-[40px] border-b-verdigris opacity-10"></div>
                                
                                {currentProfile.profile.avatar_url && (
                                    <div className="relative inline-block mb-6">
                                        <div className="absolute inset-0 bg-verdigris border-2 border-ink shadow-sharp rounded-full transform rotate-3"></div>
                                        <img
                                            src={currentProfile.profile.avatar_url}
                                            alt="Profile"
                                            className="w-32 h-32 border-2 border-ink shadow-sharp object-cover mx-auto relative z-10 rounded-full transition-transform duration-150 group-hover:scale-105"
                                        />
                                    </div>
                                )}

                                <h2 className="text-4xl font-serif font-bold mb-4 text-charcoal relative">
                                    {currentProfile.profile.full_name}
                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-verdigris"></div>
                                </h2>

                                <p className="text-xl font-mono text-ink leading-relaxed mb-6">
                                    {currentProfile.profile.bio}
                                </p>

                                {currentProfile.profile.status_message && (
                                    <div className="inline-flex items-center space-x-2 bg-verdigris bg-opacity-10 border border-verdigris px-4 py-2">
                                        <div className="w-2 h-2 bg-verdigris rounded-full animate-pulse"></div>
                                        <p className="font-mono text-ink italic">
                                            {currentProfile.profile.status_message}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Content Blocks */}
                            <div className="space-y-6">
                                {currentProfile.blocks.map((block, index) => renderBlock(block, index))}
                            </div>
                        </div>
                    </div>

                    {/* Features Explanation */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-8">
                            <div className="bg-parchment border-2 border-ink shadow-sharp p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-b-[30px] border-b-ink opacity-10"></div>
                                
                                <h3 className="text-2xl font-serif font-bold text-charcoal mb-6 relative">
                                    What You're Seeing
                                    <div className="absolute -bottom-1 left-0 w-12 h-1 bg-ink"></div>
                                </h3>
                                
                                <div className="space-y-6 font-mono text-ink">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 bg-verdigris border border-ink shadow-sharp-sm flex items-center justify-center text-parchment font-bold text-sm flex-shrink-0">
                                            ✓
                                        </div>
                                        <div>
                                            <p className="font-semibold text-charcoal">Real Content Blocks</p>
                                            <p className="text-sm">Every element you see can be created in the admin panel</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 bg-verdigris border border-ink shadow-sharp-sm flex items-center justify-center text-parchment font-bold text-sm flex-shrink-0">
                                            ✓
                                        </div>
                                        <div>
                                            <p className="font-semibold text-charcoal">Customizable Design</p>
                                            <p className="text-sm">Change colors, fonts, and layouts to match your brand</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 bg-verdigris border border-ink shadow-sharp-sm flex items-center justify-center text-parchment font-bold text-sm flex-shrink-0">
                                            ✓
                                        </div>
                                        <div>
                                            <p className="font-semibold text-charcoal">Multiple Content Types</p>
                                            <p className="text-sm">Links, galleries, spotlights, and embedded media</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 bg-verdigris border border-ink shadow-sharp-sm flex items-center justify-center text-parchment font-bold text-sm flex-shrink-0">
                                            ✓
                                        </div>
                                        <div>
                                            <p className="font-semibold text-charcoal">Mobile Responsive</p>
                                            <p className="text-sm">Looks great on all devices automatically</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t-2 border-ink">
                                    <Link to="/auth">
                                        <Button 
                                            size="large" 
                                            className="w-full transition-transform duration-150 ease-mechanical hover:scale-105"
                                        >
                                            Create Your OneLink
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-20 text-center bg-parchment border-2 border-ink shadow-sharp p-16 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-4 w-12 h-12 border-2 border-verdigris rotate-45"></div>
                        <div className="absolute top-4 right-4 w-8 h-8 bg-ink"></div>
                        <div className="absolute bottom-4 left-4 w-6 h-6 bg-sienna rotate-45"></div>
                        <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-charcoal"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-verdigris rotate-45 opacity-30"></div>
                    </div>
                    
                    <h2 className="text-4xl font-serif font-bold text-charcoal mb-6 relative z-10">
                        Ready to Create Your Own?
                    </h2>
                    <p className="font-mono text-ink mb-10 max-w-lg mx-auto text-lg leading-relaxed relative z-10">
                        Start building your personalized OneLink page in minutes. No technical skills required!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10">
                        <Link to="/auth" className="group">
                            <Button size="large" className="transform transition-all duration-150 ease-mechanical group-hover:scale-105">
                                Get Started Free
                            </Button>
                        </Link>
                        
                        <div className="flex items-center space-x-6 text-ink font-mono text-sm">
                            <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-verdigris rounded-full"></span>
                                <span>Free forever</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-verdigris rounded-full"></span>
                                <span>No credit card</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DemoPage