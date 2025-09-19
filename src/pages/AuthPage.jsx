import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/common/Button'

const AuthPage = () => {
    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const { signIn, signUp } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            let result
            if (isSignUp) {
                result = await signUp(email, password)
            } else {
                result = await signIn(email, password)
            }

            if (result.error) {
                setError(result.error.message)
            } else {
                navigate('/admin')
            }
        } catch (err) {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-parchment flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Logo and Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-verdigris border border-ink shadow-sharp flex items-center justify-center mx-auto mb-4">
                        <span className="text-parchment font-serif font-bold text-xl">OL</span>
                    </div>
                    <h1 className="text-3xl font-serif font-bold text-charcoal mb-2">
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h1>
                    <p className="font-mono text-ink">
                        {isSignUp ? 'Join the OneLink community' : 'Sign in to your dashboard'}
                    </p>
                </div>

                {/* Main Form Card */}
                <div className="bg-parchment border border-ink shadow-sharp p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-sienna bg-opacity-10 border border-sienna text-sienna font-mono text-sm" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-mono font-medium text-charcoal mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-ink font-mono text-charcoal placeholder-ink focus:border-verdigris focus:outline-none transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-mono font-medium text-charcoal mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                minLength={6}
                                className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-ink font-mono text-charcoal placeholder-ink focus:border-verdigris focus:outline-none transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full"
                                size="large"
                            >
                                {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t border-ink text-center">
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            disabled={loading}
                            className="font-mono text-ink hover:text-verdigris transition-colors underline"
                        >
                            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="font-mono text-ink text-sm">
                        © 2025 OneLink. Crafted for creators.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AuthPage