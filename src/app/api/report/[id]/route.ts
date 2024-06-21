import { NextApiRequest } from 'next';
import dbConnect from '../../lib/dbConnect';
import { Report } from '../../models/Report';
import { NextResponse } from 'next/server';
import { reportType } from '@/utils/shared-types';
import { authenticate } from '../../utils/decode';
import { rateLimitMiddleware } from '../../utils/limiter';
import UpdateReport  from '../../models/UpdateReport';

export async function PUT(request: any, { params }: any) {
  let pass= await rateLimitMiddleware(request)
  if (!pass) return NextResponse.json({ status: 'Error', message: 'Too Many Requests.' }, { status: 400 });
  let user = await authenticate(request);
  if (!user)
    return NextResponse.json(
      { status: 'Error', message: 'Access Denied. Invalid Token.' },
      { status: 400 }
    );
  let role= user.role
  if(role==1){
    return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  }
  const { id } = params;

  let report: any = await request.json();
  report['reportID']= id
  await dbConnect();
  const update_report= await UpdateReport.create(report);
  await Report.findByIdAndUpdate(id, {updatereport: update_report._id, status: report.status});
  return NextResponse.json({ message: 'Report updated' }, { status: 200 });
}

export async function GET(request: any, { params }: any) {
  let pass = await rateLimitMiddleware(request);
  if (!pass)
    return NextResponse.json(
      { status: 'Error', message: 'Too Many Requests.' },
      { status: 400 }
    );
  let flag = await authenticate(request)
  if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  const { id } = params;
  await dbConnect();
  const report = await Report.findOne({ _id: id })
  return NextResponse.json({ report }, { status: 200 });
}
