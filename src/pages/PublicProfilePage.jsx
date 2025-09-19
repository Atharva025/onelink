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
            <div className="min-h-screen bg-parchment flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-verdigris mx-auto mb-4"></div>
                    <p className="font-mono text-ink">Loading profile...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-parchment flex items-center justify-center">
                <div className="text-center bg-parchment border border-ink shadow-sharp p-12">
                    <h1 className="text-4xl font-serif font-bold text-charcoal mb-4">Profile Not Found</h1>
                    <p className="font-mono text-ink mb-8">The profile you're looking for doesn't exist or has been removed.</p>
                    <Button onClick={() => window.location.href = '/'}>
                        Go to OneLink
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-parchment">
            <div className="max-w-2xl mx-auto px-4 py-8">
                {/* Profile Header */}
                <div className="text-center mb-8 bg-parchment border border-ink shadow-sharp p-8">
                    {profile?.avatar_url && (
                        <div className="relative inline-block mb-4">
                            <img
                                src={profile.avatar_url}
                                alt="Profile"
                                className="w-24 h-24 border-2 border-ink shadow-sharp-inset object-cover mx-auto"
                                style={{ borderRadius: '50%' }}
                                onError={(e) => {
                                    e.target.style.display = 'none'
                                }}
                            />
                        </div>
                    )}

                    <h1 className="text-3xl font-serif font-bold mb-2 text-charcoal">
                        {profile?.full_name || profile?.slug || 'User Profile'}
                    </h1>

                    {profile?.bio && (
                        <p className="text-lg font-mono text-ink max-w-md mx-auto leading-relaxed mb-4">
                            {profile.bio}
                        </p>
                    )}

                    {profile?.status_message && (
                        <p className="text-sm font-mono text-ink italic">
                            {profile.status_message}
                        </p>
                    )}
                </div>

                {/* Content Blocks */}
                <div className="space-y-4 mb-8">
                    {blocks.length === 0 ? (
                        <div className="text-center py-12 bg-parchment border border-ink shadow-sharp">
                            <p className="text-lg font-mono text-ink">No content to display yet.</p>
                        </div>
                    ) : (
                        blocks.map((block, index) => renderBlock(block, index))
                    )}
                </div>

                {/* AMA Section */}
                {questions.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-serif font-bold mb-6 text-center text-charcoal">
                            Ask Me Anything
                        </h2>

                        <div className="space-y-4 mb-6">
                            {questions.slice(0, 3).map((qa) => (
                                <div key={qa.id} className="bg-parchment border border-ink shadow-sharp p-6">
                                    <p className="font-serif italic text-ink mb-3">Q: {qa.question_text}</p>
                                    <p className="font-mono text-charcoal">A: {qa.answer_text}</p>
                                </div>
                            ))}
                        </div>

                        {questions.length > 3 && (
                            <div className="text-center mb-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowAMA(true)}
                                >
                                    View All Questions ({questions.length})
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {/* Ask Question Button */}
                <div className="text-center space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                            onClick={() => setShowAMA(true)}
                        >
                            Ask a Question
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setShowQRCode(true)}
                        >
                            📱 Share QR Code
                        </Button>
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
                <div className="text-center mt-12 pt-8 border-t border-ink">
                    <p className="text-sm font-mono text-ink">
                        Powered by{' '}
                        <a href="/" className="text-verdigris hover:underline">
                            OneLink
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PublicProfilePage