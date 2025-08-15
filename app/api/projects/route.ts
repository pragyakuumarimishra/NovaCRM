import { NextRequest, NextResponse } from 'next/server';
import { projects } from '@/lib/data/projects';

export async function GET() {
  try {
    return NextResponse.json({ 
      success: true, 
      data: projects 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.description || !body.status || !body.priority) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newProject = {
      name: body.name,
      description: body.description,
      status: body.status,
      priority: body.priority,
      progress: body.progress || 0,
      due: body.due || new Date().toISOString().split('T')[0],
      spend: body.spend || 0,
      budget: body.budget || 0,
      team: body.team || [],
    };

    projects.push(newProject);

    return NextResponse.json({
      success: true,
      data: newProject
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}