"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
app.set('trust proxy', 1);
app.use((0, express_session_1.default)({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
}));
app.get('/setCookie', (req, res) => {
    res.cookie('name', 'encrypted_cookie_value');
    res.send('Cookie have been saved successfully');
});
app.get('/getCookie', (req, res) => {
    var _a;
    const rawCookies = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split('; ');
    const parsedCookies = {};
    if (rawCookies) {
        rawCookies.forEach((rawCookie) => {
            const parsedCookie = rawCookie.split('=');
            parsedCookies[parsedCookie[0]] = parsedCookie[1];
        });
    }
    console.log(parsedCookies);
    res.json(parsedCookies);
});
app.get('/setSession', (req, res) => {
    req.session.name = 'shiva';
    if (req.session.views) {
        req.session.views++;
    }
    else {
        req.session.views = 10;
    }
    res.send(req.session);
});
app.get('/getSession', (req, res) => {
    if (req.session.views) {
        req.session.views++;
    }
    res.send(req.session);
});
app.listen(3000, () => console.log(`Test server is listening on port ${3000} 👍`));
