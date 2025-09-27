import { NextRequest, NextResponse } from 'next/server'
import { logger } from '../../../lib/logger'
import { SecurityValidator } from '../../../lib/security'
import { createBlogPost, getBlogPosts } from '../../../lib/models/BlogPost'


// content will be updated here after creating login and register endpoints