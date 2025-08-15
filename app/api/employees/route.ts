import { NextRequest, NextResponse } from 'next/server';
import { employees } from '@/lib/data/employees';

export async function GET() {
  try {
    return NextResponse.json({ 
      success: true, 
      data: employees 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch employees' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.email || !body.role || !body.dept) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newEmployee = {
      id: `EMP-${String(employees.length + 1).padStart(3, '0')}`,
      name: body.name,
      avatar: body.name.charAt(0).toUpperCase(),
      email: body.email,
      phone: body.phone || '',
      role: body.role,
      dept: body.dept,
      status: body.status || 'Active',
      joined: new Date().toISOString().split('T')[0],
      salary: body.salary || 0,
    };

    employees.push(newEmployee);

    return NextResponse.json({
      success: true,
      data: newEmployee
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create employee' },
      { status: 500 }
    );
  }
}