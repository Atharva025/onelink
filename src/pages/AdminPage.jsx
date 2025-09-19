import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/common/Button'
import ContentEditor from '../components/admin/ContentEditor'
import AppearanceTab from '../components/admin/AppearanceTab'
import AMATab from '../components/admin/AMATab'
import QRCodeTab from '../components/admin/QRCodeTab'
import { supabase } from '../api/supabaseClient'

const AdminPage = () => {
    const { user, signOut } = useAuth()
    const [activeTab, setActiveTab] = useState('content')
    const [blocks, setBlocks] = useState([])
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            loadUserData()
        }
    }, [user])

    const loadUserData = async () => {
        try {
            console.log('Loading user data for user:', user?.id)
            console.log('User object:', user)

            // Load user profile
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()

            console.log('Profile query result:', { profileData, profileError })

            if (profileError && profileError.code !== 'PGRST116') {
                console.error('Error loading profile:', profileError)
            } else {
                const profileInfo = {
                    slug: profileData?.slug || '',
                    fullName: profileData?.full_name || '',
                    bio: profileData?.bio || '',
                    profileImage: profileData?.avatar_url || '',
                    statusMessage: profileData?.status_message || '',
                    ...(profileData?.theme_settings || {})
                }
                console.log('Setting profile info:', profileInfo)
                setProfile(profileInfo)
            }

            // Load content blocks
            const { data: blocksData, error: blocksError } = await supabase
                .from('blocks')
                .select('*')
                .eq('profile_id', user.id)
                .order('display_order')

            console.log('Blocks query result:', { blocksData, blocksError })

            if (blocksError) {
                console.error('Error loading blocks:', blocksError)
            } else {
                setBlocks(blocksData?.map(block => ({
                    id: block.id.toString(),
                    type: block.type,
                    ...block.content
                })) || [])
            }
        } catch (error) {
            console.error('Error loading user data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleBlocksChange = async (newBlocks) => {
        setBlocks(newBlocks)

        try {
            console.log('Saving blocks for user:', user?.id)
            console.log('New blocks:', newBlocks)

            // Delete existing blocks
            const { error: deleteError } = await supabase
                .from('blocks')
                .delete()
                .eq('profile_id', user.id)

            if (deleteError) {
                console.error('Error deleting existing blocks:', deleteError)
            }

            // Insert new blocks with order
            if (newBlocks.length > 0) {
                const blocksToInsert = newBlocks.map((block, index) => {
                    const { id, type, ...content } = block
                    return {
                        profile_id: user.id,
                        type: type,
                        content: content,
                        display_order: index
                    }
                })

                console.log('Blocks to insert:', blocksToInsert)

                const { error } = await supabase
                    .from('blocks')
                    .insert(blocksToInsert)

                if (error) {
                    console.error('Error saving blocks:', error)
                    console.error('Error details:', JSON.stringify(error, null, 2))
                    console.error(`Failed to save changes: ${error.message || 'Unknown error'}. Please try again.`)
                } else {
                    console.log('Blocks saved successfully')
                }
            }
        } catch (error) {
            console.error('Error saving blocks:', error)
            console.error('Error details:', JSON.stringify(error, null, 2))
            console.error(`An unexpected error occurred while saving: ${error.message || 'Unknown error'}`)
        }
    }

    const handleAppearanceChange = async (newProfile) => {
        setProfile(newProfile)

        try {
            console.log('Saving profile for user:', user?.id)
            console.log('New profile data:', newProfile)

            // Validate slug before saving
            if (newProfile.slug) {
                if (newProfile.slug.length <= 3) {
                    console.error('Profile slug must be more than 3 characters long.')
                    return
                }
                if (!/^[a-zA-Z0-9_-]+$/.test(newProfile.slug)) {
                    console.error('Profile slug can only contain letters, numbers, underscores, and hyphens.')
                    return
                }
            }

            const { theme, primaryColor, backgroundColor, textColor, font, ...themeSettings } = newProfile

            const profileUpdate = {
                id: user.id,
                slug: newProfile.slug || null,
                full_name: newProfile.fullName || null,
                bio: newProfile.bio || null,
                avatar_url: newProfile.profileImage || null,
                status_message: newProfile.statusMessage || null,
                theme_settings: {
                    theme,
                    primaryColor,
                    backgroundColor,
                    textColor,
                    font,
                    ...themeSettings
                }
            }

            console.log('Profile update object:', profileUpdate)

            const { error } = await supabase
                .from('profiles')
                .upsert(profileUpdate)

            if (error) {
                console.error('Error saving profile:', error)
                console.error('Error details:', JSON.stringify(error, null, 2))

                // Log specific error messages for common issues
                if (error.code === '23514' && error.message.includes('profiles_slug_check')) {
                    console.error('Invalid profile slug. It must be more than 3 characters and contain only letters, numbers, underscores, and hyphens.')
                } else if (error.code === '23505' && error.message.includes('profiles_slug_key')) {
                    console.error('This profile slug is already taken. Please choose a different one.')
                } else {
                    console.error(`Failed to save profile settings: ${error.message || 'Unknown error'}. Please try again.`)
                }
            } else {
                console.log('Profile saved successfully')
            }
        } catch (error) {
            console.error('Error saving profile:', error)
            console.error('Error details:', JSON.stringify(error, null, 2))
            console.error(`An unexpected error occurred while saving: ${error.message || 'Unknown error'}`)
        }
    }

    const handleSignOut = async () => {
        try {
            await signOut()
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    const tabs = [
        { id: 'content', label: 'Content', icon: '📝' },
        { id: 'appearance', label: 'Appearance', icon: '🎨' },
        { id: 'qrcode', label: 'QR Code', icon: '📱' },
        { id: 'ama', label: 'Ask Me Anything', icon: '❓' }
    ]

    if (loading) {
        return (
            <div className="min-h-screen bg-parchment flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-verdigris mx-auto mb-4"></div>
                    <p className="font-mono text-charcoal">Loading your workshop...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-parchment">
            {/* Header */}
            <header className="bg-parchment border-b border-ink shadow-sharp-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div>
                            <h1 className="text-2xl font-serif font-bold text-charcoal">The Workshop</h1>
                            <p className="font-mono text-ink">Welcome back, {user?.email}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    if (profile?.slug) {
                                        window.open(`/${profile.slug}`, '_blank')
                                    } else {
                                        alert('Please set up your profile slug first in the Appearance tab')
                                    }
                                }}
                            >
                                View Public Page
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-parchment border border-ink shadow-sharp">
                    {/* Tabs */}
                    <div className="border-b border-ink bg-parchment">
                        <nav className="flex space-x-8 px-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-4 px-1 border-b-2 font-mono font-medium text-sm transition-colors ${activeTab === tab.id
                                        ? 'border-verdigris text-charcoal'
                                        : 'border-transparent text-ink hover:text-charcoal hover:border-ink'
                                        }`}
                                >
                                    <span className="mr-2">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6 font-mono text-charcoal">
                        {activeTab === 'content' && (
                            <ContentEditor
                                blocks={blocks}
                                onBlocksChange={handleBlocksChange}
                            />
                        )}

                        {activeTab === 'appearance' && (
                            <AppearanceTab
                                appearance={profile}
                                onAppearanceChange={handleAppearanceChange}
                            />
                        )}

                        {activeTab === 'qrcode' && <QRCodeTab profile={profile} />}

                        {activeTab === 'ama' && <AMATab />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage