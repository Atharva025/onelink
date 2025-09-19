import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Spinner from '../common/Spinner'

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner size="large" />
            </div>
        )
    }

    if (!user) {
        // Redirect to login page with return url
        return <Navigate to="/auth" state={{ from: location }} replace />
    }

    return children
}

export default ProtectedRoute