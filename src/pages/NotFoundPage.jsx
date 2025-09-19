import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-gray-300">404</h1>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Page Not Found
                </h2>

                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/">
                        <Button size="large">
                            Go Home
                        </Button>
                    </Link>

                    <Button
                        variant="outline"
                        size="large"
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </Button>
                </div>

                <div className="mt-12 text-sm text-gray-500">
                    <p>If you believe this is an error, please contact support.</p>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage