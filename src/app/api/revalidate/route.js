import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  const { _type, slug } = body;

  try {
    switch (_type) {
      case 'project':
        revalidatePath('/work', 'page');
        if (slug) {
          revalidatePath(`/work/project/${slug}`, 'page');
        }
        // Homepage may show project featured media
        revalidatePath('/', 'page');
        break;

      case 'homepage':
        revalidatePath('/', 'page');
        break;

      case 'about':
        revalidatePath('/about', 'page');
        break;

      case 'siteCategories':
        revalidatePath('/work', 'layout');
        break;

      case 'global':
      case 'siteColors':
        // Sitewide — revalidate everything
        revalidatePath('/', 'layout');
        break;

      default:
        revalidatePath('/', 'layout');
    }

    return NextResponse.json({ revalidated: true, type: _type, slug: slug || null });
  } catch (err) {
    return NextResponse.json({ message: 'Revalidation failed', error: err.message }, { status: 500 });
  }
}
