import React, { useState, useEffect } from 'react'
import Button from '../common/Button'
import Modal from '../common/Modal'
import { supabase } from '../../api/supabaseClient'

const AMATab = () => {
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedQuestion, setSelectedQuestion] = useState(null)
    const [answer, setAnswer] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        fetchQuestions()
    }, [])

    const fetchQuestions = async () => {
        try {
            // Get current user's profile ID
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data, error } = await supabase
                .from('questions')
                .select('*')
                .eq('profile_id', user.id)
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error fetching questions:', error)
            } else {
                setQuestions(data || [])
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAnswerQuestion = (question) => {
        setSelectedQuestion(question)
        setAnswer(question.answer_text || '')
        setIsModalOpen(true)
    }

    const handleSaveAnswer = async () => {
        if (!selectedQuestion || !answer.trim()) return

        try {
            const { error } = await supabase
                .from('questions')
                .update({
                    answer_text: answer.trim(),
                    is_published: true
                })
                .eq('id', selectedQuestion.id)

            if (error) {
                console.error('Error saving answer:', error)
                alert('Failed to save answer. Please try again.')
            } else {
                await fetchQuestions()
                setIsModalOpen(false)
                setSelectedQuestion(null)
                setAnswer('')
            }
        } catch (error) {
            console.error('Error:', error)
            alert('An unexpected error occurred.')
        }
    }

    const handleDeleteQuestion = async (questionId) => {
        if (!window.confirm('Are you sure you want to delete this question?')) {
            return
        }

        try {
            const { error } = await supabase
                .from('questions')
                .delete()
                .eq('id', questionId)

            if (error) {
                console.error('Error deleting question:', error)
                alert('Failed to delete question. Please try again.')
            } else {
                await fetchQuestions()
            }
        } catch (error) {
            console.error('Error:', error)
            alert('An unexpected error occurred.')
        }
    }

    const handleTogglePublish = async (question) => {
        try {
            const { error } = await supabase
                .from('questions')
                .update({
                    is_published: !question.is_published
                })
                .eq('id', question.id)

            if (error) {
                console.error('Error updating question:', error)
                alert('Failed to update question. Please try again.')
            } else {
                await fetchQuestions()
            }
        } catch (error) {
            console.error('Error:', error)
            alert('An unexpected error occurred.')
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-ink font-mono">Loading questions...</p>
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Ask Me Anything</h2>
                <Button onClick={fetchQuestions}>
                    Refresh
                </Button>
            </div>

            {questions.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-ink font-mono mb-4">No questions yet.</p>
                    <p className="text-ink font-mono text-sm">
                        Questions submitted through your public page will appear here.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {questions.map((question) => (
                        <div key={question.id} className="bg-parchment border border-charcoal shadow-sharp p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <p className="text-charcoal font-mono font-medium mb-2">
                                        "{question.question_text}"
                                    </p>
                                    <p className="text-sm text-ink font-mono">
                                        Asked on {formatDate(question.created_at)}
                                    </p>
                                </div>

                                <div className="flex items-center space-x-2 ml-4">
                                    {question.is_published && (
                                        <span className="px-2 py-1 bg-verdigris bg-opacity-20 text-verdigris text-xs border border-verdigris font-mono">
                                            Published
                                        </span>
                                    )}
                                    {question.answer && !question.is_published && (
                                        <span className="px-2 py-1 bg-sienna bg-opacity-20 text-sienna text-xs border border-sienna font-mono">
                                            Answered
                                        </span>
                                    )}
                                    {!question.answer_text && (
                                        <span className="px-2 py-1 bg-ink bg-opacity-20 text-ink text-xs border border-ink font-mono">
                                            Pending
                                        </span>
                                    )}
                                </div>
                            </div>

                            {question.answer_text && (
                                <div className="bg-canvas border-l-4 border-verdigris p-4 mb-4">
                                    <p className="text-charcoal font-mono">
                                        <strong className="font-serif">Your answer:</strong> {question.answer_text}
                                    </p>
                                </div>
                            )}

                            <div className="flex justify-end space-x-2">
                                <Button
                                    variant="outline"
                                    size="small"
                                    onClick={() => handleAnswerQuestion(question)}
                                >
                                    {question.answer_text ? 'Edit Answer' : 'Answer'}
                                </Button>

                                {question.answer_text && (
                                    <Button
                                        variant={question.is_published ? 'secondary' : 'primary'}
                                        size="small"
                                        onClick={() => handleTogglePublish(question)}
                                    >
                                        {question.is_published ? 'Unpublish' : 'Publish'}
                                    </Button>
                                )}

                                <Button
                                    variant="danger"
                                    size="small"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Answer Question"
                size="large"
            >
                {selectedQuestion && (
                    <div>
                        <div className="mb-4">
                            <p className="font-serif font-medium text-charcoal mb-2">Question:</p>
                            <p className="text-charcoal bg-parchment border border-ink shadow-sharp p-3">
                                "{selectedQuestion.question_text}"
                            </p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">
                                Your Answer
                            </label>
                            <textarea
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="w-full px-3 py-2 border border-ink shadow-sharp focus:outline-none focus:shadow-sharp-inset bg-parchment font-mono text-charcoal"
                                rows={6}
                                placeholder="Type your answer here..."
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Button
                                variant="outline"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSaveAnswer}
                                disabled={!answer.trim()}
                            >
                                Save & Publish Answer
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default AMATab