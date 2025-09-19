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

    const pageStyle = {
        backgroundColor: profile?.theme_settings?.backgroundColor || '#ffffff',
        color: profile?.theme_settings?.textColor || '#1f2937',
        fontFamily: profile?.theme_settings?.font ? `var(--font-${profile.theme_settings.font})` : 'inherit'
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-parchment flex items-center justify-center relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-16 w-4 h-4 bg-verdigris border border-ink shadow-sharp-sm rotate-45"></div>
                    <div className="absolute top-40 right-20 w-6 h-6 bg-ink border border-charcoal shadow-sharp-sm"></div>
                    <div className="absolute bottom-40 left-20 w-5 h-5 bg-sienna border border-ink shadow-sharp-sm rotate-45"></div>
                    <div className="absolute bottom-20 right-16 w-3 h-3 bg-verdigris border border-ink shadow-sharp-sm"></div>
                </div>
                
                <div className="text-center relative z-10">
                    <div className="w-16 h-16 bg-verdigris border-2 border-ink shadow-sharp flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <span className="text-parchment font-serif font-bold text-xl">OL</span>
                    </div>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-verdigris mx-auto mb-6"></div>
                    <p className="font-mono text-ink text-lg">Loading profile...</p>
                    <div className="mt-4 flex justify-center space-x-1">
                        <div className="w-2 h-2 bg-verdigris rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-verdigris rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-verdigris rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-parchment flex items-center justify-center relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-16 w-4 h-4 bg-verdigris border border-ink shadow-sharp-sm rotate-45"></div>
                    <div className="absolute top-40 right-20 w-6 h-6 bg-ink border border-charcoal shadow-sharp-sm"></div>
                    <div className="absolute bottom-40 left-20 w-5 h-5 bg-sienna border border-ink shadow-sharp-sm rotate-45"></div>
                    <div className="absolute bottom-20 right-16 w-3 h-3 bg-verdigris border border-ink shadow-sharp-sm"></div>
                </div>
                
                <div className="text-center bg-parchment border-2 border-ink shadow-sharp p-16 relative z-10 max-w-lg">
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-b-[30px] border-b-sienna opacity-20"></div>
                    <div className="w-16 h-16 bg-sienna border-2 border-ink shadow-sharp flex items-center justify-center mx-auto mb-6">
                        <span className="text-parchment font-serif font-bold text-2xl">!</span>
                    </div>
                    <h1 className="text-4xl font-serif font-bold text-charcoal mb-6 relative">
                        Profile Not Found
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-sienna"></div>
                    </h1>
                    <p className="font-mono text-ink mb-10 text-lg leading-relaxed">The profile you're looking for doesn't exist or has been removed.</p>
                    <Button 
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

    return (
        <div className="min-h-screen bg-parchment relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-15">
                <div className="absolute top-32 left-10 w-6 h-6 bg-verdigris border border-ink shadow-sharp-sm rotate-45"></div>
                <div className="absolute top-64 right-16 w-4 h-4 bg-ink border border-charcoal shadow-sharp-sm"></div>
                <div className="absolute bottom-64 left-16 w-5 h-5 bg-sienna border border-ink shadow-sharp-sm rotate-45"></div>
                <div className="absolute bottom-32 right-10 w-3 h-3 bg-verdigris border border-ink shadow-sharp-sm"></div>
                <div className="absolute top-1/2 left-8 w-8 h-8 border-2 border-ink opacity-20 rotate-45"></div>
                <div className="absolute top-1/3 right-8 w-6 h-6 border-2 border-verdigris opacity-20"></div>
            </div>
            
            <div className="max-w-2xl mx-auto px-4 py-12 relative z-10">
                {/* Profile Header */}
                <div className="text-center mb-12 bg-parchment border-2 border-ink shadow-sharp p-12 relative overflow-hidden group hover:shadow-sharp-sm transition-all duration-150 ease-mechanical">
                    {/* Background accent */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-b-[40px] border-b-verdigris opacity-10"></div>
                    
                    {profile?.avatar_url && (
                        <div className="relative inline-block mb-6">
                            <div className="absolute inset-0 bg-verdigris border-2 border-ink shadow-sharp rounded-full transform rotate-3"></div>
                            <img
                                src={profile.avatar_url}
                                alt="Profile"
                                className="w-32 h-32 border-2 border-ink shadow-sharp object-cover mx-auto relative z-10 rounded-full transition-transform duration-150 group-hover:scale-105"
                                onError={(e) => {
                                    e.target.style.display = 'none'
                                }}
                            />
                        </div>
                    )}

                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-charcoal relative">
                        {profile?.full_name || profile?.slug || 'User Profile'}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-verdigris"></div>
                    </h1>

                    {profile?.bio && (
                        <p className="text-xl font-mono text-ink max-w-lg mx-auto leading-relaxed mb-6">
                            {profile.bio}
                        </p>
                    )}

                    {profile?.status_message && (
                        <div className="inline-flex items-center space-x-2 bg-verdigris bg-opacity-10 border border-verdigris px-4 py-2">
                            <div className="w-2 h-2 bg-verdigris rounded-full animate-pulse"></div>
                            <p className="font-mono text-ink italic">
                                {profile.status_message}
                            </p>
                        </div>
                    )}
                </div>

                {/* Content Blocks */}
                <div className="space-y-6 mb-12">
                    {blocks.length === 0 ? (
                        <div className="text-center py-16 bg-parchment border-2 border-ink shadow-sharp relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-b-[30px] border-b-ink opacity-10"></div>
                            <div className="w-16 h-16 bg-ink border-2 border-charcoal shadow-sharp flex items-center justify-center mx-auto mb-6">
                                <span className="text-parchment font-serif font-bold text-2xl">📄</span>
                            </div>
                            <p className="text-xl font-mono text-ink">No content to display yet.</p>
                            <p className="text-sm font-mono text-ink opacity-70 mt-2">Check back later for updates!</p>
                        </div>
                    ) : (
                        blocks.map((block, index) => renderBlock(block, index))
                    )}
                </div>

                {/* AMA Section */}
                {questions.length > 0 && (
                    <div className="mb-12">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal relative inline-block">
                                Ask Me Anything
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-verdigris"></div>
                            </h2>
                            <p className="font-mono text-ink mt-4 text-lg">Explore recent conversations</p>
                        </div>

                        <div className="space-y-6 mb-8">
                            {questions.slice(0, 3).map((qa, index) => (
                                <div key={qa.id} className="bg-parchment border-2 border-ink shadow-sharp p-8 group hover:shadow-sharp-sm hover:translate-x-1 hover:translate-y-1 transition-all duration-150 ease-mechanical relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-verdigris opacity-20"></div>
                                    <div className="absolute top-4 left-4 w-6 h-6 bg-verdigris border border-ink shadow-sharp-sm flex items-center justify-center text-parchment font-mono font-bold text-sm">
                                        Q
                                    </div>
                                    <p className="font-serif italic text-ink mb-4 text-lg leading-relaxed ml-10">" {qa.question_text} "</p>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 bg-ink border border-charcoal shadow-sharp-sm flex items-center justify-center text-parchment font-mono font-bold text-sm flex-shrink-0">
                                            A
                                        </div>
                                        <p className="font-mono text-charcoal text-lg leading-relaxed">{qa.answer_text}</p>
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
                        >
                            💬 Ask a Question
                        </Button>
                        <Button
                            variant="outline"
                            className="transition-transform duration-150 ease-mechanical hover:scale-105"
                            onClick={() => setShowQRCode(true)}
                            size="large"
                        >
                            📱 Share QR Code
                        </Button>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-4 text-ink font-mono text-sm">
                        <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-verdigris rounded-full"></span>
                            <span>Free to ask</span>
                        </div>
                        <span className="opacity-50">•</span>
                        <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-verdigris rounded-full"></span>
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
                                <h3 className="text-lg font-semibold mb-4">Previous Questions</h3>
                                <div className="space-y-4 max-h-64 overflow-y-auto">
                                    {questions.map((qa) => (
                                        <div key={qa.id} className="bg-gray-50 rounded-lg p-4">
                                            <p className="font-medium text-gray-900 mb-2">Q: {qa.question_text}</p>
                                            <p className="text-gray-700">A: {qa.answer_text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Ask New Question */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Ask a New Question</h3>
                            <form onSubmit={handleSubmitQuestion}>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-2">
                                        Your Question *
                                    </label>
                                    <textarea
                                        value={newQuestion}
                                        onChange={(e) => setNewQuestion(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={submittingQuestion || !newQuestion.trim()}
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
                />

                {/* Footer */}
                <div className="text-center pt-12 border-t-2 border-ink relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-verdigris via-ink to-sienna opacity-30"></div>
                    <div className="flex justify-center items-center space-x-4 mb-4">
                        <div className="w-2 h-2 bg-verdigris rotate-45"></div>
                        <p className="font-mono text-ink text-lg">
                            Powered by{' '}
                            <a href="/" className="text-verdigris hover:text-charcoal transition-colors duration-150 underline font-semibold">
                                OneLink
                            </a>
                        </p>
                        <div className="w-2 h-2 bg-verdigris rotate-45"></div>
                    </div>
                    <p className="font-mono text-ink text-sm opacity-70">Create your own link-in-bio page</p>
                </div>
            </div>
        </div>
    )
}

export default PublicProfilePage