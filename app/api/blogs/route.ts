import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        if (slug) {
            // Get single blog by slug
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('slug', slug)
                .eq('published', true)
                .single();

            if (error) throw error;

            if (data) {
                // Increment view count
                await supabase
                    .from('blogs')
                    .update({ views: data.views + 1 })
                    .eq('id', data.id);
            }

            return NextResponse.json(data);
        } else {
            // Get all published blogs
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return NextResponse.json(data);
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { adminPassword, ...blogData } = body;

        // Check admin password
        if (adminPassword !== process.env.ADMIN_PASS) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Create slug from title if not provided
        if (!blogData.slug) {
            blogData.slug = blogData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }

        const { data, error } = await supabase
            .from('blogs')
            .insert([blogData])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { adminPassword, id, ...blogData } = body;

        // Check admin password
        if (adminPassword !== process.env.ADMIN_PASS) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data, error } = await supabase
            .from('blogs')
            .update(blogData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const adminPassword = searchParams.get('adminPassword');

        // Check admin password
        if (adminPassword !== process.env.ADMIN_PASS) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!id) {
            return NextResponse.json({ error: 'Blog ID required' }, { status: 400 });
        }

        const { error } = await supabase
            .from('blogs')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
