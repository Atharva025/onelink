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
        try {
            console.log('Saving profile for user:', user?.id)
            console.log('New profile data:', newProfile)

            // Validate slug before saving
            if (newProfile.slug) {
                if (newProfile.slug.length <= 3) {
                    alert('Profile slug must be more than 3 characters long.')
                    throw new Error('Profile slug must be more than 3 characters long.')
                }
                if (!/^[a-zA-Z0-9_-]+$/.test(newProfile.slug)) {
                    alert('Profile slug can only contain letters, numbers, underscores, and hyphens.')
                    throw new Error('Profile slug can only contain letters, numbers, underscores, and hyphens.')
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
                    alert('Invalid profile slug. It must be more than 3 characters and contain only letters, numbers, underscores, and hyphens.')
                    throw new Error('Invalid profile slug. It must be more than 3 characters and contain only letters, numbers, underscores, and hyphens.')
                } else if (error.code === '23505' && error.message.includes('profiles_slug_key')) {
                    alert('This profile slug is already taken. Please choose a different one.')
                    throw new Error('This profile slug is already taken. Please choose a different one.')
                } else {
                    alert(`Failed to save profile settings: ${error.message || 'Unknown error'}. Please try again.`)
                    throw new Error(`Failed to save profile settings: ${error.message || 'Unknown error'}. Please try again.`)
                }
            } else {
                console.log('Profile saved successfully')
                // Update local state with the saved data
                setProfile(newProfile)
            }
        } catch (error) {
            console.error('Error saving profile:', error)
            console.error('Error details:', JSON.stringify(error, null, 2))
            // Re-throw the error so the AppearanceTab can handle it
            throw error
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
                    <p className="font-mono text-charcoal text-lg">Loading your workshop...</p>
                    <div className="mt-4 flex justify-center space-x-1">
                        <div className="w-2 h-2 bg-verdigris rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-verdigris rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-verdigris rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-parchment relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-15">
                <div className="absolute top-32 left-20 w-6 h-6 bg-verdigris border border-ink shadow-sharp-sm rotate-45"></div>
                <div className="absolute top-64 right-32 w-4 h-4 bg-ink border border-charcoal shadow-sharp-sm"></div>
                <div className="absolute bottom-64 left-32 w-5 h-5 bg-sienna border border-ink shadow-sharp-sm rotate-45"></div>
                <div className="absolute bottom-32 right-20 w-3 h-3 bg-verdigris border border-ink shadow-sharp-sm"></div>
                <div className="absolute top-1/2 left-16 w-8 h-8 border-2 border-ink opacity-30 rotate-45"></div>
                <div className="absolute top-1/3 right-16 w-6 h-6 border-2 border-verdigris opacity-30"></div>
            </div>

            {/* Header */}
            <header className="bg-parchment border-b-2 border-ink shadow-sharp relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="group">
                            <div className="flex items-center mb-2">
                                <div className="w-12 h-12 bg-verdigris border-2 border-ink shadow-sharp flex items-center justify-center mr-4 transition-all duration-150 ease-mechanical group-hover:shadow-sharp-sm group-hover:translate-x-1 group-hover:translate-y-1">
                                    <span className="text-parchment font-serif font-bold text-lg">OL</span>
                                </div>
                                <h1 className="text-3xl font-serif font-bold text-charcoal relative">
                                    The Workshop
                                    <div className="absolute -bottom-1 left-0 w-16 h-1 bg-verdigris"></div>
                                </h1>
                            </div>
                            <p className="font-mono text-ink text-lg ml-16">Welcome back, {user?.email}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                className="transition-transform duration-150 ease-mechanical hover:scale-105"
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
                                className="transition-transform duration-150 ease-mechanical hover:scale-105"
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="bg-parchment border-2 border-ink shadow-sharp relative overflow-hidden">
                    {/* Background accent for the main card */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-b-[40px] border-b-verdigris opacity-10"></div>

                    {/* Tabs */}
                    <div className="border-b-2 border-ink bg-parchment relative">
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-verdigris via-ink to-sienna opacity-20"></div>
                        <nav className="flex space-x-8 px-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-6 px-2 border-b-2 font-mono font-medium text-lg transition-all duration-150 ease-mechanical group ${activeTab === tab.id
                                            ? 'border-verdigris text-charcoal transform scale-105'
                                            : 'border-transparent text-ink hover:text-charcoal hover:border-ink hover:scale-105'
                                        }`}
                                >
                                    <span className="mr-3 text-xl group-hover:scale-110 transition-transform duration-150">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-8 font-mono text-charcoal relative">
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