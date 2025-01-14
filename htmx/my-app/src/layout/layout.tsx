const Head = ({ children }: { children: string }) => {
    return (
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="/index.css" />
            <script type="module" src="/index.js"></script>
            <script type="module" src="/libs/htmx.js"></script>
            <title>{children}</title>
        </head>
    );
};
export const Layout = ({ children, title }: { children: any; title: string }) => {
    return (
        <html lang="en">
            <Head>{title}</Head>
            <body>{children}</body>
        </html>
    );
};
