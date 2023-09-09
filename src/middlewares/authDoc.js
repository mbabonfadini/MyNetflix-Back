async function authDocProducao(req, res, next) {
    const { password } = req.body;

    if (req.headers.host.includes("localhost") || req.originalUrl !== "/doc/") {
        return next();
    }

    if (password === process.env.SWAGGER_SENHA_DOC) {
        return next()
    }

    if (password) {
        // Usuario digitou a senha errada
        res.status(401).set('Content-Type', 'text/html');
        res.send(Buffer.from(`

            <form method="post" style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 98vw;
            height: 97vh;
            background-color: #000; 
            color:#fff;
            ">
                <p style="color: red;">Senha Errada!</p>
                <label for="password">Senha da documentação:</label>
                <input type="password" name="password" id="password" />
                <button type="submit">Entrar</button>
            </form>
        `))
    } else {
        // Usuario ainda não digitou a senha e está em modo produção
        res.status(200).set('Content-Type', 'text/html');
        res.send(Buffer.from(`
        <!DOCTYPE html>
    <html>
    <head>
        <title>Página com Fundo Preto</title>
    </head>
    <body 
    style="
    margin:0;
    background-color: white; 
    background-image:url('https://i0.wp.com/cdn2.tfx.company/images/clickwallpapers-OnePiece-4k-img1.jpg?w=880&ssl=1');
    background-repeat: no-repeat;
    background-size: 100%;
    ">
        <form 
        method="post" 
        style="
        font-family: Trebuchet Ms;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        color:#fff;
        background-color: #00000090;"
        ">
        <div 
        style="text-align: center;">
        <h1
        >My Netflix API App</h1>
        <div 
        style="
        border-radius: 3rem;
        border: 1px solid #000;
        background-color: #00000090;
        ">
        <input 
        type="password" 
        name="password" 
        id="password" 
        placeholder="Doc password..."
        style="
        height: 30px;
        width: 300px;
        background-color: #f1f1f100;
        border: none;
        border-top-left-radius:3rem;
        border-bottom-left-radius: 3rem;
        padding: 1rem 2rem;
        color: #fff;
        font-family: Trebuchet Ms;
        font-weight: bold;
        font-size: 1.25rem;
        " />
        <button 
        type="submit"
        style="
        border-top-right-radius:3rem;
        border-bottom-right-radius: 3rem;
        border: none;
        padding: 1rem 2rem;
        background-color: #00FF91;
        font-family: Trebuchet Ms;
        font-weight: bold;
        font-size:1rem;
        height: 62px;
        "
        >Entrar</button>
        
        </div>
        </div>
        
        </form>
        </body>
    </html>
        `))
    }
}

module.exports = authDocProducao;