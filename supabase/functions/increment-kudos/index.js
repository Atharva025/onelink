import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // Initialize Supabase client
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // Get request body
        const { profileId, blockId } = await req.json()

        if (!profileId || !blockId) {
            return new Response(
                JSON.stringify({ error: 'Missing profileId or blockId' }),
                {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                }
            )
        }

        // Get the specific block
        const { data: blockData, error: blockError } = await supabaseClient
            .from('blocks')
            .select('content')
            .eq('profile_id', profileId)
            .eq('id', blockId)
            .single()

        if (blockError) {
            throw blockError
        }

        // Update the kudos count in the block content
        const currentContent = blockData.content
        const newKudosCount = (currentContent.kudos || 0) + 1

        const updatedContent = {
            ...currentContent,
            kudos: newKudosCount
        }

        const { error: updateError } = await supabaseClient
            .from('blocks')
            .update({ content: updatedContent })
            .eq('profile_id', profileId)
            .eq('id', blockId)

        if (updateError) {
            throw updateError
        }

        // Also update the profile's total kudos count
        const { error: profileUpdateError } = await supabaseClient
            .rpc('increment_profile_kudos', { profile_id: profileId })

        if (profileUpdateError) {
            console.warn('Failed to update profile kudos count:', profileUpdateError)
        }

        return new Response(
            JSON.stringify({
                success: true,
                kudos: newKudosCount
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        )

    } catch (error) {
        console.error('Error:', error)

        return new Response(
            JSON.stringify({
                error: error.message || 'Internal server error'
            }),
            {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        )
    }
})