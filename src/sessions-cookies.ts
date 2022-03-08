import express, { Request, Response, Application } from 'express';
import session from 'express-session';

const app: Application = express();
app.set('trust proxy', 1);
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: false,
    })
);

declare module 'express-session' {
    interface SessionData {
        views: number;
        name: string;
    }
}

app.get('/setCookie', (req: Request, res: Response) => {
    res.cookie('name', 'encrypted_cookie_value');
    res.send('Cookie have been saved successfully');
});

app.get('/getCookie', (req: Request, res: Response) => {
    const rawCookies: string[] | undefined = req.headers.cookie?.split('; ');
    const parsedCookies: any = {};
    if (rawCookies) {
        rawCookies.forEach((rawCookie) => {
            const parsedCookie = rawCookie.split('=');
            parsedCookies[parsedCookie[0]] = parsedCookie[1];
        });
    }
    console.log(parsedCookies);
    res.json(parsedCookies);
});

app.get('/setSession', (req: Request, res: Response) => {
    req.session.name = 'shiva';
    if (req.session.views) {
        req.session.views++;
    } else {
        req.session.views = 10;
    }
    res.send(req.session);
});

app.get('/getSession', (req: Request, res: Response) => {
    if (req.session.views) {
        req.session.views++;
    }
    res.send(req.session);
});

app.listen(3000, () =>
    console.log(`Test server is listening on port ${3000} 👍`)
);
