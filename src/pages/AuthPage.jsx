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
        <div className="min-h-screen bg-parchment flex items-center justify-center px-4 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-16 left-16 w-6 h-6 bg-verdigris border border-ink shadow-sharp-sm rotate-45"></div>
                <div className="absolute top-32 right-20 w-4 h-4 bg-ink border border-charcoal shadow-sharp-sm"></div>
                <div className="absolute bottom-32 left-20 w-5 h-5 bg-sienna border border-ink shadow-sharp-sm rotate-45"></div>
                <div className="absolute bottom-16 right-16 w-3 h-3 bg-verdigris border border-ink shadow-sharp-sm"></div>
                <div className="absolute top-1/2 left-1/4 w-8 h-8 border-2 border-ink opacity-30 rotate-45"></div>
                <div className="absolute top-1/3 right-1/3 w-6 h-6 border-2 border-verdigris opacity-30"></div>
            </div>
            
            <div className="max-w-md w-full relative z-10">
                {/* Logo and Header */}
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-verdigris border-2 border-ink shadow-sharp flex items-center justify-center mx-auto mb-6 transition-all duration-150 ease-mechanical hover:shadow-sharp-sm hover:translate-x-1 hover:translate-y-1">
                        <span className="text-parchment font-serif font-bold text-2xl">OL</span>
                    </div>
                    <h1 className="text-4xl font-serif font-bold text-charcoal mb-4 relative">
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-verdigris"></div>
                    </h1>
                    <p className="font-mono text-ink text-lg">
                        {isSignUp ? 'Join the OneLink community' : 'Sign in to your dashboard'}
                    </p>
                </div>

                {/* Main Form Card */}
                <div className="bg-parchment border-2 border-ink shadow-sharp p-10 relative overflow-hidden group hover:shadow-sharp-sm transition-all duration-150 ease-mechanical">
                    {/* Subtle background accent */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-b-[30px] border-b-verdigris opacity-10"></div>
                    
                    {error && (
                        <div className="mb-8 p-6 bg-sienna bg-opacity-10 border-2 border-sienna text-sienna font-mono relative" role="alert">
                            <div className="absolute top-2 left-2 w-3 h-3 bg-sienna rotate-45"></div>
                            <div className="ml-4">{error}</div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="group">
                            <label htmlFor="email" className="block font-mono font-medium text-charcoal mb-3 text-lg">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-ink font-mono text-charcoal text-lg placeholder-ink focus:border-verdigris focus:outline-none transition-all duration-150 group-hover:border-verdigris"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div className="group">
                            <label htmlFor="password" className="block font-mono font-medium text-charcoal mb-3 text-lg">
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
                                className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-ink font-mono text-charcoal text-lg placeholder-ink focus:border-verdigris focus:outline-none transition-all duration-150 group-hover:border-verdigris"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="pt-6">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full transform transition-all duration-150 ease-mechanical hover:scale-105"
                                size="large"
                            >
                                {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-10 pt-8 border-t-2 border-ink text-center">
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            disabled={loading}
                            className="font-mono text-ink hover:text-verdigris transition-colors duration-150 underline text-lg group"
                        >
                            <span className="group-hover:no-underline">
                                {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                        <div className="w-2 h-2 bg-verdigris rotate-45"></div>
                        <p className="font-mono text-ink">
                            © 2025 OneLink. Crafted for creators.
                        </p>
                        <div className="w-2 h-2 bg-verdigris rotate-45"></div>
                    </div>
                    <div className="flex justify-center space-x-6 text-ink font-mono text-sm">
                        <span className="hover:text-verdigris transition-colors duration-150 cursor-pointer">Privacy</span>
                        <span className="opacity-50">•</span>
                        <span className="hover:text-verdigris transition-colors duration-150 cursor-pointer">Terms</span>
                        <span className="opacity-50">•</span>
                        <span className="hover:text-verdigris transition-colors duration-150 cursor-pointer">Support</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage