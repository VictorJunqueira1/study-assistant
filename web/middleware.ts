import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const app = initializeApp({
    databaseURL: 'https://study-assistant-2bf95-default-rtdb.firebaseio.com',
});

const auth = getAuth(app);

export async function middleware(req: NextRequest) {
    const authToken = req.cookies.get('authToken')?.value || '';

    try {
        const user = await auth.verifyIdToken(authToken);
        if (user) {
            return NextResponse.next();
        }
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return NextResponse.redirect(new URL('/auth/login', req.url));
}

export const config = {
    matcher: ['/protected/**'],
};