import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../api/supabaseClient'
import LinkBlock from '../components/blocks/LinkBlock'
import SpotlightBlock from '../components/blocks/SpotlightBlock'
import GalleryBlock from '../components/blocks/GalleryBlock'
import EmbedBlock from '../components/blocks/EmbedBlock'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import QRCodeGenerator from '../components/common/QRCodeGenerator'
import Spinner from '../components/common/Spinner'
import { getThemeClasses, getThemeColors, getFontClass } from '../utils/themeUtils'

const PublicProfilePage = () => {
    const { slug } = useParams()
    const [profile, setProfile] = useState(null)
    const [blocks, setBlocks] = useState([])
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showAMA, setShowAMA] = useState(false)
    const [showQRCode, setShowQRCode] = useState(false)
    const [newQuestion, setNewQuestion] = useState('')
    const [submittingQuestion, setSubmittingQuestion] = useState(false)

    useEffect(() => {
        if (slug) {
            loadUserProfile()
        }
    }, [slug])

    const loadUserProfile = async () => {
        try {
            setLoading(true)
            setError(null)

            // Load user profile by slug
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('slug', slug)
                .single()

            if (profileError) {
                throw new Error('Profile not found')
            }

            // Load user blocks
            const { data: blocksData, error: blocksError } = await supabase
                .from('blocks')
                .select('*')
                .eq('profile_id', profileData.id)
                .order('display_order')

            if (blocksError) {
                console.error('Error loading blocks:', blocksError)
            }

            // Load published questions
            const { data: questionsData, error: questionsError } = await supabase
                .from('questions')
                .select('*')
                .eq('profile_id', profileData.id)
                .eq('is_published', true)
                .order('created_at', { ascending: false })

            if (questionsError) {
                console.error('Error loading questions:', questionsError)
            }

            setProfile(profileData)
            setBlocks(blocksData?.map(block => ({
                id: block.id.toString(),
                type: block.type,
                ...block.content
            })) || [])
            setQuestions(questionsData || [])
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmitQuestion = async (e) => {
        e.preventDefault()
        if (!newQuestion.trim()) return

        setSubmittingQuestion(true)

        try {
            const { error } = await supabase
                .from('questions')
                .insert({
                    profile_id: profile.id,
                    question_text: newQuestion.trim()
                })

            if (error) {
                throw error
            }

            setNewQuestion('')
            alert('Question submitted successfully! The user will be notified.')
        } catch (error) {
            console.error('Error submitting question:', error)
            alert('Failed to submit question. Please try again.')
        } finally {
            setSubmittingQuestion(false)
        }
    }

    const renderBlock = (block, index) => {
        const blockProps = {
            key: `${block.type}-${index}`,
            theme: selectedTheme,
            themeClasses: {
                page: pageClasses,
                card: cardClasses,
                text: textClasses,
                button: buttonClasses,
                link: getThemeClasses(selectedTheme, 'link')
            },
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

    // Get font class based on user's font selection
    const fontClass = profile?.theme_settings?.font ? getFontClass(profile.theme_settings.font) : 'font-mono'

    if (loading) {
        // Use default theme for loading state
        const loadingPageClasses = 'bg-parchment'
        const loadingAccentClasses = 'bg-verdigris border-ink'
        const loadingTextClasses = 'text-ink font-mono'
        const loadingBrandClasses = 'text-parchment font-serif'

        return (
            <div className={`min-h-screen ${loadingPageClasses} flex items-center justify-center relative overflow-hidden`}>
                {/* Background decorative elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className={`absolute top-20 left-16 w-4 h-4 ${loadingAccentClasses} shadow-sharp-sm rotate-45`}></div>
                    <div className="absolute top-40 right-20 w-6 h-6 bg-ink border border-charcoal shadow-sharp-sm"></div>
                    <div className="absolute bottom-40 left-20 w-5 h-5 bg-sienna border border-ink shadow-sharp-sm rotate-45"></div>
                    <div className={`absolute bottom-20 right-16 w-3 h-3 ${loadingAccentClasses} shadow-sharp-sm`}></div>
                </div>

                <div className="text-center relative z-10">
                    <div className={`w-16 h-16 ${loadingAccentClasses} border-2 shadow-sharp flex items-center justify-center mx-auto mb-6 animate-pulse`}>
                        <span className={`${loadingBrandClasses} font-bold text-xl`}>OL</span>
                    </div>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-verdigris mx-auto mb-6"></div>
                    <p className={`${loadingTextClasses} text-lg`}>Loading profile...</p>
                    <div className="mt-4 flex justify-center space-x-1">
                        <div className="w-2 h-2 bg-verdigris rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-verdigris rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-verdigris rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        // Use default theme for error state
        const errorPageClasses = 'bg-parchment'
        const errorCardClasses = 'bg-parchment border-2 border-ink shadow-sharp'
        const errorAccentClasses = 'bg-sienna border-ink'
        const errorTextClasses = 'text-charcoal font-serif'
        const errorBodyClasses = 'text-ink font-mono'

        return (
            <div className={`min-h-screen ${errorPageClasses} flex items-center justify-center relative overflow-hidden`}>
                {/* Background decorative elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-16 w-4 h-4 bg-verdigris border border-ink shadow-sharp-sm rotate-45"></div>
                    <div className="absolute top-40 right-20 w-6 h-6 bg-ink border border-charcoal shadow-sharp-sm"></div>
                    <div className="absolute bottom-40 left-20 w-5 h-5 bg-sienna border border-ink shadow-sharp-sm rotate-45"></div>
                    <div className="absolute bottom-20 right-16 w-3 h-3 bg-verdigris border border-ink shadow-sharp-sm"></div>
                </div>

                <div className={`text-center ${errorCardClasses} p-16 relative z-10 max-w-lg`}>
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-b-[30px] border-b-sienna opacity-20"></div>
                    <div className={`w-16 h-16 ${errorAccentClasses} border-2 shadow-sharp flex items-center justify-center mx-auto mb-6`}>
                        <span className="text-parchment font-serif font-bold text-2xl">!</span>
                    </div>
                    <h1 className={`text-4xl ${errorTextClasses} font-bold mb-6 relative`}>
                        Profile Not Found
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-sienna"></div>
                    </h1>
                    <p className={`${errorBodyClasses} mb-10 text-lg leading-relaxed`}>The profile you're looking for doesn't exist or has been removed.</p>
                    <Button
                        theme={selectedTheme}
                        themeClasses={{ button: buttonClasses }}
                        onClick={() => window.location.href = '/'}
                        className="transform transition-all duration-150 ease-mechanical hover:scale-105"
                        size="large"
                    >
                        Go to OneLink
                    </Button>
                </div>
            </div>
        )
    }

    // Get theme from profile settings
    const selectedTheme = profile?.theme_settings?.theme || 'default'
    const pageClasses = getThemeClasses(selectedTheme, 'page')
    const cardClasses = getThemeClasses(selectedTheme, 'card')
    const textClasses = getThemeClasses(selectedTheme, 'text')
    const buttonClasses = getThemeClasses(selectedTheme, 'button')

    // Helper function to get theme-specific classes
    const getAccentColor = () => {
        switch (selectedTheme) {
            case 'zen-garden': return 'bg-zen-accent-green'
            case 'cosmic-drift': return 'bg-cosmic-accent'
            case 'art-deco': return 'bg-deco-text-gold'
            case 'neo-brutalist': return 'bg-brutal-accent'
            case 'ethereal-glass': return 'bg-ether-accent'
            default: return 'bg-verdigris'
        }
    }

    const getBorderColor = () => {
        switch (selectedTheme) {
            case 'neo-brutalist': return 'border-brutal-border'
            case 'cosmic-drift': return 'border-cosmic-mid'
            case 'art-deco': return 'border-deco-text-gold'
            case 'zen-garden': return 'border-zen-border'
            case 'ethereal-glass': return 'border-ether-border'
            default: return 'border-ink'
        }
    }

    const getShadowClass = () => {
        switch (selectedTheme) {
            case 'neo-brutalist': return 'shadow-brutal-sharp'
            case 'cosmic-drift': return 'shadow-cosmic-glow'
            case 'art-deco': return 'shadow-deco-frame'
            case 'zen-garden': return 'shadow-zen-soft'
            case 'ethereal-glass': return 'shadow-ether-glow'
            default: return 'shadow-sharp'
        }
    }

    const getAccentBgAndBorder = () => {
        switch (selectedTheme) {
            case 'zen-garden': return 'bg-zen-accent-green/10 border-zen-accent-green'
            case 'cosmic-drift': return 'bg-cosmic-accent/10 border-cosmic-accent'
            case 'art-deco': return 'bg-deco-text-gold/10 border-deco-text-gold'
            case 'neo-brutalist': return 'bg-brutal-accent/10 border-brutal-accent'
            case 'ethereal-glass': return 'bg-ether-accent/10 border-ether-accent'
            default: return 'bg-verdigris/10 border-verdigris'
        }
    }

    return (
        <div className={`min-h-screen relative overflow-hidden ${pageClasses} ${fontClass}`}>
            {/* Theme-specific background elements */}
            <div className="absolute inset-0 opacity-15">
                {selectedTheme === 'cosmic-drift' && (
                    <>
                        <div className="absolute top-32 left-10 w-1 h-1 bg-cosmic-text-light rounded-full animate-pulse"></div>
                        <div className="absolute top-64 right-16 w-1 h-1 bg-cosmic-text-light rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute bottom-64 left-16 w-1 h-1 bg-cosmic-text-light rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                        <div className="absolute bottom-32 right-10 w-1 h-1 bg-cosmic-text-light rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </>
                )}
                {selectedTheme === 'art-deco' && (
                    <>
                        <div className="absolute top-32 left-10 w-6 h-6 border border-deco-text-gold rotate-45 opacity-30"></div>
                        <div className="absolute bottom-32 right-10 w-4 h-4 border border-deco-accent-emerald opacity-20"></div>
                    </>
                )}
                {selectedTheme === 'zen-garden' && (
                    <>
                        <div className="absolute top-1/2 left-8 w-12 h-1 bg-zen-border opacity-30"></div>
                        <div className="absolute top-1/3 right-8 w-8 h-1 bg-zen-border opacity-20"></div>
                    </>
                )}
                {selectedTheme === 'neo-brutalist' && (
                    <>
                        <div className="absolute top-32 left-10 w-6 h-6 bg-brutal-accent opacity-20"></div>
                        <div className="absolute bottom-32 right-10 w-4 h-4 bg-brutal-border opacity-30"></div>
                    </>
                )}
                {(selectedTheme === 'ethereal-glass' || selectedTheme === 'default' || !selectedTheme) && (
                    <>
                        <div className={`absolute top-32 left-4 sm:left-10 w-4 sm:w-6 h-4 sm:h-6 ${getAccentColor()} ${getBorderColor()} border ${getShadowClass()} rotate-45 hidden sm:block`}></div>
                        <div className={`absolute top-64 right-8 sm:right-16 w-3 sm:w-4 h-3 sm:h-4 ${getAccentColor()} ${getBorderColor()} border ${getShadowClass()} hidden md:block`}></div>
                        <div className={`absolute bottom-64 left-8 sm:left-16 w-4 sm:w-5 h-4 sm:h-5 bg-sienna ${getBorderColor()} border ${getShadowClass()} rotate-45 hidden md:block`}></div>
                        <div className={`absolute bottom-32 right-4 sm:right-10 w-3 h-3 ${getAccentColor()} ${getBorderColor()} border ${getShadowClass()} hidden sm:block`}></div>
                    </>
                )}
            </div>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
                {/* Profile Header */}
                <div className={`text-center mb-8 sm:mb-12 ${cardClasses} p-6 sm:p-8 md:p-12 relative overflow-hidden group hover:shadow-sharp-sm transition-all duration-150 ease-mechanical`}>
                    {/* Theme-specific accents */}
                    {selectedTheme === 'ethereal-glass' && (
                        <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-b-[40px] border-b-ether-accent opacity-10"></div>
                    )}
                    {selectedTheme === 'cosmic-drift' && (
                        <div className="absolute top-2 right-4 w-2 h-2 bg-cosmic-accent rounded-full opacity-60"></div>
                    )}
                    {selectedTheme === 'art-deco' && (
                        <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-b-[40px] border-b-deco-text-gold opacity-20"></div>
                    )}
                    {selectedTheme === 'zen-garden' && (
                        <div className="absolute bottom-4 left-6 w-8 h-1 bg-zen-accent-green opacity-30"></div>
                    )}
                    {selectedTheme === 'neo-brutalist' && (
                        <div className="absolute top-4 right-4 w-4 h-4 bg-brutal-accent opacity-40"></div>
                    )}
                    {profile?.avatar_url && (
                        <div className="relative inline-block mb-6">
                            <div className={`absolute inset-0 ${getAccentColor()} border-2 ${getBorderColor()} ${getShadowClass()} rounded-full transform rotate-3`}></div>
                            <img
                                src={profile.avatar_url}
                                alt="Profile"
                                className={`w-32 h-32 border-2 ${getBorderColor()} ${getShadowClass()} object-cover mx-auto relative z-10 rounded-full transition-transform duration-150 group-hover:scale-105`}
                                onError={(e) => {
                                    e.target.style.display = 'none'
                                }}
                            />
                        </div>
                    )}

                    <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 relative ${textClasses.heading} px-2 sm:px-0`}>
                        {profile?.full_name || profile?.slug || 'User Profile'}
                        <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-1 ${getAccentColor()}`}></div>
                    </h1>

                    {profile?.bio && (
                        <p className={`text-lg sm:text-xl max-w-lg mx-auto leading-relaxed mb-6 ${textClasses.secondary} px-2 sm:px-0`}>
                            {profile.bio}
                        </p>
                    )}

                    {profile?.status_message && (
                        <div className={`inline-flex items-center space-x-2 ${getAccentBgAndBorder()} border px-3 sm:px-4 py-2 mx-2 sm:mx-0`}>
                            <div className={`w-2 h-2 ${getAccentColor()} rounded-full animate-pulse`}></div>
                            <p className={`italic ${textClasses.secondary} text-sm sm:text-base`}>
                                {profile.status_message}
                            </p>
                        </div>
                    )}
                </div>

                {/* Content Blocks */}
                <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                    {blocks.length === 0 ? (
                        <div className={`text-center py-12 sm:py-16 ${cardClasses} relative overflow-hidden mx-2 sm:mx-0`}>
                            <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-b-[30px] border-b-current opacity-10"></div>
                            <div className={`w-12 sm:w-16 h-12 sm:h-16 ${getAccentColor()} ${getBorderColor()} border-2 ${getShadowClass()} flex items-center justify-center mx-auto mb-6`}>
                                <span className={`${textClasses.primary} font-bold text-xl sm:text-2xl`}>📄</span>
                            </div>
                            <p className={`text-lg sm:text-xl ${textClasses.primary}`}>No content to display yet.</p>
                            <p className={`text-sm ${textClasses.secondary} opacity-70 mt-2`}>Check back later for updates!</p>
                        </div>
                    ) : (
                        blocks.map((block, index) => renderBlock(block, index))
                    )}
                </div>

                {/* AMA Section */}
                {questions.length > 0 && (
                    <div className="mb-8 sm:mb-12">
                        <div className="text-center mb-8 sm:mb-10 px-2 sm:px-0">
                            <h2 className={`text-2xl sm:text-3xl md:text-4xl ${textClasses.heading} font-bold relative inline-block`}>
                                Ask Me Anything
                                <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 sm:w-16 h-1 ${getAccentColor()}`}></div>
                            </h2>
                            <p className={`${textClasses.secondary} mt-4 text-base sm:text-lg`}>Explore recent conversations</p>
                        </div>

                        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                            {questions.slice(0, 3).map((qa, index) => (
                                <div key={qa.id} className={`${cardClasses} p-4 sm:p-6 md:p-8 group hover:${getShadowClass()} hover:translate-x-1 hover:translate-y-1 transition-all duration-150 ease-mechanical relative overflow-hidden mx-2 sm:mx-0`}>
                                    <div className={`absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-current opacity-20`}></div>
                                    <div className={`absolute top-4 left-4 w-6 h-6 ${getAccentColor()} ${getBorderColor()} border ${getShadowClass()} flex items-center justify-center ${textClasses.primary} font-bold text-sm`}>
                                        Q
                                    </div>
                                    <p className={`${textClasses.secondary} italic mb-4 text-lg leading-relaxed ml-10`}>" {qa.question_text} "</p>
                                    <div className="flex items-start space-x-3">
                                        <div className={`w-6 h-6 ${getAccentColor()} ${getBorderColor()} border ${getShadowClass()} flex items-center justify-center ${textClasses.primary} font-bold text-sm flex-shrink-0`}>
                                            A
                                        </div>
                                        <p className={`${textClasses.primary} text-lg leading-relaxed`}>{qa.answer_text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {questions.length > 3 && (
                            <div className="text-center mb-6">
                                <Button
                                    variant="outline"
                                    className="transition-transform duration-150 ease-mechanical hover:scale-105"
                                    onClick={() => setShowAMA(true)}
                                    theme={selectedTheme}
                                    themeClasses={{ button: buttonClasses }}
                                >
                                    View All Questions ({questions.length})
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {/* Ask Question Button */}
                <div className="text-center space-y-6 mb-16">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            className="transition-transform duration-150 ease-mechanical hover:scale-105"
                            onClick={() => setShowAMA(true)}
                            size="large"
                            theme={selectedTheme}
                            themeClasses={{ button: buttonClasses }}
                        >
                            💬 Ask a Question
                        </Button>
                        <Button
                            variant="outline"
                            className="transition-transform duration-150 ease-mechanical hover:scale-105"
                            onClick={() => setShowQRCode(true)}
                            size="large"
                            theme={selectedTheme}
                            themeClasses={{ button: buttonClasses }}
                        >
                            📱 Share QR Code
                        </Button>
                    </div>

                    <div className={`flex items-center justify-center space-x-4 ${textClasses.secondary} text-sm`}>
                        <div className="flex items-center space-x-2">
                            <span className={`w-2 h-2 ${getAccentColor()} rounded-full`}></span>
                            <span>Free to ask</span>
                        </div>
                        <span className="opacity-50">•</span>
                        <div className="flex items-center space-x-2">
                            <span className={`w-2 h-2 ${getAccentColor()} rounded-full`}></span>
                            <span>Get answers</span>
                        </div>
                    </div>
                </div>

                {/* AMA Modal */}
                <Modal
                    isOpen={showAMA}
                    onClose={() => setShowAMA(false)}
                    title="Ask Me Anything"
                    size="large"
                >
                    <div>
                        {/* All Questions */}
                        {questions.length > 0 && (
                            <div className="mb-8">
                                <h3 className={`text-lg ${textClasses.heading} font-semibold mb-4`}>Previous Questions</h3>
                                <div className="space-y-4 max-h-64 overflow-y-auto">
                                    {questions.map((qa) => (
                                        <div key={qa.id} className={`${cardClasses} rounded-lg p-4`}>
                                            <p className={`font-medium ${textClasses.primary} mb-2`}>Q: {qa.question_text}</p>
                                            <p className={`${textClasses.secondary}`}>A: {qa.answer_text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Ask New Question */}
                        <div>
                            <h3 className={`text-lg ${textClasses.heading} font-semibold mb-4`}>Ask a New Question</h3>
                            <form onSubmit={handleSubmitQuestion}>
                                <div className="mb-6">
                                    <label className={`block text-sm ${textClasses.primary} font-medium mb-2`}>
                                        Your Question *
                                    </label>
                                    <textarea
                                        value={newQuestion}
                                        onChange={(e) => setNewQuestion(e.target.value)}
                                        className={`w-full px-3 py-2 ${getBorderColor()} border rounded focus:outline-none focus:ring-2 focus:ring-current ${textClasses.primary}`}
                                        rows={4}
                                        placeholder="What would you like to ask?"
                                        required
                                    />
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowAMA(false)}
                                        theme={selectedTheme}
                                        themeClasses={{ button: buttonClasses }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={submittingQuestion || !newQuestion.trim()}
                                        theme={selectedTheme}
                                        themeClasses={{ button: buttonClasses }}
                                    >
                                        {submittingQuestion ? 'Submitting...' : 'Submit Question'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>

                {/* QR Code Modal */}
                <QRCodeGenerator
                    url={window.location.href}
                    title={`${profile?.full_name || profile?.slug || 'OneLink'} Profile`}
                    showModal={showQRCode}
                    onCloseModal={() => setShowQRCode(false)}
                    theme={selectedTheme}
                    themeClasses={{
                        button: buttonClasses,
                        card: cardClasses,
                        text: textClasses,
                        backdrop: pageClasses.bg,
                        container: `${cardClasses.bg} ${cardClasses.border} ${getShadowClass()}`,
                        containerHover: getShadowClass(),
                        accent: getAccentColor().replace('bg-', 'border-b-'),
                        headerBorder: `border-b-2 ${getBorderColor().replace('border-', 'border-')}`,
                        titleFont: textClasses.heading?.includes('font-') ? textClasses.heading.split(' ').find(c => c.startsWith('font-')) : 'font-serif',
                        titleColor: textClasses.heading || textClasses.primary,
                        titleAccent: getAccentColor(),
                        contentFont: textClasses.body?.includes('font-') ? textClasses.body.split(' ').find(c => c.startsWith('font-')) : 'font-mono',
                        contentColor: textClasses.primary || textClasses.body
                    }}
                />

                {/* Footer */}
                <div className={`text-center pt-12 ${getBorderColor()} border-t-2 relative`}>
                    <div className={`absolute top-0 left-0 w-full h-1 ${getAccentColor()} opacity-30`}></div>
                    <div className="flex justify-center items-center space-x-4 mb-4">
                        <div className={`w-2 h-2 ${getAccentColor()} rotate-45`}></div>
                        <p className={`${textClasses.secondary} text-lg`}>
                            Powered by{' '}
                            <a href="/" className={`${getAccentColor().replace('bg-', 'text-')} hover:opacity-80 transition-colors duration-150 underline font-semibold`}>
                                OneLink
                            </a>
                        </p>
                        <div className={`w-2 h-2 ${getAccentColor()} rotate-45`}></div>
                    </div>
                    <p className="font-mono text-ink text-sm opacity-70">Create your own link-in-bio page</p>
                </div>
            </div>
        </div>
    )
}

export default PublicProfilePage